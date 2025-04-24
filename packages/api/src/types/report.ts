export type ReportType = 'emergency' | 'user' | 'system' | 'custom';
export type ReportStatus = 'pending' | 'completed' | 'failed';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  generatedBy: string;
  fileSize: string;
  format?: 'pdf' | 'csv' | 'excel';
  dateRange?: {
    start: string;
    end: string;
  };
  incidentDetails?: {
    incidentId: number;
    cause: string;
    casualties: {
      fatalities: number;
      injuries: number;
      missing: number;
    };
    propertyDamage: {
      description: string;
      estimatedCost: number;
      affectedAreas: string;
    };
    actionsTaken: string;
    recommendations: string;
    weatherConditions: string;
    responseTime: string;
    resourcesDeployed: string;
    challengesFaced: string;
    lessonsLearned: string;
    attachments: File[];
  };
} 