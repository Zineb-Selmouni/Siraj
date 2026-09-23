import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Darija.css'

/**
 * Le différenciateur, démontré plutôt qu'affirmé.
 *
 * Une mention en darija translittérée, décomposée comme le moteur la voit :
 * entités marquées dans le texte, langue détectée, sentiment scoré,
 * thématique. C'est exactement ce que les plateformes internationales ne
 * lisent pas — autant le montrer sur pièce.
 */
export function Darija() {
  const copy = useCopy()
  const a = copy.darija.analysis
  const labels = copy.darija.sampleLabels

  return (
    <section className="band band--dark darija" id="darija">
      <div className="shell">
        <SectionHead
          n="04"
          label={copy.darija.eyebrow}
          title={copy.darija.title}
          lede={copy.darija.lede}
          split
        />

        <div className="darija__grid">
          <article className="analysis" data-reveal>
            <header className="analysis__head">
              <span className="analysis__source">{a.source}</span>
              <span className="analysis__time mono num">{a.time}</span>
            </header>

            {/* Darija en caractères latins : le texte reste LTR même en
                page arabe — c'est la pièce à conviction, pas de la prose. */}
            <p className="analysis__text" dir="ltr">
              {a.parts.map((part, i) =>
                part.entity ? (
                  <span key={i} className="tok">
                    {part.t}
                    <span className="tok__tag mono">{part.entity}</span>
                  </span>
                ) : (
                  <span key={i}>{part.t}</span>
                ),
              )}
            </p>

            <p className="analysis__gloss">
              <span className="mono analysis__gloss-label">{a.glossLabel}</span>
              {a.gloss}
            </p>

            <dl className="analysis__fields">
              <div>
                <dt className="mono">{labels.language}</dt>
                <dd>
                  <span className="analysis__value">{a.language}</span>
                  <Meter value={a.languageScore} label={a.confidence} />
                </dd>
              </div>
              <div>
                <dt className="mono">{labels.sentiment}</dt>
                <dd>
                  <span className="analysis__value" data-tone={a.tone}>
                    <span className="analysis__dot" aria-hidden="true" />
                    {a.sentiment}
                  </span>
                  <Meter value={a.sentimentScore} label={a.confidence} tone={a.tone} />
                </dd>
              </div>
              <div>
                <dt className="mono">{labels.topic}</dt>
                <dd>
                  <span className="analysis__value">{a.topic}</span>
                </dd>
              </div>
            </dl>
          </article>

          <ul className="darija__caps">
            {copy.darija.capabilities.map((cap, i) => (
              <li key={cap.title} data-reveal style={{ '--i': i + 1 } as CSSProperties}>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="darija__note mono" data-reveal>
          {copy.darija.sampleCaption}
        </p>
      </div>
    </section>
  )
}

function Meter({ value, label, tone }: { value: number; label: string; tone?: string }) {
  const pct = Math.round(value * 100)
  return (
    <span className="meter" data-tone={tone}>
      <span className="meter__track" aria-hidden="true">
        <span className="meter__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="meter__num mono num">
        <span className="hidden-visually">{label} </span>
        {pct}%
      </span>
    </span>
  )
}
