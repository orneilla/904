
/* ==========================================================================
   GROUPE H — Catalyseur chiral : époxydation de Sharpless
   ========================================================================== */
const GH='H — Catalyseur chiral : Sharpless';

S({
  grp:GH, title:'Le moyen mnémotechnique : dessine, puis regarde d\'où vient l\'oxygène',
  consigne:'Bascule entre L-(+)-DET et D-(−)-DET et regarde la flèche verte changer de côté.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='L';
    const draw=()=>{fig.innerHTML=figSharpMnemo(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['L','L-(+)-DET'],['D','D-(−)-DET']].forEach(([k,t])=>{
      const b=el('button','btn blue'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','note','<b>Comment s\'en servir.</b> Dessine toujours ton alcool allylique de la même façon : la double liaison en haut à gauche, le CH₂–OH en bas à droite, le tout à plat. Ensuite, la règle est mécanique : (+)-DET livre l\'oxygène par‑dessous, (−)-DET par‑dessus. Procter signale que plus de trois cents exemples y obéissent sans exception.'));
    draw();
  },
  une:'Un seul dessin, toujours le même, et une règle qui ne souffre pas d\'exception : c\'est le modèle prédictif le plus fiable de toute la synthèse asymétrique.',
  probleme:'<p>Avec un auxiliaire, on peut retrouver la face bloquée en regardant la molécule. Avec un catalyseur, le complexe est un <b>dimère de titane</b> avec deux tartrates et une dizaine de ligands : impossible de raisonner à vue d\'œil.</p><p>Sharpless a donc proposé autre chose : pas un modèle mécanistique, mais un <b>moyen mnémotechnique</b> qui marche à tous les coups.</p>',
  etapes:[
   {q:'Quelle est la condition sur le substrat ?',
    t:'Il faut un <b>alcool allylique</b> : un OH sur le carbone voisin de la double liaison. Ce n\'est pas un détail — c\'est par cet OH que le substrat se fixe sur le titane. Sans lui, la réaction n\'a pas lieu du tout.'},
   {q:'Comment dessiner ?',
    t:'Toujours de la même façon : la molécule à plat, la double liaison en haut à gauche, le <b>CH₂–OH en bas à droite</b>. Si tu dessines autrement, la règle te donnera l\'inverse.'},
   {q:'Quelle est la règle ?',
    t:'L-(+)-DET → l\'oxygène est livré par la face du <b>dessous</b>. D-(−)-DET → par la face du <b>dessus</b>. C\'est tout.'},
   {q:'Vérifions sur ton exemple.',
    t:'Le (E)-déc-2-én-1-ol avec le L-(+)-DET : oxygène par‑dessous → époxyde <b>(2S,3S)</b>, 99 % de rendement et 96 % d\'e.e. C\'est exactement ce qu\'indiquent tes notes.'},
   {q:'Et le tartrate lui-même ?',
    t:'Le L-(+)-DET est le tartrate de diéthyle de configuration <b>(R,R)</b> — tes notes l\'annotent correctement. Il vient de l\'acide tartrique naturel, sous-produit de la vinification : énantiopur et très bon marché.'}
  ],
  retenir:[
   'Substrat obligatoire : alcool allylique (le OH sert d\'ancrage sur le titane).',
   'Dessin imposé : C=C en haut à gauche, CH₂OH en bas à droite.',
   '(+)-DET = oxygène par-dessous ; (−)-DET = oxygène par-dessus.',
   'L-(+)-DET = (R,R)-tartrate de diéthyle.'
  ],
  plus:{titre:'Pourquoi le moyen mnémotechnique compte autant',
    body:'<p>Procter écrit : « <i>Ce modèle prédictif extrêmement fiable est l\'une des grandes forces de l\'époxydation asymétrique de Sharpless, avec plus de trois cents exemples qui s\'y conforment tous.</i> »</p><p>Il faut mesurer ce que cela veut dire. En synthèse totale, on planifie une séquence de vingt étapes sur le papier avant de toucher un flacon. Une réaction dont on ne peut pas prédire l\'issue est inutilisable dans ce contexte, même si elle donne 99 % d\'e.e. sur un substrat modèle.</p><p>La <b>prévisibilité</b> est donc un critère à part entière — tu le retrouveras dans le cahier des charges des auxiliaires (section B). C\'est aussi pour cela que Sharpless a reçu le prix Nobel en 2001.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §7, fig. 7.54 et tableau 7.8, p. 176–177.'},
  quiz:{q:'On veut l\'époxyde (2R,3R) à partir du même (E)-déc-2-én-1-ol. Que faut-il changer&nbsp;?',
        a:'Rien, sauf le tartrate : on prend le <b>D-(−)-DET</b>, c\'est-à-dire le (S,S)-tartrate de diéthyle. L\'oxygène est alors livré par la face du dessus et on obtient l\'énantiomère. C\'est le grand avantage de la voie catalytique ici : les deux énantiomères de l\'acide tartrique sont disponibles et bon marché — contrairement à la spartéine, où un seul énantiomère existe naturellement.'}
});

S({
  grp:GH, title:'Le cycle catalytique, tour par tour',
  consigne:'Appuie sur « étape suivante » et lis ce qui change à chaque tour.',
  build(host){
    const fig=el('div','figbox'), row=el('div','btnrow'), st=el('div','statusline'); let k=0;
    const prev=el('button','btn'), next=el('button','btn');
    prev.textContent='‹ Étape'; next.textContent='Étape suivante ›';
    const draw=()=>{fig.innerHTML=figCycle(k); st.innerHTML=CYCLE[k].d;
      prev.disabled=(k===0); next.disabled=(k===4);
      prev.style.opacity=k===0?.4:1; next.style.opacity=k===4?.4:1;};
    prev.onclick=()=>{if(k>0){k--;draw();}}; next.onclick=()=>{if(k<4){k++;draw();}};
    row.appendChild(prev); row.appendChild(next);
    host.appendChild(fig); host.appendChild(row); host.appendChild(st); draw();
  },
  une:'Le titane est une pince à quatre doigts : il tient le tartrate chiral, l\'oxydant et le substrat en même temps — et c\'est pour cela qu\'il peut imposer une face.',
  probleme:'<p>Avec un auxiliaire ou un réactif, on voit tout de suite où est la chiralité. Ici, le tartrate n\'est même pas en contact avec la double liaison. Comment peut‑il décider de quelle face l\'oxygène arrive&nbsp;?</p><p>La réponse tient en un mot : <b>proximité imposée</b>. Le métal réunit les partenaires à distance fixe.</p>',
  etapes:[
   {q:'Étape 1 — le titane change de ligands.',
    t:'Ti(OiPr)₄ échange très rapidement ses alcoolates avec n\'importe quel alcool. Avec le tartrate — un <b>diol</b>, donc un ligand bidenté — l\'équilibre est nettement déplacé vers le chélate, plus stable. Il se forme Ti(tartrate)₂(OR)₂.'},
   {q:'Étapes 2 et 3 — on charge le complexe.',
    t:'Deux nouveaux échanges : le tert-butylhydroperoxyde d\'abord, l\'alcool allylique ensuite. Chacun remplace un alcoolate restant. Le complexe n\'est actif que lorsqu\'il porte <b>les deux</b>.'},
   {q:'Étape 4 — le transfert d\'oxygène.',
    t:'C\'est l\'étape clé. Le substrat et l\'oxydant sont sur le <b>même</b> titane, à distance fixe, dans une orientation imposée par le tartrate. L\'oxygène passe de l\'hydroperoxyde à la double liaison : une seule face est géométriquement atteignable.'},
   {q:'Étape 5 — la libération.',
    t:'L\'époxy-alcool et le tert-butanolate quittent le titane, remplacés par de nouvelles molécules. Le complexe est revenu à son état initial : il peut recommencer. C\'est ce retour à l\'état de départ qui définit un catalyseur.'},
   {q:'Pourquoi le OH du substrat est-il indispensable ?',
    t:'Parce que c\'est sa seule façon de monter sur le titane. Procter est catégorique : « <i>le substrat doit posséder un groupe capable de se coordonner au catalyseur, presque toujours un hydroxyle ; sans un tel groupe, l\'époxydation asymétrique n\'a pas lieu.</i> » Un alcène isolé ne réagit pas.'}
  ],
  retenir:[
   'Le titane réunit tartrate + oxydant + substrat sur un même centre.',
   'Le tartrate ne touche jamais la double liaison : il agit en imposant la géométrie.',
   'L\'alcool allylique n\'est pas un caprice : c\'est l\'ancrage.',
   'Retour à l\'état initial = catalyse ; 7,3 mol % suffisent.'
  ],
  plus:{titre:'À quoi ressemble vraiment le catalyseur',
    body:'<p>Le complexe actif — celui que Procter appelle « <i>fully loaded</i> » — est un <b>dimère</b> : deux atomes de titane pontés, deux tartrates, plus l\'hydroperoxyde et le substrat. Cette structure est cohérente avec les études cinétiques et spectroscopiques.</p><p>Points importants pour ton cours :</p><ul class="keys"><li>Le complexe est <b>neutre</b> dans son ensemble.</li><li>Le titane est au degré d\'oxydation <b>+IV</b>, comme dans Ti(OiPr)₄ de départ. Il ne change jamais : ce n\'est pas une catalyse rédox au sens d\'un couple Ti(II)/Ti(IV).</li><li>Le tartrate est un ligand <b>dianionique</b> : ses deux OH <i>alcooliques</i> sont déprotonés et liés au titane. Les deux esters éthyliques, eux, restent intacts et ne se coordonnent pas.</li></ul><p>C\'est le point à vérifier sur tes notes : si une charge positive est écrite sur le tartrate ou une charge négative sur le titane, c\'est inversé.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §7, fig. 7.67–7.69, p. 182–183.'},
  quiz:{q:'Pourquoi le même titane ne fonctionne-t-il pas sur un alcène isolé, même en présence de tartrate&nbsp;?',
        a:'Parce qu\'un alcène isolé n\'a aucun moyen de se fixer sur le titane. Il resterait en solution, loin du complexe, et rencontrerait l\'hydroperoxyde au hasard — sans aucune sélectivité, et très lentement puisque t-BuOOH seul est un oxydant médiocre. Toute la stratégie repose sur la <b>coordination préalable</b> du substrat : c\'est le principe même de ce qu\'on appelle une réaction « dirigée par un groupe ».'}
});

S({
  grp:GH, title:'Le tamis 4 Å : sans lui, plus de catalyse',
  consigne:'Bascule entre « sans tamis » et « avec tamis 4 Å ».',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur=false;
    const draw=()=>{fig.innerHTML=figSieves(cur);[...row.children].forEach(b=>b.classList.toggle('on',(b.dataset.k==='1')===cur));};
    [['0','Sans tamis'],['1','Avec tamis 4 Å']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=(k==='1');draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Le titane(IV) est détruit par l\'eau. Sans tamis moléculaire, le catalyseur meurt en cours de route et il faut en mettre un équivalent entier.',
  probleme:'<p>Dans tes notes, le tamis 4 Å apparaît discrètement sous la flèche, comme un détail de protocole. C\'est en réalité <b>la</b> condition qui a transformé la réaction de Sharpless en vraie méthode catalytique — et ça mérite une section.</p>',
  etapes:[
   {q:'Qu\'est-ce qu\'un tamis moléculaire 4 Å ?',
    t:'Une zéolithe : un solide poreux dont les cavités font environ 4 ångströms. Les petites molécules — l\'eau au premier chef — y entrent et y restent piégées ; les molécules organiques, trop grosses, n\'y entrent pas.'},
   {q:'Pourquoi l\'eau est-elle un problème ?',
    t:'Le titane(IV) est un acide de Lewis très oxophile. L\'eau hydrolyse ses liaisons Ti–O : le complexe se transforme en <b>oxydes et hydroxydes de titane</b>, insolubles et totalement inactifs. Le catalyseur ne revient jamais dans le cycle.'},
   {q:'Quelle est la conséquence pratique ?',
    t:'Sans tamis, il faut mettre un <b>équivalent</b> de Ti(OiPr)₄ et de tartrate, parce que chaque molécule de catalyseur ne fait qu\'un tour ou deux avant de mourir. La réaction marche, mais ce n\'est plus de la catalyse.'},
   {q:'Avec le tamis ?',
    t:'L\'eau est retirée du jeu en permanence. Le complexe survit, tourne des dizaines de fois, et <b>7,3 mol %</b> suffisent à transformer tout le substrat. C\'est la version « catalytique » que tes notes décrivent.'},
   {q:'Où l\'eau arrive-t-elle, d\'ailleurs ?',
    t:'Un peu par le solvant, un peu par la verrerie, mais surtout avec le t-BuOOH commercial, souvent vendu en solution aqueuse ou humide. C\'est pour cela que le protocole insiste aussi sur du t-BuOOH anhydre.'}
  ],
  retenir:[
   'Tamis 4 Å = capteur d\'eau, exactement comme MgSO₄ chez Ellman.',
   'Ti(IV) + H₂O → oxydes insolubles inactifs : mort du catalyseur.',
   'Sans tamis : 1 équivalent. Avec tamis : quelques mol %.',
   'Un « détail de protocole » peut faire toute la différence entre stœchiométrique et catalytique.'
  ],
  quiz:{q:'On retrouve un desséchant chez Ellman (MgSO₄) et chez Sharpless (tamis 4 Å). Le rôle est-il le même&nbsp;?',
        a:'Le <b>moyen</b> est le même — retirer l\'eau — mais pas le <b>but</b>. Chez Ellman, l\'eau est un <i>produit</i> de la réaction : on la retire pour déplacer un équilibre (Le Chatelier). Chez Sharpless, l\'eau est une <i>impureté</i> qui détruit le catalyseur : on la retire pour le protéger. Savoir distinguer « déplacer un équilibre » de « protéger un réactif » est un bon réflexe de lecture de protocole.'}
});

S({
  grp:GH, title:'Pourquoi un léger excès de tartrate',
  consigne:'Bascule entre les deux rapports et regarde la largeur des deux barres.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='tart';
    const draw=()=>{fig.innerHTML=figRatio(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['tart','Tartrate en excès'],['ti','Titane en excès']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Du titane sans tartrate est un catalyseur parfaitement actif — mais achiral. Il fabrique du racémique en parallèle et fait chuter l\'e.e.',
  probleme:'<p>Tes notes donnent 5 mol % de DET pour 7,3 mol % de Ti(OiPr)₄. Cela ressemble à un chiffre arbitraire. Mais Procter précise que les conditions catalytiques utilisent un rapport tartrate : titane de <b>1,1 à 1,2 pour 1</b> — donc un léger excès de <i>tartrate</i>. Il y a une raison.</p>',
  etapes:[
   {q:'Que fait le titane libre ?',
    t:'Il catalyse l\'époxydation, exactement comme le complexe chiral : c\'est le même acide de Lewis, le même transfert d\'oxygène. Simplement, il n\'a aucune information chirale à transmettre.'},
   {q:'Quel est le résultat ?',
    t:'Une <b>voie parallèle racémique</b>. Chaque molécule de substrat qui passe par le titane nu donne 50 : 50. Ces produits viennent diluer l\'excès obtenu par la voie chirale.'},
   {q:'Pourquoi c\'est grave ?',
    t:'Parce que le titane nu est souvent <b>plus rapide</b> : il est moins encombré, donc plus accessible. Même une petite proportion de titane libre peut consommer une fraction importante du substrat.'},
   {q:'La solution ?',
    t:'S\'assurer qu\'il ne reste <b>aucun</b> titane sans tartrate, en mettant le tartrate en léger excès. C\'est exactement ce que font les 1,1 à 1,2 équivalents par titane.'},
   {q:'Pourquoi pas un gros excès, alors ?',
    t:'Parce que le tartrate en excès finit par ralentir la réaction : il occupe des sites de coordination dont le substrat et l\'oxydant ont besoin. On cherche le minimum qui garantisse qu\'il ne reste pas de titane nu.'}
  ],
  retenir:[
   'Titane libre = catalyseur actif mais achiral = voie racémique parallèle.',
   'Voie racémique souvent plus rapide, parce que moins encombrée.',
   'D\'où le léger excès de tartrate : 1,1 à 1,2 pour 1 titane.',
   'Règle générale en catalyse asymétrique : tout métal non ligandé est un ennemi.'
  ],
  plus:{titre:'Le même piège, ailleurs',
    body:'<p>Ce raisonnement se généralise à presque toute la catalyse asymétrique. Chaque fois qu\'un métal peut exister sous forme libre à côté de sa forme ligandée, il faut se demander si la forme libre catalyse la même réaction.</p><ul class="keys"><li>Hydrogénation au rhodium : Rh sans phosphine chirale hydrogène quand même — en racémique.</li><li>Organocatalyse : une amine achirale résiduelle catalyse l\'énamine sans sélectivité.</li><li>Sharpless : ici même.</li></ul><p>C\'est pour cela qu\'un protocole de catalyse asymétrique précise toujours le <b>rapport ligand/métal</b>, et qu\'il est presque toujours supérieur à 1. Ce n\'est jamais un chiffre décoratif.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §7, fig. 7.51, p. 175 (« <i>tartrate:Ti(OiPr)₄ ratio 1.1:1 to 1.2:1</i> »).'},
  quiz:{q:'Un e.e. qui plafonne à 70 % au lieu des 96 % attendus, avec une réaction très rapide. Quelle hypothèse testes-tu en premier&nbsp;?',
        a:'Une <b>voie racémique parallèle</b> par du métal non ligandé. La combinaison « plus rapide que prévu » + « e.e. plafonné » en est la signature : une partie du substrat emprunte un chemin sans sélectivité. Premier test : augmenter le rapport ligand/métal. Si l\'e.e. remonte et que la réaction ralentit, le diagnostic est confirmé.'},
  flag:'⚠️ <b>À vérifier sur ton support de cours.</b> Tes notes donnent L-(+)-DET <b>5 mol %</b> et Ti(OiPr)₄ <b>7,3 mol %</b>, soit un rapport tartrate : Ti de 0,68 — donc un excès de <i>titane</i>, l\'inverse de ce que prescrit Procter (1,1 à 1,2 de tartrate pour 1 titane). Ou bien les deux chiffres ont été intervertis en recopiant, ou bien ils viennent d\'un protocole particulier. Le raisonnement de cette section, lui, ne dépend pas des chiffres : du titane non ligandé fabrique du racémique.'
});
