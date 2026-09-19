
/* ==========================================================================
   GROUPE C — L'auxiliaire d'Evans
   ========================================================================== */
const GC='C — Auxiliaire d\'Evans';

/* lobe d'orbitale p */
function lobe(cx,cy,rx,ry,col,op){
  return `<ellipse cx="${E(cx)}" cy="${E(cy)}" rx="${E(rx)}" ry="${E(ry)}" fill="${col}" opacity="${op||0.22}" stroke="${col}" stroke-width="1.3"/>`;
}
/* C1 : l'exigence stéréoélectronique, vue par la tranche */
function figStereoElec(step){
  const W=360,H=252; let s=''; const py=142;
  const Lb=(cx,cy)=>lobe(cx,cy,14,25,C.blue);
  if(step==='depro'){
    s+=txt([180,16],'DÉPROTONATION — vue par la tranche',{fs:12.5,fw:700});
    s+=`<rect x="146" y="${py-8}" width="188" height="16" rx="8" fill="var(--panel2)" stroke="${C.line}"/>`;
    const Ca=[118,py], Cc=[206,py], Oo=[278,py];
    s+=bond(Ca,Cc,{s:15,e:11}); s+=dbond(Cc,Oo,{s:11,e:12});
    s+=lab(Ca,'Cα',{fs:13,fw:700,r:15}); s+=lab(Cc,'C',{fs:13,fw:700}); s+=lab(Oo,'O',{fs:13,fw:700});
    s+=Lb(206,py-32); s+=Lb(206,py+32); s+=Lb(278,py-32); s+=Lb(278,py+32);
    s+=txt([274,60],'orbitales p du C=O',{fs:10.5,c:C.blue,fw:700});
    /* liaison C-H perpendiculaire au plan */
    s+=lobe(118,py-30,13,23,C.green,0.30);
    s+=bond(Ca,[118,py-44],{s:13,e:10,c:C.green,w:2.8});
    s+=lab([118,py-58],'H',{fs:13.5,c:C.green,fw:700});
    /* recouvrement */
    s+=seg([134,py-32],[190,py-32],{c:C.red,dash:'4 3',w:2.2});
    s+=txt([162,62],'recouvrement',{fs:10.5,c:C.red,fw:700});
    s+=seg([162,70],[162,py-42],{c:C.red,dash:'3 3',w:1.2});
    s+=lab([40,76],'LDA',{fs:12,fw:700,r:20});
    s+=curve([62,84],[104,86],-14,{c:C.ink});
    s+=txtLines([180,212],
      ['La liaison C–H à casser doit être parallèle',
       'aux orbitales p du C=O — sinon pas de recouvrement.'],{fs:11,c:C.ink2,lh:16});
  } else {
    s+=txt([180,16],'ALKYLATION — vue par la tranche',{fs:12.5,fw:700});
    s+=`<rect x="92" y="${py-8}" width="240" height="16" rx="8" fill="var(--panel2)" stroke="${C.line}"/>`;
    const Ca=[130,py], Cc=[210,py], Oo=[282,py];
    s+=bond(Ca,Cc,{s:15,e:11}); s+=bond(Cc,Oo,{s:11,e:12});
    s+=lab(Ca,'Cα',{fs:13,fw:700,r:15}); s+=lab(Cc,'C',{fs:13,fw:700}); s+=lab(Oo,'O',{fs:13,fw:700});
    s+=txt([300,py-14],'⊖',{fs:12,c:C.ink2});
    s+=Lb(130,py-32); s+=Lb(130,py+32); s+=Lb(210,py-32); s+=Lb(210,py+32);
    s+=Lb(282,py-32); s+=Lb(282,py+32);
    s+=txt([250,60],'orbitales p de l\'énolate',{fs:10.5,c:C.blue,fw:700});
    s+=arrow([46,70],[112,106],{c:C.green,w:2.6});
    s+=arrow([46,206],[112,178],{c:C.green,w:2.6,dash:'6 4'});
    s+=lab([32,62],'E⁺',{fs:13,c:C.green,fw:700,r:13});
    s+=lab([30,198],'E⁺',{fs:13,c:C.green,fw:700,r:13});
    s+=txtLines([180,216],
      ['E⁺ entre perpendiculairement au plan, dans un lobe.',
       'Deux lobes ⇒ deux produits possibles.'],{fs:11,c:C.ink2,lh:16});
  }
  return svg(W,H,s,{alt:'exigence stéréoélectronique'});
}

S({
  grp:GC, title:'Pourquoi un énolate, et pourquoi il a deux faces',
  consigne:'Bascule entre « déprotonation » et « alkylation » : c\'est la même contrainte, appliquée deux fois.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='depro';
    const draw=()=>{fig.innerHTML=figStereoElec(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['depro','1. Déprotonation'],['alkyl','2. Alkylation']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Un énolate est plat, et son carbone α porte une orbitale p avec deux lobes. L\'électrophile doit entrer dans un lobe : il n\'y a donc que deux issues possibles, et tout le travail de l\'auxiliaire consiste à en boucher une.',
  probleme:'<p>Avant de parler de valinol, de lithium ou de face bloquée, il faut répondre à deux questions dans l\'ordre :</p><p><b>(1)</b> quelle <i>géométrie</i> d\'énolate se forme&nbsp;? <b>(2)</b> par quelle <i>face</i> l\'électrophile arrive‑t‑il&nbsp;?</p><p>Si on saute la première, la deuxième n\'a aucun sens : une face « du dessus » ne veut rien dire tant qu\'on ne sait pas comment la molécule est arrangée.</p>',
  etapes:[
   {q:'Pourquoi passer par un énolate ?',
    t:'Le carbone en α d\'un carbonyle n\'est pas nucléophile tel quel. En lui arrachant son proton, on crée un carbanion — mais un carbanion <b>stabilisé</b> par délocalisation sur le carbonyle voisin. C\'est cet énolate qui ira attaquer E–X en SN2.'},
   {q:'Pourquoi la conformation compte au moment où on arrache le proton ?',
    t:'Pour que le doublet libéré par la rupture C–H puisse rejoindre le système π, il faut que cette liaison C–H soit à peu près <b>parallèle aux orbitales p</b> du C=O. C\'est une exigence <b>stéréoélectronique</b> : sans recouvrement, pas de stabilisation, donc pas de déprotonation.'},
   {q:'Quelle conséquence ?',
    t:'C\'est la conformation au moment de l\'arrachement qui <b>fige</b> la géométrie de l\'énolate. Tout ce qui rend une conformation inconfortable (un encombrement) se répercute directement sur la géométrie obtenue. C\'est exactement ce qu\'on va exploiter à la section suivante.'},
   {q:'Et pour l\'alkylation ?',
    t:'Le carbone α de l\'énolate est sp², donc plan, avec une orbitale p perpendiculaire au plan. L\'électrophile doit arriver <b>dans un des deux lobes</b>, donc perpendiculairement — par‑dessus ou par‑dessous. Deux lobes, deux produits.'},
   {q:'Où intervient l\'auxiliaire, alors ?',
    t:'Nulle part dans le mécanisme lui‑même. Il se contente de poser un gros groupe devant un des deux lobes. La chimie ne change pas : seule l\'accessibilité change.'}
  ],
  retenir:[
   'Énolate = plan + une orbitale p à deux lobes sur Cα.',
   'Déprotonation : la liaison C–H doit être parallèle aux p du C=O.',
   'Alkylation : E⁺ entre perpendiculairement au plan. Deux faces = deux diastéréoisomères.',
   'L\'auxiliaire ne modifie pas le mécanisme, il modifie seulement l\'<b>accès</b>.'
  ],
  plus:{titre:'Le détail orbitalaire',
    body:'<p>Procter décrit la déprotonation par la conformation <b>4.8</b>, où l\'orbitale σ de la liaison C–H est au point de recouvrement maximal avec l\'orbitale π du carbonyle. Cette liaison σ « devient » une partie du système π de l\'énolate.</p><p>Pour l\'alkylation, c\'est la transformation inverse : l\'orbitale p au bout du système π de l\'énolate « redevient » une orbitale σ. Le même argument de recouvrement maximal s\'applique, d\'où l\'attaque perpendiculaire au plan.</p><p>Procter ajoute une nuance honnête : dans les vraies réactions, la trajectoire de l\'électrophile est légèrement déplacée par rapport à la perpendiculaire stricte, « <i>vers</i> » l\'orbitale p du carbonyle. Cela ne change rien au raisonnement des faces.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §4, fig. 4.2–4.4, p. 42–43. Voir aussi <b>Kirby, <i>Stereoelectronic Effects</i></b> (OCP 36) pour le principe général de recouvrement.'},
  quiz:{q:'Pourquoi dit-on que l\'énolate est le « vrai » nucléophile, et pas le composé carbonylé de départ&nbsp;?',
        a:'Parce que le composé de départ n\'a pas de doublet disponible en α : ses électrons sont dans des liaisons σ C–H et C–C. C\'est la déprotonation qui libère un doublet et le délocalise sur O et sur Cα. La forme limite portant la charge sur le carbone est celle qui réagit avec l\'électrophile — même si la densité électronique est majoritairement sur l\'oxygène.'}
});

S({
  grp:GC, title:'Énolate Z ou énolate E ?',
  consigne:'Appuie sur « énolate E » et regarde où apparaît la zone rouge.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='Z';
    const draw=()=>{fig.innerHTML=figEnolate(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['Z','Énolate Z (cis)'],['E','Énolate E (trans)']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Une seule géométrie d\'énolate se forme — la Z — parce que l\'autre obligerait le méthyle à venir se coller contre l\'oxazolidinone.',
  probleme:'<p>On vient de voir que l\'électrophile arrive perpendiculairement au plan. Mais « le dessus » de quel arrangement&nbsp;? Si on formait un mélange d\'énolates Z et E, on aurait deux arrangements différents, donc deux jeux de faces, donc un mélange de produits — quelle que soit la qualité de l\'auxiliaire.</p><p>La sélectivité de la géométrie d\'énolate est donc un <b>préalable</b>, pas un détail.</p>',
  etapes:[
   {q:'Qu\'est-ce qu\'on appelle Z ici ?',
    t:'On regarde la double liaison de l\'énolate. Sur un carbone : O⊖ et l\'azote de l\'oxazolidinone. Sur l\'autre : H et CH₃. <b>Z(O)</b> veut dire que O⊖ et CH₃ sont du même côté. Comme O⊖ et l\'azote sont forcément opposés, cela revient à dire que CH₃ est <b>loin</b> de l\'azote.'},
   {q:'Pourquoi la géométrie E est-elle interdite ?',
    t:'Dans l\'énolate E, CH₃ se retrouve du même côté que l\'azote, donc en relation 1,3 avec le gros cycle oxazolidinone. C\'est la <b>tension allylique A(1,3)</b> : deux groupes qui se percutent à travers une double liaison. C\'est la zone rouge du schéma.'},
   {q:'Où cette tension agit-elle exactement ?',
    t:'Dans l\'<b>état de transition de la déprotonation</b>, pas seulement dans le produit. Souviens‑toi de la section précédente : la conformation au moment de l\'arrachement fixe la géométrie. Une conformation qui mène à l\'énolate E est déjà coûteuse au départ, donc ce chemin est lent.'},
   {q:'Quel est le nom du modèle ?',
    t:'Le <b>modèle d\'Ireland</b> (1976) : un état de transition cyclique à six chaînons entre la base et le substrat, dans lequel la tension A(1,3) décide de la géométrie de l\'énolate. Avec une base encombrée comme LDA, l\'énolate Z est formé à plus de 99 : 1.'},
   {q:'Qu\'a-t-on gagné ?',
    t:'Un arrangement unique et reproductible. À partir de maintenant, « la face du dessus » veut enfin dire quelque chose.'}
  ],
  retenir:[
   'A(1,3) = tension entre deux groupes en relation 1,3 à travers une double liaison.',
   'Elle est d\'autant plus forte que les deux groupes sont gros : ici CH₃ contre un cycle entier.',
   'Base encombrée (LDA, NaHMDS) → énolate Z(O) exclusif. C\'est le modèle d\'Ireland.',
   'Un seul énolate = un seul jeu de faces = sélectivité possible.'
  ],
  plus:{titre:'Combien coûte une tension A(1,3) ?',
    body:'<p>Kirby donne l\'ordre de grandeur sur des alcènes simples : une interaction 1,3 entre un H et un alkyle primaire est faible — jusqu\'à 25 % du conformère défavorable subsiste à l\'équilibre. Mais une interaction 1,3 <b>entre deux groupes alkyles</b> est « beaucoup plus grande », au point qu\'un seul conformère existe en pratique.</p><p>Ici, ce n\'est pas un alkyle contre un alkyle : c\'est un méthyle contre une oxazolidinone acylée entière. D\'où un rapport supérieur à 99 : 1.</p><p>Attention à la notation : l\'énolate est noté <b>Z(O)</b> et non simplement Z, parce que les priorités CIP peuvent changer selon le substituant R et inverser la lettre sans que la géométrie change. Écrire Z(O) signifie « l\'oxygène et R sont cis », sans ambiguïté.</p>',
    src:'<b>Kirby, <i>Stereoelectronic Effects</i></b> (OCP 36), §6, fig. 6.11, p. 57. <b>Procter</b>, §4, p. 42–47.'},
  quiz:{q:'Dans l\'énolate Z, CH₃ et O⊖ sont du même côté. Pourquoi cela veut-il dire que CH₃ est <i>loin</i> de l\'oxazolidinone&nbsp;?',
        a:'Parce que sur le carbone de l\'énolate, O⊖ et l\'azote de l\'oxazolidinone sont les deux substituants : ils sont donc forcément de part et d\'autre de la double liaison. Si CH₃ est du côté de O⊖, il est mécaniquement du côté <b>opposé</b> à l\'azote — donc loin du cycle.'},
  flag:'⚠️ Tes notes écrivent « c\'est le model de Halland ». Le modèle qui prédit la géométrie de l\'énolate s\'appelle le <b>modèle d\'Ireland</b>. Il n\'existe pas de « modèle de Halland » en chimie des énolates.'
});
