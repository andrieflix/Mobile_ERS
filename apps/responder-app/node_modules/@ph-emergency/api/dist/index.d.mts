import { z } from 'zod';

declare const ReportSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["emergency", "user", "system", "custom"]>;
    status: z.ZodEnum<["pending", "completed", "failed"]>;
    generatedBy: z.ZodString;
    createdAt: z.ZodString;
    fileSize: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    type: "custom" | "emergency" | "user" | "system";
    status: "pending" | "completed" | "failed";
    generatedBy: string;
    createdAt: string;
    fileSize: string;
}, {
    id: string;
    title: string;
    type: "custom" | "emergency" | "user" | "system";
    status: "pending" | "completed" | "failed";
    generatedBy: string;
    createdAt: string;
    fileSize: string;
}>;
type Report = z.infer<typeof ReportSchema>;
declare const ReportConfigSchema: z.ZodObject<{
    type: z.ZodEnum<["emergency", "user", "system", "custom"]>;
    dateRange: z.ZodObject<{
        start: z.ZodString;
        end: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>;
    format: z.ZodEnum<["pdf", "csv", "excel"]>;
    filters: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    type: "custom" | "emergency" | "user" | "system";
    dateRange: {
        start: string;
        end: string;
    };
    format: "pdf" | "csv" | "excel";
    filters: Record<string, any>;
}, {
    type: "custom" | "emergency" | "user" | "system";
    dateRange: {
        start: string;
        end: string;
    };
    format: "pdf" | "csv" | "excel";
    filters: Record<string, any>;
}>;
type ReportConfig = z.infer<typeof ReportConfigSchema>;
declare class APIError extends Error {
    status: number;
    constructor(status: number, message: string);
}
declare const fetchReports: () => Promise<Report[]>;
declare const generateReport: (config: ReportConfig) => Promise<Report>;
declare const downloadReport: (reportId: string) => Promise<Blob>;
declare const deleteReport: (reportId: string) => Promise<void>;

export { APIError, type Report, type ReportConfig, ReportConfigSchema, ReportSchema, deleteReport, downloadReport, fetchReports, generateReport };
