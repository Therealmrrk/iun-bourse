'use client'
// In-Togo / Not-in-Togo card selector
export default function TogoSelector({ value, onChange, t }) {
  return (
    <div>
      <label className="iun-label">{t.togo_question}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
        {[
          { val: true,  icon: '🇹🇬', title: t.togo_yes, sub: t.togo_yes_sub },
          { val: false, icon: '🌍', title: t.togo_no,  sub: t.togo_no_sub  },
        ].map(opt => {
          const selected = value === opt.val
          return (
            <div key={String(opt.val)}
              onClick={() => onChange(opt.val)}
              className="p-4 rounded-xl border-2 cursor-pointer transition-all"
              style={{
                borderColor: selected ? 'var(--navy)' : 'var(--gray-200)',
                background:  selected ? 'var(--navy)' : '#fff',
              }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{opt.icon}</span>
                <span className="text-sm font-bold"
                      style={{ color: selected ? 'var(--gold)' : 'var(--navy)' }}>
                  {opt.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed"
                 style={{ color: selected ? 'rgba(255,255,255,0.7)' : 'var(--gray-400)' }}>
                {opt.sub}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
