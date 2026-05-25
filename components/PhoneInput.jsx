'use client'
// Combined country-code dropdown + phone number input
import { PHONE_CODES } from '@/lib/countries'

export default function PhoneInput({ label, codeValue, numberValue, onCodeChange, onNumberChange, error, t }) {
  return (
    <div>
      <label className="iun-label">{label}</label>
      <div className="flex gap-2">
        <select
          value={codeValue}
          onChange={e => onCodeChange(e.target.value)}
          className="iun-select"
          style={{ width: '180px', flexShrink: 0 }}>
          <option value="">{t.sel_placeholder}</option>
          {PHONE_CODES.map(c => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input
          type="tel"
          value={numberValue}
          onChange={e => onNumberChange(e.target.value.replace(/\D/g, ''))}
          placeholder="XXXXXXXXXX"
          className={`iun-input flex-1 ${error ? 'error' : ''}`}
        />
      </div>
      {error && <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>{error}</p>}
      {!error && <p className="text-xs mt-1" style={{ color: 'var(--gray-400)' }}>{t.phone_hint}</p>}
    </div>
  )
}
