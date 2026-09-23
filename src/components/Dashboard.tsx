import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import type { Tone } from '../i18n/types'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Dashboard.css'

/**
 * La console de veille — la démonstration du produit.
 *
 * Une liste bordée n'est pas un tableau de bord : elle montre des lignes,
 * pas un état. Cette console montre un état — indicateurs, courbe de
 * volume, répartition par langue, flux — et les régions se répondent :
 * quand une mention arrive, le décompte monte, la dernière barre de la
 * courbe grandit, la jauge de sentiment se recalcule.
 *
 * C'est le seul endroit de la page qui bouge en continu. Son mouvement
 * porte du sens : il y a du trafic.
 *
 * Les chiffres sont illustratifs et le disent (mention en pied de console).
 */

// Le bloc arabe se compose en RTL. La plage est construite depuis une
// CHAÎNE : écrite en littéral de regex, Prettier remplace les échappements
// par les caractères eux-mêmes — dont U+0600, qui est invisible à l'écran.
const ARABIC = new RegExp('[\u0600-\u06FF]')
const TONES: Record<string, Tone> = {
  positive: 'positive',
  neutral: 'neutral',
  negative: 'negative',
}

/** Mentions tenues à l'écran. */
const WINDOW = 4
const TICK_MS = 2800

/** Volume horaire sur 24 h : creux nocturne, montée matinale, pic du soir. */
const BASE_SERIES = [
  12, 8, 6, 5, 4, 7, 14, 28, 46, 58, 64, 71, 68, 59, 63, 77, 86, 94, 88, 72, 58, 41, 27, 18,
]

/** Incréments cyclés plutôt que tirés au sort : le rendu reste déterministe. */
const BUMPS = [3, 5, 2, 6, 4, 3, 7, 2, 5, 4]

/** Part de chaque langue dans le flux, en pourcentage. */
const LANG_MIX = [41, 27, 24, 8]

type Slot = { seq: number; idx: number }

const initialSlots: Slot[] = Array.from({ length: WINDOW }, (_, i) => ({
  seq: WINDOW - 1 - i,
  idx: i,
}))

export function Dashboard() {
  const copy = useCopy()
  const d = copy.workspace.dash
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>('0px')

  const pool = copy.darija.samples
  const [range, setRange] = useState(0)

  // On ne stocke que des index : changer de langue retraduit le flux en
  // place, sans le réinitialiser ni perdre le décompte.
  const [slots, setSlots] = useState<Slot[]>(initialSlots)
  const [count, setCount] = useState(WINDOW)
  const [series, setSeries] = useState<number[]>(BASE_SERIES)
  const [tally, setTally] = useState(() => countTones(pool.slice(0, WINDOW)))

  const seqRef = useRef(WINDOW - 1)
  const idxRef = useRef(WINDOW - 1)
  const tickRef = useRef(0)

  const push = useCallback(() => {
    const idx = (idxRef.current + 1) % pool.length
    idxRef.current = idx
    seqRef.current += 1
    tickRef.current += 1

    setSlots((current) => [{ seq: seqRef.current, idx }, ...current].slice(0, WINDOW))
    setCount((n) => n + 1)
    setTally((current) => {
      const tone = TONES[pool[idx].tone] ?? 'neutral'
      return { ...current, [tone]: current[tone] + 1 }
    })

    // La dernière barre grandit à chaque mention ; toutes les six, l'heure
    // bascule : la série glisse et une nouvelle barre démarre bas.
    setSeries((current) => {
      const next = current.slice()
      if (tickRef.current % 6 === 0) {
        next.shift()
        next.push(10)
      } else {
        const bump = BUMPS[tickRef.current % BUMPS.length]
        next[next.length - 1] = Math.min(100, next[next.length - 1] + bump)
      }
      return next
    })
  }, [pool])

  const running = inView && !reduced

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(push, TICK_MS)
    return () => window.clearInterval(timer)
  }, [running, push])

  const peak = Math.max(...series)
  const peakAt = series.indexOf(peak)
  const total = Math.max(1, tally.positive + tally.neutral + tally.negative)
  const pct = (n: number) => Math.round((n / total) * 100)

  return (
    <div className="dash" ref={ref} data-reveal>
      {/* ─── Barre d'application ─────────────────────────────── */}
      <div className="dash__bar">
        <span className="dash__app mono">
          <span className="dash__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {d.app}
        </span>

        <div className="dash__tools">
          <div className="seg" role="group" aria-label={d.volumeUnit}>
            {d.ranges.map((r, i) => (
              <button
                key={r}
                type="button"
                className={`seg__b mono${i === range ? ' is-on' : ''}`}
                aria-pressed={i === range}
                onClick={() => setRange(i)}
              >
                {r}
              </button>
            ))}
          </div>
          <span className={`dash__live mono${running ? ' is-live' : ''}`}>
            <span className="dash__pulse" aria-hidden="true" />
            {running ? d.live : d.paused}
          </span>
        </div>
      </div>

      {/* ─── Indicateurs ─────────────────────────────────────── */}
      <dl className="kpis">
        {d.kpis.map((k) => (
          <div key={k.label} className="kpi">
            <dt className="kpi__label mono">{k.label}</dt>
            <dd>
              <span className="kpi__value num">{k.value}</span>
              {k.delta && (
                <span className={`kpi__delta mono num is-${k.trend}`}>
                  <span aria-hidden="true">
                    {k.trend === 'up' ? '▲' : k.trend === 'down' ? '▼' : '—'}
                  </span>
                  {k.delta}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* ─── Courbe de volume ────────────────────────────────── */}
      <section className="chart">
        <header className="chart__head">
          <h4 className="chart__title mono">{d.volume}</h4>
          <p className="chart__unit mono">{d.volumeUnit}</p>
        </header>

        <div className="chart__plot">
          <span className="chart__peak mono num" style={{ '--at': peakAt } as CSSProperties}>
            {d.peak} {peak}
          </span>
          <ol className="chart__bars">
            {series.map((v, i) => (
              <li
                key={i}
                className={`bar${i === peakAt ? ' is-peak' : ''}${i === series.length - 1 ? ' is-now' : ''}`}
                style={{ '--h': `${Math.round((v / peak) * 100)}%` } as CSSProperties}
              >
                <span className="hidden-visually">{v}</span>
              </li>
            ))}
          </ol>
          <ol className="chart__axis mono num" aria-hidden="true">
            <li>00</li>
            <li>06</li>
            <li>12</li>
            <li>18</li>
            <li>24</li>
          </ol>
        </div>
      </section>

      {/* ─── Langues et flux ─────────────────────────────────── */}
      <div className="dash__split">
        <section className="langs">
          <h4 className="panel__title mono">{d.langsTitle}</h4>
          <ol className="langs__list">
            {d.langs.map((name, i) => (
              <li key={name}>
                <span className="langs__name">{name}</span>
                <span className="langs__track" aria-hidden="true">
                  <span className="langs__fill" style={{ width: `${LANG_MIX[i]}%` }} />
                </span>
                <span className="langs__pct mono num">{LANG_MIX[i]}%</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="feed">
          <h4 className="panel__title mono">{d.feedTitle}</h4>
          <ol className="feed__list">
            {slots.map(({ seq, idx }) => {
              const s = pool[idx]
              const tone = TONES[s.tone] ?? 'neutral'
              const rtl = ARABIC.test(s.text)

              return (
                <li key={seq} className="row" data-tone={tone}>
                  <span className="row__tone" aria-hidden="true" />
                  <div className="row__main">
                    <p className="row__meta">
                      <span className="row__src">{s.source}</span>
                      <span className="row__time mono num">{s.time}</span>
                    </p>
                    <p
                      className={`row__text${rtl ? ' row__text--rtl' : ''}`}
                      dir={rtl ? 'rtl' : 'ltr'}
                      lang={rtl ? 'ar' : undefined}
                    >
                      {s.text}
                    </p>
                    <p className="row__tags">
                      <span className="row__lang mono">{s.language}</span>
                      <span className="row__topic">{s.topic}</span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>

      {/* ─── Pied : sentiment, décompte, mention ─────────────── */}
      <div className="dash__foot">
        <div className="sent">
          <span className="sent__label mono">{d.sentiment}</span>
          <span
            className="sent__bar"
            role="img"
            aria-label={`${d.sentiment} — ${pct(tally.positive)}% / ${pct(tally.neutral)}% / ${pct(tally.negative)}%`}
          >
            <span style={{ flexGrow: tally.positive }} data-tone="positive" />
            <span style={{ flexGrow: tally.neutral }} data-tone="neutral" />
            <span style={{ flexGrow: tally.negative }} data-tone="negative" />
          </span>
          <span className="sent__keys mono num" aria-hidden="true">
            <b data-tone="positive">{pct(tally.positive)}</b>
            <b data-tone="neutral">{pct(tally.neutral)}</b>
            <b data-tone="negative">{pct(tally.negative)}</b>
          </span>
        </div>

        <p className="dash__count mono">
          <strong className="num">{count}</strong> {copy.darija.feed.analysed}
        </p>
      </div>

      <p className="dash__note">{d.note}</p>
    </div>
  )
}

function countTones(samples: ReadonlyArray<{ tone: string }>) {
  return samples.reduce(
    (acc, s) => {
      const tone = TONES[s.tone] ?? 'neutral'
      acc[tone] += 1
      return acc
    },
    { positive: 0, neutral: 0, negative: 0 } as Record<Tone, number>,
  )
}
