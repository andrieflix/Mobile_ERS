import { z } from 'zod';
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: UserRole;
    location?: Location;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type UserRole = 'admin' | 'responder' | 'resident';
export interface ResponderProfile {
    userId: string;
    department: string;
    specialization: string[];
    availability: boolean;
    currentLocation?: Location;
    assignedEmergencies?: string[];
}
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phoneNumber: z.ZodString;
    role: z.ZodEnum<["admin", "responder", "resident"]>;
    location: z.ZodOptional<z.ZodObject<{
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
    }>>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: "admin" | "responder" | "resident";
    isActive: boolean;
    location?: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    } | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: "admin" | "responder" | "resident";
    isActive: boolean;
    location?: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    } | undefined;
}>;
export declare const responderProfileSchema: z.ZodObject<{
    userId: z.ZodString;
    department: z.ZodString;
    specialization: z.ZodArray<z.ZodString, "many">;
    availability: z.ZodBoolean;
    currentLocation: z.ZodOptional<z.ZodObject<{
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
    }>>;
    assignedEmergencies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    department: string;
    specialization: string[];
    availability: boolean;
    currentLocation?: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    } | undefined;
    assignedEmergencies?: string[] | undefined;
}, {
    userId: string;
    department: string;
    specialization: string[];
    availability: boolean;
    currentLocation?: {
        latitude: number;
        longitude: number;
        address?: string | undefined;
    } | undefined;
    assignedEmergencies?: string[] | undefined;
}>;
