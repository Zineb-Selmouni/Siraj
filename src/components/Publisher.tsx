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
 * savoir à qui il s'adresse avant de savoir ce qu'il achète.
 *
 * La bande est SOMBRE, pour deux raisons. Elle coupe la longue suite de
 * sections claires qui précède, et c'est le moment où la page change de
 * sujet — on ne parle plus du produit mais de la maison. Accessoirement,
 * le logo Harmony y va dans ses couleurs : son or tombe à 1,38:1 sur le
 * papier, contre 11,98:1 ici.
 *
 * La version précédente empilait quatre chiffres, une liste à puces et
 * deux adresses en petit corps : trois blocs de texte gris de suite, et
 * la même grille de chiffres qu'à la section 05. Ici la carte de visite
 * ouvre, et les domaines suivent, numérotés comme le reste de la page.
 *
 * LES ADRESSES SONT DESCENDUES AU PIED DE PAGE, avec les téléphones et
 * les e-mails. Les répéter ici et là-bas serait un doublon sur une même
 * page ; la section dit QUI, le pied de page dit COMMENT JOINDRE.
 */
export function Publisher() {
  const copy = useCopy()
  const p = copy.publisher

  return (
    <section className="band band--dark publisher" id="editeur">
      <div className="shell">
        <SectionHead n="10" label={p.eyebrow} title={p.title} lede={p.lede} split />

        <div className="pub__card" data-reveal>
          <HarmonyLogo className="pub__logo" title="Harmony" />
          <dl className="pub__figures">
            {p.figures.map((f) => (
              <div key={f.label}>
                <dt className="pub__value num">{f.value}</dt>
                <dd>
                  <strong>{f.label}</strong>
                  <span>{f.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="pub__domains" data-reveal>
          <h3 className="pub__label mono">{p.pillarsTitle}</h3>
          <ol className="pub__pillars">
            {p.pillars.map((item, i) => (
              <li key={item} style={{ '--i': i } as CSSProperties}>
                <span className="pub__n mono num">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="pub__note" data-reveal>
          {p.footnote}
        </p>
      </div>
    </section>
  )
}
