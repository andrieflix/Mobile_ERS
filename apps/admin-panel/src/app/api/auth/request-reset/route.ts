import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { UserRole } from '@/contexts/AuthContext';

// Mock user database - same as in other endpoints
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: '/avatars/admin.png',
    department: 'Administration',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager' as UserRole,
    avatar: '/avatars/manager.png',
    department: 'Operations',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'responder@example.com',
    password: 'responder123',
    name: 'Responder User',
    role: 'responder' as UserRole,
    avatar: '/avatars/responder.png',
    department: 'Emergency Response',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // Return success even if user not found to prevent email enumeration
      return NextResponse.json(
        { message: 'If an account exists with this email, a password reset link has been sent' },
        { status: 200 }
      );
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // In a real application, you would:
    // 1. Store the reset token in the database
    // 2. Send an email with the reset link
    // For now, we'll just log the token
    console.log('Password reset token:', resetToken);
    console.log('Reset link:', `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`);

    return NextResponse.json(
      { message: 'If an account exists with this email, a password reset link has been sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { message: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
} 