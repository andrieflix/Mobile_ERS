import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define public paths that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

// Define role types
type Role = 'admin' | 'manager' | 'responder' | 'resident';

// Define role-based permissions
const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ['*'], // Admin has access to everything
  manager: [
    '/dashboard',
    '/dashboard/incidents',
    '/dashboard/emergencies',
    '/dashboard/emergency-control',
    '/dashboard/reports',
    '/dashboard/profile'
  ],
  responder: [
    '/dashboard',
    '/dashboard/incidents',
    '/dashboard/emergencies',
    '/dashboard/emergency-control',
    '/dashboard/profile'
  ],
  resident: [
    '/dashboard',
    '/dashboard/incidents',
    '/dashboard/profile'
  ]
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('token')?.value;

  // Check if user is authenticated
  if (!token) {
    const url = new URL('/login', request.url);
    // Only set callbackUrl if we're not already on a public path
    if (!publicPaths.includes(pathname)) {
      url.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(url);
  }

  try {
    // Verify the JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    const { payload } = await jwtVerify(token, secret);
    
    // Check role-based permissions
    const userRole = payload.role as Role;
    const allowedPaths = ROLE_PERMISSIONS[userRole] || [];

    // Admin has access to everything
    if (userRole === 'admin') {
      return NextResponse.next();
    }

    // Check if the current path is allowed for the user's role
    const isPathAllowed = allowedPaths.some((allowedPath: string) => 
      pathname.startsWith(allowedPath)
    );

    if (!isPathAllowed) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL('/login', request.url);
    // Only set callbackUrl if we're not already on a public path
    if (!publicPaths.includes(pathname)) {
      url.searchParams.set('callbackUrl', pathname);
    }
    return NextResponse.redirect(url);
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
  ]
}; 