import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  const stored = window.localStorage.getItem('lang')
  if (stored === 'en' || stored === 'th') return stored
  return navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'en'
}

function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLanguage = () => setLang((l) => (l === 'en' ? 'th' : 'en'))

  const t = (key) => getPath(translations[lang], key) ?? getPath(translations.en, key) ?? key

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
