'use client';

import { useState, useEffect } from 'react';
import { FiArrowLeft, FiDownload, FiEdit2, FiTrash2, FiEye, FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { Report, ReportType, ReportStatus } from '@/types';
import { reportService } from '@/services/reportService';
import { toast } from 'react-hot-toast';

interface Filters {
  type: ReportType | undefined;
  status: ReportStatus | undefined;
  search: string;
  startDate: string;
  endDate: string;
  format: string;
}

const reportTypes = ['emergency', 'user', 'system', 'custom'] as const;
const reportStatuses = ['pending', 'completed', 'failed'] as const;

export default function ManageReportsPage() {
  // State
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  // Modals
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filters and Pagination
  const [filters, setFilters] = useState<Filters>({
    type: undefined,
    status: undefined,
    search: '',
    startDate: '',
    endDate: '',
    format: ''
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [sort, setSort] = useState({ field: 'createdAt', order: 'desc' as 'asc' | 'desc' });
  const ITEMS_PER_PAGE = 10;

  // Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportService.fetchReports({
        page,
        limit: ITEMS_PER_PAGE,
        search: filters.search,
        type: filters.type,
        status: filters.status,
        sortBy: sort.field,
        sortOrder: sort.order,
        startDate: filters.startDate,
        endDate: filters.endDate,
        format: filters.format
      });

      setReports(response.reports);
      setTotalPages(response.totalPages);
      setTotalReports(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reports');
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, filters, sort]);

  // Handlers
  const handleSort = (field: string) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDeleteReport = async (id: string) => {
    try {
      await reportService.deleteReport(id);
      setReports(reports.filter(report => report.id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleUpdate = async (updatedReport: Report) => {
    try {
      await reportService.updateReport(updatedReport.id, updatedReport);
      toast.success('Report updated successfully');
      fetchReports();
      setIsEditModalOpen(false);
      setSelectedReport(null);
    } catch (err) {
      toast.error('Failed to update report');
    }
  };

  const handleDownloadReport = async (id: string) => {
    try {
      const blob = await reportService.downloadReport(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || report.type === filters.type;
    const matchesStatus = !filters.status || report.status === filters.status;
    const matchesFormat = !filters.format || (report as any).format === filters.format;
    const matchesDateRange = (!filters.startDate && !filters.endDate) || 
      (new Date(report.createdAt) >= new Date(filters.startDate) && 
       new Date(report.createdAt) <= new Date(filters.endDate));
    return matchesSearch && matchesType && matchesStatus && matchesFormat && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/reports" 
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full transition-colors"
        >
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Manage Reports</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filters.type ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setFilters(prev => ({
                  ...prev,
                  type: value === '' ? undefined : value as ReportType
                }));
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filters.status ?? ''}
              onChange={(e) => {
                const value = e.target.value;
                setFilters(prev => ({
                  ...prev,
                  status: value === '' ? undefined : value as ReportStatus
                }));
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {reportStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Format Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filters.format}
              onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Formats</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-600">
              {error}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { field: 'title', label: 'Report Name' },
                    { field: 'type', label: 'Type' },
                    { field: 'status', label: 'Status' },
                    { field: 'generatedBy', label: 'Created by' },
                    { field: 'createdAt', label: 'Created At' },
                    { field: 'fileSize', label: 'Size' },
                  ].map(({ field, label }) => (
                    <th
                      key={field}
                      onClick={() => handleSort(field)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {sort.field === field && (
                          <span className="text-blue-600">
                            {sort.order === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report: Report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-wrap">
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-wrap">
                      <span className={`status-badge ${report.status}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                      {report.generatedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-500">
                      {report.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {report.status === 'completed' && (
                          <button
                            onClick={() => handleDownloadReport(report.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FiDownload className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(page * ITEMS_PER_PAGE, totalReports)}
                </span>{' '}
                of <span className="font-medium">{totalReports}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">First</span>
                  <FiChevronLeft className="h-5 w-5" />
                  <FiChevronLeft className="h-5 w-5 -ml-2" />
                </button>
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <span className="sr-only">Last</span>
                  <FiChevronRight className="h-5 w-5" />
                  <FiChevronRight className="h-5 w-5 -ml-2" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsViewModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Range</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedReport.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(selectedReport.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created By</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.generatedBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Format</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReport.format}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedReport.status === 'completed' ? 'bg-green-100 text-green-800' :
                      selectedReport.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedReport.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                {selectedReport.status === 'completed' && (
                  <button
                    onClick={() => handleDownloadReport(selectedReport.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <FiDownload className="h-4 w-4" />
                    Download
                  </button>
                )}
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsEditModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Report</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={selectedReport.title}
                    onChange={(e) => setSelectedReport({ ...selectedReport, title: e.target.value })}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={selectedReport.type}
                    onChange={(e) => {
                      const value = e.target.value as ReportType;
                      setSelectedReport({ ...selectedReport, type: value });
                    }}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={selectedReport.dateRange?.start || selectedReport.createdAt}
                      onChange={(e) => setSelectedReport({
                        ...selectedReport,
                        dateRange: {
                          start: e.target.value,
                          end: selectedReport.dateRange?.end || selectedReport.createdAt
                        }
                      })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={selectedReport.dateRange?.end || selectedReport.createdAt}
                      onChange={(e) => setSelectedReport({
                        ...selectedReport,
                        dateRange: {
                          start: selectedReport.dateRange?.start || selectedReport.createdAt,
                          end: e.target.value
                        }
                      })}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => handleUpdate(selectedReport)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsDeleteModalOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Delete Report</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this report? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => handleDeleteReport(selectedReport.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 