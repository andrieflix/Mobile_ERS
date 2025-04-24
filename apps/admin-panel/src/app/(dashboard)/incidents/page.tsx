'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiDownload, FiPlus, FiMapPin, FiUser, FiClock, FiUsers, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { PermissionGate } from '@/components/PermissionGate';
import { usePermissions } from '@/hooks/usePermissions';

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
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: Responder[];
  reporter: {
    id: string;
    name: string;
    role: string;
  };
}

export default function IncidentsPage() {
  const router = useRouter();
  const { hasPermission } = usePermissions();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockIncidents: Incident[] = [
      {
        id: '1',
        title: 'Fire at Main Street',
        description: 'Residential building fire, multiple units affected',
        type: 'FIRE',
        status: 'PENDING',
        priority: 'HIGH',
        location: '123 Main St',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: {
          id: '1',
          name: 'John Doe',
          role: 'resident'
        }
      },
      {
        id: '2',
        title: 'Medical Emergency',
        description: 'Elderly person collapsed at park',
        type: 'MEDICAL',
        status: 'IN_PROGRESS',
        priority: 'CRITICAL',
        location: 'Central Park',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignedTo: [
          {
            id: '1',
            name: 'Dr. Smith',
            type: 'MEDICAL',
            status: 'ON_SITE',
            location: 'Central Park',
            eta: '5 mins'
          }
        ],
        reporter: {
          id: '2',
          name: 'Jane Smith',
          role: 'responder'
        }
      }
    ];
    setIncidents(mockIncidents);
    setIsLoading(false);
  }, []);

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || incident.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || incident.priority === selectedPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleView = (id: string) => {
    router.push(`/incidents/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/incidents/${id}/edit`);
  };

  const handleDispatch = (id: string) => {
    // TODO: Implement dispatch logic
    console.log(`Dispatching incident ${id}`);
  };

  const handleCreate = () => {
    router.push('/incidents/new');
  };

  const handleExport = () => {
    // TODO: Implement export logic
    console.log('Exporting incidents');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <div className="flex gap-4">
          <PermissionGate permissions={['manage:reports']}>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FiDownload className="h-5 w-5" />
              Export
            </button>
          </PermissionGate>
          <PermissionGate permissions={['create:incidents']}>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FiPlus className="h-5 w-5" />
              New Incident
            </button>
          </PermissionGate>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search incidents..."
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
                <option value="POLICE">Police</option>
                <option value="NATURAL_DISASTER">Natural Disaster</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    Loading incidents...
                  </td>
                </tr>
              ) : filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    No incidents found
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                      <div className="text-sm text-gray-500">{incident.description}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.type === 'FIRE' ? 'bg-red-100 text-red-800' :
                        incident.type === 'MEDICAL' ? 'bg-blue-100 text-blue-800' :
                        incident.type === 'POLICE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {incident.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        incident.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        incident.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        incident.priority === 'LOW' ? 'bg-green-100 text-green-800' :
                        incident.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        incident.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiMapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {incident.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiUser className="h-4 w-4 mr-1 text-gray-400" />
                        {incident.reporter.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
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