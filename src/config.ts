/**
 * Coordonnées et points d'intégration.
 *
 * ⚠ À CONFIRMER AVANT MISE EN LIGNE — le deck commercial v2.2 laisse encore
 * « [Nom · téléphone · e-mail] » sur la slide 15 : ces valeurs sont des
 * emplacements, pas des coordonnées validées par la direction commerciale.
 */

/** Adresse de repli quand l'envoi du formulaire échoue. */
export const CONTACT_EMAIL = 'contact@harmony.ma'

/** Site institutionnel Harmony, cité sur la slide 15 du deck. */
export const WEBSITE = 'www.harmony.ma'
export const WEBSITE_URL = 'https://www.harmony.ma'

/**
 * Nom du formulaire Netlify. Doit correspondre EXACTEMENT au `name` du
 * formulaire caché déclaré dans index.html — c'est par ce nom que Netlify
 * rapproche la requête du formulaire qu'il a détecté au build.
 */
export const NETLIFY_FORM_NAME = 'pilote'

/**
 * Endpoint qui reçoit les demandes de pilote (CRM, webhook, fonction).
 * Défini dans .env.local : VITE_PILOT_ENDPOINT=https://…
 * Non défini → Netlify Forms prend le relais (voir lib/pilotRequest.ts).
 *
 * ⚠ Toute variable préfixée VITE_ est INLINÉE DANS LE BUNDLE et donc
 * publique. N'y mettre ni clé d'API, ni jeton, ni secret : uniquement une
 * URL publique, en écriture seule, protégée côté serveur (limitation de
 * débit, filtrage d'origine).
 */
export const PILOT_ENDPOINT = import.meta.env.VITE_PILOT_ENDPOINT as string | undefined
