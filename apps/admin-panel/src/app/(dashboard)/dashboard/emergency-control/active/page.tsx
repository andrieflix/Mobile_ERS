'use client';

import { useState } from 'react';
import { FiAlertTriangle, FiSearch, FiFilter, FiClock, FiMapPin, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { PermissionGate } from '@/components/PermissionGate';

interface Emergency {
  id: string;
  type: string;
  status: 'active' | 'resolved' | 'escalated';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo: string;
  contactNumber: string;
  email: string;
  lastUpdated: string;
}

export default function ActiveEmergenciesPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([
    {
      id: '1',
      type: 'Fire',
      status: 'active',
      severity: 'high',
      location: 'Building A, Floor 3',
      description: 'Fire reported in server room',
      reportedBy: 'John Doe',
      reportedAt: '2024-03-20T10:30:00Z',
      assignedTo: 'Fire Team A',
      contactNumber: '+1234567890',
      email: 'john@example.com',
      lastUpdated: '2024-03-20T10:35:00Z',
    },
    {
      id: '2',
      type: 'Medical',
      status: 'active',
      severity: 'critical',
      location: 'Building B, Floor 1',
      description: 'Employee collapsed in cafeteria',
      reportedBy: 'Jane Smith',
      reportedAt: '2024-03-20T11:15:00Z',
      assignedTo: 'Medical Team B',
      contactNumber: '+1987654321',
      email: 'jane@example.com',
      lastUpdated: '2024-03-20T11:20:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || emergency.type === selectedType;
    const matchesSeverity = selectedSeverity === 'all' || emergency.severity === selectedSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Active Emergencies</h1>
        <PermissionGate permissions={['manage:emergencies']}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Report New Emergency
          </button>
        </PermissionGate>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search emergencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Fire">Fire</option>
            <option value="Medical">Medical</option>
            <option value="Security">Security</option>
            <option value="Natural Disaster">Natural Disaster</option>
          </select>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Emergencies List */}
      <div className="grid gap-6">
        {filteredEmergencies.map((emergency) => (
          <div key={emergency.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{emergency.type} Emergency</h2>
                <p className="text-gray-600">{emergency.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(emergency.severity)}`}>
                {emergency.severity}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="h-5 w-5" />
                <span>{emergency.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiUser className="h-5 w-5" />
                <span>Assigned to: {emergency.assignedTo}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock className="h-5 w-5" />
                <span>Reported: {new Date(emergency.reportedAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock className="h-5 w-5" />
                <span>Last Updated: {new Date(emergency.lastUpdated).toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Reporter Information</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FiUser className="h-5 w-5 text-gray-400" />
                  <span>{emergency.reportedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                  <span>{emergency.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMail className="h-5 w-5 text-gray-400" />
                  <span>{emergency.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <PermissionGate permissions={['edit:incidents']}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Update Status
                </button>
              </PermissionGate>
              <PermissionGate permissions={['manage:emergencies']}>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Escalate
                </button>
              </PermissionGate>
              <PermissionGate permissions={['edit:incidents']}>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Resolve
                </button>
              </PermissionGate>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 