export interface Emergency {
  id: number;
  type: 'Fire' | 'Medical' | 'Police' | 'Natural Disaster';
  location: string;
  status: 'Active' | 'Resolved' | 'Pending';
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Responder' | 'Dispatcher';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
}

export interface AnalyticsData {
  activeEmergencies: number;
  totalUsers: number;
  responseRate: number;
  avgResponseTime: number;
  emergenciesByType: {
    type: string;
    count: number;
  }[];
  responseTimeHistory: {
    date: string;
    time: number;
    system: 'manual' | 'automated';
  }[];
}

export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  displayPreferences: {
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
}

export type ReportType = 'emergency' | 'user' | 'system' | 'custom';

export type ReportStatus = 'pending' | 'completed' | 'failed';

export interface DateRange {
  start: string;
  end: string;
}

export interface ReportConfig {
  type: ReportType;
  dateRange: DateRange;
  format: 'pdf' | 'csv' | 'excel';
  filters: Record<string, any>;
}

export interface Report {
  id: string;
  name: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  generatedBy: string;
  createdAt: string;
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

export interface FetchReportsParams {
  page: number;
  limit: number;
  search?: string;
  type?: ReportType;
  status?: ReportStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  format?: string;
}

export interface FetchReportsResponse {
  reports: Report[];
  total: number;
  totalPages: number;
} 