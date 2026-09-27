
/* ==========================================================================
   GROUPE 6 — Exercice 1 du TD, en volume
   ========================================================================== */
const V6='4 — Exercice 1 du TD';

/* bloc « molécule + deux flèches d'attaque + verdict » */
function facesBloc(host,mol,opt){
  opt=opt||{};
  const d=(opt.decor||[]).concat([
    {k:'disc',p:[0,0,0],n:[0,0,1],r:opt.r||2.4,c:'--ink2',op:.08},
    {k:'arrow',a:[0,0,(opt.d||3.0)],b:[0,0,1.0],c:'--green'},
    {k:'arrow',a:[0,0,-(opt.d||3.0)],b:[0,0,-1.0],c:'--red'},
    {k:'tag',p:[0,0,(opt.d||3.0)+0.6],t:'AVANT',c:'--green',front:true},
    {k:'tag',p:[0,0,-((opt.d||3.0)+0.6)],t:'ARRIÈRE',c:'--red',front:true}
  ]);
  return bloc3D(host,mol,{h:opt.h||300,decor:d,badges:opt.badges,boutons:(opt.boutons||[]).concat([
    {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)},
    {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
      btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
  ])});
}
function verdict(host,t,c,d){
  const b=el('div','statusline');
  b.innerHTML='<b style="color:var('+c+')">'+t+'</b> — '+d;
  host.appendChild(b); return b;
}

S({
  grp:V6, title:'Molécule 1 — le (Z)-hex-3-ène',
  consigne:'Appuie sur le bouton de rotation de 180°, et surveille les étiquettes AVANT / ARRIÈRE.',
  build(host){
    bloc3D(host,MOL3D.hexeneZ,{h:300, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.3,c:'--ink2',op:.08},
      {k:'arrow',a:[0,0,2.9],b:[0,0,1.0],c:'--green'},
      {k:'arrow',a:[0,0,-2.9],b:[0,0,-1.0],c:'--red'},
      {k:'line',a:[0,-3.0,0],b:[0,3.0,0],c:'--purple',dash:true,w:2.4},
      {k:'tag',p:[0,0,3.5],t:'AVANT',c:'--green',front:true},
      {k:'tag',p:[0,0,-3.5],t:'ARRIÈRE',c:'--red',front:true}
    ], boutons:[
      {t:'⟳ Tourner de 180° autour de l\'axe violet', go:(vv)=>vv.turn([0,1,0],Math.PI,1500), f:'1 1 100%'}
    ]});
    verdict(host,'FACES HOMOTOPES','--green','une rotation réelle les échange. Il n\'y a qu\'un seul produit possible, et il est <i>méso</i>. Rien à nommer, aucune sélectivité à espérer.');
  },
  une:'Une rotation de 180° autour de l\'axe violet remet la molécule exactement comme avant — mais elle a retourné la molécule. Les deux faces sont donc interchangeables.',
  etapes:[
   {q:'Ce que tu dois voir.',t:'Avant la rotation, l\'étiquette AVANT est du côté qui te fait face. Après, elle est passée derrière, et pourtant la molécule a repris <b>exactement la même allure</b>.'},
   {q:'Pourquoi ça marche ici.',t:'Les deux moitiés de l\'alcène sont identiques (un éthyle de chaque côté) et elles sont du <b>même côté</b> (géométrie Z). C\'est cette double condition qui crée l\'axe.'},
   {q:'La conclusion.',t:'Deux faces échangées par une <b>rotation</b> (et pas seulement par un miroir) sont <b>homotopes</b>. Le produit d\'époxydation est le même des deux côtés.'},
   {q:'Le piège à éviter.',t:'Si l\'alcène était (E), l\'axe serait perpendiculaire à la feuille et ne retournerait rien. Les faces seraient <b>énantiotopes</b>, et on obtiendrait deux énantiomères. Un seul détail de géométrie, deux réponses opposées.'}
  ],
  retenir:['Rotation qui échange les faces → <b>homotopes</b>.','Produit unique et <i>méso</i>.','Pas de prochiralité, rien à nommer.','Le (E) aurait des faces énantiotopes.']
});

S({
  grp:V6, title:'Molécule 2 — celle qui a déjà un centre',
  consigne:'Repère la boule rouge (l\'oxygène du méthoxy) : c\'est elle qui casse toute symétrie.',
  build(host){
    const m=MOL3D.ex1m2;
    facesBloc(host,m,{r:2.6,d:3.2,h:310,badges:[{i:m.centre,t:'R',c:'--blue',o:[-22,-18]}]});
    verdict(host,'FACES DIASTÉRÉOTOPES','--red','la molécule porte déjà un centre (R). Aucune opération de symétrie ne peut échanger les deux faces. Face avant = (3<i>Re</i>, 4<i>Re</i>).');
  },
  une:'Dès qu\'une molécule est <b>déjà chirale</b>, ses deux faces sont forcément diastéréotopes. C\'est une règle sans exception.',
  probleme:'<p>Ici il n\'y a rien à chercher : la présence d\'un centre stéréogène suffit à conclure. Encore faut-il le repérer — et c\'est plus facile sur un modèle que sur un dessin.</p>',
  etapes:[
   {q:'Repère le centre.',t:'Le carbone marqué <b>R</b> porte quatre choses différentes : le méthoxy (boule rouge), un méthyle, la chaîne vinylique, et un hydrogène. Quatre groupes différents = un centre de chiralité.'},
   {q:'Fais le test des deux produits.',t:'Époxyde par l\'avant : tu crées deux nouveaux centres. Époxyde par l\'arrière : tu crées les deux centres opposés — <b>mais le centre R, lui, n\'a pas bougé</b>. Les deux produits ne sont donc pas des images miroir.'},
   {q:'Donc : diastéréoisomères.',t:'Ni identiques, ni énantiomères : les deux produits sont <b>diastéréoisomères</b>, et les deux faces sont diastéréotopes.'},
   {q:'La conséquence pratique, énorme.',t:'Deux chemins diastéréoisomères ont des énergies <b>différentes par nature</b>. Tu obtiendras une sélectivité <b>même avec un peracide banal et achiral</b>. C\'est le principe de tous les auxiliaires chiraux : on colle un centre sur le substrat pour obtenir ça gratuitement.'},
   {q:'Nommer quand même les faces.',t:'Sur C3 (celui côté méthoxy) : le carbone porteur de l\'oxygène (O,C,H) &gt; C4 (C,C,H) &gt; H. Sur C4 (côté phényle) : phényle (C,C,C) &gt; C3 (C,C,H) &gt; H. Dans l\'orientation du dessin de l\'énoncé, les deux se lisent dans le sens horaire : face avant = <b>(3<i>Re</i>, 4<i>Re</i>)</b>.'}
  ],
  retenir:['Substrat déjà chiral → faces <b>toujours</b> diastéréotopes.','Sélectivité possible sans réactif chiral.','Face avant = (3<i>Re</i>, 4<i>Re</i>).','C\'est le principe même des auxiliaires.']
});

S({
  grp:V6, title:'Molécule 3 — l\'éther d\'énol silylé',
  consigne:'Tourne-le pour vérifier qu\'il n\'y a aucun carbone à quatre groupes différents.',
  build(host){
    const m=MOL3D.ex1m3;
    facesBloc(host,m,{r:2.8,d:3.4,h:310,badges:[
      {i:m.alcene[0],t:'Re',c:'--green',o:[-24,-16]},{i:m.alcene[1],t:'Si',c:'--green',o:[24,-16]}]});
    verdict(host,'FACES ÉNANTIOTOPES','--blue','molécule achirale, alcène dissymétrique : seul un miroir échange les deux faces. L\'alcène est <b>prochiral</b>. Face avant = (1<i>Re</i>, 2<i>Si</i>).');
    host.appendChild(el('div','statusline','Ne confonds pas les deux « Si » : la pastille <b style="color:var(--green)">verte</b> est le nom d\'une <b>face</b> (<i>sinister</i>), la boule <b style="color:var(--purple)">violette</b> est l\'atome de <b>silicium</b> du groupe triméthylsilyle. Rien à voir.'));
  },
  une:'Cette molécule est plate autour de la double liaison et parfaitement achirale : ses deux faces sont <b>énantiotopes</b>, donc exploitables par un catalyseur chiral.',
  probleme:'<p>On se demande souvent pourquoi les chimistes prennent la peine de transformer une cétone en éther d\'énol silylé. La réponse est exactement ici.</p>',
  etapes:[
   {q:'D\'où vient cette molécule.',t:'De la <b>2-méthylcyclohexanone</b>, qui possède un centre stéréogène en C2. En la transformant en éther d\'énol, on rend ce carbone sp² : <b>le centre disparaît</b>, la molécule devient achirale.'},
   {q:'Pourquoi c\'est malin.',t:'Une molécule achirale à faces énantiotopes peut être attaquée sélectivement par un <b>catalyseur chiral</b>. On a donc effacé un centre pour pouvoir le recréer où l\'on veut, et dans la configuration qu\'on veut. C\'est la base de l\'aldolisation de Mukaiyama asymétrique.'},
   {q:'Fais le test.',t:'Attaque la face avant avec un aldéhyde : tu crées un centre quaternaire en C2. Attaque l\'arrière : tu obtiens l\'énantiomère. Deux énantiomères → faces <b>énantiotopes</b>.'},
   {q:'Nommer la face — C1 (porteur de OSiMe₃).',t:'Classement : <b>O</b> du silyloxy &gt; <b>C2</b> (qui est (C,C,C)) &gt; <b>C6</b> du cycle (C,H,H). Dans l\'orientation de l\'énoncé, c\'est le sens horaire : face <b>Re</b>.'},
   {q:'Nommer la face — C2 (porteur de CH₃).',t:'Classement : <b>C1</b> (O,C,C) &gt; <b>C3</b> du cycle (C,H,H) &gt; <b>CH₃</b> (H,H,H). Sens antihoraire : face <b>Si</b>. Les deux lettres diffèrent, c\'est normal : deux classements indépendants.'}
  ],
  retenir:['Molécule achirale + alcène dissymétrique → <b>énantiotopes</b>.','Alcène <b>prochiral</b> : les faces se nomment.','Face avant = (1<i>Re</i>, 2<i>Si</i>).','Sans catalyseur chiral : racémique exact.'],
  quiz:{q:'La 2-méthylcyclohexanone de départ a-t-elle, elle aussi, des faces énantiotopes&nbsp;?',
    a:'<b>Non — diastéréotopes.</b> Elle possède un centre stéréogène en C2, donc elle est déjà chirale, donc ses faces ne peuvent pas être énantiotopes.<br><br>C\'est précisément pour ça qu\'on la silyle : <b>effacer le centre</b> transforme un problème diastéréosélectif (dont le résultat dépendrait du centre existant) en problème énantiosélectif, qu\'un catalyseur chiral peut contrôler entièrement.'}
});

S({
  grp:V6, title:'Molécule 4 — la cétone aminée',
  consigne:'Les deux flèches montrent les deux hydrures possibles. Regarde-les par la tranche.',
  build(host){
    const m=MOL3D.aminocetone;
    facesBloc(host,m,{r:2.2,d:2.8,h:300,badges:[{i:m.sp2,t:'Re',c:'--green',o:[-22,20]}]});
    verdict(host,'FACES ÉNANTIOTOPES','--blue','molécule achirale, carbonyle dissymétrique. Prochirale : face avant = <b>Re</b>. NaBH₄ seul donnerait exactement 50:50.');
    const f=el('div','figbox'); f.innerHTML=figDeuxProduits(); host.appendChild(f);
  },
  une:'Un carbonyle porté par une molécule achirale a presque toujours des faces énantiotopes : c\'est le substrat type de la réduction asymétrique.',
  etapes:[
   {q:'Vérifie qu\'elle est achirale.',t:'Tourne le modèle : aucun carbone ne porte quatre groupes différents. La chaîne CH₃–CO–CH₂–CH₂–NH₂ n\'a aucun centre.'},
   {q:'Nomme la face.',t:'Sur le carbone du carbonyle : <b>O</b> &gt; <b>CH₂CH₂NH₂</b> (premier atome C avec (C,H,H)) &gt; <b>CH₃</b> (avec (H,H,H)). Attention : on tranche dès la première sphère, inutile d\'aller chercher l\'azote, il est trop loin.'},
   {q:'Dans l\'orientation de l\'énoncé.',t:'O en haut, la chaîne aminée en bas à droite, le méthyle en bas à gauche : sens horaire → la face qui te fait face est la face <b>Re</b>.'},
   {q:'Le piège à ne pas rater.',t:'Attaquer la face <i>Re</i> ne donne <b>pas</b> le produit (R). Quand l\'hydrure arrive, les priorités changent : l\'oxygène reste premier, mais le H devient dernier et la chaîne aminée passe deuxième. L\'attaque sur la face <i>Re</i> donne ici l\'alcool <b>(S)</b>.'}
  ],
  retenir:['Molécule achirale + carbonyle dissymétrique → <b>énantiotopes</b>.','Prochirale : face avant = <b>Re</b>.','Face <i>Re</i> ≠ produit (R).','Sans catalyseur chiral : racémique exact.']
});
