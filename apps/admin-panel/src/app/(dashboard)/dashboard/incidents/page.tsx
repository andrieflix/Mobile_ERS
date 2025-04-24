'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiDownload, FiPlus, FiMapPin, FiUser, FiClock, FiUsers, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { PermissionGate } from '@/components/PermissionGate';

interface Responder {
  id: string;
  name: string;
  type: 'FIRE' | 'MEDICAL' | 'POLICE';
  status: 'AVAILABLE' | 'ASSIGNED' | 'ON_SITE' | 'COMPLETED';
  location: string;
  eta?: string;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  type: 'FIRE' | 'MEDICAL' | 'POLICE' | 'NATURAL_DISASTER';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';
  location: string;
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
  assignedResponders: Responder[];
  estimatedArrivalTime?: string;
  affectedArea?: string;
  casualties?: number;
  evacuationRequired?: boolean;
}

export default function IncidentsPage() {
  const router = useRouter();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Replace with actual API call
      const mockIncidents: Incident[] = [
        {
          id: '1',
          title: 'House Fire in Barangay 1',
          description: 'Fire reported in a residential area. Multiple units affected.',
          type: 'FIRE',
          priority: 'HIGH',
          status: 'PENDING',
          location: 'Barangay 1, Street 1',
          reportedBy: 'John Doe',
          createdAt: '2024-03-20T10:00:00Z',
          updatedAt: '2024-03-20T10:00:00Z',
          assignedResponders: [
            {
              id: 'r1',
              name: 'Fire Station 1',
              type: 'FIRE',
              status: 'ASSIGNED',
              location: 'Barangay 1, Street 1',
              eta: '5 minutes'
            },
            {
              id: 'r2',
              name: 'Medical Team A',
              type: 'MEDICAL',
              status: 'ON_SITE',
              location: 'Barangay 1, Street 1'
            }
          ],
          estimatedArrivalTime: '5 minutes',
          affectedArea: 'Residential Complex A',
          casualties: 0,
          evacuationRequired: true
        }
      ];
      setIncidents(mockIncidents);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError('Failed to fetch incidents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      // Convert incidents to CSV format with additional fields
      const headers = [
        'Title',
        'Type',
        'Priority',
        'Status',
        'Location',
        'Affected Area',
        'Casualties',
        'Evacuation Required',
        'Reported By',
        'Created At',
        'Estimated Arrival Time',
        'Assigned Responders'
      ];
      const csvContent = [
        headers.join(','),
        ...filteredIncidents.map(incident => [
          incident.title,
          incident.type,
          incident.priority,
          incident.status,
          incident.location,
          incident.affectedArea || 'N/A',
          incident.casualties || 0,
          incident.evacuationRequired ? 'Yes' : 'No',
          incident.reportedBy,
          new Date(incident.createdAt).toLocaleString(),
          incident.estimatedArrivalTime || 'N/A',
          incident.assignedResponders.map(r => r.name).join(';')
        ].join(','))
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `incidents_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting incidents:', error);
      alert('Failed to export incidents. Please try again.');
    }
  };

  const handleCreateNew = () => {
    router.push('/dashboard/incidents/new');
  };

  const handleView = (incidentId: string) => {
    router.push(`/dashboard/incidents/${incidentId}`);
  };

  const handleEdit = (incidentId: string) => {
    router.push(`/dashboard/incidents/${incidentId}/edit`);
  };

  const handleDispatch = (incidentId: string) => {
    // TODO: Implement dispatch functionality
    alert('Dispatch functionality to be implemented');
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || incident.type === selectedType;
    const matchesStatus = !selectedStatus || incident.status === selectedStatus;
    const matchesPriority = !selectedPriority || incident.priority === selectedPriority;
    const matchesDate = (!dateRange.start && !dateRange.end) || 
      (new Date(incident.createdAt) >= new Date(dateRange.start) &&
       new Date(incident.createdAt) <= new Date(dateRange.end || Date.now()));
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesDate;
  });

  if (loading) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-500">Loading incidents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchIncidents}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Emergency Incidents</h1>
        <div className="flex gap-3">
          <PermissionGate permissions={['manage:reports']}>
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiDownload className="h-4 w-4" />
              Export
            </button>
          </PermissionGate>
          
          <PermissionGate permissions={['create:incidents']}>
            <button
              onClick={handleCreateNew}
              className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FiPlus className="h-4 w-4" />
              New Incident
            </button>
          </PermissionGate>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search incidents..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="FIRE">Fire</option>
                <option value="MEDICAL">Medical</option>
                <option value="POLICE">Police</option>
                <option value="NATURAL_DISASTER">Natural Disaster</option>
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CANCELLED">Cancelled</option>
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

              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No incidents found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50 border border-gray-200">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{incident.description}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.type === 'FIRE' ? 'bg-red-100 text-red-800' :
                        incident.type === 'MEDICAL' ? 'bg-blue-100 text-blue-800' :
                        incident.type === 'POLICE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {incident.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                        incident.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        incident.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        incident.status === 'CANCELLED' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {incident.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <div className="flex items-center">
                        <FiMapPin className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                        <span className="text-sm text-gray-900">{incident.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1 text-sm">
                        {incident.affectedArea && (
                          <div className="text-gray-600">
                            Affected Area: {incident.affectedArea}
                          </div>
                        )}
                        {incident.casualties !== undefined && (
                          <div className="text-gray-600">
                            Casualties: {incident.casualties}
                          </div>
                        )}
                        {incident.evacuationRequired && (
                          <div className="text-red-600 font-medium">
                            Evacuation Required
                          </div>
                        )}
                        {incident.estimatedArrivalTime && (
                          <div className="text-gray-600">
                            ETA: {incident.estimatedArrivalTime}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1.5">
                        {incident.assignedResponders.map((responder) => (
                          <div key={responder.id} className="flex items-start gap-1.5">
                            <FiUsers className="mt-0.5 h-3.5 w-3.5 text-gray-400" />
                            <div>
                              <div className="text-sm text-gray-900">{responder.name}</div>
                              <div className="flex flex-wrap gap-1">
                                <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                                  responder.type === 'FIRE' ? 'bg-red-100 text-red-800' :
                                  responder.type === 'MEDICAL' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {responder.type}
                                </span>
                                <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                                  responder.status === 'ON_SITE' ? 'bg-green-100 text-green-800' :
                                  responder.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {responder.status.replace('_', ' ')}
                                </span>
                                {responder.eta && (
                                  <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-800">
                                    ETA: {responder.eta}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(incident.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View
                        </button>
                        
                        <PermissionGate permissions={['edit:incidents']}>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleEdit(incident.id)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Edit
                          </button>
                        </PermissionGate>

                        {incident.status === 'PENDING' && (
                          <PermissionGate permissions={['manage:emergencies']}>
                            <span className="text-gray-300">|</span>
                            <button
                              onClick={() => handleDispatch(incident.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                            >
                              Dispatch
                            </button>
                          </PermissionGate>
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