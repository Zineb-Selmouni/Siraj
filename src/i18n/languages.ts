import type { LangCode } from './types'

/**
 * Les langues servies, dans l'ordre du sélecteur.
 *
 * L'arabe et le français sont les deux langues de travail au Maroc ;
 * l'anglais sert les interlocuteurs internationaux. Le français reste la
 * langue par défaut — c'est celle du deck commercial et de la relation
 * client — mais un navigateur arabophone ou anglophone reçoit la sienne.
 */
export const LANGUAGES: ReadonlyArray<{
  code: LangCode
  short: string
  name: string
  dir: 'ltr' | 'rtl'
}> = [
  { code: 'ar', short: 'AR', name: 'العربية', dir: 'rtl' },
  { code: 'fr', short: 'FR', name: 'Français', dir: 'ltr' },
  { code: 'en', short: 'EN', name: 'English', dir: 'ltr' },
]

export const DEFAULT_LANG: LangCode = 'fr'

export function dirOf(lang: LangCode): 'ltr' | 'rtl' {
  return LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr'
}
