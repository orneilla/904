#!/bin/sh
# Reconstruit les deux supports HTML à partir des morceaux de .build/
set -e
cd "$(dirname "$0")/.."
B=.build

mk() {   # mk <sortie> <titre-onglet> <titre> <sous-titre> <cle-stockage> <fichiers...>
  out=$1; t1=$2; t2=$3; t3=$4; key=$5; shift 5
  sed -e "s|__TITRE_ONGLET__|$t1|" -e "s|__TITRE__|$t2|" -e "s|__SOUSTITRE__|$t3|" "$B/shell.html" > "$out"
  cat "$B/lib.js" >> "$out"
  for f in "$@"; do cat "$B/$f" >> "$out"; done
  sed -e "s|__STORE__|$key|" "$B/render.js" >> "$out"
  echo "  $out"
}

echo "Construction :"
mk chap1_synthese_asymetrique.html \
   "CH0904 — Chapitre 1 : Synthèse asymétrique" "CH0904 — Chapitre 1" "Synthèse asymétrique : introduction" "ch0904" \
   figs.js newfigs.js figD.js figE.js figFH.js \
   secA.js secBC.js secC.js secC2.js secD.js secE.js secF.js secG.js secH.js

mk bases_stereochimie.html \
   "Les bases de la stéréochimie" "Les bases" "Stéréochimie organique — les fondations" "bases" \
   newfigs.js figB.js \
   secB1.js secB2.js secB3.js secB4.js secB5.js secB6.js

mk td_revision_corrige.html \
   "CH0904 — TD de révision, corrigé" "TD de révision" "CH0904 — corrigé détaillé" "td904" \
   newfigs.js figTD.js \
   secT0.js secT1.js secT2.js secT3.js
