import { Report, ReportType, ReportStatus } from '../types/report';
interface Analytics {
    totalReports: number;
    reportsByType: Record<ReportType, number>;
    reportsByStatus: Record<ReportStatus, number>;
    averageResponseTime: number;
    responseTimeHistory: Array<{
        date: string;
        time: number;
    }>;
    trends: {
        daily: Array<{
            date: string;
            count: number;
        }>;
        weekly: Array<{
            week: string;
            count: number;
        }>;
        monthly: Array<{
            month: string;
            count: number;
        }>;
    };
    metrics: {
        resolutionRate: number;
        averageResolutionTime: number;
        peakHours: Array<{
            hour: number;
            count: number;
        }>;
        topLocations: Array<{
            location: string;
            count: number;
        }>;
    };
}
export declare class ReportService {
    getReport(id: string): Promise<Report>;
    getReports(): Promise<{
        reports: Report[];
        total: number;
    }>;
    getReportsByType(type: ReportType): Promise<Report[]>;
    getReportsByStatus(status: ReportStatus): Promise<Report[]>;
    getAnalytics(): Promise<Analytics>;
    generateReport(type: ReportType, config: any): Promise<Report>;
    downloadReport(id: string): Promise<Blob>;
    deleteReport(id: string): Promise<void>;
}
export {};
