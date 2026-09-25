/**
 * Coordonnées et points d'intégration.
 *
 * ⚠ À CONFIRMER AVANT MISE EN LIGNE — le deck commercial v2.2 laisse encore
 * « [Nom · téléphone · e-mail] » sur la slide 15 : ces valeurs sont des
 * emplacements, pas des coordonnées validées par la direction commerciale.
 */

/**
 * Numéro de déclaration CNDP.
 *
 * Le formulaire recueille des données à caractère personnel — nom,
 * fonction, e-mail professionnel, téléphone, organisation, sujets de
 * veille — et sa case de consentement invoque explicitement la loi
 * 09-08. Le traitement doit donc être DÉCLARÉ à la CNDP avant mise en
 * ligne ; invoquer la loi sans avoir déclaré est pire que de ne rien
 * dire.
 *
 * Tant que la valeur est vide, la mention n'est pas affichée : on ne
 * publie pas un numéro qu'on n'a pas. Le reste des mentions
 * (responsable, finalité, conservation, droits) est affiché en
 * permanence — il ne dépend d'aucune démarche.
 */
export const CNDP_DECLARATION = ''

/** Adresse de repli quand l'envoi du formulaire échoue. */
export const CONTACT_EMAIL = 'contact@harmony.ma'

/**
 * Les coordonnées de l'éditeur, telles qu'il les publie sur harmony.ma.
 *
 * Les numéros sont donnés à l'affichage avec leurs espaces, et en
 * `tel:` sans aucun — un lien téléphonique n'accepte pas d'espace.
 * D'où la paire : ce qu'on lit, et ce qu'on compose.
 */
export const CONTACT = {
  mobile: ['+212 6 67 67 15 45', '+212 6 67 67 15 65'],
  phone: ['+212 5 37 77 34 87', '+212 5 37 68 15 63'],
  email: ['contact@harmony.ma', 'recrute@harmony.ma'],
} as const

/**
 * Les deux adresses. `maps` construit une recherche par ADRESSE, sans
 * coordonnées : on n'invente pas une position qu'on n'a pas relevée, et
 * une recherche par adresse reste juste si le bâtiment est déplacé dans
 * la base cartographique.
 */
export const OFFICES = [
  {
    id: 'head',
    address: 'Villa n° 14, rue Annassime, bloc M, secteur 9, Hay Riad — 10100 Rabat',
  },
  {
    id: 'lab',
    address: 'Villa n° 9, rue Al Kassous, secteur 11, Hay Riad — 10100 Rabat',
  },
] as const

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

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
