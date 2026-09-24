import { MARKS, type LogoVariant, type LogoSurface } from './marks'
import './SirajLogo.css'

/**
 * Le logo Siraj, dans sa version affinée (livraison « Siraj logo
 * refinement »). Il remplace le signe reconstruit à la main d'après la
 * charte v6.2.
 *
 * Deux lockups :
 *   · `symbol`  — le signe seul (phare, faisceau, arc, barres, vagues)
 *   · `compact` — signe + mot-symbole, à l'horizontale
 *
 * Le mot-symbole est DESSINÉ (chaque lettre est un tracé), jamais composé
 * dans une police : c'est l'interdit central de la charte, et cette
 * livraison le respecte enfin. L'en-tête peut donc cesser de simuler
 * « Siraj 360 » en Sora.
 *
 * `surface` choisit l'encre. La livraison ne fournit que des lockups pour
 * fond clair — l'encre du mot-symbole y est un charbon qui tombe à 1,05:1
 * sur le bleu-nuit de la page. La variante sombre est donc DÉDUITE
 * (voir scripts/build-logo.mjs) et reste à confirmer par le studio.
 *
 * Ce composant est FIXE. L'animation du logo est celle de la livraison,
 * portée telle quelle dans reveal/SirajReveal.tsx — c'est la seule de la
 * page. Une seconde séquence, écrite ici en CSS, en serait une variante
 * non livrée : deux gestes différents pour une même marque.
 */
export function SirajLogo({
  variant = 'symbol',
  surface = 'dark',
  className,
  title,
}: {
  variant?: LogoVariant
  surface?: LogoSurface
  className?: string
  title?: string
}) {
  const mark = MARKS[variant]

  return (
    <svg
      className={['sj', className].filter(Boolean).join(' ')}
      viewBox={mark.viewBox}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      /* Le balisage vient d'un fichier de design nettoyé au build : pas de
         saisie utilisateur, rien à échapper à l'exécution. */
      dangerouslySetInnerHTML={{ __html: mark[surface] }}
    />
  )
}
