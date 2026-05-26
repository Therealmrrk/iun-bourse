import { useState, useEffect } from 'react'

export function useLang() {
  const [lang, setLang] = useState('fr')

  useEffect(() => {
    const saved = localStorage.getItem('iun_lang')
    if (saved) setLang(saved)
  }, [])

  const switchLang = () => {
    const next = lang === 'fr' ? 'en' : 'fr'
    setLang(next)
    localStorage.setItem('iun_lang', next)
  }

  return { lang, switchLang }
}