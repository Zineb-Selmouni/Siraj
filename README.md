# Siraj 360 — Landing page

Page d'atterrissage de **Siraj 360** (سراج), plateforme de veille médiatique et
d'intelligence stratégique de Harmony Technology — réf. catalogue P03.

React 18 + TypeScript + Vite. Bilingue FR / EN, français par défaut.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # bundle de production dans dist/
npm run preview    # sert le bundle construit
npm run typecheck  # vérifie la parité FR/EN et le reste du typage
```

---

## La charte est la source de vérité

Aucune couleur, aucune graisse, aucun rayon n'est écrit à la main dans les
composants. `scripts/build-tokens.mjs` lit la charte déposée dans `Context/`
et génère `src/styles/tokens.css` en variables CSS. Le script tourne
automatiquement avant `dev` et `build`.

```
Context/Siraj360_design-tokens_v6.2_2026-09.json
        └── npm run tokens ──> src/styles/tokens.css  (généré, non versionné)
```

Mise à jour de la charte : déposer le nouveau JSON dans `Context/` (le script
prend le plus récent par ordre alphabétique) et relancer `npm run dev`.

### Le signe

`src/components/SirajMark.tsx` redessine le phare — dôme, lanterne, galerie,
tour, écharpe, faisceaux, vague et écho — à partir des tracés et dégradés
exacts de `logo.geometry` dans la charte. Les interdits de la charte sont
respectés : pas de recoloration, pas d'aplat des dégradés, lanterne allumée,
écharpe solidaire de la tour, aucune rotation.

> ⚠ **Le mot-symbole « SIRAJ360 » n'est pas reproduit.** La charte l'interdit
> explicitement : « Ne jamais retaper le mot-symbole dans une police : c'est un
> dessin. » Le header affiche donc le **nom** en Sora, pas le lockup officiel.
> Avant mise en ligne, déposer le SVG officiel du mot-symbole dans `public/` et
> le substituer dans `src/components/Header.tsx` (le point est commenté dans le
> fichier).

---

## Direction visuelle

La page a été entièrement redessinée. Les trois défauts corrigés :

1. **Incohérence.** Chaque section avait fini par recevoir son effet propre —
   balayage radar, impulsion le long d'un rail, équerres de cadrage, sceaux qui
   se remplissent, liseré conique au survol, compteurs animés. Empilés, ces
   effets ne composent pas un système, ils composent un bruit.
2. **Or saturé partout.** L'or de la charte (`#FFC933`) est une couleur de
   _signe_. Étalée sur des bordures, des filets, des puces et des aplats, elle
   fait retomber l'ensemble du côté du gabarit générique.
3. **Le signe en illustration d'ouverture.** Un logo déployé à 600 px se lit
   comme une vignette. C'était le signal « petit budget » le plus fort de la page.

### Palette

`src/styles/theme.css` définit la palette de la PAGE ; `tokens.css` (généré)
reste la vérité de la MARQUE, et le signe garde ses couleurs exactes.

|               |                                                                                        |
| ------------- | -------------------------------------------------------------------------------------- |
| Fond dominant | **papier** `#F5F2EC` — un document institutionnel se lit sur clair                     |
| Ponctuation   | **bleu-nuit** `#0A1425` — ouverture, différenciateur, positionnement, passage à l'acte |
| Accent        | **laiton** `#9A742A` — un or rabattu, lisible sur papier                               |
| Point allumé  | or de la charte `#FFC933`, réservé au signe et aux pastilles d'état                    |

Un seul élément saturé dans un champ sourd se remarque ; vingt ne se
remarquent plus. C'est tout le principe du passage à un accent laiton.

### Typographie

**IBM Plex, une seule superfamille, quatre rôles.**

| Rôle              | Face                             | Où                                                               |
| ----------------- | -------------------------------- | ---------------------------------------------------------------- |
| Titres            | IBM Plex **Serif** 600           | titres de section, titre d'ouverture, grands chiffres éditoriaux |
| Texte & interface | IBM Plex **Sans** 400/500/600    | corps, boutons, navigation, chiffres de la console               |
| Libellés          | IBM Plex **Mono** 400/500        | numéros de section, intitulés, horodatages, langues, scores      |
| Arabe             | IBM Plex **Sans Arabic** 500/600 | سراج, mentions en arabe                                          |

La pile précédente venait de la charte : Sora en titrage, Manrope en texte.
Deux linéales géométriques de proportions voisines — le couple ne produisait
**aucun écart de registre** entre titre et texte, et c'est une bonne part de
ce qui faisait « gabarit générique ». Serif contre linéale creuse cet écart,
tout en restant de la même souche.

Le partage des rôles est délibéré : le serif tient l'éditorial, la linéale
tient tout ce qui s'utilise. Un bouton est une commande, pas un titre ; les
chiffres de la console appartiennent à un outil, pas à un article.

**Plex Sans Arabic remplace Cairo** — c'est le gain le moins visible et le
plus utile. Le français et l'arabe partagent enfin des proportions, une
hauteur d'œil et une graisse, parce qu'ils ont été dessinés ensemble. Sur une
page bilingue, cela relève du fonctionnement autant que de l'allure.

> ⚠ **Écart de charte.** La charte prescrit Sora / Manrope / Cairo. Ces
> valeurs restent disponibles dans `tokens.css`, préfixées
> `--charter-font-*` : déclarées comme référence de marque — imprimés,
> signe — mais jamais appliquées par la page. Rien n'est masqué en douce.
> À valider auprès du responsable de la charte, au même titre que l'écart
> de palette.

### Mouvement

**Un seul geste, partout.** Le contenu se résout : 14 px vers le haut et
opacité, même courbe (`cubic-bezier(.22,1,.36,1)`), même durée, échelonnement
réglé par `--i`. C'est tout.

**Un seul élément bouge en continu :** le flux de veille. Son mouvement porte
du sens — des mentions arrivent. Rien d'autre ne boucle.

GSAP a été retiré : sans orchestration complexe à tenir, il ne payait plus
ses 32 ko. Le système tient en 60 lignes (`src/lib/reveal.ts`) et le bundle
est passé de 96 ko à 63 ko gzippés.

Sécurités, dans cet ordre : le masquage n'existe que si `js-reveal` est posé
sur `<html>` par le script ; en mouvement réduit la classe n'est jamais posée ;
et si l'observateur n'a rien révélé au bout de 2,5 s, tout est révélé d'office.
Aucun contenu ne dépend de l'animation pour être lisible.

### Structure

**Le signe est en ouverture, posé sur une plaque.** Deux équerres, un filet,
une légende en monospace : la plaque le désigne comme une marque au lieu de
le laisser flotter comme une image collée. Dans la nouvelle palette il est le
seul élément saturé de la page — d'où sa présence, sans qu'il ait besoin
d'occuper la moitié de l'écran.

**La console de veille a sa propre section** — _Le poste de travail_, reprise
de la slide 6 du deck, et elle prend toute la largeur : c'est la démonstration
du produit, et une console rangée dans une colonne se lit comme un encart.

Une liste bordée n'est pas un tableau de bord — elle montre des lignes, pas
un état. La console montre un état, en six régions séparées par des filets :

|             |                                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| Barre       | nom de l'application, contrôle segmenté 24 h / 7 j / 30 j, témoin d'activité |
| Indicateurs | mentions, sources actives, alertes, latence — avec variation et direction    |
| Volume      | 24 barres horaires, pic marqué, barre de l'heure en cours qui respire        |
| Langues     | répartition AR / Darija / FR / EN                                            |
| Flux        | les mentions qui arrivent, la plus ancienne qui s'estompe                    |
| Pied        | répartition du sentiment, décompte, mention d'illustration                   |

**Les régions se répondent.** À chaque mention : le décompte monte, la
dernière barre de la courbe grandit, et toutes les six mentions l'heure
bascule — la série glisse et une nouvelle barre démarre bas. La jauge de
sentiment se recalcule. C'est ce qui distingue un tableau de bord d'une
capture d'écran animée.

Les incréments sont cyclés, pas tirés au sort : le rendu reste déterministe.
La console s'adapte à SA largeur (`container-type`), pas à celle de l'écran —
elle reste donc juste où qu'on la place.

Le différenciateur darija suit, sur bleu-nuit : une mention translittérée
décomposée comme le moteur la voit — entités marquées **dans** le texte,
langue détectée, sentiment scoré, thématique, traduction.

Dix sections numérotées, un seul motif d'en-tête (`SectionHead`), et un
rythme de fonds qui réserve le bleu-nuit aux quatre moments qui portent :
ouverture, différenciateur, positionnement, passage à l'acte.

### Le signe animé

`alive` allume la version d'ouverture. **Seule la lumière bouge** — la
géométrie du phare n'est ni tournée, ni mise à l'échelle, ni inclinée.

|            |                                                                                    |
| ---------- | ---------------------------------------------------------------------------------- |
| Allumage   | la lampe s'ouvre, puis un volet écarte la lumière depuis la lanterne vers le large |
| Lampe      | respiration en opacité, 6,5 s                                                      |
| Cônes      | enflement 5,1 s — vue de côté, une optique de phare enfle, elle ne bascule pas     |
| Balayage   | la lumière file vers le large toutes les 4,2 s                                     |
| Impulsions | trois signaux partent au large, 5,6 / 6,8 / 6,2 s                                  |

Aucune cadence n'est multiple d'une autre : le motif d'ensemble ne se répète
donc jamais à l'œil, là où des durées synchrones finiraient par battre la
mesure.

> Les trajectoires des impulsions sont **vérifiées contre les bords des
> cônes** : chacune suit la pente de son faisceau et ne sort jamais de la
> lumière. La deuxième démarrait 8 % trop bas et se faisait découper au
> départ — corrigé. Toute modification de ces coordonnées doit être
> revérifiée contre `logo.geometry`.

> **Deux pistes essayées et écartées, à ne pas réintroduire :** un faisceau
> d'ambiance tournant (l'or à faible opacité sur du bleu-nuit vire au gris,
> et le lobe opposé lançait une traînée à contresens) et un pivot des cônes
> de ±7° (deux triangles pleins qui basculent — effet projecteur, pas phare).

---

## Déploiement — Netlify

```bash
npm run check   # typage + format + lint + build : la porte avant de pousser
```

Tout est décrit dans `netlify.toml` : commande de build, dossier publié,
Node épinglé en 22, en-têtes de sécurité et de cache. Il n'y a rien à
configurer dans l'interface Netlify hormis le formulaire (voir plus bas).

### Le build ne dépend plus de la charte

`Context/` est **exclu du dépôt** : la charte et les decks sont des
documents internes, et les notes d'intervention des `.pptx` n'ont pas leur
place dans un dépôt relié à un hébergeur.

`src/styles/tokens.css` est donc **versionné** — c'est lui que le build
consomme. `scripts/build-tokens.mjs` régénère le fichier quand la charte est
présente, le conserve quand elle ne l'est pas, et n'échoue que si les deux
manquent. Sans cela, la première compilation sur une machine neuve cassait.

> Après toute mise à jour de la charte : déposer le JSON dans `Context/`,
> lancer `npm run tokens`, **committer `src/styles/tokens.css`**.

### Le formulaire

Par défaut il passe par **Netlify Forms** : aucun serveur à tenir, les
demandes arrivent dans l'onglet _Forms_ du site, filtrage anti-spam compris.

Netlify recense les formulaires en analysant le HTML **statique** au build ;
un formulaire rendu par React lui est invisible. D'où le double caché dans
`index.html` — ses champs doivent rester alignés sur ceux qu'envoie
`src/lib/pilotRequest.ts`.

Deux protections : le champ piège `site-web` (déclaré par
`netlify-honeypot`, invisible et hors parcours clavier) et le filtre
Netlify. Si l'envoi échoue, l'interface bascule sur le repli e-mail — elle
ne prétend jamais avoir envoyé sans preuve.

Pour brancher un CRM à la place, renseigner `VITE_PILOT_ENDPOINT` **et**
ajouter l'URL à `connect-src` dans `netlify.toml`.

### En-têtes de sécurité

|                                              |                                                                                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`                    | `script-src 'self'` — le build ne produit aucun script en ligne, donc aucune brèche à ouvrir                                                                                                                |
|                                              | `style-src` garde `'unsafe-inline'` pour les attributs `style` que React pose (variables `--i`, largeurs de jauges). Tolérance à risque faible : contrairement à son équivalent script, elle n'exécute rien |
| `frame-ancestors 'none'` + `X-Frame-Options` | le site n'a aucune raison d'être encadré                                                                                                                                                                    |
| `Permissions-Policy`                         | caméra, micro, géolocalisation et le reste désactivés — la page n'en utilise aucun                                                                                                                          |
| `Strict-Transport-Security`                  | un an. `preload` **volontairement absent** : l'inscription est difficile à défaire et engage tous les sous-domaines. À décider une fois le domaine définitif en place                                       |
| `Referrer-Policy`, `nosniff`, `COOP`, `CORP` | valeurs strictes par défaut                                                                                                                                                                                 |

Pas de repli SPA : le site n'a qu'une route et aucun routeur client. Une
règle `/* → /index.html 200` renverrait la page d'accueil avec un code 200
pour n'importe quelle URL inexistante, ce qui masque les vraies 404.

### ⚠ À trancher avant la mise en ligne : les polices

Les quatre polices sont chargées **depuis Google Fonts**, donc depuis des
serveurs américains. À chaque visite, l'adresse IP du visiteur part chez
Google.

Pour cette page-ci, ce n'est pas un détail : elle vend l'hébergement au
Maroc, la conformité à la loi 09-08 et l'absence de dépendance étrangère.
La contradiction est frontale, et c'est exactement le genre de point qu'un
acheteur public relève.

**Correctif :** héberger les polices soi-même — les quatre coupes IBM Plex
sont sous licence SIL OFL, donc redistribuables. Une seule famille à
récupérer, ce qui simplifie l'opération par rapport à l'ancienne pile.
Déposer les `.woff2` dans `public/fonts/`, remplacer le `<link>` de
`index.html` par des règles `@font-face`, puis resserrer la politique :

```
style-src 'self' 'unsafe-inline';
font-src  'self';
```

Gain annexe : une requête tierce de moins au chargement.

### Reste à faire

|                          |                                                                            |
| ------------------------ | -------------------------------------------------------------------------- |
| Polices auto-hébergées   | voir ci-dessus — le point le plus important                                |
| Mot-symbole officiel     | déposer le SVG dans `public/`, substituer dans `Header.tsx`                |
| Coordonnées commerciales | `src/config.ts` — `contact@harmony.ma` est un emplacement                  |
| Domaine                  | `siraj360.ma` à réserver ; renseigner ensuite `Sitemap:` dans `robots.txt` |
| Formulaire Netlify       | activer _Forms_ dans les réglages du site après le premier déploiement     |
| Mentions légales / RGPD  | les deux liens du pied de page pointent vers une ancre de la page          |

## Trilingue : عربية · français · English

`src/i18n/fr.ts` est la référence structurelle. Le type `Copy` en est
inféré, et `en.ts` comme `ar.ts` doivent le satisfaire : **une clé oubliée
dans une langue casse la compilation**, elle ne part pas en production à
moitié traduite. Les trois dictionnaires portent les mêmes 115 clés, aux
mêmes occurrences — vérifié.

Le français reste la langue par défaut (c'est celle du deck commercial et de
la relation client) ; un navigateur arabophone ou anglophone reçoit la
sienne. Le choix est mémorisé.

### L'arabe n'est pas du latin retourné

`dir="rtl"` est posé sur `<html>` par le fournisseur de langue, ce qui
retourne à lui seul toutes les propriétés logiques du CSS — marges,
bordures, ancrages. Le code les utilisait déjà partout ; il ne restait
qu'à convertir quatre positions physiques oubliées.

Restent trois choses que `dir` ne règle pas, et qui trahissent une
traduction bâclée :

|                   |                                                                                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Interlettrage** | L'arabe est une écriture **liée** : espacer ses lettres rompt les ligatures et casse les mots. Tout crénage est remis à zéro — c'est le point le plus souvent raté.                                                            |
| **Capitales**     | L'arabe n'a pas de casse. `text-transform` n'y fait rien, et le vocabulaire de libellés en petites capitales espacées n'a pas d'équivalent : les libellés redeviennent du texte ordinaire.                                     |
| **Famille**       | IBM Plex **Serif ne couvre pas l'arabe**. L'opposition serif / linéale n'est donc pas transposable : en arabe l'écart de registre se fait à la graisse et à la taille, dans Plex Sans Arabic. C'est l'usage, pas un pis-aller. |

L'interligne passe de 1,65 à 1,85 : l'arabe porte des diacritiques
au-dessus et au-dessous de la ligne.

**Les chiffres restent occidentaux** (0-9), pas orientaux (٠-٩) — c'est
l'usage au Maroc, y compris dans les documents officiels.

### Deux choses qui ne se retournent pas

**Le signe.** La composition du hero reste physiquement identique dans les
trois langues : le phare à droite, ses faisceaux débordant vers l'extérieur.
La charte interdit de le mettre en miroir, et retourné il éclairerait le
titre au lieu du large. Seule la colonne de texte repasse en RTL.

**La darija translittérée.** Les mentions en darija gardent leurs caractères
latins et leur sens de lecture, même en page arabe. C'est la pièce à
conviction du produit : la traduire la détruirait.

> En revanche l'histogramme de la console se retourne, et c'est voulu : en
> arabe le temps se lit de droite à gauche, donc l'heure 00 passe à droite.

## Arbitrages de contenu

Les écarts assumés entre la page et le deck commercial v2.2 — et les raisons
de chaque formulation retenue — sont consignés dans `NOTES-INTERNES.md`.

Ce fichier est **délibérément exclu du dépôt** : il cite des notes
d'intervention internes du deck, qui n'ont pas vocation à être publiées.
Le demander à la direction commerciale avant de modifier la copie.

---

## Structure

```
src/
├─ components/      un composant + une feuille de style par section
│  ├─ SirajMark     le signe, tracés issus de la charte
│  ├─ Hero · Header · SectionHead
│  ├─ Stakes · Pipeline · Workspace · Dashboard
│  ├─ Darija · Proof · UseCases · Comparison
│  └─ Sovereignty · Offers · Pilot · Footer
├─ i18n/            fr.ts (référence) · en.ts · contexte · fournisseur
├─ hooks/           useInView · useReducedMotion
├─ lib/             reveal (le système de mouvement) · pilotRequest
├─ styles/          theme.css (palette de la page)
│                   global.css (base, bandes, primitives)
│                   tokens.css (généré depuis la charte, VERSIONNÉ)
└─ config.ts        coordonnées et points d'intégration

netlify.toml        build, en-têtes de sécurité, cache
eslint.config.js    règles de lint
scripts/            génération des tokens depuis la charte
```

Le rythme des sections reprend l'alternance navy / paper du deck commercial.
Les blocs navy restent sombres dans les deux thèmes ; les sections claires
basculent avec le thème du visiteur (clair, sombre et « système » couverts).
