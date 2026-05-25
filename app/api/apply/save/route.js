// Saves or updates a draft application
// Called when user clicks "Save" or "Next" on Page 1, or "Save" on Page 2
import { serverClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { session_token, ...fields } = body

    if (!session_token) {
      return NextResponse.json({ error: 'missing_token' }, { status: 400 })
    }

    // Check if record exists for this token
    const { data: existing } = await serverClient
      .from('applications')
      .select('id, status')
      .eq('session_token', session_token)
      .maybeSingle()

    // Do not allow saving if already submitted (unless resubmitting payment)
    if (existing?.status === 'payment_accepted') {
      return NextResponse.json({ error: 'already_accepted' }, { status: 403 })
    }

    let result
    if (existing) {
      // Only allow editing payment_proof if status is payment_rejected
      const allowedFields = existing.status === 'payment_rejected'
        ? { payment_proof_url: fields.payment_proof_url }
        : fields

      const { data, error } = await serverClient
        .from('applications')
        .update({ ...allowedFields, updated_at: new Date().toISOString() })
        .eq('session_token', session_token)
        .select()
        .single()
      if (error) throw error
      result = data
    } else {
      // New application
      const { data, error } = await serverClient
        .from('applications')
        .insert({ session_token, ...fields })
        .select()
        .single()
      if (error) throw error
      result = data
    }

    return NextResponse.json({ application: result })
  } catch (err) {
    console.error('save error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
