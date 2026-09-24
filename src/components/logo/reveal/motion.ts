/**
 * Primitives de mouvement du film livré.
 *
 * Reprises TELLES QUELLES de « Siraj logo refinement/Animation » — moteur
 * `animations-v3` pour les courbes, `OM_SCENES` pour la table des repères.
 * Rien n'est réinterprété ici : toute valeur de ce fichier vient de la
 * livraison, et toute modification fait diverger la page du film.
 */

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const easeOutCubic = (t: number) => --t * t * t + 1
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
const easeOutBack = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

/** `a` = instant de départ, `d` = durée. Hors de [a, a+d], la valeur est bornée. */
export const MOTION = {
  enter: (T: number, a: number, d: number) => easeOutCubic(clamp((T - a) / d, 0, 1)),
  draw: (T: number, a: number, d: number) => easeInOutCubic(clamp((T - a) / d, 0, 1)),
  pop: (T: number, a: number, d: number) => easeOutBack(clamp((T - a) / d, 0, 1)),
}

/**
 * La table des repères, dans l'ordre et avec les durées de `OM_SCENES`.
 * Les descriptions sont celles de la livraison — elles disent ce que
 * chaque repère est censé montrer, et servent de test de lecture.
 */
export const SCENES = [
  { name: 'Dark', dur: 1.2, desc: 'A single ember glows in the dark' },
  {
    name: 'Ignite',
    dur: 1.3,
    desc: 'The lantern flares and the tower is lit from the top down',
  },
  { name: 'Sweep', dur: 1.8, desc: 'The beam sweeps over and floods the frame with light' },
  { name: 'Build', dur: 2.0, desc: 'Waves flow in, the bars rise and the arc draws' },
  {
    name: 'Name',
    dur: 1.8,
    desc: 'SIRAJ rises letter by letter and the gold triangle drops into the A',
  },
  { name: 'Tagline', dur: 1.6, desc: 'Gold rules extend; subtitle and tagline settle' },
  { name: 'Hold', dur: 2.4, desc: 'A glint crosses the gold wave while the beam breathes' },
] as const

export type CueName = (typeof SCENES)[number]['name']

export const CUES = (() => {
  const out = {} as Record<CueName, number>
  let t = 0
  for (const s of SCENES) {
    out[s.name] = t
    t += s.dur
  }
  return out
})()

/** 12,1 s. `cam` s'étale sur toute cette durée — d'où sa présence ici. */
export const AUTHORED_TOTAL = SCENES.reduce((n, s) => n + s.dur, 0)
