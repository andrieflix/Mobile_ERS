'use client';

import { useState, useRef, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'INCIDENT' | 'SYSTEM' | 'INFO';
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  read: boolean;
  incidentId?: string;
}

interface NotificationsMenuProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  isLoading: boolean;
}

export default function NotificationsMenu({ notifications, onMarkAsRead, onMarkAllAsRead, isLoading }: NotificationsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadNotifications = notifications.filter(n => !n.read);
  const hasUnread = unreadNotifications.length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (notification.incidentId) {
      router.push(`/incidents/${notification.incidentId}`);
    }
    onMarkAsRead(notification.id);
    setIsOpen(false);
  };

  const handleViewAll = () => {
    router.push('/notifications');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <FiBell className="w-6 h-6 text-gray-600" />
        {hasUnread && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 max-h-[32rem] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            {hasUnread && (
              <button
                onClick={onMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto max-h-[24rem]">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Loading notifications...</p>
              </div>
            ) : unreadNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {unreadNotifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-start gap-3"
                  >
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      notification.type === 'INCIDENT' 
                        ? notification.priority === 'HIGH' 
                          ? 'bg-red-500'
                          : notification.priority === 'MEDIUM'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                        : notification.type === 'SYSTEM'
                        ? 'bg-purple-500'
                        : 'bg-gray-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {new Date(notification.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {notification.message}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleViewAll}
              className="w-full px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 