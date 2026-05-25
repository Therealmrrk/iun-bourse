// Saves admin internal notes without changing status
import { serverClient } from '@/lib/supabase'
import { browserClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await browserClient.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

    const { id, notes } = await req.json()
    const { error } = await serverClient
      .from('applications')
      .update({ admin_notes: notes })
      .eq('id', id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('notes error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
