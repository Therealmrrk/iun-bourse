'use client'
// ─────────────────────────────────────────────────────────────
//  FILE UPLOAD COMPONENT
//  1. User selects a file
//  2. Client validates size and type
//  3. Client calls /api/upload to get a signed Supabase URL
//  4. Client uploads directly to Supabase Storage
//  5. Calls onUpload(url) with the public file URL
// ─────────────────────────────────────────────────────────────
import { useState, useRef } from 'react'

export default function FileUpload({
  label, hint, accept, maxMB, folder,
  value,        // current file URL (if already uploaded)
  filename,     // display filename of the current file
  onUpload,     // callback(url, filename) when upload succeeds
  onRemove,     // callback when file is removed
  error, t,
  useCamera = false, // if true, shows a "Take photo" button on mobile
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const inputRef = useRef(null)
  const cameraRef = useRef(null)

  const handleFile = async (file) => {
    setUploadError('')
    // Validate size
    if (file.size > maxMB * 1024 * 1024) {
      setUploadError(t.err_file_size(maxMB))
      return
    }
    // Validate type (basic check)
    const allowed = accept.split(',').map(a => a.trim().toLowerCase())
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    const mime = file.type.toLowerCase()
    const ok = allowed.some(a => ext === a || mime.includes(a.replace('.', '')))
    if (!ok) { setUploadError(t.err_file_type); return }

    setUploading(true)
    try {
      // Step 1: Get signed upload URL from our API
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, folder }),
      })
      if (!res.ok) throw new Error('signed_url_failed')
      const { signedUrl, publicUrl } = await res.json()

      // Step 2: Upload directly to Supabase Storage
      const uploadRes = await fetch(signedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!uploadRes.ok) throw new Error('upload_failed')

      onUpload(publicUrl, file.name)
    } catch {
      setUploadError(t.err_upload_fail)
    } finally {
      setUploading(false)
    }
  }

  const displayError = uploadError || error

  return (
    <div>
      <label className="iun-label">{label}</label>

      {!value ? (
        <div className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all"
             style={{ borderColor: displayError ? 'var(--danger)' : 'var(--gray-200)', background: '#FAFAF8' }}
             onClick={() => inputRef.current?.click()}>
          {uploading ? (
            <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{t.uploading}</p>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                   style={{ background: 'var(--gray-100)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B9488" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--navy)' }}>{t.choose_file}</p>
              <p className="text-xs" style={{ color: 'var(--gray-400)' }}>{t.or_drag}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--gray-400)' }}>{hint}</p>
            </>
          )}
          <input ref={inputRef} type="file" accept={accept} className="hidden"
                 onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
             style={{ borderColor: 'var(--gold)', background: 'var(--gold-pale)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="text-sm font-semibold flex-1 truncate" style={{ color: 'var(--navy)' }}>
            {filename || 'Fichier téléchargé'}
          </span>
          <button onClick={onRemove}
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
            {t.remove_file}
          </button>
        </div>
      )}

      {/* Camera option for photo field on mobile */}
      {useCamera && !value && (
        <div className="mt-2">
          <button onClick={() => cameraRef.current?.click()}
            className="text-xs font-bold px-4 py-2 rounded-lg border transition-all"
            style={{ borderColor: 'var(--navy)', color: 'var(--navy)', background: 'none', cursor: 'pointer' }}>
            📷 {t.photo_cam}
          </button>
          <input ref={cameraRef} type="file" accept="image/*" capture="user" className="hidden"
                 onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
        </div>
      )}

      {displayError && (
        <p className="text-xs mt-1 font-semibold" style={{ color: 'var(--danger)' }}>{displayError}</p>
      )}
    </div>
  )
}
