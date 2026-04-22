import en from './en'
import ar from './ar'

export type Language = 'en' | 'ar'

export type Translations = typeof en

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function mergeDeep<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result: Record<string, unknown> = { ...base }

  for (const key of Object.keys(override)) {
    const baseValue = result[key]
    const overrideValue = override[key]

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = mergeDeep(
        baseValue as Record<string, unknown>,
        overrideValue,
      )
    } else {
      result[key] = overrideValue
    }
  }

  return result as T
}

export const translations: Record<Language, Translations> = {
  en,
  ar: mergeDeep(en, ar as unknown as Record<string, unknown>),
}

export const languages: { code: Language; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
]
