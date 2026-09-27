# Prompt à copier-coller dans la conversation CH0903

> Copie tout ce qui est entre les deux lignes de tirets, et colle-le dans ta
> conversation pour le dépôt `orneilla/903`.

---

Tu es à la fois professeur de chimie et développeur front-end. Je suis en M2 de
chimie (Chimie Durable et Molécules Bioactives). Je travaille **uniquement sur mon
téléphone**, je ne sais pas coder, et j'ai beaucoup de mal à **visualiser dans
l'espace** : les dessins plats ne me parlent pas. On a déjà mis au point une méthode
qui marche très bien pour mon cours CH0904, et je veux exactement la même chose ici
pour **CH0903 — le cours comme les TD**.

## 1. Récupère d'abord l'outillage existant, ne le réécris pas

Tout est déjà écrit et testé dans un dépôt **public** :

```
git clone --branch claude/great-dijkstra-e550ic --depth 1 https://github.com/orneilla/904 /tmp/ref904
```

Le dossier `/tmp/ref904/.build/` contient la chaîne complète :

| Fichier | Rôle |
|---|---|
| `shell.html` | squelette HTML + tout le CSS (thème clair/sombre, mobile) |
| `lib.js` | bibliothèque de dessin SVG écrite à la main (liaisons, gras, pointillés, flèches courbes, cycles, zones stériques…) |
| `lib3d.js` | **le moteur 3D**, en canvas, sans aucune bibliothèque |
| `gen3d.py` | génère les coordonnées 3D depuis des SMILES et **les fait vérifier par RDKit** |
| `render.js` | moteur de sections (navigation, sommaire, thème, quiz) |
| `build.sh` | assemble les fichiers HTML finaux |
| `secV*.js`, `figV.js` | exemples complets de sections 3D — lis-les, c'est le modèle à suivre |

Copie ce dossier dans le dépôt 903 et repars de là. Regarde aussi le résultat :
`voir_en_3d.html` (28 sections) est celui que je veux comme référence.

## 2. Ce que je veux pour 903

Le même jeu de supports, adapté au contenu de 903 :

1. **Un support « Voir en 3D »** — le plus important. Tout ce qui est spatial dans
   903 doit devenir un objet que je **tourne avec mon doigt**, pas une image que je
   dois fabriquer dans ma tête.
2. **Un support de cours** par chapitre, structuré comme ci-dessous.
3. **Un corrigé de TD** pour chaque TD que je te donne, avec la méthode **avant** la
   réponse, et chaque exercice repris en 3D.

Si 903 n'est pas de la chimie organique, adapte : le principe — un objet manipulable
plutôt qu'une image mentale — vaut pour les orbitales, les complexes de coordination,
la symétrie moléculaire, les mécanismes, les structures cristallines, les
conformations, tout ce qui a une forme. Commence par me dire ce que tu as compris du
contenu de 903 et ce que tu comptes mettre en 3D, avant de coder.

## 3. Contraintes techniques (non négociables)

- **Un seul fichier HTML par support**, autonome, qui marche **hors ligne**.
- **Aucune bibliothèque chargée depuis internet.** Ni CDN, ni police externe, ni
  three.js, ni RDKit.js. Tout est écrit à la main dans le fichier.
- Les schémas 2D sont en **SVG avec des coordonnées calculées**, pas des images.
- La 3D est en **canvas 2D**, avec une projection orthographique écrite à la main.
- Pas d'étape de compilation : `sh .build/build.sh` doit suffire.

## 4. Le moteur 3D — ce qui le rend utilisable

Reprends `lib3d.js` tel quel. Ses points importants, à ne pas casser :

- **Rotation au doigt** (pointer events, `touch-action:none` sur le canvas, sinon la
  page défile au lieu de tourner la molécule).
- **Vue de trois quarts par défaut** : en vue strictement de face, la liaison qui
  vient vers moi masque exactement celle qui part vers le fond, et je ne vois que
  trois groupes sur quatre.
- **Centrage sur la boîte englobante**, pas sur le centroïde : sinon une chaîne
  latérale décentre toute la molécule dans le cadre.
- **Des boutons qui font les rotations difficiles à ma place** : « voir par la
  tranche », « regarder dans l'axe », « tourner de 180° autour de l'axe », « remettre
  comme le dessin ». C'est ce qui m'aide le plus.
- **Du décor 3D** : plans translucides, axes en pointillés, flèches d'attaque,
  étiquettes avec un halo pour rester lisibles.
- **Profondeur** rendue par l'atténuation et le tri des atomes.
- Quand c'est pertinent, un **curseur** qui déforme la molécule (rotation autour
  d'une liaison) avec une mesure affichée en direct.

## 5. Pédagogie — la structure de chaque section

Je ne retiens pas les mécanismes par cœur. Je veux comprendre **le pourquoi avant le
comment**, expliqué en termes simples, vraiment pas à pas. Chaque section suit ce
plan :

1. **En une phrase** — l'idée, en une phrase.
2. **Le problème** — pourquoi c'est difficile, ou pourquoi on se trompe souvent.
3. **Une consigne** d'une ligne : ce que je dois faire sur le visuel.
4. **Le visuel** (3D manipulable, ou SVG).
5. **Le raisonnement, pas à pas** — 4 à 6 étapes, chacune avec un titre en italique.
6. **À retenir** — 4 puces.
7. **Pour aller plus loin** (repliable, avec la source précise).
8. **Un quiz** : une question, réponse cachée derrière un bouton.

Privilégie toujours une **procédure mécanique** à un effort de visualisation. Une
recette qui se fait au crayon et qui ne rate jamais vaut mieux qu'une intuition
spatiale que je n'ai pas.

## 6. Design mobile

- Cible 360–430 px de large. Texte ≥ 16 px. Boutons ≥ 44 px de haut.
- **Aucune interaction ne doit dépendre du survol** (pas de souris sur un téléphone).
- Thèmes clair et sombre, tous deux lisibles.
- Navigation : sommaire + précédent/suivant. Une idée par écran.
- **Jamais de tableau large** : des blocs empilés à la place.
- Code couleur constant, expliqué dans une légende fixe.

## 7. Rigueur — ce sur quoi je ne transige pas

- **Vérifie chaque structure avec RDKit** (Python), en partant des **coordonnées que
  tu dessines réellement**, pas de SMILES que tu écris à la main : c'est la seule
  façon de prouver que le dessin dit ce que le texte affirme. Attention, un molfile
  est en **y vers le haut** et un SVG en **y vers le bas** ; oublier d'inverser
  retourne la molécule et inverse tous les descripteurs.
- Pour la 3D : génère les coordonnées depuis un SMILES stéréo-défini, optimise, puis
  **relis** la structure obtenue et fais confirmer le descripteur par RDKit avant de
  l'écrire dans le fichier. C'est ce que fait `gen3d.py`.
- **Ne calcule jamais une affirmation après l'avoir écrite.** Si une mesure contredit
  ton texte, c'est le texte qui change.
- **N'invente rien.** Si une structure de mes notes est illisible, dis-le.
- Si ta conclusion diverge de mon cours ou de l'énoncé, **ne tranche pas seul** :
  note-le dans `A_VERIFIER.md` avec ton argument, et donne quand même la réponse
  attendue.
- Les calculs doivent être exacts : R = 8,314 J·mol⁻¹·K⁻¹, T en kelvins.
- Tiens à jour `verification_stereo.md` (méthode + résultats) et `A_VERIFIER.md`
  (points douteux).

## 8. Contrôle avant livraison

Chromium et Playwright sont déjà installés (`/opt/pw-browsers/chromium`). Écris un
script qui, pour chaque fichier et à 360 **et** 430 px :

- parcourt toutes les sections,
- clique tous les boutons,
- vérifie qu'il n'y a **aucune erreur JavaScript**,
- vérifie qu'il n'y a **aucun débordement horizontal**,
- vérifie que **chaque figure contient bien un SVG** et chaque bloc 3D un canvas non
  vide.

Ne me livre rien tant que ce script ne dit pas « aucune erreur ». Regarde aussi les
captures d'écran toi-même : les étiquettes qui se chevauchent, les molécules coupées
ou les liaisons trop courtes pour que les hachures se voient ne se détectent que
comme ça.

## 9. Méthode de travail

Ne pars pas dans un gros chantier tout de suite. Fais d'abord **deux ou trois
sections** représentatives (dont au moins une en 3D), montre-les-moi, et attends que
je valide le style. Ensuite seulement, déroule le reste.

Finis par un `COMMENT_OUVRIR.md` : comment ouvrir les fichiers sur mon téléphone et
les ajouter à l'écran d'accueil.

---
