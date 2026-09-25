import { useCopy } from '../i18n'
import { CONTACT, OFFICES, WEBSITE, WEBSITE_URL, mapsUrl } from '../config'
import { SirajLogo } from './logo/SirajLogo'
import { HarmonyLogo } from './logo/HarmonyLogo'
import './Footer.css'

/**
 * Le pied de page.
 *
 * Il porte maintenant toutes les coordonnées de l'éditeur : mobiles,
 * téléphone et fax, e-mails, et les deux adresses. La section 10 dit
 * QUI est l'éditeur, le pied de page dit COMMENT LE JOINDRE — les
 * adresses n'y figurent donc plus, un doublon sur une même page
 * n'apporte rien.
 *
 * Les numéros sont affichés avec leurs espaces et composés sans : un
 * `tel:` n'en accepte aucun.
 */
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

          <div className="foot__contact">
            <dl className="foot__reach">
              <div>
                <dt className="mono">{copy.footer.mobileTitle}</dt>
                {CONTACT.mobile.map((n) => (
                  <dd key={n}>
                    <a className="num" href={`tel:${n.replace(/\s/g, '')}`}>
                      {n}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="mono">{copy.footer.phoneTitle}</dt>
                {CONTACT.phone.map((n) => (
                  <dd key={n}>
                    <a className="num" href={`tel:${n.replace(/\s/g, '')}`}>
                      {n}
                    </a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="mono">{copy.footer.emailTitle}</dt>
                {CONTACT.email.map((e) => (
                  <dd key={e}>
                    <a href={`mailto:${e}`}>{e}</a>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="mono">{copy.footer.siteTitle}</dt>
                <dd>
                  <a href={WEBSITE_URL} target="_blank" rel="noreferrer noopener">
                    {WEBSITE}
                  </a>
                </dd>
              </div>
            </dl>

            <dl className="foot__places">
              {OFFICES.map((o) => (
                <div key={o.id}>
                  <dt className="mono">
                    {o.id === 'head' ? copy.footer.headOfficeTitle : copy.footer.labTitle}
                  </dt>
                  <dd>
                    <span>{o.address}</span>
                    <a
                      className="foot__dir"
                      href={mapsUrl(o.address)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {copy.footer.directions}
                      <span aria-hidden="true">&nbsp;&rarr;</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
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
