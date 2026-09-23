import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Pipeline.css'

/**
 * La solution : la chaîne technique, puis les trois temps.
 *
 * Écueil corrigé — chaque nom n'apparaît QU'UNE FOIS. La version
 * précédente étiquetait le schéma avec « Capter / Comprendre / Anticiper »
 * puis rouvrait les mêmes intitulés juste en dessous, en rappelant par
 * écrit les nœuds couverts : trois répétitions pour une seule idée, et la
 * section se lisait comme un bégaiement.
 *
 * Le lien entre les deux rangées passe désormais par l'ALIGNEMENT. Le rail
 * est divisé en trois groupes de largeur égale — autant que de temps — et
 * les trois colonnes de détail tombent exactement sous leur groupe. Le
 * lecteur voit que « Capter » couvre Sources et Extraction parce que c'est
 * physiquement au-dessus, pas parce qu'on le lui répète.
 */

/** Nœuds couverts par chaque temps. Structure, donc hors dictionnaires. */
const NODES_PER_STAGE = [2, 2, 1]

/** Indice du premier nœud de chaque temps : 0, 2, 4. Constant, donc calculé
    une fois au chargement du module — rien à muter pendant le rendu. */
const STAGE_OFFSETS = NODES_PER_STAGE.map((_, i) =>
  NODES_PER_STAGE.slice(0, i).reduce((sum, n) => sum + n, 0),
)

export function Pipeline() {
  const copy = useCopy()
  const { steps, flow } = copy.pipeline

  const groups = NODES_PER_STAGE.map((count, i) => ({
    stage: steps[i],
    nodes: flow.slice(STAGE_OFFSETS[i], STAGE_OFFSETS[i] + count),
  }))

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

          <div className="chain__rail" aria-hidden="true">
            <span className="chain__line" />
          </div>

          <div className="chain__groups">
            {groups.map(({ stage, nodes }, g) => (
              <ol
                key={stage.name}
                className="chain__group"
                style={{ '--n': nodes.length } as CSSProperties}
                /* Le rattachement est visuel ; pour un lecteur d'écran il
                   doit être énoncé. */
                aria-label={stage.name}
              >
                {nodes.map((node, n) => (
                  <li key={node.name} style={{ '--i': g * 2 + n } as CSSProperties}>
                    <span className="chain__dot" aria-hidden="true" />
                    <span className="chain__node-name">{node.name}</span>
                    <span className="chain__node-body">{node.body}</span>
                  </li>
                ))}
              </ol>
            ))}
          </div>
        </figure>

        {/* Trois colonnes de largeur égale : elles tombent sous leur groupe
            de nœuds. C'est le seul endroit où les temps sont nommés. */}
        <ol className="stages">
          {steps.map((step, i) => (
            <li key={step.name} data-reveal style={{ '--i': i } as CSSProperties}>
              <p className="stages__meta mono">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{step.name}</span>
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
