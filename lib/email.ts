import { Resend } from 'resend';

// Use a dummy key during build if not set, actual validation happens in sendEmail
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email sending skipped.');
    return { success: false, error: 'Missing API Key' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Arkitecnicos <onboarding@resend.dev>', // Update this with your verified domain
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
