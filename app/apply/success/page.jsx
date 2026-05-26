'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import { translations } from '@/lib/translations'
import { useLang } from '@/lib/useLang'

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '✏️ [WhatsApp Institut Universitaire Nobel]'

export default function Success() {
  const { lang, switchLang } = useLang()
  const [ref, setRef] = useState('')
  const t = translations[lang]
  const router = useRouter()

  useEffect(() => {
    const tk = localStorage.getItem('iun_session_token')
    if (tk) {
      fetch(`/api/apply/get?token=${tk}`).then(r=>r.json()).then(({application:a})=>{
        if (a?.id) setRef(a.id)
      })
    }
  }, [])

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)'}}>
      <Nav lang={lang} onLangSwitch={switchLang} t={t} showApply={false} />
      <div className="flex items-center justify-center px-4 py-16">
        <div className="iun-card max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{background:'#E6F7EE'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2D7D4F" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{fontFamily:'Cormorant Garamond,serif',color:'var(--navy)'}}>{t.success_title}</h1>
          {ref && (
            <div className="rounded-xl px-6 py-4 my-4 inline-block" style={{background:'var(--navy)'}}>
              <p className="text-xs font-bold mb-1" style={{color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'1px'}}>{t.success_ref_lbl}</p>
              <p className="text-2xl font-bold tracking-widest" style={{color:'var(--gold)',fontFamily:'Cormorant Garamond,serif'}}>{ref.slice(-12).toUpperCase()}</p>
            </div>
          )}
          <p className="text-sm leading-relaxed mb-2" style={{color:'var(--gray-600)'}}>{t.success_msg}</p>
          <p className="text-xs mb-6" style={{color:'var(--gray-400)'}}>{t.success_note}</p>
          <p className="text-sm font-semibold mb-2" style={{color:'var(--navy)'}}>{t.success_contact}</p>
          <a href={`https://wa.me/${WA.replace('+','')}`} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
             style={{background:'#25D366',color:'#fff',textDecoration:'none'}}>
            📱 {WA}
          </a>
          <div className="mt-6">
            <button onClick={()=>router.push('/')} className="btn-outline mx-auto">{t.back_home}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
