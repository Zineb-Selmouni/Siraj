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
  paper: { top: '#3C4047', mid: CH, bottom: '#1E2025', sub: CH, tag: '#4A4D53' },
  dark: { top: '#EFECE5', mid: '#E4E0D7', bottom: '#D8D3C8', sub: '#E4E0D7', tag: '#B9B3A6' },
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

function Lines({
  T,
  gold,
  ink,
  fontsReady,
}: {
  T: number
  gold: readonly string[]
  ink: Ink
  fontsReady: boolean
}) {
  const lp = MOTION.draw(T, CUES.Tagline, 0.9)
  const sp = MOTION.enter(T, CUES.Tagline + 0.15, 1.1)
  const tg = MOTION.enter(T, CUES.Tagline + 0.6, 1.0)
  const ls = lerp(22, 9, sp)
  const sw = useMemo(() => {
    void fontsReady // re-mesurer dès que Jost est là : la mesure en dépend
    return textWidth(SUB, '600 29px Jost', 9)
  }, [fontsReady])
  const ly = SUB_Y - 29 * 0.36 - 1.5
  const gap = 22
  const ll = 58

  return (
    <g>
      <rect
        x={600 - sw / 2 - gap - ll * lp}
        y={ly}
        width={ll * lp}
        height="3"
        rx="1.5"
        fill={gold[1]}
      />
      <rect x={600 + sw / 2 + gap} y={ly} width={ll * lp} height="3" rx="1.5" fill={gold[1]} />
      <text
        x={600 + ls / 2}
        y={SUB_Y}
        textAnchor="middle"
        fontFamily="Jost, Futura, sans-serif"
        fontWeight="600"
        fontSize="29"
        letterSpacing={ls}
        fill={ink.sub}
        opacity={sp}
      >
        {SUB}
      </text>
      <text
        x={603.5}
        y={TAG_Y + lerp(14, 0, tg)}
        textAnchor="middle"
        fontFamily="Jost, Futura, sans-serif"
        fontWeight="500"
        fontSize="20"
        letterSpacing="7"
        fill={ink.tag}
        opacity={tg}
      >
        {TAG}
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
  className,
  title,
}: {
  play?: boolean
  intro?: 'Night' | 'Light'
  gold?: keyof typeof PALETTES
  surface?: keyof typeof INK
  className?: string
  title?: string
}) {
  const T = useFilmClock(play)
  const fontsReady = useFontsReady()
  const palette = PALETTES[gold]
  const ink = INK[surface]
  const onPaper = surface === 'paper'
  const night = intro === 'Night'

  const cam = lerp(1.08, 1.0, MOTION.draw(T, 0, AUTHORED_TOTAL))
  const lx = 960 + (LOGO_X + LANTERN[0] - 960) * cam
  const ly = 540 + (LOGO_Y + LANTERN[1] - 540) * cam
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
        transform={`translate(960 540) scale(${cam}) translate(-960 -540) translate(${LOGO_X} ${LOGO_Y})`}
      >
        <Beam T={T} />
        <SymbolArt T={T} gold={palette} />
        <Wordmark T={T} gold={palette} />
        <Lines T={T} gold={palette} ink={ink} fontsReady={fontsReady} />
      </g>
    </svg>
  )
}
