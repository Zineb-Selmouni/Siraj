import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { CLIENT_LOGOS, SHOW_PLACEHOLDERS } from '../proof'
import { SectionHead } from './SectionHead'
import './References.css'

/**
 * Les références clientes.
 *
 * La section ne s'affiche QUE s'il y a de quoi l'afficher. Sans logo
 * réel et hors développement, elle disparaît entièrement : une bande
 * « nos clients » vide est pire que pas de bande du tout.
 *
 * En développement, elle montre son gabarit — des emplacements marqués,
 * pour qu'on juge la forme avant d'avoir le fond. Voir src/proof.ts.
 *
 * Le gabarit est placé derrière `SHOW_PLACEHOLDERS` SEUL, et non derrière
 * une condition mixte : la constante étant statiquement fausse en
 * production, le compilateur supprime la branche entière. Vérifié —
 * aucune chaîne du gabarit ne subsiste dans le bundle publié.
 */

/** Nombre d'emplacements montrés en gabarit. Une rangée pleine. */
const SLOTS = 6

export function References() {
  const copy = useCopy()
  const has = CLIENT_LOGOS.length > 0

  /* Rien à montrer et pas de gabarit : la section n'existe pas. */
  if (!has && !SHOW_PLACEHOLDERS) return null

  return (
    <section className="band band--sunk refs" id="references">
      <div className="shell">
        <SectionHead
          n="11"
          label={copy.references.eyebrow}
          title={copy.references.title}
          lede={copy.references.lede}
          split
        />

        {has ? (
          <ul className="refs__grid">
            {CLIENT_LOGOS.map((logo, i) => (
              <li key={logo.name} data-reveal style={{ '--i': i } as CSSProperties}>
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </li>
            ))}
          </ul>
        ) : SHOW_PLACEHOLDERS ? (
          <ul className="refs__grid refs__grid--draft" aria-hidden="true">
            {Array.from({ length: SLOTS }, (_, i) => (
              <li key={i}>
                <span className="mono num">{String(i + 1).padStart(2, '0')}</span>
                <span>logo client</span>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="refs__note" data-reveal>
          {copy.references.footnote}
        </p>
      </div>
    </section>
  )
}
