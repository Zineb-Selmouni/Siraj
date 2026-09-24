import { HARMONY } from './harmony'
import './HarmonyLogo.css'

/**
 * Le logo de l'éditeur.
 *
 * Icône + mot-symbole, tracés tous deux (le mot n'est pas composé dans
 * une police). L'icône garde l'or de la marque, `#FFC933` ; le mot hérite
 * de `currentColor`, donc la couleur se décide en CSS.
 *
 * IL EST FAIT POUR LE FOND SOMBRE. L'or tombe à 1,38:1 sur le papier de
 * la page — invisible — contre 11,98:1 sur le bleu-nuit. Partout où la
 * section est claire, le lockup est donc posé sur une plaque sombre
 * plutôt que recoloré : on ne retouche pas la couleur d'une marque qui
 * n'est pas la nôtre.
 */
export function HarmonyLogo({ className, title }: { className?: string; title?: string }) {
  return (
    <span
      className={['hm', className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
    >
      {title && <span className="hidden-visually">{title}</span>}
      <svg
        className="hm__icon"
        viewBox={HARMONY.icon.viewBox}
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: HARMONY.icon.inner }}
      />
      <svg
        className="hm__word"
        viewBox={HARMONY.wordmark.viewBox}
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: HARMONY.wordmark.inner }}
      />
    </span>
  )
}
