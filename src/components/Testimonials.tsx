import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SHOW_PLACEHOLDERS, TESTIMONIALS } from '../proof'
import { SectionHead } from './SectionHead'
import './Testimonials.css'

/**
 * Les témoignages.
 *
 * Même règle que les références : sans citation réelle et hors
 * développement, la section n'existe pas. Une citation inventée sur un
 * site qui s'adresse à l'achat public n'est pas une maquette, c'est un
 * faux — et elle serait attribuée à une personne nommée.
 *
 * Le gabarit montre les champs à recueillir, et rien d'autre : pas de
 * fausse citation, même en placeholder. Voir src/proof.ts.
 *
 * Il est placé derrière `SHOW_PLACEHOLDERS` SEUL, et non derrière une
 * condition mixte : la constante étant statiquement fausse en
 * production, le compilateur supprime la branche entière. Vérifié —
 * aucune chaîne du gabarit ne subsiste dans le bundle publié.
 */

/** Deux cartes : c'est le format cible, et ce que la grille attend. */
const SLOTS = 2

export function Testimonials() {
  const copy = useCopy()
  const has = TESTIMONIALS.length > 0

  /* Rien à montrer et pas de gabarit : la section n'existe pas. */
  if (!has && !SHOW_PLACEHOLDERS) return null

  return (
    <section className="band quotes" id="temoignages">
      <div className="shell">
        <SectionHead
          n="12"
          label={copy.testimonials.eyebrow}
          title={copy.testimonials.title}
          lede={copy.testimonials.lede}
          split
        />

        {has ? (
          <ul className="quotes__grid">
            {TESTIMONIALS.map((t, i) => (
              <li key={t.name} data-reveal style={{ '--i': i } as CSSProperties}>
                <figure>
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    <span className="quotes__org mono">{t.org}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : SHOW_PLACEHOLDERS ? (
          <ul className="quotes__grid quotes__grid--draft" aria-hidden="true">
            {Array.from({ length: SLOTS }, (_, i) => (
              <li key={i}>
                <span className="quotes__mark">&ldquo;</span>
                <span className="quotes__field quotes__field--quote">
                  citation à recueillir
                </span>
                <span className="quotes__field">nom</span>
                <span className="quotes__field">fonction</span>
                <span className="quotes__field">organisation</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
