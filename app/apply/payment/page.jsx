'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import PageIndicator from '@/components/PageIndicator'
import FileUpload from '@/components/FileUpload'
import Modal from '@/components/Modal'
import { translations } from '@/lib/translations'

const TNAME = process.env.NEXT_PUBLIC_MixxbyYas_NAME || '✏️ [Nom TMoney]'
const TNUM  = process.env.NEXT_PUBLIC_MixxbyYas_NUMBER || '✏️ [Numéro TMoney]'
const WA    = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '✏️ [WhatsApp Institut Universitaire Nobel]'

function PaymentInner() {
  const [lang, setLang] = useState('fr')
  const [token, setToken] = useState(null)
  const [appId, setAppId] = useState(null)
  const [proofUrl, setProofUrl] = useState('')
  const [proofName, setProofName] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isResubmit, setIsResubmit] = useState(false)
  const t = translations[lang]
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const tk = localStorage.getItem('iun_session_token')
    if (!tk) { router.replace('/apply'); return }
    setToken(tk)
    setIsResubmit(params.get('resubmit') === 'true')
    fetch(`/api/apply/get?token=${tk}`)
      .then(r => r.json())
      .then(({ application: a }) => {
      if (!a || (a.status !== 'draft_p2' && a.status !== 'payment_rejected')) { router.replace('/apply'); return }
        setAppId(a.id)
        if (a.payment_proof_url) { setProofUrl(a.payment_proof_url); setProofName('preuve_paiement') }
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    if (!proofUrl || !token) return
    setSaving(true)
    await fetch('/api/apply/save', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ session_token:token, payment_proof_url:proofUrl }) })
    setSavedMsg(true); setTimeout(()=>setSavedMsg(false),2500); setSaving(false)
  }

  const handleSend = async () => {
    const res = await fetch('/api/apply/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ session_token:token }) })
    if ((await res.json()).application) router.push('/apply/success')
    setShowModal(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{background:'var(--cream)'}}><p style={{color:'var(--gray-400)'}}>Chargement…</p></div>

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Nav lang={lang} onLangSwitch={() => setLang(l => l==='fr'?'en':'fr')} t={t} showApply={false} />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <PageIndicator current={2} t={t} />

        {isResubmit && (
          <div className="rounded-xl p-4 mb-5 text-sm font-semibold" style={{background:'#FDECEA',border:'1px solid #F5C6C6',color:'var(--danger)'}}>
            ⚠️ {t.resubmit_msg}
          </div>
        )}

        <div className="iun-card">
          <h1 className="section-title mb-1">{t.p2_title}</h1>
          <p className="text-xs mb-6" style={{color:'var(--gray-400)'}}>{t.p2_sub}</p>

          {/* No refund warning */}
          <div className="rounded-xl p-4 mb-6 text-sm font-bold" style={{background:'#FFF3CD',border:'1px solid #FFEAA7',color:'#856404'}}>
            {t.no_refund}
          </div>

          {/* Payment instructions */}
          <div className="rounded-xl p-5 mb-6" style={{background:'var(--navy)'}}>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
              <div>
                <p className="text-xs font-bold mb-1" style={{color:'rgba(255,255,255,0.5)',textTransform:'uppercase',letterSpacing:'0.5px'}}>{t.payment_title}</p>
                <p className="text-3xl font-bold" style={{color:'var(--gold)',fontFamily:'Cormorant Garamond,serif'}}>{t.payment_amount}</p>
              </div>
              <div className="text-sm" style={{color:'rgba(255,255,255,0.7)'}}>
                <p className="font-bold mb-1" style={{color:'rgba(255,255,255,0.9)'}}>{t.payment_method}</p>
                <p>{t.payment_name_lbl} <strong style={{color:'var(--gold)'}}>{TNAME}</strong></p>
                <p>{t.payment_number_lbl} <strong style={{color:'var(--gold)'}}>{TNUM}</strong></p>
              </div>
            </div>
            <ol className="space-y-1">
              {t.payment_steps.map((s,i) => (
                <li key={i} className="text-xs flex gap-2" style={{color:'rgba(255,255,255,0.7)'}}>
                  <span className="font-bold" style={{color:'var(--gold)',minWidth:'14px'}}>{i+1}.</span>{s}
                </li>
              ))}
            </ol>
          </div>

          {/* Proof upload */}
          <FileUpload label={t.proof_label} hint={t.proof_hint} accept=".jpg,.jpeg,.png,.pdf" maxMB={1} folder="payments" value={proofUrl} filename={proofName} onUpload={(url,name)=>{setProofUrl(url);setProofName(name)}} onRemove={()=>{setProofUrl('');setProofName('')}} t={t} />

          <div className="flex items-center justify-between mt-8 pt-6 flex-wrap gap-3" style={{borderTop:'1px solid var(--gray-100)'}}>
            <button onClick={()=>router.push('/apply')} className="btn-outline">{t.previous_btn}</button>
            <div className="flex items-center gap-3">
              <button onClick={handleSave} disabled={saving||!proofUrl} className="btn-outline">
                {savedMsg ? t.saved_msg : t.save_btn}
              </button>
              <button onClick={()=>setShowModal(true)} disabled={!proofUrl} className="btn-gold">
                {t.send_btn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal title={t.send_modal_title} body={t.send_modal_body} confirmLabel={t.send_modal_confirm} cancelLabel={t.send_modal_cancel} onConfirm={handleSend} onCancel={()=>setShowModal(false)} />
      )}
    </div>
  )
}

export default function Payment() {
  return <Suspense><PaymentInner /></Suspense>
}
