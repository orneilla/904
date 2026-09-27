
/* ==========================================================================
   GROUPE 7 — Exercice 2 du TD, en volume
   ========================================================================== */
const V7='5 — Exercice 2 du TD';

/* bloc biaryle : vue « comme le dessin », vue dans l'axe, et curseur de torsion */
function biaryleBloc(host,mol,opt){
  opt=opt||{};
  const R0=M3.mul(M3.rot([0,1,0],0.22),M3.rot([1,0,0],Math.PI/2));
  const v=bloc3D(host,mol,{h:opt.h||320, R0:R0, decor:[
    {k:'line',a:[0,0,-(opt.L||4.6)],b:[0,0,(opt.L||4.6)],c:'--red',dash:true,w:2.2}
  ], boutons:[
    {t:'👁 Regarder DANS l\'axe', go:(vv)=>vv.goto(M3.id(),1400)},
    {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
      btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
  ]});
  /* curseur : on fait tourner un cycle par rapport à l'autre */
  const lab=el('div','statusline'); lab.style.marginBottom='6px';
  const sl=document.createElement('input');
  sl.type='range'; sl.min='-90'; sl.max='90'; sl.value='0'; sl.step='1';
  sl.style.width='100%'; sl.setAttribute('aria-label','faire tourner un cycle par rapport à l\'autre');
  const maj=()=>{
    const a=+sl.value; v.torsion(a);
    const c=v.contact();
    if(!c){ lab.innerHTML='<b>Torsion '+(a>0?'+':'')+a+'°.</b>'; return; }
    const serre = c.d<3.0;
    lab.innerHTML='<b>On force la rotation de '+(a>0?'+':'')+a+'°.</b> '
      + 'Contact le plus serré : <b style="color:var('+(serre?'--red':'--green')+')">'
      + c.d.toFixed(2)+' Å</b> entre un <b>'+c.a+'</b> et un <b>'+c.b+'</b>. '
      + (serre ? (c.prof===0
          ? 'Ces deux atomes sont <b>dans des cycles</b> : rien ne peut s\'écarter, la gêne est bien réelle.'
          : (c.prof===1
             ? 'Ils sont <b>directement accrochés</b> aux cycles : ils ne peuvent guère bouger, la gêne reste réelle.'
             : 'Attention : au moins un appartient à un <b>groupe latéral souple</b> (à '+c.prof+' liaisons du cycle), qui peut pivoter et s\'écarter. Le curseur <b>exagère</b> donc la gêne ici.'))
        : 'En dessous de ~3,0 Å, deux atomes non liés se repoussent violemment. Ici, on est au-dessus : ça passe.');
  };
  sl.oninput=maj;
  const w=el('div'); w.style.margin='0 0 8px';
  const t=el('div','cv3dhint','↔ fais glisser pour <b>forcer</b> la rotation autour de l\'axe');
  t.style.marginBottom='4px';
  w.appendChild(t); w.appendChild(sl);
  host.appendChild(w); host.appendChild(lab); maj();
  return v;
}

S({
  grp:V7, title:'D\'abord : pourquoi les cycles ne sont pas à plat',
  consigne:'Prends le curseur et essaie d\'aplatir la molécule (torsion 0 = position de repos). Regarde la distance.',
  build(host){
    biaryleBloc(host,MOL3D.binol,{h:320});
    host.appendChild(el('div','statusline','C\'est le <b>BINOL</b>. À sa position de repos (0°), les deux naphtalènes sont presque perpendiculaires et tout va bien. Dès qu\'on force, des atomes des deux moitiés passent sous les 3 Å. <b>Le curseur fait tourner la molécule sans rien laisser se réarranger</b> : c\'est justement ce qui se passe au sommet de la barrière.'));
  },
  une:'Deux cycles reliés par une liaison simple devraient pouvoir tourner librement. Ici ils ne peuvent pas : les substituants en <b>ortho</b> se rentrent dedans.',
  probleme:'<p>Sur le dessin de l\'énoncé, les deux cycles sont côte à côte, dans le plan de la feuille. Ça suggère qu\'ils sont coplanaires — et une molécule coplanaire de ce type aurait un plan de symétrie, donc serait achirale.</p><p>Le dessin ment, et c\'est tout l\'exercice.</p>',
  etapes:[
   {q:'Ce que mesure le curseur.',t:'Il fait tourner un cycle par rapport à l\'autre autour de la liaison centrale, et il affiche la <b>plus courte distance</b> entre un atome d\'une moitié et un atome de l\'autre.'},
   {q:'Le seuil à connaître.',t:'Deux atomes non liés ne peuvent pas s\'approcher à moins d\'environ <b>3 Å</b> sans une répulsion énorme. En dessous, l\'énergie grimpe très vite : c\'est ça, l\'encombrement stérique.'},
   {q:'Une limite honnête du curseur.',t:'Il fait tourner la molécule <b>en bloc</b>, sans laisser les groupes latéraux se réarranger. Pour un CO₂H, qui peut pivoter, il <b>exagère</b> donc la gêne. C\'est pour ça qu\'on ne peut pas lire une barrière sur ce curseur — seulement comprendre d\'où elle vient.'},
   {q:'Ce que tu constates — et ce que ça prouve vraiment.',t:'À 0°, tout va bien. Dès qu\'on s\'écarte, la distance tombe sous les 3 Å. C\'est vrai pour <b>tous</b> les biaryles, y compris ceux qui tournent vite : passer d\'une forme tordue à l\'autre oblige toujours à frôler la position coplanaire. Il y a donc <b>toujours une barrière</b>. La vraie question n\'est pas « y a-t-il une gêne ? » mais « <b>quelle est sa hauteur ?</b> ».'},
   {q:'Ce qui décide de la hauteur, et c\'est le point clé.',t:'<b>La rigidité de ce qui gêne.</b> Un groupe latéral souple (un CO₂H, par exemple) peut pivoter sur lui-même et se glisser de côté : la barrière reste basse. Un <b>cycle soudé</b>, lui, ne peut rien faire : il est dans le plan du naphtalène, point. C\'est pour ça que le message sous le curseur te dit à chaque fois <b>quels atomes</b> se touchent, et s\'ils appartiennent à un cycle ou à un groupe souple.'},
   {q:'Pourquoi ça crée de la chiralité.',t:'Deux barres croisées forment un début d\'<b>hélice</b>, et une hélice a un sens : droite ou gauche. Si la molécule ne peut pas passer d\'un sens à l\'autre, les deux versions sont deux composés séparables. On les appelle des <b>atropisomères</b>.'},
   {q:'Le mot juste.',t:'La chiralité n\'est pas portée par un atome mais par la <b>liaison centrale</b> : c\'est un <b>axe de chiralité</b>. Il n\'y a aucun carbone asymétrique dans cette molécule.'}
  ],
  retenir:['Les cycles sont <b>croisés</b>, jamais coplanaires.','Deux atomes non liés : pas moins de ~3 Å.','Il y a <b>toujours</b> une barrière — la question est sa hauteur.','Ce qui la fait monter : des gêneurs <b>rigides</b> (cycles soudés), pas seulement gros.','Chiralité <b>axiale</b>, pas de centre.']
});

[['binap','BINAP','--green'],['biaryle','le difluoro-diacide','--green'],
 ['diphenique','l\'acide diphénique','--red'],['binol','BINOL','--green']].forEach(([cle,nom,col],k)=>{
  const t=[
   {une:'Le BINAP : deux naphtalènes, deux gros PPh₂. Rotation totalement impossible — c\'est le ligand chiral le plus utilisé de la chimie organométallique.',
    et:[{q:'Les quatre positions ortho.',t:'Sur chaque naphtalène : d\'un côté le <b>PPh₂</b> (énorme), de l\'autre le <b>cycle soudé</b> du naphtalène (rigide). Quatre positions occupées, dont deux par des blocs qui ne peuvent pas s\'écarter.'},
        {q:'Teste avec le curseur.',t:'Force la rotation et lis le message : les atomes qui se touchent sont des atomes de <b>cycle</b>, et parfois les deux <b>phosphores</b> eux-mêmes. Rien de tout cela ne peut s\'écarter. Le BINAP ne racémise pas, même chauffé.'},
        {q:'Chaque cycle est-il dissymétrique ?',t:'Oui : PPh₂ d\'un côté, cycle soudé de l\'autre. Condition remplie.'},
        {q:'La configuration ?',t:'a<i>R</i> ou a<i>S</i> — mais <b>pas lisible</b> sur le dessin plat de l\'énoncé. Sur le modèle 3D, oui : regarde dans l\'axe et applique la procédure.'},
        {q:'À quoi il sert.',t:'Complexé au ruthénium ou au rhodium, il rend le métal chiral. C\'est lui qui fait l\'hydrogénation asymétrique industrielle (Noyori, prix Nobel 2001).'}],
    ret:['4 positions ortho occupées, dont 2 blocs rigides.','Atropisomères parfaitement stables.','Priorité ortho : le côté <b>PPh₂</b> (P, Z = 15).','Configuration non lisible sur un dessin plat.']},
   {une:'Quatre substituants en ortho : CO₂H et F sur chaque cycle. La réponse attendue est « axe de chiralité » — avec une réserve sur la taille du fluor.',
    et:[{q:'Les quatre positions ortho.',t:'Chaque cycle porte un <b>CO₂H</b> et un <b>F</b>. Les deux sont différents : chaque cycle est bien dissymétrique.'},
        {q:'Teste avec le curseur.',t:'Regarde qui se touche : souvent un oxygène de carboxyle, c\'est-à-dire un groupe <b>souple</b>. Le fluor, lui, est minuscule et ne bloque presque rien. C\'est exactement la raison de ma réserve ci-dessous.'},
        {q:'Les priorités, si on doit attribuer.',t:'Sur chaque cycle, on compare les deux ortho : <b>F</b> (Z = 9) bat le carbone du <b>CO₂H</b> (Z = 6). Le fluor est donc prioritaire de chaque côté.'},
        {q:'La réserve, que je te signale honnêtement.',t:'Le fluor est le substituant le moins encombrant après l\'hydrogène. Les règles empiriques classiques rangent ce composé parmi les cas <b>limites</b>, voire non résolubles. Je n\'ai trouvé aucune barrière mesurée dans tes ouvrages : c\'est noté dans <code>A_VERIFIER.md</code>, à demander en TD.'}],
    ret:['4 substituants ortho : critère rempli sur le papier.','Priorité ortho : <b>F &gt; CO₂H</b>.','Réponse attendue : axe de chiralité.','Réserve : le fluor est très petit — cas limite possible.']},
   {une:'Celle-ci est le <b>contre-exemple</b> de l\'exercice : deux substituants ortho seulement. Prends le curseur et regarde — elle tourne presque librement.',
    et:[{q:'Compte les positions ortho.',t:'Chaque cycle porte un <b>CO₂H</b>… et un simple <b>H</b> de l\'autre côté. Deux substituants encombrants au total, pas quatre.'},
        {q:'Teste avec le curseur, et lis bien le message.',t:'La distance tombe sous les 3 Å, comme pour le BINOL — mais regarde <b>qui</b> se touche : ce sont les <b>oxygènes des carboxyles</b>. Or un CO₂H peut pivoter sur lui-même et se glisser de côté. Le curseur, qui tourne tout en bloc, <b>exagère</b> donc la gêne réelle.'},
   {q:'La vraie différence avec le BINOL.',t:'Sur le BINOL, l\'autre position ortho de chaque cycle est occupée par un <b>cycle soudé</b>, qui ne peut absolument pas s\'écarter. Ici, l\'autre position ortho ne porte qu\'un <b>hydrogène</b> — le plus petit substituant qui existe. Il ne bloque rien du tout.'},
        {q:'Conséquence.',t:'Les deux formes tordues s\'interconvertissent en permanence, bien plus vite qu\'on ne peut les séparer. On ne peut donc pas isoler d\'énantiomère : le <b>composé</b> est achiral et optiquement inactif.'},
        {q:'La réponse exacte à écrire.',t:'« Chaque molécule est chirale à un instant donné, mais les deux formes s\'échangent trop vite : il n\'y a pas d\'élément de chiralité <b>configurationnel</b>. » Répondre « elle est plane donc achirale » serait faux — elle n\'est pas plane.'},
        {q:'Le critère chiffré.',t:'Robinson donne le seuil : barrière &gt; ~<b>90 kJ·mol⁻¹</b> pour pouvoir séparer à température ambiante. Il précise qu\'il faut ajouter <b>un brome en ortho sur chaque cycle</b> à ce composé pour y arriver — et encore, seulement vers 0 °C.'}],
    ret:['2 substituants ortho seulement, et 2 hydrogènes en face.','Les gêneurs sont des CO₂H <b>souples</b> : ils s\'écartent.','Chiralité <b>conformationnelle</b>, pas configurationnelle.','Composé optiquement inactif — c\'est le « certaines » de l\'énoncé.']},
   {une:'Le BINOL : même squelette que le BINAP, mêmes conclusions. Deux OH, deux cycles soudés, rotation impossible.',
    et:[{q:'Les quatre positions ortho.',t:'Sur chaque naphtalène : l\'<b>OH</b> d\'un côté, le <b>cycle soudé</b> de l\'autre.'},
        {q:'Les priorités.',t:'Le carbone porteur de l\'OH est <b>(O,C,C)</b> ; celui de la soudure est <b>(C,C,C)</b>. L\'oxygène l\'emporte dès la première comparaison : le côté OH est prioritaire.'},
        {q:'Teste avec le curseur.',t:'À 0° le contact le plus serré est entre deux atomes de <b>cycle</b> : la gêne est structurelle, elle ne peut pas se relâcher. Le BINOL s\'achète énantiopur et ne racémise pas.'},
        {q:'À quoi il sert.',t:'C\'est la source de chiralité la plus courante en catalyse : phosphates chiraux, complexes de titane, d\'aluminium… On le fabrique par couplage oxydant du 2-naphtol, puis on dédouble.'}],
    ret:['2 OH + 2 cycles soudés : rotation impossible.','Priorité ortho : le carbone porteur de l\'<b>OH</b>.','Atropisomères stables, vendus énantiopurs.','Configuration non lisible sur le dessin plat.']}
  ][k];
  S({
    grp:V7, title:'Molécule '+(k+1)+' — '+nom,
    consigne:'Regarde dans l\'axe, puis prends le curseur et essaie de faire tourner.',
    build(host){
      biaryleBloc(host,MOL3D[cle],{h:cle==='binap'?330:320, L:cle==='binap'?5.6:4.6});
      verdict(host, col==='--green'?'AXE DE CHIRALITÉ':'AUCUN ÉLÉMENT DE CHIRALITÉ', col,
        col==='--green'?'la rotation est bloquée : les deux atropisomères sont séparables.'
                       :'la rotation est trop rapide : les deux formes s\'échangent en permanence.');
    },
    une:t.une, etapes:t.et, retenir:t.ret
  });
});

S({
  grp:V7, title:'Nommer l\'axe : la procédure, dans l\'axe',
  consigne:'Change de panneau pour voir les deux configurations possibles.',
  build(host){
    const f=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const draw=()=>{ f.innerHTML=figAxeNewman(k); [...row.children].forEach((b,i)=>b.classList.toggle('on',i===k)); };
    ['Un sens','L\'autre sens'].forEach((t,i)=>{ const b=el('button','btn'); b.textContent=t;
      b.style.flex='1 1 45%'; b.onclick=()=>{k=i;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f); draw();
    host.appendChild(el('div','statusline','Sur le modèle 3D du BINOL, appuie sur « regarder dans l\'axe » : tu verras exactement ces deux barres croisées. Le cycle le plus <b>net</b> est devant, celui qui est <b>estompé</b> est derrière.'));
  },
  une:'On regarde le long de l\'axe : les deux ligands du cycle <b>avant</b> prennent les rangs 1 et 2, ceux du cycle <b>arrière</b> les rangs 3 et 4. Puis on lit 1 → 2 → 3, comme un volant ordinaire.',
  etapes:[
   {q:'Étape 1 — se placer dans l\'axe.',t:'Sur le modèle, bouton « regarder dans l\'axe ». Sur le papier, il faut l\'imaginer — d\'où l\'intérêt de l\'avoir vu une fois pour de vrai.'},
   {q:'Étape 2 — classer le cycle AVANT.',t:'Ses deux substituants ortho, comparés par CIP. Le gagnant prend le rang <b>1</b>, l\'autre le rang <b>2</b>.'},
   {q:'Étape 3 — classer le cycle ARRIÈRE.',t:'Pareil : rangs <b>3</b> et <b>4</b>. Règle propre aux axes : <b>un ligand proche bat toujours un ligand lointain</b>, quels que soient les numéros atomiques.'},
   {q:'Étape 4 — lire.',t:'1 → 2 → 3 dans le sens horaire = <b>a<i>R</i></b>, antihoraire = <b>a<i>S</i></b>. Comme 1 et 2 sont à 180° l\'un de l\'autre en projection, c\'est la position de <b>3</b> qui décide.'},
   {q:'Ça marche depuis les deux bouts.',t:'On peut regarder par l\'une ou l\'autre extrémité de l\'axe : le résultat est le même. Je l\'ai vérifié numériquement dans les deux sens — c\'est une propriété de la règle, pas un hasard.'},
   {q:'Et pourquoi l\'énoncé ne permet pas de répondre.',t:'Parce que cette procédure demande de savoir <b>quel cycle est devant</b> et de quel côté il est tourné. Un dessin plat ne le dit pas. La bonne réponse identifie l\'axe, donne les priorités, explique la méthode — et signale que le dessin est insuffisant.'}
  ],
  retenir:['On regarde <b>le long de l\'axe</b>.','Proche avant lointain : 1–2 devant, 3–4 derrière.','1 → 2 → 3 horaire = a<i>R</i>, antihoraire = a<i>S</i>.','Dessin plat = configuration non déterminable.'],
  plus:{titre:'et les notations M / P ?',
    body:'<p>Robinson définit M et P par le <b>signe de l\'angle de torsion</b> entre le ligand prioritaire de l\'avant et celui de l\'arrière : négatif → M, positif → P.</p><p>Je préfère ne pas t\'écrire de correspondance toute faite entre M/P et a<i>R</i>/a<i>S</i> : mes propres calculs donnent l\'inverse de la règle qu\'on lit le plus souvent, et je n\'ai pas de source dans tes ouvrages pour trancher. C\'est noté dans <code>A_VERIFIER.md</code>.</p><p>En pratique, déroule la procédure CIP ci-dessus : elle donne directement a<i>R</i>/a<i>S</i>, qui est ce qu\'on te demande.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.6, p. 52.'}
});
