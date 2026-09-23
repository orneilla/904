
/* ==========================================================================
   GROUPE 4 — Le cyclohexane et l'axe des biaryles
   ========================================================================== */
const V4='4 — Les deux cas durs du TD';

S({
  grp:V4, title:'Exercice 3e — la chaise, et pourquoi les faces diffèrent',
  consigne:'Tourne le cycle pour le voir par la tranche : tu verras la forme de chaise, et le tBu bien d\'un seul côté.',
  build(host){
    const m=MOL3D.cyclohexanone;
    const p=m.atoms[m.sp2].p, n=[0,0.93,0.37];
    const A=(s)=>[p[0]+n[0]*s,p[1]+n[1]*s,p[2]+n[2]*s];
    bloc3D(host,m,{h:300, R0:M3.id(), decor:[
      {k:'arrow',a:A(3.4),b:A(1.3),c:'--green'},
      {k:'arrow',a:A(-3.4),b:A(-1.3),c:'--red'},
      {k:'tag',p:A(4.1),t:'par le dessus',c:'--green',fs:11,front:true},
      {k:'tag',p:A(-4.1),t:'par le dessous',c:'--red',fs:11,front:true}
    ], boutons:[
      {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','La 4-<i>tert</i>-butylcyclohexanone. Le gros groupe en bas est le <i>tert</i>-butyle : il est <b>d\'un seul côté</b> du cycle, et c\'est lui qui fait toute la différence entre la flèche verte et la flèche rouge.'));
  },
  une:'Cette molécule est <b>achirale</b>, et pourtant ses deux faces sont différentes : c\'est le <i>tert</i>-butyle qui sert de repère « haut / bas ».',
  probleme:'<p>Là, l\'intuition trompe : on se dit « la molécule n\'est pas chirale, donc ses deux faces doivent être équivalentes ». C\'est faux, et c\'est la subtilité de la question 3e.</p><p>Être achirale veut dire qu\'on ne peut pas la distinguer de son reflet. Ça ne dit <b>rien</b> sur le fait que son dessus ressemble à son dessous.</p>',
  etapes:[
   {q:'Le repère, d\'abord.',
    t:'Le <i>tert</i>-butyle est planté d\'un seul côté du cycle. Il définit un « bas » et donc un « haut ». Sans lui (avec une cyclohexanone toute nue), les deux faces seraient parfaitement identiques.'},
   {q:'Attaque par le vert : où va l\'OH ?',
    t:'L\'hydrure arrive par le dessus, donc l\'OH se retrouve <b>en dessous</b> — du même côté que le <i>tert</i>-butyle. Les deux groupes sont du même côté : c\'est l\'isomère <b>cis</b>.'},
   {q:'Attaque par le rouge.',
    t:'L\'hydrure arrive par le dessous, l\'OH se retrouve au-dessus, <b>à l\'opposé</b> du <i>tert</i>-butyle : c\'est l\'isomère <b>trans</b>.'},
   {q:'Compare les deux produits.',
    t:'<i>cis</i> et <i>trans</i> ne sont ni identiques, ni images miroir : ce sont des <b>diastéréoisomères</b>. Donc les deux faces sont <b>diastéréotopes</b>, et la réaction est diastéréosélective — même avec NaBH₄, qui est parfaitement achiral.'},
   {q:'Lequel gagne, en pratique ?',
    t:'NaBH₄ est un hydrure <b>petit</b>. Il passe par le chemin « axial », le plus direct, ce qui pose l\'OH en position équatoriale : on obtient majoritairement le <b>trans</b>. Avec un hydrure encombrant (L-Selectride), le chemin axial est bouché et on obtient le <b>cis</b>.'},
   {q:'Le détail qui rapporte des points.',
    t:'Les deux produits sont <b>achiraux</b> (ils ont un plan de symétrie qui passe par C1 et C4). C\'est pour ça que l\'énoncé écrit leurs descripteurs en <b>minuscules</b> : (1<i>r</i>,4<i>r</i>). Une minuscule = centre stéréogène mais pas chiral. La mention « (±) » de l\'énoncé, elle, n\'a pas de sens : un composé achiral n\'a pas d\'énantiomère.'}
  ],
  retenir:[
   'Molécule achirale, mais faces <b>diastéréotopes</b> : le tBu sert de repère.',
   'Les deux produits sont <i>cis</i> et <i>trans</i> : des diastéréoisomères.',
   'Réaction diastéréosélective avec un réducteur achiral.',
   'Petit hydrure → attaque axiale → OH équatorial → <i>trans</i>.'
  ],
  quiz:{q:'Si on enlevait le <i>tert</i>-butyle (cyclohexanone toute simple), que deviendraient les deux faces&nbsp;?',
    a:'Elles deviendraient <b>homotopes</b>.<br><br>Sans repère sur le cycle, rien ne distingue le dessus du dessous : une rotation de la molécule échange les deux faces. Les deux attaques donneraient le <b>même</b> cyclohexanol, et il n\'y aurait plus rien à sélectionner.<br><br>C\'est la démonstration que le <i>tert</i>-butyle ne sert pas à « gêner » — il sert à <b>distinguer</b>. C\'est un repère, pas un obstacle. (Il aide aussi à bloquer la chaise dans une seule conformation, ce qui rend l\'expérience propre.)'}
});

S({
  grp:V4, title:'Exercice 2 — pose le biaryle sur la tranche',
  consigne:'Appuie sur « regarder dans l\'axe ». C\'est exactement ce qu\'on te demande d\'imaginer — sauf qu\'ici tu le vois.',
  build(host){
    const m=MOL3D.biaryle;
    const v=bloc3D(host,m,{h:310, R0:M3.rot([1,0,0],Math.PI/2), decor:[
      {k:'line',a:[0,0,-4.6],b:[0,0,4.6],c:'--red',dash:true,w:2.2}
    ], boutons:[
      {t:'👁 Regarder DANS l\'axe', go:(vv)=>vv.goto(M3.id(),1400), f:'1 1 100%'},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','C\'est l\'acide 6,6′-difluorobiphényl-2,2′-dicarboxylique de l\'exercice 2. Le trait rouge est l\'<b>axe</b>. Quand tu regardes dans l\'axe, les deux cycles apparaissent comme deux barres croisées : c\'est la fameuse « projection de Newman » — et elle n\'a plus rien de mystérieux.'));
  },
  une:'Les deux cycles ne sont pas dans le même plan : ils sont <b>croisés</b>, à peu près à 90°. C\'est cette torsion, et elle seule, qui rend la molécule chirale.',
  probleme:'<p>Sur le dessin de l\'énoncé, les deux cycles sont dessinés à plat, l\'un au-dessus de l\'autre. Ça donne l\'impression qu\'ils sont dans le même plan — et alors la molécule aurait un plan de symétrie, donc serait achirale.</p><p>Le dessin ment. En vrai, ils ne <b>peuvent pas</b> être coplanaires : les substituants en ortho se rentrent dedans.</p>',
  etapes:[
   {q:'Pourquoi les cycles se croisent.',
    t:'Chaque cycle porte deux groupes en position <b>ortho</b> (juste à côté de la liaison centrale). Si les deux cycles étaient à plat l\'un dans l\'autre, ces quatre groupes se toucheraient. La molécule se tord donc pour les écarter, jusqu\'à environ 90°.'},
   {q:'Pourquoi la torsion crée de la chiralité.',
    t:'Deux barres croisées, ça ressemble à un début d\'hélice — et une hélice a un sens. Un tire-bouchon existe en version droite et en version gauche. C\'est exactement ce qui se passe ici : la torsion peut se faire dans un sens ou dans l\'autre, et les deux versions sont images miroir.'},
   {q:'Ce qu\'on appelle un « axe de chiralité ».',
    t:'Il n\'y a <b>aucun carbone asymétrique</b> dans cette molécule. La chiralité n\'est pas à un point, elle est répartie <b>le long de la liaison centrale</b>. On parle donc d\'un axe, et non d\'un centre.'},
   {q:'Pourquoi certaines de ces molécules ne comptent pas.',
    t:'Parce que la torsion peut basculer d\'un sens à l\'autre en tournant autour de la liaison centrale. Si cette rotation est <b>rapide</b>, les deux formes s\'échangent en permanence et on ne peut pas les séparer. C\'est le cas de l\'acide biphényl-2,2′-dicarboxylique du TD, qui n\'a que <b>deux</b> groupes en ortho au lieu de quatre.'},
   {q:'Le critère, chiffré.',
    t:'Robinson donne le seuil : il faut une barrière de rotation supérieure à environ <b>90 kJ·mol⁻¹</b> pour pouvoir séparer les deux formes à température ambiante. En pratique, ça demande <b>trois ou quatre</b> substituants en ortho, ou deux très gros.'},
   {q:'Et pour nommer, une fois dans l\'axe ?',
    t:'Tu vois deux barres : celle du <b>cycle avant</b> et celle du <b>cycle arrière</b>. Sur chacune, tu repères le substituant prioritaire. Règle spéciale des axes : <b>tout ce qui est devant passe avant tout ce qui est derrière</b>. Tu obtiens donc 1 et 2 sur la barre avant, 3 et 4 sur la barre arrière, et tu lis 1 → 2 → 3 comme un volant ordinaire.'}
  ],
  retenir:[
   'Les deux cycles sont <b>croisés</b>, pas coplanaires.',
   'La torsion = une hélice = deux sens possibles = chiralité.',
   'Chiralité <b>axiale</b> : aucun carbone asymétrique.',
   'Il faut que la rotation soit lente (~90 kJ·mol⁻¹) pour que ça compte.'
  ],
  plus:{titre:'pourquoi on ne peut pas répondre sur le dessin de l\'énoncé',
    body:'<p>Les quatre biaryles de l\'exercice 2 sont dessinés <b>à plat</b> : aucune liaison en gras, aucune liaison rompue, aucune perspective. Or le descripteur a<i>R</i>/a<i>S</i> se lit sur le <b>sens de la torsion</b>, qui n\'est pas représenté.</p><p>La réponse rigoureuse consiste donc à : identifier l\'élément (un axe), donner les priorités des substituants en ortho, expliquer la procédure — et signaler que le dessin ne permet pas de conclure. C\'est peut-être exactement ce que l\'exercice cherche à faire dire.</p><p>Pour information, le modèle ci-dessus a été construit et optimisé numériquement ; son angle de torsion mesuré est d\'environ 98°, ce qui confirme que les deux cycles sont bien quasi perpendiculaires.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.5, p. 44 (atropisomères, substituants ortho) et p. 46 (seuil de séparabilité).'},
  quiz:{q:'Le BINOL et le BINAP ont des naphtalènes au lieu de simples benzènes. En quoi ça aide&nbsp;?',
    a:'Le naphtalène est fait de <b>deux cycles soudés</b>. Le second cycle occupe donc de façon permanente une des deux positions ortho — et il est bien plus encombrant qu\'un simple substituant, parce qu\'il est rigide et qu\'il ne peut pas s\'écarter.<br><br>Résultat : avec un OH (ou un PPh₂) sur l\'autre position ortho, on a les quatre positions ortho occupées, dont deux par des blocs rigides. La rotation est totalement impossible, et le BINOL comme le BINAP s\'achètent sous forme énantiopure, stables indéfiniment.<br><br>C\'est précisément pour ça qu\'on les utilise comme source de chiralité en catalyse : ils ne racémisent jamais.'}
});
