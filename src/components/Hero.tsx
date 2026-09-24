import { useCopy } from '../i18n'
import { SirajReveal } from './logo/reveal/SirajReveal'
import './Hero.css'

/**
 * Ouverture.
 *
 * Trois zones, pas cinq : en-tête de repère, bloc principal, bande de
 * spécifications. La version précédente empilait un bandeau de tête, une
 * plaque encadrée, une légende et une bande — quatre blocs bordés, donc
 * quatre écarts, et un bandeau mono qui doublonnait visuellement avec la
 * barre de navigation juste au-dessus.
 *
 * Le signe déborde maintenant du cadre à droite : la lumière continue
 * au-delà de la page au lieu de s'arrêter net dans une boîte. C'est ce qui
 * relie les deux moitiés de la composition au lieu de les juxtaposer.
 *
 * L'entrée est chorégraphiée en CSS pur, par retards — le contenu est
 * au-dessus de la ligne de flottaison, il n'a rien à attendre d'un
 * observateur.
 */
export function Hero() {
  const copy = useCopy()

  return (
    <section className="hero band--dark" id="top">
      {/* La scène : le film, puis la lumière qu'il jette sur la section.
          Le film n'est plus un objet POSÉ dans le hero, il en est la
          source lumineuse — d'où sa place derrière le texte. */}
      <div className="hero__glow" aria-hidden="true" />

      {/* La scène s'arrête AU-DESSUS de la bande de spécifications : c'est
          elle qui borne le film, pas la section. La nappe, elle, reste sur
          toute la hauteur — la lumière ne s'arrête pas à un filet. */}
      <div className="hero__stage">
        <SirajReveal surface="dark" className="hero__film" title={copy.hero.markAlt} />
      </div>

      <div className="hero__grid shell">
        <div className="hero__text">
          <p className="hero__ref">
            <span className="hero__ref-label mono">
              <span className="hero__ref-mark" aria-hidden="true" />
              {copy.hero.eyebrow}
            </span>
            <span className="hero__ref-loc mono">{copy.hero.place}</span>
          </p>

          <div className="hero__headline">
            <h1 className="hero__title">{copy.hero.title}</h1>
            {/* Un trait de lumière traverse le titre, une fois. */}
            <span className="hero__streak" aria-hidden="true" />
          </div>

          <p className="hero__lede">{copy.hero.lede}</p>

          <div className="hero__actions">
            <a className="btn btn--solid" href="#pilote">
              {copy.hero.ctaPrimary}
            </a>
            <a className="btn btn--line" href="#plateforme">
              {copy.hero.ctaSecondary}
              <svg
                className="btn__arrow"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M2 8h11M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Le passage du faisceau sur le texte. Au-DESSUS de la colonne :
          le faisceau passe derrière les mots, sa lumière tombe dessus. */}
      <div className="hero__rake" aria-hidden="true" />

      <ul className="specs shell">
        {/* Le nom et son sens ouvrent la bande : « سراج », la lampe. */}
        <li className="specs__name">
          <span className="arabic specs__ar">سراج</span>
          <span className="specs__meaning">{copy.hero.nameMeaning}</span>
        </li>

        {copy.hero.chips.map((chip, i) => (
          <li key={chip}>
            <span className="specs__n mono num">{String(i + 1).padStart(2, '0')}</span>
            <span className="specs__label">{chip}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
