import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import { HarmonyLogo } from './logo/HarmonyLogo'
import './Publisher.css'

/**
 * L'éditeur.
 *
 * Pour un achat public, la crédibilité de l'ÉDITEUR compte autant que
 * celle du produit : un acheteur qui engage des deniers publics veut
 * savoir à qui il s'adresse avant de savoir ce qu'il achète. La page
 * n'en disait rien — elle vendait Siraj sans jamais présenter Harmony.
 *
 * La section est placée juste avant la demande de pilote : on établit
 * qui l'on est, puis on demande. L'inverse se lit comme une publicité.
 *
 * TOUS LES CHIFFRES VIENNENT DE harmony.ma et sont attribués comme tels
 * dans la note de bas de section. Ce sont les chiffres que l'éditeur
 * publie lui-même, pas des mesures vérifiées : la nuance est portée par
 * la note, et elle doit y rester.
 */
export function Publisher() {
  const copy = useCopy()
  const p = copy.publisher

  return (
    <section className="band publisher" id="editeur">
      <div className="shell">
        <SectionHead n="10" label={p.eyebrow} title={p.title} lede={p.lede} split />

        {/* Sur plaque sombre : l'or de la marque tombe à 1,38:1 sur le
            papier de la section, contre 11,98:1 ici. On pose le logo sur
            un fond qui lui va plutôt que de le recolorer — ce n'est pas
            notre marque. */}
        <p className="pub__plate" data-reveal>
          <HarmonyLogo title="Harmony" />
        </p>

        <dl className="pub__figures">
          {p.figures.map((f, i) => (
            <div key={f.label} data-reveal style={{ '--i': i } as CSSProperties}>
              <dt className="pub__value num">{f.value}</dt>
              <dd>
                <strong>{f.label}</strong>
                <span>{f.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="pub__split">
          <div className="pub__col" data-reveal>
            <h3 className="pub__label mono">{p.pillarsTitle}</h3>
            <ul className="pub__pillars">
              {p.pillars.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pub__col" data-reveal style={{ '--i': 1 } as CSSProperties}>
            <h3 className="pub__label mono">{p.addressTitle}</h3>
            <p className="pub__addr">{p.address}</p>
            <h3 className="pub__label mono pub__label--2">{p.labTitle}</h3>
            <p className="pub__addr">{p.lab}</p>
          </div>
        </div>

        <p className="pub__note" data-reveal>
          {p.footnote}
        </p>
      </div>
    </section>
  )
}
