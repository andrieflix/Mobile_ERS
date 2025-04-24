'use client';

import { useState } from 'react';
import { FiSettings, FiAlertCircle, FiBell, FiMail, FiUsers, FiSave } from 'react-icons/fi';
import { PermissionGate } from '@/components/PermissionGate';

interface EmergencySettings {
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    notificationDelay: number;
  };
  responseTeams: {
    fireDepartment: string[];
    medicalTeam: string[];
    securityTeam: string[];
    disasterResponse: string[];
  };
  severityThresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  autoEscalation: {
    enabled: boolean;
    escalationDelay: number;
    escalationLevels: number;
  };
}

export default function EmergencySettingsPage() {
  const [settings, setSettings] = useState<EmergencySettings>({
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      notificationDelay: 5,
    },
    responseTeams: {
      fireDepartment: ['Fire Team A', 'Fire Team B'],
      medicalTeam: ['Medical Team A', 'Medical Team B'],
      securityTeam: ['Security Team A', 'Security Team B'],
      disasterResponse: ['Disaster Response Team A', 'Disaster Response Team B'],
    },
    severityThresholds: {
      low: 1,
      medium: 3,
      high: 5,
      critical: 7,
    },
    autoEscalation: {
      enabled: true,
      escalationDelay: 15,
      escalationLevels: 3,
    },
  });

  const handleSave = () => {
    // TODO: Implement API call to save settings
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Emergency Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FiSave className="h-5 w-5" />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Notification Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notificationSettings.emailNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    emailNotifications: e.target.checked,
                  },
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
              <input
                type="checkbox"
                checked={settings.notificationSettings.smsNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    smsNotifications: e.target.checked,
                  },
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notificationSettings.pushNotifications}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    pushNotifications: e.target.checked,
                  },
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Notification Delay (minutes)</label>
              <input
                type="number"
                value={settings.notificationSettings.notificationDelay}
                onChange={(e) => setSettings({
                  ...settings,
                  notificationSettings: {
                    ...settings.notificationSettings,
                    notificationDelay: parseInt(e.target.value),
                  },
                })}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="60"
              />
            </div>
          </div>
        </div>

        {/* Response Teams */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiUsers className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Response Teams</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.responseTeams).map(([team, members]) => (
              <div key={team} className="space-y-2">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {team.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <textarea
                  value={members.join('\n')}
                  onChange={(e) => setSettings({
                    ...settings,
                    responseTeams: {
                      ...settings.responseTeams,
                      [team]: e.target.value.split('\n').filter(Boolean),
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Severity Thresholds */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiAlertCircle className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Severity Thresholds</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.severityThresholds).map(([level, value]) => (
              <div key={level} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 capitalize">{level}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    severityThresholds: {
                      ...settings.severityThresholds,
                      [level]: parseInt(e.target.value),
                    },
                  })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  max="10"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Auto Escalation */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiMail className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Auto Escalation</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Enable Auto Escalation</label>
              <input
                type="checkbox"
                checked={settings.autoEscalation.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  autoEscalation: {
                    ...settings.autoEscalation,
                    enabled: e.target.checked,
                  },
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Escalation Delay (minutes)</label>
              <input
                type="number"
                value={settings.autoEscalation.escalationDelay}
                onChange={(e) => setSettings({
                  ...settings,
                  autoEscalation: {
                    ...settings.autoEscalation,
                    escalationDelay: parseInt(e.target.value),
                  },
                })}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                min="0"
                max="60"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Number of Escalation Levels</label>
              <input
                type="number"
                value={settings.autoEscalation.escalationLevels}
                onChange={(e) => setSettings({
                  ...settings,
                  autoEscalation: {
                    ...settings.autoEscalation,
                    escalationLevels: parseInt(e.target.value),
                  },
                })}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max="5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 