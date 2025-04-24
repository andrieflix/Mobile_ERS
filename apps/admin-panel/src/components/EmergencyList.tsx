'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiFilter, FiSearch } from 'react-icons/fi';

interface Emergency {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'pending';
  location: string;
  reportedAt: string;
  assignedTo: string;
}

const fetchEmergencies = async () => {
  // TODO: Replace with actual API call
  return [
    {
      id: '1',
      type: 'Medical',
      severity: 'high',
      status: 'active',
      location: '123 Main St',
      reportedAt: '2024-03-20T10:30:00Z',
      assignedTo: 'John Doe',
    },
    // Add more mock data as needed
  ] as Emergency[];
};

export default function EmergencyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const { data: emergencies, isLoading } = useQuery({
    queryKey: ['emergencies'],
    queryFn: fetchEmergencies,
  });

  const filteredEmergencies = emergencies?.filter((emergency: Emergency) => {
    const matchesSearch = emergency.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emergency.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || emergency.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Emergency Management</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search emergencies..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="border rounded-lg px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="border rounded-lg px-4 py-2"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emergency Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reported At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmergencies?.map((emergency: Emergency) => (
              <tr key={emergency.id}>
                <td className="px-6 py-4 whitespace-wrap">{emergency.type}</td>
                <td className="px-6 py-4 whitespace-wrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    emergency.severity === 'low' ? 'bg-green-100 text-green-800' :
                    emergency.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    emergency.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {emergency.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-wrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    emergency.status === 'active' ? 'bg-red-100 text-red-800' :
                    emergency.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {emergency.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-wrap">{emergency.location}</td>
                <td className="px-6 py-4 whitespace-wrap">
                  {new Date(emergency.reportedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-wrap">{emergency.assignedTo}</td>
                <td className="px-6 py-4 whitespace-wrap">
                  <button className="text-blue-600 hover:text-blue-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 