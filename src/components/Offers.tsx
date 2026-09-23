import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Offers.css'

export function Offers() {
  const copy = useCopy()

  return (
    <section className="band band--sunk offers" id="offres">
      <div className="shell">
        <SectionHead n="09" label={copy.offers.eyebrow} title={copy.offers.title} split />

        <ul className="offers__grid">
          {copy.offers.tiers.map((tier, i) => (
            <li key={tier.name} data-reveal style={{ '--i': i } as CSSProperties}>
              <h3>{tier.name}</h3>
              <p className="offers__who mono">{tier.audience}</p>
              <ul className="offers__list">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="offers__note" data-reveal>
          {copy.offers.footnote}
        </p>
      </div>
    </section>
  )
}
