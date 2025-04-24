'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiUser, FiUsers, FiPlus, FiSearch, FiEdit2, FiTrash2, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'RESIDENT' | 'RESPONDER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  // Resident specific fields
  address?: string;
  barangay?: string;
  validId?: string;
  registrationDate?: string;
  // Responder specific fields
  role?: string;
  designation?: string;
  responderType?: 'RESCUE' | 'FIREFIGHTER' | 'MEDIC';
  organization?: 'BFP' | 'MDRRMO';
}

type TabType = 'all' | 'resident' | 'responder';

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') as TabType | null;
  const [activeTab, setActiveTab] = useState<TabType>(userType || 'all');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedOrganization, setSelectedOrganization] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    // Update active tab when URL changes
    if (userType) {
      setActiveTab(userType);
    }
  }, [userType]);

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock data for demonstration
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          type: 'RESIDENT',
          status: 'PENDING',
          address: '123 Main St',
          barangay: 'Barangay 1',
          validId: 'National ID',
          registrationDate: '2024-03-20T10:00:00Z'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+0987654321',
          type: 'RESPONDER',
          status: 'ACTIVE',
          address: '123 Main St',
          role: 'Fire Captain',
          designation: 'Team Leader',
          responderType: 'FIREFIGHTER',
          organization: 'BFP'
        },
        {
          id: '3',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          phone: '+1122334455',
          type: 'RESIDENT',
          status: 'ACTIVE',
          address: '456 Oak St',
          barangay: 'Barangay 2'
        }
      ];

      // Filter users based on active tab
      let filteredUsers = activeTab === 'all'
        ? mockUsers
        : mockUsers.filter(user => user.type.toLowerCase() === activeTab);

      // For residents, show pending first, then active
      if (activeTab === 'resident') {
        filteredUsers.sort((a, b) => {
          if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
          if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
          return 0;
        });
      }

      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.push(tab === 'all' ? '/dashboard/users' : `/dashboard/users?type=${tab}`);
  };

  const handleCreateNew = () => {
    router.push('/dashboard/users/new');
  };

  const handleEdit = (userId: string) => {
    router.push(`/dashboard/users/${userId}/edit`);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleApprove = async (userId: string) => {
    if (confirm('Are you sure you want to approve this resident?')) {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, status: 'ACTIVE' as const }
            : user
        ));
        alert('Resident approved successfully');
      } catch (error) {
        console.error('Error approving resident:', error);
        alert('Failed to approve resident. Please try again.');
      }
    }
  };

  const handleReject = async (userId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setUsers(users.filter(user => user.id !== userId));
        alert('Resident registration rejected');
      } catch (error) {
        console.error('Error rejecting resident:', error);
        alert('Failed to reject resident. Please try again.');
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !selectedStatus || user.status === selectedStatus;

    if (activeTab === 'responder') {
      const matchesOrganization = !selectedOrganization || user.organization === selectedOrganization;
      const matchesRole = !selectedRole || user.role?.toLowerCase().includes(selectedRole.toLowerCase());
      return matchesSearch && matchesStatus && matchesOrganization && matchesRole;
    }

    return matchesSearch && matchesStatus;
  });

  // Get unique roles from responders for the filter dropdown
  const uniqueRoles = Array.from(new Set(
    users
      .filter(user => user.type === 'RESPONDER')
      .map(user => user.role)
      .filter(Boolean)
  ));

  if (loading) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        {activeTab === 'responder' && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <FiPlus className="h-4 w-4" />
            Add New Responder
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="w-full border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange('all')}
            className={`${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-wrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2`}
          >
            <FiUsers className="h-4 w-4" />
            All Users
          </button>
          <button
            onClick={() => handleTabChange('resident')}
            className={`${
              activeTab === 'resident'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-wrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2`}
          >
            <FiUser className="h-4 w-4" />
            Residents
          </button>
          <button
            onClick={() => handleTabChange('responder')}
            className={`${
              activeTab === 'responder'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-wrap border-b-2 py-4 px-1 text-sm font-medium flex items-center gap-2`}
          >
            <FiUser className="h-4 w-4" />
            Responders
          </button>
        </nav>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Status Filter - Always visible */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              {activeTab !== 'responder' && (
                <option value="PENDING">Pending</option>
              )}
            </select>

            {/* Responder-specific filters */}
            {activeTab === 'responder' && (
              <>
                <select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Organizations</option>
                  <option value="BFP">Bureau of Fire Protection (BFP)</option>
                  <option value="MDRRMO">Municipal Disaster Risk Reduction and Management Office (MDRRMO)</option>
                </select>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Contact</th>
                {(activeTab === 'all' || activeTab === 'resident') && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  ">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Valid ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Registration Date</th>
                  </>
                )}
                {(activeTab === 'all' || activeTab === 'responder') && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Organization</th>
                  </>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.status === 'PENDING' ? 'bg-yellow-50' : ''}`}>
                    <td className="px-4 py-3 whitespace-wrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                    {(activeTab === 'all' || activeTab === 'resident') && user.type === 'RESIDENT' && (
                      <>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                          <div>{user.address}</div>
                          <div className="text-xs text-gray-400">{user.barangay}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                          {user.validId}
                        </td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                          {user.registrationDate && new Date(user.registrationDate).toLocaleString()}
                        </td>
                      </>
                    )}
                    {(activeTab === 'all' || activeTab === 'responder') && user.type === 'RESPONDER' && (
                      <>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                          <div>{user.role}</div>
                          <div className="text-xs text-gray-400">{user.designation}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">
                          <div>{user.organization}</div>
                          <div className="text-xs text-gray-400">{user.responderType}</div>
                        </td>
                      </>
                    )}
                    {/* Fill empty cells for consistent layout */}
                    {activeTab === 'all' && user.type === 'RESIDENT' && (
                      <>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">-</td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">-</td>
                      </>
                    )}
                    {activeTab === 'all' && user.type === 'RESPONDER' && (
                      <>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">-</td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">-</td>
                        <td className="px-4 py-3 whitespace-wrap text-sm text-gray-500">-</td>
                      </>
                    )}
                    <td className="px-4 py-3 whitespace-wrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-wrap text-sm">
                      <div className="flex items-center gap-2">
                        {user.status === 'PENDING' && user.type === 'RESIDENT' ? (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Approve"
                            >
                              <FiCheck className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Reject"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(user.id)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </>
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