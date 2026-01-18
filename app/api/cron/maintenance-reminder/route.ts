import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/connection';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET() {
  try {
    // 1. Fetch all facilities with their clients
    const { data: facilities, error } = await supabase
      .from('facilities')
      .select('*, clients(name, email)')
      .not('clients', 'is', null); // Ensure client exists

    if (error) {
      throw new Error(error.message);
    }

    const today = new Date();
    const emailsSent = [];

    for (const facility of facilities) {
      if (!facility.clients?.email) continue;

      const lastDate = new Date(facility.last_maintenance_date || facility.installation_date);
      const periodMonths = facility.maintenance_period_months || 3;
      
      // Calculate next due date
      const nextDueDate = new Date(lastDate);
      nextDueDate.setMonth(nextDueDate.getMonth() + periodMonths);

      // Check if today is the due date (ignoring time)
      const isDue = 
        today.getDate() === nextDueDate.getDate() &&
        today.getMonth() === nextDueDate.getMonth() &&
        today.getFullYear() === nextDueDate.getFullYear();

      if (isDue) {
        // Send email
        const subject = `Recordatorio de Mantenimiento: ${facility.name}`;
        const html = `
          <h1>Hola ${facility.clients.name},</h1>
          <p>Este es un recordatorio automático de que su instalación <strong>${facility.name}</strong> requiere mantenimiento.</p>
          <p>Fecha de última revisión/instalación: ${lastDate.toLocaleDateString()}</p>
          <p>Por favor contáctenos para agendar una cita.</p>
          <br/>
          <p>Atentamente,</p>
          <p>El equipo de Arkitecnicos</p>
        `;

        const result = await sendEmail(facility.clients.email, subject, html);
        if (result.success) {
          emailsSent.push({ facility: facility.name, client: facility.clients.name });
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Processed ${facilities.length} facilities. Sent ${emailsSent.length} emails.`,
      sent_to: emailsSent 
    });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
