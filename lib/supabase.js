// ─────────────────────────────────────────────────────────────
//  SUPABASE CLIENTS
//  - browserClient : used in React components (public anon key)
//  - serverClient  : used in API routes (service role key — full access)
// ─────────────────────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY

export const browserClient = createClient(url, anon)

export const serverClient = svc 
  ? createClient(url, svc, { auth: { persistSession: false } })
  : null