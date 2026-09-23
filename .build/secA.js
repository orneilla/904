
/* ==========================================================================
   GROUPE A — Les bases (le pourquoi)
   ========================================================================== */
const GA='A — Les bases';

S({
  grp:GA, title:'Pourquoi une réaction ordinaire donne toujours 50 : 50',
  note_bases:1,
  consigne:'Appuie sur « réactif chiral » et regarde ce qui disparaît en bas du schéma.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='achiral';
    const draw=()=>{fig.innerHTML=figMiroir(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['achiral','Réactif achiral'],['chiral','Réactif chiral']].forEach(([k,t])=>{
      const b=el('button','btn green'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Tant que le système réactionnel tout entier possède un miroir, les deux énantiomères se forment exactement à la même vitesse. Faire de la synthèse asymétrique, c\'est supprimer ce miroir.',
  probleme:'<p><b>Tu veux reprendre les bases d\'abord ?</b> Le support <i>bases_stereochimie.html</i>, dans le même dossier, reprend tout le chapitre 4 de Robinson : arbre de décision, échelle de temps, unités stéréogènes, règles CIP, Fischer, méso, polarimétrie, topicité. Ce groupe-ci n\'en garde que le strict nécessaire pour la synthèse asymétrique.</p><p>On part du benzaldéhyde. Son carbone n\'est pas stéréogène : il est sp², donc <b>plan</b>. Mais dès qu\'un nucléophile s\'additionne dessus, il devient tétraédrique et donc stéréogène. On dit que le substrat est <b>prochiral</b> : il ne demande qu\'à devenir chiral.</p><p>Le problème, c\'est qu\'il y a deux façons d\'arriver sur un plan : par-dessus ou par-dessous.</p>',
  etapes:[
   {q:'Pourquoi obtient-on deux produits différents ?',
    t:'Le nucléophile peut attaquer l\'une ou l\'autre face du carbonyle. Les deux produits ainsi formés sont images l\'un de l\'autre dans un miroir : ce sont les <b>deux énantiomères</b>.'},
   {q:'Pourquoi exactement 50 : 50, et pas 60 : 40 ?',
    t:'Avec un réactif achiral, le dessin complet — substrat, réactif, solvant — possède un plan de symétrie. Les deux chemins sont donc <b>images l\'un de l\'autre</b>. Deux objets en miroir ont rigoureusement la même énergie, donc les deux vitesses sont rigoureusement égales.'},
   {q:'Peut-on s\'en sortir en jouant sur la température, la pression, le solvant ?',
    t:'Non, et c\'est important : tant que tous ces paramètres sont achiraux, ils agissent <b>identiquement</b> sur les deux chemins. Rien d\'achiral ne peut départager deux images miroir. Le racémique n\'est pas un accident, c\'est une obligation.'},
   {q:'Alors que faut-il faire ?',
    t:'Introduire dans le système quelque chose de <b>chiral et énantiopur</b> : un auxiliaire fixé sur le substrat, un réactif, ou un catalyseur. Le plan de symétrie du dessin disparaît, les deux chemins cessent d\'être images l\'un de l\'autre — et plus rien n\'oblige leurs énergies à être égales.'}
  ],
  retenir:[
   'Substrat prochiral + environnement 100 % achiral = racémique, sans exception.',
   'La chiralité ne se crée pas à partir de rien : il faut en <b>apporter</b> une, énantiopure.',
   'Toute la suite du chapitre n\'est qu\'une réponse à la question : <b>où</b> place-t-on cette chiralité — sur le substrat, dans le réactif, ou dans le catalyseur ?'
  ],
  plus:{titre:'La phrase qui résume tout le chapitre',
    body:'<p>Procter l\'écrit ainsi : <i>« any feature of the reacting system which would cause the possible transition states for the reaction to be <b>diastereoisomeric</b> (where they would normally be <b>enantiomeric</b>) could lead to the preferential formation of one diastereoisomer or enantiomer. »</i></p><p>Traduction : peu importe <i>ce que</i> tu ajoutes de chiral, et peu importe <i>où</i>. Ce qui compte, c\'est le résultat sur les <b>états de transition</b>. Tant qu\'ils sont énantiomères, ils sont égaux en énergie. Dès qu\'ils deviennent diastéréoisomères, ils n\'ont plus aucune raison de l\'être — et l\'un des deux l\'emporte.</p><p>C\'est aussi pour cela qu\'on parle d\'un substrat <b>prochiral</b> et pas simplement « achiral » : il possède deux faces (ou deux atomes) qui vont devenir distinguables.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i>, chapitre 2 « Principles »</b>, p. 5–6.'},
  quiz:{q:'Si on fait la réaction dans un solvant chiral énantiopur, peut-on obtenir un excès&nbsp;?',
        a:'Oui, en principe : le solvant solvate les réactifs, donc il fait partie de l\'état de transition. Les deux ET deviennent diastéréoisomères et un excès devient possible. En pratique les excès obtenus sont faibles et imprévisibles, et il existe très peu de solvants à la fois chiraux, énantiopurs, bon marché et utilisables — Procter la cite comme une curiosité, pas comme une méthode.'}
});

S({
  grp:GA, title:'Homotopes, énantiotopes, diastéréotopes',
  consigne:'Choisis un des trois cas et regarde les deux produits obtenus en bas.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), why=el('div','statusline'); let cur='homo';
    const draw=()=>{
      fig.innerHTML=figTopicite(cur);
      why.innerHTML='<b>'+TOPO[cur].nom+'.</b> '+TOPO[cur].why;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    [['homo','Cas 1'],['enantio','Cas 2'],['diastereo','Cas 3']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); host.appendChild(why); draw();
  },
  une:'Deux atomes qui se ressemblent ne sont pas forcément interchangeables. Le test est toujours le même : on en remplace un, puis l\'autre, et on compare les deux produits.',
  probleme:'<p>Dans l\'éthanol CH₃–CH₂–OH, les deux hydrogènes du CH₂ ont l\'air rigoureusement identiques. Pourtant une enzyme (l\'alcool déshydrogénase de levure) sait parfaitement les distinguer, et le complexe sec-BuLi·spartéine de Hoppe aussi — tu le verras en section D.</p><p>Il faut donc un vocabulaire pour dire <i>à quel point</i> deux atomes se ressemblent. Ce vocabulaire s\'applique aussi aux deux <b>faces</b> d\'une double liaison, ce qui le rend indispensable pour tout le chapitre.</p>',
  etapes:[
   {q:'Quel est le test ?',
    t:'On remplace mentalement un des deux atomes par un groupe nouveau (ici Br), puis on recommence avec l\'autre. On compare ensuite les deux produits obtenus. Il n\'y a que <b>trois réponses possibles</b> — d\'où trois noms.'},
   {q:'Premier cas : la même molécule.',
    t:'Les deux atomes sont <b>homotopes</b>. On passe de l\'un à l\'autre par une simple <b>rotation</b> de la molécule : ils occupent véritablement la même place. Aucun réactif, même chiral, même une enzyme, ne peut les distinguer.'},
   {q:'Deuxième cas : deux énantiomères.',
    t:'Les deux atomes sont <b>énantiotopes</b>. On passe de l\'un à l\'autre par un <b>plan de symétrie</b>, jamais par une rotation. Un réactif achiral ne les distingue pas (50/50), mais un réactif chiral, lui, les distingue.'},
   {q:'Troisième cas : deux diastéréoisomères.',
    t:'Les deux atomes sont <b>diastéréotopes</b>. Aucune symétrie ne les relie, parce que la molécule contient déjà un centre stéréogène ailleurs. Même un réactif <b>achiral</b> les distingue — et on les voit d\'ailleurs comme deux signaux séparés en RMN.'}
  ],
  retenir:[
   'Homotopes = même place. Énantiotopes = places en miroir. Diastéréotopes = places réellement différentes.',
   'Énantiotopes → il faut apporter un réactif <b>chiral</b>. C\'est la stratégie du réactif chiral (Hoppe).',
   'Diastéréotopes → le substrat contient déjà l\'information. C\'est la stratégie de l\'auxiliaire (Evans).',
   'Tout ceci vaut aussi pour les deux <b>faces</b> d\'un C=O ou d\'un C=C, pas seulement pour des atomes.'
  ],
  plus:{titre:'Les descripteurs pro-R / pro-S, et un piège',
    body:'<p>Pour nommer individuellement deux ligands hétérotopes, on utilise <b>pro-R</b> et <b>pro-S</b> : on donne arbitrairement la priorité supérieure à l\'un des deux et on applique CIP. Si le centre devient (R), le ligand promu est pro-R.</p><p>Le piège : il n\'existe <b>aucune correspondance générale</b> entre pro-R/pro-S (qui nomme des ligands) et Re/Si (qui nomme des faces). Robinson insiste dessus. Elles ne coïncident que si les ligands hétérotopes sont de priorité la plus haute ou la plus basse.</p><p>Deuxième subtilité : la topicité observée dépend de l\'échelle de temps. Les trois H d\'un méthyle sont diastéréotopes à l\'instant t (leurs liaisons C–H n\'ont pas la même longueur), mais la rotation est si rapide qu\'en RMN on ne voit qu\'un seul signal moyenné.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i> (Oxford Chemistry Primers 88)</b>, §4.8 « Stereoheterotopic ligands » et §4.9–4.10, p. 54–57.'},
  quiz:{q:'Pourquoi l\'auxiliaire d\'Evans transforme-t-il un problème d\'énantiotopie en problème de diastéréotopie&nbsp;?',
        a:'Parce qu\'en accrochant un auxiliaire énantiopur sur le substrat, on introduit un centre stéréogène <b>dans la molécule elle-même</b>. Les deux faces de l\'énolate, qui étaient énantiotopes, deviennent <b>diastéréotopes</b> : plus aucune symétrie ne les relie. Du coup un réactif parfaitement achiral (E–X) suffit à les distinguer. C\'est exactement pour cela que le schéma de la diapo dit « achiral reagent ».'}
});

S({
  grp:GA, title:'Les faces Re et Si',
  consigne:'Bascule entre « face Re » et « face Si » et suis la flèche bleue.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='Re';
    const draw=()=>{fig.innerHTML=figReSi(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['Re','Face Re'],['Si','Face Si']].forEach(([k,t])=>{
      const b=el('button','btn blue'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','note','<b>À ne pas confondre.</b> <i>Re</i> et <i>Si</i> nomment une <b>face</b>, donc un côté du plan, <i>avant</i> la réaction. <i>R</i> et <i>S</i> nomment un <b>centre tétraédrique</b>, donc une molécule, <i>après</i> la réaction. Il n\'existe pas de règle automatique qui passe de l\'un à l\'autre.'));
    draw();
  },
  une:'Re et Si nomment les deux côtés d\'un atome plan, comme R et S nomment les deux versions d\'un centre tétraédrique.',
  probleme:'<p>Quand tes notes écrivent « addition on the Si face » pour l\'auxiliaire d\'Ellman, il faut savoir de quel côté on parle. Sans ce vocabulaire, impossible de vérifier soi‑même un mécanisme : on est obligé de faire confiance au dessin.</p>',
  etapes:[
   {q:'De quoi part-on ?',
    t:'D\'un atome trigonal — typiquement le carbone d\'un C=O ou d\'un C=N. Il est sp², donc <b>plan</b>, avec trois substituants autour de lui.'},
   {q:'Première étape : classer.',
    t:'On applique les règles CIP aux trois substituants : a &gt; b &gt; c. Sur l\'éthanal ci‑dessus : a = O (dédoublé par la double liaison), b = CH₃, c = H.'},
   {q:'Deuxième étape : se placer d\'un côté.',
    t:'On regarde le plan depuis l\'un des deux côtés. Si la séquence a → b → c tourne <b>dans le sens des aiguilles d\'une montre</b>, on est en face de la face <b>Re</b>. Si elle tourne dans l\'autre sens, c\'est la face <b>Si</b>.'},
   {q:'Et ensuite ?',
    t:'Dire « le nucléophile attaque par la face Re » décrit complètement la stéréochimie de l\'étape. Mais pour donner le descripteur R ou S du produit, il faut <b>refaire</b> un classement CIP sur le nouveau centre, en tenant compte du groupe qui vient d\'arriver.'}
  ],
  retenir:[
   'Re / Si = une face (avant). R / S = un centre (après).',
   'Attaquer la face Re ne donne pas forcément un produit (R) : il faut reclasser.',
   'Les deux faces d\'un C=O sont énantiotopes si la molécule est achirale, diastéréotopes si elle contient déjà un centre stéréogène — c\'est toute l\'astuce de l\'auxiliaire.'
  ],
  plus:{titre:'Définition exacte',
    body:'<p>Les trois ligands définissent un plan, qui coupe l\'espace en deux régions. Robinson : <i>« The order a, b, c of the ligands is clockwise when viewed from the Re space, anticlockwise from the Si space. »</i></p><p>Le nom vient du latin <i>rectus</i> et <i>sinister</i>, exactement comme R et S — d\'où la confusion fréquente. Pour une double liaison C=C, chacun des deux carbones porte ses propres faces, et on écrit par exemple <i>(Re,Si)</i> pour préciser les deux.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.9 « Si and Re nomenclature », p. 56.'},
  quiz:{q:'Un hydrure attaque la face Re du propanal. Le produit est-il forcément (R)&nbsp;?',
        a:'Non. Re/Si dit <b>par où</b> l\'attaque a eu lieu. Pour le descripteur du produit, il faut reclasser les quatre substituants du nouveau centre — dont l\'hydrogène qui vient d\'arriver, et qui était absent du classement a &gt; b &gt; c. Ici le produit est le propan-1-ol… qui n\'a même pas de centre stéréogène. C\'est un bon rappel : attaquer une face n\'implique pas forcément de créer un stéréocentre.'}
});

S({
  grp:GA, title:'e.r., e.e., d.r. : que veulent dire les chiffres ?',
  consigne:'Fais glisser le curseur et regarde combien de billes changent de couleur.',
  build(host){
    const fig=el('div','figbox'), ctl=el('div','card');
    ctl.innerHTML=`<div class="slab"><span>Excès énantiomérique</span><b><span id="vee2">96,0</span> %</b></div>
      <input type="range" id="see" min="0" max="99.8" step="0.2" value="96">
      <div class="btnrow" style="margin-top:8px">
        <button class="btn" data-v="0">racémique</button>
        <button class="btn" data-v="88">94 : 6</button>
        <button class="btn" data-v="97">98,5 : 1,5</button>
      </div>
      <div id="conv" class="statusline" style="margin-top:10px"></div>`;
    host.appendChild(fig); host.appendChild(ctl);
    const sl=ctl.querySelector('#see');
    const upd=()=>{
      const ee=parseFloat(sl.value), maj=(100+ee)/2, min=100-maj;
      fig.innerHTML=figCentMolecules(ee);
      ctl.querySelector('#vee2').textContent=ee.toFixed(1).replace('.',',');
      ctl.querySelector('#conv').innerHTML=
        `e.r. = <b>${maj.toFixed(1).replace('.',',')} : ${min.toFixed(1).replace('.',',')}</b><br>`
       +`e.e. = ${maj.toFixed(1).replace('.',',')} − ${min.toFixed(1).replace('.',',')} = <b>${ee.toFixed(1).replace('.',',')} %</b><br>`
       +`lecture physique : <b>${ee.toFixed(1).replace('.',',')} %</b> de produit énantiopur + <b>${(100-ee).toFixed(1).replace('.',',')} %</b> de racémique.`;
    };
    sl.oninput=upd;
    ctl.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{sl.value=b.dataset.v;upd();});
    upd();
  },
  une:'L\'e.r. est un rapport, l\'e.e. est un écart : ils disent la même chose de deux façons. Ce qui change vraiment, c\'est « e » (énantio) ou « d » (diastéréo).',
  probleme:'<p>Tes notes mélangent d.r. (99:1), e.r. (98,5:1,5) et e.e. (96 %). Ce sont trois écritures pour deux idées. Tant qu\'on ne les traduit pas les unes dans les autres, on ne peut pas comparer deux réactions entre elles.</p>',
  etapes:[
   {q:'e.r. — rapport énantiomérique.',
    t:'Simplement « combien d\'un côté pour combien de l\'autre », normalisé à 100. Un e.r. de 98,5 : 1,5 veut dire : sur 100 molécules de produit, 98,5 sont d\'un énantiomère et 1,5 de l\'autre.'},
   {q:'e.e. — excès énantiomérique.',
    t:'C\'est la <b>différence</b> : e.e. = majoritaire (%) − minoritaire (%). Pour 98,5 : 1,5 → e.e. = 97 %. C\'est le chiffre historique, parce qu\'il se mesurait autrefois au pouvoir rotatoire.'},
   {q:'Comment se représenter un e.e. de 97 % ?',
    t:'Un mélange à 97 % d\'e.e., c\'est <b>97 % de produit énantiopur + 3 % de racémique</b>. Sur le dessin ci‑dessus : 3 billes « en trop » d\'un côté sont compensées par 3 de l\'autre, et il ne reste que l\'excès.'},
   {q:'Et d.r. / d.e. ?',
    t:'Exactement les mêmes définitions, mais entre <b>diastéréoisomères</b>. La différence n\'est pas mathématique, elle est pratique : un d.r. peut être remonté par chromatographie, un e.r. presque jamais.'}
  ],
  retenir:[
   'e.e. = 2 × (majoritaire %) − 100. Inversement : majoritaire % = (100 + e.e.)/2.',
   '99 : 1 → 98 % ; 98 : 2 → 96 % ; 94 : 6 → 88 % ; 98,5 : 1,5 → 97 %.',
   'Un e.e. médiocre en catalyse est une mauvaise nouvelle définitive ; un d.r. médiocre avec un auxiliaire se rattrape sur colonne.'
  ],
  plus:{titre:'Pourquoi on écrit de plus en plus l\'e.r. plutôt que l\'e.e.',
    body:'<p>Parce que c\'est l\'e.r. qui est relié directement aux vitesses, donc à l\'énergie : e.r. = k<sub>maj</sub>/k<sub>min</sub> = exp(ΔΔG‡/RT). L\'e.e., lui, ne se relie à ΔΔG‡ que par une formule tordue.</p><p>Et sur le plan expérimental, l\'e.r. est ce que lit directement une HPLC chirale : deux pics, deux aires. L\'e.e. est un calcul fait après.</p><p>Attention enfin à un piège de vocabulaire fréquent : « 96 % » tout court est ambigu. Dans tes notes, « 96 % » à côté d\'un d.r. est un <b>rendement</b>, pas une sélectivité.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, fig. 2.1 et 2.3 (définitions de d.e. et e.e.).'},
  quiz:{q:'Un d.r. de 94 : 6 correspond à quel d.e.&nbsp;?',
        a:'d.e. = 94 − 6 = <b>88 %</b>. C\'est la ligne « Et » de ton tableau d\'électrophiles : le d.r. paraît honorable, mais le d.e. montre qu\'on est loin des 98 % du benzyle.'}
});
