'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { type Language, type Translations, languages, translations } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Language
  dir: 'ltr' | 'rtl'
  t: Translations
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null
    if (stored === 'en' || stored === 'ar') {
      applyLang(stored)
    }
  }, [])

  function applyLang(next: Language) {
    const { dir } = languages.find((l) => l.code === next)!
    setLangState(next)
    document.documentElement.lang = next
    document.documentElement.dir = dir
    localStorage.setItem('lang', next)
  }

  const dir = languages.find((l) => l.code === lang)!.dir

  return (
    <LanguageContext.Provider
      value={{ lang, dir, t: translations[lang], setLang: applyLang }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
