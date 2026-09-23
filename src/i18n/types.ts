import type { fr } from './fr'

/**
 * Le contenu français est la référence structurelle : `en.ts` doit satisfaire
 * exactement la même forme. Une clé oubliée côté anglais casse la compilation.
 */
export type Copy = typeof fr

export type LangCode = 'ar' | 'fr' | 'en'

/** Ton du sentiment, utilisé pour la pastille de couleur sémantique. */
export type Tone = 'positive' | 'neutral' | 'negative'
