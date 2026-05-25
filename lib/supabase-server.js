// lib/supabase-server.js
// Server-side Supabase client (uses service role key)
// Used in: API routes only — never import this in client components
// The service role key bypasses Row Level Security, so handle with care.

import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
