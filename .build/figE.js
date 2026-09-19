
/* ==========================================================================
   Figures — réactif chiral : Hoppe / (−)-spartéine
   ========================================================================== */

/* groupe carbamate cyclique (spiro-oxazolidine), dessiné en entier */
function cbyFull(){
  let s='';
  const C2=[98,84],O1=[66,88],C5=[58,120],C4=[88,134],Nn=[108,112];
  const hx=[[122,70],[122,42],[98,28],[74,42],[74,70]];
  s+=bond(C2,hx[0],{}); s+=bond(hx[0],hx[1],{}); s+=bond(hx[1],hx[2],{});
  s+=bond(hx[2],hx[3],{}); s+=bond(hx[3],hx[4],{}); s+=bond(hx[4],C2,{});
  s+=bond(C2,O1,{e:9}); s+=bond(O1,C5,{s:9}); s+=bond(C5,C4,{}); s+=bond(C4,Nn,{e:9}); s+=bond(Nn,C2,{s:9});
  s+=lab(O1,'O',{fs:12}); s+=lab(Nn,'N',{fs:12});
  return s;
}
/* E1 : les deux protons énantiotopiques et les deux produits */
function figHoppeTopic(sel){
  const W=360,H=364; let s='';
  const Nn=[108,112], Cb=[138,100], Ob=[138,72], Oe=[166,120], Ca=[206,140];
  const Me=[246,120], Ha=[182,178], Hb=[230,178];
  s+=cbyFull();
  s+=bond(Nn,Cb,{s:9}); s+=dbond(Cb,Ob,{e:9}); s+=lab(Ob,'O',{fs:12});
  s+=bond(Cb,Oe,{e:9}); s+=lab(Oe,'O',{fs:12});
  s+=bond(Oe,Ca,{s:9}); s+=bond(Ca,Me,{e:13}); s+=lab(Me,'CH₃',{fs:12,r:14});
  s+=wedge(Ca,Ha,{e:11,c:C.red}); s+=lab(Ha,'Hₐ',{fs:12.5,c:C.red,fw:700,r:12});
  s+=hashb(Ca,Hb,{e:11,c:C.purple}); s+=lab(Hb,'Hᵦ',{fs:12.5,c:C.purple,fw:700,r:12});
  s+=txt([180,18],'carbamate de départ : le CH₂ porte 2 protons',{fs:12,fw:700});
  s+=txt([248,196],'énantiotopes',{fs:11.5,fw:700,c:C.ink2});
  /* miroir + produits */
  s+=seg([180,222],[180,330],{c:C.grey,dash:'6 5',w:1.6});
  const mk=(cx,cy,mirror,tag,on)=>{
    let t='';
    const dOx = mirror? [40,-20]:[-40,-20], dMe = mirror? [-40,-20]:[40,-20];
    const dCo = mirror? [24,38]:[-24,38];
    const Ox=add([cx,cy],dOx), M=add([cx,cy],dMe), Co=add([cx,cy],dCo);
    if(on) t+=`<rect x="${cx-72}" y="${cy-48}" width="144" height="112" rx="12" fill="none" stroke="${C.green}" stroke-width="2"/>`;
    t+=bond([cx,cy],Ox,{e:20}); t+=lab(Ox,'O–Cb',{fs:11,r:21});
    t+=bond([cx,cy],M,{e:15}); t+=lab(M,'CH₃',{fs:11,r:15});
    t+=wedge([cx,cy],Co,{e:16,c:C.green}); t+=lab(Co,'CO₂H',{fs:11,c:C.green,fw:700,r:18});
    t+=txt([cx,cy+64],tag,{fs:13,fw:800});
    return t;
  };
  s+=mk(90,254,false,'(S)',sel==='a');
  s+=mk(270,254,true,'(R)',sel==='b');
  s+=txt([90,338],'si on enlève Hₐ',{fs:11,c:C.red,fw:700});
  s+=txt([270,338],'si on enlève Hᵦ',{fs:11,c:C.purple,fw:700});
  s+=txt([180,358],'les deux produits sont ÉNANTIOMÈRES',{fs:11.5,fw:700,c:C.ink2});
  return svg(W,H,s,{alt:'protons énantiotopiques'});
}

/* E2a : (−)-spartéine, squelette tel que dessiné dans les notes */
function figSparteine(){
  const W=360,H=200; let s='';
  const o=[36,52];
  const P=(x,y)=>[o[0]+x,o[1]+y];
  const A1=P(0,26),A2=P(47,0),A3=P(102,25),N1=P(104,73),A5=P(53,98),A6=P(0,75);
  const B1=P(128,5),Cg=P(156,4),B2=P(184,3),N2=P(207,26);
  const B3=P(135,94),Ch=P(161,94),B4=P(187,94);
  const R2=P(243,2),R3=P(284,26),R4=P(284,75),R5=P(245,98),R6=P(209,82);
  const bl={c:C.blue,w:2.4};
  [[A1,A2],[A2,A3],[A3,N1],[N1,A5],[A5,A6],[A6,A1],
   [A3,B1],[B1,Cg],[Cg,B2],[B2,N2],
   [N1,B3],[B3,Ch],[Ch,B4],[B4,R6],
   [N2,R2],[R2,R3],[R3,R4],[R4,R5],[R5,R6],[R6,N2]].forEach(([a,b])=>{ s+=bond(a,b,bl); });
  s+=wedge(B1,B4,Object.assign({wide:6},bl));
  s+=wedge(A3,P(100,-16),Object.assign({e:10},bl)); s+=lab(P(100,-22),'H',{fs:12,c:C.blue,fw:700});
  s+=wedge(R6,P(208,106),Object.assign({e:10},bl)); s+=lab(P(208,112),'H',{fs:12,c:C.blue,fw:700});
  s+=lab(N1,'N',{fs:13,c:C.blue,fw:700}); s+=lab(N2,'N',{fs:13,c:C.blue,fw:700});
  s+=txt([180,H-12],'(−)-spartéine — diamine naturelle, extraite du lupin',{fs:11.5,c:C.blue,fw:700});
  return svg(W,H,s,{alt:'sparteine'});
}
/* E2b : le complexe sec-BuLi · spartéine (schéma) */
function figComplexe(){
  const W=360,H=226; let s='';
  s+=`<path d="M40,64 C40,26 108,18 140,34 C176,52 176,152 140,178 C104,202 40,190 40,148 Z"
       fill="none" stroke="${C.blue}" stroke-width="2.6"/>`;
  s+=txt([92,96],'(−)-spartéine',{fs:12.5,fw:700,c:C.blue});
  s+=txtLines([92,116],['cage rigide,','dissymétrique'],{fs:11,c:C.blue,lh:14});
  s+=lab([160,80],'N',{fs:13,c:C.blue,fw:700});
  s+=lab([160,142],'N',{fs:13,c:C.blue,fw:700});
  s+=lab([222,110],'Li',{fs:14,c:C.purple,fw:700,r:13});
  s+=seg([172,86],[209,105],{c:C.purple,dash:'4 3',w:2.3});
  s+=seg([172,136],[209,117],{c:C.purple,dash:'4 3',w:2.3});
  s+=bond([222,110],[276,110],{s:13,e:22,c:C.green});
  s+=lab([292,110],'sec-Bu',{fs:12,c:C.green,fw:700,r:24});
  s+=stericZone(232,70,44,20,{});
  s+=txt([248,44],'un côté encombré',{fs:10.5,c:C.red,fw:700});
  s+=arrow([250,170],[228,132],{c:C.green,w:2.2});
  s+=txt([268,182],'un côté libre',{fs:10.5,c:C.green,fw:700});
  s+=txt([180,H-10],'schéma : le lithium est logé dans une poche chirale',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'complexe sec-BuLi sparteine'});
}

/* E3 : mécanisme de Hoppe, pas à pas */
const HP={Ca:[200,130],Oe:[160,110],Me:[240,110],Cb:[128,132],Oc:[152,164],
          Ha:[176,168],Hb:[224,168],Li:[226,170]};
function hoppeCore(){
  let s='';
  const {Ca,Oe,Me,Cb,Oc}=HP;
  s+=`<rect x="34" y="84" width="62" height="32" rx="9" fill="none" stroke="${C.ink2}" stroke-width="1.6"/>`;
  s+=txt([65,100],'cycle',{fs:10.5,c:C.ink2});
  s+=bond([96,100],Cb,{e:3});
  s+=dbond(Cb,Oc,{e:9}); s+=lab(Oc,'O',{fs:12});
  s+=bond(Cb,Oe,{e:9}); s+=lab(Oe,'O',{fs:12});
  s+=bond(Oe,Ca,{s:9}); s+=bond(Ca,Me,{e:14}); s+=lab(Me,'CH₃',{fs:11.5,r:14});
  return s;
}
function figHoppeMech(k){
  const W=360,H=262; let s=''; const {Ca,Oc,Ha,Hb,Li}=HP;
  s+=hoppeCore();
  if(k===0){
    s+=wedge(Ca,Ha,{e:11,c:C.red}); s+=lab(Ha,'Hₐ',{fs:12,c:C.red,fw:700,r:12});
    s+=hashb(Ca,Hb,{e:11,c:C.purple}); s+=lab(Hb,'Hᵦ',{fs:12,c:C.purple,fw:700,r:12});
    s+=lab([300,208],'sec-BuLi',{fs:12,c:C.green,fw:700,r:30});
    s+=txt([300,230],'· (−)-spartéine',{fs:11,c:C.blue,fw:700});
    s+=curve([266,196],[238,180],18,{c:C.ink});
    s+=txt([180,26],'1. un seul des deux protons est arraché',{fs:12.5,fw:700});
    s+=txt([180,44],'le complexe chiral distingue Hₐ de Hᵦ',{fs:11,c:C.ink2});
  }
  if(k>=1&&k<=2){
    s+=wedge(Ca,Ha,{e:9,c:C.ink}); s+=lab(Ha,'H',{fs:12,fw:700});
    s+=hashb(Ca,Li,{e:12,c:C.purple}); s+=lab(Li,'Li',{fs:12,c:C.purple,fw:700,r:11});
    s+=arcSeg(Oc,Li,26,{s:11,e:13,c:C.purple,w:2.2});
    s+=txt([132,226],'chélate à 5 chaînons',{fs:11,c:C.purple,fw:700});
    s+=seg([166,218],[184,200],{c:C.purple,dash:'3 3',w:1.2});
  }
  if(k===1){
    s+=txt([180,26],'2. le carbanion est chélaté par le carbamate',{fs:12.5,fw:700});
    s+=txt([180,44],'→ il ne s\'épimérise pas : configuration stable',{fs:11,c:C.ink2});
  }
  if(k===2){
    s+=lab([308,200],'CO₂',{fs:13,c:C.green,fw:700,r:18});
    s+=curve([282,196],[244,180],16,{c:C.green});
    s+=txt([180,26],'3. CO₂ prend exactement la place du lithium',{fs:12.5,fw:700});
    s+=txt([180,44],'même face : la configuration est RETENUE',{fs:11,c:C.green,fw:700});
  }
  if(k===3){
    s+=wedge(Ca,Ha,{e:9,c:C.ink}); s+=lab(Ha,'H',{fs:12,fw:700});
    s+=hashb(Ca,[230,176],{e:18,c:C.green});
    s+=lab([234,182],'CO₂H',{fs:12,c:C.green,fw:700,r:21});
    s+=txt([180,26],'4. après HCl : l\'acide, e.e. > 95 %',{fs:12.5,fw:700});
    s+=txt([180,44],'descripteur (R) — mais attention, voir la section suivante',{fs:11,c:C.ink2});
  }
  return svg(W,H,s,{alt:'mécanisme de Hoppe, étape '+(k+1)});
}

/* E4 : le descripteur change alors que la configuration ne change pas */
function figCIPswap(){
  const W=360,H=270; let s='';
  const panel=(cx,title,items,col)=>{
    let t='';
    t+=`<rect x="${cx-84}" y="36" width="168" height="196" rx="14" fill="none" stroke="${col}" stroke-width="2"/>`;
    t+=txt([cx,58],title,{fs:12.5,fw:700,c:col});
    items.forEach((it,i)=>{
      t+=txt([cx-66,90+i*32],String(i+1),{fs:13,fw:800,c:col,anchor:'start'});
      t+=txt([cx-44,90+i*32],it,{fs:12.5,anchor:'start'});
    });
    return t;
  };
  s+=txt([180,18],'Même molécule, même géométrie — priorités différentes',{fs:12,fw:700});
  s+=panel(94,'intermédiaire lithié',['O du carbamate','CH₃','Li  (Z = 3)','H'],C.purple);
  s+=panel(266,'produit carboxylé',['O du carbamate','CO₂H','CH₃','H'],C.green);
  s+=arrow([182,140],[194,140],{c:C.ink2,w:2});
  s+=txtLines([180,250],['Li était 3ᵉ, CO₂H devient 2ᵉ : les rangs 2 et 3 s\'échangent.',
    'Le descripteur bascule alors que rien n\'a bougé dans l\'espace.'],{fs:11,c:C.ink2,lh:15});
  return svg(W,H,s,{alt:'inversion du descripteur CIP'});
}
