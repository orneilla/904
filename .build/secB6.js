
/* ==========================================================================
   GROUPE 6 — Topicité
   ========================================================================== */
const G6='6 — Topicité';

S({
  grp:G6, title:'Homotopes, énantiotopes, diastéréotopes',
  consigne:'Choisis un des trois cas et regarde les deux produits obtenus en bas.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), why=el('div','statusline'); let cur='homo';
    const draw=()=>{ fig.innerHTML=figTopicite(cur);
      why.innerHTML='<b>'+TOPO[cur].nom+'.</b> '+TOPO[cur].why;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['homo','Cas 1'],['enantio','Cas 2'],['diastereo','Cas 3']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig); host.appendChild(why); draw();
  },
  une:'Deux atomes identiques en isolation ne le sont plus forcément dans une molécule. Le test : on en remplace un, puis l\'autre, et on compare.',
  probleme:'<p>Voici l\'observation qui a lancé tout le sujet. Les deux hydrogènes du CH₂ de l\'éthanol paraissent interchangeables. Pourtant l\'alcool déshydrogénase de levure n\'en enlève <b>qu\'un seul</b>, et toujours le même. Comment une enzyme peut‑elle distinguer deux atomes qui semblent identiques&nbsp;?</p>',
  etapes:[
   {q:'Le test, en une phrase.',
    t:'On remplace mentalement l\'un des deux atomes par un groupe nouveau, puis on recommence avec l\'autre, et on compare les deux produits. Il n\'y a que <b>trois</b> réponses possibles — ce sont les mêmes trois cas que l\'arbre de décision de la section 1.'},
   {q:'Même molécule → homotopes.',
    t:'Les deux atomes sont échangés par une <b>rotation</b> de la molécule : ils occupent véritablement la même place. Rien ne peut les distinguer, ni un réactif, ni une enzyme, ni la RMN.'},
   {q:'Deux énantiomères → énantiotopes.',
    t:'Ils sont échangés par un <b>plan de symétrie</b>, jamais par une rotation. Un réactif achiral ne les distingue pas ; un réactif chiral, si. C\'est le cas des deux H de l\'éthanol — d\'où l\'enzyme.'},
   {q:'Deux diastéréoisomères → diastéréotopes.',
    t:'Aucune symétrie ne les relie, parce qu\'il y a déjà un centre stéréogène ailleurs dans la molécule. Même un réactif achiral les distingue, et on voit <b>deux signaux séparés</b> en RMN.'},
   {q:'Cela vaut aussi pour des GROUPES, pas seulement des atomes.',
    t:'Robinson prend l\'exemple historique de l\'acide citrique : une enzyme y distingue non seulement deux H diastéréotopes, mais aussi deux <b>bras CH₂CO₂H entiers</b> qui sont énantiotopes. Avant 1960, cela paraissait impossible.'},
   {q:'Et cela vaut aussi pour des FACES.',
    t:'Les deux faces d\'un C=O ou d\'un C=C se classent exactement de la même façon : homotopes (méthanal), énantiotopes (éthanal), ou diastéréotopes si la molécule contient déjà un centre stéréogène. C\'est l\'objet de la dernière section.'}
  ],
  retenir:[
   'Homotopes = même place (rotation). Énantiotopes = places en miroir (plan). Diastéréotopes = places différentes (rien).',
   'Énantiotopes → il faut un réactif chiral pour les distinguer.',
   'Diastéréotopes → un réactif achiral suffit, et la RMN les sépare.',
   'Le concept s\'applique aux atomes, aux groupes et aux faces.'
  ],
  plus:{titre:'Pourquoi une enzyme y arrive',
    body:'<p>L\'explication tient en une phrase : une enzyme est <b>chirale</b>. Quand le substrat se fixe dans le site actif, il n\'y a plus de plan de symétrie dans l\'ensemble substrat + enzyme. Les deux H, qui étaient énantiotopes dans le substrat isolé, deviennent <b>diastéréotopes</b> dans le complexe — et réagissent à des vitesses très différentes.</p><p>C\'est rigoureusement le même raisonnement que celui de la synthèse asymétrique : on rend diastéréoisomères deux situations qui étaient énantiomères. L\'enzyme, le complexe sec-BuLi·spartéine de Hoppe, ou le titane–tartrate de Sharpless font exactement la même chose.</p><p>Robinson ajoute une remarque désabusée : avant 1960, les chimistes et les biochimistes étaient <i>surpris</i> qu\'une enzyme puisse faire cela. Aujourd\'hui, tu ne devrais pas l\'être.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.8, fig. 4.26–4.29, p. 54–55.'},
  quiz:{q:'En RMN ¹H, les deux protons d\'un CH₂ d\'une molécule chirale donnent souvent deux signaux distincts avec un couplage entre eux. Pourquoi&nbsp;?',
        a:'Parce qu\'ils sont <b>diastéréotopes</b> : la molécule contient déjà un centre stéréogène, donc aucune symétrie ne relie les deux H. Ils ont des environnements chimiques réellement différents, donc des déplacements chimiques différents — et, étant inéquivalents, ils se couplent entre eux (couplage géminal, typiquement 10 à 15 Hz). C\'est un indice très utile en pratique : un système AB sur un CH₂ signale souvent un centre stéréogène dans la molécule.'}
});

S({
  grp:G6, title:'Nommer chacun des deux : pro-R et pro-S',
  consigne:'Touche « promouvoir Hₐ » puis « promouvoir Hᵦ » et regarde le descripteur obtenu.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur=null;
    const draw=()=>{ fig.innerHTML=figProRS(cur);
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['a','Promouvoir Hₐ'],['b','Promouvoir Hᵦ']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.style.flex='1 1 44%';
      b.onclick=()=>{cur=(cur===k?null:k);draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','statusline','Astuce pratique : remplacer l\'un des deux H par un <b>deutérium</b> revient exactement à le promouvoir (règle CIP n° 2, masse isotopique). C\'est d\'ailleurs comme ça qu\'on le fait au laboratoire, avec des substrats marqués.'));
    draw();
  },
  une:'Pour nommer deux ligands hétérotopes, on en promeut un artificiellement, on applique CIP, et on donne au ligand promu le nom du descripteur obtenu.',
  probleme:'<p>Dire « les deux H sont énantiotopes » ne suffit pas quand on veut décrire une réaction : il faut pouvoir dire <b>lequel</b> a été enlevé. Il faut donc un nom pour chacun.</p>',
  etapes:[
   {q:'Le principe.',
    t:'Le carbone porteur est appelé <b>prochiral</b> : si l\'on change un des deux ligands, il devient un centre stéréogène. On va donc nommer les ligands d\'après le centre qu\'ils <i>produiraient</i>.'},
   {q:'La méthode, en trois temps.',
    t:'(1) On donne arbitrairement à l\'un des deux ligands une priorité supérieure à l\'autre, <b>sans toucher</b> au classement des deux autres substituants. (2) On applique CIP normalement. (3) Si le centre obtenu est R, le ligand promu est <b>pro-R</b> ; s\'il est S, il est <b>pro-S</b>.'},
   {q:'Sur l\'éthanol.',
    t:'Dans le dessin ci‑dessus, promouvoir Hₐ (trait gras) donne (S) : Hₐ est donc <b>pro-S</b>. Promouvoir Hᵦ (trait pointillé) donne (R) : Hᵦ est <b>pro-R</b>. Vérifié par RDKit sur les coordonnées exactes du schéma.'},
   {q:'Attention à ce que le nom décrit.',
    t:'Robinson insiste : pro-R et pro-S s\'appliquent aux <b>ligands</b>, pas au centre prochiral qui les porte. Le carbone, lui, n\'est ni pro-R ni pro-S.'},
   {q:'Le piège à ne pas oublier.',
    t:'Il n\'existe <b>aucune correspondance générale</b> entre pro-R/pro-S (qui nomme des ligands) et Re/Si (qui nomme des faces). Les deux ne coïncident que si les ligands hétérotopes sont de priorité extrême — la plus haute ou la plus basse. Ce n\'est pas le cas des deux méthyles du propan-2-ol, par exemple.'}
  ],
  retenir:[
   'On promeut un ligand, on applique CIP, on lit R ou S : le ligand promu est pro-R ou pro-S.',
   'Un deutérium à la place d\'un H fait exactement ce travail (règle CIP n° 2).',
   'pro-R / pro-S nomment un LIGAND, pas le centre.',
   'Aucun lien automatique avec Re/Si.'
  ],
  quiz:{q:'À quoi sert concrètement ce vocabulaire en biochimie&nbsp;?',
        a:'À écrire des mécanismes enzymatiques sans ambiguïté. Quand on dit qu\'une déshydrogénase transfère « l\'hydrure pro-R du NADH », on décrit exactement ce qui se passe, et cela se vérifie par marquage au deutérium : on synthétise le cofacteur deutéré sur une position précise et on regarde où part le deutérium. C\'est l\'une des plus belles utilisations de la stéréochimie — elle a permis de cartographier des mécanismes qu\'aucune autre technique ne pouvait atteindre.'}
});

S({
  grp:G6, title:'Les faces Re et Si',
  consigne:'Bascule entre « face Re » et « face Si » et suis la flèche bleue.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='Re';
    const draw=()=>{ fig.innerHTML=figReSi(cur);
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['Re','Face Re'],['Si','Face Si']].forEach(([k,t])=>{
      const b=el('button','btn blue'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','note','<b>À ne pas confondre.</b> <i>Re</i> et <i>Si</i> nomment une <b>face</b>, donc un côté du plan, <i>avant</i> la réaction. <i>R</i> et <i>S</i> nomment un <b>centre tétraédrique</b>, donc une molécule, <i>après</i>. Aucune règle automatique ne passe de l\'un à l\'autre.'));
    draw();
  },
  une:'Re et Si nomment les deux côtés d\'un atome plan, comme R et S nomment les deux versions d\'un centre tétraédrique.',
  probleme:'<p>Dernière brique. On sait maintenant nommer les ligands d\'un carbone prochiral ; il reste à nommer les deux <b>faces</b> d\'un atome trigonal — c\'est le vocabulaire qu\'utilisent tous les mécanismes d\'addition sur un C=O ou un C=N.</p>',
  etapes:[
   {q:'De quoi part-on ?',
    t:'D\'un atome trigonal, typiquement le carbone d\'un C=O ou d\'un C=N. Il est sp², donc <b>plan</b>, avec trois substituants autour de lui.'},
   {q:'Première étape : classer.',
    t:'On applique CIP aux trois substituants : a &gt; b &gt; c. Sur l\'éthanal : a = O (dédoublé par la double liaison), b = CH₃, c = H.'},
   {q:'Deuxième étape : se placer d\'un côté.',
    t:'Les trois ligands définissent un plan qui coupe l\'espace en deux régions. Si, vue de ce côté, la séquence a → b → c tourne <b>dans le sens des aiguilles d\'une montre</b>, on regarde la face <b>Re</b>. Sinon, c\'est la face <b>Si</b>.'},
   {q:'Comment classer les deux faces.',
    t:'Exactement comme les ligands : homotopes si un axe de symétrie les échange (méthanal), <b>énantiotopes</b> si c\'est un plan (éthanal), <b>diastéréotopes</b> si la molécule contient déjà un centre stéréogène. On retrouve les trois mêmes cas.'},
   {q:'Attention pour la suite.',
    t:'Dire « le nucléophile attaque par la face Re » décrit complètement l\'étape. Mais pour donner le descripteur R ou S du <b>produit</b>, il faut <b>refaire</b> un classement CIP sur le nouveau centre, en tenant compte du groupe qui vient d\'arriver — et qui ne figurait pas dans le classement a &gt; b &gt; c.'}
  ],
  retenir:[
   'Re / Si = une face (avant). R / S = un centre (après).',
   'a → b → c dans le sens horaire vu de la face Re ; antihoraire vu de la face Si.',
   'Les deux faces se classent comme les ligands : homo-, énantio- ou diastéréotopes.',
   'Attaquer la face Re ne donne pas forcément un produit (R).'
  ],
  plus:{titre:'Un dernier mot : la topicité dépend de l\'échelle de temps',
    body:'<p>Tu ne seras plus surprise, après la section 1.3. Les trois hydrogènes d\'un groupe méthyle ne sont <b>pas</b> équivalents à un instant donné : dans la conformation décalée de la méthylamine, la liaison C–H antipériplanaire au doublet de l\'azote est mesurablement plus longue (108,9 pm contre 108,0 pm) et vibre à une fréquence différente (2880 contre 2955 cm⁻¹). Ils sont donc diastéréotopes.</p><p>Pourtant, en RMN, un méthyle ne donne qu\'un seul signal. Pourquoi&nbsp;? Parce que la rotation du méthyle est bien plus rapide que l\'échelle de temps de la RMN : les trois protons échangent leurs environnements et leurs déplacements chimiques se moyennent.</p><p>Morale : quand tu affirmes que deux atomes sont équivalents, précise toujours <b>pour quelle technique</b>. La spectroscopie infrarouge, beaucoup plus rapide, les voit différents ; la RMN ne les distingue pas.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.9 et §4.10, fig. 4.32 et 4.33, p. 56–57.'},
  flag:'📘 Tu as fini les bases. La suite logique : <i>chap1_synthese_asymetrique.html</i>, qui applique tout ceci à la synthèse asymétrique — auxiliaires d\'Evans et d\'Ellman, réactifs de Hoppe et TADDOL, époxydation de Sharpless.',
  quiz:{q:'Un hydrure attaque la face Re du propanal. Le produit est-il forcément (R)&nbsp;?',
        a:'Non. Re/Si dit <b>par où</b> l\'attaque a eu lieu. Pour le descripteur du produit il faut reclasser les quatre substituants du nouveau centre — dont l\'hydrogène qui vient d\'arriver. Ici le produit est le propan-1-ol, qui n\'a même pas de centre stéréogène : bon rappel qu\'attaquer une face ne crée pas forcément un stéréocentre.'}
});
