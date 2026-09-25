import { useId, useMemo } from 'react'
import { useLanguage } from '../../i18n'
import { MARKS, type LogoVariant, type LogoSurface } from './marks'
import './SirajLogo.css'

/**
 * Le signe Siraj, dans sa version affinée (livraison `brand/siraj/`).
 *
 * Deux lockups :
 *   · `symbol`  — le signe seul (phare, faisceau, arc, barres, vagues)
 *   · `compact` — signe + mot-symbole, à l'horizontale
 *
 * DEUX ÉCRITURES. La livraison fournit le lockup en latin (SIRAJ) et en
 * arabe (سراج) ; l'écriture suit la langue de la page, sans que
 * l'appelant ait à s'en occuper. Le SIGNE, lui, est identique dans les
 * deux — les fichiers sont d'ailleurs au même octet près : un phare n'a
 * pas d'écriture.
 *
 * Les deux lockups n'ont PAS le même rapport — 2,87 en latin, 2,04 en
 * arabe. Les dimensionner par la largeur donnerait deux hauteurs
 * différentes au même endroit ; c'est donc la hauteur qui est posée aux
 * emplacements (en-tête, pied de page), et la largeur suit.
 *
 * Le mot-symbole est DESSINÉ, jamais composé dans une police : c'est
 * l'interdit central de la charte, et cette livraison le respecte.
 *
 * `surface` choisit l'encre. La livraison ne fournit que des lockups
 * pour fond clair — l'encre du mot-symbole y tombe à 1,13:1 sur le
 * bleu-nuit de la page. La variante sombre est donc DÉDUITE (voir
 * scripts/build-logo.mjs) et reste à confirmer par le studio.
 *
 * Ce composant est FIXE. L'animation du logo est celle de la livraison,
 * portée telle quelle dans reveal/SirajReveal.tsx.
 *
 * LES IDENTIFIANTS SONT UNIQUES PAR INSTANCE. Le balisage généré porte
 * un jeton `%ID%` que chaque rendu remplace par le sien. Un préfixe fixe
 * suffisait tant qu'un lockup ne paraissait qu'une fois ; l'en-tête et
 * le pied de page affichent le même, et ses ids de dégradés se
 * retrouvaient donc en double — `url(#…)` résolvant alors vers la
 * première occurrence, au hasard de l'ordre du DOM.
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
  const { lang } = useLanguage()
  const mark = MARKS[lang === 'ar' ? 'arabic' : 'latin'][variant]

  // `useId` rend « :r1: » — les deux-points ne passent pas dans un
  // sélecteur `url(#…)`.
  const uid = useId().replace(/:/g, '')
  const html = useMemo(() => mark[surface].split('%ID%').join(uid), [mark, surface, uid])

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
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
