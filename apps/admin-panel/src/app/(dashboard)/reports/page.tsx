'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiFileText, FiDownload, FiTrash2, FiFilter, FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { PermissionGate } from '@/components/PermissionGate';

interface Report {
  id: string;
  title: string;
  type: 'INCIDENT' | 'EMERGENCY' | 'SYSTEM' | 'AUDIT';
  status: 'DRAFT' | 'PENDING' | 'COMPLETED' | 'FAILED';
  createdBy: string;
  createdAt: string;
  lastModified: string;
  fileUrl?: string;
}

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
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
    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Monthly Incident Report - January 2024',
        type: 'INCIDENT',
        status: 'COMPLETED',
        createdBy: 'John Doe',
        createdAt: '2024-01-31T23:59:59Z',
        lastModified: '2024-02-01T00:30:00Z',
        fileUrl: '/reports/monthly-incident-jan-2024.pdf',
      },
      {
        id: '2',
        title: 'Emergency Response Analysis - Q4 2023',
        type: 'EMERGENCY',
        status: 'PENDING',
        createdBy: 'Jane Smith',
        createdAt: '2024-01-15T10:00:00Z',
        lastModified: '2024-01-15T10:00:00Z',
      },
      {
        id: '3',
        title: 'System Performance Report',
        type: 'SYSTEM',
        status: 'DRAFT',
        createdBy: 'Bob Johnson',
        createdAt: '2024-02-01T09:00:00Z',
        lastModified: '2024-02-01T09:00:00Z',
      },
    ];
    setReports(mockReports);
    setIsLoading(false);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesDateRange = (!dateRange.start || new Date(report.createdAt) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(report.createdAt) <= new Date(dateRange.end));
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  const handleGenerate = () => {
    router.push('/reports/generate');
  };

  const handleDownload = (fileUrl: string) => {
    // TODO: Implement download logic
    console.log(`Downloading report from ${fileUrl}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete logic
    console.log(`Deleting report ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
        <PermissionGate permissions={['manage:reports']}>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            Generate Report
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
                  placeholder="Search reports..."
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
                <option value="INCIDENT">Incident</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="SYSTEM">System</option>
                <option value="AUDIT">Audit</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    Loading reports...
                  </td>
                </tr>
              ) : filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No reports found
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiFileText className="h-5 w-5 text-gray-400" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">ID: {report.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.type === 'INCIDENT' ? 'bg-blue-100 text-blue-800' :
                        report.type === 'EMERGENCY' ? 'bg-red-100 text-red-800' :
                        report.type === 'SYSTEM' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        report.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.createdBy}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <PermissionGate permissions={['manage:reports']}>
                          {report.fileUrl && (
                            <button
                              onClick={() => handleDownload(report.fileUrl!)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <FiDownload className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(report.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <FiTrash2 className="h-5 w-5" />
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