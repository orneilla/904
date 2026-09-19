
/* ==========================================================================
   GROUPE E — Réactif chiral : Hoppe et la (−)-spartéine
   ========================================================================== */
const GE='E — Réactif chiral : Hoppe';

S({
  grp:GE, title:'Deux protons qui se ressemblent… mais pas tant que ça',
  consigne:'Appuie sur « Hₐ » puis sur « Hᵦ » et compare les deux produits du bas.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur=null;
    const draw=()=>{fig.innerHTML=figHoppeTopic(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['a','On enlève Hₐ'],['b','On enlève Hᵦ']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=(cur===k?null:k);draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Le carbone porte deux hydrogènes énantiotopes : en remplacer l\'un ou l\'autre donne les deux énantiomères. Tout le problème est d\'en choisir un.',
  probleme:'<p>On change complètement de stratégie. Ici, pas d\'auxiliaire : le substrat reste <b>achiral</b> du début à la fin de l\'étape clé. C\'est le réactif qui apporte toute l\'information.</p><p>Et comme le substrat est achiral, ses deux hydrogènes en α de l\'oxygène sont… énantiotopes. Exactement le cas n° 2 de la section A.</p>',
  etapes:[
   {q:'Qui est le substrat ?',
    t:'Un <b>carbamate</b> tout simple : un alcool primaire (ici l\'éthanol) estérifié par un groupe carbamoyle cyclique. La molécule entière est achirale.'},
   {q:'Où sont les deux protons en question ?',
    t:'Sur le carbone porté par l\'oxygène du carbamate — le CH₂. Ils sont <b>énantiotopes</b> : en remplacer l\'un donne une molécule, en remplacer l\'autre donne son image miroir.'},
   {q:'Pourquoi ce carbone-là et pas un autre ?',
    t:'Deux raisons. D\'abord parce qu\'il est <b>acidifié</b> : l\'oxygène voisin stabilise la charge négative par effet inductif attracteur. Ensuite parce que le carbamate va pouvoir <b>chélater</b> le lithium formé — on y revient deux sections plus loin.'},
   {q:'Que faut-il pour les distinguer ?',
    t:'Un réactif <b>chiral et énantiopur</b>. Un sec-BuLi ordinaire arracherait l\'un ou l\'autre au hasard : 50/50. Il faut habiller le lithium d\'un ligand chiral.'},
   {q:'Quel groupe sera installé ?',
    t:'CO₂H, en piégeant le carbanion par du dioxyde de carbone. Le produit est un acide 2-(carbamoyloxy)propanoïque, obtenu à 75 % avec un e.e. supérieur à 95 %.'}
  ],
  retenir:[
   'Substrat achiral + protons énantiotopes = il FAUT un réactif chiral.',
   'Le carbamate joue deux rôles : il acidifie le proton et il chélatera le lithium.',
   'Les deux produits possibles sont énantiomères : ils ne seront pas séparables.',
   'C\'est la définition même de la stratégie « réactif chiral » du schéma de la diapo.'
  ],
  plus:{titre:'Vérification des descripteurs',
    body:'<p>Les deux structures du bas ont été construites à partir des coordonnées exactes de la figure, puis relues par RDKit. Résultat : en remplaçant Hₐ (trait gras, en bas à gauche) on obtient le (S) ; en remplaçant Hᵦ (trait pointillé, en bas à droite) on obtient le <b>(R)</b>.</p><p>Comme tes notes annotent le produit (R), c\'est bien Hᵦ que le complexe sec-BuLi·(−)-spartéine arrache. Le détail du calcul est dans <code>verification_stereo.md</code>.</p>'},
  quiz:{q:'Pourquoi ne peut-on pas utiliser un auxiliaire chiral ici, comme chez Evans&nbsp;?',
        a:'On pourrait, mais on perdrait tout l\'intérêt : il faudrait accrocher puis décrocher, soit deux étapes de plus. Or le carbamate est déjà nécessaire pour d\'autres raisons (acidification, chélation) et il est <b>achiral</b>. Le pari de Hoppe est justement d\'aller chercher l\'information chirale ailleurs — dans le réactif — pour rester en une seule étape.'}
});

S({
  grp:GE, title:'Le complexe sec-BuLi · (−)-spartéine',
  consigne:'Regarde d\'abord la spartéine seule, puis le complexe en dessous.',
  build(host){
    const f1=el('div','figbox'), f2=el('div','figbox');
    f1.innerHTML=figSparteine(); f2.innerHTML=figComplexe();
    host.appendChild(f1);
    host.appendChild(el('div','statusline','Les <b>deux azotes</b> sont les seuls atomes qui comptent pour la suite : ce sont eux qui vont attraper le lithium.'));
    host.appendChild(f2);
  },
  une:'La spartéine est une diamine naturelle rigide : ses deux azotes attrapent le lithium et l\'enferment dans une poche dissymétrique, qui n\'a plus qu\'un seul côté accessible.',
  probleme:'<p>Le sec-butyllithium tout seul est achiral. Comment le rendre chiral sans le modifier chimiquement&nbsp;?</p><p>Réponse : on ne touche pas au sec-BuLi. On lui ajoute un <b>ligand</b> chiral qui se coordonne au lithium. Le réactif devient chiral par association, pas par transformation.</p>',
  etapes:[
   {q:'Qu\'est-ce que la spartéine ?',
    t:'Un <b>alcaloïde</b> naturel, extrait du lupin et du genêt. C\'est une diamine tétracyclique : quatre cycles à six chaînons soudés entre eux, avec deux azotes. Elle est énantiopure telle que la nature la fabrique, et bon marché.'},
   {q:'Pourquoi une DIamine ?',
    t:'Parce qu\'il faut se fixer <b>solidement</b>. Un seul azote donnerait une liaison qui va et vient ; deux azotes forment un <b>chélate</b>, beaucoup plus stable. C\'est le même argument que pour le lithium d\'Evans ou le magnésium d\'Ellman.'},
   {q:'Pourquoi une molécule RIGIDE ?',
    t:'C\'est le point décisif. Quatre cycles soudés ne peuvent pas se déformer. Le lithium est donc tenu dans une poche de forme <b>fixe et dissymétrique</b> : un côté est bouché par le squelette, l\'autre est dégagé.'},
   {q:'Comment cela permet-il de choisir un proton ?',
    t:'Le complexe doit s\'approcher du carbamate pour arracher un proton. Deux approches sont possibles, une par Hₐ et une par Hᵦ. Comme le complexe est chiral, ces deux approches donnent des états de transition <b>diastéréoisomères</b> — d\'énergies différentes. L\'une l\'emporte.'},
   {q:'Pourquoi 1,4 et 1,5 équivalents ?',
    t:'Parce que la spartéine n\'est pas un catalyseur ici : elle reste accrochée au lithium pendant toute la réaction. Il en faut donc au moins un équivalent — c\'est la définition même de la stratégie « réactif chiral », et son principal inconvénient.'}
  ],
  retenir:[
   'On ne modifie pas le réactif : on lui ajoute un ligand chiral.',
   'Diamine = chélate solide ; tétracyclique = poche rigide ; naturelle = énantiopure et bon marché.',
   'Les deux états de transition de déprotonation deviennent diastéréoisomères : c\'est toujours la même règle d\'or.',
   'Stœchiométrique, donc pas catalytique — d\'où « greener than auxiliary, but not green ».'
  ],
  plus:{titre:'Deux remarques honnêtes',
    body:'<p><b>1. Le schéma du complexe est volontairement schématique.</b> Le squelette exact de la spartéine est dessiné juste au-dessus, tel qu\'il figure dans tes notes. Mais représenter à plat la position réelle du lithium entre les deux azotes demanderait une vue 3D : j\'ai préféré une « poche » symbolique plutôt qu\'un dessin faussement précis.</p><p><b>2. Il n\'existe pas de (+)-spartéine naturelle facilement disponible.</b> C\'est une limite réelle de la méthode : pour obtenir l\'autre énantiomère du produit, on utilise un <b>substitut de spartéine</b> synthétique (les « sparteine surrogates » développés par O\'Brien). C\'est exactement le même problème que « il faut avoir accès aux deux énantiomères de l\'auxiliaire » — le pool chiral ne fournit souvent qu\'un côté.</p>'},
  quiz:{q:'Pourquoi un ligand chiral mais FLEXIBLE marcherait-il moins bien&nbsp;?',
        a:'Parce qu\'un ligand flexible adopte plusieurs conformations. Chacune crée une poche de forme différente, donc une discrimination différente entre Hₐ et Hᵦ — certaines favorisant même le mauvais côté. Les contributions se moyennent et l\'e.e. s\'écroule. La <b>rigidité</b> est un critère aussi important que la chiralité : on la retrouve dans presque tous les bons ligands (BINAP, TADDOL, salen…).'}
});

S({
  grp:GE, title:'Le carbanion chélaté, et le piégeage par CO₂',
  consigne:'Appuie sur « étape suivante » et regarde ce que fait le lithium.',
  build(host){
    const fig=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const prev=el('button','btn'), next=el('button','btn');
    prev.textContent='‹ Étape'; next.textContent='Étape suivante ›';
    const draw=()=>{fig.innerHTML=figHoppeMech(k); prev.disabled=(k===0); next.disabled=(k===3);
      prev.style.opacity=k===0?.4:1; next.style.opacity=k===3?.4:1;};
    prev.onclick=()=>{if(k>0){k--;draw();}}; next.onclick=()=>{if(k<3){k++;draw();}};
    row.appendChild(prev); row.appendChild(next);
    host.appendChild(fig); host.appendChild(row); draw();
  },
  une:'Un carbanion s\'inverse normalement très vite. Celui-ci ne le fait pas, parce que le carbamate le tient par le lithium — c\'est ce qui permet au CO₂ d\'arriver du bon côté.',
  probleme:'<p>Il y a un problème caché. Arracher sélectivement un proton, très bien : on obtient un carbanion d\'une configuration donnée. Mais un carbanion est normalement <b>configurationnellement instable</b> : il s\'aplatit et s\'inverse en permanence, comme un parapluie qui se retourne. Au moment où le CO₂ arrive, la sélectivité gagnée serait déjà perdue.</p><p>Il faut donc empêcher cette inversion.</p>',
  etapes:[
   {q:'Étape 1 — la déprotonation sélective.',
    t:'Le complexe sec-BuLi·spartéine arrache un seul des deux protons énantiotopes. À −78 °C, dans Et₂O, pendant 5 h.'},
   {q:'Étape 2 — pourquoi le carbanion ne s\'épimérise pas.',
    t:'Le lithium formé n\'est pas libre : il est tenu <b>à la fois</b> par la spartéine et par l\'oxygène du carbonyle du carbamate. Ce deuxième point referme un petit cycle qui empêche le carbone de s\'aplatir. On dit que le carbanion est <b>configurationnellement stable</b>.'},
   {q:'Pourquoi −78 °C et 5 heures, alors ?',
    t:'La stabilité configurationnelle n\'est jamais absolue : c\'est une question de vitesse. À froid, l\'inversion est beaucoup plus lente que le piégeage. Si on réchauffait, le carbanion aurait le temps de s\'épimériser et l\'e.e. tomberait.'},
   {q:'Étape 3 — le piégeage par CO₂.',
    t:'Le CO₂ est un excellent électrophile pour un carbanion. Il vient se placer là où était le lithium, du même côté : la réaction se fait avec <b>rétention de configuration</b>. Puis HCl 2 N protone le carboxylate.'},
   {q:'Bilan.',
    t:'Une seule étape sur le carbone, 75 % de rendement, e.e. supérieur à 95 %. Aucun auxiliaire à accrocher ni à décrocher — mais 1,5 équivalent de spartéine consommé.'}
  ],
  retenir:[
   'Un carbanion α-alcoxy est configurationnellement stable s\'il est chélaté et s\'il fait froid.',
   'Le carbamate sert donc deux fois : acidification puis chélation.',
   'Le piégeage par CO₂ se fait avec rétention.',
   '« Rétention » veut dire « même côté », pas « même lettre » — c\'est l\'objet de la section suivante.'
  ],
  plus:{titre:'Pourquoi un carbamate, et pas un simple éther ou un ester ?',
    body:'<p>Un éther acidifierait bien le proton, mais son oxygène coordonne mal le lithium : le carbanion s\'épimériserait.</p><p>Un ester serait un bon chélatant, mais il serait <b>attaqué</b> par le sec-BuLi (addition sur le carbonyle) avant même la déprotonation.</p><p>Le carbamate est le compromis : son carbonyle est désactivé par l\'azote voisin (l\'azote donne son doublet dans le C=O), donc il résiste au sec-BuLi, tout en restant un assez bon donneur pour chélater le lithium. C\'est exactement le raisonnement qu\'on a fait pour le clivage d\'Evans, dans l\'autre sens.</p>'},
  quiz:{q:'Que se passerait-il si on remontait à 0 °C avant d\'ajouter le CO₂&nbsp;?',
        a:'L\'e.e. chuterait fortement. La stabilité configurationnelle du carbanion est <b>cinétique</b> : elle repose sur le fait que l\'inversion est plus lente que le piégeage. En réchauffant on accélère l\'inversion bien plus que le reste, le carbanion a le temps de s\'équilibrer, et on tend vers le racémique. Même logique que « on ne chauffe pas » pour les réactions énantiosélectives — mais pour une raison différente : ici c\'est la stabilité de l\'intermédiaire, pas la sélectivité de l\'état de transition.'}
});

S({
  grp:GE, title:'Rétention de configuration ≠ même descripteur',
  consigne:'Compare les deux colonnes : seul le rang de deux groupes a changé.',
  build(host){
    const fig=el('div','figbox'); fig.innerHTML=figCIPswap(); host.appendChild(fig);
    host.appendChild(el('div','statusline','Li a un numéro atomique de <b>3</b>, plus petit que celui du carbone (<b>6</b>). Il se classe donc <i>après</i> le méthyle. Une fois remplacé par CO₂H, il passe <i>devant</i>.'));
  },
  une:'Le descripteur CIP peut basculer alors que rien n\'a bougé dans l\'espace : R et S décrivent un classement, pas une géométrie.',
  probleme:'<p>C\'est un des pièges les plus classiques — et une excellente question d\'examen. On vient de dire que le piégeage par CO₂ se fait avec <b>rétention de configuration</b>. Pourtant, si on écrit les descripteurs de l\'intermédiaire et du produit, ils peuvent être différents. Est-ce une contradiction&nbsp;?</p><p>Non. Et comprendre pourquoi vaut mieux que retenir dix mécanismes.</p>',
  etapes:[
   {q:'Que veut dire « rétention » ?',
    t:'Que le groupe entrant occupe <b>la même position dans l\'espace</b> que le groupe partant. Les trois autres liaisons ne bougent pas. C\'est une affirmation géométrique.'},
   {q:'Que veut dire R ou S ?',
    t:'Que si l\'on classe les quatre substituants par priorité CIP et qu\'on regarde le plus petit de dos, les trois autres tournent dans un sens ou dans l\'autre. C\'est une affirmation sur un <b>classement</b>, pas sur la géométrie.'},
   {q:'Où est le piège ici ?',
    t:'Dans l\'intermédiaire lithié, le carbone porte : O, CH₃, <b>Li</b> et H. Or le lithium a Z = 3, plus petit que le carbone (Z = 6). Il se classe donc <b>troisième</b>, derrière le méthyle.'},
   {q:'Et dans le produit ?',
    t:'La même position est occupée par CO₂H, dont le premier atome est un carbone portant (O, O, O). Il passe donc <b>devant</b> le méthyle : il devient deuxième, et le méthyle recule en troisième.'},
   {q:'Conclusion.',
    t:'Les priorités 2 et 3 ont été <b>échangées</b> sans qu\'aucun atome n\'ait bougé. Échanger deux priorités inverse le sens de lecture, donc la lettre. Le descripteur change alors que la configuration est retenue.'},
   {q:'Quelle habitude en tirer ?',
    t:'Ne jamais raisonner sur les lettres. Raisonner sur les <b>positions</b>, puis attribuer la lettre à la toute fin, en refaisant le classement à chaque étape.'}
  ],
  retenir:[
   'Rétention / inversion = géométrie. R / S = classement CIP.',
   'Li (Z = 3) se classe derrière C (Z = 6) : c\'est contre-intuitif mais c\'est la règle.',
   'Échanger deux priorités inverse la lettre sans rien changer dans l\'espace.',
   'Réflexe : reclasser les quatre substituants à chaque étape, sans exception.'
  ],
  plus:{titre:'Deux autres cas où le même piège se produit',
    body:'<p><b>Les hydrures.</b> Dans un intermédiaire C–B ou C–Si, le bore (Z = 5) et le silicium (Z = 14) ne se classent pas au même endroit que le carbone qui les remplacera. Une protodéboronation « avec rétention » peut très bien changer la lettre.</p><p><b>Les oxydations.</b> Passer d\'un CH₂OH à un CHO puis à un CO₂H ne touche jamais au centre stéréogène voisin, mais peut modifier son rang relatif et donc son descripteur.</p><p>C\'est aussi pour cela que les publications écrivent souvent « (R) » <i>et</i> dessinent la molécule : la lettre seule ne suffit pas à communiquer sans ambiguïté.</p>'},
  quiz:{q:'Une réaction transforme R–Li en R–D (deutérium) avec rétention. Le descripteur change-t-il&nbsp;?',
        a:'Presque certainement, oui. Li (Z = 3) se classe devant H et D (Z = 1) mais derrière C ; le deutérium, lui, se classe en <b>dernier</b> (il est plus lourd que H, donc devant H, mais derrière tout le reste). Le groupe qui occupe cette position passe donc du rang 3 au rang 4 : tout le classement se décale. Là encore, rien n\'a bougé dans l\'espace.'}
});
