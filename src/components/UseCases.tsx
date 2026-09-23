import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './UseCases.css'

export function UseCases() {
  const copy = useCopy()

  return (
    <section className="band band--sunk usecases" id="cas-usage">
      <div className="shell">
        <SectionHead n="06" label={copy.useCases.eyebrow} title={copy.useCases.title} split />

        <ul className="usecases__grid">
          {copy.useCases.items.map((item, i) => (
            <li key={item.title} data-reveal style={{ '--i': i } as CSSProperties}>
              <span className="usecases__n mono num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
