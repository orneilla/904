
/* ==========================================================================
   Figures — Les bases de la stéréochimie (d'après Robinson, chapitre 4)
   ========================================================================== */

/* --- projection de Fischer ------------------------------------------------ */
function fischer(P,rows,topTxt,botTxt,o){
  o=o||{}; const dy=o.dy||32, arm=o.arm||30; let s='';
  const yTop=P[1], yBot=P[1]+dy*(rows.length+1);
  s+=seg([P[0],yTop+11],[P[0],yBot-11],{w:2.1,c:o.c||C.ink});
  rows.forEach((r,i)=>{
    const y=P[1]+dy*(i+1);
    s+=seg([P[0]-arm,y],[P[0]+arm,y],{w:2.1,c:o.c||C.ink});
    s+=lab([P[0]-arm-8,y],r[0],{fs:11.5,fw:700,r:15,c:r[2]});
    s+=lab([P[0]+arm+8,y],r[1],{fs:11.5,fw:700,r:15,c:r[3]});
  });
  s+=lab([P[0],yTop],topTxt,{fs:11.5,fw:700,r:o.r||19});
  s+=lab([P[0],yBot],botTxt,{fs:11.5,fw:700,r:o.r||19});
  return s;
}

/* --- 1.1 l'arbre de décision --------------------------------------------- */
const PAIRES={
  homo:{nom:'Le même (R)-butan-2-ol, dessiné de deux façons',
        chemin:1, verdict:'LA MÊME MOLÉCULE',
        why:'On peut faire tourner l\'un pour le superposer exactement sur l\'autre. Robinson les appelle <i>homomères</i> — un mot rarement utilisé, justement parce que ce n\'est pas de l\'isomérie du tout.'},
  enant:{nom:'Acide (2R,3R)- et (2S,3S)-tartrique',
        chemin:2, verdict:'ÉNANTIOMÈRES',
        why:'Pas superposables, mais images l\'une de l\'autre dans un miroir. Toutes leurs propriétés physiques sont identiques en milieu achiral : mêmes points de fusion, même solubilité, même spectre. Seul le signe du pouvoir rotatoire diffère.'},
  diast:{nom:'Acide (2R,3R)-tartrique et acide méso-tartrique',
        chemin:3, verdict:'DIASTÉRÉOISOMÈRES',
        why:'Pas superposables, et pas images miroir non plus : un des deux centres est identique, l\'autre est inversé. Même constitution, donc diastéréoisomères. Leurs propriétés diffèrent : le méso fond à 140 °C, le (+) à 170 °C.'},
  const:{nom:'But-1-ène et but-2-ène',
        chemin:4, verdict:'ISOMÈRES DE CONSTITUTION',
        why:'Les atomes ne sont même pas reliés dans le même ordre : la double liaison n\'est pas au même endroit. On ne parle plus de stéréochimie mais de constitution.'}
};
function figArbre(ex){
  const W=360,H=302,k=PAIRES[ex].chemin; let s='';
  const Q=[[14,44,'Superposables ?',null],
           [14,110,'Images l\'une de l\'autre|dans un miroir ?',null],
           [14,176,'Même constitution ?',null]];
  const R=[[186,44,'la MÊME|molécule'],[186,110,'ÉNANTIOMÈRES'],[186,176,'DIASTÉRÉO-|ISOMÈRES']];
  const on=(i)=>(k>i);           /* question i traversée */
  const hit=(i)=>(k===i+1);      /* sortie « oui » prise */
  for(let i=0;i<3;i++){
    const [x,y,t]=Q[i], act=on(i)||hit(i);
    s+=`<rect x="${x}" y="${y}" width="154" height="44" rx="11" fill="${act?'var(--panel2)':'none'}" stroke="${act?C.blue:C.line}" stroke-width="${act?2.2:1.5}"/>`;
    s+=txtLines([x+77,y+(t.includes('|')?16:24)],t.split('|'),{fs:12,fw:700,lh:15,c:act?C.ink:C.ink2});
    const [rx,ry,rt]=R[i];
    const good=hit(i);
    s+=`<rect x="${rx}" y="${ry}" width="160" height="44" rx="11" fill="${good?C.green:'none'}" stroke="${good?C.green:C.line}" stroke-width="${good?2.2:1.5}"/>`;
    s+=txtLines([rx+80,ry+(rt.includes('|')?16:24)],rt.split('|'),{fs:11.5,fw:800,lh:15,c:good?'#fff':C.ink2});
    s+=arrow([x+156,y+22],[rx-4,ry+22],{c:good?C.green:C.line,w:good?2.6:1.5});
    s+=txt([x+170,y+14],'oui',{fs:10,fw:700,c:good?C.green:C.ink2});
    if(i<2||k===4){
      const yy=y+46, act2=on(i+1)||k===4&&i===2;
      s+=arrow([x+77,yy],[x+77,yy+18],{c:(k>i+1)?C.blue:C.line,w:(k>i+1)?2.4:1.5});
      s+=txt([x+58,yy+13],'non',{fs:10,fw:700,c:(k>i+1)?C.blue:C.ink2});
    }
  }
  const good4=(k===4);
  s+=`<rect x="14" y="242" width="332" height="44" rx="11" fill="${good4?C.green:'none'}" stroke="${good4?C.green:C.line}" stroke-width="${good4?2.2:1.5}"/>`;
  s+=txt([180,264],'ISOMÈRES DE CONSTITUTION',{fs:12,fw:800,c:good4?'#fff':C.ink2});
  s+=txt([180,16],'deux molécules de même formule brute',{fs:11.5,fw:700,c:C.ink2});
  s+=txt([180,32],'↓',{fs:12,c:C.ink2});
  return svg(W,H,s,{alt:'arbre de décision'});
}
function figPaire(ex){
  const W=360,H=222; let s='';
  if(ex==='const'){
    s+=bond([40,110],[74,92],{}); s+=dbondIn([74,92],[108,110],-1,{});
    s+=bond([108,110],[142,92],{});
    s+=txt([90,150],'but-1-ène',{fs:12,fw:700});
    s+=txt([90,168],'CH₂=CH–CH₂–CH₃',{fs:11,c:C.ink2});
    s+=bond([218,110],[252,92],{}); s+=dbondIn([252,92],[286,110],-1,{});
    s+=bond([286,110],[320,92],{});
    s+=txt([268,150],'but-2-ène',{fs:12,fw:700});
    s+=txt([268,168],'CH₃–CH=CH–CH₃',{fs:11,c:C.ink2});
    s+=txt([180,190],'la double liaison n\'est pas au même endroit',{fs:11,c:C.ink2});
    /* repérer la double liaison */
    s+=stericZone(91,101,26,16,{}); s+=stericZone(269,101,26,16,{});
  } else if(ex==='homo'){
    s+=stereoC([92,86],{l:'HO',r:'CH₃',d:'C₂H₅',dC:C.ink,tag:'(R)-butan-2-ol'});
    s+=stereoC([268,86],{l:'CH₃',r:'C₂H₅',d:'HO',dC:C.ink,tag:'(R)-butan-2-ol'});
    s+=txtLines([180,170],['Même molécule, deux orientations.','Une rotation suffit à les superposer.'],{fs:11.5,c:C.ink2,lh:15});
    s+=txt([180,16],'ATTENTION : ce n\'est pas un miroir, c\'est une rotation',{fs:11,fw:700,c:C.ink2});
  } else {
    const oh=(c)=>['OH',c];
    const R1=[['H','OH'],['HO','H']];       /* (2R,3R) */
    const R2=[['HO','H'],['H','OH']];       /* (2S,3S) */
    const RM=[['H','OH'],['H','OH']];       /* méso    */
    s+=fischer([92,34],R1,'CO₂H','CO₂H',{});
    s+=txt([92,180],'(2R,3R)  =  acide (+)',{fs:11.5,fw:700});
    if(ex==='enant'){
      s+=fischer([268,34],R2,'CO₂H','CO₂H',{});
      s+=txt([268,180],'(2S,3S)  =  acide (−)',{fs:11.5,fw:700});
      s+=seg([180,30],[180,168],{c:C.grey,dash:'6 5',w:1.6});
      s+=txt([180,196],'miroir',{fs:11,c:C.grey});
    } else {
      s+=fischer([268,34],RM,'CO₂H','CO₂H',{});
      s+=txt([268,180],'(2R,3S)  =  méso',{fs:11.5,fw:700});
      s+=seg([228,98],[308,98],{c:C.green,dash:'5 4',w:1.8});
      s+=txtLines([268,194],['plan de symétrie horizontal','→ achiral'],{fs:10,fw:700,c:C.green,lh:12});
    }
    s+=txt([180,14],'projections de Fischer',{fs:11,c:C.ink2});
  }
  return svg(W,H,s,{alt:'paire de molécules'});
}

/* --- 1.3 échelle de temps : molécule ou composé ? ------------------------- */
const kB=1.380649e-23, hPl=6.62607015e-34;
function demiVie(dG_kJ,T){            /* Eyring : t1/2 = ln2 / k */
  const k=(kB*T/hPl)*Math.exp(-dG_kJ*1000/(Rgas*T));
  return Math.LN2/k;                  /* en secondes */
}
function formatTemps(t){
  if(t<1e-12) return (t*1e15).toFixed(0)+' fs';
  if(t<1e-9)  return (t*1e12).toFixed(0)+' ps';
  if(t<1e-6)  return (t*1e9).toFixed(0)+' ns';
  if(t<1e-3)  return (t*1e6).toFixed(0)+' µs';
  if(t<1)     return (t*1e3).toFixed(0)+' ms';
  if(t<90)    return t.toFixed(1).replace('.',',')+' s';
  if(t<5400)  return (t/60).toFixed(0)+' min';
  if(t<2*86400) return (t/3600).toFixed(1).replace('.',',')+' h';
  if(t<400*86400) return (t/86400).toFixed(0)+' jours';
  return (t/(365*86400)).toFixed(0)+' ans';
}
function figTemps(dG,T){
  const W=360,H=250; let s='';
  const x0=30,x1=334,y=150;
  const lo=-15, hi=6;                 /* log10 des secondes */
  const X=(l)=>x0+(l-lo)/(hi-lo)*(x1-x0);
  s+=arrow([x0-6,y],[x1+8,y],{c:C.ink2,w:1.8});
  for(let l=lo;l<=hi;l+=3){
    s+=seg([X(l),y-5],[X(l),y+5],{c:C.ink2,w:1.4});
    s+=txt([X(l),y+18],'10'+String(l).replace('-','⁻').replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]),{fs:9.5,c:C.ink2});
  }
  s+=txt([x1+4,y+36],'secondes',{fs:10,c:C.ink2,anchor:'end'});
  /* fenêtres des techniques */
  const band=(a,b,yy,t,col)=>{
    let u='';
    u+=`<rect x="${E(X(a))}" y="${yy}" width="${E(X(b)-X(a))}" height="17" rx="5" fill="${col}" opacity=".22" stroke="${col}" stroke-width="1.2"/>`;
    u+=txt([(X(a)+X(b))/2,yy+9],t,{fs:9.5,fw:700,c:col});
    return u;
  };
  s+=band(-15,-12,66,'diffraction',C.purple);
  s+=band(-13,-11,88,'IR',C.purple);
  s+=band(-4,0,110,'RMN',C.blue);
  s+=band(1.8,6,110,'séparation',C.green);
  /* marqueur de demi-vie */
  const t=demiVie(dG,T), l=Math.max(lo,Math.min(hi,Math.log10(t)));
  s+=seg([X(l),46],[X(l),y-2],{c:C.red,dash:'4 3',w:2});
  s+=lab([X(l),36],'t½',{fs:12,c:C.red,fw:700,r:12});
  /* verdict */
  const sep = t>60, nmr = t>1e-3;
  s+=txtLines([180,196],
    sep?['t½ plus longue que la minute : les deux formes sont',
         'SÉPARABLES — ce sont deux composés distincts.']
    : nmr?['trop rapide pour être séparé, mais assez lent pour la RMN :',
         'la RMN voit DEUX signaux, la distillation un seul composé.']
    : ['beaucoup plus rapide que toutes les mesures :',
       'on ne voit qu\'UNE espèce moyenne.'],
    {fs:11,fw:700,lh:15,c:sep?C.green:(nmr?C.blue:C.ink2)});
  s+=txt([180,16],'où tombe la demi-vie d\'interconversion ?',{fs:11.5,fw:700});
  s+=txt([180,236],'t½ = ln2 / k, avec k = (k_B·T/h)·exp(−ΔG‡/RT)',{fs:10,c:C.ink2});
  return svg(W,H,s,{alt:'échelle de temps'});
}

/* --- 2.1 les unités stéréogènes ------------------------------------------ */
const UNITES={
  centre:{t:'Centre stéréogène', sub:'un atome tétraédrique à 4 ligands différents',
    ex:'C, mais aussi N⁺, P, S, Si',
    why:'C\'est le cas le plus fréquent. Échange deux ligands et tu obtiens l\'autre énantiomère. Une molécule avec <b>un seul</b> centre stéréogène est forcément chirale.'},
  axe:{t:'Axe chiral', sub:'une distribution chirale de ligands autour d\'un axe',
    ex:'allènes, biphényles encombrés (atropisomères), BINAP',
    why:'Il n\'y a aucun atome « asymétrique », et pourtant la molécule est chirale. Les deux paires de substituants sont dans deux plans perpendiculaires : l\'ensemble forme une hélice.'},
  plan:{t:'Plan chiral', sub:'un plan dissymétrique bloqué par un pont',
    ex:'cyclophanes, ansa-composés',
    why:'Rare, mais il existe. Le cycle ne peut pas tourner pour retrouver un plan de symétrie, parce qu\'un pont l\'en empêche.'},
  dbl:{t:'Double liaison', sub:'deux substituants différents à chaque bout',
    ex:'alcènes, imines, oximes',
    why:'Ce n\'est pas de la chiralité : les deux formes ne sont pas images miroir mais <b>diastéréoisomères</b> (Z et E). D\'où des propriétés physiques différentes — acide maléique contre acide fumarique.'}
};
function figUnites(kind){
  const W=360,H=228; let s=''; const U=UNITES[kind];
  if(kind==='centre'){
    s+=stereoC([180,104],{l:'a',r:'b',d:'c',dC:C.blue,tag:'+ un 4ᵉ ligand d implicite'});
    s+=curve([132,80],[228,80],-34,{c:C.green,w:2.2});
    s+=txt([180,52],'échange a et b',{fs:11,fw:700,c:C.green});
  }
  if(kind==='axe'){
    const c=[180,106];
    s+=dbond([146,106],c,{}); s+=dbond(c,[214,106],{});
    s+=lab([146,106],'C',{fs:12,fw:700}); s+=lab(c,'C',{fs:12,fw:700}); s+=lab([214,106],'C',{fs:12,fw:700});
    s+=bond([146,106],[116,84],{s:9,e:11}); s+=lab([112,80],'Me',{fs:11,r:13,c:C.blue});
    s+=bond([146,106],[116,128],{s:9,e:9}); s+=lab([112,132],'H',{fs:11,c:C.blue});
    s+=wedge([214,106],[246,86],{s:9,e:12,c:C.blue}); s+=lab([250,82],'tBu',{fs:11,r:15,c:C.blue});
    s+=hashb([214,106],[246,128],{s:9,e:10,c:C.blue}); s+=lab([250,132],'Cl',{fs:11,r:12,c:C.blue});
    s+=seg([112,106],[250,106],{c:C.purple,dash:'7 5',w:1.6});
    s+=txt([180,150],'axe chiral',{fs:11,fw:700,c:C.purple});
    s+=txt([180,52],'allène : les deux bouts sont dans des plans perpendiculaires',{fs:10.5,c:C.ink2});
  }
  if(kind==='plan'){
    s+=`<ellipse cx="170" cy="118" rx="34" ry="34" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
    s+=`<circle cx="170" cy="118" r="22" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`;
    s+=`<path d="M146,94 C120,60 240,52 214,96" fill="none" stroke="${C.blue}" stroke-width="2.4"/>`;
    s+=txt([180,58],'pont —(CH₂)ₙ—',{fs:11,fw:700,c:C.blue});
    s+=bond([204,118],[240,118],{e:16}); s+=lab([248,118],'CO₂H',{fs:11,fw:700,r:22});
    s+=txt([180,176],'le cycle ne peut pas tourner : le plan reste dissymétrique',{fs:10.5,c:C.ink2});
  }
  if(kind==='dbl'){
    s+=dbondIn([148,104],[212,104],-1,{});
    s+=bond([148,104],[116,86],{e:11}); s+=lab([112,82],'Me',{fs:11,r:13,c:C.blue});
    s+=bond([148,104],[116,122],{e:9}); s+=lab([112,126],'H',{fs:11,c:C.blue});
    s+=bond([212,104],[244,86],{e:11}); s+=lab([248,82],'Me',{fs:11,r:13,c:C.blue});
    s+=bond([212,104],[244,122],{e:9}); s+=lab([248,126],'H',{fs:11,c:C.blue});
    s+=txt([180,56],'Z : les deux Me du même côté',{fs:11,fw:700});
    s+=txt([180,160],'→ échange H et Me à droite : on obtient E',{fs:10.5,c:C.ink2});
  }
  s+=txt([180,H-36],U.t,{fs:13,fw:800,c:C.blue});
  s+=txt([180,H-16],U.sub,{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:U.t});
}

/* --- 2.2 barrières d'inversion ------------------------------------------- */
const BARR=[
  {v:0,   t:'amide R₂N–C=O',        d:'l\'azote est plan : il n\'y a même plus de pyramide'},
  {v:24,  t:'amine simple NR₃',     d:'s\'inverse des milliards de fois par seconde à 25 °C'},
  {v:72,  t:'aziridine N–Me',       d:'la tension de cycle gêne le passage par l\'azote plan'},
  {v:112, t:'aziridine N–Cl',       d:'le chlore, très électronégatif, abaisse encore le doublet'},
  {v:136, t:'oxaziridine',          d:'cycle tendu + oxygène : on peut isoler les deux formes'},
  {v:170, t:'sulfoxyde / sulfinamide', d:'parfaitement stable et séparable — c\'est ce qui rend l\'auxiliaire d\'Ellman possible'}
];
function figBarrieres(sel){
  const W=360,H=262; let s='';
  const x0=140,x1=336,y0=52,dy=26;
  const X=(v)=>x0+v/200*(x1-x0);
  BARR.forEach((b,i)=>{
    const y=y0+i*dy, on=(i===sel);
    s+=txt([x0-6,y],b.t,{fs:9.5,fw:on?800:600,anchor:'end',c:on?C.blue:C.ink});
    const w=Math.max(3,X(b.v)-x0);
    s+=`<rect x="${x0}" y="${y-7}" width="${E(w)}" height="14" rx="4" fill="${on?C.blue:'var(--panel2)'}" stroke="${on?C.blue:C.line}" stroke-width="1.3"/>`;
    s+=txt([x0+w+6,y],b.v?String(b.v):'≈0',{fs:9.5,fw:700,anchor:'start',c:on?C.blue:C.ink2});
  });
  s+=seg([X(90),34],[X(90),y0+6*dy-10],{c:C.red,dash:'5 4',w:2});
  s+=txtLines([X(90)+4,20],['séparable à','température ambiante →'],{fs:9,fw:700,c:C.red,lh:11,anchor:'start'});
  const ay=y0+6*dy;
  s+=arrow([x0-6,ay],[x1+8,ay],{c:C.ink2,w:1.6});
  for(const v of [0,50,100,150,200]){ s+=seg([X(v),ay-4],[X(v),ay+4],{c:C.ink2,w:1.3}); s+=txt([X(v),ay+16],String(v),{fs:9.5,c:C.ink2}); }
  s+=txt([180,H-8],'barrière d\'inversion / kJ·mol⁻¹',{fs:10,c:C.ink2});
  return svg(W,H,s,{alt:'barrières d\'inversion'});
}

/* --- 3.2 CIP appliqué au glycéraldéhyde, pas à pas ------------------------ */
function figCIP(k){
  const W=360,H=252; let s='';
  const Cc=[170,120];
  const OH=[136,104], CHO=[204,104], CH2=[170,156];
  s+=bond(Cc,OH,{e:16}); s+=bond(Cc,CHO,{e:18});
  s+=wedge(Cc,CH2,{e:24});
  s+=lab(OH,'OH',{fs:12.5,fw:700,r:16,c:k>=1?C.blue:C.ink});
  s+=lab(CHO,'CHO',{fs:12.5,fw:700,r:19,c:k>=2?C.blue:C.ink});
  s+=lab(CH2,'CH₂OH',{fs:12.5,fw:700,r:25,c:k>=2?C.blue:C.ink});
  s+=txt([170,120],'C',{fs:12,fw:700});
  s+=txt([170,88],'H',{fs:12,fw:700,c:k>=1?C.blue:C.ink});
  s+=seg([170,112],[170,98],{c:C.ink2,dash:'2 2',w:1.2});
  if(k>=1){ s+=txt([116,86],'a',{fs:13,fw:800,c:C.blue}); s+=txt([186,80],'d',{fs:13,fw:800,c:C.blue}); }
  if(k>=2){ s+=txt([228,88],'b',{fs:13,fw:800,c:C.blue}); s+=txt([170,186],'c',{fs:13,fw:800,c:C.blue}); }
  if(k===3){
    s+=`<path d="M124,132 A54,54 0 1 1 214,134" fill="none" stroke="${C.green}" stroke-width="2.6" marker-end="url(#mkGreen)"/>`;
    s+=txt([300,124],'R',{fs:22,fw:800,c:C.green});
  }
  const cap=[
   ['Le glycéraldéhyde : quatre ligands différents.','OH, CHO, CH₂OH et H.'],
   ['Règle 1 — numéro atomique du premier atome.','O > C = C > H, donc OH = a et H = d.'],
   ['Il faut départager les deux carbones : on va','plus loin. CHO donne (O, O, H) après dédoublement','de la double liaison, CH₂OH donne (O, H, H). Donc b et c.'],
   ['H (= d) pointe vers l\'arrière : on lit a → b → c','directement. C\'est dans le sens des aiguilles : R.']
  ][k];
  s+=txtLines([180,206],cap,{fs:11,fw:k===3?700:500,lh:15,c:k===3?C.green:C.ink2});
  s+=txt([180,16],'étape '+(k+1)+' / 4',{fs:11,fw:700,c:C.ink2});
  return svg(W,H,s,{alt:'attribution CIP, étape '+(k+1)});
}

/* --- 3.3 E/Z contre cis/trans -------------------------------------------- */
const EZ=[
 {k:'but', t:'but-2-ène', l1:'Me',l2:'H', r1:'Me',r2:'H',
  pl:'Me > H', pr:'Me > H', res:'Z', cis:'cis',
  why:'Les deux substituants prioritaires sont les deux méthyles, et ils sont du même côté : Z. Ici Z et cis désignent bien la même chose.'},
 {k:'brom', t:'2-bromobut-2-ène', l1:'Br',l2:'Me', r1:'Me',r2:'H',
  pl:'Br > Me', pr:'Me > H', res:'E', cis:'« cis » (les 2 Me)',
  why:'Les deux méthyles sont toujours du même côté — on serait tenté de dire cis. Mais à gauche, le prioritaire n\'est plus le méthyle : c\'est le brome. Le brome et le méthyle de droite sont de part et d\'autre : E.'}
];
function figEZ(i){
  const W=360,H=232,d=EZ[i]; let s='';
  const A=[146,108], B=[214,108];
  s+=dbondIn(A,B,-1,{});
  s+=bond(A,[112,88],{e:13}); s+=lab([106,84],d.l1,{fs:12,fw:700,r:15,c:C.blue});
  s+=bond(A,[112,128],{e:11}); s+=lab([106,132],d.l2,{fs:12,fw:700,r:13});
  s+=bond(B,[248,88],{e:13}); s+=lab([254,84],d.r1,{fs:12,fw:700,r:15,c:C.blue});
  s+=bond(B,[248,128],{e:11}); s+=lab([254,132],d.r2,{fs:12,fw:700,r:13});
  s+=txt([180,20],d.t,{fs:13,fw:700});
  s+=txt([106,58],d.pl,{fs:10.5,fw:700,c:C.blue});
  s+=txt([254,58],d.pr,{fs:10.5,fw:700,c:C.blue});
  s+=txt([180,166],'prioritaires du même côté ?  '+(d.res==='Z'?'OUI':'NON'),{fs:11.5,fw:700});
  s+=`<rect x="98" y="182" width="164" height="34" rx="10" fill="none" stroke="${d.res==='Z'?C.green:C.red}" stroke-width="2.2"/>`;
  s+=txt([180,199],d.res+'    (on dirait « '+d.cis+' »)',{fs:12.5,fw:800,c:d.res==='Z'?C.green:C.red});
  return svg(W,H,s,{alt:'E ou Z'});
}

/* --- 4.1 Fischer : ce qui est permis et ce qui ne l'est pas --------------- */
function figFischerOK(k){
  const W=360,H=268; let s='';
  const base=[['H','OH'],['HO','H']];
  s+=fischer([80,44],base,'CO₂H','CO₂H',{});
  s+=txt([80,190],'départ : (2R,3R)',{fs:11,fw:700});
  const ops=[
   {t:'rotation de 180° dans le plan',ok:true,  rows:[['H','OH'],['HO','H']],
    d:'Permis. La molécule est simplement retournée bout pour bout : c\'est la même.'},
   {t:'rotation de 90° dans le plan',ok:false, rows:null,
    d:'INTERDIT. Les liaisons horizontales (vers l\'avant) deviendraient verticales (vers l\'arrière) : on change de configuration.'},
   {t:'retournement (hors du plan)',ok:false, rows:[['OH','H'],['H','HO']],
    d:'INTERDIT. C\'est un miroir : on obtient l\'énantiomère, pas la même molécule.'},
   {t:'permutation circulaire de 3 ligands',ok:true, rows:[['OH','CO₂H'],['HO','H']],
    d:'Permis. Faire tourner trois ligands autour du quatrième ne change pas la configuration.'}
  ][k];
  if(ops.rows){ s+=fischer([272,44],ops.rows,'CO₂H','CO₂H',{c:ops.ok?C.green:C.red}); }
  else {
    s+=txt([272,100],'⟲ 90°',{fs:20,fw:700,c:C.red});
    s+=seg([248,80],[296,128],{c:C.red,w:3.4}); s+=seg([296,80],[248,128],{c:C.red,w:3.4});
  }
  s+=arrow([150,110],[210,110],{c:ops.ok?C.green:C.red,w:2.4});
  s+=txt([272,190],ops.ok?'même molécule ✓':'AUTRE molécule ✗',{fs:11.5,fw:800,c:ops.ok?C.green:C.red});
  s+=txt([180,20],ops.t,{fs:12.5,fw:700});
  s+=txt([180,236],'rappel : traits horizontaux = vers toi, verticaux = vers l\'arrière',{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'manipulation de Fischer'});
}

/* --- 5.1 lumière polarisée ----------------------------------------------- */
function figPolar(mode){
  const W=360,H=236; let s='';
  const x0=36,x1=324,yc=110;
  s+=seg([x0,yc],[x1,yc],{c:C.ink2,dash:'4 4',w:1.2});
  let d1='',d2='';
  for(let i=0;i<=120;i++){
    const x=x0+(x1-x0)*i/120, ph=i/120*Math.PI*6;
    const a=Math.sin(ph)*42;
    d1 += (i?' L':'M')+E(x)+','+E(yc-a);
    if(mode==='cp') d2 += (i?' L':'M')+E(x)+','+E(yc-Math.cos(ph)*16);
  }
  s+=`<path d="${d1}" fill="none" stroke="${mode==='cp'?C.purple:C.blue}" stroke-width="2.4"/>`;
  if(mode==='cp'){
    s+=`<path d="${d2}" fill="none" stroke="${C.purple}" stroke-width="1.6" opacity=".55"/>`;
    for(let i=0;i<=120;i+=6){
      const x=x0+(x1-x0)*i/120, ph=i/120*Math.PI*6;
      s+=seg([x,yc],[x,yc-Math.sin(ph)*42],{c:C.purple,w:1,op:.45});
    }
    s+=txt([180,24],'lumière polarisée CIRCULAIREMENT',{fs:12.5,fw:800,c:C.purple});
    s+=txt([180,182],'le vecteur électrique tourne : il décrit une HÉLICE',{fs:11.5,fw:700,c:C.purple});
    s+=txt([180,202],'une hélice est chirale (droite ou gauche)',{fs:11,c:C.ink2});
  } else {
    s+=txt([180,24],'lumière polarisée dans un PLAN',{fs:12.5,fw:800,c:C.blue});
    s+=`<rect x="${x0-6}" y="${yc-50}" width="${x1-x0+12}" height="100" rx="8" fill="${C.blue}" opacity=".07" stroke="${C.blue}" stroke-dasharray="5 4"/>`;
    s+=txt([180,182],'le vecteur reste dans un seul plan',{fs:11.5,fw:700,c:C.blue});
    s+=txt([180,202],'ce plan est un plan de symétrie → elle est ACHIRALE',{fs:11,fw:700,c:C.red});
  }
  s+=txt([180,224],'(le vecteur magnétique, perpendiculaire, n\'est pas dessiné)',{fs:9.5,c:C.ink2});
  return svg(W,H,s,{alt:'lumière polarisée '+mode});
}

/* --- 5.2 le polarimètre --------------------------------------------------- */
function figPolarimetre(alpha){
  const W=360,H=210; let s='';
  const y=96;
  s+=`<rect x="14" y="${y-22}" width="34" height="44" rx="7" fill="var(--panel2)" stroke="${C.line}"/>`;
  s+=txtLines([31,y-4],['source','Na'],{fs:9,c:C.ink2,lh:11});
  s+=seg([48,y],[76,y],{c:C.ink2,w:2});
  s+=`<rect x="76" y="${y-30}" width="14" height="60" rx="4" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
  s+=txt([83,y-42],'polariseur',{fs:9.5,c:C.blue,fw:700});
  s+=seg([90,y],[126,y],{c:C.blue,w:2.4});
  s+=`<rect x="126" y="${y-26}" width="110" height="52" rx="8" fill="${C.green}" opacity=".12" stroke="${C.green}" stroke-width="2"/>`;
  s+=txt([181,y-4],'échantillon chiral',{fs:10,fw:700,c:C.green});
  s+=txt([181,y+12],'longueur ℓ, conc. c',{fs:9.5,c:C.green});
  s+=seg([236,y],[276,y],{c:C.blue,w:2.4});
  /* plan tourné */
  const a=alpha*1.6;
  s+=`<g transform="rotate(${E(a)} 283 ${y})"><rect x="276" y="${y-30}" width="14" height="60" rx="4" fill="none" stroke="${C.blue}" stroke-width="2"/></g>`;
  s+=txt([300,y-42],'analyseur',{fs:9.5,c:C.blue,fw:700,anchor:'start'});
  s+=seg([283,y-40],[283,y+40],{c:C.ink2,dash:'3 3',w:1});
  s+=`<path d="M283,${y-40} A40,40 0 0 ${a>0?1:0} ${E(283+40*Math.sin(a*Math.PI/180))},${E(y-40*Math.cos(a*Math.PI/180))}" fill="none" stroke="${C.red}" stroke-width="2" marker-end="url(#mkRed)"/>`;
  s+=txt([310,y-56],'α',{fs:14,fw:800,c:C.red});
  s+=txtLines([180,164],['On ne mesure pas la chiralité de la lumière :','on mesure de combien le POLARIMÈTRE doit tourner.'],{fs:11,c:C.ink2,lh:15});
  s+=txt([180,196],'[α] = α / (ℓ × c)',{fs:13,fw:800,c:C.blue});
  return svg(W,H,s,{alt:'polarimètre'});
}

/* --- 3.4 D/L : pourquoi L n'est pas toujours S ---------------------------- */
function figAminoDL(which){
  const W=360,H=250,cys=(which==='cys'); let s='';
  const bas = cys?'CH₂SH':'CH₃';
  s+=fischer([116,52],[['H₂N','H',C.blue,null]],'CO₂H',bas,{r:22});
  s+=txt([116,164],cys?'L-cystéine':'L-alanine',{fs:13,fw:700});
  s+=txt([116,184],cys?'= (2R)':'= (2S)',{fs:13,fw:800,c:cys?C.red:C.green});
  /* priorités */
  s+=`<rect x="206" y="40" width="140" height="112" rx="11" fill="none" stroke="${C.blue}" stroke-width="1.8"/>`;
  s+=txt([276,58],'priorités',{fs:11,fw:700,c:C.blue});
  const rows = cys
   ? [['1','NH₂'],['2','CH₂SH  (S,H,H)'],['3','CO₂H  (O,O,O)'],['4','H']]
   : [['1','NH₂'],['2','CO₂H  (O,O,O)'],['3','CH₃  (H,H,H)'],['4','H']];
  rows.forEach((r,i)=>{
    s+=txt([218,80+i*20],r[0],{fs:11,fw:800,c:C.blue,anchor:'start'});
    s+=txt([234,80+i*20],r[1],{fs:10.5,anchor:'start'});
  });
  s+=txtLines([180,208],
    cys?['Le soufre (Z = 16) bat l\'oxygène (Z = 8) dès la 2ᵉ sphère.',
         'CH₂SH passe donc DEVANT CO₂H : les rangs 2 et 3 s\'échangent.']
       :['CO₂H (O,O,O) passe devant CH₃ (H,H,H).',
         'C\'est le cas de presque tous les acides aminés naturels.'],
    {fs:11,c:C.ink2,lh:15});
  s+=txt([180,16],'même famille L, descripteur différent',{fs:11.5,fw:700});
  return svg(W,H,s,{alt:'L-amino acide '+which});
}

/* --- 4.2 pseudo-asymétrie ------------------------------------------------- */
function figPseudo(){
  const W=360,H=246; let s='';
  const A=[['H','OH'],['H','OH'],['H','OH']];
  const B=[['H','OH'],['HO','H'],['H','OH']];
  s+=fischer([96,34],A,'CO₂H','CO₂H',{dy:30});
  s+=fischer([264,34],B,'CO₂H','CO₂H',{dy:30});
  [96,264].forEach(x=>{
    s+=`<rect x="${x-56}" y="86" width="112" height="16" rx="6" fill="${C.green}" opacity=".13"/>`;
    s+=txt([x,178],'achiral (méso)',{fs:11,fw:700,c:C.green});
  });
  s+=arrow([150,94],[128,94],{c:C.red,w:2.2});
  s+=arrow([210,94],[232,94],{c:C.red,w:2.2});
  s+=txt([180,80],'seul C3 change',{fs:10.5,fw:700,c:C.red});
  s+=txt([96,198],'r',{fs:16,fw:800,c:C.purple});
  s+=txt([264,198],'s',{fs:16,fw:800,c:C.purple});
  s+=txtLines([180,222],['Deux molécules achirales : ce sont des diastéréoisomères.',
    'Le centre qui les distingue est PSEUDO-ASYMÉTRIQUE → r / s.'],{fs:10,c:C.ink2,lh:14});
  s+=txt([180,16],'acide 2,3,4-trihydroxyglutarique',{fs:11.5,fw:700});
  return svg(W,H,s,{alt:'pseudo-asymétrie'});
}

/* --- 4.3 zig-zag, syn et anti --------------------------------------------- */
function figZigzag(mode){
  const W=360,H=224,syn=(mode==='syn'); let s='';
  const pts=[[48,140],[86,116],[124,140],[162,116],[200,140],[238,116],[276,140]];
  for(let i=0;i<pts.length-1;i++) s+=bond(pts[i],pts[i+1],{});
  /* substituants sur C2 et C4 (indices 1 et 3) */
  const up=(p)=>[p[0],p[1]-36], dn=(p)=>[p[0],p[1]+36];
  s+=wedge(pts[1],up(pts[1]),{e:14,c:C.blue}); s+=lab(up(pts[1]),'OH',{fs:11.5,fw:700,r:14,c:C.blue});
  if(syn){ s+=wedge(pts[3],up(pts[3]),{e:14,c:C.blue}); s+=lab(up(pts[3]),'OH',{fs:11.5,fw:700,r:14,c:C.blue}); }
  else   { s+=hashb(pts[3],dn(pts[3]),{e:14,c:C.blue}); s+=lab(dn(pts[3]),'OH',{fs:11.5,fw:700,r:14,c:C.blue}); }
  s+=txt([180,26],syn?'syn : les deux du même côté du zig-zag':'anti : de part et d\'autre du zig-zag',
        {fs:12.5,fw:800,c:syn?C.green:C.purple});
  s+=txt([180,192],'chaîne principale à plat, en zig-zag (Masamune)',{fs:10.5,c:C.ink2});
  s+=txt([180,212],'⚠ syn/anti ≠ cis/trans du cycle correspondant',{fs:10.5,fw:700,c:C.red});
  return svg(W,H,s,{alt:'zig-zag '+mode});
}

/* --- 6.2 pro-R / pro-S ---------------------------------------------------- */
function figProRS(sel){
  const W=360,H=268; let s='';
  const Cc=[170,116];
  s+=bond(Cc,[136,100],{e:16}); s+=lab([132,96],'CH₃',{fs:12,fw:700,r:16});
  s+=bond(Cc,[204,100],{e:14}); s+=lab([208,96],'OH',{fs:12,fw:700,r:14});
  const Ha=[146,154], Hb=[194,154];
  s+=wedge(Cc,Ha,{e:12,c:sel==='a'?C.red:C.ink});
  s+=hashb(Cc,Hb,{e:12,c:sel==='b'?C.purple:C.ink});
  s+=lab(Ha,sel==='a'?'D':'Hₐ',{fs:12,fw:700,r:12,c:sel==='a'?C.red:C.ink});
  s+=lab(Hb,sel==='b'?'D':'Hᵦ',{fs:12,fw:700,r:12,c:sel==='b'?C.purple:C.ink});
  s+=txt([170,80],'éthanol',{fs:11.5,fw:700,c:C.ink2});
  if(sel){
    const isA=(sel==='a');
    s+=`<rect x="64" y="186" width="232" height="40" rx="11" fill="none" stroke="${isA?C.red:C.purple}" stroke-width="2.2"/>`;
    s+=txt([180,200],'on donne à '+(isA?'Hₐ':'Hᵦ')+' la priorité supérieure',{fs:11,c:C.ink2});
    s+=txt([180,218],'→ le centre devient '+(isA?'(S)  donc Hₐ est pro-S':'(R)  donc Hᵦ est pro-R'),
           {fs:12,fw:800,c:isA?C.red:C.purple});
  } else {
    s+=txtLines([180,200],['Les deux H sont énantiotopes.','Touche un bouton pour en promouvoir un.'],{fs:11.5,c:C.ink2,lh:16});
  }
  s+=txt([180,250],'on promeut l\'un des deux, puis on applique CIP',{fs:10,c:C.ink2});
  s+=txt([180,20],'nommer chacun des deux hydrogènes',{fs:12,fw:700});
  return svg(W,H,s,{alt:'pro-R et pro-S'});
}
