// Retrieves an existing application by session token (for resume)
import { serverClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    if (!token) return NextResponse.json({ application: null })

    const { data, error } = await serverClient
      .from('applications')
      .select('*')
      .eq('session_token', token)
      .maybeSingle()

    if (error) throw error
    return NextResponse.json({ application: data })
  } catch (err) {
    console.error('get error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
