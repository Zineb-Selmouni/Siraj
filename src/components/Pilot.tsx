import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useLanguage } from '../i18n'
import { CNDP_DECLARATION, CONTACT_EMAIL } from '../config'
import { submitPilotRequest } from '../lib/pilotRequest'
import { SectionHead } from './SectionHead'
import './Pilot.css'

type Field = 'organisation' | 'fullName' | 'email' | 'consent'
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Pilot() {
  const { copy, lang } = useLanguage()
  const form = copy.pilot.form

  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '').trim()

    const next: Errors = {}
    if (!value('organisation')) next.organisation = form.required
    if (!value('fullName')) next.fullName = form.required
    if (!value('email')) next.email = form.required
    else if (!EMAIL.test(value('email'))) next.email = form.invalidEmail
    if (!data.get('consent')) next.consent = form.consentRequired

    setErrors(next)
    if (Object.keys(next).length > 0) {
      // Le premier champ fautif reprend le focus : on ne laisse pas
      // l'utilisateur chercher l'erreur dans le formulaire.
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    const result = await submitPilotRequest({
      organisation: value('organisation'),
      profile: value('profile'),
      fullName: value('fullName'),
      role: value('role'),
      email: value('email'),
      phone: value('phone'),
      topics: value('topics'),
      lang,
      consentAt: new Date().toISOString(),
      honeypot: value('site-web'),
    })
    setStatus(result.status === 'sent' ? 'sent' : 'failed')
  }

  return (
    <section className="band band--dark pilot" id="pilote">
      <div className="shell">
        <SectionHead
          n="11"
          label={copy.pilot.eyebrow}
          title={copy.pilot.title}
          lede={copy.pilot.lede}
          split
        />

        <div className="pilot__grid">
          <ol className="pilot__steps">
            {copy.pilot.steps.map((step, i) => (
              <li key={step.title} data-reveal style={{ '--i': i } as CSSProperties}>
                <span className="pilot__n mono num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="pilot__form-wrap" data-reveal>
            {status === 'sent' ? (
              <div className="pilot__done" role="status">
                <span className="pilot__check" aria-hidden="true" />
                <h3>{form.successTitle}</h3>
                <p>{form.successBody}</p>
              </div>
            ) : (
              <form className="pilot__form" onSubmit={onSubmit} noValidate>
                <h3 className="pilot__legend">{form.legend}</h3>

                {/* Champ piège : invisible et hors du parcours clavier, donc
                    seul un robot le remplit. Netlify écarte alors la
                    soumission (netlify-honeypot, voir index.html). */}
                <p className="hidden-visually" aria-hidden="true">
                  <label>
                    {'Ne pas remplir'}
                    <input type="text" name="site-web" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="f">
                  <label htmlFor="organisation">{form.organisation}</label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.organisation)}
                    aria-describedby={errors.organisation ? 'e-org' : undefined}
                  />
                  {errors.organisation && (
                    <p className="f__err" id="e-org">
                      {errors.organisation}
                    </p>
                  )}
                </div>

                <div className="f">
                  <label htmlFor="profile">{form.profile}</label>
                  <select id="profile" name="profile" defaultValue={form.profileOptions[0]}>
                    {form.profileOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="f-row">
                  <div className="f">
                    <label htmlFor="fullName">{form.fullName}</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'e-name' : undefined}
                    />
                    {errors.fullName && (
                      <p className="f__err" id="e-name">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="f">
                    <label htmlFor="role">
                      {form.role} <span className="f__opt">({form.optional})</span>
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      autoComplete="organization-title"
                    />
                  </div>
                </div>

                <div className="f-row">
                  <div className="f">
                    <label htmlFor="email">{form.email}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'e-mail' : undefined}
                    />
                    {errors.email && (
                      <p className="f__err" id="e-mail">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="f">
                    <label htmlFor="phone">
                      {form.phone} <span className="f__opt">({form.optional})</span>
                    </label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                </div>

                <div className="f">
                  <label htmlFor="topics">
                    {form.topics} <span className="f__opt">({form.optional})</span>
                  </label>
                  <textarea id="topics" name="topics" rows={3} aria-describedby="h-topics" />
                  <p className="f__hint" id="h-topics">
                    {form.topicsHint}
                  </p>
                </div>

                <div className="f">
                  <label className="consent" htmlFor="consent">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'e-consent' : undefined}
                    />
                    <span>{form.consent}</span>
                  </label>
                  {errors.consent && (
                    <p className="f__err" id="e-consent">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--solid pilot__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? form.submitting : form.submit}
                </button>

                {/* Mentions loi 09-08. La case de consentement l'invoque :
                    la page doit donc dire qui traite, pourquoi, combien de
                    temps, et comment s'y opposer. */}
                <div className="pilot__legal">
                  <h3 className="pilot__legal-title mono">{form.privacyTitle}</h3>
                  <p>{form.privacy}</p>
                  {CNDP_DECLARATION && (
                    <p className="pilot__cndp">
                      {form.privacyCndp}
                      <strong className="num">{CNDP_DECLARATION}</strong>
                    </p>
                  )}
                </div>

                <p className="pilot__status" role="status" aria-live="polite">
                  {status === 'failed' && (
                    <span className="pilot__err">
                      <strong>{form.errorTitle}</strong> {form.errorBody}{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                    </span>
                  )}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
