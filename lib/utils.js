import { clsx } from 'clsx'

// Merge class names (Tailwind-safe)
export function cn(...inputs) { return clsx(inputs) }

// Generate a session token stored in the browser
export function generateToken() {
  return 'sess_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36)
}

// Format a date for display
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// Status badge color helper
export function statusStyle(status) {
  switch (status) {
    case 'submitted':        return { bg: '#FFF8E1', color: '#8A6200', dot: '#C9A84C' }
    case 'payment_accepted': return { bg: '#E6F7EE', color: '#1A6B3A', dot: '#2D7D4F' }
    case 'payment_rejected': return { bg: '#FDECEA', color: '#B52B2B', dot: '#C0392B' }
    default:                 return { bg: '#F5F2EB', color: '#6B6358', dot: '#9B9488' }
  }
}

// Translate status key to display label
export function statusLabel(status, t) {
  return t[`status_${status}`] || status
}
