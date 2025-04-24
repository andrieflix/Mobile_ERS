import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { UserRole, Permission } from '@/contexts/AuthContext';
import { JWT_SECRET, TOKEN_COOKIE_NAME } from '@/config/auth';

// Mock user database - same as in login route
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

// Map roles to their permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'view_dashboard',
    'manage_incidents',
    'manage_users',
    'manage_settings',
    'view_reports',
    'manage_responders',
    'view_incidents',
    'update_incidents',
    'create_incidents'
  ],
  manager: [
    'view_dashboard',
    'manage_incidents',
    'view_reports',
    'manage_responders',
    'view_incidents',
    'update_incidents',
    'create_incidents'
  ],
  responder: [
    'view_dashboard',
    'view_incidents',
    'update_incidents'
  ],
  viewer: [
    'view_dashboard',
    'view_incidents'
  ]
};

export async function GET() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify the token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret'
    );

    const { payload } = await jwtVerify(token, secret);
    const { id, email } = payload as { id: string; email: string };
    
    // Find user in the mock database
    const user = users.find(u => u.id === id && u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's permissions
    const permissions = rolePermissions[user.role];

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      ...userWithoutPassword,
      permissions,
      lastLogin: new Date()
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
} 