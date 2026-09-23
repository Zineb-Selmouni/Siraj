import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Pipeline.css'

export function Pipeline() {
  const copy = useCopy()

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

        {/* La numérotation encode l'ordre réel : un contenu est capté avant
            d'être compris, compris avant d'être anticipé. */}
        <ol className="pipeline__steps">
          {copy.pipeline.steps.map((step, i) => (
            <li key={step.name} data-reveal style={{ '--i': i } as CSSProperties}>
              <p className="pipeline__meta mono">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{step.name}</span>
              </p>
              <h3 className="pipeline__title">{step.title}</h3>
              <ul className="pipeline__items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="pipeline__flow" data-reveal>
          <p className="pipeline__flow-title mono">{copy.pipeline.flowTitle}</p>
          <ol className="pipeline__nodes">
            {copy.pipeline.flow.map((node) => (
              <li key={node.name}>
                <span className="pipeline__node-name">{node.name}</span>
                <span className="pipeline__node-body">{node.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
