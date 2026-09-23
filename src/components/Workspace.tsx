import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import { Dashboard } from './Dashboard'
import './Workspace.css'

/**
 * Le poste de travail (deck commercial, slide 6).
 *
 * La console prend toute la largeur : c'est la démonstration du produit,
 * et une console rangée dans une colonne se lit comme un encart. Les trois
 * fonctions annoncées passent au-dessus, en bandeau — on dit ce que fait
 * l'outil, puis on le montre.
 */
export function Workspace() {
  const copy = useCopy()

  return (
    <section className="band band--sunk workspace" id="poste">
      <div className="shell">
        <SectionHead
          n="03"
          label={copy.workspace.eyebrow}
          title={copy.workspace.title}
          lede={copy.workspace.lede}
          split
        />

        <ul className="ws__blocks">
          {copy.workspace.blocks.map((b, i) => (
            <li key={b.title} data-reveal style={{ '--i': i } as CSSProperties}>
              <p className="ws__meta mono">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{b.title}</span>
              </p>
              <p className="ws__body">{b.body}</p>
            </li>
          ))}
        </ul>

        <div className="ws__console">
          <Dashboard />
        </div>
      </div>
    </section>
  )
}
