// Duplicate detection — checks email, phone, WhatsApp
// Excludes the current applicant's own record (for re-editing)
import { serverClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { email, phone_code, phone_number, wp_code, wp_number, exclude_id } = await req.json()
    const excl = exclude_id || '00000000-0000-0000-0000-000000000000'

    // Check email
    if (email) {
      const { data } = await serverClient
        .from('applications')
        .select('id')
        .ilike('email', email)
        .neq('id', excl)
        .limit(1)
        .maybeSingle()
      if (data) return NextResponse.json({ duplicate: 'email' })
    }

    // Check phone
    if (phone_code && phone_number) {
      const { data } = await serverClient
        .from('applications')
        .select('id')
        .eq('phone_code', phone_code)
        .eq('phone_number', phone_number)
        .neq('id', excl)
        .limit(1)
        .maybeSingle()
      if (data) return NextResponse.json({ duplicate: 'phone' })
    }

    // Check WhatsApp
    if (wp_code && wp_number) {
      const { data } = await serverClient
        .from('applications')
        .select('id')
        .eq('wp_code', wp_code)
        .eq('wp_number', wp_number)
        .neq('id', excl)
        .limit(1)
        .maybeSingle()
      if (data) return NextResponse.json({ duplicate: 'whatsapp' })
    }

    return NextResponse.json({ duplicate: null })
  } catch (err) {
    console.error('check error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
