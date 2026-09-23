/**
 * Le seul système de mouvement de la page.
 *
 * Tout élément portant `data-reveal` se résout à l'entrée dans le champ :
 * 14 px vers le haut, opacité, même courbe et même durée partout
 * (voir `global.css`). L'échelonnement se règle par la variable `--i`.
 *
 * Sécurités, dans cet ordre :
 *   1. le masquage n'existe que si `js-reveal` est posé sur <html> — donc
 *      sans JavaScript, rien n'est caché ;
 *   2. en mouvement réduit, la classe n'est jamais posée ;
 *   3. si l'observateur n'a rien révélé au bout de 2,5 s (onglet en
 *      arrière-plan au chargement, échec silencieux), tout est révélé
 *      d'office.
 *
 * Aucun contenu ne dépend donc de l'animation pour être lisible.
 */

const FALLBACK_MS = 2500

export function startReveal(): () => void {
  const root = document.documentElement

  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced || typeof IntersectionObserver === 'undefined') {
    return () => {}
  }

  root.classList.add('js-reveal')

  const revealAll = () => {
    root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  )

  const observeAll = () => {
    root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => observer.observe(el))
  }

  observeAll()

  // Le DOM bouge quand la langue change : on ré-observe ce qui est neuf.
  const mutations = new MutationObserver(observeAll)
  mutations.observe(document.body, { childList: true, subtree: true })

  const fallback = window.setTimeout(revealAll, FALLBACK_MS)

  return () => {
    window.clearTimeout(fallback)
    mutations.disconnect()
    observer.disconnect()
    root.classList.remove('js-reveal')
  }
}
