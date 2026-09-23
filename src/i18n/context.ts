import { createContext, useContext } from 'react'
import type { Copy, LangCode } from './types'

/**
 * Le contexte et ses accesseurs, séparés du composant fournisseur.
 *
 * Un module qui exporte à la fois un composant et des fonctions ordinaires
 * casse le rafraîchissement à chaud de Vite : il ne sait plus quoi
 * remplacer. D'où la coupure — contexte et hooks ici, composant à côté,
 * barillet par-dessus pour que les imports restent `from '../i18n'`.
 */

export type LanguageValue = {
  lang: LangCode
  copy: Copy
  setLang: (next: LangCode) => void
  toggle: () => void
}

export const LanguageContext = createContext<LanguageValue | null>(null)

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage doit être utilisé dans un <LanguageProvider>')
  return value
}

/** Raccourci : le dictionnaire de la langue courante. */
export function useCopy(): Copy {
  return useLanguage().copy
}
