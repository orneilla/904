
/* ==========================================================================
   GROUPE 3 — Nommer
   ========================================================================== */
const G3='3 — Nommer';

S({
  grp:G3, title:'Les règles CIP, dans l\'ordre',
  consigne:'Lis les cinq règles de haut en bas : on n\'applique la suivante que si la précédente n\'a pas tranché.',
  build(host){
    const box=el('div');
    box.innerHTML=`<table class="dat"><thead><tr><th class="num">n°</th><th>Règle</th></tr></thead><tbody>
      <tr><td class="num"><b>1</b></td><td><b>Numéro atomique</b> le plus élevé d'abord.<br><span style="color:var(--ink2);font-size:13px">En cas d'égalité, on avance d'une sphère. À égalité d'atomes, le plus grand nombre d'atomes de plus haute priorité l'emporte.</span></td></tr>
      <tr><td class="num"><b>2</b></td><td><b>Masse isotopique</b> la plus élevée d'abord.<br><span style="color:var(--ink2);font-size:13px">D devant H, ¹³C devant ¹²C.</span></td></tr>
      <tr><td class="num"><b>3</b></td><td><b>Configuration des doubles liaisons</b> : Z avant E, cis avant trans.</td></tr>
      <tr><td class="num"><b>4</b></td><td><b>l</b> (like) avant <b>u</b> (unlike) ; <b>r</b> avant <b>s</b>.</td></tr>
      <tr><td class="num"><b>5</b></td><td><b>Groupes énantiomères</b> : R avant S, M avant P.</td></tr>
      </tbody></table>`;
    host.appendChild(box);
    host.appendChild(el('div','statusline','En pratique tu n\'utiliseras presque jamais les règles 3 à 5. Mais il faut savoir qu\'elles existent : c\'est ce qui rend le système CIP <b>toujours</b> capable de trancher.'));
  },
  une:'Les règles CIP ne sont pas une liste à connaître par cœur : c\'est une procédure à dérouler, et on s\'arrête dès qu\'un ligand est départagé.',
  probleme:'<p>La plupart des erreurs d\'attribution R/S ne viennent pas des règles elles‑mêmes, mais de la façon de les appliquer : on compare trop tôt, on oublie de dédoubler une double liaison, ou on suit la mauvaise branche.</p><p>Il y a une discipline à respecter, et elle vaut plus que les règles.</p>',
  etapes:[
   {q:'Principe 1 — on avance sphère par sphère.',
    t:'On commence par les atomes <b>directement liés</b> au centre. Si deux d\'entre eux sont identiques, on regarde les atomes qui leur sont liés, et ainsi de suite. On ne saute jamais une sphère.'},
   {q:'Principe 2 — on épuise une règle avant de passer à la suivante.',
    t:'La règle 1 (numéro atomique) doit être appliquée <b>jusqu\'au bout</b> de la molécule avant d\'envisager la règle 2. C\'est l\'erreur la plus fréquente : invoquer un isotope ou une géométrie alors que les numéros atomiques suffisaient.'},
   {q:'Principe 3 — quand une branche se divise, on suit la plus prioritaire.',
    t:'On explore l\'arbre en suivant toujours le chemin de plus haute priorité. On ne fait pas la « somme » de la branche.'},
   {q:'Principe 4 — les liaisons multiples se dédoublent.',
    t:'Un C=O compte comme un carbone lié à <b>deux</b> oxygènes, dont un « fantôme » sans substituants. Un C≡N compte comme un carbone lié à trois azotes. C\'est ce qui fait que CHO (O,O,H) bat CH₂OH (O,H,H).'},
   {q:'Principe 5 — les cycles s\'ouvrent en arbre.',
    t:'Pour un cycle, on parcourt dans les deux sens à partir du centre jusqu\'à revenir au point de départ, et on termine chaque branche par un atome <b>dupliqué</b>. L\'arbre obtenu peut être différent pour chaque centre stéréogène de la molécule.'},
   {q:'Astuce pratique.',
    t:'Pour les groupes courants (phényle, vinyle, carboxyle…), les chimistes utilisent des <b>tables de priorité</b> toutes faites plutôt que de redérouler l\'arbre. C\'est parfaitement légitime — l\'essentiel est de savoir d\'où elles viennent.'}
  ],
  retenir:[
   'Sphère par sphère, jamais de saut.',
   'Une règle épuisée avant la suivante.',
   'Liaisons multiples → atomes dupliqués (fantômes, sans substituants).',
   'Un doublet libre ou un site vacant compte comme un « atome » de numéro 0 : toujours dernier.'
  ],
  plus:{titre:'Un exemple où la règle 3 est vraiment nécessaire',
    body:'<p>Robinson donne le cas d\'un acide qu\'on croyait dépourvu de centre stéréogène. En ouvrant le cycle en arbre, on s\'aperçoit qu\'une branche contient une double liaison <i>cis</i> et l\'autre une double liaison <i>trans</i> : constitutionnellement identiques, elles ne sont départagées que par la <b>règle 3</b>.</p><p>Il précise un détail important : dans ce contexte, « cis » et « trans » décrivent la relation entre le groupe <i>contenant le centre stéréogène</i> et le substituant de plus haute priorité à l\'autre bout de la double liaison. Ce n\'est pas la même chose que Z/E, qui ne peut pas toujours être attribué à l\'intérieur d\'une branche d\'arbre.</p><p>Le fait qu\'un tel cas existe est le vrai message : le système CIP a été conçu pour trancher <b>tous</b> les cas, y compris ceux qu\'on n\'a pas anticipés. C\'est ce qui en fait une norme et non une recette.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.7, fig. 4.20, p. 51.'},
  quiz:{q:'Entre –CHCl₂ et –CH₂Cl, lequel est prioritaire&nbsp;? Et entre –CH₂Cl et –CH₂Br&nbsp;?',
        a:'<b>–CHCl₂ &gt; –CH₂Cl</b> : à première sphère, les deux sont des carbones ; à la deuxième, on compare (Cl, Cl, H) contre (Cl, H, H). Premier atome : Cl = Cl. Deuxième : Cl &gt; H. Donc CHCl₂ gagne.<br><br><b>–CH₂Br &gt; –CH₂Cl</b> : on compare (Br, H, H) contre (Cl, H, H), et Br (Z = 35) bat Cl (Z = 17). Attention au piège : ce n\'est jamais une somme ni une moyenne, c\'est une comparaison <b>rang par rang</b>, du plus prioritaire au moins prioritaire.'}
});

S({
  grp:G3, title:'R ou S : la méthode, sur un exemple',
  consigne:'Appuie sur « étape suivante » et refais le raisonnement à voix haute.',
  build(host){
    const fig=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const prev=el('button','btn'), next=el('button','btn');
    prev.textContent='‹ Étape'; next.textContent='Étape suivante ›';
    const draw=()=>{ fig.innerHTML=figCIP(k); prev.disabled=(k===0); next.disabled=(k===3);
      prev.style.opacity=k===0?.4:1; next.style.opacity=k===3?.4:1; };
    prev.onclick=()=>{if(k>0){k--;draw();}}; next.onclick=()=>{if(k<3){k++;draw();}};
    row.appendChild(prev); row.appendChild(next);
    host.appendChild(fig); host.appendChild(row); draw();
  },
  une:'Classer, puis regarder du bon côté. Les erreurs viennent presque toujours de la deuxième moitié.',
  probleme:'<p>Le glycéraldéhyde est l\'exemple canonique : c\'est la molécule de référence de toute la nomenclature des sucres, et elle demande d\'utiliser le dédoublement des doubles liaisons. Quatre étapes suffisent.</p>',
  etapes:[
   {q:'Étape 1 — identifier les quatre ligands.',
    t:'OH, CHO, CH₂OH et H. Ils sont tous différents : le carbone central est bien stéréogène.'},
   {q:'Étape 2 — règle 1, première sphère.',
    t:'Les atomes directement liés sont O, C, C et H. L\'oxygène est le plus lourd : <b>OH = a</b>. L\'hydrogène est le plus léger : <b>H = d</b>. Ces deux-là sont réglés, on n\'y revient plus.'},
   {q:'Étape 3 — départager les deux carbones.',
    t:'On avance d\'une sphère. Le CHO porte un O doublement lié, qu\'on <b>dédouble</b> : il compte comme (O, O, H). Le CH₂OH porte (O, H, H). Premier atome : O = O. Deuxième : O &gt; H. Donc <b>CHO = b</b> et <b>CH₂OH = c</b>.'},
   {q:'Étape 4 — regarder du bon côté.',
    t:'On se place de façon à voir a, b, c avec <b>d pointant à l\'opposé</b>. Ici H est déjà vers l\'arrière (CH₂OH est dessiné en gras, donc vers l\'avant). On lit OH → CHO → CH₂OH : sens des aiguilles d\'une montre, donc <b>R</b>.'},
   {q:'Et si d pointe vers toi ?',
    t:'Deux options. Soit tu tournes mentalement la molécule — risqué. Soit tu lis le sens tel quel et tu <b>inverses la réponse</b> à la fin. La deuxième méthode est bien plus fiable, et c\'est celle que je te conseille d\'adopter systématiquement.'}
  ],
  retenir:[
   'a = priorité la plus haute, d = la plus basse.',
   'Une liaison double se dédouble : C=O compte comme (O, O).',
   'On lit a → b → c avec d vers l\'ARRIÈRE. Sens horaire = R, antihoraire = S.',
   'Si d est vers l\'avant : lire quand même, puis inverser la réponse.'
  ],
  quiz:{q:'Tu as dessiné un centre où le H (priorité d) est sur un coin PLEIN, et tu lis a→b→c dans le sens antihoraire. Quelle est la réponse&nbsp;?',
        a:'<b>R</b>. Le H étant vers l\'avant, la lecture directe donne l\'inverse de la vraie réponse : tu lis « S », donc c\'est R. C\'est l\'erreur la plus fréquente en examen, et elle ne coûte rien à éviter — il suffit de prendre l\'habitude de vérifier <i>où pointe d</i> avant de lire le sens.'}
});

S({
  grp:G3, title:'E/Z n\'est pas cis/trans',
  consigne:'Compare les deux exemples : les deux méthyles sont du même côté dans les deux cas.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), st=el('div','statusline'); let i=0;
    const draw=()=>{ fig.innerHTML=figEZ(i); st.innerHTML=EZ[i].why;
      [...row.children].forEach((b,j)=>b.classList.toggle('on',j===i)); };
    EZ.forEach((d,j)=>{ const b=el('button','btn'); b.textContent=d.t; b.onclick=()=>{i=j;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig); host.appendChild(st); draw();
  },
  une:'cis/trans compare deux groupes que l\'œil choisit ; Z/E compare les deux groupes prioritaires. Les deux coïncident souvent, mais pas toujours.',
  probleme:'<p>« Z, c\'est cis » est une simplification qui marche sur le but-2-ène et se casse dès qu\'on met un halogène. Comme les deux notations coexistent dans la littérature, il faut savoir exactement ce que chacune dit.</p>',
  etapes:[
   {q:'Ce que dit cis/trans.',
    t:'Que deux groupes <b>que l\'on a choisis</b> sont du même côté ou non. C\'est commode quand les deux bouts portent le même substituant — les deux méthyles du but-2-ène, par exemple — et ambigu sinon.'},
   {q:'Ce que dit Z/E.',
    t:'On applique CIP à chaque bout <b>séparément</b>, pour désigner le substituant prioritaire de chaque côté. Si les deux prioritaires sont du même côté : <b>Z</b> (de l\'allemand <i>zusammen</i>, ensemble). Sinon : <b>E</b> (<i>entgegen</i>, opposé).'},
   {q:'Pourquoi ils divergent parfois.',
    t:'Parce que le groupe que l\'œil suit (souvent la chaîne principale) n\'est pas forcément le prioritaire. Dans le 2-bromobut-2-ène, les deux méthyles sont du même côté — on dirait « cis » — mais à gauche le prioritaire est le <b>brome</b>, pas le méthyle. Résultat : E.'},
   {q:'Quelle notation utiliser ?',
    t:'Z/E, toujours, dès qu\'il y a le moindre doute. Robinson note que cis/trans reste acceptable pour les alcènes simples, et qu\'on le garde aussi pour les cycles disubstitués et les jonctions de cycles — contextes où il n\'y a pas d\'ambiguïté.'},
   {q:'Le même piège existe pour R/S.',
    t:'Tu l\'as peut-être déjà vu dans le chapitre CH0904 : un descripteur peut basculer sans qu\'aucun atome n\'ait bougé, simplement parce que le classement a changé. Z/E et R/S décrivent des <b>classements</b>, pas des positions.'}
  ],
  retenir:[
   'cis/trans : deux groupes choisis par l\'utilisateur.',
   'Z/E : les deux groupes prioritaires CIP, un par bout.',
   'Ils coïncident sur les alcènes simples et divergent dès qu\'un halogène s\'en mêle.',
   'En cas de doute, utiliser Z/E et redérouler les priorités.'
  ],
  quiz:{q:'Dans le (Z)-1-bromo-1-chloropropène, les groupes CH₃ et Br sont-ils du même côté&nbsp;?',
        a:'Sur le carbone portant Br et Cl, le prioritaire est <b>Br</b> (Z = 35 &gt; 17). Sur l\'autre, entre CH₃ et H, le prioritaire est <b>CH₃</b>. Z signifie que ces deux-là sont du même côté : donc <b>oui</b>, Br et CH₃ sont du même côté. Ce qui veut dire que Cl et CH₃, eux, sont opposés — alors qu\'un œil non averti aurait pu dire l\'inverse.'}
});

S({
  grp:G3, title:'D/L : pourquoi L n\'est pas toujours S',
  consigne:'Compare l\'alanine et la cystéine : même famille L, descripteur différent.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='ala';
    const draw=()=>{ fig.innerHTML=figAminoDL(cur);
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['ala','L-alanine'],['cys','L-cystéine']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'D et L décrivent une position sur un dessin de Fischer ; R et S décrivent un classement. Les deux systèmes ne se recouvrent pas.',
  probleme:'<p>On lit partout que « les acides aminés naturels sont L, donc S ». C\'est vrai pour dix-neuf d\'entre eux — et faux pour la cystéine, qui est L et pourtant (R). Cela ressemble à une exception arbitraire ; c\'est en réalité parfaitement logique.</p>',
  etapes:[
   {q:'Ce que veut dire L pour un acide aminé.',
    t:'C\'est une convention <b>de dessin</b> : en projection de Fischer, avec le CO₂H en haut, le groupe NH₂ est à gauche. Rien d\'autre. Aucune règle de priorité n\'intervient.'},
   {q:'Ce que veut dire S.',
    t:'Un classement CIP complet des quatre ligands. Pour la plupart des acides aminés : NH₂ &gt; CO₂H &gt; R &gt; H, et cela donne (S).'},
   {q:'Ce qui change avec la cystéine.',
    t:'Sa chaîne latérale est CH₂–SH. À la deuxième sphère, ce carbone porte (S, H, H) alors que le CO₂H porte (O, O, O). On compare les premiers atomes : <b>soufre (Z = 16) contre oxygène (Z = 8)</b>. Le soufre gagne.'},
   {q:'Conséquence.',
    t:'CH₂SH passe <b>devant</b> CO₂H : les priorités 2 et 3 s\'échangent, et le descripteur bascule en (R). La molécule n\'a pas bougé d\'un ångström — c\'est le classement qui a changé.'},
   {q:'Ce que ça dit des systèmes de nomenclature.',
    t:'Robinson le formule très bien : la correspondance simple entre la réactivité biologique et le descripteur « local » L est <b>perdue</b> avec R/S. Toutes les cystéines réagissent comme les autres acides aminés L avec les mêmes enzymes ; seule l\'étiquette change. Aucun système général ne peut coller à toutes les régularités chimiques.'}
  ],
  retenir:[
   'D/L : convention de dessin (Fischer), pas de calcul de priorité.',
   'R/S : classement CIP complet, recalculé à chaque molécule.',
   'L-cystéine = (R), à cause du soufre de sa chaîne latérale. Ce n\'est pas une exception, c\'est la règle appliquée.',
   'Pour les sucres, D/L est fixé par le centre stéréogène le PLUS ÉLOIGNÉ du carbonyle.'
  ],
  plus:{titre:'Deux systèmes D/L indépendants',
    body:'<p>Attention à un faux ami : les acides aminés et les sucres utilisent les mêmes lettres D et L, mais les <b>deux systèmes sont indépendants</b>.</p><ul class="keys"><li>Pour un acide aminé, D/L se lit sur le centre α, celui qui porte NH₂.</li><li>Pour un sucre, D/L se lit sur le centre stéréogène le <b>plus éloigné</b> du carbonyle — par exemple C5 pour le glucose.</li></ul><p>Autre point que Robinson souligne : la configuration relative des sucres est incluse dans leur <b>nom</b> (glucose, mannose, galactose désignent des configurations différentes), ce qui est contraire à la règle générale voulant qu\'une configuration soit indiquée par un préfixe. C\'est un héritage historique, gardé parce que ces molécules sont trop importantes pour être renommées.</p><p>Et quand on veut désigner l\'énantiomère d\'une molécule dont le nom implique déjà une configuration — le cholestérol, par exemple — on utilise le préfixe <b>ent-</b> : <i>ent</i>-cholestérol.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.6–4.7, fig. 4.18 et 4.22, p. 48–51.'},
  quiz:{q:'La méthionine a pour chaîne latérale –CH₂CH₂SCH₃. Elle est L. Est-elle R ou S&nbsp;?',
        a:'<b>(S)</b>. Le piège ne se referme pas ici : le soufre est en <b>troisième</b> sphère, pas en deuxième. À la deuxième sphère on compare (C, H, H) pour la chaîne latérale contre (O, O, O) pour CO₂H — et l\'oxygène gagne largement. Le carboxyle reste donc prioritaire, et on retrouve (S). Seule la cystéine (et la sélénocystéine) ont l\'hétéroatome assez près pour renverser le classement.'}
});
