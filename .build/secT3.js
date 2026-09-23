
/* ==========================================================================
   GROUPE 3 — Exercice 3 : diastéréosélective ou énantiosélective ?
   ========================================================================== */
const T3='Exercice 3 — la sélectivité';

S({
  grp:T3, title:'Trois questions, dans cet ordre',
  consigne:'Pose-toi ces trois questions sur chaque réaction, dans l\'ordre. Tu ne te tromperas plus.',
  build(host){ const f=el('div','figbox'); f.innerHTML=figArbreSel(); host.appendChild(f); },
  une:'La différence entre diastéréosélectif et énantiosélectif tient à une seule chose : <b>qui apporte l\'information chirale</b> — le substrat, ou le réactif.',
  probleme:'<p>Les deux mots se ressemblent, et on les confond d\'autant plus facilement que les deux réactions se ressemblent souvent sur le papier (même substrat, même type de produit).</p><p>Mais la différence est profonde : dans un cas la nature « donne » la sélectivité gratuitement, dans l\'autre il faut la payer avec un réactif chiral coûteux.</p>',
  etapes:[
   {q:'Question 0 — y a-t-il seulement quelque chose à sélectionner ?',
    t:'Si la réaction ne crée <b>aucun</b> nouvel élément stéréogène, la question ne se pose pas : la réaction n\'est ni l\'une ni l\'autre. C\'est le piège classique des sujets, et il est présent dans ce TD.'},
   {q:'Question 1 — le substrat est-il déjà chiral ?',
    t:'S\'il l\'est, les deux chemins d\'approche sont <b>diastéréoisomères</b>. Ils ont donc des énergies différentes sans qu\'on ait rien à faire : la réaction est <b>diastéréosélective</b>. Le réactif peut être totalement achiral.'},
   {q:'Question 2 — si le substrat est achiral ?',
    t:'Alors les deux faces sont <b>énantiotopes</b> : les deux états de transition sont énantiomères, donc de même énergie. Sans intervention, on obtient un racémique exact. Il faut un <b>réactif, ligand ou catalyseur chiral</b> pour les départager : la réaction est alors <b>énantiosélective</b>.'},
   {q:'Le vocabulaire qui va avec.',
    t:'On parle de <b>contrôle par le substrat</b> dans le premier cas, de <b>contrôle par le réactif</b> dans le second. Les auxiliaires chiraux (Evans, Ellman) sont une astuce : on rend le substrat temporairement chiral pour bénéficier du contrôle par le substrat, puis on retire l\'auxiliaire.'},
   {q:'Un test rapide pour vérifier.',
    t:'Demande-toi : « si je remplace le réactif chiral par son énantiomère, le produit change-t-il ? » Si oui → énantiosélective. Si non (parce que c\'est le substrat qui décide) → diastéréosélective.'}
  ],
  retenir:[
   'Aucun élément stéréogène créé → ni l\'une ni l\'autre.',
   'Substrat chiral → <b>diastéréo</b>sélective (contrôle par le substrat).',
   'Substrat achiral + réactif chiral → <b>énantio</b>sélective.',
   'Substrat achiral + réactif achiral → racémique, pas de sélectivité.'
  ],
  quiz:{q:'Une réaction diastéréosélective peut-elle donner un produit optiquement <b>inactif</b>&nbsp;?',
    a:'<b>Oui, parfaitement.</b> C\'est le cas de la réaction e) de cet exercice : la 4-<i>tert</i>-butylcyclohexanone est achirale, ses deux faces sont diastéréotopes (à cause du <i>tert</i>-butyle qui sert de repère), et les deux produits possibles — les alcools <i>cis</i> et <i>trans</i> — sont tous deux <b>achiraux</b>.<br><br>La réaction est donc diastéréosélective (elle privilégie nettement l\'un des deux) tout en donnant un produit sans pouvoir rotatoire. Diastéréosélectif ne veut pas dire « qui donne un produit chiral ».'}
});

[0,1,2,3,4].forEach(k=>{
  const t=[
   {une:'Époxydation de Sharpless : substrat achiral, catalyseur chiral. C\'est la définition même d\'une réaction <b>énantiosélective</b>.',
    et:[{q:'Le substrat est-il chiral ?',t:'Non. Le (E)-but-2-én-1-ol (alcool crotylique) n\'a aucun centre stéréogène : c\'est une molécule plane et achirale. Ses deux faces sont donc <b>énantiotopes</b>.'},
        {q:'Que donnerait un réactif achiral ?',t:'Un peracide ordinaire donnerait exactement <b>50:50</b> des deux époxydes énantiomères. Aucune sélectivité possible.'},
        {q:'Qu\'apporte le tartrate ?',t:'Le titane s\'entoure de deux tartrates chiraux et de l\'hydroperoxyde. Le complexe qui en résulte est chiral : il présente <b>deux faces différentes</b> à l\'alcène, et les deux états de transition deviennent diastéréoisomères. C\'est le tartrate, pas le substrat, qui fait le tri.'},
        {q:'Le sens du résultat.',t:'L\'énoncé utilise le tartrate de diéthyle <b>(R,R)</b>, c\'est-à-dire le tartrate naturel, le (+)-DET. Sur un alcool allylique (E), il donne l\'époxyde <b>(2S,3S)</b> — exactement ce que dessine l\'énoncé. C\'est cohérent avec l\'exemple de référence, le géraniol.'},
        {q:'Vérification.',t:'J\'ai reconstruit le produit dessiné (époxyde avec l\'oxygène en pointillé des deux côtés) à partir de ses coordonnées et fait attribuer les descripteurs par RDKit : <b>2S, 3S</b>. L\'énoncé est exact.'}],
    ret:['Substrat achiral → faces énantiotopes.','Le catalyseur chiral fait le tri → <b>énantiosélective</b>.','(R,R)-DET sur un alcool allylique (E) → époxyde (2S,3S).','Contrôle par le réactif.'],
    quiz:{q:'Si on remplaçait le (R,R)-DET par le (S,S)-DET, qu\'obtiendrait-on&nbsp;?',
      a:'L\'<b>époxyde (2R,3R)</b>, c\'est-à-dire l\'énantiomère exact du produit dessiné.<br><br>C\'est la grande force de la méthode de Sharpless : les deux tartrates sont bon marché et tous deux disponibles, donc on choisit l\'énantiomère du produit en choisissant le tartrate. C\'est aussi le <b>test</b> qui prouve qu\'on a affaire à une réaction énantiosélective : changer l\'énantiomère du réactif change l\'énantiomère du produit.'}},
   {une:'Ici le catalyseur au vanadium est totalement <b>achiral</b> : c\'est le substrat, déjà chiral, qui impose la face. Réaction <b>diastéréosélective</b>.',
    et:[{q:'Le substrat est-il chiral ?',t:'Oui : l\'énoncé le précise, le carbone qui porte le méthyle est <b>(S)</b>. J\'ai reconstruit le dessin et RDKit confirme : (2S), double liaison (Z).'},
        {q:'Le catalyseur apporte-t-il de la chiralité ?',t:'Non. VO(acac)₂ est un complexe achiral, et le t-BuOOH aussi. Toute l\'information chirale vient donc du substrat.'},
        {q:'Comment le substrat impose-t-il la face ?',t:'L\'hydroxyle se lie au vanadium : l\'oxygène est alors livré <b>par l\'intérieur</b>, du côté où l\'alcool peut atteindre la double liaison. Le méthyle du centre (S) gêne une des deux conformations, ce qui déséquilibre les deux états de transition — qui sont <b>diastéréoisomères</b>, donc d\'énergies différentes par nature.'},
        {q:'La chose la plus intéressante du dessin.',t:'Regarde bien : le centre de départ est marqué <b>(S)</b>, et dans le produit ce même carbone est marqué <b>(R)</b>. <b>Aucune liaison de ce carbone n\'a été touchée.</b> Ce qui a changé, c\'est le <b>classement CIP</b> : dans le substrat, CH₂OH (O,H,H) battait le carbone voisin ; dans le produit, ce voisin est devenu un carbone d\'époxyde (O,C,H) et il passe devant.'},
        {q:'Vérification.',t:'J\'ai construit les deux dessins de l\'énoncé et laissé RDKit trancher : substrat <b>(2S, 3Z)</b>, produit <b>(2R, 3R, 4S)</b>, avec un époxyde <i>cis</i> — cohérent avec une addition syn sur un alcène (Z). Les descripteurs de l\'énoncé sont tous exacts.'}],
    ret:['Substrat chiral + catalyseur achiral → <b>diastéréosélective</b>.','Contrôle par le substrat (et ici, par l\'hydroxyle qui coordonne le métal).','Le descripteur (S) devient (R) sans qu\'aucune liaison ne bouge.','Un descripteur décrit un <b>classement</b>, pas une position.'],
    quiz:{q:'Comment savoir, sans calculer, que cette réaction ne peut pas être énantiosélective&nbsp;?',
      a:'Parce qu\'il n\'y a <b>rien de chiral</b> en dehors du substrat. Une réaction énantiosélective demande une source de chiralité <i>extérieure</i> au substrat : un ligand, un catalyseur, un réactif, un solvant chiral.<br><br>Ici : VO(acac)₂ achiral, t-BuOOH achiral. Quoi qu\'il arrive, le produit sera énantiopur si le substrat l\'était — mais ce n\'est pas la <i>réaction</i> qui aura créé cette pureté, elle était déjà là. Le seul choix que fait la réaction, c\'est <b>quelle face de l\'alcène</b> : c\'est un choix entre diastéréoisomères.'}},
   {une:'Cette réaction ne crée <b>aucun</b> élément stéréogène : elle n\'est ni diastéréosélective ni énantiosélective. C\'est le piège de l\'exercice.',
    et:[{q:'Que se passe-t-il exactement ?',t:'On acyle l\'azote de l\'oxazolidinone avec le chlorure de propanoyle. On forme une liaison N–C(=O) : c\'est une simple substitution nucléophile d\'acyle, avec 100 % de rendement.'},
        {q:'Un centre est-il créé ?',t:'Non. Le seul carbone stéréogène de la molécule, le C4 du cycle (marqué (S)), <b>existait déjà</b> et n\'est pas touché. Le carbone du nouveau carbonyle est sp², donc pas stéréogène. Le carbone α du propanoyle porte deux hydrogènes : pas stéréogène non plus.'},
        {q:'Donc la réponse.',t:'« <b>Ni l\'une ni l\'autre.</b> Aucun nouvel élément stéréogène n\'est formé ; il n\'y a donc rien à sélectionner. » Le 100 % de rendement est d\'ailleurs un indice : une réaction stéréosélective donne rarement un rendement parfait en un seul stéréoisomère.'},
        {q:'À quoi sert cette étape, alors ?',t:'C\'est l\'étape de <b>fixation de l\'auxiliaire chiral</b>. On vient de rendre chiral un substrat (l\'acide propanoïque) qui ne l\'était pas. C\'est ce qui permettra, à l\'étape suivante, de bénéficier du contrôle par le substrat.'},
        {q:'La leçon de fond.',t:'Une synthèse asymétrique par auxiliaire compte trois étapes : <b>fixer</b> (non sélective), <b>réagir</b> (diastéréosélective), <b>couper</b> (non sélective). Seule celle du milieu est stéréosélective, et c\'est la seule où l\'on mesure un excès.'}],
    ret:['Aucun élément stéréogène créé → aucune sélectivité.','Le centre (S) existait avant et ne bouge pas.','100 % de rendement : indice que rien n\'est sélectionné.','C\'est l\'étape « fixer » du cycle auxiliaire.'],
    quiz:{q:'L\'étape de <b>coupure</b> de l\'auxiliaire (LiOH / H₂O₂ par exemple) est-elle stéréosélective&nbsp;?',
      a:'<b>Non plus</b>, et pour la même raison : elle ne crée aucun élément stéréogène, elle en <b>libère</b> un qui était déjà fixé.<br><br>Ce qui est important en revanche, c\'est qu\'elle soit <b>stéréospécifique au sens de « sans épimérisation »</b> : il ne faut surtout pas que les conditions basiques arrachent le proton α et détruisent le centre qu\'on vient de créer. C\'est pour cela qu\'on utilise des conditions douces et un nucléophile qui attaque bien le bon carbonyle (le peroxyde, petit et très nucléophile, va sur le carbonyle exocyclique).'}},
   {une:'C\'est l\'alkylation d\'Evans — le cas d\'école de la diastéréosélectivité. <b>Mais le produit dessiné pose un problème</b> : lis la réserve.',
    et:[{q:'Le principe, d\'abord.',t:'LDA arrache le proton α et forme un énolate de géométrie <b>Z(O)</b> (contrainte par la tension A(1,3)). Le lithium chélate les deux oxygènes : le cycle oxazolidinone et l\'énolate sont alors <b>bloqués</b> dans le même plan.'},
        {q:'Comment la face est choisie.',t:'L\'isopropyle du C4, qui pointe d\'un côté du plan, bloque une face. L\'électrophile arrive donc par l\'<b>autre</b> face. Comme le substrat est déjà chiral (grâce à l\'auxiliaire), les deux états de transition sont diastéréoisomères : la réaction est <b>diastéréosélective</b>.'},
        {q:'La réponse attendue.',t:'« <b>Diastéréosélective</b> : contrôle par le substrat, via l\'auxiliaire chiral d\'Evans. »'},
        {q:'Et maintenant, le problème du dessin.',t:'Le substrat est un <b>propanoyle</b> : N–CO–CH₂–CH₃. Si on le méthyle, le carbone α porte alors <b>deux méthyles</b> — le produit est un <b>isobutyryle</b>, N–CO–CH(CH₃)₂. Ce carbone n\'est plus stéréogène du tout, et le trait gras dessiné sur l\'un des deux méthyles ne signifie rien.'},
        {q:'Ce qu\'il faut en penser.',t:'Deux lectures possibles : soit c\'est un <b>second piège</b>, juste après celui de la réaction c) ; soit c\'est une <b>coquille</b> (avec Br–CH₂Ph comme électrophile, ou un butanoyle au départ, la réaction serait le cas d\'école). Je ne tranche pas — pose la question en TD, c\'est exactement le genre de détail qui vaut des points.'}],
    ret:['Énolate Z(O) + chélate au lithium + iPr qui bloque une face.','Le principe : <b>diastéréosélective</b>, contrôle par le substrat.','<b>Mais</b> propanoyle + CH₃I donne un isobutyryle : carbone α non stéréogène.','À signaler dans la copie plutôt qu\'à ignorer.'],
    quiz:{q:'Avec quel électrophile cette réaction redeviendrait-elle le cas d\'école&nbsp;?',
      a:'Avec n\'importe quel électrophile <b>différent du méthyle</b> : Br–CH₂Ph (bromure de benzyle), I–CH₂CH₃, Br–CH₂–CH=CH₂…<br><br>Le carbone α porterait alors quatre groupes différents — le carbonyle, le méthyle d\'origine, le nouveau groupe et H — et deviendrait un vrai centre stéréogène. C\'est d\'ailleurs l\'exemple historique d\'Evans : N-propanoyloxazolidinone + bromure de benzyle, avec des rapports diastéréoisomères qui dépassent 99:1.<br><br>L\'autre correction possible : garder CH₃I mais partir d\'un <b>butanoyle</b> (N–CO–CH₂–CH₂–CH₃). Le carbone α porterait alors un méthyle et un éthyle : stéréogène aussi.'}},
   {une:'NaBH₄ est achiral, et pourtant la réaction est <b>diastéréosélective</b> : le <i>tert</i>-butyle sert de repère et rend les deux faces du carbonyle diastéréotopes.',
    et:[{q:'Le substrat est-il chiral ?',t:'<b>Non</b> — et c\'est ce qui rend ce cas intéressant. La 4-<i>tert</i>-butylcyclohexanone possède un plan de symétrie qui passe par C1 et C4 : elle est achirale.'},
        {q:'Alors pourquoi les faces sont-elles différentes ?',t:'Parce que ce plan de symétrie <b>ne contient pas</b> les deux faces du carbonyle : il les laisse chacune à sa place. Le <i>tert</i>-butyle, en bas, définit un « dessus » et un « dessous ». Attaquer par le dessus ou par le dessous donne les alcools <b>cis</b> et <b>trans</b> : des <b>diastéréoisomères</b>.'},
        {q:'Donc la réponse.',t:'« <b>Diastéréosélective.</b> Les deux faces du carbonyle sont diastéréotopes ; les deux états de transition ont des énergies différentes, même avec un réducteur achiral. »'},
        {q:'Quel produit est majoritaire ?',t:'NaBH₄ est un hydrure <b>petit</b> : il attaque préférentiellement en <b>axial</b>, ce qui place l\'OH en position <b>équatoriale</b>. On obtient donc majoritairement l\'alcool <b>trans</b> — c\'est bien celui qui est dessiné (OH en pointillé, tBu en gras : les deux groupes sont de part et d\'autre).'},
        {q:'Les descripteurs (r) et (r) — et la mention (±).',t:'Le produit porte deux descripteurs en <b>minuscules</b>, et c\'est correct : une minuscule signale un centre <b>stéréogène mais non chiral</b>. Vérifié par RDKit sur le dessin : <b>(1r,4r)</b>, et la molécule est <b>achirale</b>. En revanche la mention « (±) » n\'a pas de sens ici : un composé achiral n\'a pas d\'énantiomère, il n\'y a donc pas de racémique.'}],
    ret:['Substrat achiral, mais faces <b>diastéréotopes</b> : le tBu sert de repère.','Réaction <b>diastéréosélective</b> avec un réducteur achiral.','NaBH₄ (petit) attaque en axial → OH équatorial → alcool <i>trans</i>.','Descripteurs (1r,4r), produit achiral : la mention (±) est de trop.'],
    quiz:{q:'Et avec un hydrure très encombré, comme le L-Selectride&nbsp;?',
      a:'On obtient l\'alcool <b>cis</b>, c\'est-à-dire le contraire.<br><br>Un hydrure encombré ne peut plus passer en axial : les deux hydrogènes axiaux en position 3 et 5 lui barrent la route. Il attaque donc en <b>équatorial</b>, ce qui place l\'OH en <b>axial</b> → alcool cis, avec des sélectivités qui dépassent souvent 95:5.<br><br>C\'est une très belle démonstration que la diastéréosélectivité n\'est pas une propriété du substrat seul : elle dépend de la <b>taille du réactif</b>. Le substrat rend les faces <i>différentes</i> ; le réactif décide <i>laquelle</i> est la plus accessible.'}}
  ][k];
  S({
    grp:T3, title:EX3[k].t,
    consigne:'Pose les trois questions dans l\'ordre, puis déroule.',
    build(host){
      const f=el('div','figbox'); f.innerHTML=figRx(k); host.appendChild(f);
      if(k===4){ const g=el('div','figbox'); g.innerHTML=figCyclohex(); host.appendChild(g); }
      const col = EX3[k].vc==='blue'?'var(--blue)':(EX3[k].vc==='red'?'var(--red)':'var(--grey)');
      host.appendChild(el('div','statusline','<b style="color:'+col+'">'+EX3[k].verdict+'</b> — '+EX3[k].why));
    },
    une:t.une, etapes:t.et, retenir:t.ret, quiz:t.quiz,
    flag: k===3 ? '<b>Le produit dessiné n\'est pas stéréogène.</b> Un propanoyle (N–CO–CH₂CH₃) méthylé donne un isobutyryle (N–CO–CH(CH₃)₂) : le carbone α porte alors deux méthyles identiques. Il ne peut donc pas être un centre de chiralité, et le trait gras du dessin n\'a pas de signification. Soit c\'est un second piège volontaire, soit c\'est une coquille — c\'est noté dans <code>A_VERIFIER.md</code>, et cela mérite d\'être demandé en TD.' : null
  });
});

S({
  grp:T3, title:'Récapitulatif de l\'exercice 3',
  consigne:'La réponse complète, réaction par réaction.',
  build(host){
    const b=el('div');
    b.innerHTML=recapHTML([
      {t:'a) époxydation de Sharpless', c:'var(--blue)', v:'ÉNANTIOSÉLECTIVE',
       d:'La chiralité vient du <b>tartrate</b> : contrôle par le réactif.'},
      {t:'b) époxydation VO(acac)₂ / t-BuOOH', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE',
       d:'La chiralité vient du <b>substrat</b>, déjà (S) : contrôle par le substrat.'},
      {t:'c) acylation de l\'oxazolidinone', c:'var(--grey)', v:'NI L\'UNE NI L\'AUTRE',
       d:'Aucun élément stéréogène n\'est créé : c\'est l\'étape « fixer l\'auxiliaire ».'},
      {t:'d) alkylation d\'Evans', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE (dans le principe)',
       d:'L\'auxiliaire oriente l\'électrophile. <b style="color:var(--red)">Mais</b> le produit dessiné porte deux méthyles sur le carbone α : il n\'est pas stéréogène.'},
      {t:'e) réduction par NaBH₄', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE',
       d:'Substrat achiral, mais faces diastéréotopes : le <i>tert</i>-butyle sert de repère. Produit achiral.'}
    ]);
    host.appendChild(b);
    host.appendChild(el('div','statusline','<b>*</b> dans le principe. Tel qu\'il est dessiné, le produit de d) n\'a pas de carbone stéréogène — voir la section correspondante.'));
  },
  une:'Une énantiosélective, trois diastéréosélectives, une qui ne sélectionne rien du tout.',
  etapes:[
   {q:'Ce que la série veut faire comprendre.',
    t:'Les cinq réactions balaient exactement les cinq situations possibles : chiralité apportée par le réactif (a), par le substrat naturel (b), par un auxiliaire posé exprès (c puis d), et par une simple différence géométrique sur un substrat achiral (e).'},
   {q:'Le cas e) est le plus subtil.',
    t:'C\'est le seul où le substrat est <b>achiral</b> et où la réaction est pourtant diastéréosélective. Il montre que « diastéréotope » ne demande pas la chiralité : il suffit que les deux faces mènent à deux diastéréoisomères.'},
   {q:'Le couple c) + d) raconte une histoire.',
    t:'On paie une étape non sélective (fixer l\'auxiliaire) pour transformer un problème énantiosélectif, difficile, en problème diastéréosélectif, facile. Puis on coupe l\'auxiliaire et on le recycle. C\'est toute la stratégie d\'Evans.'},
   {q:'La question qui départage, à retenir.',
    t:'« Si je remplace mon réactif chiral par son énantiomère, le produit change-t-il ? » Si oui : énantiosélective. Si la réponse est « je n\'ai pas de réactif chiral » : c\'est forcément diastéréosélective, ou bien il n\'y a rien à sélectionner.'}
  ],
  retenir:[
   'Une seule réaction énantiosélective : la a).',
   'Trois diastéréosélectives : b), d) et e).',
   'Une qui ne sélectionne rien : la c) — le piège.',
   'Auxiliaire = transformer un problème énantio en problème diastéréo.'
  ]
});
