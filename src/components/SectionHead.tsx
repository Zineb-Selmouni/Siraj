import type { ReactNode } from 'react'

/**
 * L'en-tête de section, identique d'un bout à l'autre de la page :
 * filet, numéro, intitulé, titre, chapeau.
 *
 * Le numéro suit l'ordre de lecture réel — c'est une progression
 * argumentative (contexte → solution → preuve → offre → passage à l'acte),
 * pas un ornement.
 */
export function SectionHead({
  n,
  label,
  title,
  lede,
  split = false,
}: {
  n: string
  label: string
  title: ReactNode
  lede?: ReactNode
  /** Titre à gauche, chapeau à droite, sur les sections larges. */
  split?: boolean
}) {
  return (
    <header className={`head${split ? ' head--split' : ''}`} data-reveal>
      <p className="head__meta">
        <span className="head__n num">{n}</span>
        <span className="head__label">{label}</span>
      </p>
      <h2 className="head__title">{title}</h2>
      {lede && <p className="head__lede">{lede}</p>}
    </header>
  )
}
