# À vérifier — CH0904, chapitre 1

Points chimiques douteux, contradictoires, ou que je n'ai pas pu trancher seul. Chaque
entrée dit ce que disent tes notes, ce que fait le support interactif, et pourquoi.

> **Note du 23/09/2026 — mes propres erreurs.** Les points numérotés ci-dessous
> concernent la *chimie* : des endroits où je ne peux pas trancher seul. Ils ne doivent
> pas être confondus avec les **erreurs que j'avais introduites dans les supports** et
> que tu m'as signalées. Celles-là sont fautives, pas discutables : la liste complète
> (13 erreurs : 6 dessins faux, 7 valeurs numériques fausses) et leur correction sont
> dans la section **ERRATA** de `verification_stereo.md`. Elles sont toutes corrigées et
> revérifiées.

---

## 0. Un fichier source manque toujours

**Le PDF `CH0904_Chap1_Synthese_asymetrique_intro.pdf` (tes explications détaillées)
n'est pas dans le dépôt.** Il n'y a pas non plus de dossier `sources/`. J'ai aussi
cherché dans ton Google Drive : rien.

Ce que j'ai effectivement utilisé :

| Fichier | Rôle |
|---|---|
| `Cours 904 introduction.pdf` | tes notes manuscrites — **référence pour les structures** |
| `CamScanner.pdf` | la diapo des trois stratégies |
| **Procter**, *Asymmetric Synthesis* (OUP 1996) | référence principale pour le raisonnement |
| **Robinson**, *Organic Stereochemistry* (OCP 88) | topicité, faces Re/Si, stéréospécifique vs stéréosélectif |
| **Kirby**, *Stereoelectronic Effects* (OCP 36) | tension A(1,3), recouvrement orbitalaire |
| **Bochmann**, *Organometallics 2* (OCP 12) | *non utilisé ici* — voir ci-dessous |

**Note sur Bochmann.** Ce volume traite des complexes à liaison π métal–carbone
(carbonyles, alcènes, arènes, allyles…). Il ne contient **ni** Sharpless, **ni**
tartrate, **ni** époxydation : je l'ai vérifié par recherche plein texte. Il sera utile
pour le **chapitre 2** de ton cours (« transition metal-catalysed pathway »), pas pour
celui-ci.

Si tu peux redéposer le PDF d'explication, je compare mes conclusions aux tiennes.

---

## 1. « Le modèle de Halland » (page 1) — erreur de nom

**Tes notes :** « on obtient uniquement l'énolate cis, c'est le model de Halland ».

**Correct :** le modèle qui prédit la géométrie d'un énolate formé par déprotonation
avec une base encombrée est le **modèle d'Ireland** (Robert E. Ireland, 1976). Il
repose sur un état de transition cyclique à six chaînons dans lequel la tension
allylique A(1,3) décide de la géométrie. Il n'existe pas de « modèle de Halland » en
chimie des énolates — c'est très probablement une erreur d'écoute.

**Dans le support :** « modèle d'Ireland » partout, et un encadré orange signale la
divergence.

---

## 2. Produit incohérent en haut de la page 2 — erreur de dessin

**Tes notes :** le réactif et l'énolate sont dessinés avec l'auxiliaire de la
**noréphédrine** (Ph en C5, Me en C4, tous deux en pointillé, annotés S et R). Mais le
**produit** est redessiné avec un **isopropyle en gras** — c'est-à-dire l'auxiliaire du
valinol, celui de la page 1.

**Ce qui est incohérent :** l'auxiliaire ne change pas pendant la réaction.

**Ce qui est correct en revanche :** la stéréochimie du nouveau centre. Page 1 (iPr en
gras, vers l'avant) E est en **pointillé** ; page 2 (Ph et Me en pointillé, vers
l'arrière) E est en **gras**. C'est exactement ce que prévoit le modèle chélaté :
attaque **anti** au substituant de C4. Seul le squelette a été recopié de travers.

**Dans le support :** le produit de la voie noréphédrine est redessiné avec Me en C4 et
Ph en C5. Descripteurs vérifiés par RDKit (voir `verification_stereo.md`, § B) :
valinol → C4 = (S), Cα = **(R)** ; noréphédrine → (4R,5S), Cα = **(S)**.

**Confirmé par Procter**, §4, fig. 4.13 et tableau 4.2 : mêmes auxiliaires, mêmes
valeurs (98 % de d.e. avec PhCH₂Br pour le valinol, 96 % pour la noréphédrine).

---

## 3. Diagramme d'énergie de la page 4 — erreur de principe

**Tes notes :** le puits de P_S est nettement plus bas que celui de P_R.

**Correct :** P_S et P_R sont des **énantiomères**, donc de même énergie interne.
Leurs puits doivent être **exactement à la même hauteur**. C'est le cœur de l'argument :
puisque la thermodynamique ne peut rien départager, la sélectivité est nécessairement
**cinétique**, et elle vient uniquement de la différence de hauteur des deux **états de
transition**, qui sont diastéréoisomères.

Un diagramme où les produits sont à des énergies différentes décrit une réaction
diastéréosélective, pas énantiosélective.

**Confirmé par Procter**, figures 2.2 et 2.3 (p. 6) : les deux puits y sont bien au
même niveau, et la ligne pointillée marque l'égalité des deux ET dans le cas achiral.

**Dans le support :** diagramme corrigé, avec une ligne pointillée horizontale commune
aux deux puits, et un encadré orange qui signale la correction.

---

## 4. Signe de l'exponentielle (page 4) — pas une erreur, mais une ambiguïté

**Tes notes :** `[P_S]/[P_R] = k₁/k₂ = exp(−ΔΔG‡/RT)`.

Les deux écritures suivantes sont vraies et équivalentes :

| Convention | Définition de ΔΔG‡ | Formule |
|---|---|---|
| **signée** (tes notes) | ΔΔG‡ = ΔG‡_S − ΔG‡_R, qui peut être négatif | [P_S]/[P_R] = exp(−ΔΔG‡/RT) |
| **non signée** (le support) | ΔΔG‡ = ΔG‡(minoritaire) − ΔG‡(majoritaire) ≥ 0 | e.r. = k_maj/k_min = exp(+ΔΔG‡/RT) |

Contrôle de cohérence : si le chemin S est le plus rapide, ΔG‡_S < ΔG‡_R, donc
ΔΔG‡(signé) < 0, donc exp(−ΔΔG‡/RT) > 1, donc [P_S] > [P_R]. ✅

**Dans le support :** la convention utilisée est affichée sous le diagramme, avec le
rappel de la correspondance. R = 8,314 J·mol⁻¹·K⁻¹, T en kelvins.

**Point de vocabulaire, à confirmer :** tes notes écrivent `ΔΔG‡` et `ΔΔrG‡` sur la
même page. `ΔΔG‡` (différence d'enthalpies libres **d'activation**) est le terme
correct ici ; `ΔΔrG` désignerait une différence d'enthalpies libres **de réaction**,
qui vaut justement zéro entre deux énantiomères.

---

## 5. Face Si d'Ellman (page 2) — je n'ai pas pu le redémontrer

**Tes notes :** « Zimmerman-Traxler chelated transition state — addition on the Si face ».

**Ce que j'ai pu vérifier :** le raisonnement mécanistique est solide et reproductible.
Le magnésium tient à la fois le groupe R et l'oxygène du sulfinyle, ce qui referme un
cycle à six chaînons ; le tert-butyle, très volumineux, se place dans la position la
moins encombrée, ce qui oriente l'oxygène, donc le magnésium, donc le côté par lequel R
arrive sur le carbone. C'est ce que dit le support.

**Ce que je n'ai pas pu vérifier :** le descripteur **Si** lui-même. Déterminer une face
demande la géométrie **3D** du cycle — conformation chaise, position pseudo-axiale ou
pseudo-équatoriale du tert-butyle — qui n'est pas contenue dans un schéma dessiné à
plat. Avec les seules informations du dessin, on ne peut pas trancher entre Re et Si.

**Dans le support :** la face n'est pas nommée dans la figure ; elle est mentionnée dans
un encadré orange qui renvoie à cette note. **À confirmer avec ton enseignant.**

---

## 6. Charges Ti / DET (page 5) — confirmé, et voici le détail

Tu soupçonnais une inversion. Procter permet de trancher (§7, fig. 7.67–7.69,
p. 182–183) :

- Le complexe actif est un **dimère neutre**, de type Ti₂(tartrate)₂(OR)₂(OOtBu)…
- Le titane est au degré d'oxydation **+IV**, comme dans Ti(OiPr)₄ de départ. Il ne
  change jamais pendant le cycle : ce n'est pas une catalyse rédox.
- Le tartrate est un ligand **dianionique** : ses deux OH **alcooliques** sont
  déprotonés et liés au titane. Les deux esters éthyliques restent intacts et ne se
  coordonnent pas.

Donc : si ton dessin porte une charge **positive sur le tartrate** ou une charge
**négative sur le titane**, c'est bien inversé. Le tartrate est négatif (×2), le titane
est un cation Ti(IV) — et l'ensemble est neutre.

---

## 7. DIBAL → aldéhyde (page 1, annotation orange)

**Tes notes :** « si on voulait un aldéhyde il fallait utiliser du DIBAL ».

**Ce que dit Procter** (§4, fig. 4.14, p. 49) : pour obtenir l'aldéhyde à partir de
l'imide d'Evans, il ne propose **pas** DIBAL. Il passe par la réduction en alcool
(LiAlH₄ ou NaBH₄) suivie d'une **oxydation douce** (Py·SO₃ / DMSO). L'autre voie fiable
est l'amide de Weinreb.

Ce n'est pas que DIBAL soit impossible — un équivalent, à −78 °C, peut s'arrêter à
l'aldéhyde — mais c'est délicat, et la sur-réduction en alcool est fréquente.

**Dans le support :** la roue des clivages propose DIBAL **et** Weinreb, en signalant la
difficulté. **À confirmer :** est-ce que ton cours attend « DIBAL » comme réponse, ou
est-ce une simplification d'oral ?

---

## 8. Rapport tartrate / titane (page 5) — contradiction avec la littérature

**Tes notes :** L-(+)-DET **5 mol %**, Ti(OiPr)₄ **7,3 mol %**. J'ai vérifié les deux
chiffres en agrandissant le scan, ils sont parfaitement lisibles.

**Le problème :** cela fait un rapport tartrate : titane de **0,68 : 1**, donc un excès
de **titane**. Or Procter écrit, pour les conditions catalytiques (§7, fig. 7.51,
p. 175) : « *tartrate : Ti(OiPr)₄ ratio 1.1:1 to 1.2:1* », c'est-à-dire un léger excès
de **tartrate**.

**Pourquoi ce n'est pas un détail :** du titane sans tartrate reste un catalyseur
parfaitement actif pour l'époxydation — mais achiral. Il ouvre une **voie racémique
parallèle**, souvent plus rapide parce que moins encombrée, qui fait chuter l'e.e. Avec
un excès de titane on s'attendrait donc à un mauvais e.e., ce qui contredit les 96 %
annoncés sur la même ligne.

**Deux hypothèses :** soit les deux chiffres ont été intervertis en recopiant (7,3 de
DET pour 5 de Ti donnerait 1,46 : 1, cohérent), soit ils viennent d'un protocole
particulier que je ne connais pas. **À vérifier sur ton support de cours.**

Le support interactif enseigne le principe correct (tartrate en léger excès) et signale
la divergence par un encadré orange dans la section correspondante.

---

## 9. Structures que je n'ai pas pu lire avec certitude

- **(−)-spartéine (page 3).** J'ai reproduit fidèlement la **disposition** de ton dessin :
  quatre cycles à six chaînons soudés, deux azotes, un pont central en gras. Mais sur le
  scan, deux des liaisons centrales sont tracées d'un seul trait continu, ce qui masque
  probablement un sommet, et le pont en gras est difficile à décomposer. Le motif
  central de la spartéine est un **bicyclo[3.3.1]nonane**, ce qui suppose un atome de
  pont entre les deux têtes de pont ; je n'ai pas pu le confirmer sur l'image. Si tu as
  le dessin original net, je corrige. Le **schéma du complexe** sec-BuLi·spartéine est
  quant à lui volontairement symbolique (une « poche » chirale) : placer le lithium
  entre les deux azotes demanderait une vue 3D, et je préfère un schéma assumé à un
  dessin faussement précis.
- **Carbamate de Hoppe (page 3).** Le groupe porté par l'azote est bien un cycle à cinq
  chaînons O–CH₂–CH₂–N spiro-accolé à un cyclohexane (1,3-oxazolidine spiro). Le
  réactif canonique de Hoppe est plutôt le carbamate **« Cby »**
  (2,2,4,4-tétraméthyl-1,3-oxazolidine-3-carboxylate). Je reproduis **ce qui est
  dessiné**, mais il est possible que les quatre méthyles aient été remplacés par un
  spiro-cyclohexane, ou qu'il manque les méthyles en position 4. À confirmer.
- **Page 5, tableau de température.** Je lis « 0 °C, 4 h, 94 %, e.r. = 90:10 »,
  « −30 °C, 24 h, 92 %, e.r. = 95:5 » et « −78 °C, 120 h, 80 %, e.r. = 98,5:1,5 ». Le
  « 4 h » et le « 24 h » sont les moins nets. Bonne nouvelle : ces trois points
  s'alignent très bien sur un tracé d'Eyring (voir ci-dessous), ce qui suggère qu'ils
  sont corrects.

---

## 10. Ce que j'ai ajouté et qui ne vient pas de ton cours

Ces éléments sont des **compléments**, à valider si tu veux t'en servir en examen :

- **L'analyse d'Eyring des trois points de température** (section F du support). En
  traçant ln(e.r.) en fonction de 1/T sur tes trois points, on obtient une droite de
  bonne qualité : ln(e.r.) = 1336/T − 2,636, d'où **ΔΔH‡ ≈ +11,1 kJ·mol⁻¹** et
  **ΔΔS‡ ≈ +21,9 J·mol⁻¹·K⁻¹**. Interprétation : l'enthalpie favorise le bon
  énantiomère, l'entropie favorise le mauvais — c'est ce qui explique que ΔΔG‡ ne soit
  pas constant avec la température (il passe de 5,0 à 6,8 kJ·mol⁻¹ entre 0 et −78 °C).
  C'est un calcul standard, mais c'est **mon** calcul, pas celui de ton cours.
- **La formule d'interpolation des durées** (ln t = 2201/T − 6,346) : purement empirique,
  ajustée sur tes trois points. Elle n'a pas de signification physique profonde et sert
  seulement à faire varier le curseur de façon réaliste.

---

*Dernière mise à jour : support complet (sections A à H), après lecture des quatre
ouvrages déposés sur `main`.*
