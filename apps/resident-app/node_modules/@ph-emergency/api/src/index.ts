import { z } from 'zod';

export const ReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['emergency', 'user', 'system', 'custom']),
  status: z.enum(['pending', 'completed', 'failed']),
  generatedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  fileSize: z.string(),
  format: z.enum(['pdf', 'csv', 'excel']).optional(),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }).optional(),
  incidentDetails: z.object({
    incidentId: z.number(),
    cause: z.string(),
    casualties: z.object({
      fatalities: z.number(),
      injuries: z.number(),
      missing: z.number(),
    }),
    propertyDamage: z.object({
      description: z.string(),
      estimatedCost: z.number(),
      affectedAreas: z.string(),
    }),
    actionsTaken: z.string(),
    recommendations: z.string(),
    weatherConditions: z.string(),
    responseTime: z.string(),
    resourcesDeployed: z.string(),
    challengesFaced: z.string(),
    lessonsLearned: z.string(),
    attachments: z.array(z.instanceof(File)),
  }).optional(),
});

export type Report = z.infer<typeof ReportSchema>;

export const ReportConfigSchema = z.object({
  type: z.enum(['emergency', 'user', 'system', 'custom']),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  format: z.enum(['pdf', 'csv', 'excel']),
  filters: z.record(z.any()),
});

export type ReportConfig = z.infer<typeof ReportConfigSchema>;

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const fetchReports = async (): Promise<Report[]> => {
  const response = await fetch('/api/reports');
  if (!response.ok) {
    throw new APIError(response.status, 'Failed to fetch reports');
  }
  const data = await response.json();
  return ReportSchema.array().parse(data);
};

export const generateReport = async (config: ReportConfig): Promise<Report> => {
  const response = await fetch('/api/reports/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
  });
  if (!response.ok) {
    throw new APIError(response.status, 'Failed to generate report');
  }
  const data = await response.json();
  return ReportSchema.parse(data);
};

export const downloadReport = async (reportId: string): Promise<Blob> => {
  const response = await fetch(`/api/reports/${reportId}/download`);
  if (!response.ok) {
    throw new APIError(response.status, 'Failed to download report');
  }
  return response.blob();
};

export const deleteReport = async (reportId: string): Promise<void> => {
  const response = await fetch(`/api/reports/${reportId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new APIError(response.status, 'Failed to delete report');
  }
}; 