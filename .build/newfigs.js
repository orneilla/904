
/* ==========================================================================
   Figures du groupe A — les bases
   ========================================================================== */

/* A1 : pourquoi une réaction ordinaire donne 50/50 */
function figMiroir(mode){
  const W=360,H=306,chiral=(mode==='chiral'); let s='';
  /* substrat prochiral : PhCHO */
  const Cc=[180,74], Oo=[180,36], Ph=[134,100], Hh=[222,100];
  s+=dbond(Cc,Oo,{e:10}); s+=lab(Oo,'O',{fs:14});
  s+=bond(Cc,Ph,{e:14}); s+=lab(Ph,'Ph',{fs:13,r:14});
  s+=bond(Cc,Hh,{e:9});  s+=lab(Hh,'H',{fs:13});
  s+=txt([180,14],'substrat PROCHIRAL : le C=O est plan',{fs:11.5,c:C.ink2});
  /* deux approches */
  const nu = chiral ? 'Nu*' : 'Nu';
  s+=arrow([74,58],[152,62],{c:C.green,w:2.4});
  s+=lab([58,52],nu,{fs:12.5,c:C.green,fw:700,r:16});
  s+=txt([96,44],'par l\'avant',{fs:10.5,c:C.green});
  s+=arrow([286,58],[208,62],{c:C.green,w:2.4,dash:'5 4'});
  s+=lab([304,52],nu,{fs:12.5,c:C.green,fw:700,r:16});
  s+=txt([262,44],'par l\'arrière',{fs:10.5,c:C.green});
  /* miroir */
  s+=seg([180,128],[180,246],{c:C.grey,dash:'6 5',w:1.6});
  s+=txt([180,262],'miroir',{fs:11,c:C.grey});
  /* produits */
  s+=stereoC([90,180],{l:'Ph',r:'OH',d:'Nu',dC:C.green,tag:'un énantiomère'});
  s+=stereoC([270,180],{l:'OH',r:'Ph',d:'Nu',dC:C.green,tag:'l\'autre'});
  /* verdict */
  if(!chiral){
    s+=`<rect x="18" y="272" width="324" height="28" rx="9" fill="none" stroke="${C.grey}" stroke-width="1.5"/>`;
    s+=txt([180,286],'le dessin entier a un plan de symétrie → 50 : 50',{fs:12,fw:700,c:C.grey});
  } else {
    s+=`<rect x="18" y="272" width="324" height="28" rx="9" fill="none" stroke="${C.blue}" stroke-width="1.8"/>`;
    s+=txt([180,286],'Nu* n\'a pas de miroir → symétrie cassée',{fs:12,fw:700,c:C.blue});
  }
  return svg(W,H,s,{alt:'attaque des deux faces'});
}

/* A2 : homotope / énantiotope / diastéréotope */
const TOPO={
  homo:{nom:'Homotopes', l:'Cl', r:'Cl', lC:null, box:false,
        verdict:'les deux produits sont LA MÊME molécule',
        vC:'grey', mol:'dichlorométhane  Cl–CH₂–Cl',
        why:'Les deux H occupent des places équivalentes : une rotation de 180° autour de l\'axe vertical échange l\'un avec l\'autre sans rien changer. Aucun réactif, même chiral, même une enzyme, ne peut les distinguer.'},
  enantio:{nom:'Énantiotopes', l:'CH₃', r:'OH', box:false,
        verdict:'les deux produits sont ÉNANTIOMÈRES',
        vC:'blue', mol:'éthanol  CH₃–CH₂–OH',
        why:'Les deux H sont échangés par un plan de symétrie, pas par une rotation. Un réactif achiral ne les distingue pas (50/50), mais un réactif CHIRAL, lui, les distingue — c\'est exactement ce que fait le complexe sec-BuLi·spartéine de Hoppe.'},
  diastereo:{nom:'Diastéréotopes', l:'C* (R)', r:'OH', box:true,
        verdict:'les deux produits sont DIASTÉRÉOISOMÈRES',
        vC:'green', mol:'un CH₂ voisin d\'un centre stéréogène',
        why:'Il y a déjà un centre stéréogène dans la molécule : plus aucune symétrie ne relie les deux H. Ils ont même des déplacements chimiques différents en RMN. Même un réactif achiral les distingue.'}
};
function figTopicite(kind){
  const W=360,H=300,T=TOPO[kind]; let s='';
  /* substrat */
  const Lp=[86,86], Cp=[150,110], Rp=[214,86];
  if(T.box){
    s+=`<rect x="34" y="68" width="76" height="34" rx="9" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
    s+=txt([72,85],'C* (R)',{fs:13,fw:700,c:C.blue});
    s+=bond([110,86],Cp,{e:3});
  } else {
    s+=bond(Lp,Cp,{s:16,e:3}); s+=lab(Lp,T.l,{fs:13,r:16});
  }
  s+=bond(Cp,Rp,{s:3,e:16}); s+=lab(Rp,T.r,{fs:13,r:16});
  s+=bond(Cp,[150,66],{e:10}); s+=lab([150,66],'Hₐ',{fs:13,c:C.red,fw:700,r:11});
  s+=bond(Cp,[150,154],{e:10}); s+=lab([150,154],'H_b'.replace('_b','ᵦ'),{fs:13,c:C.purple,fw:700,r:11});
  s+=txt([180,26],T.mol,{fs:12.5,fw:700});
  s+=txt([180,44],'on remplace UN des deux H par Br',{fs:11.5,c:C.ink2});
  /* flèches */
  s+=arrow([120,170],[86,196],{c:C.red,w:2.2});
  s+=txt([66,176],'Hₐ → Br',{fs:11,c:C.red,fw:700});
  s+=arrow([200,170],[256,196],{c:C.purple,w:2.2});
  s+=txt([286,176],'Hᵦ → Br',{fs:11,c:C.purple,fw:700});
  /* produits */
  const lbl = T.box ? '' : T.l;
  s+=stereoC([80,238],{l:lbl,r:T.r,d:'Br',dC:C.ink,lr:16,rr:16});
  s+=stereoC([264,238],{l:lbl,r:T.r,d:'Br',dC:C.ink,hash:true,lr:16,rr:16});
  if(T.box){
    s+=`<rect x="14" y="206" width="54" height="26" rx="8" fill="none" stroke="${C.blue}" stroke-width="1.6"/>`;
    s+=txt([41,219],'C*(R)',{fs:10.5,fw:700,c:C.blue});
    s+=`<rect x="198" y="206" width="54" height="26" rx="8" fill="none" stroke="${C.blue}" stroke-width="1.6"/>`;
    s+=txt([225,219],'C*(R)',{fs:10.5,fw:700,c:C.blue});
  }
  const col = T.vC==='grey'?C.grey:(T.vC==='blue'?C.blue:C.green);
  if(kind==='homo') s+=txt([180,276],'(les deux Cl sont identiques : pas de centre stéréogène)',{fs:10.5,c:C.ink2});
  s+=txt([180,292],T.verdict,{fs:12.5,fw:700,c:col});
  return svg(W,H,s,{alt:'topicité : '+T.nom});
}

/* A3 : faces Re et Si */
function figReSi(face){
  const W=360,H=302,re=(face==='Re'); let s='';
  const cx=180,cy=146,R=66;
  s+=`<circle cx="${cx}" cy="${cy}" r="112" fill="var(--panel2)" stroke="${C.line}" stroke-dasharray="6 5"/>`;
  /* a = O (en haut) ; b = CH3 ; c = H — b et c permutés selon la face regardée */
  const pa=polar(cx,cy,R,0);
  const pb=polar(cx,cy,R,re?120:240);
  const pc=polar(cx,cy,R,re?240:120);
  s+=dbond([cx,cy],pa,{s:13,e:16});
  s+=bond([cx,cy],pb,{s:13,e:re?19:14});
  s+=bond([cx,cy],pc,{s:13,e:re?14:19});
  s+=lab([cx,cy],'C',{fs:15,fw:700,r:12});
  s+=lab(pa,'O',{fs:15,fw:700,r:15,c:C.red});
  s+=lab(pb,'CH₃',{fs:12.5,fw:700,r:19});
  s+=lab(pc,'H',{fs:14,fw:700,r:13});
  const ma=polar(cx,cy,R+22,0), mb=polar(cx,cy,R+24,re?120:240), mc=polar(cx,cy,R+22,re?240:120);
  s+=txt(ma,'a',{fs:13,fw:800,c:C.blue});
  s+=txt(mb,'b',{fs:13,fw:800,c:C.blue});
  s+=txt(mc,'c',{fs:13,fw:800,c:C.blue});
  /* arc de rotation a -> b -> c */
  const rr=100;
  const A=polar(cx,cy,rr,re?20:-20), B=polar(cx,cy,rr,re?220:-220);
  s+=`<path d="M${E(A[0])},${E(A[1])} A${rr},${rr} 0 1 ${re?1:0} ${E(B[0])},${E(B[1])}" fill="none" stroke="${C.blue}" stroke-width="3" opacity=".85" marker-end="url(#mkBlue)"/>`;
  s+=txt([180,20],re?'tu regardes la face Re':'tu regardes la face Si',{fs:14.5,fw:800,c:C.blue});
  s+=txtLines([180,270],
    re?['a → b → c dans le SENS DES AIGUILLES','d\'une montre  →  face Re']
      :['a → b → c dans le SENS INVERSE','des aiguilles  →  face Si'],
    {fs:12,fw:700,lh:16});
  s+=txt([180,40],'a = O  >  b = CH₃  >  c = H   (priorités CIP)',{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'face '+face});
}

/* A4 : ce que veut dire un e.e., en 100 molécules */
function figCentMolecules(ee){
  const W=360,H=218; let s='';
  const maj=Math.round((100+ee)/2), min=100-maj;
  const r=7, gapx=23, gapy=14.5, x0=76, y0=48;
  for(let i=0;i<100;i++){
    const col=i%10, row=(i/10)|0;
    const cx=x0+col*gapx, cy=y0+row*gapy;
    const isMaj = i<maj;
    s+=`<circle cx="${E(cx)}" cy="${E(cy)}" r="${r}" fill="${isMaj?C.blue:'var(--panel2)'}" stroke="${isMaj?C.blue:C.grey}" stroke-width="1.5"/>`;
  }
  s+=txtLines([180,12],['100 molécules de produit :',
    maj+' d\'un énantiomère, '+min+' de l\'autre'],{fs:12,fw:700,lh:15});
  s+=txt([180,H-14],`e.r. = ${maj} : ${min}   •   e.e. = ${ee.toFixed(1).replace('.',',')} %`,{fs:13,fw:700,c:C.blue});
  return svg(W,H,s,{alt:'100 molécules'});
}

/* Cahier des charges d'un bon auxiliaire (Procter, tableau 2.1) */
const CAHIER=[
  ['Énantiomériquement pur','Sinon tu fabriques les deux produits en même temps : la sélectivité de la réaction ne sert plus à rien.'],
  ['Pas cher, disponible en quantité','On en met un équivalent entier, et on le jette (ou on le recycle) à la fin. Les acides aminés et les sucres sont parfaits : la nature les fait déjà énantiopurs.'],
  ['Facile à accrocher sur le substrat','Ici : une simple acylation de l\'azote de l\'oxazolidinone.'],
  ['Sélectivité forte ET prévisible','« Prévisible » compte autant que « forte » : il faut pouvoir décider à l\'avance quel énantiomère on veut.'],
  ['Diastéréoisomère majoritaire facile à purifier','C\'est l\'avantage décisif de la voie auxiliaire : on peut remonter le d.r. par chromatographie.'],
  ['Clivage sans perte de pureté','Le clivage ne doit pas toucher au centre créé, sinon on perd tout à la dernière étape.'],
  ['Auxiliaire récupérable','Pour l\'économie d\'atomes, et parce qu\'il est souvent le réactif le plus cher du schéma.']
];
