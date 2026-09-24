import { useCopy } from '../i18n'
import { CONTACT_EMAIL, WEBSITE, WEBSITE_URL } from '../config'
import { SirajLogo } from './logo/SirajLogo'
import { HarmonyLogo } from './logo/HarmonyLogo'
import './Footer.css'

export function Footer() {
  const copy = useCopy()
  const year = new Date().getFullYear()

  return (
    <footer className="foot band--dark">
      <div className="shell">
        <div className="foot__top">
          <div className="foot__brand">
            <SirajLogo variant="compact" surface="dark" className="foot__mark" />
            <p className="foot__baseline">{copy.footer.baseline}</p>
            {/* La signature Siraj : elle avait disparu de la page lors de la
                refonte du hero. Sa place est ici, sous le signe. */}
            <p className="foot__tagline mono">{copy.hero.tagline}</p>
            <p className="foot__catalog mono">{copy.footer.catalog}</p>

            {/* Le fond est déjà sombre : le logo y va dans ses couleurs. */}
            <p className="foot__by">
              <span className="mono">{copy.footer.publishedBy}</span>
              <HarmonyLogo className="foot__harmony" title="Harmony" />
            </p>
          </div>

          <dl className="foot__details">
            <div>
              <dt className="mono">{copy.footer.contactTitle}</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="mono">{copy.footer.siteTitle}</dt>
              <dd>
                <a href={WEBSITE_URL} target="_blank" rel="noreferrer noopener">
                  {WEBSITE}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono">{copy.footer.officeTitle}</dt>
              <dd>{copy.footer.office}</dd>
            </div>
          </dl>
        </div>

        <div className="foot__bottom">
          <p className="num">
            © {year} {copy.footer.company}. {copy.footer.rights}
          </p>
          <nav className="foot__legal" aria-label={copy.footer.legal}>
            <a href="#souverainete">{copy.footer.legal}</a>
            <a href="#souverainete">{copy.footer.privacy}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
