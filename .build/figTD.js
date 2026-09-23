
/* ==========================================================================
   FIGURES — TD de révision CH0904
   Toutes les coordonnées sont calculées ; repère SVG (y vers le BAS).
   ========================================================================== */

/* --- briques : cycles ----------------------------------------------------- */
function ring6(cx,cy,r,rot,dbl,o){
  o=o||{}; const v=[]; for(let i=0;i<6;i++) v.push(polar(cx,cy,r,rot+60*i));
  let s='';
  for(let i=0;i<6;i++){
    const a=v[i], b=v[(i+1)%6];
    s += (dbl&&dbl.indexOf(i)>=0) ? dbondIn(a,b,1,{c:o.c||C.ink}) : bond(a,b,{c:o.c||C.ink});
  }
  return {v:v, s:s};
}
/* naphtalène : cycle A centré en (cx,cy), cycle B soudé sur l'arête gauche */
function naph(cx,cy,r,o){
  o=o||{};
  const A=ring6(cx,cy,r,0,[0,2,4],o);
  const B=ring6(cx-1.7320508*r,cy,r,0,[3,5],o);
  return {v:A.v, s:B.s+A.s};
}

/* --- Exercice 1 : les quatre molécules ------------------------------------ */
const EX1 = [
 {nom:'(Z)-hex-3-ène', verdict:'faces HOMOTOPES', vc:'green',
  sous:'une rotation de 180° échange les deux faces'},
 {nom:'(E)-PhCH=CH–CH(OMe)CH₃', verdict:'faces DIASTÉRÉOTOPES', vc:'red',
  sous:'la molécule porte déjà un centre (R)'},
 {nom:'éther d\'énol silylé', verdict:'faces ÉNANTIOTOPES', vc:'blue',
  sous:'seul un miroir les échange → alcène prochiral'},
 {nom:'4-aminobutan-2-one', verdict:'faces ÉNANTIOTOPES', vc:'blue',
  sous:'seul un miroir les échange → cétone prochirale'}
];
function figFaces(k){
  const W=360,H=268; let s='';
  s+=txt([180,22],EX1[k].nom,{fs:13.5,fw:800});
  if(k===0){
    const a=[74,190],b=[104,172],c=[134,144],d=[186,144],e=[216,172],f=[246,190];
    s+=bond(a,b); s+=bond(b,c); s+=dbondIn(c,d,1,{}); s+=bond(d,e); s+=bond(e,f);
    /* axe C2 : dans le plan de la feuille, perpendiculaire à C=C */
    s+=seg([160,100],[160,218],{c:C.purple,dash:'6 5',w:1.6});
    s+=txt([160,88],'axe C₂',{fs:12,fw:700,c:C.purple});
    s+=curve([132,110],[188,110],-16,{c:C.purple,w:2});
    s+=txt([160,222],'rotation de 180° : l\'avant devient l\'arrière',{fs:11.5,c:C.purple,fw:700});
    s+=txt([160,240],'ET les deux carbones s\'échangent',{fs:11,c:C.ink2});
  }
  if(k===1){
    const me=[92,178],c2=[122,160],om=[122,122],c3=[152,180],c4=[184,160],ph=[216,180];
    s+=bond(me,c2); s+=wedge(c2,om,{e:12,c:C.blue}); s+=lab(om,'OMe',{fs:12.5,c:C.blue,r:19});
    s+=bond(c2,c3); s+=dbondIn(c3,c4,-1,{}); s+=bond(c4,ph,{e:11});
    s+=lab(ph,'Ph',{fs:12.5,r:12});
    s+=txt([96,150],'(R)',{fs:12,fw:800,c:C.blue});
    s+=lab([152,200],'Re',{fs:12,c:C.green,fw:800,r:11});
    s+=lab([190,138],'Re',{fs:12,c:C.green,fw:800,r:11});
    s+=txt([180,232],'face AVANT = (3Re, 4Re)',{fs:12,fw:700,c:C.green});
    s+=txt([180,250],'face arrière = (3Si, 4Si)',{fs:11,c:C.ink2});
  }
  if(k===2){
    const R=ring6(168,152,34,0,[],{}); s+=R.s;
    s+=dbondIn(R.v[0],R.v[1],1,{});
    s+=bond(R.v[0],[168,96],{e:10}); s+=lab([168,92],'OSiMe₃',{fs:12.5,c:C.blue,r:26});
    s+=bond(R.v[1],[228,112],{e:8}); s+=lab([232,110],'CH₃',{fs:12,r:14});
    s+=lab([126,106],'Re',{fs:12,c:C.green,fw:800,r:11});
    s+=lab([224,158],'Si',{fs:12,c:C.green,fw:800,r:11});
    s+=txt([180,226],'face AVANT = (1Re, 2Si)',{fs:12,fw:700,c:C.green});
    s+=txt([180,244],'face arrière = (1Si, 2Re)',{fs:11.5,c:C.ink2});
  }
  if(k===3){
    const me=[86,176],c=[116,158],o=[116,120],c3=[146,176],c4=[176,158],n=[206,176];
    s+=bond(me,c); s+=dbond(c,o,{e:10}); s+=lab(o,'O',{fs:13.5});
    s+=bond(c,c3); s+=bond(c3,c4); s+=bond(c4,n,{e:13}); s+=lab(n,'NH₂',{fs:12.5,r:16});
    s+=lab([116,190],'Re',{fs:12.5,c:C.green,fw:800,r:12});
    s+=txt([180,226],'face AVANT = Re — face arrière = Si',{fs:12,fw:700,c:C.green});
    s+=txt([180,244],'attaque d\'un hydrure : les deux faces donnent deux énantiomères',{fs:11,c:C.ink2});
  }
  const col = EX1[k].vc==='green'?C.green:(EX1[k].vc==='red'?C.red:C.blue);
  s+=`<rect x="16" y="34" width="328" height="38" rx="12" fill="${col}" opacity=".12"/>`;
  s+=txt([180,47],EX1[k].verdict,{fs:12,fw:800,c:col});
  s+=txt([180,63],EX1[k].sous,{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'faces de '+EX1[k].nom});
}

/* --- le test des trois questions ------------------------------------------ */
function figTestFace(){
  const W=360,H=282; let s='';
  const box=(y,t1,t2,col)=>`<rect x="18" y="${y}" width="324" height="44" rx="10" fill="${col}" opacity=".10" stroke="${col}" stroke-width="1.4"/>`
    +txt([180,y+15],t1,{fs:12.5,fw:800,c:col})+txt([180,y+31],t2,{fs:11,c:C.ink2});
  s+=txt([180,20],'Attaque la face AVANT, puis la face ARRIÈRE.',{fs:12.5,fw:800});
  s+=txt([180,38],'Compare les DEUX produits obtenus :',{fs:12,c:C.ink2});
  s+=box(56,'les deux produits sont IDENTIQUES','→ faces homotopes (aucune sélectivité possible)',C.green);
  s+=box(122,'les deux produits sont ÉNANTIOMÈRES','→ faces énantiotopes : le substrat est PROCHIRAL',C.blue);
  s+=box(188,'les deux produits sont DIASTÉRÉOISOMÈRES','→ faces diastéréotopes',C.red);
  s+=txt([180,256],'Ce test remplace toute recherche d\'éléments de symétrie :',{fs:11,c:C.ink2});
  s+=txt([180,272],'il donne la même réponse, et il ne se trompe jamais.',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'test des faces'});
}

/* --- Exercice 2 : les quatre biaryles -------------------------------------- */
const EX2 = [
 {nom:'BINAP', ortho:['PPh₂','PPh₂'], fus:true,  n:2,
  verdict:'AXE de chiralité', vc:'green', why2:['4 positions ortho occupées : deux PPh₂','et les deux cycles soudés des naphtalènes']},
 {nom:'acide 6,6\'-difluorobiphényl-2,2\'-dicarboxylique', ortho:['CO₂H','F'], fus:false, n:4,
  verdict:'AXE de chiralité', vc:'green', why2:['4 substituants en ortho : CO₂H et F sur chaque cycle','réserve : le fluor est très petit (voir la section)']},
 {nom:'acide biphényl-2,2\'-dicarboxylique', ortho:['CO₂H',''], fus:false, n:2,
  verdict:'PAS d\'élément de chiralité', vc:'red', why2:['seulement 2 substituants en ortho :','la rotation est bien trop rapide']},
 {nom:'BINOL', ortho:['OH','OH'], fus:true, n:2,
  verdict:'AXE de chiralité', vc:'green', why2:['les deux naphtalènes ne peuvent pas','devenir coplanaires']}
];
function figBiaryl(k){
  const W=360,H=278, r=26, cx=180; let s='';
  const d=EX2[k];
  const top = d.fus ? naph(cx,96,r,{}) : ring6(cx,96,r,0,[0,2,4],{});
  const bot = d.fus ? naph(cx,178,r,{}) : ring6(cx,178,r,0,[0,2,4],{});
  s+=top.s+bot.s;
  const ipT=top.v[3], ipB=bot.v[0];
  s+=bond(ipT,ipB);
  /* axe */
  s+=seg([cx,52],[cx,222],{c:C.red,dash:'6 5',w:1.5});
  s+=txt([cx+0,44],'axe aryle–aryle',{fs:11,fw:700,c:C.red});
  const put=(v,ctr,t,col)=>{ if(!t) return '';
    const dx=v[0]-ctr[0], dy=v[1]-ctr[1], L=Math.hypot(dx,dy)||1, p=[v[0]+dx/L*24, v[1]+dy/L*24];
    return bond(v,p,{e:12,c:col})+lab(p,t,{fs:12,c:col,r:t.length>3?20:14}); };
  /* ortho « droite » sur chaque cycle */
  s+=put(top.v[2],[cx,96],d.ortho[0],C.blue);
  s+=put(bot.v[1],[cx,178],d.ortho[0],C.blue);
  /* ortho « gauche » : seulement pour les biphényles non soudés */
  if(!d.fus && d.ortho[1]){
    s+=put(top.v[4],[cx,96],d.ortho[1],C.purple);
    s+=put(bot.v[5],[cx,178],d.ortho[1],C.purple);
  }
  s+=txt([180,18],d.nom,{fs:12,fw:800});
  const col = d.vc==='green'?C.green:C.red;
  s+=`<rect x="14" y="232" width="332" height="42" rx="10" fill="${col}" opacity=".11"/>`;
  s+=txt([180,246],d.verdict,{fs:12.5,fw:800,c:col});
  s+=txtLines([180,261],d.why2||[d.why],{fs:10,c:C.ink2,lh:12});
  return svg(W,H,s,{alt:d.nom});
}

/* --- plat vs tordu --------------------------------------------------------- */
function figPlatTordu(){
  const W=360,H=238,r=22; let s='';
  /* gauche : dessin plat */
  const a=ring6(88,86,r,0,[0,2,4],{}), b=ring6(88,152,r,0,[0,2,4],{});
  s+=a.s+b.s+bond(a.v[3],b.v[0]);
  s+=txt([88,36],'dessin PLAT',{fs:12.5,fw:800});
  s+=txt([88,200],'aucune configuration',{fs:11.5,fw:700,c:C.red});
  s+=txt([88,216],'ne peut être lue',{fs:11.5,fw:700,c:C.red});
  /* droite : perspective — un cycle vu de face, l'autre vu par la tranche */
  const c=ring6(268,86,r,0,[0,2,4],{}); s+=c.s;
  s+=`<ellipse cx="268" cy="152" rx="9" ry="24" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
  s+=bond(c.v[3],[268,128]);
  s+=txt([268,36],'dessin en PERSPECTIVE',{fs:12.5,fw:800});
  s+=txt([268,200],'là, on peut trancher',{fs:11.5,fw:700,c:C.green});
  s+=txt([268,216],'(aR ou aS)',{fs:11.5,fw:700,c:C.green});
  s+=seg([180,60],[180,190],{c:C.line,w:1.2,dash:'4 4'});
  return svg(W,H,s,{alt:'dessin plat contre perspective'});
}

/* --- Newman le long de l'axe : la procédure CIP ---------------------------- */
function figAxeNewman(k){
  /* k=0 : ligand 3 (cycle arrière prioritaire) vers la DROITE ; k=1 : vers la GAUCHE */
  const W=360,H=296,cx=180,cy=150,R=62; let s='';
  s+=txt([180,20],'Vue le long de l\'axe',{fs:13,fw:800});
  s+=txt([180,38],'bleu = cycle AVANT (rangs 1 et 2)',{fs:10.5,c:C.blue,fw:700});
  s+=txt([180,54],'violet = cycle ARRIÈRE (rangs 3 et 4)',{fs:10.5,c:C.purple,fw:700});
  s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.ink2}" stroke-width="2"/>`;
  const droite = (k===0);
  const f3 = droite ? [cx+R,cy] : [cx-R,cy];
  const f4 = droite ? [cx-R,cy] : [cx+R,cy];
  s+=seg(f3,[f3[0]+(droite?32:-32),cy],{c:C.purple,w:2.8});
  s+=seg(f4,[f4[0]+(droite?-32:32),cy],{c:C.purple,w:2.8});
  s+=lab([f3[0]+(droite?48:-48),cy],'3',{fs:14,fw:800,c:C.purple,r:12});
  s+=lab([f4[0]+(droite?-48:48),cy],'4',{fs:14,fw:800,c:C.purple,r:12});
  s+=seg([cx,cy],[cx,cy-R],{c:C.blue,w:3}); s+=seg([cx,cy],[cx,cy+R],{c:C.blue,w:3});
  s+=lab([cx,cy-R-15],'1',{fs:14,fw:800,c:C.blue,r:12});
  s+=lab([cx,cy+R+15],'2',{fs:14,fw:800,c:C.blue,r:12});
  /* le trajet 1 → 2 → 3, en faisant les trois quarts du tour */
  const r2=R-17, dep=[cx,cy-r2], arr=droite?[cx+r2,cy]:[cx-r2,cy];
  const sweep = droite ? 0 : 1;      /* 0 = antihoraire à l'écran (y vers le bas) */
  s+=`<path d="M${E(dep[0])},${E(dep[1])} A${r2},${r2} 0 1 ${sweep} ${E(arr[0])},${E(arr[1])}"`
   + ` fill="none" stroke="${C.green}" stroke-width="2.4" stroke-linecap="round" marker-end="url(#mkGreen)"/>`;
  s+=txt([180,250],'1 → 2 → 3 : sens '+(droite?'ANTIhoraire':'HORAIRE'),{fs:12.5,fw:800,c:C.green});
  s+=txt([180,274],droite?'configuration aS':'configuration aR',{fs:15,fw:800,c:C.green});
  return svg(W,H,s,{alt:'projection de Newman le long de l\'axe'});
}

/* --- Exercice 3 : les cinq réactions --------------------------------------- */
function zz(pts,o){ let s=''; for(let i=0;i<pts.length-1;i++) s+=bond(pts[i],pts[i+1],o); return s; }
function epox(a,b,o){ /* époxyde : O au-dessus du segment a-b, deux liaisons en pointillé */
  o=o||{};
  const m=[(a[0]+b[0])/2,(a[1]+b[1])/2-26];
  return hashb(a,m,{e:10,c:o.c||C.green})+hashb(b,m,{e:10,c:o.c||C.green})+lab(m,'O',{fs:13,c:o.c||C.green});
}
function flecheV(x,y1,y2,lignes){
  let s=arrow([x,y1],[x,y2],{w:2.4});
  (lignes||[]).forEach((t,i)=> s+=txt([x+14,y1+10+i*16],t,{fs:11.5,fw:600,anchor:'start'}));
  return s;
}
const EX3=[
 {t:'a) époxydation de Sharpless', verdict:'ÉNANTIOSÉLECTIVE', vc:'blue',
  why:'substrat achiral à faces énantiotopes + catalyseur chiral'},
 {t:'b) époxydation dirigée par l\'alcool', verdict:'DIASTÉRÉOSÉLECTIVE', vc:'red',
  why:'substrat déjà chiral, catalyseur achiral'},
 {t:'c) fixation de l\'auxiliaire', verdict:'NI L\'UNE NI L\'AUTRE', vc:'grey',
  why:'aucun élément stéréogène n\'est créé'},
 {t:'d) alkylation d\'Evans', verdict:'DIASTÉRÉOSÉLECTIVE (mais voir la réserve)', vc:'red',
  why:'le cycle chiral oriente l\'électrophile'},
 {t:'e) réduction par NaBH₄', verdict:'DIASTÉRÉOSÉLECTIVE', vc:'red',
  why:'faces diastéréotopes, réducteur achiral'}
];
function figRx(k){
  const W=360; let H=330, s='';
  s+=txt([180,20],EX3[k].t,{fs:13,fw:800});
  if(k===0){
    H=326;
    /* (E)-but-2-én-1-ol : CH3 - C3 = C2 - C1 - OH */
    const a=[78,104],b=[104,86],c=[130,104],d=[156,86];
    s+=bond(a,b); s+=dbondIn(b,c,1,{}); s+=bond(c,d);
    s+=bond(d,[182,104],{e:13}); s+=lab([186,104],'OH',{fs:12,r:15});
    s+=txt([116,64],'(E)',{fs:11.5,fw:700});
    s+=flecheV(122,134,186,['t-BuOOH','Ti(OⁱPr)₄ cat.','(R,R)-DET']);
    /* époxyde (2S,3S) */
    const A=[78,254],B=[104,236],D=[134,236],E2=[160,218];
    s+=bond(A,B); s+=bond(B,D); s+=bond(D,E2);
    s+=epox(B,D,{});
    s+=bond(E2,[186,236],{e:13}); s+=lab([190,236],'OH',{fs:12,r:15});
    s+=lab([104,256],'S',{fs:12,fw:800,c:C.green,r:10});
    s+=lab([134,256],'S',{fs:12,fw:800,c:C.green,r:10});
    s+=txt([180,288],'l\'alcool de départ est ACHIRAL :',{fs:11.5,c:C.ink2});
    s+=txt([180,304],'ses deux faces sont énantiotopes',{fs:11.5,c:C.ink2});
    s+=txt([180,320],'c\'est le tartrate qui choisit la face',{fs:11.5,fw:700,c:C.blue});
  }
  if(k===1){
    H=346;
    /* (2S,3Z)-2-méthylpent-3-én-1-ol */
    const me=[74,112],c4=[74,84],c3=[100,68],c2=[126,86],c1=[152,68];
    s+=bond(me,c4); s+=dbondIn(c4,c3,1,{}); s+=bond(c3,c2);
    s+=wedge(c2,[126,116],{e:8,c:C.blue}); s+=txt([126,126],'Me',{fs:11,c:C.blue,fw:700});
    s+=bond(c2,c1); s+=bond(c1,[178,86],{e:13}); s+=lab([182,86],'OH',{fs:12,r:15});
    s+=txt([88,48],'(Z)',{fs:11.5,fw:700});
    s+=txt([140,62],'(S)',{fs:11.5,fw:800,c:C.blue});
    s+=flecheV(122,150,196,['t-BuOOH','VO(acac)₂','(achiral)']);
    const p4=[74,262],p3=[100,244],p2=[130,244],p1=[156,262],p0=[182,244];
    s+=bond(p4,p3); s+=bond(p3,p2); s+=bond(p2,p1); s+=bond(p1,p0);
    s+=epox(p3,p2,{});
    s+=wedge(p1,[156,292],{e:8,c:C.blue});
    s+=bond(p0,[208,262],{e:13}); s+=lab([212,262],'OH',{fs:12,r:15});
    s+=lab([94,270],'S',{fs:11.5,fw:800,c:C.green,r:10});
    s+=lab([148,232],'R',{fs:11.5,fw:800,c:C.green,r:10});
    s+=lab([176,278],'R',{fs:11.5,fw:800,c:C.green,r:10});
    s+=txt([180,314],'le vanadium est ACHIRAL : c\'est le substrat qui décide',{fs:10.5,c:C.ink2});
    s+=txt([180,332],'(S) devient (R) sans qu\'aucune liaison ne bouge',{fs:11.5,fw:700,c:C.red});
  }
  if(k===2){
    H=336;
    s+=oxaz([116,40],{aux:'bn',wedge:true});
    s+=txt([175,44],'H',{fs:12,fw:700,c:C.blue,anchor:'start'});
    s+=txt([186,78],'(S)',{fs:11.5,fw:800,c:C.blue});
    s+=txt([180,166],'+ Cl–CO–CH₂CH₃',{fs:12.5,fw:700});
    s+=arrow([110,190],[250,190],{w:2.4});
    s+=txt([180,210],'100 %',{fs:12,fw:700,c:C.ink2});
    s+=`<rect x="18" y="228" width="324" height="98" rx="12" fill="${C.grey}" opacity=".10"/>`;
    s+=txtLines([180,248],['On accroche seulement l\'auxiliaire sur l\'azote.',
      'Le centre (S) du cycle ne bouge pas, et aucun',
      'nouveau centre n\'apparaît : rien à sélectionner.'],{fs:11.5,lh:17});
    s+=txt([180,308],'C\'est le piège de l\'exercice.',{fs:12,fw:800,c:C.red});
  }
  if(k===3){
    H=352;
    s+=oxaz([66,78],{aux:'ipr',wedge:false});
    const N=oxN([66,78]);
    s+=bond(N,[142,70],{s:9}); s+=dbond([142,70],[142,46],{e:9}); s+=lab([142,46],'O',{fs:12.5});
    s+=bond([142,70],[168,88]); s+=bond([168,88],[194,70]);
    s+=txt([252,52],'propanoyle',{fs:11,c:C.ink2});
    s+=txt([180,176],'1. LDA    2. CH₃–I',{fs:12.5,fw:700});
    s+=arrow([110,198],[250,198],{w:2.4});
    s+=`<rect x="18" y="218" width="324" height="126" rx="12" fill="${C.red}" opacity=".10" stroke="${C.red}" stroke-dasharray="5 4"/>`;
    s+=txt([180,238],'Attention au produit dessiné',{fs:12.5,fw:800,c:C.red});
    s+=txtLines([180,260],['Un propanoyle méthylé donne un ISObutyryle :',
      'le carbone α porte alors DEUX méthyles identiques.',
      'Il n\'est donc plus stéréogène, et le trait gras',
      'du dessin ne veut rien dire.'],{fs:11.5,lh:17});
    s+=txt([180,332],'Avec Br–CH₂Ph, la réaction serait le cas d\'école.',{fs:10.5,c:C.ink2});
  }
  if(k===4){
    H=292;
    const R=ring6(80,150,30,0,[],{}); s+=R.s;
    s+=dbond(R.v[0],[80,80],{e:10}); s+=lab([80,76],'O',{fs:13});
    s+=bond(R.v[3],[80,218],{e:13}); s+=lab([80,222],'tBu',{fs:11.5,r:15});
    s+=arrow([128,150],[214,150],{w:2.4});
    s+=txt([171,132],'NaBH₄',{fs:12,fw:700});
    const R2=ring6(280,150,30,0,[],{}); s+=R2.s;
    s+=hashb(R2.v[0],[280,80],{e:14}); s+=lab([280,76],'OH',{fs:12,r:15});
    s+=wedge(R2.v[3],[280,218],{e:15}); s+=lab([280,222],'tBu',{fs:11.5,r:15});
    s+=lab([280,136],'r',{fs:12,fw:800,c:C.green,r:9});
    s+=lab([280,166],'r',{fs:12,fw:800,c:C.green,r:9});
    s+=txt([180,250],'l\'alcool trans (OH équatorial) est majoritaire',{fs:11.5,fw:700});
    s+=txt([180,272],'le produit est ACHIRAL : la mention « (±) » est de trop',{fs:10.5,c:C.red,fw:700});
  }
  return svg(W,H,s,{alt:EX3[k].t});
}

/* --- l'arbre de décision de l'exercice 3 ----------------------------------- */
function figArbreSel(){
  const W=360,H=300; let s='';
  const q=(y,t)=>`<rect x="16" y="${y}" width="328" height="30" rx="8" fill="var(--panel2)" stroke="${C.line}"/>`
    +txt([180,y+15],t,{fs:12,fw:700});
  const rep=(y,t,col)=>`<rect x="40" y="${y}" width="280" height="28" rx="14" fill="${col}" opacity=".13"/>`
    +txt([180,y+14],t,{fs:12,fw:800,c:col});
  s+=q(14,'1. La réaction crée-t-elle un élément stéréogène ?');
  s+=arrow([180,44],[180,56],{w:2});
  s+=rep(58,'NON → ni diastéréo- ni énantiosélective',C.grey);
  s+=q(96,'2. Le substrat est-il DÉJÀ chiral ?');
  s+=arrow([180,126],[180,138],{w:2});
  s+=rep(140,'OUI → DIASTÉRÉOsélective',C.red);
  s+=txt([180,176],'(les deux états de transition sont diastéréoisomères :',{fs:10.5,c:C.ink2});
  s+=txt([180,190],'ils ont des énergies différentes « gratuitement »)',{fs:10.5,c:C.ink2});
  s+=q(204,'3. Sinon : le réactif ou le catalyseur est-il chiral ?');
  s+=arrow([180,234],[180,246],{w:2});
  s+=rep(248,'OUI → ÉNANTIOsélective',C.blue);
  s+=txt([180,286],'NON → produit racémique, aucune sélectivité',{fs:11,fw:700,c:C.grey});
  return svg(W,H,s,{alt:'arbre de décision diastéréo / énantio'});
}

/* --- faces diastéréotopes de la 4-tBu-cyclohexanone ------------------------ */
function figCyclohex(){
  const W=360,H=282; let s='';
  s+=txt([180,20],'Pourquoi les deux faces ne sont PAS équivalentes',{fs:12.5,fw:800});
  /* chaise très schématique */
  const P=[[70,140],[118,116],[176,132],[224,116],[272,140],[214,158]];
  s+=zz([P[0],P[1],P[2],P[3],P[4]],{}); s+=bond(P[4],P[5]); s+=bond(P[5],P[0]);
  s+=dbond(P[2],[176,92],{e:10}); s+=lab([176,90],'O',{fs:13});
  s+=wedge(P[5],[214,192],{e:12,c:C.blue}); s+=lab([214,196],'tBu',{fs:11.5,c:C.blue,r:15});
  s+=arrow([176,52],[176,80],{c:C.green,w:2.4});
  s+=txt([176,42],'face du dessus',{fs:11,fw:700,c:C.green});
  s+=arrow([120,214],[152,142],{c:C.red,w:2.4});
  s+=txt([96,228],'face du dessous',{fs:11,fw:700,c:C.red});
  s+=`<rect x="16" y="240" width="328" height="36" rx="10" fill="${C.red}" opacity=".10"/>`;
  s+=txt([180,252],'le tBu, en bas, sert de repère : il distingue les deux faces',{fs:11,c:C.ink2});
  s+=txt([180,268],'→ les deux produits sont cis et trans : des DIASTÉRÉOISOMÈRES',{fs:11.5,fw:700,c:C.red});
  return svg(W,H,s,{alt:'faces de la 4-tert-butylcyclohexanone'});
}

/* --- récapitulatifs : blocs empilés (jamais de tableau large sur mobile) --- */
function recapHTML(rows){
  return rows.map(r=>`<div style="border-left:4px solid ${r.c};padding:10px 12px;margin:9px 0;background:var(--panel2);border-radius:0 10px 10px 0">`
   +`<div style="font-weight:800;font-size:14px">${r.t}</div>`
   +`<div style="font-weight:800;color:${r.c};font-size:13px;margin-top:3px">${r.v}</div>`
   +`<div style="color:var(--ink2);font-size:12.5px;margin-top:4px;line-height:1.45">${r.d}</div></div>`).join('');
}
