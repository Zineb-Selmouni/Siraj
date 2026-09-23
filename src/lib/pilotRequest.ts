import { PILOT_ENDPOINT, NETLIFY_FORM_NAME } from '../config'

export type PilotRequest = {
  organisation: string
  profile: string
  fullName: string
  role: string
  email: string
  phone: string
  topics: string
  /** Langue de la page au moment de la demande — utile au rappel commercial. */
  lang: string
  consentAt: string
  /** Champ piège. Vide chez un humain ; Netlify écarte le reste. */
  honeypot: string
}

export type SubmitResult = { status: 'sent' } | { status: 'failed'; reason: string }

/**
 * Envoie la demande de pilote.
 *
 * Deux voies, dans cet ordre :
 *
 *  1. `VITE_PILOT_ENDPOINT` s'il est défini — le CRM, un webhook, une
 *     fonction. La demande part en JSON.
 *  2. Sinon, Netlify Forms : la demande est postée en url-encodé à la
 *     racine du site, avec le nom du formulaire. Netlify l'intercepte,
 *     la range dans le tableau de bord du site et la passe au filtre
 *     anti-spam. Aucun serveur à tenir.
 *
 * Netlify détecte les formulaires en analysant le HTML STATIQUE au moment
 * du build. Un formulaire rendu par React est invisible pour lui : d'où le
 * formulaire caché déclaré dans index.html, qui doit rester synchronisé
 * avec les champs envoyés ici.
 *
 * Aucune des deux voies ne prétend avoir réussi sans preuve : toute réponse
 * hors 2xx est un échec, et l'interface bascule alors sur le repli e-mail.
 */
export async function submitPilotRequest(request: PilotRequest): Promise<SubmitResult> {
  const { honeypot, ...rest } = request

  try {
    const response = PILOT_ENDPOINT
      ? await fetch(PILOT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        })
      : await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': NETLIFY_FORM_NAME,
            ...rest,
            // Le nom du champ doit être celui déclaré par `netlify-honeypot`.
            'site-web': honeypot,
          }).toString(),
        })

    if (!response.ok) {
      return { status: 'failed', reason: `HTTP ${response.status}` }
    }

    return { status: 'sent' }
  } catch (error) {
    return {
      status: 'failed',
      reason: error instanceof Error ? error.message : 'network',
    }
  }
}
