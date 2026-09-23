
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

S({
  grp:V3, title:'Le (Z)-hex-3-ène : tourne-le, tu vas comprendre',
  consigne:'Appuie sur « tourner de 180° autour de l\'axe », puis regarde les deux disques colorés.',
  build(host){
    const m=MOL3D.hexeneZ;
    const v=bloc3D(host,m,{h:300, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.3,c:'--ink2',op:.08},
      {k:'arrow',a:[0,0,2.9],b:[0,0,1.0],c:'--green'},
      {k:'arrow',a:[0,0,-2.9],b:[0,0,-1.0],c:'--red'},
      {k:'line',a:[0,-3.0,0],b:[0,3.0,0],c:'--purple',dash:true,w:2.4},
      {k:'tag',p:[0,0,3.5],t:'AVANT',c:'--green',front:true},
      {k:'tag',p:[0,0,-3.5],t:'ARRIÈRE',c:'--red',front:true},
    ], boutons:[
      {t:'⟳ Tourner de 180° autour de l\'axe', go:(vv)=>vv.turn([0,1,0],Math.PI,1500), f:'1 1 100%'}
    ]});
    host.appendChild(el('div','statusline','Le trait violet est un <b>axe de symétrie</b> de la molécule. Après la rotation de 180°, la molécule <b>a exactement la même allure qu\'avant</b> — mais le disque vert est passé derrière. Autrement dit : une simple rotation a échangé les deux faces.'));
  },
  une:'Sur cet alcène, une simple rotation échange le devant et le derrière. Les deux faces sont donc <b>homotopes</b> — et aucune sélectivité n\'est possible.',
  probleme:'<p>C\'est la molécule la plus déroutante du TD, parce que la réponse ne se lit pas du tout sur le dessin. On cherche instinctivement un plan de symétrie ; il faut chercher un <b>axe</b>, et cet axe est couché dans le plan de la feuille — donc invisible.</p><p>Ici, tu peux simplement faire la rotation et constater.</p>',
  etapes:[
   {q:'Repère l\'axe violet.',
    t:'Il est <b>perpendiculaire</b> à la double liaison et il est <b>dans le plan</b> de la molécule. Il passe pile au milieu de la double liaison.'},
   {q:'Fais la rotation de 180°.',
    t:'La moitié gauche vient à droite, la droite vient à gauche — et surtout, <b>ce qui était devant part derrière</b>. Comme quand tu retournes une crêpe en la faisant pivoter autour d\'un axe horizontal.'},
   {q:'Regarde le résultat.',
    t:'La molécule est <b>identique</b> à ce qu\'elle était. Normal : les deux moitiés sont les mêmes (un éthyle de chaque côté, en <i>cis</i>). Mais le disque vert est maintenant au fond. <b>Une rotation a donc échangé les deux faces.</b>'},
   {q:'La conclusion.',
    t:'Deux faces qu\'une rotation échange sont <b>homotopes</b>. Il n\'y a qu\'un seul produit possible, quelle que soit la face attaquée. L\'époxydation donne un composé <i>méso</i> — la même molécule des deux côtés.'},
   {q:'Vérifie par les produits, si tu préfères.',
    t:'Époxyde la face avant : tu obtiens le <i>cis</i>-3,4-époxyhexane. Époxyde la face arrière : le même composé. Deux produits identiques → faces homotopes. <b>Les deux méthodes donnent la même réponse</b>, ce qui est rassurant.'},
   {q:'Et si l\'alcène était (E) ?',
    t:'L\'axe existerait encore, mais il serait <b>perpendiculaire au plan</b> de la molécule — donc il ne retournerait rien du tout. Les faces seraient alors <b>énantiotopes</b>, et l\'époxydation donnerait deux énantiomères. Un seul détail de géométrie change toute la réponse.'}
  ],
  retenir:[
   'Axe perpendiculaire à C=C <b>et dans le plan</b> → faces homotopes.',
   'Une rotation qui échange les faces = faces homotopes.',
   'Un seul produit possible : composé <i>méso</i>, achiral.',
   'Le même alcène en (E) aurait des faces énantiotopes.'
  ],
  quiz:{q:'Pourquoi cherche-t-on un <b>axe</b> et pas un <b>plan</b> pour conclure « homotopes »&nbsp;?',
    a:'Parce qu\'un <b>plan</b> de symétrie est un miroir : il échange bien les deux faces, mais il transforme la molécule en son image miroir. Or on veut savoir si on retombe sur <b>la même</b> molécule, pas sur son reflet.<br><br>Un <b>axe</b> de rotation, lui, est une opération « physique » : tu peux vraiment attraper l\'objet et le tourner. Si une rotation réelle suffit à échanger les faces, alors elles sont interchangeables pour de bon → <b>homotopes</b>.<br><br>Si seul un miroir les échange (rotation impossible) → <b>énantiotopes</b>. Si même un miroir n\'y arrive pas → <b>diastéréotopes</b>. Les trois cas, dans l\'ordre.'}
});
