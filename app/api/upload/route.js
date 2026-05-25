// Generates a Supabase signed upload URL so the client can upload
// files directly to storage (avoids Vercel's body size limit)
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const BUCKET = 'documents'

export async function POST(req) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const svc = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log('UPLOAD ROUTE - svc key:', svc ? 'found' : 'MISSING')

    if (!svc) {
      return NextResponse.json({ error: 'missing_service_key' }, { status: 500 })
    }

    const supabase = createClient(url, svc, {
      auth: { persistSession: false }
    })

    const { fileName, fileType, folder } = await req.json()
    const safeName = `${folder}/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUploadUrl(safeName)

    console.log('SIGNED URL RESULT:', data, error)

    if (error) throw error

    const publicUrl = `${url}/storage/v1/object/${BUCKET}/${safeName}`

    return NextResponse.json({ signedUrl: data.signedUrl, publicUrl, path: safeName })
  } catch (err) {
    console.error('upload error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
