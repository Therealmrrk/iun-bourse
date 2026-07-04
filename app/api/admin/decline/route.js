// Admin declines payment — updates status + sends rejection email
import { serverClient } from '@/lib/supabase'
import { browserClient } from '@/lib/supabase'
import { Resend } from 'resend'
import { rejectionEmail } from '@/lib/emailTemplates'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await browserClient.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { id, lang = 'fr', notes } = await req.json()

    const { data: app, error: updateErr } = await serverClient
      .from('applications')
      .update({
        status: 'payment_rejected',
        admin_notes: notes || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()
    if (updateErr) throw updateErr

    const { subject, html } = rejectionEmail(app, lang)
    const { data: emailData, error: emailErr } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to:   app.email,
      subject,
      html,
    })

    if (emailErr) {
      console.error('Resend error declining application:', emailErr)
      throw new Error(emailErr.message || 'Failed to send rejection email')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('decline error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
