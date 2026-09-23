
/* ==========================================================================
   GROUPE 1 — D'abord, respirer
   ========================================================================== */
const V1='1 — D\'abord, respirer';

/* tétraèdre générique : les quatre directions exactes du « Y » dessiné */
const D4 = {ul:[-1.249,0.883,0], ur:[1.249,0.883,0], av:[0,-0.883,1.249], ar:[0,-0.883,-1.249]};
function tetra(cols){
  cols = cols || ['--blue','--green','--purple','--red'];
  return {nom:'un carbone et ses quatre groupes', atoms:[
    {e:'C',p:[0,0,0],r:9,l:'C'},
    {e:'X',p:D4.ul,c:cols[0],r:12,l:'1'},
    {e:'X',p:D4.ur,c:cols[1],r:12,l:'2'},
    {e:'X',p:D4.av,c:cols[2],r:12,l:'3'},
    {e:'X',p:D4.ar,c:cols[3],r:12,l:'4'}
  ], bonds:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]};
}
function tetraMiroir(){
  const t=tetra(); const a=t.atoms.map(x=>Object.assign({},x,{p:[x.p[0],x.p[1],-x.p[2]]}));
  return {nom:t.nom, atoms:a, bonds:t.bonds};
}

S({
  grp:V1, title:'Ce n\'est pas toi',
  build(host){
    const b=el('div','rassure');
    b.innerHTML='<p style="margin:0 0 8px"><b>Ce que ce TD te demande vraiment, c\'est de faire tourner un objet dans ta tête à partir d\'un dessin plat.</b></p>'
      +'<p style="margin:0 0 8px">Ce n\'est pas de la chimie. C\'est de la <b>rotation mentale</b>, et c\'est une compétence à part entière — mesurée, entraînable, et très inégalement répartie. Certaines personnes la font sans y penser, d\'autres non. Ça ne dit strictement rien de ton niveau en chimie.</p>'
      +'<p style="margin:0">Et surtout : <b>ça se contourne</b>. Les chimistes qui ne visualisent pas bien ne devinent pas mieux avec le temps — ils utilisent des modèles, des méthodes mécaniques, et leurs mains. C\'est ce que ce support va te donner.</p>';
    host.appendChild(b);
    const t=el('div');
    t.innerHTML='<table class="dat"><thead><tr><th>Ce qu\'on te demande</th><th>Ce qu\'on va faire à la place</th></tr></thead><tbody>'
     +'<tr><td>« imagine que tu tournes la molécule »</td><td>tu la <b>tournes vraiment</b>, avec ton doigt</td></tr>'
     +'<tr><td>« vois quelle face est devant »</td><td>la face avant est <b>coloriée en vert</b></td></tr>'
     +'<tr><td>« mets le groupe 4 vers l\'arrière »</td><td>un <b>bouton</b> le fait, et tu regardes</td></tr>'
     +'<tr><td>« déduis R ou S »</td><td>tu lis un <b>volant</b>, comme dans une voiture</td></tr>'
     +'</tbody></table>';
    host.appendChild(t);
  },
  une:'Tu n\'as pas un problème de chimie. Tu as un problème de <b>rotation mentale</b> — et on va simplement arrêter de te demander de tourner les choses dans ta tête.',
  probleme:'<p>Un dessin de chimie est une <b>photo</b> d\'un objet en trois dimensions. Quand on te demande de raisonner dessus, on te demande en réalité de reconstruire l\'objet à partir de la photo, puis de le faire tourner sans le voir.</p><p>Les livres font comme si c\'était gratuit. Ça ne l\'est pas.</p>',
  etapes:[
   {q:'Ce qui se passe dans ta tête quand tu bloques.',
    t:'Tu regardes un trait gras et un trait pointillé, et il ne se passe… rien. Pas d\'objet. C\'est normal : reconstruire un volume à partir d\'un schéma plat est un <b>effort cognitif réel</b>, et si personne ne te l\'a jamais entraîné, il n\'y a aucune raison qu\'il soit automatique.'},
   {q:'Ce que font les chimistes que tu vois « réussir ».',
    t:'Presque aucun ne visualise vraiment. Ils appliquent des <b>procédures mécaniques</b> : « si j\'échange deux groupes, la lettre s\'inverse », « si l\'hydrogène est vers moi, je lis et j\'inverse ». Ce sont des recettes, pas de la vision. On va te donner les mêmes.'},
   {q:'Ce qui change avec un modèle qu\'on peut tourner.',
    t:'Quand l\'objet tourne <b>devant toi</b>, ta mémoire n\'a plus rien à fabriquer. Tu regardes, tu constates. Au bout de quelques molécules, ton cerveau commence à anticiper le résultat tout seul — c\'est comme ça que la rotation mentale s\'apprend, par l\'exemple répété, jamais par la volonté.'},
   {q:'Le plan de ce support.',
    t:'D\'abord tourner un objet simple pour comprendre gras/pointillé. Puis R et S, très lentement, avec un volant. Puis les faces (exercice 1). Puis le cyclohexane (exercice 3e). Puis l\'axe des biaryles (exercice 2). Rien de nouveau en chimie : juste les mêmes choses, en volume.'}
  ],
  retenir:[
   'La difficulté est <b>spatiale</b>, pas chimique.',
   'Elle se contourne avec des procédures, pas avec de l\'effort.',
   'Un objet qu\'on tourne vaut mille explications.',
   'Tout ce qui suit peut se faire avec tes mains, sans rien imaginer.'
  ]
});

S({
  grp:V1, title:'Tourne-le. Vraiment.',
  consigne:'Pose ton doigt sur la boule et fais-la glisser. Prends dix secondes, ça vaut le coup.',
  build(host){
    const v=bloc3D(host,tetra(),{h:270, boutons:[
      {t:'▶ Le faire tourner tout seul', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent = on?'⏸ Arrêter':'▶ Le faire tourner tout seul'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','Voilà un carbone (au centre) et ses <b>quatre</b> groupes. Regarde ce qui se passe quand tu tournes : les boules qui étaient « devant » passent « derrière ». Le dessin change complètement — mais <b>l\'objet, lui, n\'a pas changé</b>.'));
  },
  une:'Un carbone avec quatre groupes n\'est pas une croix plate : c\'est une <b>pyramide à quatre pointes</b>. Les quatre groupes sont le plus loin possible les uns des autres.',
  probleme:'<p>Sur le papier, on dessine un carbone avec deux traits normaux, un trait gras et un trait pointillé. Ça ressemble à une croix un peu bizarre.</p><p>En vrai, il n\'y a rien de bizarre : c\'est une forme très régulière, qu\'on appelle un <b>tétraèdre</b>. Les quatre groupes pointent vers les quatre coins d\'une pyramide.</p>',
  etapes:[
   {q:'Pourquoi une pyramide et pas une croix ?',
    t:'Parce que les quatre groupes se repoussent. Ils s\'installent le plus loin possible les uns des autres. Sur une feuille, le plus loin possible ce serait 90° entre chacun ; dans l\'espace, on fait mieux : <b>109,5°</b>. C\'est exactement l\'angle d\'un tétraèdre.'},
   {q:'L\'image à garder.',
    t:'Un trépied posé par terre, avec un mât qui monte au milieu. Trois pieds en bas, un mât en haut. Ou bien : une fleur de trèfle à quatre branches qui ne tient pas à plat.'},
   {q:'Ce que tu dois constater en tournant.',
    t:'Tourne jusqu\'à ce que la boule <b>3</b> (celle qui était vers toi) passe derrière. Regarde : le dessin obtenu ne ressemble plus du tout au dessin de départ. Pourtant tu n\'as rien cassé, rien échangé. <b>C\'est toujours la même molécule.</b>'},
   {q:'Et c\'est là tout le problème des dessins.',
    t:'Un même objet peut être dessiné de dizaines de façons différentes. C\'est pour ça qu\'on a inventé R et S : pour donner un <b>nom</b> à l\'objet, qui ne dépende pas de la façon dont on l\'a dessiné.'}
  ],
  retenir:[
   'Quatre groupes autour d\'un carbone = un <b>tétraèdre</b>, pas une croix.',
   'Angle entre deux liaisons : 109,5°.',
   'Tourner ne change <b>jamais</b> la molécule.',
   'R et S servent justement à nommer l\'objet, pas le dessin.'
  ],
  quiz:{q:'Si je fais tourner une molécule et que le dessin obtenu est différent, est-ce que j\'ai changé de molécule&nbsp;?',
    a:'<b>Non, jamais.</b> Faire tourner un objet ne le transforme pas. Tu peux tourner une chaise dans tous les sens, elle reste la même chaise.<br><br>Ce qui <b>changerait</b> la molécule, ce serait de <b>passer devant un miroir</b> (on obtient alors l\'autre main), ou d\'<b>échanger deux groupes</b> entre eux (ce qui revient au même). C\'est la seule chose à retenir de cette page : <b>tourner = autorisé, échanger = interdit</b>.'}
});

S({
  grp:V1, title:'Ta main gauche et ta main droite',
  consigne:'Compare les deux modèles. Ce sont les deux seuls objets possibles.',
  build(host){
    const w=el('div'); w.style.display='grid'; w.style.gap='4px'; host.appendChild(w);
    const l1=el('div','cv3dhint','à gauche : <b>R</b> — à droite : <b>S</b>'); l1.style.marginBottom='2px';
    const row=el('div'); row.style.display='grid'; row.style.gridTemplateColumns='1fr 1fr'; row.style.gap='8px';
    const g=el('div','cv3dwrap'), d=el('div','cv3dwrap');
    row.appendChild(g); row.appendChild(d); w.appendChild(row); w.appendChild(l1);
    const vg=Viewer3D(g,tetra(),{h:190}), vd=Viewer3D(d,tetraMiroir(),{h:190});
    const row2=el('div','btnrow');
    const b1=el('button','btn'); b1.textContent='▶ Les faire tourner ensemble'; b1.style.flex='1 1 100%';
    b1.onclick=()=>{ const on=!vg.isSpinning(); vg.spin(on); vd.spin(on);
      b1.textContent=on?'⏸ Arrêter':'▶ Les faire tourner ensemble'; b1.classList.toggle('on',on); };
    row2.appendChild(b1); host.appendChild(row2);
    host.appendChild(el('div','statusline','Tourne-les autant que tu veux, dans n\'importe quel sens : tu n\'arriveras <b>jamais</b> à les superposer. Comme tes deux mains — même doigts, même paume, et pourtant le gant gauche ne va pas sur la main droite.'));
  },
  une:'Il n\'existe que <b>deux</b> façons d\'arranger quatre groupes différents autour d\'un carbone. Deux. Pas trois, pas dix. Et elles sont l\'image l\'une de l\'autre dans un miroir.',
  probleme:'<p>C\'est la chose la plus importante de tout le chapitre, et elle est très simple : quand un carbone porte quatre groupes <b>tous différents</b>, il n\'y a que deux objets possibles.</p><p>On les appelle <b>R</b> et <b>S</b>. Tout le reste — les règles CIP, les faces, les auxiliaires — sert juste à savoir lequel des deux on a, et à fabriquer celui qu\'on veut.</p>',
  etapes:[
   {q:'Fais-le avec tes mains, maintenant.',
    t:'Pose tes deux mains à plat devant toi, paumes vers le bas. Elles se ressemblent. Maintenant essaie de les superposer <b>en gardant les deux paumes vers le bas</b> : impossible, les pouces partent du mauvais côté. C\'est exactement ça, R et S.'},
   {q:'Pourquoi ça a de l\'importance en vrai.',
    t:'Ton corps est fait de molécules « d\'une seule main ». Une enzyme qui accueille la forme R peut être complètement indifférente à la forme S — ou pire. C\'est pour ça qu\'une industrie entière existe pour fabriquer une main plutôt que l\'autre.'},
   {q:'Le mot à mettre dessus.',
    t:'Deux objets non superposables, images l\'un de l\'autre dans un miroir, s\'appellent des <b>énantiomères</b>. Si tu ne retiens qu\'un mot de cette page, retiens que ça veut dire « <i>la main gauche et la main droite</i> ».'},
   {q:'Et quand deux groupes sont identiques ?',
    t:'Alors la molécule devient superposable à son miroir : il n\'y a plus qu\'un seul objet. C\'est pour ça qu\'on exige <b>quatre groupes différents</b>. C\'est aussi pourquoi, dans le TD, le produit de la question 3d n\'est pas stéréogène : il porte deux méthyles identiques.'}
  ],
  retenir:[
   'Quatre groupes différents → exactement <b>deux</b> objets possibles.',
   'Ils sont images l\'un de l\'autre dans un miroir : <b>énantiomères</b>.',
   'Aucune rotation ne les superpose.',
   'Deux groupes identiques → plus de chiralité du tout.'
  ],
  quiz:{q:'Ta main gauche et ta main droite : combien de plans de symétrie a l\'ensemble des deux&nbsp;? Et une main toute seule&nbsp;?',
    a:'<b>Les deux ensemble</b>, posées en miroir, ont un plan de symétrie : le miroir lui-même. L\'ensemble est donc achiral.<br><br><b>Une main toute seule</b> n\'en a aucun. C\'est précisément ce qui la rend chirale : <i>chiral</i> vient du grec <i>kheir</i>, « la main ».<br><br>Retiens ce test : <b>si tu trouves un plan de symétrie dans la molécule, elle est achirale.</b> S\'il n\'y en a aucun (et pas d\'autre élément de symétrie impropre), elle est chirale.'}
});
