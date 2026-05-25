# IUN Scholarship Portal — Setup Guide

## 1. Install dependencies
```
npm install
```

## 2. Set up your accounts
- **Supabase**: supabase.com → create project → copy keys
- **Resend**: resend.com → create account → verify domain iun.tg → copy API key
- **Vercel**: vercel.com → sign up (deploy later)

## 3. Configure environment variables
```
cp .env.local.example .env.local
```
Open `.env.local` and fill in every value. Search for `✏️ EDIT` to find placeholders.

## 4. Set up the database
- Go to Supabase → SQL Editor → paste the contents of `supabase/schema.sql` → Run

## 5. Create the storage bucket
- Go to Supabase → Storage → New Bucket
- Name: `documents` — set to PRIVATE
- Add the two storage policies described in schema.sql

## 6. Create the admin user
- Go to Supabase → Authentication → Users → Add User
- Use the email you put in `ADMIN_NOTIFICATION_EMAIL`

## 7. Run locally
```
npm run dev
```
Open http://localhost:3000

## 8. Deploy to Vercel
```
npx vercel
```
Add all `.env.local` variables in Vercel → Project → Settings → Environment Variables

## 9. Connect subdomain
In your domain registrar (wherever iun.tg is managed):
Add a CNAME record: `bourse` → `cname.vercel-dns.com`

## Files to edit before go-live
| File | What to edit |
|---|---|
| `.env.local` | All API keys and placeholder values |
| `lib/emailTemplates.js` | Final email body content |
| `lib/translations.js` | Any text changes |
| `components/Nav.jsx` | Add real IUN logo |
