import { Report, ReportConfig, ReportSchema, generateReport as apiGenerateReport, downloadReport as apiDownloadReport, deleteReport as apiDeleteReport } from '@ph-emergency/api';
import { FetchReportsParams, FetchReportsResponse } from '../types';
import api from './api';

// Update the Report type to match API response
type APIReport = {
  id: string;
  title: string;
  type: 'emergency' | 'user' | 'system' | 'custom';
  status: 'pending' | 'completed' | 'failed';
  generatedBy: string;
  createdAt: string;
  fileSize: string;
};

export const createReport = async (config: ReportConfig): Promise<Report> => {
  try {
    const response = await api.post('/api/reports/generate', config);
    return ReportSchema.parse(response.data);
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

export const downloadReport = async (reportId: string): Promise<Blob> => {
  try {
    const response = await api.get(`/api/reports/${reportId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};

export const deleteReportById = async (reportId: string): Promise<void> => {
  try {
    await api.delete(`/api/reports/${reportId}`);
  } catch (error) {
    console.error('Error deleting report:', error);
    throw error;
  }
};

export class ReportService {
  async generateReport(config: ReportConfig): Promise<Report> {
    try {
      return await apiGenerateReport(config);
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  async fetchReports(params: FetchReportsParams): Promise<FetchReportsResponse> {
    try {
      const response = await api.get('/api/reports', { params });
      const reports = ReportSchema.array().parse(response.data.reports);
      return {
        reports,
        total: response.data.total,
        totalPages: Math.ceil(response.data.total / params.limit)
      };
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  async createReport(data: Partial<Report>): Promise<Report> {
    try {
      const response = await api.post('/api/reports', data);
      return ReportSchema.parse(response.data);
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  }

  async updateReport(id: string, data: Partial<Report>): Promise<Report> {
    try {
      const response = await api.put(`/api/reports/${id}`, data);
      return ReportSchema.parse(response.data);
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  }

  async deleteReport(id: string): Promise<void> {
    try {
      await api.delete(`/api/reports/${id}`);
    } catch (error) {
      console.error('Error deleting report:', error);
      throw error;
    }
  }

  async downloadReport(id: string): Promise<Blob> {
    try {
      const response = await api.get(`/api/reports/${id}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
}

export const reportService = new ReportService();

export async function fetchReports(): Promise<Report[]> {
  try {
    const response = await api.get('/api/reports');
    return ReportSchema.array().parse(response.data);
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
} 