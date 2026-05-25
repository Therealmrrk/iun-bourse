'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { browserClient } from '@/lib/supabase'
import Modal from '@/components/Modal'
import { translations } from '@/lib/translations'
import { statusStyle, statusLabel, formatDate } from '@/lib/utils'

export default function AdminDetail() {
  const [lang, setLang] = useState('fr')
  const [app, setApp] = useState(null)
  const [session, setSession] = useState(null)
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState(false)
  const [modal, setModal] = useState(null) // 'accept' | 'decline'
  const [actionDone, setActionDone] = useState('')
  const t = translations[lang]
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    browserClient.auth.getSession().then(({ data: { session: s } }) => {
      if (!s) { router.replace('/admin'); return }
      setSession(s)
      loadApp(s)
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const loadApp = async (s) => {
    const { data } = await browserClient.from('applications').select('*').eq('id', id).single()
    setApp(data); setNotes(data?.admin_notes || '')
  }

  const getToken = async () => {
    const { data: { session: s } } = await browserClient.auth.getSession()
    return s?.access_token
  }

  const handleAction = async (action) => {
    const token = await getToken()
    const res = await fetch(`/api/admin/${action}`, { method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({ id, lang, notes }) })
    if ((await res.json()).success) { setActionDone(t.email_sent_ok); setModal(null); loadApp(session) }
  }

  const handleSaveNotes = async () => {
    const token = await getToken()
    await fetch('/api/admin/notes', { method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body: JSON.stringify({ id, notes }) })
    setSavedNotes(true); setTimeout(()=>setSavedNotes(false),2500)
  }

  const getDocUrl = async (path) => {
    const { data } = await browserClient.storage.from('documents').createSignedUrl(path.replace(/.*documents\//,''), 3600)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }

  if (!app) return <div className="min-h-screen flex items-center justify-center" style={{background:'var(--gray-100)'}}><p style={{color:'var(--gray-400)'}}>Chargement…</p></div>

  const st = statusStyle(app.status)
  const canDecide = app.status === 'submitted' || app.status === 'payment_rejected'

  const Field = ({label, value}) => value ? (
    <div className="flex justify-between gap-4 py-2" style={{borderBottom:'1px solid var(--gray-100)'}}>
      <span className="text-xs font-bold uppercase tracking-wide" style={{color:'var(--gray-400)',minWidth:'130px'}}>{label}</span>
      <span className="text-sm font-semibold text-right flex-1" style={{color:'var(--navy)'}}>{value}</span>
    </div>
  ) : null

  const emailText = lang === 'fr'
    ? (modal === 'accept'
      ? `Cher(e) ${app.full_name},\n\nVotre paiement a été confirmé et votre candidature a été acceptée.\n\n${app.in_togo ? 'Votre examen sera présentiel à Lomé. Les informations vous seront envoyées prochainement.' : 'Votre examen sera en ligne. Le lien vous sera envoyé prochainement.'}\n\nCordialement,\nL'équipe de l'Institut Universitaire Nobel`
      : `Cher(e) ${app.full_name},\n\nNous n'avons pas pu confirmer votre paiement.\n\nVeuillez soumettre une nouvelle preuve de paiement sur le portail ou contacter l'équipe de l'Institut Universitaire Nobel via WhatsApp.\n\nCordialement,\nL'équipe de l'Institut Universitaire Nobel`)
    : (modal === 'accept'
      ? `Dear ${app.full_name},\n\nYour payment has been confirmed and your application has been accepted.\n\n${app.in_togo ? 'Your exam will be in person in Lomé. Details will be sent shortly.' : 'Your exam will be online. The link will be sent shortly.'}\n\nRegards,\nThe Institut Universitaire Nobel Team`
      : `Dear ${app.full_name},\n\nWe could not confirm your payment.\n\nPlease submit a new payment receipt on the portal or contact the Institut Universitaire Nobel team via WhatsApp.\n\nRegards,\nThe Institut Universitaire Nobel Team`)

  return (
    <div style={{minHeight:'100vh',background:'var(--gray-100)'}}>
      <div className="flex items-center justify-between px-6 py-4" style={{background:'var(--navy)'}}>
        <div className="flex items-center gap-3">
          <img src="/images/Logo.png" alt="IUN Logo" className="h-9 w-auto object-contain rounded" />
          <div>
            <p className="font-bold text-base sm:text-lg" style={{fontFamily:'Cormorant Garamond,serif',color:'var(--white)'}}><span style={{color:'var(--gold)'}}>{t.detail_title}</span></p>
            <p className="text-xs" style={{color:'rgba(255,255,255,0.4)'}}>{t.dash_sub}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setLang(l=>l==='fr'?'en':'fr')} className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',border:'none',cursor:'pointer'}}>{t.lang_switch}</button>
          <button onClick={()=>browserClient.auth.signOut().then(()=>router.push('/admin'))} className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',border:'none',cursor:'pointer'}}>⎋ {t.logout_btn}</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <button onClick={()=>router.push('/admin/dashboard')} className="text-sm font-bold mb-5 flex items-center gap-1" style={{background:'none',border:'none',cursor:'pointer',color:'var(--navy)'}}>{t.back_list}</button>

        {/* App header */}
        <div className="rounded-2xl px-6 py-5 mb-5 flex items-center justify-between flex-wrap gap-4" style={{background:'var(--navy)'}}>
          <div>
            <p className="text-2xl font-bold text-white" style={{fontFamily:'Cormorant Garamond,serif'}}>{app.full_name}</p>
            <p className="text-xs mt-1" style={{color:'rgba(255,255,255,0.4)'}}>ID: {app.id} · {formatDate(app.submitted_at)}</p>
          </div>
          <span className="status-badge text-sm px-4 py-2" style={{background:st.bg,color:st.color}}>{statusLabel(app.status,t)}</span>
        </div>

        {actionDone && <div className="rounded-xl p-3 mb-4 text-sm font-bold text-center" style={{background:'#E6F7EE',color:'#1A6B3A'}}>{actionDone}</div>}

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Personal info */}
          <div className="iun-card">
            <h3 className="section-title text-lg mb-3">{t.sec_personal}</h3>
            <Field label={t.full_name} value={app.full_name} />
            <Field label={t.email} value={app.email} />
            <Field label={t.nationality} value={app.nationality} />
            <Field label={t.phone} value={app.phone_code && app.phone_number ? `${app.phone_code} ${app.phone_number}` : null} />
            <Field label={t.whatsapp} value={app.wp_code && app.wp_number ? `${app.wp_code} ${app.wp_number}` : null} />
            <Field label={t.th_exam} value={app.in_togo === true ? t.exam_inperson : app.in_togo === false ? t.exam_online : null} />
          </div>

          {/* Admin decision */}
          <div className="iun-card">
            <h3 className="section-title text-lg mb-3">{t.sec_admin}</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="iun-label">{t.notes_lbl}</label>
                <textarea className="iun-input text-sm resize-none" rows={4} value={notes} onChange={e=>setNotes(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleSaveNotes} className="btn-outline text-sm px-4 py-2">{t.save_notes}</button>
                {savedNotes && <span className="text-xs font-bold" style={{color:'var(--success)'}}>{t.saved_notes}</span>}
              </div>
            </div>
            {canDecide && (
              <div className="space-y-2 pt-4" style={{borderTop:'1px solid var(--gray-100)'}}>
                <button onClick={()=>setModal('accept')} className="w-full py-3 rounded-xl font-bold text-sm border-none cursor-pointer" style={{background:'#E6F7EE',color:'#1A6B3A'}}>✓ {t.accept_btn}</button>
                <button onClick={()=>setModal('decline')} className="w-full py-3 rounded-xl font-bold text-sm border-none cursor-pointer" style={{background:'#FDECEA',color:'var(--danger)'}}>✗ {t.decline_btn}</button>
              </div>
            )}
            {!canDecide && <p className="text-xs text-center mt-2" style={{color:'var(--gray-400)'}}>— {statusLabel(app.status,t)} —</p>}
          </div>

          {/* Documents */}
          <div className="iun-card sm:col-span-2">
            <h3 className="section-title text-lg mb-3">{t.sec_docs}</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[{lbl:t.photo_label,url:app.photo_url},{lbl:t.cert_label,url:app.cert_url},{lbl:t.birth_label,url:app.birth_cert_url},{lbl:t.proof_label,url:app.payment_proof_url}].map(d => d.url && (
                <button key={d.lbl} onClick={()=>getDocUrl(d.url)} className="flex items-center gap-2 p-3 rounded-xl border text-sm font-semibold text-left" style={{border:'1px solid var(--gray-200)',background:'var(--cream)',color:'var(--navy)',cursor:'pointer'}}>
                  📄 {d.lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <Modal
          title={modal === 'accept' ? t.accept_modal_title : t.decline_modal_title}
          body={modal === 'accept' ? t.accept_modal_body : t.decline_modal_body}
          confirmLabel={modal === 'accept' ? t.accept_confirm : t.decline_confirm}
          cancelLabel={t.modal_cancel}
          onConfirm={() => handleAction(modal)}
          onCancel={() => setModal(null)}
          emailPreview={emailText}
          previewLabel={t.email_preview}
        />
      )}
    </div>
  )
}
