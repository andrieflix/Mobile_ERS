// 'use client';

// import { useState, useEffect } from 'react';
// import { FiSearch, FiFilter, FiDownload, FiPlus } from 'react-icons/fi';
// import type { Emergency } from '@/types';

// // Mock data - In a real app, this would come from an API
// const mockEmergencies: Emergency[] = [
//   {
//     id: 1,
//     type: 'Fire',
//     location: '123 Main St, City',
//     status: 'Active',
//     description: 'Large fire in residential building',
//     priority: 'High',
//     createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
//     updatedAt: new Date().toISOString(),
//   },
//   // Add more mock data as needed
// ];

// export default function EmergenciesPage() {
//   const [emergencies, setEmergencies] = useState<Emergency[]>(mockEmergencies);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState<'all' | Emergency['status']>('all');
//   const [filterType, setFilterType] = useState<'all' | Emergency['type']>('all');

//   const filteredEmergencies = emergencies.filter(emergency => {
//     const matchesSearch = emergency.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       emergency.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = filterStatus === 'all' || emergency.status === filterStatus;
//     const matchesType = filterType === 'all' || emergency.type === filterType;
//     return matchesSearch && matchesStatus && matchesType;
//   });

//   const handleExport = () => {
//     const csv = [
//       ['ID', 'Type', 'Location', 'Status', 'Priority', 'Created At', 'Updated At'],
//       ...filteredEmergencies.map(e => [
//         e.id,
//         e.type,
//         e.location,
//         e.status,
//         e.priority,
//         e.createdAt,
//         e.updatedAt
//       ])
//     ].map(row => row.join(',')).join('\n');

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `emergencies-${new Date().toISOString()}.csv`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl font-semibold text-gray-900">Emergencies</h1>
//         <div className="flex gap-3">
//           <button
//             onClick={handleExport}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
//           >
//             <FiDownload className="h-5 w-5" />
//             Export Data
//           </button>
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//           >
//             <FiPlus className="h-5 w-5" />
//             New Emergency
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm p-6">
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search emergencies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               />
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value as any)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Resolved">Resolved</option>
//               <option value="Pending">Pending</option>
//             </select>
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value as any)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Types</option>
//               <option value="Fire">Fire</option>
//               <option value="Medical">Medical</option>
//               <option value="Police">Police</option>
//               <option value="Natural Disaster">Natural Disaster</option>
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredEmergencies.map((emergency) => (
//                 <tr key={emergency.id}>
//                   <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
//                     {emergency.type}
//                   </td>
//                   <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
//                     {emergency.location}
//                   </td>
//                   <td className="px-6 py-4 whitespace-wrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       emergency.status === 'Active' ? 'bg-green-100 text-green-800' :
//                       emergency.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {emergency.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-wrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       emergency.priority === 'High' ? 'bg-red-100 text-red-800' :
//                       emergency.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {emergency.priority}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
//                     {new Date(emergency.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
//                     <button className="text-blue-600 hover:text-blue-900">View</button>
//                     <span className="mx-2">|</span>
//                     <button className="text-blue-600 hover:text-blue-900">Edit</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// } 

'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiMapPin, FiUser, FiClock, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { PermissionGate } from '@/components/PermissionGate';
import { usePermissions } from '@/hooks/usePermissions';

interface Emergency {
  id: string;
  title: string;
  description: string;
  type: 'FIRE' | 'MEDICAL' | 'POLICE' | 'NATURAL_DISASTER';
  status: 'ACTIVE' | 'RESOLVED' | 'CANCELLED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: string;
  createdAt: string;
  updatedAt: string;
  affectedAreas: string[];
  casualties: {
    fatalities: number;
    injuries: number;
    missing: number;
  };
  resources: {
    deployed: number;
    required: number;
    type: string[];
  };
  coordinator: {
    id: string;
    name: string;
    role: string;
  };
}

export default function EmergenciesPage() {
  const router = useRouter();
  const { hasPermission } = usePermissions();
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEmergencies: Emergency[] = [
      {
        id: '1',
        title: 'Major Wildfire',
        description: 'Large wildfire spreading across forest area',
        type: 'FIRE',
        status: 'ACTIVE',
        severity: 'CRITICAL',
        location: 'Forest Reserve Area',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        affectedAreas: ['Forest Reserve', 'Nearby Villages'],
        casualties: {
          fatalities: 0,
          injuries: 2,
          missing: 0
        },
        resources: {
          deployed: 15,
          required: 25,
          type: ['Fire Trucks', 'Helicopters', 'Firefighters']
        },
        coordinator: {
          id: '1',
          name: 'John Smith',
          role: 'manager'
        }
      },
      {
        id: '2',
        title: 'Building Collapse',
        description: 'Multi-story building collapse in downtown area',
        type: 'NATURAL_DISASTER',
        status: 'ACTIVE',
        severity: 'HIGH',
        location: 'Downtown Area',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        affectedAreas: ['Main Street', 'Surrounding Buildings'],
        casualties: {
          fatalities: 3,
          injuries: 12,
          missing: 5
        },
        resources: {
          deployed: 20,
          required: 30,
          type: ['Rescue Teams', 'Medical Personnel', 'Heavy Equipment']
        },
        coordinator: {
          id: '2',
          name: 'Jane Doe',
          role: 'responder'
        }
      }
    ];
    setEmergencies(mockEmergencies);
    setIsLoading(false);
  }, []);

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emergency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || emergency.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || emergency.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || emergency.severity === selectedSeverity;
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  const handleView = (id: string) => {
    router.push(`/emergencies/${id}`);
  };

  const handleCreate = () => {
    router.push('/emergencies/new');
  };

  const handleManage = (id: string) => {
    router.push(`/emergencies/${id}/manage`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Emergencies</h1>
        <PermissionGate permissions={['manage:emergencies']}>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            New Emergency
          </button>
        </PermissionGate>
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
                <option value="POLICE">Police</option>
                <option value="NATURAL_DISASTER">Natural Disaster</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Severities</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casualties</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    Loading emergencies...
                  </td>
                </tr>
              ) : filteredEmergencies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                    No emergencies found
                  </td>
                </tr>
              ) : (
                filteredEmergencies.map((emergency) => (
                  <tr key={emergency.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-wrap">
                      <div className="text-sm font-medium text-gray-900">{emergency.title}</div>
                      <div className="text-sm text-gray-500">{emergency.description}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        emergency.type === 'FIRE' ? 'bg-red-100 text-red-800' :
                        emergency.type === 'MEDICAL' ? 'bg-blue-100 text-blue-800' :
                        emergency.type === 'POLICE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {emergency.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        emergency.status === 'ACTIVE' ? 'bg-red-100 text-red-800' :
                        emergency.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {emergency.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        emergency.severity === 'LOW' ? 'bg-green-100 text-green-800' :
                        emergency.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        emergency.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {emergency.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiMapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {emergency.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                      <div className="space-y-1">
                        <div>Fatalities: {emergency.casualties.fatalities}</div>
                        <div>Injuries: {emergency.casualties.injuries}</div>
                        <div>Missing: {emergency.casualties.missing}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(emergency.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View
                        </button>
                        
                        <PermissionGate permissions={['manage:emergencies']}>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleManage(emergency.id)}
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            Manage
                          </button>
                        </PermissionGate>
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