// Saves or updates a draft application safely
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

    // Do not allow saving if already processed & accepted by admin
    if (existing?.status === 'payment_accepted') {
      return NextResponse.json({ error: 'already_accepted' }, { status: 403 })
    }

    let result
    if (existing) {
      // 🛠️ FIX: Clean, reliable object binding matching Phase 1 mechanics
      let fieldsToUpdate = { ...fields }

      // If they were rejected, explicitly enforce changing the tracking flag back to submitted
      if (existing.status === 'payment_rejected') {
        fieldsToUpdate.status = fields.status || 'submitted'
      }

      // Explicitly ensure payment_proof_url is preserved if passed in the payload body
      if (fields.payment_proof_url) {
        fieldsToUpdate.payment_proof_url = fields.payment_proof_url
      }

      const { data, error } = await serverClient
        .from('applications')
        .update({ 
          ...fieldsToUpdate, 
          updated_at: new Date().toISOString() 
        })
        .eq('session_token', session_token)
        .select()
        .single()
        
      if (error) throw error
      result = data
    } else {
      // Brand new application initialization (Phase 1 first creation step)
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
    console.error('CRITICAL BACKEND SAVE ERROR:', err.message)
    return NextResponse.json({ error: 'server_error', details: err.message }, { status: 500 })
  }
}