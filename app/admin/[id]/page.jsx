'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { browserClient } from '@/lib/supabase'
import Modal from '@/components/Modal'
import { translations } from '@/lib/translations'
import { statusStyle, statusLabel, formatDate } from '@/lib/utils'
import { useLang } from '@/lib/useLang'

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '[Numéro WhatsApp IUN]'

export default function AdminDetail() {
  const { lang, switchLang } = useLang()
  const [app, setApp] = useState(null)
  const [session, setSession] = useState(null)
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState(false)
  const [modal, setModal] = useState(null) // 'accept' | 'decline'
  const [actionDone, setActionDone] = useState('')
  const [proofUrl, setProofUrl] = useState('')
  const [passportLiveUrl, setPassportLiveUrl] = useState('')
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

  const getToken = async () => {
    const { data: { session: s } } = await browserClient.auth.getSession()
    return s?.access_token
  }

  const getSignedUrl = async (path) => {
    try {
      const token = await getToken()
      const res = await fetch('/api/admin/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ path })
      })
      if (!res.ok) return null
      const { signedUrl } = await res.json()
      return signedUrl
    } catch (e) {
      console.error(e)
      return null
    }
  }

  const loadApp = async (s) => {
    const { data } = await browserClient.from('applications').select('*').eq('id', id).single()
    console.log("Database application payload:", data)
    
    setApp(data)
    setNotes(data?.admin_notes || '')
    
    // Resolve payment proof signed URL
    if (data?.payment_proof_url) {
      console.log("Found raw proof path, fetching signed URL for:", data.payment_proof_url)
      const signedUrl = await getSignedUrl(data.payment_proof_url)
      console.log("Resulting Signed URL:", signedUrl)
      
      if (signedUrl) {
        setProofUrl(signedUrl)
      } else {
        // FALLBACK: If the API fails to sign, construct a direct storage path to try rendering it anyway
        console.warn("API returned null for signed URL. Attempting public path fallback...")
        const projectUrl = "https://your-supabase-project-id.supabase.co" // Replace with your base Supabase URL if needed
        const fallbackUrl = `${projectUrl}/storage/v1/object/public/applications/${data.payment_proof_url}`
        setProofUrl(fallbackUrl)
      }
    } else {
      console.warn("No payment_proof_url found for this record in the database row.")
    }

    // Resolve student passport photo signed URL for inline display
    if (data?.photo_url) {
      const imgUrl = await getSignedUrl(data.photo_url)
      if (imgUrl) setPassportLiveUrl(imgUrl)
    }
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
    const signedUrl = await getSignedUrl(path)
    if (signedUrl) window.open(signedUrl, '_blank')
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
      ? `Cher(e) ${app.full_name},\n\nNous vous informons que votre preuve de paiement a été vérifiée avec succès et que votre candidature pour la bourse de l'Institut Universitaire Nobel a été officiellement acceptée.\n\nQuelle est la prochaine étape ? Vous recevrez très prochainement un second e-mail vous indiquant la date, l'heure, le lieu (pour l'examen en présentiel) ou le lien de connexion (pour l'examen en ligne) ainsi que les modalités d'évaluation. Cela s'applique aussi bien aux candidats en présentiel qu'en ligne. De plus, vous serez ajouté(e) à un groupe WhatsApp dédié aux candidats. Pensez à vérifier régulièrement votre boîte de réception ainsi que vos courriers indésirables (spams).\n\nPour toute question urgente, n'hésitez pas à nous contacter par e-mail ou directement via notre assistance WhatsApp au ${WA}.\n\nCordialement,\nL’équipe d’administration\nInstitut Universitaire Nobel`
      : `Cher(e) ${app.full_name},\n\nAprès vérification de votre dossier, nous vous informons que nous n'avons pas pu valider la preuve de paiement que vous avez soumise.\n\nComment corriger cela ? Votre dossier a été replacé en mode modification. Nous vous invitons à vous reconnecter sur le portail de candidature pour importer un reçu de paiement valide (capture d'écran lisible du transfert ou reçu bancaire officiel).\n\nSi vous rencontrez des difficultés ou estimez qu'il s'agit d'une erreur, contactez immédiatement notre équipe sur WhatsApp au ${WA} afin de régulariser votre situation.\n\nCordialement,\nL’équipe d’administration\nInstitut Universitaire Nobel`)
    : (modal === 'accept'
      ? `Dear ${app.full_name},\n\nWe are pleased to inform you that your payment receipt has been successfully verified, and your application for the Institut Universitaire Nobel scholarship has been officially accepted.\n\nWhat happens next? You will shortly receive a second email with the date, time, venue (for the in-person exam) or login link (for the online exam), and the exam guidelines. This applies to both in-person and online candidates. Additionally, you will be added to a WhatsApp group dedicated to applicants. Please make sure to monitor your inbox and your spam folder regularly.\n\nFor any urgent inquiries, feel free to reply to this email or reach out to us directly via WhatsApp at ${WA}.\n\nBest regards,\nThe Admissions Team\nInstitut Universitaire Nobel`
      : `Dear ${app.full_name},\n\nFollowing a review of your file, we regret to inform you that we could not validate the payment receipt you submitted.\n\nHow to fix this? Your application dashboard has been unlocked. Please log back into the application portal to upload a valid proof of payment (a clear screenshot of the mobile transfer confirmation or an official banking receipt).\n\nIf you encounter any technical issues or believe this is an error, please reach out to our team immediately via WhatsApp at ${WA} to resolve the issue.\n\nBest regards,\nThe Admissions Team\nInstitut Universitaire Nobel`)

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
          <button onClick={switchLang} className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',border:'none',cursor:'pointer'}}>{t.lang_switch}</button>
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

        <div className="grid sm:grid-cols-2 gap-4 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Personal info */}
            <div className="iun-card">
              <h3 className="section-title text-lg mb-4">{t.sec_personal}</h3>
              
              {/* Inline Passport Photo Frame */}
              {passportLiveUrl ? (
                <div className="mb-4 flex justify-center sm:justify-start">
                  <img 
                    src={passportLiveUrl} 
                    alt="Applicant Passport" 
                    className="w-28 h-28 object-cover rounded-xl border-2 shadow-sm cursor-zoom-in" 
                    style={{borderColor:'var(--gold)'}}
                    onClick={() => window.open(passportLiveUrl, '_blank')}
                  />
                </div>
              ) : app.photo_url && (
                <div className="mb-4 text-xs font-semibold" style={{color:'var(--gray-400)'}}>
                  {lang === 'fr' ? "Chargement de la photo..." : "Loading photo..."}
                </div>
              )}

              <Field label={t.full_name} value={app.full_name} />
              <Field label={t.email} value={app.email} />
              <Field label={t.nationality} value={app.nationality} />
              <Field label={t.phone} value={app.phone_code && app.phone_number ? `${app.phone_code} ${app.phone_number}` : null} />
              <Field label={t.whatsapp} value={app.wp_code && app.wp_number ? `${app.wp_code} ${app.wp_number}` : null} />
              <Field label={t.th_exam} value={app.in_togo === true ? t.exam_inperson : app.in_togo === false ? t.exam_online : null} />
            </div>

            {/* Documents */}
            <div className="iun-card">
              <h3 className="section-title text-lg mb-3">{t.sec_docs}</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {lbl:t.cert_label, url:app.cert_url},
                  {lbl:t.birth_label, url:app.birth_cert_url}
                ].map(d => d.url && (
                  <button key={d.lbl} onClick={()=>getDocUrl(d.url)} className="flex items-center gap-2 p-3 rounded-xl border text-sm font-semibold text-left w-full" style={{border:'1px solid var(--gray-200)',background:'var(--cream)',color:'var(--navy)',cursor:'pointer'}}>
                    📄 {d.lbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Payment Proof Preview Panel (Moved up above Administrative Decision) */}
            <div className="iun-card">
              <h3 className="section-title text-lg mb-3">{t.proof_label}</h3>
              
              {proofUrl ? (
                app.payment_proof_url?.split('?')[0].toLowerCase().endsWith('.pdf') ? (
                  <iframe src={proofUrl} className="w-full h-96 rounded-xl border" title="Payment Proof PDF" />
                ) : (
                  <div className="text-center">
                    <img 
                      src={proofUrl} 
                      alt="Payment Proof" 
                      className="w-full h-auto rounded-xl object-contain max-h-96 border cursor-zoom-in shadow-sm" 
                      onClick={() => window.open(proofUrl, '_blank')} 
                    />
                    <p className="text-xs mt-2" style={{color:'var(--gray-400)'}}>
                      {lang === 'fr' ? "Cliquez sur l'image pour l'ouvrir en grand format" : "Click on the image to open in full size"}
                    </p>
                  </div>
                )
              ) : (
                <div className="p-6 text-center border rounded-xl" style={{borderColor:'var(--gray-200)', background:'rgba(0,0,0,0.02)'}}>
                  <p className="text-sm font-medium" style={{color:'var(--gray-400)'}}>
                    {app.payment_proof_url 
                      ? (lang === 'fr' ? "Chargement de l'aperçu du reçu..." : "Loading receipt preview...")
                      : (lang === 'fr' ? "Aucun reçu de paiement soumis" : "No payment receipt submitted")}
                  </p>
                </div>
              )}
            </div>

            {/* Admin decision card block (Now cleanly lands below the receipt) */}
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