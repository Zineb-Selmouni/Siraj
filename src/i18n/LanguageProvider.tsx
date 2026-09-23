import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { fr } from './fr'
import { en } from './en'
import { ar } from './ar'
import { DEFAULT_LANG, LANGUAGES, dirOf } from './languages'
import { LanguageContext, type LanguageValue } from './context'
import type { Copy, LangCode } from './types'

const dictionaries: Record<LangCode, Copy> = { ar, fr, en }

const STORAGE_KEY = 'siraj360.lang'

/**
 * Préférence mémorisée, sinon la langue du navigateur si nous la servons,
 * sinon le français — langue du deck commercial et de la relation client.
 */
function detectLang(): LangCode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.some((l) => l.code === stored)) return stored as LangCode
  } catch {
    /* navigation privée ou stockage bloqué : on retombe sur la détection */
  }

  const nav = typeof navigator !== 'undefined' ? navigator.language?.toLowerCase() : ''
  const match = LANGUAGES.find((l) => nav?.startsWith(l.code))
  return match?.code ?? DEFAULT_LANG
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLang)

  // `lang` ET `dir` : sans `dir`, l'arabe s'afficherait de gauche à droite
  // et toutes les propriétés logiques du CSS resteraient orientées LTR.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dirOf(lang)
  }, [lang])

  const setLang = useCallback((next: LangCode) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* préférence non mémorisée, sans conséquence sur l'affichage */
    }
  }, [])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      copy: dictionaries[lang],
      setLang,
      // Fait défiler les langues dans l'ordre du sélecteur.
      toggle: () => {
        const i = LANGUAGES.findIndex((l) => l.code === lang)
        setLang(LANGUAGES[(i + 1) % LANGUAGES.length].code)
      },
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
