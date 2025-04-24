'use client';

import { useState } from 'react';
import { FiMenu, FiBell, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import UserMenu from './UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGate } from '@/components/PermissionGate';
import { usePermissions } from '@/hooks/usePermissions';

interface HeaderProps {
  onMenuClick: () => void;
}

interface Notification {
  id: string;
  type: 'incident' | 'emergency' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const { role } = usePermissions();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'incident',
      message: 'New high-priority incident reported',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'emergency',
      message: 'Emergency response team dispatched',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
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
    <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <FiMenu className="h-6 w-6 sm:hidden" />
            </button>
            
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {getRoleLabel(role)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <PermissionGate 
              permissions={['view:incidents', 'manage:emergencies']} 
              requireAll={false}
            >
              <div className="relative">
                <button
                  type="button"
                  className="relative p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="View notifications"
                >
                  <FiBell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {notification.type === 'incident' ? (
                                <FiAlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                              ) : notification.type === 'emergency' ? (
                                <FiAlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                              ) : (
                                <FiCheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-gray-100">
                                  {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PermissionGate>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 