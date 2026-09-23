import type { CSSProperties } from 'react'
import { useCopy } from '../i18n'
import { SectionHead } from './SectionHead'
import './Comparison.css'

export function Comparison() {
  const copy = useCopy()
  const { columns, rows } = copy.comparison

  return (
    <section className="band band--dark comparison" id="positionnement">
      <div className="shell">
        <SectionHead
          n="07"
          label={copy.comparison.eyebrow}
          title={copy.comparison.title}
          lede={copy.comparison.closing}
          split
        />

        <div className="comparison__scroll" data-reveal>
          <table className="comparison__table">
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={c} scope="col" className={i === 3 ? 'is-us mono' : 'mono'}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={row[0]} style={{ '--i': r } as CSSProperties}>
                  <th scope="row" data-label={columns[0]}>
                    {row[0]}
                  </th>
                  <td data-label={columns[1]}>{row[1]}</td>
                  <td data-label={columns[2]}>{row[2]}</td>
                  <td className="is-us" data-label={columns[3]}>
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="comparison__source mono" data-reveal>
          {copy.comparison.source}
        </p>
      </div>
    </section>
  )
}
