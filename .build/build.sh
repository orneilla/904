#!/bin/sh
# Reconstruit chap1_synthese_asymetrique.html à partir des morceaux de .build/
cd "$(dirname "$0")/.."
cat .build/base.html .build/figs.js .build/newfigs.js .build/figD.js .build/figE.js .build/figFH.js \
    .build/secA.js .build/secBC.js .build/secC.js .build/secC2.js .build/secD.js .build/secE.js \
    .build/secF.js .build/secG.js .build/secH.js .build/render.js > chap1_synthese_asymetrique.html
echo "chap1_synthese_asymetrique.html reconstruit"
