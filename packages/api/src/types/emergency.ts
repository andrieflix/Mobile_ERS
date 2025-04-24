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

export type EmergencyType = 
  | 'medical'
  | 'fire'
  | 'police'
  | 'natural_disaster'
  | 'traffic_accident'
  | 'other';

export type EmergencyStatus = 
  | 'reported'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'cancelled';

export type EmergencySeverity = 
  | 'low'
  | 'medium'
  | 'high'
  | 'critical';

// Zod schemas for validation
export const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
});

export const emergencyReportSchema = z.object({
  id: z.string(),
  type: z.enum(['medical', 'fire', 'police', 'natural_disaster', 'traffic_accident', 'other']),
  location: locationSchema,
  description: z.string(),
  reporterId: z.string(),
  status: z.enum(['reported', 'assigned', 'in_progress', 'resolved', 'cancelled']),
  createdAt: z.date(),
  updatedAt: z.date(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  assignedResponders: z.array(z.string()).optional(),
}); 