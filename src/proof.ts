/**
 * La preuve sociale : références clientes et témoignages.
 *
 * CES DEUX TABLEAUX SONT VIDES, ET C'EST VOULU. La relecture reproche à
 * la page de dire « pilote terrain réalisé » et « usage réel sur des
 * sujets de veille clients » sans rien montrer. Le reproche est juste —
 * et il ne se corrige pas en écrivant du code : il faut des faits.
 * Inventer un logo, un nom ou une citation produirait un faux, sur un
 * site qui s'adresse à des acheteurs publics.
 *
 * Les notes d'intervention du deck sont explicites : toute référence
 * nommée est SOUMISE À L'ACCORD DU CLIENT. Ne rien ajouter ici sans cet
 * accord, par écrit.
 *
 * TANT QUE CES TABLEAUX SONT VIDES :
 *   · en production, les deux sections ne s'affichent pas du tout ;
 *   · en développement, elles s'affichent en gabarit, visiblement
 *     marquées, pour qu'on voie la forme avant d'avoir le fond.
 *
 * Il n'y a donc aucun chemin par lequel un gabarit atteigne le public.
 */

export type ClientLogo = {
  /** Nom de l'organisation, dans l'orthographe qu'elle a validée. */
  name: string
  /**
   * Fichier dans `public/logos/`. Un SVG monochrome sur fond
   * transparent tient à toutes les tailles ; un PNG à 2× convient à
   * défaut. La bande les rend en une seule couleur : voir References.css.
   */
  src: string
}

export type Testimonial = {
  /** La citation, telle qu'elle a été relue et approuvée par la personne. */
  quote: string
  /** Prénom et nom. */
  name: string
  /** Fonction exacte. */
  role: string
  /** Organisation. */
  org: string
}

/** À remplir — accord écrit du client requis pour chaque entrée. */
export const CLIENT_LOGOS: ClientLogo[] = []

/** À remplir — citation relue et approuvée par la personne citée. */
export const TESTIMONIALS: Testimonial[] = []

/**
 * Le gabarit ne se montre qu'en développement, ou si on l'active
 * explicitement pour faire relire une préversion.
 *
 * `VITE_SHOW_PLACEHOLDERS=1` dans .env.local. Ne jamais poser cette
 * variable sur l'environnement de production Netlify.
 */
export const SHOW_PLACEHOLDERS =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === '1'
