import { ReactNode } from 'react';
import { usePermissions, Permission } from '@/hooks/usePermissions';

interface PermissionGateProps {
  children: ReactNode;
  permissions?: Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function PermissionGate({
  children,
  permissions = [],
  requireAll = false,
  fallback = null
}: PermissionGateProps) {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  if (!permissions.length) return <>{children}</>;

  const hasPermission = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  if (!hasPermission) return <>{fallback}</>;

  return <>{children}</>;
} 