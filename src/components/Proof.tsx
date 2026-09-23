import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Proof.css'

/**
 * Maturité : les chiffres, puis l'avancement.
 *
 * Deux objets distincts, et non sept rangées à filet qui se ressemblent.
 * Empilée, la version précédente donnait quatre fiches de chiffres puis
 * trois jalons dans exactement la même forme : plus rien ne se détachait.
 *
 * Les jalons sont une PROGRESSION, pas une liste. La copie le dit
 * elle-même — « validé », « réalisé » sont accomplis, tandis que
 * « industrialisation de la collecte » est en cours. Le rail le montre :
 * pastille pleine pour ce qui est fait, cerclée pour l'étape courante.
 * L'état reste porté par les mots ; la pastille ne fait que le redire à
 * l'œil, d'où son `aria-hidden`.
 */

/** Jalons accomplis. Au-delà : l'étape en cours (cf. copie du deck). */
const DONE = 2

export function Proof() {
  const copy = useCopy()

  return (
    <section className="band proof" id="chiffres">
      <div className="shell">
        <SectionHead n="05" label={copy.metrics.eyebrow} title={copy.metrics.title} split />

        <dl className="figures">
          {copy.metrics.items.map((item, i) => (
            <div key={item.label} data-reveal style={{ '--i': i } as CSSProperties}>
              <dt className="figures__value num">{item.value}</dt>
              <dd>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ol className="track">
          {copy.metrics.milestones.map((m, i) => (
            <li
              key={m.title}
              className={i < DONE ? 'is-done' : 'is-current'}
              data-reveal
              style={{ '--i': i } as CSSProperties}
            >
              <span className="track__dot" aria-hidden="true" />
              <p className="track__meta mono num">{String(i + 1).padStart(2, '0')}</p>
              <h3>{m.title}</h3>
              <p className="track__body">{m.body}</p>
            </li>
          ))}
        </ol>

        <p className="proof__note" data-reveal>
          {copy.metrics.footnote}
        </p>
      </div>
    </section>
  )
}
