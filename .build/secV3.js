
/* ==========================================================================
   GROUPE 3 — Les faces (exercice 1 du TD)
   ========================================================================== */
const V3='3 — Les faces, en volume';

S({
  grp:V3, title:'Un carbone sp² est plat comme une crêpe',
  consigne:'Tourne la molécule jusqu\'à la voir « par la tranche ». Tu verras que tout est aligné.',
  build(host){
    const m=MOL3D.aminocetone;
    bloc3D(host,m,{h:290, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.2,c:'--blue',op:.14},
      {k:'arrow',a:[0,0,2.8],b:[0,0,0.9],c:'--green'},
      {k:'arrow',a:[0,0,-2.8],b:[0,0,-0.9],c:'--red'},
      {k:'tag',p:[0,0,3.4],t:'AVANT',c:'--green',front:true},
      {k:'tag',p:[0,0,-3.4],t:'ARRIÈRE',c:'--red',front:true}
    ], boutons:[
      {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','C\'est la <b>4-aminobutan-2-one</b> du TD. Le carbone de la cétone, l\'oxygène et les deux carbones voisins sont dans <b>un seul plan</b> (le disque bleu). Ce plan a donc exactement deux côtés : le vert et le rouge.'));
  },
  une:'Autour d\'une double liaison, les atomes sont <b>dans un plan</b>. Un plan a deux côtés — c\'est de là que vient toute la notion de « face ».',
  probleme:'<p>On te parle de « face <i>Re</i> », de « face avant », d\'« attaque par le dessus ». Ça suppose que tu voies le plan. Or sur un dessin, tout est plat : on ne voit pas <b>quel</b> plan est le bon.</p><p>Ici, le plan est colorié. Tourne, et regarde-le disparaître quand tu le vois par la tranche : c\'est la preuve qu\'il est bien plat.</p>',
  etapes:[
   {q:'Pourquoi c\'est plat.',
    t:'Un carbone engagé dans une double liaison n\'a que <b>trois</b> voisins, pas quatre. Trois points définissent toujours un plan. Le carbone se met au milieu, à 120° de chacun : c\'est la forme la plus régulière possible, comme un panneau « attention danger ».'},
   {q:'Ce que ça change.',
    t:'Un carbone tétraédrique est <b>déjà</b> à droite ou à gauche : il a une main. Un carbone plan, lui, n\'a pas de main — mais il a deux <b>côtés</b>. Si quelque chose arrive d\'un côté plutôt que de l\'autre, le carbone devient tétraédrique et choisit sa main à cet instant.'},
   {q:'D\'où le mot « face ».',
    t:'Une face, c\'est un côté du plan. Le vert (vers toi) et le rouge (vers le fond) sur le modèle. Rien de plus compliqué que ça.'},
   {q:'Vérifie par la tranche.',
    t:'Appuie sur « voir par la tranche ». Les deux disques deviennent des traits, et tous les atomes s\'alignent. Si tu vois une molécule sp² comme un <b>morceau de papier</b> dans l\'espace, tu as tout compris.'}
  ],
  retenir:[
   'Carbone sp² = 3 voisins, angles de 120°, tout dans un plan.',
   'Un plan a <b>deux</b> côtés : deux faces.',
   'Le carbone plan n\'a pas de main — il en choisit une quand on l\'attaque.',
   'Image : un morceau de papier posé dans l\'espace.'
  ]
});

S({
  grp:V3, title:'Attaquer par devant, attaquer par derrière',
  consigne:'Regarde les deux flèches sur le modèle. Ce sont les deux seules possibilités.',
  build(host){
    const m=MOL3D.aminocetone;
    bloc3D(host,m,{h:290, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.2,c:'--blue',op:.11},
      {k:'arrow',a:[0,0,3.2],b:[0,0,1.1],c:'--green'},
      {k:'arrow',a:[0,0,-3.2],b:[0,0,-1.1],c:'--red'},
      {k:'tag',p:[0,0,3.8],t:'attaque avant',c:'--green',fs:11,front:true},
      {k:'tag',p:[0,0,-3.8],t:'attaque arrière',c:'--red',fs:11,front:true}
    ], boutons:[
      {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)}
    ]});
    const f=el('div','figbox'); f.innerHTML=figDeuxProduits(); host.appendChild(f);
    host.appendChild(el('div','statusline','Un hydrure (H⁻) arrive soit par le vert, soit par le rouge. Les deux produits obtenus sont <b>images l\'un de l\'autre dans un miroir</b> : ce sont des énantiomères. On dit donc que les deux faces sont <b>énantiotopes</b>.'));
  },
  une:'Pour savoir comment s\'appellent deux faces, on fabrique les deux produits et on les compare. C\'est <b>la définition</b>, pas une astuce.',
  probleme:'<p>Les définitions officielles parlent d\'axes de symétrie et de réflexions. C\'est rigoureux mais imprenable quand on ne visualise pas.</p><p>La bonne nouvelle : la définition <b>par les produits</b> donne toujours la même réponse, et elle ne demande aucune vision dans l\'espace. Juste de dessiner deux produits.</p>',
  etapes:[
   {q:'Le test, en trois gestes.',
    t:'<b>(1)</b> Attaque la face avant, dessine le produit. <b>(2)</b> Attaque la face arrière, dessine le produit. <b>(3)</b> Compare les deux.'},
   {q:'Les trois réponses possibles.',
    t:'<b>Produits identiques</b> → faces <b>homotopes</b>. <b>Produits énantiomères</b> (la main gauche et la main droite) → faces <b>énantiotopes</b>. <b>Produits diastéréoisomères</b> (ni identiques ni miroirs) → faces <b>diastéréotopes</b>.'},
   {q:'Sur la 4-aminobutan-2-one.',
    t:'Face avant → l\'alcool (S). Face arrière → l\'alcool (R). Deux énantiomères : les faces sont donc <b>énantiotopes</b>. Le mot savant pour ça : la cétone est <b>prochirale</b>.'},
   {q:'Pourquoi ça compte pour la suite.',
    t:'Faces énantiotopes = les deux chemins ont <b>exactement la même énergie</b>. Sans rien ajouter, on obtient 50 % de chaque : un racémique. Il faut un réactif chiral pour les départager. C\'est toute la raison d\'être de la synthèse asymétrique.'},
   {q:'Et si les faces étaient diastéréotopes ?',
    t:'Alors les deux chemins auraient déjà des énergies <b>différentes</b>, sans qu\'on ajoute quoi que ce soit. C\'est le cas dès que la molécule possède déjà un centre de chiralité quelque part.'}
  ],
  retenir:[
   'Fabrique les deux produits, puis compare. C\'est tout.',
   'Identiques → homotopes. Miroirs → énantiotopes. Le reste → diastéréotopes.',
   'Énantiotopes = même énergie = il faut apporter la chiralité.',
   'Diastéréotopes = énergies déjà différentes.'
  ],
  quiz:{q:'Une cétone donne, selon la face attaquée, deux produits qui ne sont <b>ni</b> identiques <b>ni</b> images miroir. Que peux-tu en déduire&nbsp;?',
    a:'Que les deux faces sont <b>diastéréotopes</b>, et donc que la molécule contenait <b>déjà</b> un élément stéréogène ailleurs (un centre de chiralité, ou un repère comme un substituant sur un cycle).<br><br>Conséquence pratique très importante : tu obtiendras une sélectivité <b>même avec un réducteur banal et achiral</b> comme NaBH₄. C\'est exactement la situation de la question 3e du TD.'}
});
