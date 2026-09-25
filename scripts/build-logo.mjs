/**
 * Prépare les fichiers de marque pour le build.
 *
 * SOURCE : `brand/`, la livraison de design — hors dépôt, comme la
 * charte. Les fichiers générés, eux, sont versionnés : le build ne doit
 * pas dépendre d'un dossier de livraison (même règle que tokens.css).
 *
 *   brand/
 *     harmony/            icon.svg, wordmark.svg
 *     siraj/
 *       latin/            animation.html, svg/, png/
 *       arabic/           animation.html, svg/, png/
 *
 * PRODUIT :
 *   src/components/logo/marks.ts     les signes, par écriture
 *   src/components/logo/harmony.ts   le logo de l'éditeur
 *   public/fonts/*.woff2             les polices que les films composent
 *
 * `npm run logo` régénère le tout. Chaque étape se contente d'un
 * avertissement si sa source manque : une livraison partielle ne casse
 * pas le build.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const brand = join(root, 'brand')
const logoDir = join(root, 'src', 'components', 'logo')
const fontDir = join(root, 'public', 'fonts')

const SCRIPTS = ['latin', 'arabic']
const VARIANTS = ['symbol', 'compact']

/**
 * Encre du mot-symbole sur fond clair → sur fond sombre.
 *
 * Le logo a été composé pour finir sur du papier : son mot-symbole est
 * un charbon qui tombe à 1,13:1 sur le bleu-nuit de la page. Cinq
 * valeurs, invisibles. Tout le reste passe sans retouche — la tour
 * blanche est à 18,4:1, la vague pâle à 11,9:1, les ors sont justes.
 *
 * ⚠ Variante DÉDUITE, à faire confirmer par le studio.
 */
const ON_DARK = [
  ['#17191c', '#f5f2ec'],
  ['#2a2d33', '#e4e0d7'],
  ['#202227', '#cfcabf'],
  ['#3c4047', '#efece5'],
  ['#1e2025', '#d8d3c8'],
]

/**
 * Les polices que les films composent, et où les prendre.
 *
 * Jost porte les deux lignes du film latin ; Reem Kufi le mot-symbole
 * arabe, Tajawal ses deux lignes. Les prendre dans le bundle plutôt que
 * chez Google évite de faire dépendre d'un serveur américain une page
 * qui vend l'hébergement souverain.
 *
 * Seuls les sous-ensembles utiles sont extraits : les textes latins ne
 * contiennent pas de cyrillique, les textes arabes pas de latin.
 */
const SUBSETS = { latin: 'U+0000-00FF', 'latin-ext': 'U+0100-02BA', arabic: 'U+0600' }

const FONTS = [
  { film: 'latin', family: 'Jost', weight: '500', subset: 'latin' },
  { film: 'latin', family: 'Jost', weight: '500', subset: 'latin-ext' },
  { film: 'arabic', family: 'Reem Kufi', weight: '700', subset: 'arabic' },
  { film: 'arabic', family: 'Tajawal', weight: '500', subset: 'arabic' },
  { film: 'arabic', family: 'Tajawal', weight: '700', subset: 'arabic' },
]

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const kb = (n) => (n / 1024).toFixed(1)

/* ─── Les signes ──────────────────────────────────────────────── */

/**
 * Nettoie un SVG livré. Quatre opérations, chacune nécessaire :
 *
 * 1. Retrait des métadonnées. Chaque fichier embarque un manifeste C2PA
 *    en base64 — près de 8 ko sur 17, qu'aucun navigateur ne lit.
 * 2. Préfixage des ids. Les variantes déclarent les mêmes ids de
 *    dégradés ; deux d'entre elles sur une même page et `url(#…)`
 *    résoudrait au hasard de l'ordre du DOM.
 * 3. Classes structurelles, pour que la page puisse viser un groupe
 *    nommé quelle que soit la variante.
 * 4. Le viewBox et le contenu, séparés.
 */
function clean(svg, prefix) {
  let s = svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])

  for (const id of ids) {
    s = s.split(` id="${id}"`).join(` id="${prefix}-${id}"`)
    s = s.split(`url(#${id})`).join(`url(#${prefix}-${id})`)
    s = s.split(`href="#${id}"`).join(`href="#${prefix}-${id}"`)
  }
  /* Une classe structurelle sur les GROUPES nommés, pas sur les
     ressources. Ce qui est déclaré dans <defs> est un dégradé, un
     masque, un filtre ou un volet : lui coller une classe ne sert à
     rien et encombre.

     La règle valait « ignorer ce qui commence par siraj- » tant que la
     livraison nommait ainsi ses defs. La version arabe, exportée depuis
     le film, les nomme sr-. On regarde donc OÙ l'id est déclaré, pas
     comment il s'appelle. */
  const defIds = new Set()
  for (const block of svg.match(/<defs[\s\S]*?<\/defs>/g) || [])
    for (const m of block.matchAll(/\sid="([^"]+)"/g)) defIds.add(m[1])

  // Et les ressources déclarées HORS <defs> : le film arabe pose ses
  // volets à même le balisage, c'est licite et courant.
  const RESOURCE =
    /<(?:clipPath|mask|filter|pattern|linearGradient|radialGradient)\s[^>]*id="([^"]+)"/g
  for (const m of svg.matchAll(RESOURCE)) defIds.add(m[1])

  for (const id of ids) {
    if (defIds.has(id)) continue
    s = s.split(`id="${prefix}-${id}"`).join(`id="${prefix}-${id}" class="sj-${id}"`)
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
  for (const [from, to] of ON_DARK) s = s.replace(new RegExp(from, 'gi'), to)
  return s
}

function marks() {
  const out = {}
  for (const script of SCRIPTS) {
    const dir = join(brand, 'siraj', script, 'svg')
    if (!existsSync(dir)) {
      console.log(`  · Signes « ${script} » absents — ignorés.`)
      continue
    }
    out[script] = {}
    for (const variant of VARIANTS) {
      const file = join(dir, `${variant}-transparent.svg`)
      if (!existsSync(file)) {
        console.error(`  ✖ Manquant : ${file}`)
        process.exit(1)
      }
      // Jeton remplacé À L'EXÉCUTION par un identifiant unique par
      // instance. Un préfixe fixe suffisait tant qu'un lockup donné ne
      // paraissait qu'une fois ; l'en-tête et le pied de page affichent
      // le même, si bien que ses ids de dégradés se retrouvaient en
      // double dans le document. Voir SirajLogo.tsx.
      const { viewBox, inner } = clean(readFileSync(file, 'utf8'), '%ID%')
      out[script][variant] = { viewBox, light: inner, dark: toDark(inner) }
    }
  }
  if (Object.keys(out).length === 0) return

  const body = SCRIPTS.filter((s) => out[s])
    .map((s) => {
      const v = VARIANTS.map(
        (k) => `    ${k}: {
      viewBox: ${JSON.stringify(out[s][k].viewBox)},
      light: ${JSON.stringify(out[s][k].light)},
      dark: ${JSON.stringify(out[s][k].dark)},
    },`,
      ).join('\n')
      return `  ${s}: {\n${v}\n  },`
    })
    .join('\n')

  mkdirSync(logoDir, { recursive: true })
  writeFileSync(
    join(logoDir, 'marks.ts'),
    `/* Généré par scripts/build-logo.mjs — NE PAS ÉDITER À LA MAIN. */
/* Source : les dossiers svg de brand/siraj (livraison, hors dépôt) */

export type LogoScript = ${SCRIPTS.map((s) => `'${s}'`).join(' | ')}
export type LogoVariant = ${VARIANTS.map((v) => `'${v}'`).join(' | ')}
export type LogoSurface = 'light' | 'dark'

type Mark = { viewBox: string; light: string; dark: string }

export const MARKS: Record<LogoScript, Record<LogoVariant, Mark>> = {
${body}
}
`,
    'utf8',
  )
  console.log('  ✔ marks.ts')
  for (const s of SCRIPTS)
    if (out[s])
      for (const v of VARIANTS)
        console.log(`      ${s.padEnd(7)} ${v.padEnd(8)} ${out[s][v].viewBox}`)
}

/* ─── Le logo de l'éditeur ────────────────────────────────────── */

function harmony() {
  const dir = join(brand, 'harmony')
  if (!existsSync(dir)) {
    console.log('  · Logo éditeur absent — harmony.ts conservé.')
    return
  }
  const read = (name) => {
    const file = join(dir, name)
    if (!existsSync(file)) {
      console.error(`  ✖ Manquant : ${file}`)
      process.exit(1)
    }
    let svg = readFileSync(file, 'utf8').replace(/<\?xml[^>]*\?>/g, '')
    for (const id of [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])) {
      svg = svg.split(` id="${id}"`).join(` id="hm-${id}"`)
      svg = svg.split(`url(#${id})`).join(`url(#hm-${id})`)
    }
    return {
      viewBox: /viewBox="([^"]+)"/.exec(svg)[1],
      inner: svg
        .replace(/^[\s\S]*?<svg[^>]*>/, '')
        .replace(/<\/svg>\s*$/, '')
        .trim(),
    }
  }

  const icon = read('icon.svg')
  const word = read('wordmark.svg')
  // `white` → `currentColor` : rendu identique sur fond sombre, mais la
  // page peut le poser ailleurs sans toucher au fichier. L'or de
  // l'icône n'est pas touché — c'est la couleur de la marque.
  word.inner = word.inner.split('fill="white"').join('fill="currentColor"')

  writeFileSync(
    join(logoDir, 'harmony.ts'),
    `/* Généré par scripts/build-logo.mjs — NE PAS ÉDITER À LA MAIN. */
/* Source : brand/harmony/ (livraison de design, hors dépôt) */

type Mark = { viewBox: string; inner: string }

export const HARMONY: Record<'icon' | 'wordmark', Mark> = {
  icon: {
    viewBox: ${JSON.stringify(icon.viewBox)},
    inner: ${JSON.stringify(icon.inner)},
  },
  wordmark: {
    viewBox: ${JSON.stringify(word.viewBox)},
    inner: ${JSON.stringify(word.inner)},
  },
}
`,
    'utf8',
  )
  console.log('  ✔ harmony.ts')
}

/* ─── Les polices ─────────────────────────────────────────────── */

function fonts() {
  const cache = {}
  const load = (film) => {
    if (cache[film]) return cache[film]
    const file = join(brand, 'siraj', film, 'animation.html')
    if (!existsSync(file)) return (cache[film] = null)
    const html = readFileSync(file, 'utf8')
    const open = html.indexOf('<script type="__bundler/manifest">')
    const start = html.indexOf('>', open) + 1
    const manifest = JSON.parse(html.slice(start, html.indexOf('</script>', start)))
    const css = html.replaceAll('\\n', '\n').replaceAll('\\"', '"')
    const faces = css.match(/@font-face\s*\{[^}]*\}/g) || []
    return (cache[film] = { manifest, faces })
  }

  mkdirSync(fontDir, { recursive: true })
  let n = 0
  for (const { film, family, weight, subset } of FONTS) {
    const src = load(film)
    if (!src) {
      console.log(`  · Film « ${film} » absent — ${family} ${weight} ignorée.`)
      continue
    }
    const face = src.faces.find(
      (f) =>
        f.includes(`'${family}'`) &&
        f.includes(`font-weight: ${weight}`) &&
        f.includes(SUBSETS[subset]),
    )
    const uuid = face && /url\("([0-9a-f-]+)"\)/.exec(face)?.[1]
    const entry = uuid && src.manifest[uuid]
    if (!entry) {
      console.error(`  ✖ Introuvable dans le film ${film} : ${family} ${weight} ${subset}`)
      process.exit(1)
    }
    const name = `${slug(family)}-${weight}-${subset}.woff2`
    const buf = Buffer.from(entry.data, 'base64')
    writeFileSync(join(fontDir, name), buf)
    console.log(`      ${name.padEnd(28)} ${kb(buf.length)} ko`)
    n++
  }
  if (n) console.log('  ✔ polices extraites')
}

marks()
harmony()
fonts()
