import { Report, ReportStatus, ReportType } from '@/types';
import { FetchReportsParams, FetchReportsResponse } from '../types';
import { api } from './api';

// Mock data - Replace with actual API calls in production
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Emergency Response Times Q1 2024',
    type: ReportType.EMERGENCY_SUMMARY,
    dateRange: {
      start: '2024-01-01',
      end: '2024-03-31'
    },
    createdAt: '2024-03-31T15:30:00Z',
    status: ReportStatus.COMPLETED,
    size: '2.4 MB',
    createdBy: 'John Doe',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'User Activity Report - March 2024',
    type: ReportType.USER_ACTIVITY,
    dateRange: {
      start: '2024-03-01',
      end: '2024-03-31'
    },
    createdAt: '2024-04-01T10:15:00Z',
    status: ReportStatus.COMPLETED,
    size: '1.8 MB',
    createdBy: 'Jane Smith',
    format: 'EXCEL'
  },
  {
    id: '3',
    name: 'Monthly Performance Summary',
    type: ReportType.RESPONSE_PERFORMANCE,
    dateRange: {
      start: '2024-03-01',
      end: '2024-03-31'
    },
    createdAt: '2024-04-01T08:45:00Z',
    status: ReportStatus.PROCESSING,
    size: 'N/A',
    createdBy: 'Mike Johnson',
    format: 'PDF'
  },
  // Add more mock data for pagination testing
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 4}`,
    name: `Sample Report ${i + 4}`,
    type: Object.values(ReportType)[i % Object.values(ReportType).length],
    dateRange: {
      start: '2024-01-01',
      end: '2024-03-31'
    },
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    status: Object.values(ReportStatus)[i % Object.values(ReportStatus).length],
    size: `${(Math.random() * 5).toFixed(1)} MB`,
    createdBy: ['John Doe', 'Jane Smith', 'Mike Johnson'][i % 3],
    format: ['PDF', 'EXCEL', 'CSV'][i % 3]
  }))
];

class ReportService {
  async fetchReports(params: FetchReportsParams): Promise<FetchReportsResponse> {
    const response = await api.get('/reports', { params });
    return response.data;
  }

  async createReport(data: Partial<Report>): Promise<Report> {
    const response = await api.post('/reports', data);
    return response.data;
  }

  async updateReport(id: string, data: Partial<Report>): Promise<Report> {
    const response = await api.put(`/reports/${id}`, data);
    return response.data;
  }

  async deleteReport(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
  }

  async downloadReport(id: string): Promise<Blob> {
    const response = await api.get(`/reports/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
}

export const reportService = new ReportService(); 