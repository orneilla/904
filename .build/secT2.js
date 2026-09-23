
/* ==========================================================================
   GROUPE 2 — Exercice 2 : les éléments de chiralité
   ========================================================================== */
const T2='Exercice 2 — la chiralité axiale';

S({
  grp:T2, title:'Un axe de chiralité, qu\'est-ce que c\'est ?',
  consigne:'Compare les deux dessins : celui de gauche est celui de l\'énoncé.',
  build(host){ const f=el('div','figbox'); f.innerHTML=figPlatTordu(); host.appendChild(f);
    host.appendChild(el('div','statusline','Les quatre molécules de l\'énoncé sont dessinées <b>à plat</b>. Un dessin plat d\'un biaryle ne contient aucune information de configuration : il faut le dire dans la copie.')); },
  une:'Il n\'y a aucun carbone asymétrique dans ces molécules : la chiralité vient de la <b>torsion</b> entre les deux cycles, bloquée par l\'encombrement.',
  probleme:'<p>On apprend d\'abord la chiralité comme « un carbone avec quatre groupes différents ». Mais un biphényle n\'a aucun carbone de ce type, et pourtant certains biphényles se dédoublent en deux énantiomères stables.</p><p>Le point clé n\'est pas <i>où sont les substituants</i> mais <b>si la molécule peut tourner</b>.</p>',
  etapes:[
   {q:'D\'où vient la chiralité.',
    t:'Deux cycles aromatiques reliés par une liaison simple ne peuvent pas rester coplanaires si leurs positions <b>ortho</b> sont occupées : les substituants se gênent. Les cycles se mettent alors en croix, et cette forme tordue est <b>chirale</b> (comme une hélice) dès que chaque cycle est lui-même dissymétrique.'},
   {q:'La condition n° 1 : chaque cycle doit être dissymétrique.',
    t:'Si un cycle porte deux substituants <b>identiques</b> en ortho, il possède un plan de symétrie local et la molécule est achirale, même très tordue. Il faut donc que les deux positions ortho de chaque cycle soient <b>différentes</b>.'},
   {q:'La condition n° 2 : la rotation doit être assez lente.',
    t:'C\'est là que tout se joue, et c\'est ce que l\'énoncé teste avec le mot « <i>certaines</i> ». Robinson donne le seuil : une barrière de rotation supérieure à environ <b>90 kJ·mol⁻¹</b> permet de séparer les stéréoisomères à température ambiante ; en dessous, la molécule racémise plus vite qu\'on ne la purifie.'},
   {q:'Combien de substituants ortho faut-il ?',
    t:'Robinson est explicite : sur les acides biphényl-2,2\'-dicarboxyliques, « <b>un brome en ortho sur chaque cycle suffit</b> » à permettre la séparation vers 0 °C — autrement dit il faut <b>quatre</b> substituants ortho, pas deux. Avec des substituants supplémentaires, les barrières atteignent 150 à 190 kJ·mol⁻¹ et les atropisomères sont parfaitement stables.'},
   {q:'Le mot à employer.',
    t:'Des stéréoisomères qui ne diffèrent que par une rotation empêchée autour d\'une liaison simple s\'appellent des <b>atropisomères</b> (de <i>a-tropos</i> : « qui ne tourne pas »). C\'est le mot attendu dans une copie.'}
  ],
  retenir:[
   'Chiralité <b>axiale</b> : pas de carbone asymétrique, un axe.',
   'Condition 1 : chaque cycle dissymétrique (ses deux ortho différents).',
   'Condition 2 : barrière de rotation &gt; ~90 kJ·mol⁻¹ à 25 °C.',
   'En pratique : il faut <b>3 ou 4</b> substituants ortho, sauf si l\'un d\'eux est très gros.'
  ],
  plus:{titre:'chiralité conformationnelle contre chiralité configurationnelle',
    body:'<p>Un biphényle très peu encombré est <b>toujours</b> tordu à un instant donné : à cet instant, la molécule <i>est</i> chirale. Mais elle passe son temps à basculer entre les deux formes tordues, si vite qu\'aucune méthode de séparation ne peut les distinguer.</p><p>Robinson formule cela très bien : « la symétrie d\'un composé, c\'est-à-dire sur l\'échelle de temps des séparations, n\'est jamais plus basse que la symétrie des conformères individuels ». Autrement dit, les molécules peuvent toutes être chirales alors que le <b>composé</b>, lui, est achiral et optiquement inactif.</p><p>C\'est ce qu\'on appelle une chiralité purement <b>conformationnelle</b>. Elle n\'est pas « fausse » — elle est simplement inutilisable, parce qu\'elle ne survit pas à l\'échelle de temps du chimiste.</p><p>Le même raisonnement explique pourquoi le cyclohexane substitué se comporte comme un hexagone plan sur l\'échelle de temps de la RMN à 25 °C : l\'inversion de chaise est trop rapide.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.5–4.6, p. 44–46 ; seuil de séparation p. 46, atropisomères p. 44.'},
  quiz:{q:'Le 2,2\'-diméthylbiphényle est-il résoluble en deux énantiomères à température ambiante&nbsp;?',
    a:'<b>Non.</b> Il n\'a que deux substituants ortho, et des méthyles ne sont pas assez volumineux : la barrière reste bien en dessous des ~90 kJ·mol⁻¹ nécessaires. Les deux formes tordues s\'interconvertissent en permanence.<br><br>Remarque : il ne remplit même pas la première condition proprement — chaque cycle porte un méthyle et un H en ortho, ce qui est dissymétrique, donc la condition 1 est bien satisfaite. C\'est uniquement la <b>condition cinétique</b> qui n\'est pas remplie. Les deux conditions sont vraiment indépendantes.'}
});

[0,1,2,3].forEach(k=>{
  const t=[
   {une:'Le BINAP possède un <b>axe de chiralité</b> : c\'est le ligand chiral le plus utilisé de la chimie organométallique.',
    et:[{q:'Chaque cycle est-il dissymétrique ?',t:'Oui. Sur chaque naphtalène, une position ortho porte le groupe <b>PPh₂</b>, l\'autre fait partie du <b>cycle soudé</b>. Ce sont deux choses différentes : condition 1 remplie.'},
        {q:'La rotation est-elle bloquée ?',t:'Très largement. Le cycle soudé du naphtalène bloque mécaniquement une position ortho, et le PPh₂ est énorme. Le BINAP ne racémise pas : on l\'achète et on le stocke sous forme (R) ou (S) pure.'},
        {q:'Peut-on lire sa configuration sur le dessin de l\'énoncé ?',t:'<b>Non.</b> Le dessin est plat : aucune torsion n\'y est représentée, donc aucun descripteur n\'est déterminable. Il faut l\'écrire dans la copie plutôt que d\'inventer.'},
        {q:'Ce qu\'il faut répondre.',t:'« Élément de chiralité : un <b>axe</b> (atropisomérie), le long de la liaison qui relie les deux naphtalènes. Configuration <b>a<i>R</i></b> ou <b>a<i>S</i></b> selon le sens de la torsion, non représenté ici. »'}],
    ret:['Axe de chiralité (atropisomérie).','Deux atropisomères parfaitement stables.','La configuration n\'est pas lisible sur un dessin plat.','C\'est le ligand des catalyseurs d\'hydrogénation asymétrique.']},
   {une:'Quatre substituants en ortho : la molécule remplit <b>les deux conditions sur le papier</b>. Mais le fluor est très petit — voir la réserve.',
    et:[{q:'Chaque cycle est-il dissymétrique ?',t:'Oui : chaque cycle porte un <b>CO₂H</b> d\'un côté et un <b>F</b> de l\'autre. Condition 1 remplie sans discussion.'},
        {q:'Combien de substituants ortho ?',t:'Quatre : c\'est le cas décrit par Robinson comme suffisant lorsqu\'il s\'agit de brome. La réponse attendue est donc : <b>oui, axe de chiralité</b>.'},
        {q:'Les priorités, si on doit attribuer.',t:'Sur chaque cycle, on compare les deux substituants ortho : <b>F</b> (Z = 9) l\'emporte sur le carbone du <b>CO₂H</b> (Z = 6). Le fluor est donc le ligand prioritaire de chaque côté.'},
        {q:'La réserve, que je te signale honnêtement.',t:'Le fluor est <b>beaucoup</b> plus petit que le brome — c\'est même le substituant le moins encombrant après l\'hydrogène. Les règles empiriques d\'encombrement des biphényles rangent ce composé parmi les cas <b>limites</b>, voire non résolubles. Je ne trouve pas de valeur mesurée dans les ouvrages que tu as déposés : c\'est noté dans <code>A_VERIFIER.md</code>, à confirmer avec ton enseignant.'}],
    ret:['Quatre substituants ortho : condition remplie sur le papier.','Priorité ortho : <b>F &gt; CO₂H</b>.','Réponse attendue : axe de chiralité, a<i>R</i> / a<i>S</i>.','Réserve : le fluor est très petit — cas limite possible.']},
   {une:'Celle-ci est le <b>contre-exemple</b> de l\'exercice : seulement deux substituants ortho, donc pas de chiralité exploitable.',
    et:[{q:'Chaque cycle est-il dissymétrique ?',t:'Oui : chaque cycle porte un CO₂H et un H en ortho. La condition 1 est remplie — ce n\'est donc <b>pas</b> par là que ça coince.'},
        {q:'La rotation est-elle bloquée ?',t:'<b>Non.</b> Il n\'y a que deux substituants ortho au total, et un H en face d\'un CO₂H laisse largement passer. Robinson dit explicitement qu\'il faut ajouter <b>un brome en ortho sur chaque cycle</b> pour rendre ce type de composé séparable — et encore, seulement vers 0 °C.'},
        {q:'La conclusion exacte à écrire.',t:'« Chaque molécule est chirale à un instant donné, mais les deux formes énantiomères s\'interconvertissent très rapidement : le <b>composé</b> est achiral et optiquement inactif. Il n\'y a pas d\'élément de chiralité <b>configurationnel</b>. »'},
        {q:'Pourquoi cette nuance vaut des points.',t:'Répondre « la molécule est plane donc achirale » est faux : elle n\'est pas plane. La bonne réponse fait intervenir le <b>temps</b>, pas la géométrie instantanée. C\'est exactement le point que Robinson développe sur les échelles de temps.'}],
    ret:['Seulement 2 substituants ortho → rotation rapide.','Chiralité <b>conformationnelle</b>, pas configurationnelle.','Le composé est optiquement inactif.','C\'est le « certaines » de l\'énoncé.']},
   {une:'Le BINOL : même squelette que le BINAP, mêmes conclusions — un axe de chiralité, parfaitement stable.',
    et:[{q:'Chaque cycle est-il dissymétrique ?',t:'Oui : une position ortho porte l\'<b>OH</b>, l\'autre appartient au cycle soudé.'},
        {q:'La rotation est-elle bloquée ?',t:'Oui, par les cycles soudés eux-mêmes. Le BINOL est vendu énantiopur, (R) ou (S), et sert de source de chiralité dans des dizaines de catalyseurs (phosphates chiraux, aluminium, titane…).'},
        {q:'Les priorités, si on doit attribuer.',t:'Sur chaque naphtalène : le carbone porteur de l\'<b>OH</b> est (O,C,C), celui de la soudure est (C,C,C). L\'oxygène l\'emporte → le côté <b>OH</b> est prioritaire de chaque côté.'},
        {q:'Et la configuration ?',t:'Comme pour le BINAP : <b>non déterminable</b> sur un dessin plat. On indique l\'élément (axe) et on précise que le descripteur demande une représentation en perspective.'}],
    ret:['Axe de chiralité, atropisomères stables.','Priorité ortho : le carbone porteur de l\'OH.','Configuration non lisible sur le dessin de l\'énoncé.','Source de chiralité très courante en catalyse.']}
  ][k];
  S({
    grp:T2, title:'Molécule '+(k+1)+' — '+(['BINAP','biphényle F + CO₂H','acide diphénique','BINOL'][k]),
    consigne:'Applique les deux conditions, dans l\'ordre.',
    build(host){ const f=el('div','figbox'); f.innerHTML=figBiaryl(k); host.appendChild(f); },
    une:t.une, etapes:t.et, retenir:t.ret
  });
});

S({
  grp:T2, title:'Attribuer a<i>R</i> ou a<i>S</i> : la procédure',
  consigne:'Change de panneau pour voir les deux configurations possibles.',
  build(host){
    const f=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const draw=()=>{ f.innerHTML=figAxeNewman(k); [...row.children].forEach((b,i)=>b.classList.toggle('on',i===k)); };
    ['Un sens','L\'autre sens'].forEach((t,i)=>{ const b=el('button','btn'); b.textContent=t;
      b.style.flex='1 1 45%'; b.onclick=()=>{k=i;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f); draw();
  },
  une:'On regarde le long de l\'axe, on donne les rangs 1 et 2 aux deux ligands du cycle <b>avant</b>, les rangs 3 et 4 à ceux du cycle <b>arrière</b>, puis on lit 1 → 2 → 3 comme pour un R/S ordinaire.',
  probleme:'<p>Il n\'y a pas de « carbone central » à regarder : l\'axe remplace le centre. La règle CIP traite alors l\'axe comme un <b>tétraèdre étiré</b> : les deux ligands proches de l\'œil comptent avant les deux ligands lointains, quels que soient leurs numéros atomiques.</p>',
  etapes:[
   {q:'Étape 1 — se placer.',
    t:'On regarde la molécule <b>le long de l\'axe</b>, depuis l\'un des deux bouts. Peu importe lequel : le résultat est le même, c\'est une propriété de la règle (je l\'ai vérifié numériquement dans les deux sens).'},
   {q:'Étape 2 — classer les deux ligands du cycle AVANT.',
    t:'Ce sont les deux substituants en ortho du cycle le plus proche de toi. On les compare par CIP. Le gagnant devient le rang <b>1</b>, l\'autre le rang <b>2</b>.'},
   {q:'Étape 3 — classer les deux ligands du cycle ARRIÈRE.',
    t:'Même chose sur le cycle du fond. Le gagnant devient le rang <b>3</b>, l\'autre le rang <b>4</b>. <b>Un ligand proche bat toujours un ligand lointain</b>, même si le lointain porte un atome plus lourd. C\'est la règle propre aux axes.'},
   {q:'Étape 4 — lire 1 → 2 → 3.',
    t:'Exactement comme pour un centre : sens horaire = <b>a<i>R</i></b>, sens antihoraire = <b>a<i>S</i></b>. Comme 1 et 2 sont à 180° l\'un de l\'autre en projection, c\'est en fait la position de <b>3</b> qui décide.'},
   {q:'Pourquoi on ne peut pas répondre sur les dessins de l\'énoncé.',
    t:'Cette procédure demande de savoir <b>quel cycle est devant</b> et de quel côté il est tourné. Un dessin plat ne le dit pas. L\'énoncé demande donc, en toute rigueur, de reconnaître l\'élément de chiralité et d\'expliquer la méthode — pas de sortir un descripteur.'}
  ],
  retenir:[
   'On regarde <b>le long de l\'axe</b>.',
   'Proche avant lointain : rangs 1–2 devant, 3–4 derrière.',
   'On lit 1 → 2 → 3 : horaire = a<i>R</i>, antihoraire = a<i>S</i>.',
   'Le même résultat depuis les deux bouts de l\'axe.'
  ],
  plus:{titre:'et les notations M / P ?',
    body:'<p>Il existe une seconde notation pour les axes et les hélices : <b>M</b> (<i>minus</i>) et <b>P</b> (<i>plus</i>). Robinson la définit par le <b>signe de l\'angle de torsion</b> entre le ligand prioritaire de l\'avant et le ligand prioritaire de l\'arrière : angle négatif → M, positif → P.</p><p>Les deux notations décrivent le même objet, mais je préfère ne pas t\'écrire de règle de correspondance toute faite entre M/P et a<i>R</i>/a<i>S</i> : mes propres calculs donnent une correspondance opposée à celle qu\'on lit souvent, et je n\'ai pas de source dans tes ouvrages pour trancher. C\'est noté dans <code>A_VERIFIER.md</code>.</p><p>En pratique, déroule la procédure CIP du panneau ci-dessus : elle donne directement a<i>R</i>/a<i>S</i>, qui est ce qu\'on te demande. N\'utilise M/P que si l\'énoncé l\'emploie.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.6, p. 52 (définition de M/P par le signe de l\'angle de torsion).'},
  quiz:{q:'Sur le BINOL, quel est le ligand prioritaire de chaque naphtalène&nbsp;?',
    a:'Sur chaque naphtalène, les deux positions ortho du carbone de jonction sont :<br>• <b>C2</b>, qui porte l\'OH → ses atomes sont <b>(O, C, C)</b> ;<br>• <b>C8a</b>, le carbone de soudure des deux cycles → ses atomes sont <b>(C, C, C)</b>.<br><br>L\'oxygène l\'emporte dès la première comparaison : <b>le côté OH est prioritaire</b>. On n\'a pas besoin d\'aller plus loin dans l\'arbre.<br><br>Même raisonnement pour le BINAP, où le phosphore (Z = 15) écrase tout : le côté PPh₂ est prioritaire.'}
});

S({
  grp:T2, title:'Récapitulatif de l\'exercice 2',
  consigne:'La réponse complète.',
  build(host){
    const b=el('div');
    b.innerHTML=recapHTML([
      {t:'BINAP', c:'var(--green)', v:'AXE de chiralité',
       d:'Deux PPh₂ plus les deux cycles soudés : la rotation est impossible, les atropisomères sont stables.'},
      {t:'acide 6,6\'-difluorobiphényl-2,2\'-dicarboxylique', c:'var(--green)', v:'AXE de chiralité',
       d:'Quatre substituants en ortho. <b style="color:var(--red)">Réserve :</b> le fluor est très petit — cas possiblement limite, à confirmer.'},
      {t:'acide biphényl-2,2\'-dicarboxylique', c:'var(--red)', v:'AUCUN élément de chiralité',
       d:'Deux substituants en ortho seulement : la rotation est rapide, le composé est optiquement inactif.'},
      {t:'BINOL', c:'var(--green)', v:'AXE de chiralité',
       d:'Deux OH plus les deux cycles soudés : atropisomères parfaitement stables.'}
    ]);
    host.appendChild(b);
    host.appendChild(el('div','statusline','Aucune des quatre molécules ne contient de <b>centre</b> de chiralité : aucun carbone n\'y porte quatre groupes différents. C\'est le premier réflexe à avoir en lisant l\'énoncé.'));
  },
  une:'Trois molécules sur quatre possèdent un axe de chiralité ; la quatrième tourne trop vite pour qu\'on puisse en parler.',
  flag:'<b>Sur les configurations.</b> L\'énoncé demande de « déterminer leurs configurations », mais les quatre molécules sont dessinées <b>à plat</b> : aucune torsion n\'est représentée, donc aucun descripteur a<i>R</i>/a<i>S</i> n\'est déterminable à partir de ces dessins. La réponse rigoureuse consiste à identifier l\'axe, à donner les priorités des ligands ortho, à expliquer la procédure — et à signaler que le dessin est insuffisant. C\'est peut-être justement ce que l\'exercice cherche à faire dire.',
  retenir:[
   'Pas de centre de chiralité dans cet exercice : que des axes.',
   'Deux conditions, indépendantes : dissymétrie + barrière de rotation.',
   'Le seuil pratique : ~90 kJ·mol⁻¹ à température ambiante.',
   'Dessin plat = pas de configuration lisible.'
  ]
});
