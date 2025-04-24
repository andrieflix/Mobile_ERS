import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { rateLimit } from '@/lib/rate-limit';
import { sendPasswordResetEmail } from '@/lib/email';

// In a real application, this would be stored in a database
const resetTokens = new Map<string, { email: string; expires: number }>();

export async function POST(request: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: rateLimitResult.message },
        { status: 429, headers: rateLimitResult.headers }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // In a real application, you would check if the email exists in your database
    // For example:
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //   return NextResponse.json(
    //     { message: 'If an account exists with this email, you will receive a password reset link' },
    //     { status: 200 }
    //   );
    // }

    // Generate a secure token
    const token = sign(
      { email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // Store the token with expiration
    const expires = Date.now() + 3600000; // 1 hour from now
    resetTokens.set(token, { email, expires });

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    // Send reset email
    const emailResult = await sendPasswordResetEmail({
      to: email,
      resetLink
    });

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error);
      return NextResponse.json(
        { message: 'Failed to send reset email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 