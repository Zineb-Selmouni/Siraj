import { useEffect } from 'react'
import { useCopy } from './i18n'
import { startReveal } from './lib/reveal'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Stakes } from './components/Stakes'
import { Pipeline } from './components/Pipeline'
import { Workspace } from './components/Workspace'
import { Darija } from './components/Darija'
import { Proof } from './components/Proof'
import { UseCases } from './components/UseCases'
import { Comparison } from './components/Comparison'
import { Sovereignty } from './components/Sovereignty'
import { Offers } from './components/Offers'
import { Pilot } from './components/Pilot'
import { Footer } from './components/Footer'

/**
 * L'ordre suit l'argumentaire validé du deck commercial, et la numérotation
 * des sections le rend lisible : contexte, solution, poste de travail,
 * différenciateur, preuve, usages, positionnement, engagements, offre,
 * passage à l'acte.
 *
 * Le rythme des fonds alterne papier / papier creusé / bleu-nuit. Les quatre
 * bandes sombres tombent sur les quatre moments qui portent : l'ouverture,
 * le différenciateur, le positionnement et le passage à l'acte.
 */
export default function App() {
  const copy = useCopy()

  useEffect(() => startReveal(), [])

  return (
    <>
      <a className="skip" href="#contenu">
        {copy.nav.skip}
      </a>

      <Header />

      <main id="contenu">
        <Hero />
        <Stakes />
        <Pipeline />
        <Workspace />
        <Darija />
        <Proof />
        <UseCases />
        <Comparison />
        <Sovereignty />
        <Offers />
        <Pilot />
      </main>

      <Footer />
    </>
  )
}
