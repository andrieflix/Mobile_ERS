import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
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
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: 'Reset token and new password are required' },
        { status: 400 }
      );
    }

    // Verify the reset token
    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
      id: string;
      email: string;
    };

    // Find the user
    const userIndex = users.findIndex(u => u.id === decoded.id);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'Invalid reset token' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Validate the new password meets requirements
    // 2. Hash the new password
    // 3. Update the user's password in the database
    // For now, we'll just update the mock user
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date();

    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password reset error:', error);
    
    // If token is invalid or expired
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to reset password' },
      { status: 500 }
    );
  }
} 