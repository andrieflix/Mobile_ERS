import { z } from 'zod';

declare const ReportSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["emergency", "user", "system", "custom"]>;
    status: z.ZodEnum<["pending", "completed", "failed"]>;
    generatedBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    fileSize: z.ZodString;
    format: z.ZodOptional<z.ZodEnum<["pdf", "csv", "excel"]>>;
    dateRange: z.ZodOptional<z.ZodObject<{
        start: z.ZodString;
        end: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start: string;
        end: string;
    }, {
        start: string;
        end: string;
    }>>;
    incidentDetails: z.ZodOptional<z.ZodObject<{
        incidentId: z.ZodNumber;
        cause: z.ZodString;
        casualties: z.ZodObject<{
            fatalities: z.ZodNumber;
            injuries: z.ZodNumber;
            missing: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            fatalities: number;
            injuries: number;
            missing: number;
        }, {
            fatalities: number;
            injuries: number;
            missing: number;
        }>;
        propertyDamage: z.ZodObject<{
            description: z.ZodString;
            estimatedCost: z.ZodNumber;
            affectedAreas: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            description: string;
            estimatedCost: number;
            affectedAreas: string;
        }, {
            description: string;
            estimatedCost: number;
            affectedAreas: string;
        }>;
        actionsTaken: z.ZodString;
        recommendations: z.ZodString;
        weatherConditions: z.ZodString;
        responseTime: z.ZodString;
        resourcesDeployed: z.ZodString;
        challengesFaced: z.ZodString;
        lessonsLearned: z.ZodString;
        attachments: z.ZodArray<z.ZodType<File, z.ZodTypeDef, File>, "many">;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    type: "custom" | "emergency" | "user" | "system";
    status: "pending" | "completed" | "failed";
    generatedBy: string;
    createdAt: string;
    updatedAt: string;
    fileSize: string;
    format?: "pdf" | "csv" | "excel" | undefined;
    dateRange?: {
        start: string;
        end: string;
    } | undefined;
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
    } | undefined;
}, {
    id: string;
    title: string;
    type: "custom" | "emergency" | "user" | "system";
    status: "pending" | "completed" | "failed";
    generatedBy: string;
    createdAt: string;
    updatedAt: string;
    fileSize: string;
    format?: "pdf" | "csv" | "excel" | undefined;
    dateRange?: {
        start: string;
        end: string;
    } | undefined;
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
    } | undefined;
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
    format: "pdf" | "csv" | "excel";
    dateRange: {
        start: string;
        end: string;
    };
    filters: Record<string, any>;
}, {
    type: "custom" | "emergency" | "user" | "system";
    format: "pdf" | "csv" | "excel";
    dateRange: {
        start: string;
        end: string;
    };
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
