import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Pipeline.css'

/**
 * La solution, en un schéma puis en détail.
 *
 * La version précédente disait deux fois la même chose : trois colonnes de
 * texte (capter / comprendre / anticiper) PUIS une rangée de cinq nœuds
 * décrivant la même chaîne. D'où l'impression de remplissage.
 *
 * Les deux sont désormais un seul objet : les cinq nœuds techniques posés
 * sur un rail, et les trois temps en portée au-dessus. On voit la chaîne
 * d'abord, on lit le détail ensuite.
 *
 * Combien de nœuds chaque temps recouvre — structure, pas contenu : cela
 * ne se traduit pas, donc cela ne vit pas dans les dictionnaires.
 */
const STAGE_SPANS = [2, 2, 1]

export function Pipeline() {
  const copy = useCopy()
  const { steps, flow } = copy.pipeline

  // Indice du premier nœud de chaque temps : 0, 2, 4.
  const starts: number[] = []
  STAGE_SPANS.forEach((_, i) => {
    starts.push(i === 0 ? 0 : starts[i - 1] + STAGE_SPANS[i - 1])
  })

  return (
    <section className="band pipeline" id="plateforme">
      <div className="shell">
        <SectionHead
          n="02"
          label={copy.pipeline.eyebrow}
          title={copy.pipeline.title}
          lede={copy.pipeline.lede}
          split
        />

        <figure className="chain" data-reveal>
          <figcaption className="chain__title mono">{copy.pipeline.flowTitle}</figcaption>

          {/* Les trois temps, en portée au-dessus du rail. */}
          <ol className="chain__stages" aria-hidden="true">
            {steps.map((step, i) => (
              <li
                key={step.name}
                className="chain__stage"
                style={{ gridColumn: `span ${STAGE_SPANS[i]}`, '--i': i } as CSSProperties}
              >
                <span className="chain__stage-n mono num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="chain__stage-name">{step.name}</span>
              </li>
            ))}
          </ol>

          <div className="chain__rail" aria-hidden="true">
            <span className="chain__line" />
          </div>

          <ol className="chain__nodes">
            {flow.map((node, i) => (
              <li key={node.name} style={{ '--i': i } as CSSProperties}>
                <span className="chain__dot" aria-hidden="true" />
                <span className="chain__node-name">{node.name}</span>
                <span className="chain__node-body">{node.body}</span>
              </li>
            ))}
          </ol>
        </figure>

        {/* Le détail des trois temps. La numérotation reprend celle du
            schéma : ce sont les mêmes étapes, vues de plus près. */}
        <ol className="stages">
          {steps.map((step, i) => (
            <li key={step.name} data-reveal style={{ '--i': i } as CSSProperties}>
              <p className="stages__meta mono">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{step.name}</span>
                <span className="stages__span" aria-hidden="true">
                  {flow
                    .slice(starts[i], starts[i] + STAGE_SPANS[i])
                    .map((n) => n.name)
                    .join(' · ')}
                </span>
              </p>
              <h3 className="stages__title">{step.title}</h3>
              <ul className="stages__items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
