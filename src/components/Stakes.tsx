import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Stakes.css'

/**
 * Le contexte : la masse, puis les quatre risques.
 *
 * Le champ de bruit n'est pas un ornement — c'est l'argument de la section
 * rendu visible. Une trame dense de marques inertes pour le flot quotidien,
 * et une poignée en laiton : ce qui vous concerne réellement. Le chiffre
 * seul énonçait le problème ; la trame le fait voir.
 *
 * Positions fixées en dur plutôt que tirées au sort : le rendu doit être
 * identique d'un chargement à l'autre, et la composition a été choisie —
 * les marques utiles sont dispersées, jamais alignées.
 */

const FIELD_DOTS = 144
/* Une marque par ligne, jamais deux dans la même colonne — vérifié aux deux
   largeurs de grille (24 colonnes, 16 sur petit écran). Des positions tirées
   au sort finiraient par s'aligner et l'œil y lirait une trame. */
const SIGNALS = new Set([5, 41, 50, 93, 107, 128])

export function Stakes() {
  const copy = useCopy()

  return (
    <section className="band stakes" id="contexte">
      <div className="shell">
        <SectionHead
          n="01"
          label={copy.stakes.eyebrow}
          title={copy.stakes.title}
          lede={copy.stakes.closing}
          split
        />

        <div className="volume">
          <figure className="volume__stat" data-reveal>
            <span className="volume__value num">{copy.stakes.statValue}</span>
            <figcaption>
              <strong>{copy.stakes.statUnit}</strong>
              <span>{copy.stakes.statNote}</span>
            </figcaption>
          </figure>

          <div className="field" data-reveal style={{ '--i': 1 } as CSSProperties}>
            <p className="field__label mono">{copy.stakes.fieldLabel}</p>

            <div
              className="field__grid"
              role="img"
              aria-label={`${copy.stakes.fieldLabel} — ${copy.stakes.fieldNote}`}
            >
              {Array.from({ length: FIELD_DOTS }, (_, i) => (
                <span
                  key={i}
                  className={`field__dot${SIGNALS.has(i) ? ' is-signal' : ''}`}
                  style={{ '--d': `${i * 4}ms` } as CSSProperties}
                />
              ))}
            </div>

            <p className="field__note">{copy.stakes.fieldNote}</p>
          </div>
        </div>

        {/* Les risques : une rangée serrée, pas une longue liste. Quatre
            conséquences d'un même manque, elles se lisent ensemble. */}
        <ol className="risks">
          {copy.stakes.risks.map((risk, i) => (
            <li key={risk.title} data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="risks__n mono num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{risk.title}</h3>
              <p>{risk.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
