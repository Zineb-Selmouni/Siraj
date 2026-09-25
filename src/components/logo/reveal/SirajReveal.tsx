import { useEffect, useMemo, useRef, useState } from 'react'
import { MOTION, CUES, AUTHORED_TOTAL, clamp, lerp } from './motion'
import './SirajReveal.css'

/**
 * Le film du logo, porté TEL QUEL depuis la livraison
 * (« Siraj logo refinement/Animation/SIRAJ_animation.html »).
 *
 * Le fichier livré est un artefact React + Babel de 3 Mo : moteur de
 * composition générique, panneau de réglages, React en UMD. Rien de cela
 * n'a sa place dans une page de production. Ce qui est repris, c'est la
 * SCÈNE — géométrie, couleurs, courbes, instants — à l'identique. Le
 * moteur est remplacé par une horloge de quelques lignes ; le panneau de
 * réglages est abandonné, ses valeurs par défaut figées (« Night »,
 * « Classic »), telles que la livraison les pose.
 *
 * Toute valeur numérique de ce fichier vient du film. Ne pas « améliorer »
 * un chiffre ici sans le changer aussi à la source : c'est la référence.
 */

const DARK = '#15171C'
const PAPER = '#FAF8F3'
const CH = '#2A2D33'
const SHADE = '#AEB4BC'
const LOGO_X = 380
const LOGO_Y = 70
const LANTERN: [number, number] = [330, 168]

const GW =
  'M140,522 C190,470 250,445 330,440 C420,435 470,462 540,470 C612,478 684,462 744,418 C694,482 612,502 540,502 C470,502 420,480 340,478 C262,476 192,492 140,522 Z'
const PW =
  'M118,550 C180,506 262,492 342,494 C432,496 482,514 550,518 C632,522 702,502 768,446 C722,514 642,540 550,538 C472,536 422,518 342,516 C252,514 182,526 118,550 Z'
const ARC = 'M332.5,337.5 A205,205 0 0 1 714.5,425.7'
const BARS: [number, number, number][] = [
  [452, 34, 352],
  [500, 34, 310],
  [548, 34, 262],
]
const BB = 462

type GlyphDef = { w: number; s: string[]; f: string[] }

const GLYPHS: Record<string, GlyphDef> = {
  S: { w: 124, s: ['M110,19 H52 A33,33 0 0 0 52,85 H72 A33,33 0 0 1 72,151 H14'], f: [] },
  I: { w: 38, s: ['M19,0 V170'], f: [] },
  R: {
    w: 132,
    s: ['M19,0 V170', 'M19,19 H70 A33,33 0 0 1 70,85 H19'],
    f: ['M58,85 L100,85 L132,170 L90,170 Z'],
  },
  A: { w: 154, s: [], f: ['M60,0 L94,0 L154,170 L114,170 L77,62 L40,170 L0,170 Z'] },
  J: { w: 89, s: ['M70,0 V110 A41,41 0 0 1 29,151 H2'], f: [] },
}

const ORDER = ['S', 'I', 'R', 'A', 'J']
const KERN = [0, 4, -10, -12]
const TRACK = 24
const WS = 1.15
const WTOP = 575

const POS = (() => {
  let x = 0
  const out = ORDER.map((c, i) => {
    const p = x
    x += GLYPHS[c].w + (i < 4 ? TRACK + KERN[i] : 0)
    return p
  })
  return out.concat([x])
})()

const WWIDTH = POS[5]
const WX = 600 - (WWIDTH * WS) / 2

const SUB = 'PLATEFORME DE VEILLE'
const TAG = 'ÉCLAIRER AUJOURD’HUI, ANTICIPER DEMAIN'
const SUB_Y = WTOP + 170 * WS + 66
const TAG_Y = SUB_Y + 56

/* ─── L'arabe ─────────────────────────────────────────────────────
   Le film arabe est le MÊME, à trois choses près : le mot-symbole est
   composé en Reem Kufi plutôt que tracé lettre à lettre, les deux
   lignes passent en Tajawal, et la composition se décale de (110, -40)
   — l'arabe est plus large et moins haut que SIRAJ, le centre optique
   n'est donc pas au même endroit.

   Le mot-symbole arabe est le seul endroit de la page où un
   mot-symbole est COMPOSÉ et non dessiné. C'est le choix du studio,
   pas le nôtre : la livraison le fait ainsi.
   ───────────────────────────────────────────────────────────────── */

const AR_WORD = 'سراج'
const AR_SUB = 'منصة الرصد واليقظة'
const AR_TAG = 'نُنير الحاضر، ونستشرف المستقبل'
const AR_CENTRE = 443
const AR_DX = 110
const AR_DY = -40

const PALETTES = {
  Classic: ['#F3D58A', '#D2A23F', '#9E6C1E'],
  Amber: ['#F6CF86', '#D8963A', '#A2601A'],
  Champagne: ['#EFE1B6', '#C8A866', '#8C7140'],
} as const

/**
 * Les encres du film.
 *
 * `paper` est la livraison telle quelle. `dark` existe parce que le film a
 * été composé pour FINIR SUR DU PAPIER : son mot-symbole est un charbon qui
 * tombe à 1,13:1 sur le bleu-nuit de la page, sa signature à 2,17:1. Quatre
 * valeurs, invisibles. Tout le reste passe sans retouche — la tour blanche
 * est à 18,4:1, la vague pâle à 11,9:1, et les ors étaient déjà justes.
 *
 * Les équivalents clairs sont ceux du signe fixe (`ON_DARK` dans
 * scripts/build-logo.mjs) : une seule marque, une seule dérivation. Comme
 * elle, ils restent à faire confirmer par le studio.
 */
const INK = {
  paper: {
    top: '#3C4047',
    mid: CH,
    bottom: '#1E2025',
    sub: CH,
    tag: '#4A4D53',
    arRelief: '#5A5E66',
  },
  dark: {
    top: '#EFECE5',
    mid: '#E4E0D7',
    bottom: '#D8D3C8',
    sub: '#E4E0D7',
    tag: '#B9B3A6',
    arRelief: '#9A9489',
  },
} as const

type Ink = (typeof INK)[keyof typeof INK]

/* Le film mesure son sous-titre au canvas pour centrer les deux filets d'or
   qui l'encadrent. La mesure dépend de la fonte : tant que Jost n'est pas
   chargée, elle porte sur la police de repli et les filets tombent à côté.
   D'où la re-mesure une fois `document.fonts` prête — le film, lui, tournait
   dans un contexte où la fonte était déjà présente. */
let _cv: HTMLCanvasElement | null = null

function textWidth(str: string, font: string, ls: number) {
  if (typeof document === 'undefined') return 0
  _cv = _cv || document.createElement('canvas')
  const c = _cv.getContext('2d')
  if (!c) return 0
  c.font = font
  return c.measureText(str).width + ls * (str.length - 1)
}

/**
 * Le mot arabe est composé, donc mesuré : sa boîte dépend de la fonte.
 * On le met à l'échelle pour qu'il tienne dans 600 × 230 unités (fois
 * WS), et on en déduit sa ligne de base — dont dépendent ensuite les
 * deux lignes de texte, placées SOUS lui.
 *
 * Les valeurs de repli (80 / 30) servent tant que Reem Kufi n'est pas
 * chargée : la mesure porte alors sur la police de substitution.
 */
function arMetrics() {
  if (typeof document === 'undefined') return null
  _cv = _cv || document.createElement('canvas')
  const c = _cv.getContext('2d')
  if (!c) return null
  c.font = '700 100px "Reem Kufi"'
  const mt = c.measureText(AR_WORD)
  const asc = mt.actualBoundingBoxAscent || 80
  const desc = mt.actualBoundingBoxDescent || 30
  const k = Math.min((600 * WS) / mt.width, (230 * WS) / (asc + desc))
  const w = mt.width * k
  const inkTop = WTOP - 6
  const base = inkTop + asc * k
  return { k, w, inkTop, base, bottom: base + desc * k, size: 100 * k }
}

type ArMetrics = NonNullable<ReturnType<typeof arMetrics>>

/**
 * Le point du ج, en or.
 *
 * C'est la signature de la marque : le triangle d'or dans le A latin, le
 * point d'or dans le jīm arabe. Mais le mot arabe est COMPOSÉ, pas
 * tracé — on ne peut donc pas viser un tracé nommé, il faut retrouver le
 * point dans le rendu.
 *
 * La livraison le fait en rastérisant le mot, puis en cherchant ses
 * composantes connexes : le corps du mot est la grande composante la
 * plus à gauche, le point est la petite composante isolée qui tombe
 * dans sa boîte. Les coordonnées sont rendues relatives au corps de la
 * fonte, donc valables à n'importe quelle échelle.
 *
 * Le résultat est mis en cache — mais seulement une fois Reem Kufi
 * réellement chargée, sans quoi on mémoriserait la position du point
 * dans la police de repli.
 */
type JeemDot = { cx: number; cy: number; r: number; top: number; bot: number }

let _jeem: JeemDot | null = null

function findJeemDot(): JeemDot | null {
  const W = 700
  const H = 320
  const F = 100
  const B = 200 // ligne de base

  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const c = cv.getContext('2d')
  if (!c) return null
  c.font = `700 ${F}px "Reem Kufi"`
  c.direction = 'rtl'
  c.textAlign = 'center'
  c.textBaseline = 'alphabetic'
  c.fillStyle = '#000'
  c.fillText(AR_WORD, W / 2, B)

  const d = c.getImageData(0, 0, W, H).data
  const lab = new Int32Array(W * H)
  const comps: { minx: number; maxx: number; miny: number; maxy: number; n: number }[] = []

  for (let i = 0; i < W * H; i++) {
    if (lab[i] || d[i * 4 + 3] < 128) continue
    const k = { minx: 1e9, maxx: -1, miny: 1e9, maxy: -1, n: 0 }
    const st = [i]
    lab[i] = comps.length + 1
    while (st.length) {
      const q = st.pop() as number
      const x = q % W
      const y = (q / W) | 0
      k.n++
      if (x < k.minx) k.minx = x
      if (x > k.maxx) k.maxx = x
      if (y < k.miny) k.miny = y
      if (y > k.maxy) k.maxy = y
      for (const nb of [q - 1, q + 1, q - W, q + W]) {
        if (nb < 0 || nb >= W * H) continue
        if (lab[nb] || d[nb * 4 + 3] < 128) continue
        if (Math.abs((nb % W) - x) > 1) continue // pas de saut de ligne
        lab[nb] = comps.length + 1
        st.push(nb)
      }
    }
    comps.push(k)
  }
  if (!comps.length) return null

  const body = comps.reduce(
    (a, b) => (b.n > 200 && b.minx < a.minx ? b : a),
    comps.find((k) => k.n > 200) || comps[0],
  )
  const dot = comps
    .filter((k) => k !== body && k.n > 20 && k.n < body.n * 0.2)
    .map((k) => ({ ...k, cx: (k.minx + k.maxx + 1) / 2, cy: (k.miny + k.maxy + 1) / 2 }))
    .filter(
      (k) =>
        k.cx > body.minx && k.cx < body.maxx && k.cy > body.miny - 5 && k.cy < body.maxy + 5,
    )
    .sort((a, b) => b.n - a.n)[0]
  if (!dot) return null

  return {
    cx: (dot.cx - W / 2) / F,
    cy: (dot.cy - B) / F,
    r: Math.max(dot.maxx - dot.minx + 1, dot.maxy - dot.miny + 1) / 2 / F,
    top: (dot.miny - B) / F,
    bot: (dot.maxy + 1 - B) / F,
  }
}

function jeemDot(): JeemDot | null {
  if (typeof document === 'undefined') return null
  const loaded = !document.fonts || document.fonts.check(`700 100px "Reem Kufi"`, AR_WORD)
  if (_jeem && loaded) return _jeem
  const found = findJeemDot()
  if (loaded) _jeem = found
  return found
}

function useFontsReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])
  return ready
}

/** L'horloge. Le film se lit UNE FOIS (`OM_PLAYBACK.count = 1`) puis se fige. */
function useFilmClock(play: boolean) {
  const [T, setT] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  }, [])

  useEffect(() => {
    if (!play) return
    if (reduced.current) {
      setT(AUTHORED_TOTAL)
      return
    }
    let raf = 0
    let t0 = 0
    const step = (now: number) => {
      if (!t0) t0 = now
      const t = (now - t0) / 1000
      setT(Math.min(t, AUTHORED_TOTAL))
      if (t < AUTHORED_TOTAL) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [play])

  return T
}

function Glyph({ c, fill }: { c: string; fill: string }) {
  const g = GLYPHS[c]
  return (
    <g>
      {g.s.map((d, i) => (
        <path key={'s' + i} d={d} fill="none" stroke={fill} strokeWidth="38" />
      ))}
      {g.f.map((d, i) => (
        <path key={'f' + i} d={d} fill={fill} />
      ))}
    </g>
  )
}

function Defs({ gold, ink }: { gold: readonly string[]; ink: Ink }) {
  const [gl, g, gd] = gold
  return (
    <defs>
      <linearGradient id="sr-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={gl} />
        <stop offset=".45" stopColor={g} />
        <stop offset=".85" stopColor={gd} />
        <stop offset="1" stopColor={g} />
      </linearGradient>
      <linearGradient id="sr-facet" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={g} />
        <stop offset=".3" stopColor={gl} />
        <stop offset=".6" stopColor={g} />
        <stop offset=".6" stopColor={gd} />
        <stop offset="1" stopColor={gd} />
      </linearGradient>
      <linearGradient id="sr-tower-front" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#E7E9EC" />
        <stop offset=".32" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#F1F2F4" />
      </linearGradient>
      <linearGradient id="sr-tower-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#D6D9DE" />
        <stop offset="1" stopColor={SHADE} />
      </linearGradient>
      <linearGradient id="sr-pale" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EEF0F2" />
        <stop offset=".35" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#CBD0D6" />
      </linearGradient>
      <linearGradient id="sr-char" x1="0" y1="0" x2="0" y2="170" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={ink.top} />
        <stop offset=".55" stopColor={ink.mid} />
        <stop offset="1" stopColor={ink.bottom} />
      </linearGradient>
      <linearGradient id="sr-beam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={gl} stopOpacity="1" />
        <stop offset=".45" stopColor={g} stopOpacity=".5" />
        <stop offset="1" stopColor={g} stopOpacity="0" />
      </linearGradient>
      <radialGradient id="sr-glass" cx=".42" cy=".45" r=".72">
        <stop offset="0" stopColor="#FFFDF4" />
        <stop offset=".6" stopColor="#FBEBC0" />
        <stop offset="1" stopColor={gl} />
      </radialGradient>
      <radialGradient id="sr-glow">
        <stop offset="0" stopColor="#FFF3CF" stopOpacity=".95" />
        <stop offset=".4" stopColor={gl} stopOpacity=".38" />
        <stop offset="1" stopColor={gl} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sr-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".7" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <clipPath id="sr-wave-clip">
        <path d={GW} />
      </clipPath>
    </defs>
  )
}

function Beam({ T }: { T: number }) {
  const sweep = MOTION.draw(T, CUES.Sweep - 0.1, 1.7)
  const angle = lerp(180, 344, sweep)
  const L = lerp(1500, 600, MOTION.draw(T, CUES.Sweep + 1.2, 1.4))
  const W = (150 * L) / 600
  const gap = (5 * L) / 600
  const on = MOTION.enter(T, CUES.Ignite + 0.6, 0.6)
  const settle = MOTION.draw(T, CUES.Sweep + 1.0, 1.4)
  const breathe = MOTION.enter(T, CUES.Hold, 0.8) * 0.05 * Math.sin((T - CUES.Hold) * 2.4)
  const op = on * (lerp(0.8, 0.42, settle) + breathe)
  const wedge = (sg: number, hw: number, gp: number) =>
    `M20,${sg * 8} L${L},${sg * hw} L${L},${(sg * gp) / 2} L20,${sg * 0.6} Z`

  return (
    <g transform={`translate(${LANTERN[0]} ${LANTERN[1]}) rotate(${angle})`} opacity={op}>
      <path d={wedge(-1, W * 0.68, gap * 2.4)} fill="url(#sr-beam)" opacity=".3" />
      <path d={wedge(1, W * 0.68, gap * 2.4)} fill="url(#sr-beam)" opacity=".3" />
      <path d={wedge(-1, W / 2, gap)} fill="url(#sr-beam)" />
      <path d={wedge(1, W / 2, gap)} fill="url(#sr-beam)" />
    </g>
  )
}

function Lighthouse({ T, gold }: { T: number; gold: readonly string[] }) {
  const [gl, , gd] = gold
  const ember = MOTION.enter(T, 0.2, 1.0)
  const flare = MOTION.enter(T, CUES.Ignite, 0.5)
  const settle = MOTION.draw(T, CUES.Ignite + 0.5, 1.8)
  const glowR = 22 + ember * 18 + flare * 95 - settle * 45
  const glowOp = clamp(ember * 0.55 + flare * 0.6 - settle * 0.45, 0, 1)
  const reveal = MOTION.draw(T, CUES.Ignite + 0.15, 1.1)
  const lanternOp = clamp(flare * 1.5, 0, 1)

  return (
    <g>
      <circle cx={LANTERN[0]} cy={LANTERN[1]} r={glowR} fill="url(#sr-glow)" opacity={glowOp} />
      <g opacity={lanternOp}>
        <path d="M302,146 Q305,125 330,116 Q355,125 358,146 Z" fill="url(#sr-facet)" />
        <path
          d="M307,142 Q310,127 327,119.5"
          fill="none"
          stroke="#FFF6DC"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity=".8"
        />
        <path d="M330,116 V107" stroke={gd} strokeWidth="2" />
        <circle cx="330" cy="105" r="3.6" fill="url(#sr-gold)" />
        <rect x="303" y="145" width="54" height="6" rx="1.5" fill="url(#sr-facet)" />
        <rect x="309" y="151" width="42" height="35" fill="url(#sr-glass)" />
        <rect x="338" y="151" width="13" height="35" fill={gd} opacity=".14" />
        <path d="M313,154 L316.5,154 L314,183 L311.5,183 Z" fill="#FFFFFF" opacity=".8" />
        <rect x="306.5" y="151" width="4" height="35" fill={gl} />
        <rect x="349.5" y="151" width="4" height="35" fill={gd} />
        <path d="M323,151 V186 M338,151 V186" stroke={gd} strokeWidth="1.6" />
      </g>
      <clipPath id="sr-tower-clip">
        <rect x="260" y="170" width="140" height={lerp(0, 300, reveal)} />
      </clipPath>
      <g clipPath="url(#sr-tower-clip)">
        <path
          d="M301,199 L339,199 Q340,370 345,450 L279,450 Q297,370 301,199 Z"
          fill="url(#sr-tower-front)"
        />
        <path
          d="M339,199 L359,199 Q363,370 381,450 L345,450 Q340,370 339,199 Z"
          fill="url(#sr-tower-side)"
        />
        <path d="M279,450 Q297,370 301,199" fill="none" stroke="#D5D9DE" strokeWidth="1" />
        <path
          d="M359,199 Q363,370 381,450"
          fill="none"
          stroke="url(#sr-gold)"
          strokeWidth="3.2"
        />
        <path d="M301,199 L359,199 L359.6,208 L300.5,208 Z" fill={SHADE} opacity=".35" />
        <rect x="314.5" y="252" width="9" height="20" rx="4.5" fill="#6C7079" />
        <rect x="313.5" y="332" width="10" height="22" rx="5" fill="#6C7079" />
        <rect x="290" y="186" width="80" height="13" rx="2" fill="url(#sr-facet)" />
        <path
          d="M293,176 H367 M293,176 V186 M367,176 V186"
          stroke={gd}
          strokeWidth="2"
          fill="none"
        />
      </g>
    </g>
  )
}

function SymbolArt({ T, gold }: { T: number; gold: readonly string[] }) {
  const [, , gd] = gold
  const arc = MOTION.draw(T, CUES.Build + 0.8, 1.1)
  const wave = MOTION.draw(T, CUES.Build, 1.1)
  const pale = MOTION.draw(T, CUES.Build + 0.2, 1.1)
  const sheen = MOTION.draw(T, CUES.Hold + 0.2, 1.4)

  return (
    <g>
      <path
        d={ARC}
        fill="none"
        stroke="url(#sr-gold)"
        strokeWidth="4.5"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray={`${arc} 1`}
        opacity={arc > 0.002 ? 1 : 0}
      />
      <Lighthouse T={T} gold={gold} />
      {BARS.map(([x, w, t], i) => {
        const b = MOTION.pop(T, CUES.Build + 0.45 + i * 0.16, 0.7)
        return (
          <g
            key={i}
            transform={`translate(0 ${BB}) scale(1 ${Math.max(b, 0.0001)}) translate(0 ${-BB})`}
            opacity={clamp(b * 3, 0, 1)}
          >
            <path
              d={`M${x + w - 3},${t + 1} L${x + w + 4},${t + 6} L${x + w + 4},${BB} L${x + w - 3},${BB} Z`}
              fill={gd}
            />
            <rect x={x} y={t} width={w} height={BB - t} rx="4" fill="url(#sr-gold)" />
            <rect
              x={x + 4}
              y={t + 4}
              width="3"
              height={BB - t - 10}
              rx="1.5"
              fill="#FFF3D2"
              opacity=".45"
            />
          </g>
        )
      })}
      <clipPath id="sr-pale-reveal">
        <rect x="130" y="400" width={lerp(0, 780, pale)} height="160" />
      </clipPath>
      <g clipPath="url(#sr-pale-reveal)" transform={`translate(${lerp(-24, 0, pale)} 0)`}>
        <path d={PW} transform="translate(3 5)" fill="#C3C8CF" />
        <path d={PW} fill="url(#sr-pale)" />
      </g>
      <clipPath id="sr-gold-reveal">
        <rect x="100" y="370" width={lerp(0, 760, wave)} height="140" />
      </clipPath>
      <g clipPath="url(#sr-gold-reveal)" transform={`translate(${lerp(-30, 0, wave)} 0)`}>
        <path d={GW} transform="translate(4 6)" fill={gd} opacity=".85" />
        <path d={GW} fill="url(#sr-gold)" />
        <g clipPath="url(#sr-wave-clip)">
          <path
            d="M140,522 C190,470 250,445 330,440 C420,435 470,462 540,470 C612,478 684,462 744,418"
            transform="translate(0 2.6)"
            fill="none"
            stroke="#FFF3D2"
            strokeWidth="2.4"
            opacity=".7"
          />
          <rect
            x={lerp(40, 860, sheen)}
            y="380"
            width="160"
            height="140"
            fill="url(#sr-sheen)"
            opacity={sheen > 0 && sheen < 1 ? 1 : 0}
          />
        </g>
      </g>
    </g>
  )
}

function Wordmark({ T, gold }: { T: number; gold: readonly string[] }) {
  const [, , gd] = gold
  const tri = MOTION.pop(T, CUES.Name + 0.95, 0.6)

  return (
    <g transform={`translate(${WX} ${WTOP}) scale(${WS})`}>
      {ORDER.map((c, i) => {
        const l = MOTION.enter(T, CUES.Name + i * 0.13, 0.75)
        return (
          <g key={c} transform={`translate(${POS[i]} ${lerp(46, 0, l)})`} opacity={l}>
            <g transform="translate(2.4 3.6)" opacity=".12">
              <Glyph c={c} fill="#000000" />
            </g>
            <Glyph c={c} fill="url(#sr-char)" />
            {c === 'A' && (
              <g
                transform={`translate(0 ${lerp(-110, 0, tri)})`}
                opacity={clamp(tri * 4, 0, 1)}
              >
                <path d="M77,112 L57,170 L97,170 Z" transform="translate(2.5 3.5)" fill={gd} />
                <path d="M77,112 L57,170 L97,170 Z" fill="url(#sr-gold)" />
                <path
                  d="M76.5,116 L60,165"
                  stroke="#FFF3D2"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity=".8"
                />
              </g>
            )}
          </g>
        )
      })}
    </g>
  )
}

/**
 * Le mot-symbole arabe.
 *
 * Il n'a pas de lettres séparées — l'arabe est une écriture liée — donc
 * pas de montée lettre à lettre comme en latin. La livraison lui donne
 * autre chose : un volet qui le découvre de DROITE À GAUCHE, dans le
 * sens de lecture, pendant qu'il monte. Trois calques composent le
 * relief : une ombre portée, un ton intermédiaire décalé, puis l'encre.
 */
function ArWordmark({
  T,
  gold,
  ink,
  m,
}: {
  T: number
  gold: readonly string[]
  ink: Ink
  m: ArMetrics
}) {
  const x0 = AR_CENTRE - m.w / 2
  const wipe = MOTION.draw(T, CUES.Name, 1.3)
  const rise = MOTION.enter(T, CUES.Name, 1.1)
  const jd = jeemDot()

  const layer = (fill: string, dx: number, dy: number, op: number) => (
    <text
      x={AR_CENTRE + dx}
      y={m.base + dy}
      textAnchor="middle"
      direction="rtl"
      fontFamily="'Reem Kufi', Tajawal, sans-serif"
      fontWeight="700"
      fontSize={m.size}
      fill={fill}
      opacity={op}
    >
      {AR_WORD}
    </text>
  )

  return (
    <g>
      <defs>
        <linearGradient
          id="sr-char-ar"
          x1="0"
          y1={m.inkTop}
          x2="0"
          y2={m.bottom}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={ink.top} />
          <stop offset=".55" stopColor={ink.mid} />
          <stop offset="1" stopColor={ink.bottom} />
        </linearGradient>
        <clipPath id="sr-ar-wipe">
          <rect
            x={lerp(x0 + m.w + 40, x0 - 60, wipe)}
            y={WTOP - 80}
            width={m.w + 160}
            height="500"
          />
        </clipPath>
        {jd && (
          <clipPath id="sr-jeem-dot">
            <circle
              cx={AR_CENTRE + jd.cx * m.size}
              cy={m.base + jd.cy * m.size}
              r={(jd.r + 0.018) * m.size}
            />
          </clipPath>
        )}
        {jd && (
          <linearGradient
            id="sr-jeem-gold"
            x1="0"
            y1={m.base + jd.top * m.size}
            x2="0"
            y2={m.base + jd.bot * m.size}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={gold[0]} />
            <stop offset=".5" stopColor={gold[1]} />
            <stop offset="1" stopColor={gold[2]} />
          </linearGradient>
        )}
      </defs>
      <g
        clipPath="url(#sr-ar-wipe)"
        transform={`translate(0 ${lerp(30, 0, rise)})`}
        opacity={rise}
      >
        {layer('#000000', 3, 4.5, 0.14)}
        {layer(ink.arRelief, -1.2, -1.2, 1)}
        {layer('url(#sr-char-ar)', 0, 0, 1)}
        {/* Le point du ج, repassé en or : la signature de la marque,
            comme le triangle dans le A latin. */}
        {jd && (
          <g clipPath="url(#sr-jeem-dot)">
            {layer(gold[0], -1.2, -1.2, 1)}
            {layer('url(#sr-jeem-gold)', 0, 0, 1)}
          </g>
        )}
      </g>
    </g>
  )
}

function Lines({
  T,
  gold,
  ink,
  fontsReady,
  ar,
}: {
  T: number
  gold: readonly string[]
  ink: Ink
  fontsReady: boolean
  /** Métriques du mot arabe, ou `null` en latin. */
  ar: ArMetrics | null
}) {
  const lp = MOTION.draw(T, CUES.Tagline, 0.9)
  const sp = MOTION.enter(T, CUES.Tagline + 0.15, 1.1)
  const tg = MOTION.enter(T, CUES.Tagline + 0.6, 1.0)

  /* Les deux lignes suivent le mot-symbole : en arabe elles se placent
     sous SA base mesurée, pas sous une constante. */
  const ls = ar ? 0 : lerp(22, 9, sp)
  const sub = ar ? AR_SUB : SUB
  const tag = ar ? AR_TAG : TAG
  const sfs = ar ? 36 : 29
  const tfs = ar ? 27 : 20
  const subY = ar ? ar.bottom + 54 : SUB_Y
  const tagY = ar ? ar.bottom + 116 : TAG_Y
  const ff = ar ? 'Tajawal, sans-serif' : 'Jost, Futura, sans-serif'
  const centre = ar ? AR_CENTRE : 600

  const sw = useMemo(() => {
    void fontsReady // re-mesurer dès que la fonte est là : la mesure en dépend
    return ar ? textWidth(AR_SUB, '700 36px Tajawal', 0) : textWidth(SUB, '600 29px Jost', 9)
  }, [fontsReady, ar])
  const ly = subY - sfs * (ar ? 0.3 : 0.36) - 1.5
  const gap = 22
  const ll = 58

  return (
    <g>
      <rect
        x={centre - sw / 2 - gap - ll * lp}
        y={ly}
        width={ll * lp}
        height="3"
        rx="1.5"
        fill={gold[1]}
      />
      <rect
        x={centre + sw / 2 + gap}
        y={ly}
        width={ll * lp}
        height="3"
        rx="1.5"
        fill={gold[1]}
      />
      <text
        x={centre + ls / 2}
        y={subY}
        textAnchor="middle"
        direction={ar ? 'rtl' : 'ltr'}
        fontFamily={ff}
        fontWeight={ar ? 700 : 600}
        fontSize={sfs}
        letterSpacing={ls}
        fill={ink.sub}
        opacity={sp}
      >
        {sub}
      </text>
      <text
        x={ar ? centre : 603.5}
        y={tagY + lerp(14, 0, tg)}
        textAnchor="middle"
        direction={ar ? 'rtl' : 'ltr'}
        fontFamily={ff}
        fontWeight="500"
        fontSize={tfs}
        letterSpacing={ar ? 0 : 7}
        fill={ink.tag}
        opacity={tg}
      >
        {tag}
      </text>
    </g>
  )
}

/**
 * `surface` décide de ce que le film pose DERRIÈRE lui.
 *
 * `paper` — la livraison : un fond plein cadre, nuit puis papier, avec le
 * flot qui envahit l'image pendant le balayage.
 *
 * `dark` — le film devient transparent. Le fond et le flot disparaissent,
 * parce que la page les reprend à son compte : le flot n'est plus un
 * remplissage d'image mais l'éclairage de toute la section (voir
 * Hero.css). Le repère Sweep dit « floods the frame with light » — le
 * cadre, désormais, c'est le hero.
 */
export function SirajReveal({
  play = true,
  intro = 'Night',
  gold = 'Classic',
  surface = 'paper',
  script = 'latin',
  className,
  title,
}: {
  play?: boolean
  intro?: 'Night' | 'Light'
  gold?: keyof typeof PALETTES
  surface?: keyof typeof INK
  /** L'écriture du mot-symbole. Le reste du film est identique. */
  script?: 'latin' | 'arabic'
  className?: string
  title?: string
}) {
  const T = useFilmClock(play)
  const fontsReady = useFontsReady()
  const palette = PALETTES[gold]
  const ink = INK[surface]
  const onPaper = surface === 'paper'
  const night = intro === 'Night'

  /* Mesuré à chaque fois que la fonte bouge : la boîte du mot arabe
     dépend de Reem Kufi, et toute la composition en dépend ensuite. */
  const ar = useMemo(() => {
    void fontsReady
    return script === 'arabic' ? arMetrics() : null
  }, [fontsReady, script])

  /* L'arabe est plus large et moins haut que SIRAJ : son centre optique
     n'est pas au même endroit, d'où le décalage de la composition. */
  const ox = ar ? LOGO_X + AR_DX : LOGO_X
  const oy = ar ? LOGO_Y + AR_DY : LOGO_Y

  const cam = lerp(1.08, 1.0, MOTION.draw(T, 0, AUTHORED_TOTAL))
  const lx = 960 + (ox + LANTERN[0] - 960) * cam
  const ly = 540 + (oy + LANTERN[1] - 540) * cam
  const flood = night ? MOTION.draw(T, CUES.Sweep + 0.35, 1.5) : 1

  return (
    <svg
      className={['sr', className].filter(Boolean).join(' ')}
      viewBox="0 0 1920 1080"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Defs gold={palette} ink={ink} />
      {onPaper && <rect width="1920" height="1080" fill={night ? DARK : PAPER} />}
      {onPaper && night && <circle cx={lx} cy={ly} r={flood * 2400} fill={PAPER} />}
      <g
        transform={`translate(960 540) scale(${cam}) translate(-960 -540) translate(${ox} ${oy})`}
      >
        <Beam T={T} />
        <SymbolArt T={T} gold={palette} />
        {ar ? (
          <ArWordmark T={T} gold={palette} ink={ink} m={ar} />
        ) : (
          <Wordmark T={T} gold={palette} />
        )}
        <Lines T={T} gold={palette} ink={ink} fontsReady={fontsReady} ar={ar} />
      </g>
    </svg>
  )
}
