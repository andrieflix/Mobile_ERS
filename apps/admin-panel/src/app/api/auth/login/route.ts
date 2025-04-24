import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { UserRole, Permission } from '@/contexts/AuthContext';
import { JWT_SECRET, TOKEN_COOKIE_NAME, TOKEN_EXPIRY } from '@/config/auth';

// Mock user database - replace with your actual database
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In production, use hashed passwords
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: '/default-avatar.svg',
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
    avatar: '/default-avatar.svg',
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
    avatar: '/default-avatar.svg',
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

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      console.log('Invalid credentials for:', email);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Get user's permissions based on role
    const permissions = rolePermissions[user.role];

    // Create JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret'
    );

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      permissions,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    console.log('Token created for user:', user.email);

    // Set cookie with token
    const cookieStore = cookies();
    cookieStore.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRY,
      path: '/',
    });

    console.log('Cookie set for user:', user.email);

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;
    
    const response = NextResponse.json({
      ...userWithoutPassword,
      permissions,
      lastLogin: new Date(),
    });

    // Set cookie in response headers
    response.cookies.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRY,
      path: '/',
    });

    console.log('Response prepared for user:', user.email);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 