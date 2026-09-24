/**
 * Génère src/components/logo/marks.ts à partir des SVG livrés.
 *
 * Source : « Siraj logo refinement/SVG/ » — livraison de design, hors dépôt
 * comme la charte. Le fichier généré, lui, est versionné : le build ne doit
 * pas dépendre d'un dossier de livraison (même règle que tokens.css).
 *
 * Quatre opérations, chacune nécessaire :
 *
 * 1. RETRAIT DES MÉTADONNÉES. Chaque SVG embarque un manifeste C2PA en
 *    base64 — près de 8 ko sur 17, soit 45 % du fichier, qu'aucun
 *    navigateur ne lit.
 *
 * 2. PRÉFIXAGE DES IDENTIFIANTS. Les trois variantes déclarent les mêmes
 *    ids de dégradés (`siraj-gold-metal`…). Deux variantes sur une même
 *    page produiraient des ids en double : `url(#siraj-gold-metal)`
 *    résoudrait vers la première rencontrée, au hasard de l'ordre du DOM.
 *
 * 3. CLASSES STRUCTURELLES. Chaque groupe nommé reçoit une classe stable
 *    (`sj-beam`, `sj-lantern`…), pour que l'animation vise la même chose
 *    quelle que soit la variante.
 *
 * 4. VARIANTE SUR FOND SOMBRE. La livraison ne contient que des lockups
 *    pour fond clair : l'encre du mot-symbole est un charbon #17191C, qui
 *    tombe à 1,05:1 de contraste sur le bleu-nuit de la page — invisible.
 *    On en dérive une version claire. Voir la note dans le README : c'est
 *    une variante DÉDUITE, à faire confirmer par le studio.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'Siraj logo refinement', 'SVG')
const outFile = join(root, 'src', 'components', 'logo', 'marks.ts')
const animFile = join(root, 'Siraj logo refinement', 'Animation', 'SIRAJ_animation.html')
const fontDir = join(root, 'public', 'fonts')

/**
 * Jost, extraite du film.
 *
 * Le film compose son sous-titre et sa signature en Jost, et EMBARQUE la
 * fonte dans son bundle. La reprendre là plutôt que chez Google évite de
 * faire dépendre une page qui vend l'hébergement souverain d'un serveur
 * américain — c'est le point n° 1 de la liste avant mise en ligne.
 *
 * Deux sous-ensembles sur trois : latin et latin-ext. Le cyrillique est
 * laissé de côté, aucune des deux lignes n'en contient un caractère.
 *
 * La livraison ne fournit que la graisse 500 et la déclare pour 500 ET
 * 600 : le 600 est donc SYNTHÉTISÉ par le navigateur. C'est ce que fait
 * le film ; la page fait pareil, sans quoi elle en divergerait.
 */
/* Les identifiants du bundle changent à chaque livraison : on ne les
   code pas en dur. Les sous-ensembles sont reconnus à leur plage Unicode,
   déclarée dans les @font-face du film. */
const SUBSETS = [
  { tag: 'latin-ext', probe: 'U+0100-02BA', name: 'jost-500-latin-ext.woff2' },
  { tag: 'latin', probe: 'U+0000-00FF', name: 'jost-500-latin.woff2' },
]

function extractFonts() {
  if (!existsSync(animFile)) {
    console.log('  · Film absent — polices existantes conservées.')
    return
  }
  const html = readFileSync(animFile, 'utf8')
  const open = html.indexOf('<script type="__bundler/manifest">')
  if (open < 0) return
  const start = html.indexOf('>', open) + 1
  const manifest = JSON.parse(html.slice(start, html.indexOf('</script>', start)))

  // Les @font-face vivent dans le HTML sous forme échappée.
  const css = html.replaceAll('\\n', '\n').replaceAll('\\"', '"')
  const faces = css.match(/@font-face\s*\{[^}]*\}/g) || []

  mkdirSync(fontDir, { recursive: true })
  for (const { tag, probe, name } of SUBSETS) {
    const face = faces.find((f) => f.includes('Jost') && f.includes(probe))
    const uuid = face && /url\("([0-9a-f-]+)"\)/.exec(face)?.[1]
    const entry = uuid && manifest[uuid]
    if (!entry) {
      console.error(`  ✖ Sous-ensemble Jost introuvable dans le film : ${tag}`)
      process.exit(1)
    }
    const buf = Buffer.from(entry.data, 'base64')
    writeFileSync(join(fontDir, name), buf)
    console.log(`      ${name.padEnd(26)} ${(buf.length / 1024).toFixed(1)} ko`)
  }
}

const VARIANTS = [
  { name: 'symbol', prefix: 'sjs' },
  { name: 'compact', prefix: 'sjc' },
]

/** Encre du mot-symbole sur fond clair → sur fond sombre. */
const ON_DARK = [
  ['#17191c', '#f5f2ec'],
  ['#2a2d33', '#e4e0d7'],
  ['#202227', '#cfcabf'],
  ['#3c4047', '#efece5'],
  ['#1e2025', '#d8d3c8'],
]

function clean(svg, prefix) {
  let s = svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '')

  // Les ids réellement déclarés dans CE fichier, et eux seuls.
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])

  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    s = s.replace(new RegExp(`\\sid="${esc}"`, 'g'), ` id="${prefix}-${id}"`)
    s = s.replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefix}-${id})`)
    s = s.replace(new RegExp(`(xlink:)?href="#${esc}"`, 'g'), `$1href="#${prefix}-${id}"`)
  }

  // Classe structurelle stable, dérivée de l'id d'origine.
  for (const id of ids) {
    if (id.startsWith('siraj-')) continue // defs : dégradés, masques, filtres
    s = s.replace(`id="${prefix}-${id}"`, `id="${prefix}-${id}" class="sj-${id}"`)
  }

  const viewBox = /viewBox="([^"]+)"/.exec(s)[1]
  const inner = s
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .trim()

  return { viewBox, inner }
}

function toDark(inner) {
  let s = inner
  for (const [from, to] of ON_DARK) {
    s = s.replace(new RegExp(from, 'gi'), to)
  }
  return s
}

if (!existsSync(srcDir)) {
  if (existsSync(outFile)) {
    console.log('  · Livraison du logo absente — marks.ts existant conservé.')
    process.exit(0)
  }
  console.error(
    `\n  ✖ Ni « Siraj logo refinement/SVG/ » ni src/components/logo/marks.ts.\n` +
      `    Déposez la livraison puis relancez « npm run logo ».\n`,
  )
  process.exit(1)
}

const parts = []
for (const { name, prefix } of VARIANTS) {
  const file = join(srcDir, `SIRAJ_${name}_transparent.svg`)
  if (!existsSync(file)) {
    console.error(`  ✖ Manquant : ${file}`)
    process.exit(1)
  }
  const { viewBox, inner } = clean(readFileSync(file, 'utf8'), prefix)
  parts.push({ name, viewBox, light: inner, dark: toDark(inner) })
}

const out = `/* Généré par scripts/build-logo.mjs — NE PAS ÉDITER À LA MAIN. */
/* Source : « Siraj logo refinement/SVG/ » (livraison de design, hors dépôt) */

export type LogoVariant = ${parts.map((p) => `'${p.name}'`).join(' | ')}
export type LogoSurface = 'light' | 'dark'

type Mark = { viewBox: string; light: string; dark: string }

export const MARKS: Record<LogoVariant, Mark> = {
${parts
  .map(
    (p) => `  ${p.name}: {
    viewBox: ${JSON.stringify(p.viewBox)},
    light: ${JSON.stringify(p.light)},
    dark: ${JSON.stringify(p.dark)},
  },`,
  )
  .join('\n')}
}
`

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, out, 'utf8')

const kb = (n) => (n / 1024).toFixed(1)
console.log('  ✔ marks.ts généré')
for (const p of parts) {
  const orig = readFileSync(join(srcDir, `SIRAJ_${p.name}_transparent.svg`), 'utf8').length
  console.log(
    `      ${p.name.padEnd(8)} ${kb(orig)} ko → ${kb(p.light.length)} ko  (viewBox ${p.viewBox})`,
  )
}

console.log('  ✔ Jost extraite du film')
extractFonts()
