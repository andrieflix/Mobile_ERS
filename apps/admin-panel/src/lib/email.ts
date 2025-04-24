import nodemailer from 'nodemailer';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify the transporter configuration
transporter.verify((error) => {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to send emails');
  }
});

// Base email template with tracking pixel
const baseTemplate = (content: string, trackingId?: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    ${content}
    ${trackingId ? `
      <img 
        src="${process.env.NEXT_PUBLIC_APP_URL}/api/email/track/${trackingId}" 
        alt="" 
        style="width: 1px; height: 1px;"
      />
    ` : ''}
  </div>
`;

export async function sendEmail({
  to,
  subject,
  html,
  trackingId,
}: {
  to: string;
  subject: string;
  html: string;
  trackingId?: string;
}) {
  try {
    const messageId = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html: baseTemplate(html, trackingId),
      headers: {
        'X-Mailer': 'Emergency Response System',
        'X-Priority': '1',
      },
    });

    console.log('Email sent:', messageId.messageId);
    return { success: true, messageId: messageId.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail({
  to,
  resetLink,
}: {
  to: string;
  resetLink: string;
}) {
  const subject = 'Password Reset Request';
  const trackingId = `reset-${Date.now()}`;
  const html = `
    <h1 style="color: #4F46E5;">Password Reset Request</h1>
    <p>You have requested to reset your password. Click the link below to proceed:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" 
         style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
    </div>
    <p>If you did not request this password reset, please ignore this email.</p>
    <p style="color: #666; font-size: 12px;">This link will expire in 1 hour.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply to this email.</p>
  `;

  return sendEmail({ to, subject, html, trackingId });
}

export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const subject = 'Welcome to Emergency Response System';
  const trackingId = `welcome-${Date.now()}`;
  const html = `
    <h1 style="color: #4F46E5;">Welcome ${name}!</h1>
    <p>Thank you for joining the Emergency Response System. We're excited to have you on board!</p>
    <p>Here's what you can do next:</p>
    <ul>
      <li>Complete your profile</li>
      <li>Set up your notification preferences</li>
      <li>Review the emergency response protocols</li>
    </ul>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
         style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
        Go to Dashboard
      </a>
    </div>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply to this email.</p>
  `;

  return sendEmail({ to, subject, html, trackingId });
}

export async function sendIncidentAlertEmail({
  to,
  name,
  incidentId,
  incidentType,
  location,
}: {
  to: string;
  name: string;
  incidentId: string;
  incidentType: string;
  location: string;
}) {
  const subject = `New Incident Alert: ${incidentType}`;
  const trackingId = `incident-${incidentId}-${Date.now()}`;
  const html = `
    <h1 style="color: #DC2626;">New Incident Alert</h1>
    <p>Hello ${name},</p>
    <p>A new incident has been reported that requires your attention:</p>
    <div style="background-color: #FEF2F2; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Type:</strong> ${incidentType}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Incident ID:</strong> ${incidentId}</p>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/incidents/${incidentId}" 
         style="display: inline-block; padding: 10px 20px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px;">
        View Incident Details
      </a>
    </div>
    <p style="color: #666; font-size: 12px;">Please respond to this incident as soon as possible.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #666; font-size: 12px;">This is an automated alert, please do not reply to this email.</p>
  `;

  return sendEmail({ to, subject, html, trackingId });
}

export async function sendStatusUpdateEmail({
  to,
  name,
  incidentId,
  status,
  updates,
}: {
  to: string;
  name: string;
  incidentId: string;
  status: string;
  updates: string[];
}) {
  const subject = `Incident Status Update: ${status}`;
  const trackingId = `status-${incidentId}-${Date.now()}`;
  const html = `
    <h1 style="color: #4F46E5;">Incident Status Update</h1>
    <p>Hello ${name},</p>
    <p>The status of incident ${incidentId} has been updated to <strong>${status}</strong>.</p>
    <div style="background-color: #F3F4F6; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h2 style="color: #4F46E5; font-size: 16px; margin-top: 0;">Recent Updates:</h2>
      <ul style="margin: 0; padding-left: 20px;">
        ${updates.map(update => `<li>${update}</li>`).join('')}
      </ul>
    </div>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/incidents/${incidentId}" 
         style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
        View Incident Details
      </a>
    </div>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="color: #666; font-size: 12px;">This is an automated update, please do not reply to this email.</p>
  `;

  return sendEmail({ to, subject, html, trackingId });
} 