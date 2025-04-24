import { useAuth } from '@/contexts/AuthContext';

// Define permission types
export type Permission =
  | 'create:incidents'
  | 'edit:incidents'
  | 'delete:incidents'
  | 'view:incidents'
  | 'manage:users'
  | 'manage:reports'
  | 'manage:settings'
  | 'manage:emergencies';

// Define role-based permissions
const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    'create:incidents',
    'edit:incidents',
    'delete:incidents',
    'view:incidents',
    'manage:users',
    'manage:reports',
    'manage:settings',
    'manage:emergencies'
  ],
  manager: [
    'create:incidents',
    'edit:incidents',
    'view:incidents',
    'manage:reports',
    'manage:emergencies'
  ],
  responder: [
    'view:incidents',
    'create:incidents'
  ],
  resident: [
    'create:incidents',
    'view:incidents'
  ]
};

export function usePermissions() {
  const { user } = useAuth();
  const role = user?.role || 'resident';

  const hasPermission = (permission: Permission): boolean => {
    if (role === 'admin') return true;
    return ROLE_PERMISSIONS[role]?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (role === 'admin') return true;
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (role === 'admin') return true;
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    role
  };
} 