'use client'
// Generic confirmation modal with optional email preview
export default function Modal({ title, body, confirmLabel, cancelLabel, onConfirm, onCancel,
                                 emailPreview, previewLabel, danger = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(12,27,51,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--gray-100)' }}>
          <h2 className="font-bold text-lg" style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)' }}>
            {title}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-600)' }}>{body}</p>
        </div>

        {/* Email preview */}
        {emailPreview && (
          <div className="px-6 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--gray-400)' }}>
              {previewLabel}
            </p>
            <div className="rounded-xl border p-3 text-xs leading-relaxed max-h-48 overflow-y-auto"
                 style={{ borderColor: 'var(--gray-200)', background: 'var(--cream)', color: 'var(--gray-600)', whiteSpace: 'pre-wrap' }}>
              {emailPreview}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6">
          <button onClick={onCancel} className="btn-outline">{cancelLabel}</button>
          <button onClick={onConfirm}
            className="btn-primary"
            style={danger ? { background: 'var(--danger)' } : {}}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
