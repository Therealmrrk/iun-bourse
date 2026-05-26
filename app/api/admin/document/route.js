// API route to securely generate signed URLs for documents using service_role client
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

    const { path } = await req.json()
    if (!path) return NextResponse.json({ error: 'missing_path' }, { status: 400 })

    const relativePath = path.replace(/.*documents\//, '')
    const { data, error } = await serverClient.storage.from('documents').createSignedUrl(relativePath, 3600)
    if (error) throw error

    return NextResponse.json({ signedUrl: data.signedUrl })
  } catch (err) {
    console.error('sign url error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
