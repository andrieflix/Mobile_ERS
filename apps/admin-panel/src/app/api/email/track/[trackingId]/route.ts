import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getTrackingData, updateTrackingData } from '@/utils/emailTracking';

export async function GET(
  request: Request,
  { params }: { params: { trackingId: string } }
) {
  try {
    const { trackingId } = params;

    // Get tracking data
    const trackingData = getTrackingData(trackingId);
    if (trackingData) {
      // Update open time if not already set
      if (!trackingData.openedAt) {
        updateTrackingData(trackingId, { openedAt: Date.now() });
        
        // Log the email open
        console.log('Email opened:', {
          trackingId,
          email: trackingData.email,
          subject: trackingData.subject,
          sentAt: new Date(trackingData.sentAt).toISOString(),
          openedAt: new Date(Date.now()).toISOString(),
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