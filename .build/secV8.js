
/* ==========================================================================
   GROUPE 8 — Exercice 3 du TD, en volume
   ========================================================================== */
const V8='6 — Exercice 3 du TD';

/* bloc « substrat → produit » : deux modèles empilés */
function rxBloc(host,a,b,titres,opt){
  opt=opt||{};
  const t1=el('div','cv3dhint'); t1.innerHTML='<b>'+titres[0]+'</b>'; t1.style.marginBottom='2px';
  host.appendChild(t1);
  const v1=bloc3D(host,a,Object.assign({h:opt.h||260},opt.o1||{}));
  const fl=el('div','statusline'); fl.style.textAlign='center';
  fl.innerHTML=titres[1]; host.appendChild(fl);
  const t2=el('div','cv3dhint'); t2.innerHTML='<b>'+titres[2]+'</b>'; t2.style.marginBottom='2px';
  host.appendChild(t2);
  const v2=bloc3D(host,b,Object.assign({h:opt.h||260},opt.o2||{}));
  return [v1,v2];
}

S({
  grp:V8, title:'a) Sharpless — le substrat n\'a aucune chiralité',
  consigne:'Tourne l\'alcool de départ : cherche un carbone à quatre groupes différents. Il n\'y en a pas.',
  build(host){
    rxBloc(host,MOL3D.crotyl,MOL3D.epoxA,
      ['l\'alcool crotylique (E) — ACHIRAL',
       '⬇ t-BuOOH, Ti(O<sup>i</sup>Pr)₄ cat., <b>(R,R)-DET</b>',
       'l\'époxyde (2S,3S)'],
      {h:272, o1:{decor:[
        {k:'disc',p:[0,0,0],n:[0,0,1],r:2.2,c:'--ink2',op:.08},
        {k:'arrow',a:[0,0,2.8],b:[0,0,0.9],c:'--green'},
        {k:'arrow',a:[0,0,-2.8],b:[0,0,-0.9],c:'--red'},
        {k:'tag',p:[0,0,3.3],t:'AVANT',c:'--green',front:true},
        {k:'tag',p:[0,0,-3.3],t:'ARRIÈRE',c:'--red',front:true}
      ]}});
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--blue)">ÉNANTIOSÉLECTIVE</b> — le substrat est achiral, ses deux faces sont <b>énantiotopes</b>, donc de même énergie. C\'est le <b>tartrate</b>, extérieur au substrat, qui choisit la face.';
    host.appendChild(b);
  },
  une:'Substrat achiral + catalyseur chiral = <b>énantiosélective</b>. C\'est la définition même.',
  etapes:[
   {q:'Vérifie que le substrat est achiral.',t:'Tourne le premier modèle. CH₃–CH=CH–CH₂–OH : aucun carbone ne porte quatre groupes différents. La molécule est plate autour de la double liaison et superposable à son miroir.'},
   {q:'Donc les deux faces sont énantiotopes.',t:'Attaquer l\'avant donne un époxyde, attaquer l\'arrière donne son <b>image miroir</b>. Deux chemins énantiomères, donc exactement la <b>même énergie</b>. Avec un peracide banal : 50:50, rien à faire.'},
   {q:'Ce qu\'apporte le titane et le tartrate.',t:'Le titane s\'entoure de deux tartrates chiraux et de l\'hydroperoxyde. Le complexe obtenu est <b>chiral</b> : il ne présente pas la même chose aux deux faces de l\'alcène. Les deux états de transition deviennent diastéréoisomères, donc d\'énergies différentes.'},
   {q:'Le rôle de l\'alcool, souvent oublié.',t:'L\'alcool allylique se <b>lie au titane</b>. C\'est ce qui amarre le substrat au complexe chiral et fixe sa position. Sans l\'OH, la réaction ne marche pas : un simple alcène n\'est pas touché.'},
   {q:'Le sens du résultat.',t:'Le tartrate utilisé est le <b>(R,R)</b>, c\'est-à-dire le tartrate naturel, le (+)-DET. Sur un alcool allylique (E), il donne l\'époxyde <b>(2S,3S)</b> — c\'est ce que dessine l\'énoncé, et c\'est cohérent avec l\'exemple de référence, le géraniol.'},
   {q:'Le test qui prouve que c\'est énantiosélectif.',t:'Remplace le (R,R)-DET par le (S,S)-DET : tu obtiens l\'énantiomère exact du produit. C\'est le <b>réactif</b> qui commande, pas le substrat.'}
  ],
  retenir:['Substrat achiral → faces énantiotopes → même énergie.','Le tartrate fait le tri : <b>contrôle par le réactif</b>.','(R,R)-DET sur un alcool allylique (E) → époxyde (2S,3S).','Changer l\'énantiomère du tartrate inverse le produit.']
});

S({
  grp:V8, title:'b) VO(acac)₂ — cette fois c\'est le substrat qui décide',
  consigne:'Tourne le substrat : le carbone marqué (S) porte bien quatre choses différentes.',
  build(host){
    const m=MOL3D.subB;
    rxBloc(host,m,MOL3D.prodB,
      ['le substrat (2S,3Z) — DÉJÀ CHIRAL',
       '⬇ t-BuOOH, <b>VO(acac)₂</b> (achiral)',
       'le produit (2R,3R,4S)'],
      {h:272, o1:{badges:[{i:m.centre,t:'S',c:'--blue',o:[-22,-18]}], decor:[
        {k:'disc',p:[0,0,0],n:[0,0,1],r:2.3,c:'--ink2',op:.08},
        {k:'arrow',a:[0,0,2.9],b:[0,0,1.0],c:'--green'},
        {k:'arrow',a:[0,0,-2.9],b:[0,0,-1.0],c:'--red'},
        {k:'tag',p:[0,0,3.4],t:'AVANT',c:'--green',front:true},
        {k:'tag',p:[0,0,-3.4],t:'ARRIÈRE',c:'--red',front:true}
      ]}});
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--red)">DIASTÉRÉOSÉLECTIVE</b> — VO(acac)₂ et t-BuOOH sont tous deux achiraux. Toute l\'information chirale vient du <b>substrat</b>.';
    host.appendChild(b);
  },
  une:'Le catalyseur au vanadium est achiral : il ne peut rien choisir. C\'est le centre (S) déjà présent qui rend les deux faces inégales.',
  probleme:'<p>Comment une réaction peut-elle être sélective si rien de chiral n\'est ajouté ? Parce que la chiralité était <b>déjà là</b>, dans le substrat.</p>',
  etapes:[
   {q:'Repère le centre existant.',t:'Le carbone marqué <b>S</b> porte : un méthyle, un CH₂OH, la chaîne vinylique, et un H. Quatre groupes différents.'},
   {q:'Donc les faces sont diastéréotopes.',t:'Attaquer l\'avant ou l\'arrière donne deux produits qui <b>partagent le même centre (S) intact</b>. Ils ne sont donc pas images miroir : ce sont des diastéréoisomères. Deux chemins diastéréoisomères → énergies différentes, gratuitement.'},
   {q:'Comment le vanadium s\'y prend.',t:'L\'hydroxyle se lie au vanadium, et l\'oxygène est livré <b>de l\'intérieur</b>, du côté que l\'alcool peut atteindre. Le méthyle du centre (S) gêne une des deux conformations possibles : c\'est ce déséquilibre qui fait la sélectivité.'},
   {q:'Le détail le plus intéressant de tout le TD.',t:'Le centre de départ est <b>(S)</b> ; dans le produit, ce <b>même</b> carbone est marqué <b>(R)</b>. Et pourtant <b>aucune de ses liaisons n\'a été touchée</b>.'},
   {q:'Pourquoi la lettre change.',t:'Dans le substrat, CH₂OH (O,H,H) battait le carbone voisin de la double liaison (C,C,H). Dans le produit, ce voisin est devenu un carbone d\'<b>époxyde</b>, donc (O,C,H) : il passe devant. Les rangs 1 et 2 s\'échangent, et la lettre bascule.'},
   {q:'Ce qu\'il faut en retenir.',t:'Un descripteur R ou S décrit un <b>classement</b>, pas une position dans l\'espace. Une lettre qui change ne prouve jamais qu\'une liaison a bougé — il faut vérifier.'}
  ],
  retenir:['Substrat chiral + catalyseur achiral → <b>diastéréo</b>sélective.','L\'hydroxyle amarre le vanadium : la réaction est « dirigée ».','(S) devient (R) sans qu\'aucune liaison ne bouge.','Un descripteur décrit un classement, pas une position.']
});

S({
  grp:V8, title:'c) L\'acylation — le piège de l\'exercice',
  consigne:'Compare les deux modèles : cherche ce qui a changé <b>en stéréochimie</b>. Réponse : rien.',
  build(host){
    rxBloc(host,MOL3D.oxazNH,MOL3D.oxazAc,
      ['l\'auxiliaire (S), avant',
       '⬇ Cl–CO–CH₂CH₃ &nbsp;·&nbsp; rendement 100 %',
       'l\'auxiliaire acylé — toujours (S)'],
      {h:272,
       o1:{badges:[{i:MOL3D.oxazNH.centre,t:'S',c:'--blue',o:[22,-18]}]},
       o2:{badges:[{i:MOL3D.oxazAc.centre,t:'S',c:'--blue',o:[22,-18]}]}});
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--grey)">NI L\'UNE NI L\'AUTRE</b> — aucun élément stéréogène n\'est créé. Le centre (S) existait avant et n\'a pas bougé. Il n\'y a rien à sélectionner.';
    host.appendChild(b);
  },
  une:'On fabrique une liaison N–C(=O). Le seul centre de la molécule était déjà là. Une réaction qui ne crée rien de stéréogène n\'est <b>ni</b> diastéréosélective <b>ni</b> énantiosélective.',
  etapes:[
   {q:'Ce qui se passe chimiquement.',t:'L\'azote de l\'oxazolidinone attaque le chlorure de propanoyle. C\'est une substitution d\'acyle ordinaire, sans aucune stéréochimie.'},
   {q:'Cherche un nouveau centre.',t:'Le carbone du nouveau carbonyle est <b>sp²</b>, donc plat : pas stéréogène. Le carbone α du propanoyle porte <b>deux hydrogènes</b> : pas stéréogène non plus. Le C4 du cycle est intact.'},
   {q:'L\'indice du rendement.',t:'100 %. Une réaction vraiment stéréosélective donne rarement 100 % d\'un seul stéréoisomère — parce qu\'il faudrait que l\'autre chemin soit totalement fermé. Un rendement parfait suggère qu\'il n\'y avait pas de choix à faire.'},
   {q:'Alors pourquoi faire cette étape ?',t:'C\'est l\'étape de <b>fixation de l\'auxiliaire chiral</b>. On vient de rendre chiral un substrat qui ne l\'était pas (l\'acide propanoïque). L\'étape suivante pourra donc bénéficier du contrôle par le substrat.'},
   {q:'La stratégie complète, en trois temps.',t:'<b>Fixer</b> (non sélective) → <b>réagir</b> (diastéréosélective) → <b>couper</b> (non sélective, et il faut surtout éviter d\'épimériser le centre qu\'on vient de créer). Seule l\'étape du milieu est stéréosélective.'},
   {q:'Pourquoi c\'est rentable.',t:'Parce qu\'un problème diastéréosélectif est <b>beaucoup</b> plus facile qu\'un problème énantiosélectif : les énergies diffèrent gratuitement, et on peut séparer les diastéréoisomères par chromatographie ordinaire. On paie deux étapes pour éviter d\'avoir à inventer un catalyseur chiral.'}
  ],
  retenir:['Aucun élément stéréogène créé → aucune sélectivité.','Le rendement de 100 % est un indice.','C\'est l\'étape « fixer » du cycle auxiliaire.','Fixer → réagir → couper : seule l\'étape du milieu est sélective.']
});

S({
  grp:V8, title:'d) L\'alkylation d\'Evans — et le problème du dessin',
  consigne:'Regarde bien le produit : deux méthyles partent du même carbone.',
  build(host){
    rxBloc(host,MOL3D.evansSub,MOL3D.evansProd,
      ['l\'imide de propanoyle (R)',
       '⬇ 1. LDA &nbsp;·&nbsp; 2. CH₃–I',
       'le produit : un <b>ISO</b>butyryle'],
      {h:272,
       o1:{badges:[{i:MOL3D.evansSub.centre,t:'R',c:'--blue',o:[22,-18]}]},
       o2:{badges:[{i:MOL3D.evansProd.centre,t:'R',c:'--blue',o:[22,-18]}]}});
    const b=el('div','warnbox');
    b.innerHTML='<b>Le carbone α du produit porte deux méthyles identiques</b> : il n\'est donc pas stéréogène. Tourne le second modèle jusqu\'à voir les deux branches — elles sont interchangeables. Le trait gras du dessin de l\'énoncé n\'a pas de signification.';
    host.appendChild(b);
  },
  une:'Le mécanisme d\'Evans est le cas d\'école de la diastéréosélectivité. Mais tel qu\'il est dessiné, ce produit-là n\'a aucun centre à sélectionner.',
  probleme:'<p>Un propanoyle, c\'est N–CO–CH₂–CH₃. Si on le méthyle en α, on obtient N–CO–CH(CH₃)₂ : un <b>isobutyryle</b>. Ce carbone porte alors deux méthyles identiques, plus un H et le carbonyle. Trois groupes différents seulement : pas de chiralité possible.</p>',
  etapes:[
   {q:'Le mécanisme, d\'abord — il est juste.',t:'LDA arrache le proton α et forme un énolate de géométrie <b>Z(O)</b>, imposée par la tension A(1,3). Le lithium chélate les deux oxygènes : le cycle et l\'énolate sont alors <b>bloqués dans le même plan</b>, comme un seul objet rigide.'},
   {q:'Comment la face est choisie.',t:'L\'isopropyle du C4 pointe d\'un côté de ce plan et bouche cette face. L\'électrophile n\'a plus qu\'une entrée. Comme le substrat est déjà chiral (grâce à l\'auxiliaire), les deux états de transition sont diastéréoisomères : la réaction <b>est</b> diastéréosélective, et très efficacement.'},
   {q:'Maintenant, le problème.',t:'Avec CH₃–I comme électrophile, le carbone α se retrouve avec <b>deux méthyles</b>. Il n\'est plus stéréogène. La réaction a beau être parfaitement sélective dans son mécanisme, il n\'y a rien à mesurer.'},
   {q:'Deux lectures possibles.',t:'Soit c\'est un <b>second piège</b>, juste après celui de la question c). Soit c\'est une <b>coquille</b>. Je ne tranche pas — c\'est exactement le genre de détail à demander en TD, et le signaler dans ta copie ne peut que rapporter.'},
   {q:'Avec quoi ça redeviendrait le cas d\'école.',t:'N\'importe quel électrophile autre qu\'un méthyle : <b>Br–CH₂Ph</b> (l\'exemple historique d\'Evans, avec des rapports qui dépassent 99:1), I–CH₂CH₃, un bromure allylique… Ou bien : garder CH₃I mais partir d\'un <b>butanoyle</b>.'},
   {q:'Ce qu\'il faut écrire dans la copie.',t:'« Le mécanisme est diastéréosélectif (contrôle par l\'auxiliaire d\'Evans). Toutefois, tel qu\'il est dessiné, le produit n\'a pas de carbone stéréogène : le carbone α porte deux méthyles. »'}
  ],
  retenir:['Énolate Z(O) + chélate au lithium + face bloquée par l\'iPr.','Le principe : <b>diastéréosélective</b>, contrôle par le substrat.','<b>Mais</b> propanoyle + CH₃I = isobutyryle : pas de centre.','À signaler dans la copie plutôt qu\'à ignorer.']
});

S({
  grp:V8, title:'e) NaBH₄ — un substrat achiral, et pourtant sélectif',
  consigne:'Tourne la chaise pour la voir par la tranche, et repère de quel côté part le tert-butyle.',
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
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--red)">DIASTÉRÉOSÉLECTIVE</b> — la molécule est pourtant <b>achirale</b>. C\'est le <i>tert</i>-butyle qui sert de repère et rend les deux faces inégales.';
    host.appendChild(b);
  },
  une:'Une molécule achirale peut parfaitement avoir des faces <b>diastéréotopes</b>. C\'est la subtilité de cette question, et le seul cas du TD où ça arrive.',
  probleme:'<p>L\'intuition dit : « molécule achirale, donc faces équivalentes ». C\'est faux. Être achirale veut dire qu\'on ne peut pas distinguer la molécule de son reflet. Ça ne dit rien sur le fait que son dessus ressemble à son dessous.</p>',
  etapes:[
   {q:'Le repère.',t:'Le <i>tert</i>-butyle est planté d\'un seul côté du cycle. Il définit un bas, donc un haut. Sans lui, les deux faces seraient <b>homotopes</b> et il n\'y aurait rien à sélectionner.'},
   {q:'Attaque par le vert.',t:'L\'hydrure arrive par le dessus, l\'OH se retrouve en dessous, du <b>même</b> côté que le tBu : isomère <b>cis</b>.'},
   {q:'Attaque par le rouge.',t:'L\'OH se retrouve au-dessus, à l\'opposé du tBu : isomère <b>trans</b>.'},
   {q:'Compare.',t:'<i>cis</i> et <i>trans</i> ne sont ni identiques ni images miroir : ce sont des <b>diastéréoisomères</b>. Les faces sont donc diastéréotopes, et la réaction est diastéréosélective — avec un réducteur parfaitement achiral.'},
   {q:'Lequel gagne ?',t:'NaBH₄ est un hydrure <b>petit</b>. Il passe par le chemin axial, le plus direct, ce qui pose l\'OH en équatorial : on obtient majoritairement le <b>trans</b>, celui que dessine l\'énoncé. Avec un hydrure encombrant (L-Selectride), le chemin axial est bouché et on obtient le <b>cis</b>.'},
   {q:'Les minuscules, et la mention « (±) ».',t:'Les descripteurs (1<i>r</i>,4<i>r</i>) sont <b>corrects</b> : une minuscule signale un centre stéréogène mais non chiral. Vérifié par RDKit sur le dessin de l\'énoncé, et la molécule est bien achirale. En revanche « (±) » désigne un racémique — et un composé achiral n\'a pas d\'énantiomère. Cette mention-là est de trop.'}
  ],
  retenir:['Molécule achirale, mais faces <b>diastéréotopes</b>.','Le tBu sert de <b>repère</b>, pas d\'obstacle.','Petit hydrure → attaque axiale → OH équatorial → <i>trans</i>.','(1<i>r</i>,4<i>r</i>) correct ; « (±) » incorrect.']
});

S({
  grp:V8, title:'Les cinq réactions, d\'un coup d\'œil',
  consigne:'La réponse complète de l\'exercice 3.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figArbreSel(); host.appendChild(f);
    host.appendChild(el('div',null,recapHTML([
      {t:'a) époxydation de Sharpless', c:'var(--blue)', v:'ÉNANTIOSÉLECTIVE',
       d:'Substrat achiral, faces énantiotopes. C\'est le <b>tartrate</b> qui choisit : contrôle par le réactif.'},
      {t:'b) époxydation VO(acac)₂', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE',
       d:'Substrat déjà (S), catalyseur achiral : contrôle par le substrat. Le descripteur passe de (S) à (R) sans qu\'aucune liaison ne bouge.'},
      {t:'c) acylation de l\'oxazolidinone', c:'var(--grey)', v:'NI L\'UNE NI L\'AUTRE',
       d:'Aucun élément stéréogène créé. C\'est l\'étape « fixer l\'auxiliaire ».'},
      {t:'d) alkylation d\'Evans', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE (dans le principe)',
       d:'L\'auxiliaire bloque une face. <b style="color:var(--red)">Mais</b> le produit dessiné porte deux méthyles sur le carbone α : il n\'est pas stéréogène.'},
      {t:'e) réduction par NaBH₄', c:'var(--red)', v:'DIASTÉRÉOSÉLECTIVE',
       d:'Substrat achiral, mais faces diastéréotopes : le <i>tert</i>-butyle sert de repère. Produit achiral.'}
    ])));
  },
  une:'Une énantiosélective, trois diastéréosélectives, une qui ne sélectionne rien du tout.',
  etapes:[
   {q:'Ce que la série veut faire comprendre.',t:'Les cinq réactions balaient les cinq situations possibles : chiralité apportée par le réactif (a), par le substrat naturel (b), par un auxiliaire posé exprès (c puis d), et par une simple différence géométrique sur un substrat achiral (e).'},
   {q:'La question qui départage, à retenir.',t:'« Si je remplace mon réactif chiral par son énantiomère, le produit change-t-il ? » Si oui : énantiosélective. Si tu n\'as aucun réactif chiral : c\'est forcément diastéréosélectif, ou bien il n\'y a rien à sélectionner.'},
   {q:'Le cas e) est le plus subtil.',t:'C\'est le seul où le substrat est <b>achiral</b> et où la réaction est pourtant diastéréosélective. Il montre que « diastéréotope » ne demande pas la chiralité : il suffit que les deux faces mènent à deux diastéréoisomères.'},
   {q:'Le couple c) + d) raconte une histoire.',t:'On paie une étape non sélective pour transformer un problème énantiosélectif, difficile, en problème diastéréosélectif, facile. Puis on coupe l\'auxiliaire et on le recycle. C\'est toute la stratégie d\'Evans, et c\'est le cœur du chapitre 1.'}
  ],
  retenir:['Une seule énantiosélective : la a).','Trois diastéréosélectives : b), d) et e).','Une qui ne sélectionne rien : la c) — le piège.','Auxiliaire = transformer un problème énantio en problème diastéréo.']
});
