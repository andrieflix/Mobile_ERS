'use client';

import { useState } from 'react';
import { FiSave, FiBell, FiShield, FiMail } from 'react-icons/fi';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      emergencyAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
    system: {
      maintenanceMode: false,
      backupFrequency: 'daily',
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // TODO: Implement settings save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">System Settings</h1>

      <div className="space-y-6">
        {/* Notifications Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiBell className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Emergency Alerts</label>
              <input
                type="checkbox"
                checked={settings.notifications.emergencyAlerts}
                onChange={(e) => handleSettingChange('notifications', 'emergencyAlerts', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiShield className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Two-Factor Authentication</label>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-20 px-3 py-2 border rounded-lg"
                min="1"
                max="120"
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiMail className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">System</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Maintenance Mode</label>
              <input
                type="checkbox"
                checked={settings.system.maintenanceMode}
                onChange={(e) => handleSettingChange('system', 'maintenanceMode', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Backup Frequency</label>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => handleSettingChange('system', 'backupFrequency', e.target.value)}
                className="w-40 px-3 py-2 border rounded-lg"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <FiSave />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
} 