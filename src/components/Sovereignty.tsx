import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Sovereignty.css'

export function Sovereignty() {
  const copy = useCopy()

  return (
    <section className="band sovereignty" id="souverainete">
      <div className="shell">
        <SectionHead
          n="08"
          label={copy.sovereignty.eyebrow}
          title={copy.sovereignty.title}
          lede={copy.sovereignty.lede}
          split
        />

        <ul className="sov__grid">
          {copy.sovereignty.items.map((item, i) => (
            <li key={item.title} data-reveal style={{ '--i': i } as CSSProperties}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="sov__note" data-reveal>
          {copy.sovereignty.footnote}
        </p>
      </div>
    </section>
  )
}
