'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiShield,
  FiUsers,
  FiAlertCircle,
  FiFileText,
  FiActivity
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionGate } from '@/components/PermissionGate';

interface MenuItem {
  label: string;
  icon: typeof FiUser;
  href?: string;
  onClick?: () => void;
  permissions?: string[];
  color?: string;
  divider?: boolean;
}

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { role } = usePermissions();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: 'View Profile',
      icon: FiUser,
      href: '/dashboard/profile'
    },
    {
      label: 'Activity Log',
      icon: FiActivity,
      href: '/dashboard/activity-logs',
      permissions: ['view:incidents']
    },
    {
      label: 'System Settings',
      icon: FiSettings,
      href: '/dashboard/settings',
      permissions: ['manage:settings'],
      divider: true
    },
    {
      label: 'User Management',
      icon: FiUsers,
      href: '/dashboard/users',
      permissions: ['manage:users']
    },
    {
      label: 'Emergency Controls',
      icon: FiAlertCircle,
      href: '/dashboard/emergency-control/active',
      permissions: ['manage:emergencies']
    },
    {
      label: 'Reports & Analytics',
      icon: FiFileText,
      href: '/dashboard/reports/analytics',
      permissions: ['manage:reports']
    },
    {
      label: 'Logout',
      icon: FiLogOut,
      onClick: handleLogout,
      color: 'text-red-600',
      divider: true
    },
   
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600';
      case 'manager':
        return 'text-blue-600';
      case 'responder':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'System Administrator';
      case 'manager':
        return 'Emergency Manager';
      case 'responder':
        return 'Emergency Responder';
      case 'resident':
        return 'Resident';
      default:
        return role;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex items-center">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img
              src={user.avatar || '/default-avatar.svg'}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/default-avatar.svg';
              }}
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
            <p className={`text-xs font-medium ${getRoleColor(role)}`}>
              {getRoleLabel(role)}
            </p>
          </div>
        </div>
        <FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {menuItems.map((item, index) => (
            <PermissionGate key={item.label} permissions={item.permissions as any[]}>
              <>
                {index > 0 && item.divider && (
                  <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      router.push(item.href);
                    }
                  }}
                  className={`w-full px-4 py-2 text-sm text-left ${
                    item.color || 'text-gray-700 dark:text-gray-200'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              </>
            </PermissionGate>
          ))}
        </div>
      )}
    </div>
  );
}