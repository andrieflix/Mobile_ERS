'use client';

import { useQuery } from '@tanstack/react-query';
import { FiAlertTriangle, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';

const fetchDashboardStats = async () => {
  // TODO: Replace with actual API call
  return {
    totalEmergencies: 150,
    activeEmergencies: 25,
    totalUsers: 500,
    resolvedEmergencies: 125,
  };
};

export default function DashboardOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiAlertTriangle size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Emergencies</p>
              <p className="text-2xl font-bold">{stats?.totalEmergencies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiClock size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Active Emergencies</p>
              <p className="text-2xl font-bold">{stats?.activeEmergencies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCheckCircle size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Resolved Emergencies</p>
              <p className="text-2xl font-bold">{stats?.resolvedEmergencies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={24} />
            </div>
            <div className="ml-4">
              <p className="text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{stats?.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Add charts and additional statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Emergency Types Distribution</h2>
          {/* Add chart component here */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Emergency Response Time</h2>
          {/* Add chart component here */}
        </div>
      </div>
    </div>
  );
} 