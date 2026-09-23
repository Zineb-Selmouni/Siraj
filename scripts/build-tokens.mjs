/**
 * Génère src/styles/tokens.css à partir de la charte Siraj 360.
 *
 * La charte (Context/Siraj360_design-tokens_vX.Y_YYYY-MM.json) fait foi :
 * aucune couleur, aucune graisse, aucun rayon n'est écrit à la main dans
 * les composants.
 *
 * LE FICHIER GÉNÉRÉ EST VERSIONNÉ, et c'est délibéré. La charte est un
 * document interne : elle n'a pas sa place dans un dépôt relié à un
 * hébergeur, et elle est absente des environnements de build. Si le script
 * exigeait sa présence, le déploiement casserait à la première compilation
 * sur une machine neuve.
 *
 * Donc :
 *   · charte présente  -> régénération, et tout écart est rattrapé ;
 *   · charte absente   -> on conserve le fichier existant et on le dit ;
 *   · charte absente ET fichier manquant -> échec franc, avec la marche
 *     à suivre.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contextDir = join(root, 'Context')
const outFile = join(root, 'src', 'styles', 'tokens.css')

const charterFile = existsSync(contextDir)
  ? readdirSync(contextDir)
      .filter((f) => /^Siraj360_design-tokens_.*\.json$/.test(f))
      .sort()
      .pop()
  : undefined

if (!charterFile) {
  if (existsSync(outFile)) {
    const source = readFileSync(outFile, 'utf8').split('\n')[1] ?? ''
    console.log(`  · Charte absente — tokens.css existant conservé.`)
    console.log(`    ${source.replace(/^\/\*\s*|\s*\*\/$/g, '')}`)
    process.exit(0)
  }

  console.error(
    `\n  ✖ Charte introuvable ET src/styles/tokens.css absent.\n\n` +
      `    Déposez Siraj360_design-tokens_vX.Y_YYYY-MM.json dans Context/\n` +
      `    puis relancez « npm run tokens ». Le fichier généré doit ensuite\n` +
      `    être versionné : le build n'a pas accès à la charte.\n`,
  )
  process.exit(1)
}

const charter = JSON.parse(readFileSync(join(contextDir, charterFile), 'utf8'))
const v = (node) => node?.value

const { color, space, radius, typography } = charter

const lines = [
  `/* Généré par scripts/build-tokens.mjs — NE PAS ÉDITER À LA MAIN. */`,
  `/* Source : Context/${charterFile} (charte ${charter.version}) */`,
  ``,
  `:root {`,
  `  /* — Couleurs de marque, invariantes dans les deux thèmes — */`,
  `  --navy: ${v(color.primary.navy)};`,
  `  --navy-card: ${v(color.surface.darkCard)};`,
  `  --navy-line: ${v(color.surface.lineOnDark)};`,
  `  --gold: ${v(color.primary.gold)};`,
  `  --gold-light: ${v(color.primary.goldLight)};`,
  `  --gold-text: ${v(color.primary.goldText)};`,
  `  --paper: ${v(color.surface.paper)};`,
  `  --white: ${v(color.surface.white)};`,
  `  --line: ${v(color.surface.line)};`,
  ``,
  `  /* — Texte sur fond sombre : constant, les slabs navy ne basculent pas — */`,
  `  --on-slab: ${v(color.text.onDark)};`,
  `  --on-slab-soft: ${v(color.text.onDarkSoft)};`,
  `  --on-slab-muted: ${v(color.text.onDarkMuted)};`,
  ``,
  `  /* — Sémantique : sentiment et alertes — */`,
  `  --positive: ${v(color.semantic.success)};`,
  `  --negative: ${v(color.semantic.danger)};`,
  `  --neutral: ${v(color.semantic.info)};`,
  `  --vigilance: ${v(color.semantic.warning)};`,
  ``,
  `  /* — Familles de la CHARTE — */`,
  `  /* Préfixées : la page compose en IBM Plex (voir theme.css) et ne doit`,
  `     pas masquer silencieusement ces valeurs. Elles restent la référence`,
  `     de la marque pour les supports imprimés et le signe. */`,
  `  --charter-font-display: ${v(typography.fontFamily.display)};`,
  `  --charter-font-body: ${v(typography.fontFamily.body)};`,
  `  --charter-font-arabic: ${v(typography.fontFamily.arabic)};`,
  ``,
  `  /* — Espacement — */`,
  ...Object.entries(space).map(([k, t]) => `  --space-${k}: ${v(t)};`),
  ``,
  `  /* — Rayons — */`,
  ...Object.entries(radius)
    .filter(([, t]) => v(t))
    .map(([k, t]) => `  --radius-${k}: ${v(t)};`),
  `}`,
  ``,
]

writeFileSync(outFile, lines.join('\n'), 'utf8')
console.log(`  ✔ tokens.css généré depuis ${charterFile} (charte ${charter.version})`)
