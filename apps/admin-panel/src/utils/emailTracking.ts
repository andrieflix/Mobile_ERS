// In a real application, this would be stored in a database
const emailTracking = new Map<string, {
  email: string;
  subject: string;
  sentAt: number;
  openedAt?: number;
}>();

// Helper function to store tracking data when sending emails
export function storeTrackingData(trackingId: string, data: {
  email: string;
  subject: string;
  sentAt: number;
}) {
  emailTracking.set(trackingId, data);
}

export function getTrackingData(trackingId: string) {
  return emailTracking.get(trackingId);
}

export function updateTrackingData(trackingId: string, data: {
  openedAt: number;
}) {
  const existingData = emailTracking.get(trackingId);
  if (existingData) {
    emailTracking.set(trackingId, { ...existingData, ...data });
  }
} 