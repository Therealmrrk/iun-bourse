// Final submission — locks the form and notifies the admin
import { serverClient } from '@/lib/supabase'
import { Resend } from 'resend'
import { adminNotificationEmail } from '@/lib/emailTemplates'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const { session_token } = await req.json()
    if (!session_token) return NextResponse.json({ error: 'missing_token' }, { status: 400 })

    // Fetch the application
    const { data: app, error: fetchErr } = await serverClient
      .from('applications')
      .select('*')
      .eq('session_token', session_token)
      .maybeSingle()

    if (fetchErr || !app) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    if (app.status === 'submitted' || app.status === 'payment_accepted') {
      return NextResponse.json({ error: 'already_submitted' }, { status: 403 })
    }

    // Lock the form — set status to submitted
    const newStatus = app.status === 'payment_rejected' ? 'submitted' : 'submitted'
    const { data: updated, error: updateErr } = await serverClient
      .from('applications')
      .update({ status: newStatus, submitted_at: new Date().toISOString(), page1_complete: true })
      .eq('session_token', session_token)
      .select()
      .single()
    if (updateErr) throw updateErr

    // Notify admin by email
    const { subject, html } = adminNotificationEmail(updated)
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to:   process.env.ADMIN_NOTIFICATION_EMAIL,
      subject,
      html,
    })

    return NextResponse.json({ application: updated })
  } catch (err) {
    console.error('submit error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
