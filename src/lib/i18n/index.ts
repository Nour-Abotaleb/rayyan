import en from './en'
import ar from './ar'

export type Language = 'en' | 'ar'

export type Translations = typeof en

export const translations: Record<Language, Translations> = {
  en,
  ar: ar as unknown as Translations,
}

export const languages: { code: Language; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
]
