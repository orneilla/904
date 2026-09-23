
/* ==========================================================================
   GROUPE 2 — R et S, très lentement
   ========================================================================== */
const V2='2 — R ou S, très lentement';

S({
  grp:V2, title:'Gras, pointillé : ce que ça veut dire',
  consigne:'Le modèle démarre comme le dessin de ton cours, juste un peu incliné pour que tu voies les quatre groupes. Tourne-le doucement.',
  build(host){
    bloc3D(host,MOL3D.butanolR,{h:280});
    const d=el('div','dico');
    d.innerHTML='<span class="m">Trait normal</span>La liaison est <b>dans le plan de la feuille</b>. Ni devant, ni derrière.'
      +'<div style="height:9px"></div><span class="m">Trait gras (triangle plein)</span>La liaison <b>sort de la feuille</b>, elle vient vers toi. Le triangle est large du côté proche : c\'est la perspective, comme une route qui s\'élargit en s\'approchant.'
      +'<div style="height:9px"></div><span class="m">Trait pointillé (hachures)</span>La liaison <b>rentre dans la feuille</b>, elle s\'éloigne de toi.';
    host.appendChild(d);
    host.appendChild(el('div','statusline','Le modèle ci-dessus est un <b>butan-2-ol</b>. Rouge = oxygène, gris clair = hydrogène. Au départ, l\'hydrogène est celui qui pointe vers le fond : c\'est lui qu\'on dessinerait en pointillé.'));
  },
  une:'Un trait gras vient vers toi, un trait pointillé s\'éloigne. C\'est tout. Le reste du dessin est à plat.',
  probleme:'<p>Le problème n\'est pas la convention — elle tient en deux lignes. Le problème, c\'est qu\'on te demande ensuite de <b>reconstruire le volume</b> à partir de ces deux indices, et de le faire tourner.</p><p>Ici, tu n\'as plus à le reconstruire : il est déjà là.</p>',
  etapes:[
   {q:'Regarde d\'abord sans toucher.',
    t:'Le modèle démarre dans la position du dessin classique : deux liaisons qui montent (dans le plan), une qui descend vers toi, une qui descend vers l\'arrière. C\'est le « Y » que tu vois dans les livres.'},
   {q:'Maintenant tourne d\'un quart de tour vers la gauche.',
    t:'La liaison qui pointait vers toi est maintenant sur le côté. Si tu redessinais la molécule <b>dans cette position</b>, tu n\'aurais plus du tout les mêmes traits gras et pointillés. <b>Même molécule, dessin différent.</b>'},
   {q:'Ce que ça t\'apprend sur les exercices.',
    t:'Quand on te donne deux dessins et qu\'on te demande « même molécule ou pas ? », la réponse ne se lit jamais sur l\'allure du dessin. Il faut soit tourner (mentalement ou avec un modèle), soit passer par les <b>noms</b> R et S — et c\'est bien plus sûr.'},
   {q:'Pourquoi on passe toujours par R/S.',
    t:'Parce que le nom, lui, ne bouge pas quand on tourne. C\'est une étiquette collée sur l\'objet. Deux dessins qui donnent le même nom sont la même molécule, point final. Tu n\'as plus jamais besoin de visualiser.'}
  ],
  retenir:[
   'Gras = vers toi. Pointillé = vers le fond. Normal = dans le plan.',
   'Un même objet a une infinité de dessins possibles.',
   'Le <b>nom</b> (R ou S), lui, ne change jamais.',
   'Donc : toujours nommer, jamais comparer des dessins à l\'œil.'
  ]
});

S({
  grp:V2, title:'Étape 1 — classer les quatre groupes',
  consigne:'Cette étape se fait sur le papier, sans rien visualiser. C\'est la plus mécanique des quatre.',
  build(host){
    const b=el('div');
    b.innerHTML='<table class="dat"><thead><tr><th class="num">Ordre</th><th>Ce qu\'on regarde</th></tr></thead><tbody>'
     +'<tr><td class="num"><b>1</b></td><td>L\'atome <b>directement accroché</b> au carbone. Le plus lourd gagne.<br><span style="color:var(--ink2);font-size:13px">I &gt; Br &gt; Cl &gt; S &gt; F &gt; O &gt; N &gt; C &gt; H</span></td></tr>'
     +'<tr><td class="num"><b>2</b></td><td>Égalité ? On avance d\'<b>un seul cran</b> et on compare les trois atomes suivants, du plus lourd au plus léger.<br><span style="color:var(--ink2);font-size:13px">(O,O,H) bat (O,H,H) — on compare rang par rang, jamais en faisant la somme.</span></td></tr>'
     +'<tr><td class="num"><b>3</b></td><td>Une <b>double liaison</b> compte double : un C=O compte comme un carbone lié à <b>deux</b> oxygènes.</td></tr>'
     +'<tr><td class="num"><b>4</b></td><td>L\'<b>hydrogène</b> est toujours dernier. Toujours.</td></tr>'
     +'</tbody></table>';
    host.appendChild(b);
    const d=el('div','dico');
    d.innerHTML='<span class="m">Sur le butan-2-ol, ça donne :</span>'
     +'<b style="color:var(--red)">1 · OH</b> — l\'oxygène (8) écrase tous les carbones (6).<br>'
     +'<b style="color:var(--ink)">2 · CH₂CH₃</b> — carbone, et ce carbone porte (C, H, H).<br>'
     +'<b style="color:var(--ink)">3 · CH₃</b> — carbone aussi, mais il porte (H, H, H). Il perd.<br>'
     +'<b style="color:var(--grey)">4 · H</b> — dernier, comme toujours.';
    host.appendChild(d);
    host.appendChild(el('div','statusline','Si tu bloques souvent ici, c\'est presque toujours à l\'étape 2 : on compare <b>rang par rang</b>, en alignant les trois atomes du plus lourd au plus léger de chaque côté. (O,C,H) bat (O,H,H) parce qu\'au deuxième rang, C bat H.'));
  },
  une:'On numérote les quatre groupes de 1 (le plus prioritaire) à 4 (le moins). Cette étape est du calcul, pas de la géométrie.',
  probleme:'<p>Beaucoup d\'erreurs de R/S ne viennent pas de la géométrie mais de ce classement : on compare trop tôt, on oublie de dédoubler une double liaison, ou on fait une moyenne au lieu de comparer rang par rang.</p>',
  etapes:[
   {q:'La discipline : sphère par sphère.',
    t:'On regarde d\'abord les quatre atomes <b>collés</b> au carbone. Si deux sont identiques, et <b>seulement</b> dans ce cas, on avance d\'un cran sur ces deux branches‑là. On ne saute jamais une étape.'},
   {q:'Comparer rang par rang.',
    t:'Pour chaque branche, on écrit les trois atomes suivants, rangés du plus lourd au plus léger : par exemple (O, C, H). Puis on compare les deux listes <b>terme à terme</b>. Le premier terme qui diffère tranche, et on arrête.'},
   {q:'Les doubles liaisons.',
    t:'Un C=O compte comme un carbone attaché à deux oxygènes : (O, O, quelque chose). C\'est pour ça qu\'un aldéhyde CHO bat un alcool CH₂OH — (O,O,H) contre (O,H,H).'},
   {q:'Un raccourci que tu as le droit d\'utiliser.',
    t:'Pour les groupes courants, tout le monde utilise une table de priorité toute faite :<br><b>OH &gt; NH₂ &gt; CO₂H &gt; CHO &gt; CH₂OH &gt; C₆H₅ &gt; C≡CH &gt; CH=CH₂ &gt; CH(CH₃)₂ &gt; CH₂CH₃ &gt; CH₃ &gt; H</b>.<br>Ce n\'est pas de la triche : c\'est ce que font les chimistes.'}
  ],
  retenir:[
   'Numéro atomique le plus élevé d\'abord.',
   'Égalité → on avance d\'un cran, et on compare <b>rang par rang</b>.',
   'Double liaison = atome compté deux fois.',
   'H toujours n° 4.'
  ],
  quiz:{q:'Entre –CH₂OH et –CHO, lequel est prioritaire&nbsp;?',
    a:'<b>–CHO</b> (l\'aldéhyde).<br><br>Les deux commencent par un carbone : égalité. On avance d\'un cran.<br>• –CH₂OH : ce carbone porte <b>(O, H, H)</b>.<br>• –CHO : ce carbone est doublement lié à l\'oxygène, donc il compte comme portant <b>(O, O, H)</b>.<br><br>Premier rang : O = O, égalité. Deuxième rang : <b>O bat H</b>. C\'est tranché, on s\'arrête. L\'aldéhyde gagne.'}
});

S({
  grp:V2, title:'Étape 2 — mettre le n° 4 derrière',
  consigne:'Appuie sur le bouton et regarde le modèle tourner tout seul. Puis fais-le à la main.',
  build(host){
    const m=MOL3D.butanolR;
    const bg=[{i:m.prio[0],t:'1',c:'--red',o:[-20,-14]},{i:m.prio[1],t:'2',c:'--ink',o:[22,-12]},
              {i:m.prio[2],t:'3',c:'--ink',o:[20,16]},{i:m.prio[3],t:'4',c:'--grey',o:[-20,18]}];
    const v=bloc3D(host,m,{h:290, badges:bg, boutons:[
      {t:'⟳ Amener le n° 4 devant', go:(vv)=>vv.turn([1,0,0],Math.PI,900)},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','Au départ, le <b>4</b> (l\'hydrogène) est déjà vers le fond : c\'est la bonne position. Appuie sur le premier bouton pour l\'amener vers toi — tu verras que le sens de lecture s\'inverse. C\'est exactement le piège de l\'examen.'));
  },
  une:'On tourne la molécule jusqu\'à ce que le groupe n° 4 <b>s\'éloigne de toi</b>. On regarde alors les trois autres, qui forment un volant.',
  probleme:'<p>Pourquoi le n° 4 doit-il partir derrière&nbsp;? Parce qu\'on veut regarder les trois <b>autres</b> groupes bien en face, comme un volant de voiture vu du siège conducteur. Le n° 4, c\'est la colonne de direction : elle part vers l\'avant de la voiture, donc loin de toi.</p>',
  etapes:[
   {q:'L\'image du volant, en détail.',
    t:'Tu es assise dans la voiture. La colonne de direction s\'enfonce vers le moteur : c\'est le <b>n° 4</b>. Sur le volant lui-même, tu vois trois repères : <b>1</b>, <b>2</b> et <b>3</b>. Tu regardes dans quel sens ils se suivent.'},
   {q:'Quand le dessin te donne déjà la bonne position.',
    t:'Si le n° 4 est dessiné <b>en pointillé</b>, tu as de la chance : il est déjà vers le fond. Tu peux lire directement. C\'est le cas le plus fréquent dans les énoncés, parce que les auteurs sont gentils.'},
   {q:'Quand il ne l\'est pas.',
    t:'Si le n° 4 est en gras (vers toi), ou dans le plan, il faut tourner. Deux solutions : le modèle 3D ci-dessus, ou — beaucoup plus rapide en examen — <b>l\'astuce de l\'échange</b>, deux pages plus loin.'},
   {q:'Fais l\'expérience maintenant.',
    t:'Appuie sur « amener le n° 4 devant ». Regarde le volant 1 → 2 → 3 <b>avant</b> et <b>après</b>. Il tourne dans l\'autre sens. La molécule n\'a pas changé — c\'est ton point de vue qui a changé. D\'où la règle absolue : <b>on ne lit jamais le volant sans avoir mis le 4 derrière</b>.'}
  ],
  retenir:[
   'Le n° 4 doit <b>s\'éloigner</b> de l\'observateur.',
   'Les trois autres forment un volant qu\'on lit en face.',
   'n° 4 dessiné en pointillé → on peut lire tout de suite.',
   'Lire sans avoir placé le 4 derrière donne la <b>mauvaise lettre</b>.'
  ]
});

S({
  grp:V2, title:'Étape 3 — lire le volant',
  consigne:'Le n° 4 est déjà derrière. Regarde simplement dans quel sens vont 1 → 2 → 3.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figVolant(0); host.appendChild(f);
    const row=el('div','btnrow'); let k=0;
    [['Sens des aiguilles → R','R'],['Sens inverse → S','S']].forEach((t,i)=>{
      const b=el('button','btn'); b.textContent=t[0]; b.style.flex='1 1 46%';
      b.onclick=()=>{ k=i; f.innerHTML=figVolant(i); [...row.children].forEach((x,j)=>x.classList.toggle('on',j===i)); };
      row.appendChild(b);
    });
    host.appendChild(row); row.children[0].classList.add('on');
    const m=MOL3D.butanolR;
    const bg=[{i:m.prio[0],t:'1',c:'--red',o:[-20,-14]},{i:m.prio[1],t:'2',c:'--ink',o:[22,-12]},
              {i:m.prio[2],t:'3',c:'--ink',o:[20,16]},{i:m.prio[3],t:'4',c:'--grey',o:[-20,18]}];
    host.appendChild(el('div','statusline','Sur le butan-2-ol ci-dessous, l\'hydrogène (n° 4) part déjà vers le fond. Suis 1 → 2 → 3 des yeux : ils tournent <b>dans le sens des aiguilles d\'une montre</b>. Ce butan-2-ol est donc <b>(R)</b> — et RDKit le confirme.'));
    bloc3D(host,m,{h:280, badges:bg});
  },
  une:'Sens des aiguilles d\'une montre = <b>R</b> (comme <i>rectus</i>, à droite). Sens inverse = <b>S</b> (comme <i>sinister</i>, à gauche).',
  probleme:'<p>C\'est l\'étape la plus facile des quatre, et pourtant c\'est celle qu\'on rate — parce qu\'on l\'a faite sans avoir vérifié l\'étape 2.</p>',
  etapes:[
   {q:'Le moyen mnémotechnique le plus simple.',
    t:'<b>R</b> comme la <b>R</b>oute : on tourne à droite. <b>S</b> comme <b>S</b>inistre, qui veut dire « gauche » en latin (et qui a mal tourné en français, justement). Une horloge tourne en R.'},
   {q:'Un truc physique, avec ta main droite.',
    t:'Referme ta main droite en gardant le pouce levé. Fais pointer ton <b>pouce vers le fond</b> (loin de toi) : tes doigts s\'enroulent dans le sens des aiguilles. Pouce = n° 4, doigts = 1 → 2 → 3. Si l\'ordre suit tes doigts de la main droite : c\'est <b>R</b>.'},
   {q:'Vérifie que tu l\'as bien compris.',
    t:'Refais-le avec la main <b>gauche</b> : pouce vers le fond, les doigts s\'enroulent dans l\'autre sens. C\'est <b>S</b>. Tu viens de fabriquer les deux énantiomères avec tes mains, sans rien dessiner.'},
   {q:'Ce qu\'il ne faut surtout pas faire.',
    t:'Ne cherche pas à « voir » la molécule en entier. Tu n\'as besoin que de trois points et d\'un sens de rotation. Tout le reste de la molécule est du décor.'}
  ],
  retenir:[
   '1 → 2 → 3 dans le sens des aiguilles = <b>R</b>.',
   'Sens inverse = <b>S</b>.',
   'Pouce de la main droite vers le fond = R.',
   'Valable <b>uniquement</b> si le n° 4 est déjà derrière.'
  ],
  quiz:{q:'Le n° 4 est vers toi (trait gras), et tu lis 1 → 2 → 3 dans le sens des aiguilles. La molécule est-elle R&nbsp;?',
    a:'<b>Non, elle est S.</b><br><br>Tu as lu le volant « par derrière », c\'est-à-dire depuis le mauvais côté. Comme quand tu regardes une horloge à travers sa vitre depuis l\'arrière : les aiguilles semblent tourner à l\'envers.<br><br>La règle de rattrapage : <b>si le n° 4 est vers toi, lis normalement puis inverse la lettre.</b> C\'est exactement ce qu\'on va systématiser à la page suivante.'}
});

S({
  grp:V2, title:'L\'astuce quand tu n\'arrives pas à tourner',
  consigne:'Retiens ces deux phrases. Elles remplacent complètement la rotation mentale.',
  build(host){
    const d=el('div','rassure');
    d.innerHTML='<p class="gros" style="margin:0 0 10px"><b>1.</b> Si le n° 4 est <b>vers toi</b> : lis le volant normalement, puis <b>inverse la lettre</b>.</p>'
      +'<p class="gros" style="margin:0"><b>2.</b> Chaque fois que tu <b>échanges deux groupes</b>, la lettre s\'inverse.</p>';
    host.appendChild(d);
    const f=el('div','figbox'); f.innerHTML=figEchange(); host.appendChild(f);
    host.appendChild(el('div','statusline','La deuxième règle est la plus puissante des deux : elle te permet de <b>déplacer les groupes comme tu veux</b> sur le papier, en comptant simplement combien d\'échanges tu as faits. Nombre pair d\'échanges → même lettre. Nombre impair → lettre inversée.'));
  },
  une:'Tu n\'as jamais besoin de tourner quoi que ce soit dans ta tête : il suffit de compter des échanges.',
  probleme:'<p>Faire tourner une molécule mentalement est difficile. <b>Échanger deux groupes sur un dessin</b> ne l\'est pas du tout : on gomme et on réécrit.</p><p>Or un échange a un effet parfaitement prévisible : il transforme la molécule en son image miroir, donc il inverse la lettre. En enchaînant des échanges, on se ramène toujours à une position facile à lire.</p>',
  etapes:[
   {q:'La méthode complète, en trois lignes.',
    t:'<b>(a)</b> Classe les quatre groupes.<br><b>(b)</b> Si le n° 4 n\'est pas en pointillé, <b>échange-le</b> avec le groupe qui, lui, est en pointillé. Compte : 1 échange.<br><b>(c)</b> Lis le volant sur le dessin obtenu, puis inverse la lettre (car tu as fait un nombre impair d\'échanges).'},
   {q:'Pourquoi un échange inverse la lettre.',
    t:'Parce qu\'échanger deux groupes sur un carbone donne <b>exactement l\'image miroir</b>. Vérifie-le sur le modèle 3D de la page précédente : si tu échangeais deux boules, tu obtiendrais l\'autre main.'},
   {q:'Deux échanges ramènent au point de départ.',
    t:'Deux miroirs successifs se compensent : tu retrouves la molécule de départ, donc la même lettre. D\'où la règle : <b>pair = inchangé, impair = inversé</b>. Tu peux enchaîner autant d\'échanges que tu veux.'},
   {q:'Un exemple concret.',
    t:'Le n° 4 est en trait gras (vers toi), le n° 2 est en pointillé. Tu les échanges : le 4 part en pointillé, le 2 vient en gras. Tu lis le nouveau volant et tu trouves « R ». Comme tu as fait <b>un</b> échange, la vraie réponse est <b>S</b>.'},
   {q:'Pourquoi cette méthode est la bonne en examen.',
    t:'Elle est purement mécanique. Elle ne demande aucune visualisation, elle se fait au crayon, et elle ne rate jamais. Les gens qui « voient » en 3D vont plus vite ; ceux qui comptent les échanges ne se trompent pas. Choisis d\'être du deuxième groupe.'}
  ],
  retenir:[
   'n° 4 vers toi → lis, puis <b>inverse</b>.',
   'Un échange de deux groupes → lettre inversée.',
   'Nombre pair d\'échanges → lettre inchangée.',
   'Aucune rotation mentale n\'est nécessaire. Jamais.'
  ],
  quiz:{q:'Sur un dessin, tu échanges le groupe 1 avec le 3, puis le 2 avec le 4. Tu lis ensuite « S ». Quelle est la vraie configuration&nbsp;?',
    a:'<b>S.</b><br><br>Tu as fait <b>deux</b> échanges, donc un nombre pair. Les deux inversions se compensent et la lettre lue est la bonne.<br><br>C\'est très utile en pratique : tu peux réorganiser complètement un dessin pour le rendre lisible, tant que tu comptes tes échanges. Deux échanges bien choisis permettent presque toujours d\'amener le n° 4 en pointillé <b>et</b> de mettre le volant dans une position confortable.'}
});
