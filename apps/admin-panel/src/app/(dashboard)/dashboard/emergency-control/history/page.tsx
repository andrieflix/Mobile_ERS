'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiAlertCircle, FiClock, FiMapPin, FiUsers, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';
import { PermissionGate } from '@/components/PermissionGate';

interface Emergency {
  id: string;
  type: 'FIRE' | 'MEDICAL' | 'SECURITY' | 'NATURAL_DISASTER';
  status: 'ACTIVE' | 'RESOLVED' | 'CANCELLED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  resolvedAt?: string;
  assignedTo: string[];
  contactNumber: string;
  email: string;
  resolutionNotes?: string;
}

export default function EmergencyHistoryPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEmergencies: Emergency[] = [
      {
        id: '1',
        type: 'FIRE',
        status: 'RESOLVED',
        severity: 'HIGH',
        location: 'Building A, Floor 3',
        description: 'Fire reported in the server room',
        reportedBy: 'John Doe',
        reportedAt: '2024-01-15T10:00:00Z',
        resolvedAt: '2024-01-15T11:30:00Z',
        assignedTo: ['Fire Department', 'Security Team'],
        contactNumber: '+1234567890',
        email: 'emergency@example.com',
        resolutionNotes: 'Fire extinguished by fire department. No injuries reported.',
      },
      {
        id: '2',
        type: 'MEDICAL',
        status: 'RESOLVED',
        severity: 'CRITICAL',
        location: 'Building B, Floor 1',
        description: 'Medical emergency - Heart attack',
        reportedBy: 'Jane Smith',
        reportedAt: '2024-01-10T09:30:00Z',
        resolvedAt: '2024-01-10T10:15:00Z',
        assignedTo: ['Medical Team', 'Ambulance'],
        contactNumber: '+1234567891',
        email: 'medical@example.com',
        resolutionNotes: 'Patient stabilized and transported to hospital.',
      },
      {
        id: '3',
        type: 'SECURITY',
        status: 'CANCELLED',
        severity: 'MEDIUM',
        location: 'Main Entrance',
        description: 'Suspicious activity reported',
        reportedBy: 'Security Guard',
        reportedAt: '2024-01-05T15:20:00Z',
        resolvedAt: '2024-01-05T15:45:00Z',
        assignedTo: ['Security Team'],
        contactNumber: '+1234567892',
        email: 'security@example.com',
        resolutionNotes: 'False alarm - verified as authorized personnel.',
      },
    ];
    setEmergencies(mockEmergencies);
    setIsLoading(false);
  }, []);

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || emergency.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || emergency.status === selectedStatus;
    const matchesDateRange = (!dateRange.start || new Date(emergency.reportedAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(emergency.reportedAt) <= new Date(dateRange.end));
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Emergency History</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search emergencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="FIRE">Fire</option>
                <option value="MEDICAL">Medical</option>
                <option value="SECURITY">Security</option>
                <option value="NATURAL_DISASTER">Natural Disaster</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    Loading emergency history...
                  </td>
                </tr>
              ) : filteredEmergencies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    No emergency history found
                  </td>
                </tr>
              ) : (
                filteredEmergencies.map((emergency) => (
                  <tr key={emergency.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiAlertCircle className={`h-5 w-5 ${
                          emergency.type === 'FIRE' ? 'text-red-500' :
                          emergency.type === 'MEDICAL' ? 'text-blue-500' :
                          emergency.type === 'SECURITY' ? 'text-yellow-500' :
                          'text-gray-500'
                        }`} />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{emergency.type}</div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            emergency.severity === 'LOW' ? 'bg-green-100 text-green-800' :
                            emergency.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            emergency.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {emergency.severity}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiMapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{emergency.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {emergency.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <FiClock className="h-4 w-4 text-gray-400 mr-2" />
                          Reported: {new Date(emergency.reportedAt).toLocaleString()}
                        </div>
                        {emergency.resolvedAt && (
                          <div className="flex items-center mt-1">
                            <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Resolved: {new Date(emergency.resolvedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <div className="flex flex-col gap-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          emergency.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {emergency.status}
                        </span>
                        {emergency.resolutionNotes && (
                          <p className="text-sm text-gray-600">{emergency.resolutionNotes}</p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 