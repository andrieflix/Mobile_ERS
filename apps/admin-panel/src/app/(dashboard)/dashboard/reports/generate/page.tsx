'use client';

import { useState, useEffect } from 'react';
import { Report, ReportType, Emergency, ReportStatus } from '@/types';
import { reportService } from '@/services/reportService';
import { toast } from 'react-hot-toast';
import IncidentReportForm from './IncidentReportForm';

export default function GenerateReportPage() {
  const [reportType, setReportType] = useState<ReportType>('emergency');
  const [activeEmergencies, setActiveEmergencies] = useState<Emergency[]>([]);
  const [userRole, setUserRole] = useState<string>(''); // In production, get this from auth context

  useEffect(() => {
    // In production, fetch active emergencies from API
    // For now, using mock data
    setActiveEmergencies([
      {
        id: 1,
        type: 'Fire',
        location: '123 Main St',
        status: 'Active',
        description: 'Building fire on the second floor',
        priority: 'High',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);

    // In production, get user role from auth context
    setUserRole('Responder');
  }, []);

  const handleGenerateReport = async (reportData: Partial<Report>) => {
    try {
      await reportService.createReport(reportData);
      toast.success('Report generation initiated');
      // Redirect to reports list or show success message
    } catch (error) {
      toast.error('Failed to generate report');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Generate Report</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="emergency">Emergency</option>
            <option value="user">User</option>
            <option value="system">System</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {reportType === 'emergency' ? (
          <IncidentReportForm
            userRole={userRole}
            activeEmergencies={activeEmergencies}
            onSubmit={handleGenerateReport}
          />
        ) : (
          <div className="space-y-6">
            {/* Other report type forms */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <input
                  type="date"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Format</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => handleGenerateReport({
                  type: reportType,
                  status: 'pending',
                  format: 'pdf'
                })}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Generate Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 