'use client';

import { useState } from 'react';
import { FiSave, FiLock, FiBell, FiMail, FiGlobe, FiShield } from 'react-icons/fi';
import { PermissionGate } from '@/components/PermissionGate';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy: {
      minLength: number;
      requireSpecialChar: boolean;
      requireNumber: boolean;
    };
  };
  system: {
    timezone: string;
    language: string;
    dateFormat: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChar: true,
        requireNumber: true,
      },
    },
    system: {
      timezone: 'UTC',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
    },
  });

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <PermissionGate permissions={['manage:settings']}>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FiSave className="h-5 w-5" />
            Save Changes
          </button>
        </PermissionGate>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <PermissionGate permissions={['manage:settings']}>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, email: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, push: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, sms: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </PermissionGate>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiShield className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <PermissionGate permissions={['manage:settings']}>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorAuth: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Password Policy</h3>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Minimum Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordPolicy.minLength}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          minLength: parseInt(e.target.value)
                        }
                      }
                    })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Require Special Characters</label>
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireSpecialChar}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireSpecialChar: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Require Numbers</label>
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireNumber}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: {
                          ...settings.security.passwordPolicy,
                          requireNumber: e.target.checked
                        }
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </PermissionGate>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiGlobe className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">System</h2>
          </div>
          <div className="space-y-4">
            <PermissionGate permissions={['manage:settings']}>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select
                  value={settings.system.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, timezone: e.target.value }
                  })}
                  className="w-40 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select
                  value={settings.system.language}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, language: e.target.value }
                  })}
                  className="w-40 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Date Format</label>
                <select
                  value={settings.system.dateFormat}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: { ...settings.system, dateFormat: e.target.value }
                  })}
                  className="w-40 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </PermissionGate>
          </div>
        </div>
      </div>
    </div>
  );
} 