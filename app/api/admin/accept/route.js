// Admin accepts payment — updates status + sends congratulatory email
import { serverClient } from '@/lib/supabase'
import { browserClient } from '@/lib/supabase'
import { Resend } from 'resend'
import { acceptanceEmail } from '@/lib/emailTemplates'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    // Verify admin is authenticated (checks JWT from Authorization header)
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await browserClient.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { id, lang = 'fr', notes } = await req.json()

    // Update status
    const { data: app, error: updateErr } = await serverClient
      .from('applications')
      .update({
        status: 'payment_accepted',
        admin_notes: notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()
    if (updateErr) throw updateErr

    // Send acceptance email to applicant
    const { subject, html } = acceptanceEmail(app, lang)
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to:   app.email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('accept error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
