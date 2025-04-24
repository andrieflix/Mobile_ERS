import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In a real application, this would be stored in a database
const emailTracking = new Map<string, {
  email: string;
  subject: string;
  sentAt: number;
  openedAt?: number;
}>();

export async function GET(
  request: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params;

    // Get tracking data
    const trackingData = emailTracking.get(trackingId);
    if (trackingData) {
      // Update open time if not already set
      if (!trackingData.openedAt) {
        trackingData.openedAt = Date.now();
        emailTracking.set(trackingId, trackingData);
        
        // Log the email open
        console.log('Email opened:', {
          trackingId,
          email: trackingData.email,
          subject: trackingData.subject,
          sentAt: new Date(trackingData.sentAt).toISOString(),
          openedAt: new Date(trackingData.openedAt).toISOString(),
        });
      }
    }

    // Return a 1x1 transparent GIF
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    return new NextResponse(pixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Email tracking error:', error);
    return new NextResponse(null, { status: 500 });
  }
}

// Helper function to store tracking data when sending emails
export function storeTrackingData(trackingId: string, data: {
  email: string;
  subject: string;
  sentAt: number;
}) {
  emailTracking.set(trackingId, data);
} 