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

export type UserRole = 
  | 'admin'
  | 'responder'
  | 'resident';

export interface ResponderProfile {
  userId: string;
  department: string;
  specialization: string[];
  availability: boolean;
  currentLocation?: Location;
  assignedEmergencies?: string[];
}

// Zod schemas for validation
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  role: z.enum(['admin', 'responder', 'resident']),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().optional(),
  }).optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const responderProfileSchema = z.object({
  userId: z.string(),
  department: z.string(),
  specialization: z.array(z.string()),
  availability: z.boolean(),
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
    address: z.string().optional(),
  }).optional(),
  assignedEmergencies: z.array(z.string()).optional(),
}); 