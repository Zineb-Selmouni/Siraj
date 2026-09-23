import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Stakes.css'

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

        <div className="stakes__body">
          <figure className="stakes__stat" data-reveal>
            <span className="stakes__value num">{copy.stakes.statValue}</span>
            <figcaption>
              <strong>{copy.stakes.statUnit}</strong>
              <span>{copy.stakes.statNote}</span>
            </figcaption>
          </figure>

          <ol className="stakes__risks ruled">
            {copy.stakes.risks.map((risk, i) => (
              <li key={risk.title} data-reveal style={{ '--i': i } as CSSProperties}>
                <span className="stakes__n mono num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="stakes__risk">{risk.title}</h3>
                <p>{risk.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
