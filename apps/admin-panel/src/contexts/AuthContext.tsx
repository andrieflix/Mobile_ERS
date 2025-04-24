'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TOKEN_COOKIE_NAME } from '@/config/auth';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'responder' | 'viewer';

// Define permissions
export type Permission = 
  | 'view_dashboard'
  | 'manage_incidents'
  | 'manage_users'
  | 'manage_settings'
  | 'view_reports'
  | 'manage_responders'
  | 'view_incidents'
  | 'update_incidents'
  | 'create_incidents';

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

// User interface with permissions
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  phone?: string;
  location?: string;
  department?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  responderDetails?: {
    department?: string;
    specialization?: string;
    certifications?: string[];
    availability?: 'on-duty' | 'off-duty' | 'on-call';
    responseTime?: string;
    successfulResponses?: number;
  };
  residentDetails?: {
    emergencyContact?: string;
    medicalConditions?: string[];
    preferredHospital?: string;
    lastIncidentReport?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password', '/register'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Skip session check for public paths
        if (PUBLIC_PATHS.includes(pathname)) {
          setLoading(false);
          return;
        }

        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
          // Only redirect if we're not already on a public path
          if (!PUBLIC_PATHS.includes(pathname)) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      // Set user state first
      setUser(userData);
      // Return the user data instead of navigating here
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: Permission): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        updateProfile,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 