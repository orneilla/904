# Vérifications stéréochimiques — CH0904, chapitre 1

Toutes les vérifications ci-dessous ont été faites avec **RDKit** (`rdkit 2026.3.6`,
module `rdCIPLabeler`, qui implémente les règles CIP 2013 complètes).

## Méthode

Je n'ai **pas** vérifié des SMILES écrits à la main : cela ne prouverait rien sur ce
qui est réellement dessiné. La méthode est la suivante :

1. On relève les **coordonnées exactes** de chaque atome telles qu'elles sont écrites
   dans le fichier `chap1_synthese_asymetrique.html` (repère SVG, **y vers le bas**).
2. On relève de la même façon les liaisons et leur type (normale / gras / pointillé).
3. On construit un **molfile V2000** avec ces coordonnées, en changeant le signe de y
   (un molfile est en convention **y vers le haut**).
4. RDKit lit le molfile et attribue les descripteurs CIP.

Le SMILES canonique donné ci-dessous est donc *le résultat* de la lecture du dessin,
pas une donnée d'entrée.

> ⚠️ **Piège rencontré et corrigé.** Un premier jeu de vérifications avait été écrit
> avec des coordonnées en convention SVG passées telles quelles à RDKit : cela revient
> à lire le miroir vertical de la molécule, donc à inverser tous les descripteurs.
> Le témoin utilisé pour lever le doute est le butan-2-ol (OH en gras vers le haut,
> CH₃ en bas à gauche, Et en bas à droite = (R) à la main) ; RDKit ne retrouve (R)
> que si y est orienté vers le haut. Toutes les valeurs ci-dessous respectent cette
> convention.

> ⚠️ **Deuxième piège, corrigé dans le dessin lui-même.** La première version du
> carton « carbone stéréogène » de la section 0b utilisait une **croix** : deux
> liaisons horizontales dans le plan, une liaison en gras vers le haut, une en
> pointillé vers le bas. Cette figure est **géométriquement dégénérée** : les quatre
> substituants sont coplanaires (deux paires antipodales), le volume signé vaut
> exactement 0 et aucun descripteur ne peut en être déduit. RDKit renvoyait d'ailleurs
> « aucun descripteur ». Le carton a été redessiné avec deux liaisons en haut-gauche
> et haut-droite plus une liaison gras/pointillé vers le bas (H implicite) : cette
> disposition est non dégénérée.

---

## A. Auxiliaires tels qu'ils sont dessinés

| Figure | SMILES lu par RDKit | Descripteurs | Attendu (notes) | Verdict |
|---|---|---|---|---|
| `oxaz(aux:'ipr', wedge:true)` — auxiliaire du valinol | `CC(C)[C@H]1COC(=O)N1` | C4 = **S** | « S » écrit sur le dessin | ✅ |
| `oxaz(aux:'noreph', wedge:false)` — auxiliaire de la noréphédrine | `C[C@H]1NC(=O)O[C@H]1c1ccccc1` | C4 = **R**, C5 = **S** | « R » sur C4-Me, « S » sur C5-Ph | ✅ |

Les deux correspondent bien aux composés du commerce :
(S)-4-isopropyl-1,3-oxazolidin-2-one (issue du (S)-valinol, donc de la L-valine) et
(4R,5S)-4-méthyl-5-phényl-1,3-oxazolidin-2-one (issue de la (1S,2R)-noréphédrine).

## B. Produits d'alkylation d'Evans (E = benzyle)

| Figure | SMILES lu par RDKit | Descripteurs |
|---|---|---|
| Valinol, E en **pointillé** (face arrière) | `CC(C)[C@H]1COC(=O)N1C(=O)[C@H](C)Cc1ccccc1` | C4 = **S**, Cα = **R** |
| Noréphédrine, E en **gras** (face avant) | `C[C@@H]1[C@H](c2ccccc2)OC(=O)N1C(=O)[C@@H](C)Cc1ccccc1` | C4 = **R**, C5 = **S**, Cα = **S** |

Ces deux résultats sont cohérents avec le modèle chélaté dessiné dans les notes :
l'électrophile arrive **anti** au substituant de C4, donc en pointillé quand l'iPr est
en gras et en gras quand Me/Ph sont en pointillé. Les deux Cα obtenus sont bien de
configurations opposées ((R) et (S)), ce qui est le but de la section « valinol vs
noréphédrine ».

**Contrôle indépendant, à la main** (repère x à droite, y vers le haut, z vers
l'observateur ; signe du déterminant calibré sur (R)-CHFClBr) :
pour C4 du dessin valinol, les vecteurs sont N (107,8°), C5 (218°), iPr (294,8°), H
vers l'arrière ; la séquence 1→2→3 tourne dans le sens trigonométrique ⇒ **S**. Même
résultat que RDKit.

**Propagation après clivage** (LiAlH₄ ou LiOOH) : le groupe de priorité 1 reste le
carbone porteur d'oxygènes (C(=O)N → CH₂OH ou → CO₂H), et les priorités 2, 3, 4 ne
changent pas d'ordre. Le descripteur est donc conservé : à partir du valinol on obtient
l'acide **(R)**-2-méthyl-3-phénylpropanoïque (`C[C@H](Cc1ccccc1)C(=O)O`) et l'alcool
**(R)**-2-méthyl-3-phénylpropan-1-ol (`C[C@@H](CO)Cc1ccccc1`).

## C. Géométrie de l'énolate (section « énolate Z ou E »)

| Bouton | SMILES lu par RDKit | Double liaison |
|---|---|---|
| « Énolate Z (cis) » | `C/C=C(\O)N1C(=O)OC[C@@H]1C(C)C` | **Z** |
| « Énolate E (trans) » | `C/C=C(/O)N1C(=O)OC[C@@H]1C(C)C` | **E** |

Le dessin du bouton « Z » est donc bien un énolate Z(O) : O⊖ et CH₃ du même côté,
c'est-à-dire CH₃ à l'opposé de l'azote de l'oxazolidinone. C'est la géométrie annoncée
dans les notes (« cis enolate / Z enolate »).

## D. Carton de la section 0b (acide 2-méthyl-3-phénylpropanoïque)

| Disposition dessinée | Descripteur |
|---|---|
| HO₂C haut-gauche, CH₃ haut-droite, CH₂Ph **gras** vers le bas | **S** |
| HO₂C haut-gauche, CH₃ haut-droite, CH₂Ph **pointillé** vers le bas | **R** |
| CH₃ haut-gauche, CO₂H haut-droite, CH₂Ph **gras** vers le bas | **R** |

Les deux structures du panneau « réactif ou catalyseur » sont donc bien images l'une
de l'autre dans un miroir vertical, et les étiquettes (S) / (R) affichées sont exactes.

Pour le panneau « avec auxiliaire », le groupe de gauche est le lien acyle vers
l'oxazolidinone : ses atomes de première sphère sont (O, O, N), donc il garde la
priorité 1 exactement comme CO₂H. Les descripteurs du carton sont donc les mêmes :
CH₂Ph en pointillé = **(R)** (majoritaire, voie valinol), CH₂Ph en gras = **(S)**.

---

## Script de vérification

Le script complet est reproductible :

```bash
pip install rdkit
python3 verif.py     # voir le dépôt de travail ; il regénère le tableau ci-dessus
```

Les sections 2, 3, 4 et 6 (Ellman, Hoppe, TADDOL, Sharpless) seront ajoutées
à ce fichier lors de la deuxième vague de visuels.
