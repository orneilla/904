/* ==========================================================================
   Section 0 — Vue d'ensemble des trois stratégies
   ========================================================================== */
const STRAT={
  aux:{
    nom:'Auxiliaire chiral', couleur:'blue',
    agent:'stœchiométrique (1 équiv, souvent plus)',
    etapes:'3 étapes : fixation de A*, réaction, clivage de A*',
    relation:'P–A* = <b>2 diastéréoisomères</b> (le nouveau C* + celui de A*)',
    sep:'oui — colonne de silice, recristallisation',
    ctrl:'diastéréosélective, contrôle par le <b>substrat</b>',
    plus:'sélectivité généralement excellente, et on peut purifier avant le clivage',
    moins:'3 étapes, économie d\'atomes médiocre, il faut les 2 énantiomères de A*'
  },
  reac:{
    nom:'Réactif chiral', couleur:'green',
    agent:'stœchiométrique (1 à 1,5 équiv)',
    etapes:'1 étape',
    relation:'P* = <b>2 énantiomères</b> (un seul C* créé)',
    sep:'non — mêmes propriétés physiques en milieu achiral',
    ctrl:'énantiosélective, contrôle par le <b>réactif</b>',
    plus:'une seule étape, plus verte que la voie auxiliaire',
    moins:'réactif chiral consommé en quantité stœchiométrique, souvent à préparer'
  },
  cata:{
    nom:'Catalyseur chiral', couleur:'purple',
    agent:'catalytique (1 à 10 mol %)',
    etapes:'1 étape',
    relation:'P* = <b>2 énantiomères</b> (un seul C* créé)',
    sep:'non — mêmes propriétés physiques en milieu achiral',
    ctrl:'énantiosélective, contrôle par le <b>catalyseur</b>',
    plus:'la plus élégante et la plus verte : la catalyse est un des 12 principes',
    moins:'catalyseur très spécifique, cher, long à identifier'
  }
};
function figStrategie(kind){
  const W=360,H=(kind==='aux')?190:120; let s='';
  const box=(p,t,c)=> lab(p,t,{fs:18,fw:700,r:0,nobg:true,c:c||C.ink});
  if(kind==='aux'){
    const Sp=[54,34], Pp=[300,34], SA=[54,148], PA=[300,148];
    s+=`<rect x="24" y="10" width="312" height="156" rx="14" fill="var(--panel2)" stroke="${C.line}"/>`;
    s+=box(Sp,'S'); s+=box(Pp,'P*');
    s+=box(SA,'S–A*',C.blue); s+=box(PA,'P–A*',C.blue);
    s+=arrow([76,34],[276,34],{dash:'6 5',c:C.ink2,w:2});
    s+=txt([176,20],'ce qu\'on veut vraiment',{fs:11,c:C.ink2});
    s+=arrow([54,50],[54,130],{c:C.blue});
    s+=txt([64,74],'A* est fixé',{fs:11,anchor:'start',c:C.blue});
    s+=txt([64,88],'sur S',{fs:11,anchor:'start',c:C.blue});
    s+=arrow([96,148],[268,148],{c:C.ink});
    s+=txt([182,134],'réactif ACHIRAL',{fs:11,c:C.ink2});
    s+=arrow([300,130],[300,50],{c:C.blue});
    s+=txt([292,74],'A* est',{fs:11,anchor:'end',c:C.blue});
    s+=txt([292,88],'enlevé',{fs:11,anchor:'end',c:C.blue});
    s+=txt([180,180],'réaction DIASTÉRÉOsélective',{fs:12.5,fw:700});
  } else {
    const c = kind==='reac'?C.green:C.purple;
    s+=`<rect x="70" y="18" width="222" height="52" rx="14" fill="var(--panel2)" stroke="${C.line}"/>`;
    s+=box([96,44],'S'); s+=box([264,44],'P*');
    s+=arrow([118,44],[240,44],{c:c,w:2.4});
    s+=txt([179,30],kind==='reac'?'réactif chiral*':'catalyseur chiral*',{fs:12,fw:700,c:c});
    s+=txt([179,82],kind==='reac'?'1 à 1,5 équiv — consommé':'1 à 10 mol % — régénéré',{fs:11.5,c:C.ink2});
    s+=txt([180,106],'réaction ÉNANTIOsélective',{fs:12.5,fw:700});
  }
  return svg(W,H,s,{alt:'schéma de la stratégie '+kind});
}
/* ---- Section 0b : diastéréoisomères vs énantiomères ---- */
function figRelation(kind){
  const W=360; let s='';
  if(kind==='aux'){
    const H=296;
    s+=txt([180,16],'P–A*  :  DEUX centres stéréogènes',{fs:13,fw:700});
    [[64,'(R)','majoritaire',true],[178,'(S)','minoritaire',false]].forEach(rw=>{
      const y=rw[0];
      s+=`<rect x="22" y="${y-35}" width="100" height="38" rx="10" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
      s+=txt([72,y-25],'auxiliaire',{fs:11,c:C.blue});
      s+=txt([72,y-10],'C* = (S)',{fs:13,fw:700,c:C.blue});
      s+=bond([122,y-16],[180,y-16],{});
      s+=stereoC([214,y],{l:'',r:'CH₃',d:'CH₂Ph',dC:C.green,hash:rw[3],
                          tag:'nouveau C* = '+rw[1]+'  ('+rw[2]+')'});
    });
    s+=txt([180,266],'même C* auxiliaire, C* nouveau différent',{fs:12.5,c:C.ink2});
    s+=txt([180,286],'⇒ DIASTÉRÉOISOMÈRES : séparables sur silice',{fs:12.5,fw:700,c:C.green});
    return svg(W,H,s,{alt:'deux diastéréoisomères'});
  }
  const H=234;
  s+=txt([180,16],'P*  :  UN seul centre stéréogène',{fs:13,fw:700});
  s+=seg([180,36],[180,172],{c:C.grey,dash:'6 5',w:1.6});
  s+=txt([180,190],'miroir',{fs:11,c:C.grey});
  s+=stereoC([90,84],{l:'HO₂C',r:'CH₃',d:'CH₂Ph',dC:C.green,tag:'(S)',lr:19});
  s+=stereoC([270,84],{l:'CH₃',r:'CO₂H',d:'CH₂Ph',dC:C.green,tag:'(R)',rr:19});
  s+=txt([180,216],'⇒ ÉNANTIOMÈRES : inséparables en milieu achiral',{fs:12.5,fw:700,c:C.red});
  return svg(W,H,s,{alt:'deux énantiomères'});
}
/* ==========================================================================
   Section 1 — Auxiliaire d'Evans
   ========================================================================== */
/* 1a. Énolate Z vs E */
function figEnolate(geo){
  const W=360,H=226; let s='';
  const P=[68,112];
  const N=oxN(P);                    /* (105,112) */
  const Ce=[141,96], Cb=[183,96];
  const Ox=[141,68], Me=[215,78], Hb=[215,114];
  if(geo==='E'){
    s+=stericZone(162,124,64,19,{rot:-4});
    s+=txt([248,156],'tension A(1,3)',{fs:12,fw:700,c:C.red});
    s+=seg([226,148],[214,130],{c:C.red,w:1.4,dash:'3 3'});
  }
  s+=oxaz(P,{aux:'ipr',wedge:true,co:'up'});
  s+=bond(N,Ce,{s:9,c:C.blue});
  s+=dbondIn(Ce,Cb,1,{});
  s+=bond(Ce,Ox,{e:10});
  s+=lab(Ox,'O',{fs:13.5});
  s+=txt([128,58],'⊖',{fs:11,c:C.ink2});
  s+=seg([151,62],[167,52],{c:C.purple,dash:'3 3',w:2});
  s+=lab([178,46],'Li',{fs:12.5,c:C.purple,r:11,fw:700});
  s+=txt([194,36],'⊕',{fs:10,c:C.purple});
  if(geo==='Z'){
    s+=bond(Cb,Me,{e:14}); s+=lab(Me,'CH₃',{fs:12.5,r:15});
    s+=bond(Cb,Hb,{e:9});  s+=lab(Hb,'H',{fs:12.5});
  } else {
    s+=bond(Cb,[215,78],{e:9});  s+=lab([215,78],'H',{fs:12.5});
    s+=bond(Cb,[215,116],{e:14}); s+=lab([215,116],'CH₃',{fs:12.5,r:15});
  }
  const cap = geo==='Z'
    ? ['Z(O) : O⊖ et CH₃ du même côté','⇒ CH₃ loin de l\'oxazolidinone','c\'est le seul énolate formé (modèle d\'Ireland)']
    : ['E(O) : CH₃ du même côté que l\'azote','⇒ il percute le cycle : tension A(1,3)','géométrie évitée — jamais observée ici'];
  s+=txtLines([180,182],cap.slice(0,2),{fs:12.5,fw:700,c:geo==='Z'?C.green:C.red,lh:16});
  s+=txt([180,216],cap[2],{fs:11.5,c:C.ink2});
  return svg(W,H,s,{alt:'énolate '+geo});
}
const AUXDEF={
  ipr:{nom:'Valinol', sub:'iPr', groupes:'iPr (C4)', dir:-1, face:'du dessous', bloq:'du dessus',
       cfg:'(S)-4-isopropyl-oxazolidin-2-one', alpha:'(R)'},
  nor:{nom:'Noréphédrine', sub:'Me / Ph', groupes:'Me (C4) et Ph (C5)', dir:1, face:'du dessus', bloq:'du dessous',
       cfg:'(4R,5S)-4-méthyl-5-phényl-oxazolidin-2-one', alpha:'(S)'}
};
function figProfil(auxKey,opt){
  opt=opt||{}; const A=AUXDEF[auxKey], up=(A.dir===-1); const W=360,H=236; let s='';
  const py=128;                                   /* la tranche du plan */
  /* demi-espace bloqué */
  const by = up ? py-76 : py+10;
  s+=`<rect x="24" y="${by}" width="312" height="66" rx="16" fill="var(--greyface)" stroke="${C.grey}" stroke-width="1.2" stroke-dasharray="6 5"/>`;
  s+=txt([238,by+(up?16:48)],'face '+A.bloq+' : BLOQUÉE',{fs:12,fw:700,c:C.grey});
  /* barre = plan de l'énolate vu par la tranche */
  s+=`<rect x="26" y="${py-9}" width="308" height="18" rx="9" fill="var(--panel2)" stroke="${C.line}"/>`;
  s+=`<rect x="40" y="${py-15}" width="86" height="30" rx="9" fill="var(--panel)" stroke="${C.blue}" stroke-width="2"/>`;
  s+=txt([83,py-4],'oxazolidinone',{fs:9.5,c:C.blue,fw:700});
  s+=txt([83,py+7],'(cycle, à plat)',{fs:9,c:C.blue});
  const Oa=[152,py], Li=[190,py], Ob=[228,py], Ca=[272,py], Me=[312,py];
  s+=bond([126,py],Oa,{e:9,c:C.blue});
  s+=seg([161,py],[181,py],{c:C.purple,dash:'4 3',w:2.4});
  s+=seg([199,py],[219,py],{c:C.purple,dash:'4 3',w:2.4});
  s+=bond(Ob,Ca,{s:9,e:13}); s+=bond(Ca,Me,{s:13,e:14});
  s+=lab(Oa,'O',{fs:13}); s+=lab(Ob,'O',{fs:13});
  s+=lab(Li,'Li',{fs:12.5,c:C.purple,r:11,fw:700});
  s+=lab(Ca,'Cα',{fs:12.5,r:13}); s+=lab(Me,'CH₃',{fs:12,r:15});
  /* substituant directeur, hors du plan, dans le demi-espace bloqué */
  const sy = py + A.dir*42;
  s+=stericZone(83,sy,38,20,{});
  s+= up ? wedge([83,py-15],[83,sy+15],{c:C.blue,wide:5.5}) : wedge([83,py+15],[83,sy-15],{c:C.blue,wide:5.5});
  s+=lab([83,sy],A.sub,{fs:13,c:C.blue,r:16,fw:700});
  /* flèche d'attaque, côté libre */
  s+=arrow([Ca[0],py-A.dir*66],[Ca[0],py-A.dir*20],{c:C.green,w:2.8});
  s+=txt([180, py - A.dir*86],'E⊕ arrive par la face '+A.face+' : LIBRE',{fs:12.5,fw:700,c:C.green});
  s+=txt([180,H-8],'vue « par la tranche » : tout le chélate est dans le plan',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'chélate vu de profil, auxiliaire '+A.nom});
}
const EV={P:[56,86],N:[93,86],Cac:[127,70],Oac:[129,40],Ca:[161,86],Me:[195,70],Hc:[161,118],
          C2Oc:[80,65],Li:[99,33]};
function evansStep(k){
  const W=360,H=240; let s='';
  const {P,N,Cac,Oac,Ca,Me,Hc,C2Oc,Li}=EV;
  const chel=(k===2||k===3);
  s+=oxaz(P,{aux:'ipr',wedge:true,co:chel?'upright':'up'});
  s+=bond(N,Cac,{s:9,c:C.blue});
  if(k===0||k===4){                                  /* C=O de l'imide */
    s+=dbond(Cac,Oac,{e:9}); s+=lab(Oac,'O',{fs:13});
    s+=bond(Cac,Ca,{});
  }else{                                             /* énolate */
    s+=bond(Cac,Oac,{e:9}); s+=lab(Oac,'O',{fs:13}); s+=txt([143,29],'⊖',{fs:11,c:C.ink2});
    s+=dbondIn(Cac,Ca,1,{});
  }
  s+=bond(Ca,Me,{e:13}); s+=lab(Me,'CH₃',{fs:12,r:14});
  if(k===0){ s+=bond(Ca,Hc,{e:9}); s+=lab(Hc,'H',{fs:13}); }
  if(chel){
    s+=bond(C2Oc,Li,{s:10,e:11,c:C.purple,dash:'4 3',w:2.3});
    s+=bond(Li,Oac,{s:11,e:10,c:C.purple,dash:'4 3',w:2.3});
    s+=lab(Li,'Li',{fs:12,c:C.purple,r:10,fw:700});
  } else if(k===1){ s+=lab([166,34],'Li',{fs:12,c:C.purple,r:10,fw:700}); s+=txt([183,26],'⊕',{fs:10,c:C.purple}); }
  /* --- étapes --- */
  if(k===0){
    s+=txt([268,150],'LDA',{fs:14,fw:700});
    s+=txt([268,167],'(base encombrée)',{fs:11,c:C.ink2});
    s+=curve([236,140],[174,124],18,{c:C.ink});
    s+=curve([158,106],[146,81],-13,{c:C.ink});
  }
  if(k===2){ s+=txt([180,H-38],'rotation autour de N–C : les deux O se tournent vers Li',{fs:11.5,c:C.purple}); }
  if(k===3){
    const Ee=[212,150], Xx=[254,168];
    s+=lab(Ee,'E',{fs:14,c:C.green,fw:700,r:11});
    s+=lab(Xx,'X',{fs:13,c:C.ink,r:10});
    s+=seg([222,155],[244,164],{c:C.ink,dash:'4 3',w:2.2});
    s+=curve([150,96],[204,142],26,{c:C.green});
    s+=curve([230,158],[266,178],-16,{c:C.ink});
    s+=txt([180,H-38],'E–X attaque par la face libre ; la liaison E–X se rompt',{fs:11.5,c:C.green});
  }
  if(k===4){
    s+=hashb(Ca,[161,122],{e:11,c:C.green});
    s+=lab([161,122],'E',{fs:14,c:C.green,fw:700});
    s+=txt([180,H-38],'E en pointillés : arrivé par l\'arrière (l\'iPr est en avant)',{fs:11.5,c:C.green});
  }
  const cap=['1. Déprotonation par LDA','2. Énolate Z + Li⁺','3. Chélate à 6 chaînons','4. Attaque de E–X','5. Produit : diastéréoisomère majoritaire'][k];
  s+=txt([180,H-14],cap,{fs:13.5,fw:700});
  return svg(W,H,s,{alt:cap});
}
/* 1d. Valinol vs noréphédrine : le produit dessiné */
function figProduit(auxKey,Etxt){
  const W=360,H=196; let s=''; const up=(auxKey==='ipr');
  const P=[80,70], N=oxN(P);
  const Cac=[151,54], Oac=[151,26], Ca=[185,70], Me=[219,54], Ee=[185,106];
  s+=oxaz(P,{aux:up?'ipr':'noreph',wedge:up,co:'up'});
  s+=bond(N,Cac,{s:9,c:C.blue});
  s+=dbond(Cac,Oac,{e:9}); s+=lab(Oac,'O',{fs:13});
  s+=bond(Cac,Ca,{}); s+=bond(Ca,Me,{e:13}); s+=lab(Me,'CH₃',{fs:12,r:14});
  s+= up ? hashb(Ca,Ee,{e:11,c:C.green}) : wedge(Ca,Ee,{e:11,c:C.green});
  s+=lab(Ee,Etxt||'E',{fs:14,c:C.green,fw:700,r:12});
  s+=txt([255,96],up?'E en pointillés':'E en gras',{fs:12,fw:700,c:C.green});
  s+=txt([255,112],up?'(arrière)':'(avant)',{fs:11,c:C.ink2});
  s+=txt([180,H-38],up?'auxiliaire du valinol : C4 = (S)':'auxiliaire de la noréphédrine : (4R,5S)',{fs:12,c:C.blue,fw:600});
  s+=txt([180,H-18],up?'⇒ Cα = (R)':'⇒ Cα = (S)',{fs:14,fw:700});
  return svg(W,H,s,{alt:'produit majoritaire'});
}
/* 1e. Tableau interactif des électrophiles */
const ELECTRO=[
  {e:'PhCH₂–Br', nom:'bromure de benzyle', dr:'99 : 1', drn:99, rdt:'92 %',
   why:'Halogénure <b>benzylique</b> : la charge positive naissante est stabilisée par le cycle aromatique, donc l\'état de transition SN2 est bas en énergie. C\'est l\'électrophile le plus réactif des trois, et le plus volumineux — un gros groupe entrant discrimine mieux les deux faces.'},
  {e:'CH₂=CH–CH₂–Br', nom:'bromure d\'allyle', dr:'98 : 2', drn:98, rdt:'74 %',
   why:'Halogénure <b>allylique</b> : même effet de stabilisation par la double liaison voisine, à peine moins efficace que le benzyle. Réactivité et sélectivité restent très bonnes.'},
  {e:'Et–I', nom:'iodoéthane', dr:'94 : 6', drn:94, rdt:'36 %',
   why:'Halogénure <b>primaire simple</b> : aucune stabilisation de l\'état de transition, donc bien moins réactif. Il faut chauffer ou attendre, l\'énolate a le temps de se dégrader, d\'où le rendement de 36 %. Plus petit, il distingue aussi moins bien les deux faces.'}
];
/* 1f. Roue des clivages */
const CLIV=[
  {k:'red', reac:'LiAlH₄ ou LiBH₄', court:['LiAlH₄','LiBH₄'], head:'HO–CH₂', prod:'alcool primaire',
   why:'Un hydrure dur attaque le carbonyle exocyclique, le plus électrophile des deux, et réduit jusqu\'à l\'alcool. LiBH₄ est plus doux et plus sélectif que LiAlH₄.'},
  {k:'ooh', reac:'LiOOH (H₂O₂ + LiOH)', court:'LiOOH', head:'HO₂C', prod:'acide carboxylique',
   why:'L\'ion hydroperoxyde HOO⊖ est un nucléophile « α » très réactif mais peu basique : il attaque le carbonyle exocyclique et pas celui du cycle. Avec LiOH seul, on ouvrirait aussi l\'oxazolidinone.'},
  {k:'alk', reac:'alcoolate (MeO⊖, BnO⊖)', court:'alcoolate', head:'MeO₂C', prod:'ester',
   why:'Transestérification directe : l\'alcoolate additionne sur le carbonyle exocyclique et l\'azote de l\'oxazolidinone part comme bon nucléofuge (amide stabilisé).'},
  {k:'dib', reac:'DIBAL-H, –78 °C', court:'DIBAL', head:'OHC', prod:'aldéhyde',
   why:'Un seul équivalent d\'hydrure encombré, à basse température, doit s\'arrêter à l\'aldéhyde. En pratique c\'est délicat : la sur‑réduction en alcool est fréquente (voir A_VERIFIER.md).'},
  {k:'wei', reac:'MeNH(OMe)·HCl, AlMe₃', court:'Weinreb', head:'MeO(Me)N–OC', prod:'amide de Weinreb → cétone',
   why:'On échange l\'auxiliaire contre un amide de Weinreb, stable, qui donne ensuite proprement l\'aldéhyde (LiAlH₄) ou une cétone (R\'MgX) sans sur‑addition : le chélate à 5 chaînons bloque l\'intermédiaire tétraédrique.'}
];
function polar(cx,cy,r,adeg){const a=(adeg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function sectorPath(cx,cy,r0,r1,a0,a1){
  const p1=polar(cx,cy,r1,a0),p2=polar(cx,cy,r1,a1),p3=polar(cx,cy,r0,a1),p4=polar(cx,cy,r0,a0);
  const big=(a1-a0)>180?1:0;
  return `M${E(p1[0])},${E(p1[1])} A${r1},${r1} 0 ${big} 1 ${E(p2[0])},${E(p2[1])} L${E(p3[0])},${E(p3[1])} A${r0},${r0} 0 ${big} 0 ${E(p4[0])},${E(p4[1])} Z`;
}
function figRoue(sel){
  const W=360,H=330,cx=180,cy=156; let s='';
  CLIV.forEach((c,i)=>{
    const a0=i*72-90+2, a1=(i+1)*72-90-2, on=(c.k===sel);
    s+=`<path d="${sectorPath(cx,cy,64,148,a0,a1)}" fill="${on?C.blue:'var(--panel2)'}" stroke="${C.line}" stroke-width="1.5" data-k="${c.k}" style="cursor:pointer"/>`;
    const m=polar(cx,cy,106,(a0+a1)/2);
    const lines=Array.isArray(c.court)?c.court:[c.court];
    lines.forEach((L,j)=>{
      const yy=m[1]+(j-(lines.length-1)/2)*15;
      s+=`<text x="${E(m[0])}" y="${E(yy)}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="700" fill="${on?'#fff':C.ink}" font-family="system-ui,sans-serif" pointer-events="none">${L}</text>`;
    });
  });
  s+=`<circle cx="${cx}" cy="${cy}" r="62" fill="var(--panel)" stroke="${C.line}" stroke-width="1.5"/>`;
  const cur=CLIV.find(c=>c.k===sel);
  s+=txt([cx,cy-24],'on obtient',{fs:11,c:C.ink2});
  const words=cur.prod.split(' ');
  let line=[],lines=[];
  words.forEach(w=>{ if((line.join(' ')+' '+w).length>13){lines.push(line.join(' '));line=[w];} else line.push(w); });
  lines.push(line.join(' '));
  lines.forEach((L,i)=> s+=txt([cx,cy-2+i*17],L,{fs:14,fw:700,c:C.green}));
  s+=txt([cx,H-10],'touche un secteur',{fs:11.5,c:C.ink2});
  return svg(W,H,s,{alt:'roue des clivages'});
}
function headBox(p,t){
  const w=Math.max(46,t.length*7.6+12);
  return `<rect x="${E(p[0]-w/2)}" y="${E(p[1]-13)}" width="${E(w)}" height="26" rx="8" fill="var(--panel)"/>`
   + txt(p,t,{fs:13,fw:700});
}
function figCleavProd(sel){
  const W=360,H=176; let s=''; const cur=CLIV.find(c=>c.k===sel);
  const Hd=[68,60], Ca=[122,84], Me=[172,60], Ee=[122,120];
  s+=bond(Hd,Ca,{s:Math.max(24,cur.head.length*3.9+8),e:3});
  s+=headBox(Hd,cur.head);
  s+=bond(Ca,Me,{e:15}); s+=lab(Me,'CH₃',{fs:12.5,r:15});
  s+=hashb(Ca,Ee,{e:11,c:C.green}); s+=lab(Ee,'E',{fs:14,c:C.green,fw:700});
  s+=txtLines([118,150],['produit chiral,','configuration conservée'],{fs:11,c:C.ink2,lh:14});
  s+=txt([206,84],'+',{fs:20,fw:700,c:C.ink2});
  const P=[232,48];
  s+=oxaz(P,{aux:'ipr',wedge:true,co:'up'});
  const N=oxN(P);
  s+=bond(N,[296,38],{s:9,e:8,c:C.blue}); s+=lab([296,38],'H',{fs:12,c:C.blue,r:9});
  s+=txtLines([272,150],['auxiliaire','récupéré (N–H)'],{fs:11,c:C.blue,fw:700,lh:14});
  return svg(W,H,s,{alt:'produit du clivage'});
}

/* ==========================================================================
   Section 5 — Contrôle cinétique : le diagramme d'énergie
   ========================================================================== */
const Rgas=8.314;                       /* J·mol⁻¹·K⁻¹ */
function erFromDdG(ddG_kJ,T_K){ return Math.exp((ddG_kJ*1000)/(Rgas*T_K)); }
function figEnergie(ddG,T_K){
  const W=360,H=266; let s='';
  const G1=50, G2=50+ddG, GP=-30;
  const yE=(x)=>180-(x+30)*1.6;
  const yA=yE(0), yT1=yE(G1), yT2=yE(G2), yP=yE(GP);
  /* axes */
  s+=arrow([34,210],[34,24],{c:C.ink2,w:1.8});
  s+=arrow([26,206],[344,206],{c:C.ink2,w:1.8});
  s+=txt([40,22],'ΔG',{fs:12,anchor:'start',c:C.ink2});
  s+=txt([338,222],'coordonnée de réaction',{fs:10.5,anchor:'end',c:C.ink2});
  /* niveau des produits : identique des deux côtés */
  s+=seg([40,yP],[344,yP],{c:C.grey,dash:'5 4',w:1.3});
  /* niveaux des deux états de transition */
  s+=seg([100,yT1],[196,yT1],{c:C.ink2,dash:'5 4',w:1.3});
  s+=seg([182,yT2],[256,yT2],{c:C.ink2,dash:'5 4',w:1.3});
  /* profil énergétique */
  const d=`M44,${E(yP)} C68,${E(yP)} 88,${E(yT1)} 112,${E(yT1)} C136,${E(yT1)} 158,${E(yA)} 180,${E(yA)}`
        + ` C202,${E(yA)} 224,${E(yT2)} 248,${E(yT2)} C272,${E(yT2)} 292,${E(yP)} 316,${E(yP)}`;
  s+=`<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="2.8" stroke-linecap="round"/>`;
  /* ΔΔG‡ */
  if(ddG>0.05){
    s+=`<rect x="176" y="${E(yT2)}" width="28" height="${E(Math.max(2.5,yT1-yT2))}" fill="${C.blue}" opacity=".85" rx="1"/>`;
    s+=txt([170,(yT1+yT2)/2],'ΔΔG‡',{fs:12.5,fw:700,anchor:'end',c:C.blue});
  } else {
    s+=txt([180,yT1-26],'ΔΔG‡ = 0 → racémique',{fs:12.5,fw:700,c:C.red});
  }
  s+=txt([112,yT1-14],'ET₁',{fs:12.5,fw:700});
  s+=txt([252,yT2-14],'ET₂',{fs:12.5,fw:700});
  s+=txt([180,yA+17],'A (substrat)',{fs:12,fw:700});
  s+=txt([80,yP-16],'P majoritaire',{fs:11.5,fw:700,c:C.green});
  s+=txt([284,yP-16],'P minoritaire',{fs:11.5,fw:700,c:C.ink2});
  s+=txtLines([180,240],
     ['ET₁ et ET₂ sont diastéréoisomères ⇒ ΔΔG‡ ≠ 0','P maj. et P min. sont énantiomères ⇒ même énergie'],
     {fs:11.5,c:C.ink2,lh:15});
  return svg(W,H,s,{alt:'diagramme énergétique'});
}