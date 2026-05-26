'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { browserClient } from '@/lib/supabase'
import { translations } from '@/lib/translations'
import { statusStyle, statusLabel, formatDate } from '@/lib/utils'
import { useLang } from '@/lib/useLang'

export default function Dashboard() {
  const { lang, switchLang } = useLang()
  const [apps, setApps] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const t = translations[lang]
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await browserClient.auth.getSession()
      if (session) {
        setSession(session)
        fetchApps()
        return
      }
      // Wait and try once more before redirecting
      setTimeout(async () => {
        const { data: { session: session2 } } = await browserClient.auth.getSession()
        if (session2) {
          setSession(session2)
          fetchApps()
        } else {
          router.replace('/admin')
        }
      }, 1000)
    }
    checkSession()
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const fetchApps = async () => {
    const { data } = await browserClient.from('applications').select('id,full_name,email,in_togo,status,submitted_at,nationality').not('status','in','("draft_p1","draft_p2")').order('submitted_at', { ascending: false })
    setApps(data || [])
    setLoading(false)
  }

  const logout = async () => { await browserClient.auth.signOut(); router.push('/admin') }

  const filtered = apps.filter(a => {
    const matchFilter = filter === 'all' || a.status === filter
    const q = search.toLowerCase()
    return matchFilter && (!q || a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q))
  })

  const count = (s) => apps.filter(a => a.status === s).length

  const StatusBadge = ({ status }) => {
    const st = statusStyle(status)
    return <span className="status-badge" style={{background:st.bg,color:st.color}}><span style={{width:6,height:6,borderRadius:'50%',background:st.dot,display:'inline-block'}}></span>{statusLabel(status,t)}</span>
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--gray-100)'}}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{background:'var(--navy)'}}>
        <div className="flex items-center gap-3">
          <img src="/images/Logo.png" alt="IUN Logo" className="h-9 w-auto object-contain rounded" />
          <div>
            <p className="font-bold text-base sm:text-lg" style={{fontFamily:'Cormorant Garamond,serif',color:'var(--white)'}}><span style={{color:'var(--gold)'}}>{t.dash_title}</span></p>
            <p className="text-xs" style={{color:'rgba(255,255,255,0.4)'}}>{t.dash_sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={switchLang} className="text-xs px-3 py-1.5 rounded-lg" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',border:'none',cursor:'pointer'}}>{t.lang_switch}</button>
          <button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1" style={{background:'rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.6)',border:'none',cursor:'pointer'}}>⎋ {t.logout_btn}</button>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[{lbl:t.stat_total,val:apps.length,accent:'var(--navy)'},{lbl:t.stat_pending,val:count('submitted'),accent:'var(--gold)'},{lbl:t.stat_accepted,val:count('payment_accepted'),accent:'#2D7D4F'},{lbl:t.stat_rejected,val:count('payment_rejected'),accent:'var(--danger)'}].map(s=>(
            <div key={s.lbl} className="bg-white rounded-xl p-4 shadow-sm border-l-4" style={{borderColor:s.accent}}>
              <p className="text-3xl font-bold" style={{fontFamily:'Cormorant Garamond,serif',color:'var(--navy)'}}>{s.val}</p>
              <p className="text-xs font-bold uppercase tracking-wide mt-1" style={{color:'var(--gray-400)'}}>{s.lbl}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-4 flex-wrap" style={{borderBottom:'1px solid var(--gray-100)'}}>
            <div className="flex items-center gap-2 flex-1 min-w-48 px-3 py-2 rounded-lg" style={{background:'var(--cream)'}}>
              <span style={{color:'var(--gray-400)'}}>🔍</span>
              <input className="text-sm bg-transparent outline-none flex-1" placeholder={t.search_ph} value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[['all',t.filter_all],['submitted',t.filter_pending],['payment_accepted',t.filter_accepted],['payment_rejected',t.filter_rejected]].map(([k,l])=>(
                <button key={k} onClick={()=>setFilter(k)} className="text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all" style={{borderColor:filter===k?'var(--navy)':'var(--gray-200)',background:filter===k?'var(--navy)':'#fff',color:filter===k?'var(--gold)':'var(--gray-600)',cursor:'pointer'}}>{l}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr style={{background:'#FAFAF8'}}>{[t.th_ref,t.th_name,t.th_email,t.th_exam,t.th_status,t.th_date,''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide" style={{color:'var(--gray-400)'}}>{h}</th>)}</tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={7} className="text-center py-10 text-sm" style={{color:'var(--gray-400)'}}>Chargement…</td></tr>
                : filtered.length === 0 ? <tr><td colSpan={7} className="text-center py-10 text-sm" style={{color:'var(--gray-400)'}}>{t.no_results}</td></tr>
                : filtered.map(a => (
                  <tr key={a.id} className="border-t" style={{borderColor:'var(--gray-100)'}}>
                    <td className="px-4 py-3 text-xs font-bold" style={{color:'var(--gold)',fontFamily:'Cormorant Garamond,serif'}}>{a.id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-3 text-sm font-semibold" style={{color:'var(--navy)'}}>{a.full_name}</td>
                    <td className="px-4 py-3 text-xs" style={{color:'var(--gray-600)'}}>{a.email}</td>
                    <td className="px-4 py-3 text-xs">{a.in_togo === true ? t.exam_inperson : a.in_togo === false ? t.exam_online : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                    <td className="px-4 py-3 text-xs" style={{color:'var(--gray-400)'}}>{formatDate(a.submitted_at)}</td>
                    <td className="px-4 py-3"><button onClick={()=>router.push(`/admin/${a.id}`)} className="btn-primary text-xs px-3 py-1.5">{t.view_btn}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
