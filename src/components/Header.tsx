import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n'
import { LANGUAGES } from '../i18n/languages'
import { SirajMark } from './SirajMark'
import './Header.css'

export function Header() {
  const { copy, lang, setLang } = useLanguage()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const burgerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Un menu qu'on ne peut pas refermer est un piège : Échap, clic
  // extérieur, et le focus revient sur le bouton.
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t) || burgerRef.current?.contains(t)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const links = [
    { href: '#plateforme', label: copy.nav.platform },
    { href: '#darija', label: copy.nav.darija },
    { href: '#chiffres', label: copy.nav.figures },
    { href: '#offres', label: copy.nav.offers },
  ]

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}`}>
      <div className="nav__inner shell">
        <a className="brand" href="#top" aria-label="Siraj 360">
          <SirajMark className="brand__mark" />
          <span className="brand__text">
            {/*
              La charte interdit de recomposer le mot-symbole dans une police :
              c'est un dessin. Ce bloc rend le NOM, pas le lockup officiel —
              déposer le SVG dans public/ et le substituer avant mise en ligne.
            */}
            <span className="brand__name">Siraj 360</span>
            <span className="brand__sub mono">
              {lang === 'fr' ? 'Veille médiatique' : 'Media intelligence'}
            </span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          {/* Trois langues : un bouton par langue plutôt qu'une bascule.
              Une bascule à trois états n'indique pas où elle mène. */}
          <div className="lang" role="group" aria-label={copy.nav.switchTo}>
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                className={`lang__b mono${l.code === lang ? ' is-on' : ''}`}
                onClick={() => setLang(l.code)}
                aria-pressed={l.code === lang}
                lang={l.code}
                title={l.name}
              >
                {l.short}
                <span className="hidden-visually"> — {l.name}</span>
              </button>
            ))}
          </div>

          <a className="btn btn--solid nav__cta" href="#pilote">
            {copy.nav.cta}
          </a>

          <button
            ref={burgerRef}
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="nav-mobile"
            aria-label={copy.nav.platform}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="nav-mobile"
        ref={panelRef}
        className={`sheet${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <nav className="sheet__inner shell" aria-label="Navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn--solid sheet__cta"
            href="#pilote"
            onClick={() => setOpen(false)}
          >
            {copy.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
