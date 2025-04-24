import { z } from 'zod';
export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}
export interface EmergencyReport {
    id: string;
    type: EmergencyType;
    location: Location;
    description: string;
    reporterId: string;
    status: EmergencyStatus;
    createdAt: Date;
    updatedAt: Date;
    severity: EmergencySeverity;
    assignedResponders?: string[];
}
export type EmergencyType = 'medical' | 'fire' | 'police' | 'natural_disaster' | 'traffic_accident' | 'other';
export type EmergencyStatus = 'reported' | 'assigned' | 'in_progress' | 'resolved' | 'cancelled';
export type EmergencySeverity = 'low' | 'medium' | 'high' | 'critical';
export declare const locationSchema: z.ZodObject<{
    latitude: z.ZodNumber;
    longitude: z.ZodNumber;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    latitude: number;
    longitude: number;
    address?: string | undefined;
}, {
    latitude: number;
    longitude: number;
    address?: string | undefined;
}>;
export declare const emergencyReportSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["medical", "fire", "police", "natural_disaster", "traffic_accident", "other"]>;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    }, {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    }>;
    description: z.ZodString;
    reporterId: z.ZodString;
    status: z.ZodEnum<["reported", "assigned", "in_progress", "resolved", "cancelled"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    severity: z.ZodEnum<["low", "medium", "high", "critical"]>;
    assignedResponders: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "medical" | "fire" | "police" | "natural_disaster" | "traffic_accident" | "other";
    status: "reported" | "assigned" | "in_progress" | "resolved" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    location: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    };
    description: string;
    reporterId: string;
    severity: "low" | "medium" | "high" | "critical";
    assignedResponders?: string[] | undefined;
}, {
    id: string;
    type: "medical" | "fire" | "police" | "natural_disaster" | "traffic_accident" | "other";
    status: "reported" | "assigned" | "in_progress" | "resolved" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    location: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    };
    description: string;
    reporterId: string;
    severity: "low" | "medium" | "high" | "critical";
    assignedResponders?: string[] | undefined;
}>;
