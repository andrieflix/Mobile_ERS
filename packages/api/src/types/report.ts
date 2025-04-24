export type ReportType = 'FIRE' | 'MEDICAL' | 'POLICE' | 'NATURAL_DISASTER';
export type ReportStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  generatedBy: string;
  fileSize: string;
} 