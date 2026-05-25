// ─────────────────────────────────────────────────────────────────────────────
// lib/constants.js
// Central configuration values used across the portal
// ✏️ EDIT: Adjust limits and values here if needed
// ─────────────────────────────────────────────────────────────────────────────

// ─── FILE UPLOAD LIMITS ───────────────────────────────────────────────────────
export const FILE_LIMITS = {
  photo:        { maxMB: 1, maxBytes: 1 * 1024 * 1024 },
  cert:         { maxMB: 3, maxBytes: 3 * 1024 * 1024 },
  birth_cert:   { maxMB: 3, maxBytes: 3 * 1024 * 1024 },
  payment_proof:{ maxMB: 1, maxBytes: 1 * 1024 * 1024 },
}

// ─── ACCEPTED FILE TYPES ──────────────────────────────────────────────────────
export const FILE_TYPES = {
  photo:         ['image/jpeg', 'image/png'],
  cert:          ['image/jpeg', 'image/png', 'application/pdf'],
  birth_cert:    ['image/jpeg', 'image/png', 'application/pdf'],
  payment_proof: ['image/jpeg', 'image/png', 'application/pdf'],
}

// ─── APPLICATION STATUSES ─────────────────────────────────────────────────────
export const STATUS = {
  DRAFT_P1:          'draft_p1',
  DRAFT_P2:          'draft_p2',
  SUBMITTED:         'submitted',
  PAYMENT_ACCEPTED:  'payment_accepted',
  PAYMENT_REJECTED:  'payment_rejected',
}

// ─── APPLICATION DEADLINE ─────────────────────────────────────────────────────
// ✏️ EDIT: Change this date if the deadline changes
export const DEADLINE = new Date('2025-09-18T23:59:59')

// ─── PORTAL INFO ──────────────────────────────────────────────────────────────
// ✏️ EDIT: Update these values
export const REGISTRATION_FEE = '10 000 FCFA'
export const REGISTRATION_FEE_EN = '10,000 FCFA'

// ─── SUPABASE STORAGE ─────────────────────────────────────────────────────────
export const STORAGE_BUCKET = 'documents'

// ─── SESSION ─────────────────────────────────────────────────────────────────
// Key used in localStorage to store the session token
export const SESSION_KEY = 'iun_bourse_session'
