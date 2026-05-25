// Shows the 2-step progress indicator at the top of apply pages
export default function PageIndicator({ current, t }) {
  const steps = [
    { n: 1, label: t.page1_label },
    { n: 2, label: t.page2_label },
  ]
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const done   = s.n < current
        const active = s.n === current
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                   style={{
                     background: active ? 'var(--navy)' : done ? 'var(--gold)' : '#fff',
                     border: `2px solid ${active ? 'var(--navy)' : done ? 'var(--gold)' : 'var(--gray-200)'}`,
                     color: active ? 'var(--gold)' : done ? 'var(--navy)' : 'var(--gray-400)',
                   }}>
                {done ? '✓' : s.n}
              </div>
              <span className="text-xs font-semibold mt-1.5 text-center max-w-24"
                    style={{ color: active ? 'var(--navy)' : done ? 'var(--gold-dark)' : 'var(--gray-400)' }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-16 h-0.5 mx-2 mb-5"
                   style={{ background: done ? 'var(--gold)' : 'var(--gray-200)' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
