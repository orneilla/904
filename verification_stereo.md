# Vérifications stéréochimiques — CH0904, chapitre 1

Toutes les vérifications ci-dessous ont été faites avec **RDKit** (`rdkit 2026.3.6`,
module `rdCIPLabeler`, qui implémente les règles CIP complètes). Le script complet est
`verif.py`, à la racine du dépôt :

```bash
pip install rdkit
python3 verif.py
```

## Méthode

Je n'ai **pas** vérifié des SMILES écrits à la main : cela ne prouverait rien sur ce
qui est réellement dessiné dans le support. La méthode est la suivante :

1. On relève les **coordonnées exactes** de chaque atome telles qu'elles sont écrites
   dans `chap1_synthese_asymetrique.html` (repère SVG, **y vers le bas**).
2. On relève de la même façon les liaisons et leur type (normale / gras / pointillé).
3. On construit un **molfile V2000** avec ces coordonnées, en changeant le signe de y
   (un molfile est en convention **y vers le haut**).
4. RDKit lit le molfile et attribue les descripteurs CIP.

Le SMILES canonique donné ci-dessous est donc *le résultat* de la lecture du dessin,
pas une donnée d'entrée.

### Deux pièges rencontrés en route

> ⚠️ **Convention d'axe.** Un premier jeu de vérifications avait été écrit avec des
> coordonnées SVG passées telles quelles à RDKit : cela revient à lui faire lire le
> miroir vertical de la molécule, donc à inverser tous les descripteurs. Le témoin
> utilisé pour lever le doute est le butan-2-ol (OH en gras vers le haut, CH₃ en bas à
> gauche, Et en bas à droite = (R) à la main) ; RDKit ne retrouve (R) que si y est
> orienté vers le haut.

> ⚠️ **Dessin dégénéré.** La première version du carton « carbone stéréogène » de la
> section 0b utilisait une **croix** : deux liaisons horizontales dans le plan, une
> liaison en gras vers le haut, une en pointillé vers le bas. Cette figure est
> **géométriquement dégénérée** — les quatre substituants sont alors coplanaires (deux
> paires antipodales), le volume signé vaut exactement 0, et aucun descripteur ne peut
> en être déduit. RDKit renvoyait d'ailleurs « aucun descripteur ». Le carton a été
> redessiné en **Y** (deux liaisons vers le haut, une liaison gras/pointillé vers le
> bas, H implicite) : cette disposition est non dégénérée.
>
> À retenir pour tes propres schémas : une croix avec un gras et un pointillé opposés
> est lisible par un humain mais formellement ambiguë. Le Y est toujours correct.

---

## A. Auxiliaires d'Evans, tels qu'ils sont dessinés

| Figure | SMILES lu par RDKit | Descripteurs | Attendu | Verdict |
|---|---|---|---|---|
| `oxaz(aux:'ipr', wedge:true)` — valinol | `CC(C)[C@H]1COC(=O)N1` | C4 = **S** | « S » sur le dessin des notes | ✅ |
| `oxaz(aux:'noreph', wedge:false)` — noréphédrine | `C[C@H]1NC(=O)O[C@H]1c1ccccc1` | C4 = **R**, C5 = **S** | « R » sur C4-Me, « S » sur C5-Ph | ✅ |

Ce sont bien les composés du commerce : (S)-4-isopropyl-1,3-oxazolidin-2-one (issue du
(S)-valinol, donc de la L-valine) et (4R,5S)-4-méthyl-5-phényl-1,3-oxazolidin-2-one
(issue de la (1S,2R)-noréphédrine).

## B. Produits d'alkylation d'Evans (E = benzyle)

| Figure | SMILES lu par RDKit | Descripteurs |
|---|---|---|
| Valinol, E en **pointillé** | `CC(C)[C@H]1COC(=O)N1C(=O)[C@H](C)Cc1ccccc1` | C4 = **S**, Cα = **R** |
| Noréphédrine, E en **gras** | `C[C@@H]1[C@H](c2ccccc2)OC(=O)N1C(=O)[C@@H](C)Cc1ccccc1` | C4 = R, C5 = S, Cα = **S** |

**Contrôle indépendant à la main** (repère x à droite, y vers le haut, z vers
l'observateur ; signe du déterminant calibré sur (R)-CHFClBr) : pour C4 du dessin
valinol, les vecteurs sont N (107,8°), C5 (218°), iPr (294,8°), H vers l'arrière ; la
séquence 1→2→3 tourne dans le sens trigonométrique ⇒ **S**. Même résultat que RDKit.

**Contrôle sur la littérature.** Procter dessine les mêmes deux auxiliaires (ses
composés **4.24**, dérivé de la valine, et **4.28**, dérivé de la noréphédrine). Dans
sa figure 4.13 l'isopropyle est en pointillé et l'électrophile en gras — orientation
miroir de celle de tes notes, mais **même relation** : l'électrophile arrive anti au
substituant de C4. En transposant ses coordonnées et en refaisant le calcul à la main,
on retrouve C4 = (S) et Cα = (R) pour R = Me, El = benzyle. Les deux sources
concordent.

*(Procter, Asymmetric Synthesis, §4, fig. 4.13 et tableau 4.2, p. 48.)*

**Propagation après clivage.** Le groupe de priorité 1 reste le carbone porteur
d'oxygènes (C(=O)N → CH₂OH ou → CO₂H) et l'ordre des priorités 2, 3, 4 ne change pas.
Le descripteur est donc conservé : à partir du valinol on obtient l'acide
**(R)**-2-méthyl-3-phénylpropanoïque (`C[C@H](Cc1ccccc1)C(=O)O`) et l'alcool
**(R)**-2-méthyl-3-phénylpropan-1-ol (`C[C@@H](CO)Cc1ccccc1`).

## C. Géométrie de l'énolate

| Bouton | SMILES lu par RDKit | Double liaison |
|---|---|---|
| « Énolate Z (cis) » | `C/C=C(\O)N1C(=O)OC[C@@H]1C(C)C` | **Z** |
| « Énolate E (trans) » | `C/C=C(/O)N1C(=O)OC[C@@H]1C(C)C` | **E** |

Le dessin du bouton « Z » est donc bien un énolate Z(O) : O⊖ et CH₃ du même côté, donc
CH₃ à l'opposé de l'azote — la géométrie annoncée dans tes notes.

## D. Carton « carbone stéréogène » (section 0b)

Disposition en Y, molécule concrète = acide 2-méthyl-3-phénylpropanoïque.

| Disposition dessinée | Descripteur |
|---|---|
| CO₂H haut-gauche, CH₃ haut-droite, CH₂Ph **pointillé** en bas | **R** |
| CO₂H haut-gauche, CH₃ haut-droite, CH₂Ph **gras** en bas | **S** |
| miroir : CH₃ haut-gauche, CO₂H haut-droite, CH₂Ph **gras** en bas | **R** |

Les deux structures du panneau « réactif ou catalyseur » sont donc bien images l'une de
l'autre dans un miroir vertical, et les étiquettes (S) / (R) affichées sont exactes.

Pour le panneau « avec auxiliaire », le groupe de gauche est le lien acyle vers
l'oxazolidinone : ses atomes de première sphère sont (O, O, N), donc il garde la
priorité 1 exactement comme CO₂H. Les descripteurs du carton sont donc les mêmes.

## E. Produit de Hoppe

| Disposition dessinée | SMILES lu par RDKit | Descripteur |
|---|---|---|
| Hₐ (gras, bas-gauche) remplacé par CO₂H | `C[C@H](OC(=O)N(C)C)C(=O)O` | **S** |
| Hᵦ (pointillé, bas-droite) remplacé par CO₂H | `C[C@@H](OC(=O)N(C)C)C(=O)O` | **R** |

Tes notes annotent le produit **(R)** : c'est donc Hᵦ que le complexe
sec-BuLi·(−)-spartéine arrache. C'est cette convention (Hᵦ = pointillé = celui qui
part) qui est utilisée dans **toutes** les figures de la section Hoppe, y compris le
mécanisme pas à pas, pour éviter toute confusion.

**Inversion du descripteur avec rétention.** Priorités sur le carbone α :

| | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| intermédiaire lithié | O du carbamate | CH₃ | **Li** (Z = 3) | H |
| produit carboxylé | O du carbamate | **CO₂H** | CH₃ | H |

La position spatialement occupée par Li devient celle de CO₂H, mais son **rang** passe
de 3 à 2, et CH₃ recule de 2 à 3. Les priorités 2 et 3 sont échangées : le descripteur
bascule alors qu'aucun atome n'a bougé.

## F. Époxyde de la chalcone (TADDOL)

| Disposition dessinée | SMILES lu par RDKit | Descripteurs |
|---|---|---|
| Ph **gras** sur C3, C(=O)Ph **pointillé** sur C2 | `O=C(c1ccccc1)[C@H]1O[C@@H]1c1ccccc1` | C3 = **R**, C2 = **S** |
| Ph **pointillé** sur C3, C(=O)Ph **gras** sur C2 | `O=C(c1ccccc1)[C@@H]1O[C@H]1c1ccccc1` | C3 = S, C2 = R |

Tes notes annotent R sur le carbone portant le phényle et S sur celui portant le
benzoyle, soit **(2S,3R)** : c'est la première ligne. C'est ce que dessine le support.

> **Remarque de dessin.** Tes notes représentent l'époxyde avec une liaison **C–O en
> gras** et les deux substituants dans le plan. Cette représentation est lisible pour
> un chimiste, mais elle est **incomplète** formellement : RDKit ne parvient à attribuer
> qu'un seul des deux centres. Le support utilise donc la représentation sans ambiguïté
> — sommet O avec deux liaisons C–O normales, et les deux substituants en gras /
> pointillé. C'est la même molécule, dessinée de façon univoque.

## G. Époxyde de Sharpless

| Disposition dessinée | SMILES lu par RDKit | Descripteurs |
|---|---|---|
| C₇H₁₅ **pointillé** sur C3, CH₂OH **gras** sur C2 | `CCCCCCC[C@@H]1O[C@H]1CO` | **(2S,3S)** |
| C₇H₁₅ **gras** sur C3, CH₂OH **pointillé** sur C2 | `CCCCCCC[C@H]1O[C@@H]1CO` | **(2R,3R)** |

Tes notes annotent (S,S) pour le L-(+)-DET : c'est la première ligne, celle que le
support affiche quand le bouton « L-(+)-DET » est actif. Le bouton « D-(−)-DET »
affiche l'autre.

**Le tartrate lui-même.** L-(+)-DET = tartrate de diéthyle **(R,R)** — c'est bien ce
que tes notes annotent (R sur chacun des deux carbones). L'acide L-(+)-tartrique
naturel est le (2R,3R).

## H. Alcène de départ

Le (E)-déc-2-én-1-ol est dessiné en zig-zag continu (chaîne alternée), ce qui impose
la géométrie **E** : les deux substituants du C=C se retrouvent de part et d'autre de
l'axe de la double liaison. Une première version du schéma les plaçait tous les deux du
même côté, ce qui dessinait par erreur l'isomère Z ; c'est corrigé.

---

## Ce qui n'a PAS pu être vérifié par ce procédé

- **La face Si d'Ellman.** Déterminer une face à partir d'un état de transition
  cyclique demande la géométrie 3D du cycle (conformation chaise, position
  pseudo-axiale ou pseudo-équatoriale du tert-butyle), qui n'est pas contenue dans un
  schéma à plat. Voir `A_VERIFIER.md`.
- **Le squelette exact de la (−)-spartéine.** Il est reproduit d'après le dessin de tes
  notes ; la partie centrale du scan ne permet pas de compter les atomes du pont avec
  certitude. Voir `A_VERIFIER.md`.
