'use client';

import { useState, useEffect } from 'react';
import { FiBell, FiFilter, FiSearch, FiCheck } from 'react-icons/fi';

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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Emergency Incident',
          message: 'Fire reported in Barangay 1. Multiple units affected.',
          type: 'INCIDENT',
          priority: 'HIGH',
          timestamp: new Date().toISOString(),
          read: false,
          incidentId: '123'
        },
        {
          id: '2',
          title: 'System Maintenance',
          message: 'Scheduled maintenance in 2 hours. Service might be interrupted.',
          type: 'SYSTEM',
          timestamp: new Date().toISOString(),
          read: true
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      // TODO: Implement API call
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // TODO: Implement API call
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || notification.type === selectedType;
    const matchesPriority = !selectedPriority || notification.priority === selectedPriority;
    const matchesReadStatus = !showUnreadOnly || !notification.read;
    
    return matchesSearch && matchesType && matchesPriority && matchesReadStatus;
  });

  if (loading) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-500">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full sm:max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FiFilter className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="INCIDENT">Incident</option>
                  <option value="SYSTEM">System</option>
                  <option value="INFO">Info</option>
                </select>

                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Priorities</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(e) => setShowUnreadOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show unread only</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No notifications found
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 ${!notification.read ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors`}
              >
                <div className="flex items-start gap-4">
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
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FiCheck className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        notification.type === 'INCIDENT' ? 'bg-red-100 text-red-800' :
                        notification.type === 'SYSTEM' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.type}
                      </span>
                      {notification.priority && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          notification.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 