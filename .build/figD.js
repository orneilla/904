
/* ==========================================================================
   Figures — auxiliaire d'Ellman
   ========================================================================== */

/* petit groupe tert-butyle bleu */
function tBu(P,dir,wedgeType){
  const tip=add(P,[dir[0],dir[1]]);
  let s='';
  s+= wedgeType==='hash' ? hashb(P,tip,{e:11,c:C.blue}) :
      wedgeType==='wedge'? wedge(P,tip,{e:11,c:C.blue}) : bond(P,tip,{e:11,c:C.blue});
  s+=lab(tip,'tBu',{fs:12,c:C.blue,fw:700,r:15});
  return s;
}

/* D1 : condensation aldéhyde + sulfinamide, rôle du desséchant */
function figEllmanEq(mode){
  const W=360,H=250,avec=(mode==='avec'); let s='';
  /* aldéhyde */
  const a1=[26,86],a2=[52,70],a3=[78,86];
  s+=bond(a1,a2,{}); s+=bond(a2,a3,{});
  s+=dbond(a3,[104,70],{e:9}); s+=lab([104,70],'O',{fs:12.5});
  s+=bond(a3,[78,114],{e:9}); s+=lab([78,114],'H',{fs:12});
  s+=txt([62,138],'propanal',{fs:10.5,c:C.ink2});
  s+=txt([128,90],'+',{fs:17,fw:700,c:C.ink2});
  /* sulfinamide */
  const Sp=[186,88];
  s+=lab(Sp,'S',{fs:15,fw:700,c:C.blue});
  s+=tBu(Sp,[-4,-40],'wedge');
  s+=dbond(Sp,[216,104],{s:10,e:9,c:C.blue}); s+=lab([216,104],'O',{fs:12.5,c:C.blue});
  s+=bond(Sp,[158,108],{s:10,e:16,c:C.blue}); s+=lab([158,108],'NH₂',{fs:12,c:C.blue,r:17});
  s+=txt([186,138],'(R)-tert-butanesulfinamide',{fs:10.5,c:C.blue});
  /* équilibre */
  const y=176;
  s+=arrow([96,y-6],[214,y-6],{c:avec?C.green:C.ink2,w:avec?3:1.6});
  s+=arrow([214,y+8],[96,y+8],{c:avec?C.ink2:C.red,w:avec?1.2:3});
  s+=txt([155,y-20],'MgSO₄, CH₂Cl₂',{fs:11.5,fw:700});
  /* produits */
  s+=txt([278,y-8],'imine',{fs:12,fw:700});
  s+=txt([278,y+10],'+  H₂O',{fs:12,fw:700,c:avec?C.grey:C.red});
  if(avec){
    s+=`<rect x="238" y="212" width="86" height="28" rx="9" fill="none" stroke="${C.green}" stroke-width="2"/>`;
    s+=txt([281,226],'MgSO₄ · n H₂O',{fs:10.5,c:C.green,fw:700});
    s+=arrow([292,196],[288,208],{c:C.green,w:2});
    s+=txt([140,226],'l\'eau est piégée → l\'équilibre avance',{fs:11,fw:700,c:C.green});
  } else {
    s+=stericZone(288,186,38,15,{});
    s+=txt([150,226],'l\'eau reste là → l\'imine se réhydrolyse',{fs:11,fw:700,c:C.red});
  }
  return svg(W,H,s,{alt:'condensation, desséchant '+mode});
}

/* D1bis : le soufre stéréogène */
function figSoufre(){
  const W=360,H=176; let s='';
  const Sp=[150,92];
  s+=lab(Sp,'S',{fs:19,fw:700,c:C.blue,r:15});
  s+=tBu(Sp,[-52,-46],'wedge');
  s+=dbond(Sp,[210,120],{s:15,e:10,c:C.blue}); s+=lab([210,120],'O',{fs:14,c:C.blue,fw:700});
  s+=bond(Sp,[96,132],{s:14,e:12,c:C.blue}); s+=lab([96,132],'N',{fs:14,c:C.blue,fw:700});
  s+=seg([150,77],[150,58],{c:C.ink2,w:1.2,dash:'2 3'});
  s+=`<circle cx="145" cy="52" r="3.4" fill="${C.ink}"/><circle cx="157" cy="52" r="3.4" fill="${C.ink}"/>`;
  s+=txt([150,34],'doublet libre',{fs:11.5,fw:700});
  s+=txt([258,64],'4 « substituants »',{fs:11.5,fw:700});
  s+=txtLines([258,82],['différents autour de S','⇒ S stéréogène'],{fs:11,c:C.ink2,lh:14});
  s+=txt([180,H-12],'configuration (R) — un seul trait gras suffit à la définir',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'soufre stéréogène'});
}

/* D2/D3 : état de transition chélaté à 6 chaînons */
function figEllmanTS(solv){
  const W=360,H=292,chel=(solv==='dcm'); let s='';
  const cx=180,cy=140,r=58;
  const P=(a)=>polar(cx,cy,r,a);
  const Sp=P(-60), Nn=P(0), Cc=P(60), Rr=P(120), Mg=P(180), Oo=P(240);
  s+=seg([26,42],[18,42],{w:2}); s+=seg([18,42],[18,240],{w:2}); s+=seg([18,240],[26,240],{w:2});
  s+=seg([334,42],[342,42],{w:2}); s+=seg([342,42],[342,240],{w:2}); s+=seg([342,240],[334,240],{w:2});
  s+=txt([350,36],'‡',{fs:15,fw:700});
  s+=bond(Sp,Nn,{s:11,e:11,c:C.blue});
  s+=dbondIn(Nn,Cc,1,{s:11,e:11});
  s+=bond(Cc,Rr,{s:11,e:12,c:C.green,dash:'5 4',w:2.4,op:chel?1:.3});
  s+=bond(Rr,Mg,{s:12,e:14,c:C.purple,op:chel?1:.3});
  s+=bond(Mg,Oo,{s:14,e:11,c:C.purple,dash:'5 4',w:2.4,op:chel?1:.22});
  s+=dbond(Oo,Sp,{s:11,e:11,c:C.blue});
  s+=lab(Sp,'S',{fs:15,fw:700,c:C.blue});
  s+=lab(Nn,'N',{fs:14,fw:700,c:C.blue});
  s+=lab(Cc,'C',{fs:14,fw:700});
  s+=lab(Rr,'R',{fs:14,fw:700,c:C.green});
  s+=lab(Mg,'Mg',{fs:13,fw:700,c:C.purple,r:14});
  s+=lab(Oo,'O',{fs:14,fw:700,c:C.blue});
  s+=tBu(Sp,[-44,-24],'hash');
  s+=bond(Cc,add(Cc,[40,-20]),{s:11,e:13}); s+=lab(add(Cc,[40,-20]),'Et',{fs:12,r:13});
  s+=bond(Mg,add(Mg,[0,32]),{s:14,e:11,c:C.purple}); s+=lab(add(Mg,[0,32]),'Br',{fs:12,c:C.purple,r:12});
  if(chel){
    s+=txt([300,158],'liaison en',{fs:10.5,fw:700,c:C.green});
    s+=txt([300,172],'formation',{fs:10.5,fw:700,c:C.green});
    s+=seg([274,160],[248,150],{c:C.green,dash:'3 3',w:1.2});
    s+=txtLines([180,256],['CH₂Cl₂ : le magnésium tient l\'oxygène du sulfinyle.',
      'Le cycle à 6 se referme, une seule face est accessible.'],{fs:11,c:C.green,lh:15});
  } else {
    s+=lab([104,196],'THF',{fs:11,c:C.red,fw:700,r:16});
    s+=lab([88,152],'THF',{fs:11,c:C.red,fw:700,r:16});
    s+=arrow([118,192],[Mg[0]-20,Mg[1]+2],{c:C.red,w:2});
    s+=arrow([98,162],[Mg[0]-28,Mg[1]-12],{c:C.red,w:2});
    s+=seg([146,174],[164,192],{c:C.red,w:3}); s+=seg([164,174],[146,192],{c:C.red,w:3});
    s+=txtLines([180,256],['THF : le solvant se fixe sur Mg à la place de l\'oxygène.',
      'Le cycle ne se forme plus → sélectivité dégradée ou inversée.'],{fs:11,c:C.red,lh:15});
  }
  s+=txt([180,26],chel?'état de transition chélaté à 6 chaînons':'état de transition ouvert, non chélaté',{fs:12.5,fw:700});
  return svg(W,H,s,{alt:'état de transition Ellman, '+solv});
}

/* D4 : clivage de l'auxiliaire d'Ellman */
function figEllmanCleav(){
  const W=360,H=216; let s='';
  /* sulfinamide produit */
  const Sp=[92,70];
  s+=lab(Sp,'S',{fs:14,fw:700,c:C.blue});
  s+=tBu(Sp,[-2,-38],'wedge');
  s+=dbond(Sp,[122,86],{s:10,e:9,c:C.blue}); s+=lab([122,86],'O',{fs:12,c:C.blue});
  s+=bond(Sp,[64,90],{s:10,e:12,c:C.blue}); s+=lab([64,90],'NH',{fs:11.5,c:C.blue,r:14});
  s+=bond([64,90],[40,112],{s:12,e:3});
  s+=bond([40,112],[14,96],{}); s+=bond([40,112],[44,142],{e:12});
  s+=lab([44,142],'R',{fs:13,c:C.green,fw:700});
  s+=txt([100,168],'sulfinamide (d.r. 93:7 à 96:4)',{fs:10,c:C.ink2});
  /* flèche */
  s+=rxnArrow(160,244,92,['HCl (4 M)'],['MeOH, t.a.'],{fs:11});
  /* amine */
  s+=lab([292,70],'NH₂',{fs:13,fw:700,r:17});
  s+=bond([292,70],[286,102],{s:15,e:3});
  s+=bond([286,102],[258,88],{}); s+=bond([286,102],[292,134],{e:12});
  s+=lab([292,134],'R',{fs:13,c:C.green,fw:700});
  s+=txtLines([282,168],['amine chirale','(chlorhydrate)'],{fs:10.5,c:C.ink2,lh:13});
  s+=txtLines([180,H-22],['le soufre part en tert-butanesulfinate de méthyle : aucune liaison',
    'du carbone stéréogène n\'est touchée (sa configuration n\'est pas dessinée ici)'],{fs:9.5,c:C.ink2,lh:13});
  return svg(W,H,s,{alt:'clivage Ellman'});
}
