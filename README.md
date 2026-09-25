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

### Les fichiers de marque

Toute la livraison de design tient dans `brand/`, **hors dépôt** comme la
charte. Les fichiers générés, eux, sont versionnés : le build ne dépend pas
d'un dossier de livraison.

```
brand/
  harmony/            icon.svg, wordmark.svg
  siraj/
    latin/            animation.html, svg/, png/
    arabic/           animation.html, svg/, png/
```

Les noms sont normalisés : `symbol-transparent.svg`, `compact-white-512.png`,
`animation.html`. La livraison mélangeait `SIRAJ_`, `SIRAJ_AR_`, `white` et
`blanc`, un dossier `Siraj_Arabe` imbriqué et un dossier `harmony` à la racine ;
l'écriture est maintenant portée par le CHEMIN, pas par le nom de fichier, et
il n'y a qu'une langue de nommage.

`npm run logo` produit :

|                                  |                                          |
| -------------------------------- | ---------------------------------------- |
| `src/components/logo/marks.ts`   | les signes, par écriture et par variante |
| `src/components/logo/harmony.ts` | le logo de l'éditeur                     |
| `public/fonts/*.woff2`           | les polices que les films composent      |

Le script fait quatre choses sur chaque SVG, chacune nécessaire :

|                       |                                                                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Métadonnées           | chaque fichier embarque un manifeste C2PA en base64 — près de 8 ko sur 17, qu'aucun navigateur ne lit                                                                                                                                                                 |
| Identifiants          | remplacés par un jeton `%ID%` que **chaque instance** résout à l'exécution. Un préfixe fixe suffisait tant qu'un lockup ne paraissait qu'une fois ; l'en-tête et le pied de page affichent le même, et ses ids de dégradés se retrouvaient en double dans le document |
| Classes               | chaque groupe nommé reçoit une classe stable (`sj-beam`, `sj-lantern`…)                                                                                                                                                                                               |
| Encre sur fond sombre | voir la réserve ci-dessous                                                                                                                                                                                                                                            |

### Deux écritures

La livraison fournit le lockup en latin (SIRAJ) et en arabe (سراج). L'écriture
suit la langue de la page, sans que l'appelant ait à s'en occuper.

**Le signe est identique dans les deux** — les fichiers `symbol-*` sont au même
octet près : un phare n'a pas d'écriture. Seuls `compact` et `full` diffèrent.

> Les deux lockups n'ont **pas le même rapport** : 2,87 en latin, 2,04 en arabe.
> Les dimensionner par la largeur donnait deux hauteurs différentes au même
> endroit — dans la barre de navigation, l'arabe dépassait de 41 %. C'est donc
> la HAUTEUR qui est posée aux emplacements, et la largeur qui suit.

> ✅ **Le mot-symbole latin est DESSINÉ.** La charte interdit de le recomposer
> dans une police — « c'est un dessin » — et la page, faute de fichier, le
> simulait en Sora dans l'en-tête. Chaque lettre est maintenant un tracé
> (`sj-letter-S`, `-I`, `-R`, `-A`, `-J`). Le contournement est levé.

> ⚠ **Le mot-symbole arabe, lui, est COMPOSÉ** en Reem Kufi, dans le film comme
> dans le lockup. C'est le choix du studio, pas le nôtre : la livraison le fait
> ainsi. L'arabe étant une écriture liée, il n'a pas de lettres séparables.

**Le point du ج est en or** — la signature de la marque, comme le triangle d'or
dans le A latin. Le mot étant composé et non tracé, on ne peut pas viser un
tracé nommé : le film RASTÉRISE le mot, cherche ses composantes connexes, et
identifie le point comme la petite composante isolée qui tombe dans la boîte du
corps. Les coordonnées obtenues sont relatives au corps de la fonte, donc
valables à n'importe quelle échelle. Le résultat est mis en cache — mais
seulement une fois Reem Kufi réellement chargée, sans quoi on mémoriserait la
position du point dans la police de repli.

> Les signes arabes livrés sont **exportés depuis le film** : leurs
> identifiants sont ceux de l'animation (`sr-beam`, `sr-tower-clip`,
> `sr-jeem-dot`) et non des noms sémantiques, et ils portent donc moins de
> classes structurelles que les latins. Leurs volets sont vérifiés **à leur
> valeur finale** — ce sont bien des logos posés, pas des images arrêtées en
> cours d'animation.

> ⚠ **L'encre sur fond sombre est DÉDUITE, à faire confirmer.** La livraison ne
> contient que des lockups pour fond clair : `white` ne fait qu'ajouter un
> rectangle blanc derrière le même dessin. Or l'encre du mot-symbole est un
> charbon `#17191C`, qui tombe à **1,13:1** sur le bleu-nuit de la page.
> `build-logo.mjs` en dérive une version claire en remappant cinq valeurs de
> gris. **Le signe seul n'est pas concerné** : il n'en porte aucune.

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

**Le film existe en deux écritures.** `script="arabic"` compose le mot-symbole
en Reem Kufi et les deux lignes en Tajawal, décale la composition de (110, -40)
— l'arabe est plus large et moins haut que SIRAJ, son centre optique n'est pas
au même endroit — et remplace la montée lettre à lettre par un volet qui
découvre le mot **de droite à gauche**, dans le sens de lecture. Tout le reste
du film est identique : mêmes repères, mêmes durées, mêmes courbes.

> Le mot arabe étant composé et non tracé, sa boîte dépend de la fonte : elle
> est MESURÉE au canvas, et les deux lignes se placent sous sa base réelle.
> D'où la re-mesure une fois `document.fonts` prête — sans elle, tout se cale
> sur la police de repli.

**Les polices.** Les films composent leur texte en Jost (latin), Reem Kufi et
Tajawal (arabe), et embarquent les fontes dans leur bundle. `build-logo.mjs` les en extrait vers `public/fonts/`.
Seuls les sous-ensembles utiles sont servis : les textes latins n'ont pas un
caractère cyrillique, les textes arabes pas un caractère latin. Les reprendre
là plutôt que chez Google évite de faire dépendre d'un serveur américain une
page qui vend l'hébergement souverain.

|                   |                  |                                                                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------- |
| Jost 500          | latin, latin-ext | déclarée aussi pour 600, que le navigateur **synthétise** — c'est ce que fait le film |
| Reem Kufi 700     | arabe            | le mot-symbole                                                                        |
| Tajawal 500 / 700 | arabe            | les deux lignes                                                                       |

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

### Le pied de page porte les coordonnées

Mobiles, téléphone et fax, e-mails, site, et les deux adresses avec leur lien
d'itinéraire. Les numéros sont **affichés avec leurs espaces et composés sans**
— un `tel:` n'en accepte aucun — et ne se coupent jamais en fin de ligne : un
fixe marocain sur deux lignes ne se compose plus.

> Les adresses ne figurent plus dans la section 10. La répéter ici et là-bas
> serait un doublon sur une même page : **la section dit QUI est l'éditeur, le
> pied de page dit COMMENT LE JOINDRE.** Les domaines de la section 10 passent
> donc en 2 × 2 sur toute la largeur.

Le lien d'itinéraire construit une recherche **par adresse**, sans coordonnées :
on ne publie pas une position qu'on n'a pas relevée, et une recherche par
adresse reste juste si le bâtiment se déplace dans la base cartographique.

### Preuve sociale : supprimée, et pourquoi c'est encore ouvert

Les sections Références et Témoignages ont été retirées. Elles n'avaient que du
contenu de démonstration, et une section « nos clients » vide est pire que pas
de section du tout.

> ⚠ **Le reproche de la relecture tient toujours** : la page annonce « pilote
> terrain réalisé » et « usage réel sur des sujets de veille clients » sans rien
> montrer. Le retirer ne le règle pas, cela le rend seulement moins visible.
> Trois voies, par ordre de force : une référence nommée avec accord écrit ; un
> cas anonymisé mais chiffré (« une institution publique marocaine, pilote de
> six mois, N sources ») ; ou, à défaut, redescendre les affirmations des
> sections 05 et 06 au niveau de ce que le produit soutient.

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
