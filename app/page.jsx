'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import { translations } from '@/lib/translations'
import { useLang } from '@/lib/useLang'

export default function Landing() {
  const { lang, switchLang } = useLang()
  const [hasSession, setHasSession] = useState(false)
  const t = translations[lang]
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('iun_session_token')
    if (token) setHasSession(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Nav lang={lang} onLangSwitch={switchLang} t={t} />

      {/* Session resume banner */}
      {hasSession && (
        <div className="text-center py-3 px-4" style={{ background: 'var(--gold-pale)', borderBottom: '1px solid var(--gold)' }}>
          <span className="text-sm font-semibold mr-3" style={{ color: 'var(--navy)' }}>{t.session_banner}</span>
          <button onClick={() => router.push('/apply')} className="text-sm font-bold underline mr-3" style={{ color: 'var(--navy)', background: 'none', border: 'none', cursor: 'pointer' }}>{t.session_resume}</button>
          <button onClick={() => { localStorage.removeItem('iun_session_token'); localStorage.removeItem('iun_form_draft'); router.push('/apply') }} className="text-xs" style={{ color: 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer' }}>{t.session_new}</button>
        </div>
      )}

      {/* Hero */}
      <div className="text-center px-6 py-20" style={{ background: 'linear-gradient(135deg,#0C1B33 0%,#162A4A 100%)' }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6" style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#E2C47A' }}>🎓 {t.badge}</div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t.hero_title}</h1>
        <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>{t.hero_desc}</p>
        <button onClick={() => router.push('/apply')} className="btn-gold text-base px-8 py-4 mx-auto">{t.hero_cta}</button>
        <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.hero_fee} · {t.deadline_lbl} : <strong style={{ color: 'var(--gold)' }}>{t.deadline_val}</strong></p>
      </div>

      {/* About + Steps */}
      <div className="max-w-4xl mx-auto px-6 py-16 grid sm:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)' }}>{t.about_title}</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>{t.about_text}</p>
        </div>
        <div className="space-y-4">
          {t.steps.map(s => (
            <div key={s.num} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: 'var(--navy)', color: 'var(--gold)', fontFamily: 'Cormorant Garamond, serif' }}>{s.num}</div>
              <div><p className="font-bold text-sm" style={{ color: 'var(--navy)' }}>{s.title}</p><p className="text-xs mt-0.5" style={{ color: 'var(--gray-400)' }}>{s.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
