# À vérifier — CH0904, chapitre 1

Liste des points chimiques douteux, contradictoires ou que je n'ai pas pu trancher
seul. Chaque entrée dit ce que disent tes notes, ce que j'ai fait dans le visuel, et
pourquoi.

---

## 0. Un fichier source manque

**Le PDF `CH0904_Chap1_Synthese_asymetrique_intro.pdf` n'est pas dans le dépôt.**
Il n'y a pas non plus de dossier `sources/`. Le dépôt contient seulement :

- `CamScanner.pdf` — la diapo imprimée (les trois schémas de stratégie) ;
- `Cours 904 introduction.pdf` — tes 6 pages de notes manuscrites (5 pages de PDF).

J'ai aussi cherché dans ton Google Drive (`CH0904`, `Synthese_asymetrique`, PDF dont le
titre contient « 904 ») : rien.

**Conséquence.** Le PDF d'explication devait être *la* référence pour le raisonnement, et
sa dernière section listait les points à vérifier. Je ne l'ai pas eu. J'ai donc :

- pris les **notes manuscrites** comme référence pour les structures (comme prévu) ;
- **refait moi-même** les raisonnements, au lieu de les comparer aux tiens ;
- traité comme « points à vérifier » ceux que tu cites dans ta demande : modèle
  d'Ireland, produit de la page 2, face Si d'Ellman, descripteur R du produit de Hoppe,
  signe de l'exponentielle, charges Ti/DET.

Si tu peux redéposer ce PDF dans le dépôt, je compare mes conclusions aux tiennes et je
mets ce fichier à jour.

---

## 1. « Le modèle de Halland » (page 1) — erreur de nom

**Tes notes :** « on obtient uniquement l'énolate cis, c'est le model de Halland ».

**Ce qui est correct :** le modèle qui prédit la géométrie de l'énolate formé par
déprotonation d'un composé carbonylé avec une base encombrée est le **modèle d'Ireland**
(Robert E. Ireland, 1976). Il repose sur un état de transition cyclique à six chaînons
de type chaise dans lequel la tension allylique A(1,3) entre le substituant en α et le
groupe porté par le carbone du carbonyle décide de la géométrie.

Il n'existe pas de « modèle de Halland » en chimie des énolates. C'est très probablement
une erreur d'écoute ou de transcription.

**Ce que fait le visuel :** il écrit « modèle d'Ireland » partout, et l'encadré orange de
la section correspondante signale explicitement la divergence avec tes notes.

---

## 2. Produit incohérent en haut de la page 2 — erreur de dessin

**Tes notes, page 2, première ligne :** le réactif de départ et l'énolate sont dessinés
avec l'auxiliaire de la **noréphédrine** (Ph en C5 et Me en C4, tous deux en pointillé,
annotés « S » et « R »). Mais le **produit**, à droite de la flèche, est redessiné avec
un **isopropyle en gras** — c'est-à-dire l'auxiliaire du **valinol**, celui de la page 1.

**Ce qui est incohérent :** l'auxiliaire ne change pas pendant la réaction. Si on part de
la noréphédrine, on finit avec la noréphédrine.

**Ce qui est en revanche cohérent :** la stéréochimie du nouveau centre. Sur la page 1
(iPr en gras, donc vers l'avant) E est dessiné en **pointillé** ; sur la page 2 (Ph et Me
en pointillé, donc vers l'arrière) E est dessiné en **gras**. C'est exactement ce que
prévoit le modèle chélaté : attaque **anti** au substituant de C4. Donc seul le squelette
de l'auxiliaire a été recopié de travers.

**Ce que fait le visuel :** le produit de la voie noréphédrine est redessiné avec Me en
C4 et Ph en C5. Descripteurs vérifiés par RDKit (voir `verification_stereo.md`, § B) :

- voie valinol : C4 = (S), Cα = **(R)** ;
- voie noréphédrine : C4 = (R), C5 = (S), Cα = **(S)**.

---

## 3. Diagramme d'énergie de la page 4 — erreur de principe

**Tes notes :** le puits de P_S (à gauche) est nettement plus bas que celui de P_R (à
droite), et les deux puits de produits ne sont pas au même niveau.

**Ce qui est correct :** P_S et P_R sont des **énantiomères**. Deux énantiomères ont
rigoureusement la même énergie interne. Leurs puits doivent être **exactement à la même
hauteur**. C'est même le cœur de l'argument : puisque la thermodynamique ne peut rien
départager, la sélectivité est nécessairement **cinétique**, et elle vient uniquement de
la différence de hauteur des deux **états de transition**, eux qui sont diastéréoisomères.

Un diagramme où les produits sont à des énergies différentes décrit une réaction
diastéréosélective, pas énantiosélective.

**Ce que fait le visuel :** la section 5 redessine le diagramme avec les deux puits au
même niveau, marqués par une ligne pointillée horizontale commune, et un encadré orange
signale la correction.

---

## 4. Signe de l'exponentielle (page 4)

**Tes notes :** `[P_S]/[P_R] = k₁/k₂ = exp(−ΔΔG‡/RT)`.

**Ce n'est pas une erreur**, mais c'est ambigu tant qu'on ne dit pas ce que ΔΔG‡ désigne.
Les deux écritures suivantes sont vraies et équivalentes :

| Convention | Définition de ΔΔG‡ | Formule |
|---|---|---|
| **signée** (celle de tes notes) | ΔΔG‡ = ΔG‡_S − ΔG‡_R, qui peut être négatif | [P_S]/[P_R] = exp(−ΔΔG‡/RT) |
| **non signée** (celle du visuel) | ΔΔG‡ = ΔG‡(minoritaire) − ΔG‡(majoritaire) ≥ 0 | e.r. = k_maj/k_min = exp(+ΔΔG‡/RT) |

Vérification de cohérence : si le chemin S est le plus rapide, alors ΔG‡_S < ΔG‡_R, donc
ΔΔG‡(signé) < 0, donc exp(−ΔΔG‡/RT) > 1, donc [P_S] > [P_R]. ✅ Les deux conventions
donnent le même résultat.

**Ce que fait le visuel :** il affiche la convention utilisée sous le diagramme et
rappelle à quoi correspond l'écriture de tes notes. Les calculs utilisent
R = 8,314 J·mol⁻¹·K⁻¹ et T en kelvins.

**Point de vocabulaire, à confirmer avec ton enseignant :** tes notes écrivent `ΔΔG‡` et
`ΔΔrG‡` sur la même page. `ΔΔG‡` (différence d'enthalpies libres d'activation) est le
terme correct ici ; `ΔΔrG` désignerait une différence d'enthalpies libres **de réaction**,
qui vaut justement zéro entre deux énantiomères.

---

## 5. Points à revérifier quand j'aurai fait les sections 2, 3, 4 et 6

Ces points sont dans ta liste mais concernent des visuels qui ne sont pas encore écrits.
Ils seront traités, avec vérification RDKit, dans la deuxième vague :

- **Face Si d'Ellman** (page 2) : refaire le raisonnement à partir de l'état de
  transition chélaté à six chaînons dessiné, et vérifier que « addition on the Si face »
  est compatible avec les d.r. annoncés et avec la configuration (R) du sulfinamide.
- **Descripteur (R) du produit de Hoppe** (page 3) : vérifier le descripteur dessiné, et
  surtout construire l'encart « le descripteur CIP peut changer même avec rétention »
  (dans l'intermédiaire lithié, CH₃ passe devant Li, puisque Li est Z = 3 et C est Z = 6).
- **Charges Ti / DET** (page 5) : le complexe actif de l'époxydation de Sharpless est un
  **dimère neutre** Ti₂(tartrate)₂(OR)₄. Le tartrate y est un ligand **dianionique**
  (les deux OH alcooliques sont déprotonés, les deux esters restent intacts) et le
  titane est au degré d'oxydation **+IV**. Si tes notes portent une charge positive sur
  le tartrate ou une charge négative sur Ti, c'est inversé — à confirmer sur le dessin
  original, qui est peu lisible sur le scan.
- **DIBAL → aldéhyde** (page 1, annotation orange) : chimiquement, passer d'un imide
  d'Evans directement à l'aldéhyde par DIBAL-H est **possible mais délicat** ; la
  sur-réduction en alcool est fréquente. La voie fiable vers l'aldéhyde passe par
  l'amide de Weinreb. Le visuel mentionne les deux, en signalant la difficulté. À
  confirmer avec ton enseignant : est-ce que le cours attend « DIBAL » comme réponse,
  ou est-ce une simplification ?

---

## 6. Structures de tes notes que je n'ai pas pu lire avec certitude

- **Carbamate de Hoppe (page 3).** Le groupe porté par l'azote est dessiné comme un
  cycle à cinq chaînons O–CH₂–CH₂–N spiro-accolé à un cyclohexane, c'est-à-dire un
  1,3-oxazolidine spiro. Le réactif canonique de Hoppe est plutôt le carbamate
  « Cby » = 2,2,4,4-tétraméthyl-1,3-oxazolidine-3-carboxylate. Je reproduis **ce qui est
  dessiné**, mais il est possible que les quatre méthyles aient été remplacés par un
  spiro-cyclohexane par simplification, ou qu'il manque les méthyles en position 4.
  À confirmer sur le support du cours.
- **Page 4, flèches du mécanisme.** Les flèches courbes rouges sont lisibles, mais la
  charge portée par l'oxygène après l'addition 1,4 (O⊖ Li⁺) est partiellement recouverte.
  J'ai redessiné l'énolate de lithium tel que le mécanisme l'impose.
- **Page 5, chiffres du tableau de température.** Je lis « 0 °C, 4 h, 94 %, e.r. = 90:10 »,
  « −30 °C, 24 h, 92 %, e.r. = 95:5 » et « −78 °C, 120 h, 80 %, e.r. = 98,5:1,5 ». Le
  « 4 h » de la première ligne et le « 24 h » de la deuxième sont les moins nets. À
  revérifier sur l'original avant d'apprendre ces chiffres par cœur.

---

*Dernière mise à jour : première vague de visuels (sections 0, 1 et 5).*
