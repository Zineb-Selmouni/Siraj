import { useEffect, useRef, useState } from 'react'

/**
 * Signale l'entrée dans le viewport, une seule fois.
 *
 * Utilisé pour déclencher le flux de la console — jamais pour révéler du
 * contenu : la page reste entièrement lisible à l'arrêt, même si
 * l'observateur ne se déclenche jamais.
 *
 * Sans `IntersectionObserver`, l'état part directement à `true` : on le
 * décide à l'initialisation plutôt que dans l'effet, ce qui évite un
 * second rendu en cascade au montage.
 */
export function useInView<T extends HTMLElement>(rootMargin = '-15% 0px') {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
