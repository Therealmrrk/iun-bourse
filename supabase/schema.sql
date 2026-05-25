-- ─────────────────────────────────────────────────────────────
--  IUN SCHOLARSHIP PORTAL — DATABASE SCHEMA
--  Run this entire file in Supabase → SQL Editor → Run
-- ─────────────────────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── APPLICATIONS TABLE ───────────────────────────────────────
create table if not exists applications (
  id               uuid primary key default gen_random_uuid(),
  session_token    text unique not null,

  -- Page 1: Personal information
  full_name        text,
  email            text,
  nationality      text,
  phone_code       text,
  phone_number     text,
  wp_code          text,
  wp_number        text,
  in_togo          boolean,

  -- Page 1: File URLs (stored in Supabase Storage)
  photo_url        text,
  cert_url         text,       -- A/O Level certificate
  birth_cert_url   text,       -- Birth certificate

  -- Page 2: Payment
  payment_proof_url text,

  -- Status tracking
  -- Values: draft_p1 | draft_p2 | submitted | payment_accepted | payment_rejected
  status           text not null default 'draft_p1',
  page1_complete   boolean default false,

  -- Admin fields
  admin_notes      text,
  reviewed_at      timestamptz,

  -- Timestamps
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  submitted_at     timestamptz
);

-- ─── INDEXES (for fast duplicate checking and lookups) ────────
create index if not exists idx_applications_email
  on applications (lower(email)) where email is not null;

create index if not exists idx_applications_phone
  on applications (phone_code, phone_number) where phone_number is not null;

create index if not exists idx_applications_wp
  on applications (wp_code, wp_number) where wp_number is not null;

create index if not exists idx_applications_session
  on applications (session_token);

create index if not exists idx_applications_status
  on applications (status);

-- ─── AUTO-UPDATE updated_at ───────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger applications_updated_at
  before update on applications
  for each row execute function update_updated_at();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────
-- All sensitive operations go through Next.js API routes using
-- the service role key, which bypasses RLS automatically.
-- We still enable RLS as a safety net.
alter table applications enable row level security;

-- Allow public insert (new applicants)
create policy "Anyone can create an application"
  on applications for insert
  with check (true);

-- Allow read/update only via service role (handled in API routes)
-- No additional public policies needed.

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Run these in the Supabase Dashboard → Storage → New Bucket
-- OR uncomment and run here if your Supabase version supports it.

-- insert into storage.buckets (id, name, public)
-- values ('documents', 'documents', false)
-- on conflict do nothing;

-- NOTE: Create a bucket called "documents" manually in the
-- Supabase Dashboard → Storage. Set it to PRIVATE (not public).
-- Then add these storage policies in the Dashboard:
--
--   Policy 1 (INSERT): Allow authenticated uploads
--     Name: "Service role can upload"
--     Allowed operations: INSERT
--     Policy: (auth.role() = 'service_role')
--
--   Policy 2 (SELECT): Allow service role to read
--     Name: "Service role can read"
--     Allowed operations: SELECT
--     Policy: (auth.role() = 'service_role')

-- ─── ADMIN USER ───────────────────────────────────────────────
-- Create your admin user manually in:
-- Supabase Dashboard → Authentication → Users → Add User
-- Use the email and password you want for the admin.
-- Do NOT put the admin password in this file.
