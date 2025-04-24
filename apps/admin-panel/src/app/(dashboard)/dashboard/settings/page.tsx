'use client';

import { useState } from 'react';
import { FiBell, FiShield, FiMapPin, FiAlertTriangle, FiUsers, FiSettings, FiCalendar, FiClock } from 'react-icons/fi';

interface SettingsForm {
  notifications: {
    email: boolean;
    push: boolean;
    emergencyAlerts: boolean;
    incidentUpdates: boolean;
    responderAssignments: boolean;
    newIncidents: boolean;
    statusChanges: boolean;
    shiftChanges: boolean;
    teamUpdates: boolean;
  };
  system: {
    locationSharing: boolean;
    autoLocation: boolean;
    alertRadius: number;
    preferredLanguage: 'en' | 'es' | 'fr';
    mapProvider: 'google' | 'openstreetmap';
    timezone: string;
    workHours: {
      start: string;
      end: string;
      days: string[];
    };
  };
  security: {
    twoFactorAuth: boolean;
    biometricAuth: boolean;
    emergencyContacts: boolean;
    dataRetention: number;
    sessionTimeout: number;
  };
  responder: {
    autoAcceptAssignments: boolean;
    maxConcurrentIncidents: number;
    preferredIncidentTypes: string[];
    availabilityStatus: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
    shiftPreferences: {
      preferredShift: 'MORNING' | 'AFTERNOON' | 'NIGHT';
      maxHoursPerWeek: number;
      preferredDays: string[];
    };
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsForm>({
    notifications: {
      email: true,
      push: true,
      emergencyAlerts: true,
      incidentUpdates: true,
      responderAssignments: true,
      newIncidents: true,
      statusChanges: true,
      shiftChanges: true,
      teamUpdates: true,
    },
    system: {
      locationSharing: true,
      autoLocation: true,
      alertRadius: 5,
      preferredLanguage: 'en',
      mapProvider: 'google',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      workHours: {
        start: '08:00',
        end: '17:00',
        days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
      },
    },
    security: {
      twoFactorAuth: false,
      biometricAuth: false,
      emergencyContacts: true,
      dataRetention: 30,
      sessionTimeout: 30,
    },
    responder: {
      autoAcceptAssignments: false,
      maxConcurrentIncidents: 3,
      preferredIncidentTypes: ['FIRE', 'MEDICAL'],
      availabilityStatus: 'AVAILABLE',
      shiftPreferences: {
        preferredShift: 'MORNING',
        maxHoursPerWeek: 40,
        preferredDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
      },
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Notifications Section */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <FiBell className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive email updates about incidents and system changes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          email: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Push Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive real-time alerts on your device
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          push: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Emergency Alerts
                  </label>
                  <p className="text-sm text-gray-500">
                    Get notified about emergency situations in your area
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emergencyAlerts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          emergencyAlerts: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Shift Changes
                  </label>
                  <p className="text-sm text-gray-500">
                    Get notified about shift schedule changes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.shiftChanges}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          shiftChanges: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Team Updates
                  </label>
                  <p className="text-sm text-gray-500">
                    Get notified about team member changes and updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.teamUpdates}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          teamUpdates: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Section */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <FiSettings className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">System Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location Sharing
                  </label>
                  <p className="text-sm text-gray-500">
                    Share your location with emergency services
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.system.locationSharing}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        system: {
                          ...settings.system,
                          locationSharing: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Automatic Location Updates
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically update your location during emergencies
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.system.autoLocation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        system: {
                          ...settings.system,
                          autoLocation: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Radius (km)
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={settings.system.alertRadius}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        alertRadius: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {settings.system.alertRadius} kilometers
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Map Provider
                </label>
                <select
                  value={settings.system.mapProvider}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        mapProvider: e.target.value as 'google' | 'openstreetmap',
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="google">Google Maps</option>
                  <option value="openstreetmap">OpenStreetMap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={settings.system.timezone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      system: {
                        ...settings.system,
                        timezone: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {Intl.supportedValuesOf('timeZone').map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Hours
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={settings.system.workHours.start}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          system: {
                            ...settings.system,
                            workHours: {
                              ...settings.system.workHours,
                              start: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">End Time</label>
                    <input
                      type="time"
                      value={settings.system.workHours.end}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          system: {
                            ...settings.system,
                            workHours: {
                              ...settings.system.workHours,
                              end: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responder Section */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <FiUsers className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Responder Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Auto-Accept Assignments
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically accept incident assignments
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.responder.autoAcceptAssignments}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        responder: {
                          ...settings.responder,
                          autoAcceptAssignments: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Concurrent Incidents
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.responder.maxConcurrentIncidents}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      responder: {
                        ...settings.responder,
                        maxConcurrentIncidents: parseInt(e.target.value),
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability Status
                </label>
                <select
                  value={settings.responder.availabilityStatus}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      responder: {
                        ...settings.responder,
                        availabilityStatus: e.target.value as 'AVAILABLE' | 'BUSY' | 'OFFLINE',
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="BUSY">Busy</option>
                  <option value="OFFLINE">Offline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shift Preferences
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Preferred Shift</label>
                    <select
                      value={settings.responder.shiftPreferences.preferredShift}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          responder: {
                            ...settings.responder,
                            shiftPreferences: {
                              ...settings.responder.shiftPreferences,
                              preferredShift: e.target.value as 'MORNING' | 'AFTERNOON' | 'NIGHT',
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="MORNING">Morning (6:00 - 14:00)</option>
                      <option value="AFTERNOON">Afternoon (14:00 - 22:00)</option>
                      <option value="NIGHT">Night (22:00 - 6:00)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Maximum Hours Per Week</label>
                    <input
                      type="number"
                      min="20"
                      max="60"
                      value={settings.responder.shiftPreferences.maxHoursPerWeek}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          responder: {
                            ...settings.responder,
                            shiftPreferences: {
                              ...settings.responder.shiftPreferences,
                              maxHoursPerWeek: parseInt(e.target.value),
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <FiShield className="h-6 w-6 text-gray-400 mr-3" />
              <h2 className="text-lg font-medium text-gray-900">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          twoFactorAuth: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Biometric Authentication
                  </label>
                  <p className="text-sm text-gray-500">
                    Use fingerprint or face recognition for quick access
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.biometricAuth}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        security: {
                          ...settings.security,
                          biometricAuth: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  min="7"
                  max="365"
                  value={settings.security.dataRetention}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        dataRetention: parseInt(e.target.value),
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        sessionTimeout: parseInt(e.target.value),
                      },
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}