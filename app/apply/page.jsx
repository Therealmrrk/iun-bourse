'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import PageIndicator from '@/components/PageIndicator'
import PhoneInput from '@/components/PhoneInput'
import FileUpload from '@/components/FileUpload'
import TogoSelector from '@/components/TogoSelector'
import { translations } from '@/lib/translations'
import { NATIONALITIES } from '@/lib/countries'
import { generateToken } from '@/lib/utils'
import { useLang } from '@/lib/useLang'

const EMPTY = { full_name:'', email:'', nationality:'', phone_code:'+228', phone_number:'', wp_code:'+228', wp_number:'', in_togo:null, photo_url:'', photo_name:'', cert_url:'', cert_name:'', birth_cert_url:'', birth_cert_name:'' }

export default function Page1() {
  const { lang, switchLang } = useLang()
  const [form, setForm] = useState(EMPTY)
  const [appId, setAppId] = useState(null)
  const [token, setToken] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [loading, setLoading] = useState(true)
  const t = translations[lang]
  const router = useRouter()

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Load session on mount
  useEffect(() => {
    const existing = localStorage.getItem('iun_session_token')
    if (existing) {
      setToken(existing)
      fetch(`/api/apply/get?token=${existing}`)
        .then(r => r.json())
        .then(({ application: a }) => {
          if (!a) { setLoading(false); return }
          if (a.status === 'submitted' || a.status === 'payment_accepted') { router.replace('/apply/success'); return }
          if (a.status === 'payment_rejected') { router.replace('/apply/payment?resubmit=true'); return }
          if (a.status === 'draft_p2') { router.replace('/apply/payment'); return }
          setAppId(a.id)
          
          const localDraft = localStorage.getItem('iun_form_draft')
          if (localDraft) {
            try {
              setForm(JSON.parse(localDraft))
            } catch (e) {
              setForm({ full_name:a.full_name||'', email:a.email||'', nationality:a.nationality||'', phone_code:a.phone_code||'+228', phone_number:a.phone_number||'', wp_code:a.wp_code||'+228', wp_number:a.wp_number||'', in_togo:a.in_togo, photo_url:a.photo_url||'', photo_name:'', cert_url:a.cert_url||'', cert_name:'', birth_cert_url:a.birth_cert_url||'', birth_cert_name:'' })
            }
          } else {
            setForm({ full_name:a.full_name||'', email:a.email||'', nationality:a.nationality||'', phone_code:a.phone_code||'+228', phone_number:a.phone_number||'', wp_code:a.wp_code||'+228', wp_number:a.wp_number||'', in_togo:a.in_togo, photo_url:a.photo_url||'', photo_name:'', cert_url:a.cert_url||'', cert_name:'', birth_cert_url:a.birth_cert_url||'', birth_cert_name:'' })
          }
          setLoading(false)
        })
    } else {
      const t2 = generateToken()
      localStorage.setItem('iun_session_token', t2)
      setToken(t2)
      setLoading(false)
    }
  }, [])

  // Save form draft to localStorage as user types
  useEffect(() => {
    if (token) {
      localStorage.setItem('iun_form_draft', JSON.stringify(form))
    }
  }, [form, token])

  const checkDuplicates = async () => {
    const res = await fetch('/api/apply/check', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email:form.email, phone_code:form.phone_code, phone_number:form.phone_number, wp_code:form.wp_code, wp_number:form.wp_number, exclude_id:appId }) })
    return (await res.json()).duplicate
  }

  
  
  const doSave = async () => {
    if (!token) return null
    const res = await fetch('/api/apply/save', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ session_token:token, full_name:form.full_name, email:form.email, nationality:form.nationality, phone_code:form.phone_code, phone_number:form.phone_number, wp_code:form.wp_code, wp_number:form.wp_number, in_togo:form.in_togo, photo_url:form.photo_url, cert_url:form.cert_url, birth_cert_url:form.birth_cert_url, status:'draft_p1', page1_complete:false }) })
    const { application } = await res.json()
    if (application) setAppId(application.id)
    console.log('doSave response:', application)
    return application
  }

  const handleSave = async () => {
    setSaving(true)
    const dup = await checkDuplicates()
    if (dup === 'email') { setErrors(e=>({...e,email:t.err_dup_email})); setSaving(false); return }
    if (dup === 'phone') { setErrors(e=>({...e,phone:t.err_dup_phone})); setSaving(false); return }
    if (dup === 'whatsapp') { setErrors(e=>({...e,wp:t.err_dup_wp})); setSaving(false); return }
    await doSave()
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
    setSaving(false)
  }
  const validate = () => {
  const e = {}
  if (!form.full_name.trim()) { e.full_name = true; console.log('FAIL: full_name') }
  if (!form.email.trim() || !form.email.includes('@')) { e.email = true; console.log('FAIL: email') }
  if (!form.nationality) { e.nationality = true; console.log('FAIL: nationality') }
  if (!form.phone_code || !form.phone_number) { e.phone = true; console.log('FAIL: phone') }
  if (!form.wp_code || !form.wp_number) { e.wp = true; console.log('FAIL: wp') }
  if (!form.photo_url) { e.photo = true; console.log('FAIL: photo') }
  if (!form.cert_url) { e.cert = true; console.log('FAIL: cert') }
  if (!form.birth_cert_url) { e.birth = true; console.log('FAIL: birth') }
  if (form.in_togo === null) { e.in_togo = true; console.log('FAIL: in_togo') }
  setErrors(e)
  return Object.keys(e).length === 0
}

  const handleNext = async () => {
    if (!validate()) { window.scrollTo(0,0); return }
    setSaving(true)
    try {
      const dup = await checkDuplicates()
      if (dup === 'email') { setErrors(e=>({...e,email:t.err_dup_email})); setSaving(false); return }
      if (dup === 'phone') { setErrors(e=>({...e,phone:t.err_dup_phone})); setSaving(false); return }
      if (dup === 'whatsapp') { setErrors(e=>({...e,wp:t.err_dup_wp})); setSaving(false); return }

      const res = await fetch('/api/apply/save', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          session_token: token,
          full_name: form.full_name,
          email: form.email,
          nationality: form.nationality,
          phone_code: form.phone_code,
          phone_number: form.phone_number,
          wp_code: form.wp_code,
          wp_number: form.wp_number,
          in_togo: form.in_togo,
          photo_url: form.photo_url,
          cert_url: form.cert_url,
          birth_cert_url: form.birth_cert_url,
          status: 'draft_p2',
          page1_complete: true
        })
      })

      if (res.ok) {
        console.log('Save successful, moving to payment routing.');
        router.push('/apply/payment');
      } else {
        const errorPayload = await res.json().catch(() => ({}));
        alert('Failed to proceed. Server responded with an error status.');
        console.error('API Error details:', errorPayload);
      }
    } catch(err) {
      console.error('NEXT FUNCTION EXCEPTION:', err)
      alert('An error occurred: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{background:'var(--cream)'}}><p style={{color:'var(--gray-400)'}}>Chargement…</p></div>

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav lang={lang} onLangSwitch={switchLang} t={t} showApply={false} />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <PageIndicator current={1} t={t} />
        <div className="iun-card">
          <h1 className="section-title mb-1">{t.p1_title}</h1>
          <p className="text-xs mb-6" style={{color:'var(--gray-400)'}}>{t.p1_sub}</p>

          <div className="space-y-5">
            {/* Full name */}
            <div>
              <label className="iun-label">{t.full_name}</label>
              <input className={`iun-input ${errors.full_name?'error':''}`} value={form.full_name} onChange={e=>up('full_name',e.target.value)} placeholder="ADJOBI Kofi Mensah" />
              <p className="text-xs mt-1" style={{color:'var(--gray-400)'}}>{t.full_name_hint}</p>
            </div>
            {/* Email */}
            <div>
              <label className="iun-label">{t.email}</label>
              <input type="email" className={`iun-input ${errors.email?'error':''}`} value={form.email} onChange={e=>up('email',e.target.value)} />
              {typeof errors.email === 'string' && <p className="text-xs mt-1 font-bold" style={{color:'var(--danger)'}}>{errors.email}</p>}
            </div>
            {/* Nationality */}
            <div>
              <label className="iun-label">{t.nationality}</label>
              <select className={`iun-select ${errors.nationality?'error':''}`} value={form.nationality} onChange={e=>up('nationality',e.target.value)}>
                <option value="">{t.sel_placeholder}</option>
                {NATIONALITIES.map(n=><option key={n}>{n}</option>)}
              </select>
            </div>
            {/* Phone */}
            <PhoneInput label={t.phone} codeValue={form.phone_code} numberValue={form.phone_number} onCodeChange={v=>up('phone_code',v)} onNumberChange={v=>up('phone_number',v)} error={typeof errors.phone==='string'?errors.phone:null} t={t} />
            {/* WhatsApp */}
            <PhoneInput label={t.whatsapp} codeValue={form.wp_code} numberValue={form.wp_number} onCodeChange={v=>up('wp_code',v)} onNumberChange={v=>up('wp_number',v)} error={typeof errors.wp==='string'?errors.wp:null} t={t} />
            {/* Photo */}
            <FileUpload label={t.photo_label} hint={t.photo_hint} accept=".jpg,.jpeg,.png" maxMB={3} folder="photos" value={form.photo_url} filename={form.photo_name} onUpload={(url,name)=>{up('photo_url',url);up('photo_name',name)}} onRemove={()=>{up('photo_url','');up('photo_name','')}} error={errors.photo?t.err_required:null} t={t} useCamera={true} />
            {/* Cert */}
            <FileUpload label={t.cert_label} hint={t.cert_hint} accept=".pdf,.jpg,.jpeg,.png" maxMB={3} folder="certs" value={form.cert_url} filename={form.cert_name} onUpload={(url,name)=>{up('cert_url',url);up('cert_name',name)}} onRemove={()=>{up('cert_url','');up('cert_name','')}} error={errors.cert?t.err_required:null} t={t} />
            {/* Birth cert */}
            <FileUpload label={t.birth_label} hint={t.birth_hint} accept=".pdf,.jpg,.jpeg,.png" maxMB={3} folder="births" value={form.birth_cert_url} filename={form.birth_cert_name} onUpload={(url,name)=>{up('birth_cert_url',url);up('birth_cert_name',name)}} onRemove={()=>{up('birth_cert_url','');up('birth_cert_name','')}} error={errors.birth?t.err_required:null} t={t} />
            {/* In Togo */}
            <TogoSelector value={form.in_togo} onChange={v=>up('in_togo',v)} t={t} />
            {errors.in_togo && <p className="text-xs font-bold" style={{color:'var(--danger)'}}>{t.err_required}</p>}
          </div>

          {Object.keys(errors).length > 0 && typeof errors[Object.keys(errors)[0]] !== 'string' && (
            <div className="err-box mt-5">⚠️ {t.err_required}</div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6" style={{borderTop:'1px solid var(--gray-100)'}}>
            <button onClick={handleSave} disabled={saving} className="btn-outline">
              {saving ? '…' : savedMsg ? t.saved_msg : t.save_btn}
            </button>
            <button onClick={handleNext} disabled={saving} className="btn-primary">
              {saving ? '…' : t.next_btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
