import { useEffect, useState } from 'react'

/**
 * Respecte « prefers-reduced-motion ». Toute animation pilotée en JS
 * (compteurs, flux de mentions, parallaxe) passe par ce hook : le CSS a
 * sa propre garde dans global.css.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}
