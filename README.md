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

Le logo vient désormais de la livraison de design **« Siraj logo refinement »**
(SVG, PNG, et un fichier d'animation). Il remplace le signe qui était
reconstruit à la main d'après `logo.geometry`.

`scripts/build-logo.mjs` transforme les SVG livrés en
`src/components/logo/marks.ts`. Comme la charte, la livraison est **hors
dépôt** ; c'est le fichier généré qui est versionné, et c'est lui que le build
consomme. `npm run logo` le régénère, `npm run assets` enchaîne charte et logo,
et `dev` comme `build` appellent `assets`.

Le script fait quatre choses, chacune nécessaire :

|                       |                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Métadonnées           | chaque SVG embarque un manifeste C2PA en base64 — près de 8 ko sur 17, soit 45 % du fichier, qu'aucun navigateur ne lit                                          |
| Identifiants          | les variantes déclarent les mêmes ids de dégradés ; sur une même page, `url(#siraj-gold-metal)` résoudrait au hasard de l'ordre du DOM. Préfixés `sjs-` / `sjc-` |
| Classes               | chaque groupe nommé reçoit une classe stable (`sj-beam`, `sj-lantern`…), pour que l'animation vise la même chose d'une variante à l'autre                        |
| Encre sur fond sombre | voir la réserve ci-dessous                                                                                                                                       |

Deux lockups sont exposés : `symbol` (le signe seul) et `compact` (signe +
mot-symbole). La variante `full` est écartée — elle compose sa signature en
`<text>` avec **Jost**, une police que la page ne charge pas ; le rendu
dépendrait de ce qui est installé sur la machine du visiteur.

> ✅ **Le mot-symbole est enfin DESSINÉ.** La charte interdit de le recomposer
> dans une police — « c'est un dessin » — et la page, faute de fichier, le
> simulait en Sora dans l'en-tête. La livraison fournit chaque lettre en
> tracé (`sj-letter-S`, `-I`, `-R`, `-A`, `-J`). L'en-tête et le pied de page
> affichent maintenant le **lockup officiel**. Le contournement est levé.

> ⚠ **L'encre sur fond sombre est DÉDUITE, à faire confirmer.** La livraison ne
> contient que des lockups pour fond clair : `_white` ne fait qu'ajouter un
> rectangle blanc derrière le même dessin. Or l'encre du mot-symbole est un
> charbon `#17191C`, qui tombe à **1,05:1** sur le bleu-nuit de la page —
> invisible. `build-logo.mjs` en dérive une version claire en remappant cinq
> valeurs de gris (28 occurrences). **Le signe seul n'est pas concerné** : il
> ne porte aucune de ces valeurs et était déjà lisible sur fond sombre. À
> arbitrer avec le studio avant mise en ligne — soit la version dérivée est
> validée, soit un lockup sur fond sombre est livré.

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

### Le film du logo

La livraison comprend sa propre séquence : `Animation/SIRAJ_animation.html`.
Elle est jouée **telle quelle**. Le fichier livré n'est pas embarquable — 3 Mo
de React en UMD, Babel standalone, un moteur de composition générique et un
panneau de réglages — mais la SCÈNE, elle, est reprise à l'identique dans
`src/components/logo/reveal/`. Le moteur est remplacé par une horloge de
quelques lignes ; le panneau de réglages disparaît, ses valeurs par défaut
figées telles que la livraison les pose (`intro: Night`, `gold: Classic`).

`motion.ts` porte les trois courbes du moteur (`easeOutCubic`,
`easeInOutCubic`, `easeOutBack`) et la table `OM_SCENES` :

| Repère  | Début | Durée |                                                                     |
| ------- | ----- | ----- | ------------------------------------------------------------------- |
| Dark    | 0,0 s | 1,2 s | A single ember glows in the dark                                    |
| Ignite  | 1,2 s | 1,3 s | The lantern flares and the tower is lit from the top down           |
| Sweep   | 2,5 s | 1,8 s | The beam sweeps over and floods the frame with light                |
| Build   | 4,3 s | 2,0 s | Waves flow in, the bars rise and the arc draws                      |
| Name    | 6,3 s | 1,8 s | SIRAJ rises letter by letter and the gold triangle drops into the A |
| Tagline | 8,1 s | 1,6 s | Gold rules extend; subtitle and tagline settle                      |
| Hold    | 9,7 s | 2,4 s | A glint crosses the gold wave while the beam breathes               |

Douze secondes une, **lues une seule fois** (`OM_PLAYBACK.count = 1`), puis le
film se fige sur sa dernière image. En mouvement réduit, il s'ouvre directement
dessus.

> **Ce fichier est une transcription, pas une création.** Chaque nombre, chaque
> couleur, chaque tracé vient du film. Une vérification automatique compare les
> littéraux de la source et du port : couleurs et chemins sont identiques au
> caractère près, et les seuls écarts numériques sont la taille fixe
> `1920 × 1080` — remplacée par une mise à l'échelle en CSS — et l'étiquette de
> déboguage. Ne pas « améliorer » une valeur ici sans la changer à la source.

**Deux écarts assumés, et pourquoi.** Le film fixait sa scène à 1920 × 1080 en
dur ; la page la laisse se mettre à l'échelle, sinon elle déborderait de toute
fenêtre plus étroite. Et le film mesurait son sous-titre au canvas en supposant
Jost déjà chargée ; la page re-mesure une fois `document.fonts` prête, sans quoi
les deux filets d'or qui encadrent le sous-titre se placeraient d'après la
police de repli.

**Jost.** Le film compose son sous-titre et sa signature en Jost et embarque la
fonte dans son bundle. `build-logo.mjs` l'en extrait vers `public/fonts/` —
latin et latin-ext ; le cyrillique est laissé de côté, aucune des deux lignes
n'en contient un caractère. La reprendre là plutôt que chez Google évite de
faire dépendre d'un serveur américain une page qui vend l'hébergement
souverain. La livraison ne fournit que la graisse 500 et la déclare pour 500 ET
600 : le 600 est donc **synthétisé** par le navigateur. La page fait pareil.

> ⚠ **Le film est en français, en dur.** « PLATEFORME DE VEILLE » et « ÉCLAIRER
> AUJOURD'HUI, ANTICIPER DEMAIN » sont composés dans la scène livrée. Ils
> s'affichent donc aussi sur les versions anglaise et arabe. Les traduire
> ferait diverger la page du film : à arbitrer avec le studio, qui seul peut
> livrer les trois versions.

### Le phare éclaire la section

Le film n'est pas un objet posé dans le hero : il en est la **source
lumineuse**. Il passe derrière le texte, son faisceau balaie le titre, et sa
lumière se répand sur toute la section.

C'était déjà dans le film, mais invisible. Pendant le repère Sweep, le faisceau
mesure 1500 unités et va de x = -790 à x = 2117 sur un cadre large de 1920 : il
traverse tout. Enfermé dans une plaque au tiers de la section, l'essentiel du
geste tombait hors champ.

|     | Couche     |                                                    |
| --- | ---------- | -------------------------------------------------- |
| 4   | le passage | lumière du faisceau, **au-dessus** du texte        |
| 3   | le texte   |                                                    |
| 2   | la nappe   | lumière ambiante depuis la lanterne, sous le texte |
| 1   | le film    | transparent, derrière le texte                     |
| 0   | la nuit    | fond de section                                    |

Le faisceau passe donc derrière les mots et sa lumière tombe dessus. C'est ce
qui se lit comme « le texte est éclairé » plutôt que « un trait passe sur le
texte ».

**Le calage vient du film.** Le faisceau part à 180° — plein gauche, à hauteur
de lanterne — puis remonte vers 344°. Il n'est en travers du texte qu'au début
de sa course : passé ~200°, il est déjà au-dessus. En progression c'est 12 % ;
avec l'easeInOutCubic du moteur sur 1,7 s à partir de 2,4 s, cela tombe à
2,93 s. D'où :

| 2,35 s | le faisceau passe sur le texte                     |
| ------ | -------------------------------------------------- |
| 2,40 s | le trait de lumière traverse le titre              |
| 2,85 s | la nappe monte — le flot du film, devenu éclairage |

La nappe reprend exactement le flot de la livraison : `Sweep + 0,35 s`, 1,5 s,
easeInOutCubic. Dans le film c'est un disque de papier qui envahit l'image ;
ici il n'envahit plus une image, il éclaire une section. Le repère dit « floods
the frame with light » — le cadre, désormais, c'est le hero.

**Le cadrage.** La lanterne est ÉPINGLÉE à un point de la section. Dans le film
elle est à (710, 238) sur 1920 × 1080, soit (36,98 %, 22,04 %) de l'image : une
translation négative de ces deux valeurs amène ce point sur `--lantern-x` /
`--lantern-y` quelle que soit la taille. Elle est haute (30 %) pour deux
raisons liées : le dessin descend jusqu'à 90 % de l'image, il lui faut de la
place dessous ; et le faisceau part à l'horizontale à hauteur de lanterne,
c'est-à-dire en travers du titre.

> Le film est dimensionné **par sa hauteur**, pas par la largeur de la fenêtre.
> Le dessin occupe 74 % de la hauteur de l'image : calé sur la largeur, il
> mesurait 1045 px de dessin pour 828 px disponibles à 1920, et le mot-symbole
> passait sous la section. Le cadrage tient maintenant de 1280 à 1920, avec 78
> à 206 px entre le titre et le dessin.

**La scène s'arrête au-dessus de la bande de spécifications.** C'est elle qui
borne le film, et non la section — la bande fait partie de la section, si bien
qu'un film calé sur la hauteur totale venait poser la signature du logo sur
« 03 · veille temps réel ». `--specs-reserve` retire cette hauteur, et
`--lantern-y` se mesure dans ce qui reste : un pourcentage y veut dire quelque
chose. La nappe, elle, ignore la réserve — la lumière ne s'arrête pas à un
filet. Vérifié de 700 à 1200 px de fenêtre : 28 à 82 px de marge en haut, 30 à
44 px en bas, pour un dessin de 380 à 555 px.

**La scène a la largeur de la COLONNE DE TEXTE, pas celle de la fenêtre.**
Épinglé à un pourcentage de la fenêtre, le film s'éloignait du texte à mesure
qu'on élargissait — le texte, lui, plafonne à 1280 px : l'écart passait de
78 px à 1280 à 313 px à 1920. Rapporté à la colonne, il tient entre 52 et 64 px
de 1240 à 2560.

**Le film se cale sur la plus contraignante des deux mesures de la scène**,
`min(97cqh, 57cqw)`. Calé sur la seule hauteur, il débordait sur le texte dans
une fenêtre large et basse ; sur la seule largeur, le mot-symbole passait sous
la section dans une fenêtre haute. Les navigateurs sans requêtes de conteneur
retrouvent l'ancien comportement (`height: 97%`), vérifié sans collision.

**Le seuil d'empilement est à 1240 px**, et non 900. Le titre plafonne à 15ch,
soit 600 px à la taille maximale : à 1080 px de fenêtre il occupe déjà 58 % de
la colonne, et le dessin en demande 43 % — ils se touchaient.

### En arabe, le phare passe à gauche

Le texte part de la droite, le phare va donc du côté opposé. Le DESSIN n'est
pas retourné pour autant : la charte l'interdit, et un phare en miroir
balaierait à contresens. Seule sa position change.

Le dessin n'étant pas centré dans son image — il occupe 25,9 → 69,5 % en
largeur, la lanterne à 36,98 % — épingler la lanterne en miroir ne met pas le
dessin en miroir. Le film est donc ancré par sa droite et décalé de 41,56 % de
sa largeur, soit 30,52 % (bord droit du dessin) + 11,04 % (écart
lanterne-dessin). Vérifié : la composition est symétrique au pixel près.

> **L'arabe demande plus de place.** Le titre garde `max-width: 15ch`, mais en
> arabe il ATTEINT ce plafond, alors qu'en anglais il ne l'atteint jamais : les
> mots arabes sont longs, et la plus longue ligne anglaise (« media
> monitoring ») s'arrête à 561 px pour un plafond de 720. La colonne est donc
> ~160 px plus large en arabe, de quoi mordre le dessin de 62 à 68 px à toutes
> les tailles.
>
> Le film est donc **ancré par le bord du dessin**, pas par la lanterne :
> `right: calc(var(--title-ch) * 1ch + var(--film-gap))`, avec un décalage de
> 30,52 % — la distance du bord droit du dessin au bord droit de l'image — qui
> annule la taille du film. L'écart au texte reste de 45 px quelle que soit
> cette taille, et le dessin grandit vers la gauche. `font-size` reprend celle
> du titre pour que `ch` s'y mesure dans la même police à la même taille :
> l'écart suit le titre même si les métriques de Plex Sans Arabic ne sont pas
> celles qu'on suppose.
>
> Le plafond de taille se mesure sur la **fenêtre**, pas sur la scène. La scène
> s'arrête à la colonne de texte ; la section, elle, va d'un bord à l'autre, et
> tout l'espace à gauche de la colonne était inutilisable sous l'ancienne
> mesure — le dessin rapetissait pour rien. Vérifié de 1241 à 2560 px : le
> dessin arabe fait 380 à 552 px contre 380 à 494 px en latin, donc égal ou
> plus grand dès 1376 px, avec le bord gauche toujours à l'écran (11 px au plus
> serré).

> **Le balayage change de moment.** Le faisceau part à 180° — plein gauche — et
> remonte vers 344°. En LTR le texte est à gauche du phare : il est balayé tout
> au début, à 2,35 s. En RTL il est à droite, et le faisceau ne l'atteint qu'en
> fin de course, quand il redescend de la verticale vers 344° — de 3,41 s
> (300°) à 4,1 s. Le passage de lumière est recalé dessus, et descend au lieu
> de monter.

**En pile, le film entre dans le flux**, entre la colonne et la bande du bas.
Le recouvrement devient impossible par construction au lieu d'être évité par un
calcul de pourcentages — c'est ce calcul qui, appliqué à la hauteur totale,
posait le film sur le texte suivant. La hauteur réservée est dérivée de
`--film-w` (`× 0,4172`, soit les 74,17 % du dessin rapportés au format 16:9),
donc les deux ne peuvent pas se désaccorder.

Une seule formule couvre toute la plage empilée — deux paliers faisaient
sauter le dessin de 475 à 357 px au passage du seuil, en plein
redimensionnement. Le dessin fait **92 % de la largeur d'écran**, et deux
plafonds le retiennent ailleurs : 1330 px passé 630 px de large, et 168vh pour
qu'un téléphone COUCHÉ n'en reçoive pas un plus haut que l'écran. Ce dernier
vient de la contrainte réelle — le dessin fait 0,4172 de la largeur du film, et
on lui accorde au plus 70 % de la hauteur d'écran.

> En paysage, le dessin rétrécit d'environ 45 %. Ce n'est pas une perte : sans
> ce plafond il mesurait 481 px de haut sur un écran de 375, soit **128 % de la
> hauteur visible** — le logo seul dépassait l'écran.

Les deux écarts, au-dessus et en dessous, sont posés sur la scène
(`margin-block`, 36 à 64 px) et non un de chaque côté : le dessin touchait
presque les boutons au-dessus (20 px) pendant que la bande du bas gardait ses
36 px. Les marges ne fusionnent pas entre éléments flex, celle de la bande est
donc remise à zéro — sans quoi l'écart du bas vaudrait le double.

> ⚠ **L'encre du film a été adaptée au fond sombre.** Le film ayant été composé
> pour finir sur du papier, son mot-symbole est un charbon qui tombe à 1,13:1
> sur le bleu-nuit, sa signature à 2,17:1. Quatre valeurs, invisibles. Elles
> passent aux équivalents clairs du signe fixe (12,3 à 15,6:1). **Tout le reste
> est intact** — la tour blanche était déjà à 18,4:1, la vague pâle à 11,9:1,
> et les ors n'ont pas bougé. Comme pour le signe, la dérivation reste à faire
> confirmer par le studio.

> Le passage de lumière est à `screen` 0,30, ce qui laisse le texte blanc à
> **7,7:1** sur le fond éclairé. À 0,42 on tombait à 5,2:1 pour un gain visuel
> nul.

### Le logo de l'éditeur

`harmony/` (hors dépôt) fournit l'icône et le mot-symbole, tracé et non
composé. `build-logo.mjs` en tire `src/components/logo/harmony.ts`, versionné.

Deux retouches, et deux seulement. L'id du masque (`clip0_16960_200`) est
préfixé — un id aussi générique entre en collision au premier autre export
Figma posé sur la même page. Et les tracés du mot passent de `white` à
`currentColor` : le rendu sur fond sombre est identique, mais la page peut le
poser ailleurs sans toucher au fichier. **L'or de l'icône n'est pas touché** —
c'est la couleur de la marque.

> Le logo est fait pour le fond SOMBRE : son or tombe à **1,38:1 sur le papier**
> de la page, contre 11,98:1 sur le bleu-nuit. La section 10 étant claire, le
> lockup y est posé sur une plaque sombre plutôt que recoloré. Le pied de page,
> déjà sombre, le reçoit tel quel.

> `direction: ltr` est forcé sur le lockup : un conteneur flex hérite du sens
> de lecture, et l'arabe aurait posé l'icône à droite du mot — une autre
> composition que celle qui a été livrée.

**Le signe, lui, ne bouge pas.** `SirajLogo` (en-tête, pied de page) est fixe.
Une seconde animation écrite à la main en serait une variante non livrée : deux
gestes différents pour une même marque.

## Retours de relecture — ce qui est fait, ce qui ne l'est pas

### Corrigé

|                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| « Le logo coupe sur J »                   | Le bord droit du dessin tombait à **1 px** de la colonne de texte. Derrière : le titre plafonne à 15ch (~720 px) et le dessin en demandait ~515 — la colonne n'en fait que 1168. L'anglais n'y échappait que parce que sa plus longue ligne s'arrête à 561 px ; une langue qui remplit sa boîte serait passée dessous. Le film s'ancre désormais sur le BORD DU DESSIN, à distance fixe du titre (en `ch`, mesuré dans la police du titre), et se plafonne sur la fenêtre. ≥ 40 px du bord d'écran partout, et plus grand à 1920 qu'avant. |
| « Demander un pilote coupe dans le menu » | La barre est `position: sticky` : le panneau l'est donc aussi, et tout ce qui dépassait la fenêtre restait **hors d'atteinte** — impossible de faire défiler jusqu'au bouton. Hauteur bornée en `dvh` (et non `vh`, qui ignore la barre d'adresse repliable) + défilement interne + marge basse pour les encoches.                                                                                                                                                                                                                         |
| Siège annoncé à Casablanca                | **harmony.ma indique Rabat** — Villa n° 14, rue Annassime, Hay Riad. Corrigé dans le repère du hero et le pied de page, dans les trois langues.                                                                                                                                                                                                                                                                                                                                                                                            |
| Pas de bloc « à propos »                  | Section 10, **L'éditeur**, juste avant la demande de pilote : pour un achat public, savoir à qui l'on s'adresse précède la décision de s'adresser à lui. Chiffres et adresses repris de harmony.ma et **attribués** comme tels. Lien ajouté dans la navigation.                                                                                                                                                                                                                                                                            |
| Déclaration CNDP                          | Les mentions loi 09-08 manquaient sous le formulaire : responsable, finalité, conservation, droits. Ajoutées. Le numéro de déclaration est dans `config.ts` et **ne s'affiche que s'il existe** — on ne publie pas un numéro qu'on n'a pas.                                                                                                                                                                                                                                                                                                |

### Non corrigé, et pourquoi

> ⚠ **Aucune preuve sociale.** C'est exact, et cela ne se corrige pas en
> écrivant du code : il faut des logos clients, un témoignage ou une référence
> nommée, c'est-à-dire des faits. En inventer serait un faux. Les notes
> d'intervention du deck précisent par ailleurs que toute référence nommée est
> **soumise à l'accord du client**.
>
> Les deux sections existent maintenant, **vides** : 11 Références et
> 12 Témoignages. Elles attendent `CLIENT_LOGOS` et `TESTIMONIALS` dans
> `src/proof.ts`.

### Les sections de preuve sociale

`src/proof.ts` tient les deux tableaux, vides, et un interrupteur :

| État           | Production                  | Développement                      |
| -------------- | --------------------------- | ---------------------------------- |
| Tableau vide   | **La section n'existe pas** | Gabarit visible, hachuré et marqué |
| Tableau rempli | La section s'affiche        | La section s'affiche               |

Il n'y a donc **aucun chemin** par lequel un gabarit atteigne le public. Le
gabarit est placé derrière `SHOW_PLACEHOLDERS` seul, et non derrière une
condition mixte : la constante étant statiquement fausse en production, le
compilateur supprime la branche entière. Vérifié sur le bundle publié — aucune
des chaînes du gabarit n'y subsiste.

`VITE_SHOW_PLACEHOLDERS=1` force l'affichage, pour faire relire une
préversion. **Ne jamais poser cette variable sur l'environnement Netlify de
production.**

> Le gabarit des témoignages montre les CHAMPS à recueillir — citation, nom,
> fonction, organisation — et rien d'autre. Pas de fausse citation, même en
> maquette : elle serait attribuée à une personne nommée.

> Les logos clients vont dans `public/logos/`. La bande les ramène à une seule
> couleur et à une hauteur optique commune, et leur rend leurs couleurs au
> survol : sans cela, un logo rouge vif écrase ses voisins.

> ⚠ **Écart entre le site et le produit.** Le retour ouvre là-dessus et c'est
> le point le plus lourd : la page annonce « pilote terrain réalisé » et
> « usage réel sur des sujets de veille clients ». Tant que le produit ne les
> soutient pas, ces phrases sont un risque commercial — et, devant un acheteur
> public, un risque tout court. Le correctif n'est pas technique : soit le
> produit rattrape la page, soit la page redescend au niveau du produit. La
> seconde option se fait en une heure, sur les sections 05 et 06.

---

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

|                                 |                                                                            |
| ------------------------------- | -------------------------------------------------------------------------- |
| Polices auto-hébergées          | voir ci-dessus — le point le plus important                                |
| Encre du lockup sur fond sombre | variante déduite par `build-logo.mjs` — faire valider par le studio        |
| Coordonnées commerciales        | `src/config.ts` — `contact@harmony.ma` est un emplacement                  |
| Domaine                         | `siraj360.ma` à réserver ; renseigner ensuite `Sitemap:` dans `robots.txt` |
| Formulaire Netlify              | activer _Forms_ dans les réglages du site après le premier déploiement     |
| Mentions légales / RGPD         | les deux liens du pied de page pointent vers une ancre de la page          |

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
│  ├─ logo/         SirajLogo + marks.ts (généré) + la chorégraphie
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
