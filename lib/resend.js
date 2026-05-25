// lib/resend.js — Resend email client
// ONLY used in API routes (server-side)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'bourses@iun.tg',
      to,
      subject,
      html,
    });
    if (error) throw error;
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}
