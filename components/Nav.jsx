'use client'
import Link from 'next/link'

export default function Nav({ lang, onLangSwitch, t, showApply = true }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
         style={{ background: 'var(--navy)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
      
      <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
        {/* 🛡️ Isolated White Backdrop Container for the Logo */}
        <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center h-12 w-12 shrink-0">
          <img 
            src="/images/Logo.png" 
            alt="IUN Logo" 
            className="h-full w-full object-contain" 
          />
        </div>
        
        {/* Institutional Title */}
        <span className="hidden sm:block font-bold text-white text-lg tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Institut <span style={{ color: 'var(--gold)' }}>Universitaire Nobel</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Language Selector Toggle */}
        <button onClick={onLangSwitch}
          className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer' }}>
          {t.lang_switch}
        </button>
        
        {/* 1. APPLY BUTTON: Always visible when showApply is true */}
        {showApply && (
          <Link href="/apply"
            className="text-xs font-bold px-4 py-2 rounded-lg border transition-all hover:bg-gold/10"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', textDecoration: 'none' }}>
            {t.apply_btn}
          </Link>
        )}
        
        {/* 2. ADMIN BUTTON: Connected directly to showApply so it hides on /apply */}
        {showApply && (
          <Link href="/admin"
            className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            {t.admin_btn}
          </Link>
        )}
      </div>
    </nav>
  )
}