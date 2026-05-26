'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { browserClient } from '@/lib/supabase'
import { translations } from '@/lib/translations'
import { useLang } from '@/lib/useLang'

export default function AdminLogin() {
  const { lang, switchLang } = useLang()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const t = translations[lang]
  const router = useRouter()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const handleLogin = async () => {
    setLoading(true); setErr(false)
    const { data, error } = await browserClient.auth.signInWithPassword({ email, password: pass })
    console.log('LOGIN RESULT:', data, error)
    if (error) { setErr(true); setLoading(false) }
    else {
      console.log('SESSION:', data.session)
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'var(--navy)'}}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <img src="/images/Logo.png" alt="IUN Logo" className="h-16 w-auto object-contain mx-auto mb-5 rounded" />
        <h1 className="text-2xl font-bold text-center mb-6" style={{fontFamily:'Cormorant Garamond,serif',color:'var(--navy)'}}>{t.admin_login_title}</h1>
        {err && <div className="err-box mb-4">⚠️ {t.admin_login_err}</div>}
        <div className="space-y-4">
          <div><label className="iun-label">{t.admin_email_lbl}</label><input type="email" className="iun-input" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} /></div>
          <div><label className="iun-label">{t.admin_pass_lbl}</label><input type="password" className="iun-input" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} /></div>
        </div>
        <button onClick={handleLogin} disabled={loading} className="btn-primary w-full mt-6 justify-center">
          {loading ? '…' : t.admin_login_btn}
        </button>
        <div className="mt-4 text-center"><button onClick={switchLang} className="text-xs" style={{background:'none',border:'none',cursor:'pointer',color:'var(--gray-400)'}}>{t.lang_switch}</button></div>
      </div>
    </div>
  )
}
