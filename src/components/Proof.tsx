import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Proof.css'

/** Maturité : les chiffres et les jalons, en une seule bande. */
export function Proof() {
  const copy = useCopy()

  return (
    <section className="band proof" id="chiffres">
      <div className="shell">
        <SectionHead n="05" label={copy.metrics.eyebrow} title={copy.metrics.title} split />

        <dl className="proof__figures">
          {copy.metrics.items.map((item, i) => (
            <div key={item.label} data-reveal style={{ '--i': i } as CSSProperties}>
              <dt className="proof__value num">{item.value}</dt>
              <dd>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ol className="proof__steps">
          {copy.metrics.milestones.map((m, i) => (
            <li key={m.title} data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="proof__step-n mono num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
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
