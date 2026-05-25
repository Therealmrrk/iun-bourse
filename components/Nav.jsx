'use client'
// ✏️ EDIT: Replace the text logo with an <img> tag if you have an IUN logo.
// Put logo.png in /public/ then replace the logo div with:
// <img src="/logo.png" alt="IUN" className="h-9" />
import Link from 'next/link'

export default function Nav({ lang, onLangSwitch, t, showApply = true }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16"
         style={{ background: 'var(--navy)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
      <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
        <img src="/images/Logo.png" alt="IUN Logo" className="h-9 w-auto object-contain rounded" />
        <span className="hidden sm:block font-semibold text-white text-base tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Institut <span style={{ color: 'var(--gold)' }}>Universitaire Nobel</span>
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <button onClick={onLangSwitch}
          className="text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: 'none', cursor: 'pointer' }}>
          {t.lang_switch}
        </button>
        {showApply && (
          <Link href="/apply"
            className="text-xs font-bold px-4 py-2 rounded-lg border"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', textDecoration: 'none' }}>
            {t.apply_btn}
          </Link>
        )}
        <Link href="/admin"
          className="text-xs font-semibold px-3 py-2 rounded-lg"
          style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
          {t.admin_btn}
        </Link>
      </div>
    </nav>
  )
}
