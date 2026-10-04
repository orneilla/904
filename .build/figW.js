
/* ==========================================================================
   FIGURES — TD « catalyse énantiosélective », exercices 3 et 4
   ========================================================================== */

/* flèche de réaction verticale, légende à droite */
function flecheV(x,y1,y2,lignes){
  let s=arrow([x,y1],[x,y2],{w:2.4});
  (lignes||[]).forEach((t,i)=> s+=txt([x+14,y1+10+i*16],t,{fs:11,fw:600,anchor:'start'}));
  return s;
}

/* --- ex.3 : Et3N fabrique le nucléophile ---------------------------------- */
function figNitronate(){
  const W=360,H=210; let s='';
  s+=txt([180,20],'Et₃N ne catalyse pas : il déprotone',{fs:13,fw:800});
  s+=txt([74,78],'CH₃–NO₂',{fs:14,fw:700});
  s+=curve([74,96],[128,96],18,{c:C.green,w:2.2});
  s+=txt([128,118],'Et₃N',{fs:12,fw:700,c:C.green});
  s+=arrow([150,78],[214,78],{w:2.4});
  s+=txt([182,60],'pKa ≈ 10',{fs:10.5,c:C.ink2});
  s+=txt([286,78],'⁻CH₂–NO₂',{fs:14,fw:700,c:C.green});
  s+=txt([286,98],'le nitronate',{fs:11,c:C.green,fw:700});
  s+=`<rect x="18" y="134" width="324" height="62" rx="12" fill="${C.green}" opacity=".11"/>`;
  s+=txtLines([180,154],['Le carbone du nitronate est le NUCLÉOPHILE.',
    'Sans Et₃N, rien ne se passe : le nitrométhane',
    'seul n\'attaque pas une cétone.'],{fs:11.5,lh:17});
  return svg(W,H,s,{alt:'formation du nitronate'});
}

/* --- ex.3 : le modèle au cuivre ------------------------------------------- */
function figCuModele(k){
  const W=360,H=318, cx=176, cy=186; let s='';
  s+=txt([180,20],k===0?'Les cinq places autour du cuivre':'Qui s\'assoit où',{fs:13,fw:800});
  s+=`<path d="M${cx-92},${cy} L${cx},${cy-42} L${cx+92},${cy} L${cx},${cy+42} Z" fill="${C.purple}" opacity=".09" stroke="${C.purple}" stroke-dasharray="5 4"/>`;
  /* la place axiale, en diagonale pour ne rien recouvrir */
  const AX=[cx+70,cy-74];
  s+=seg([cx,cy],AX,{c:C.red,dash:'5 4',w:2});
  s+=lab(AX,k===0?'ax.':'O',{fs:12.5,fw:700,c:C.red,r:14});
  s+=txt([AX[0]+22,AX[1]-16],k===0?'axiale':'ester',{fs:11,fw:700,c:C.red,anchor:'start'});
  s+=lab([cx,cy],'Cu',{fs:15,fw:800,c:C.purple,r:17});
  const site=(x,y,t,c,sub,dy)=>{ let o=bond([cx,cy],[x,y],{s:18,e:15,c:c});
    o+=lab([x,y],t,{fs:12.5,fw:700,c:c,r:14});
    if(sub) o+=txt([x,y+dy],sub,{fs:10.5,c:C.ink2});
    return o; };
  s+=site(cx-92,cy,'N',C.blue,'box',-22);
  s+=site(cx,cy-42,'N',C.blue,'box',-22);
  if(k===0){
    s+=site(cx+92,cy,'éq.',C.ink2,null,0);
    s+=site(cx,cy+42,'éq.',C.ink2,null,0);
    s+=txt([180,262],'4 places ÉQUATORIALES (le losange)',{fs:11.5,fw:700,c:C.purple});
    s+=txt([180,282],'+ 1 place AXIALE, perpendiculaire',{fs:11.5,fw:700,c:C.red});
    s+=txt([180,304],'= pyramide à base carrée',{fs:11,c:C.ink2});
  } else {
    s+=site(cx+92,cy,'O',C.green,'nitronate',22);
    s+=site(cx,cy+42,'O',C.ink,'cétone',22);
    s+=curve([cx+74,cy+16],[cx+14,cy+48],-16,{c:C.green,w:2.4});
    s+=txt([180,262],'nitronate et cétone sont VOISINS',{fs:11.5,fw:800,c:C.green});
    s+=txt([180,280],'il n\'y a qu\'un pas à faire entre les deux',{fs:11,c:C.ink2});
    s+=`<rect x="18" y="292" width="324" height="24" rx="10" fill="${C.ink2}" opacity=".10"/>`;
    s+=txt([180,304],'cycle à 6 : Cu–O–C(cétone)···C(nitronate)–N–O',{fs:10.5,fw:700});
  }
  return svg(W,H,s,{alt:'modèle au cuivre'});
}

/* --- ex.3 : la réaction globale ------------------------------------------- */
function figHenry(){
  const W=360,H=270; let s='';
  s+=txt([180,20],'Exercice 3 — réaction de Henry',{fs:13,fw:800});
  const c=[96,78];
  s+=dbond(c,[96,44],{e:10}); s+=lab([96,42],'O',{fs:13});
  s+=bond(c,[66,96],{e:12}); s+=lab([60,98],'CH₃',{fs:11.5,r:15});
  s+=bond(c,[126,96]); s+=dbond([126,96],[126,130],{e:10}); s+=lab([126,132],'O',{fs:13});
  s+=bond([126,96],[156,78],{e:14}); s+=lab([164,78],'OEt',{fs:11.5,r:18});
  s+=txt([96,120],'cétone',{fs:10.5,c:C.ink2});
  s+=txt([206,90],'+ CH₃NO₂',{fs:13,fw:700,anchor:'start'});
  s+=flecheV(120,152,196,['[Cu((S,S)-t-Bu-box)](OTf)₂','20 mol%','Et₃N 20 mol%, t.a., 16 h']);
  s+=txt([180,222],'A — 95 %, e.e. = 92 %',{fs:12.5,fw:800,c:C.green});
  s+=txt([180,244],'le carbone de la CÉTONE devient stéréogène',{fs:11,c:C.ink2});
  s+=txt([180,262],'(celui de l\'ester reste un ester)',{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'réaction de Henry'});
}

/* --- ex.4 : l'échange de ligands sur le bore ------------------------------ */
function figBoronate(){
  const W=360,H=266; let s='';
  s+=txt([180,20],'D\'où vient le « boronate cyclique »',{fs:13,fw:800});
  s+=txt([86,66],'allyl–B(OiPr)₂',{fs:12.5,fw:700});
  s+=txt([86,88],'achiral',{fs:11,c:C.red,fw:700});
  s+=txt([180,78],'+',{fs:15,fw:700});
  s+=txt([274,66],'BINOL–Br₂',{fs:12.5,fw:700,c:C.blue});
  s+=txt([274,88],'chiral, 15 mol%',{fs:11,c:C.blue,fw:700});
  s+=arrow([180,108],[180,146],{w:2.4});
  s+=txt([196,126],'− 2 iPrOH',{fs:11,anchor:'start',c:C.ink2});
  s+=`<rect x="24" y="160" width="312" height="44" rx="12" fill="${C.blue}" opacity=".12"/>`;
  s+=txt([180,176],'allyl–B(O–BINOL–O)',{fs:13,fw:800,c:C.blue});
  s+=txt([180,194],'un allylborane CHIRAL',{fs:11.5,fw:700,c:C.blue});
  s+=txtLines([180,224],['C\'est lui le vrai réactif. Le diol ne « catalyse » pas',
    'de loin : il devient une partie du réactif, puis repart.'],{fs:11,lh:16,c:C.ink2});
  return svg(W,H,s,{alt:'échange de ligands sur le bore'});
}

/* --- ex.4 : les deux états de transition ---------------------------------- */
/* chaise réelle : projection d'une chaise idéale, tournée de -72° autour de x */
const CH = {Cc:[234.7,136.2], O:[192.3,141.1], B:[107.7,113.5],
            Ca:[65.3,163.8],  Cb:[107.7,158.9], Cg:[192.3,186.5],
            AX:[234.7,92], EQ:[287,160], AXB:[107.7,69]};
function figTS(k){
  const W=360,H=312; let s='';
  const ts1=(k===0);
  s+=txt([180,20],ts1?'TS1 — phényle PSEUDO-AXIAL':'TS2 — phényle PSEUDO-ÉQUATORIAL',{fs:13,fw:800,c:ts1?C.red:C.green});
  /* le cycle à six centres */
  s+=bond(CH.B,CH.O,{s:12,e:11,c:C.blue});
  s+=lab(CH.O,'O',{fs:12.5});
  s+=dbond(CH.O,CH.Cc,{s:11,e:6});
  s+=bond(CH.Cc,CH.Cg,{s:6,e:4,dash:'5 4',w:2.4,c:C.red});
  s+=dbondIn(CH.Cg,CH.Cb,-1,{});
  s+=bond(CH.Cb,CH.Ca); s+=bond(CH.Ca,CH.B,{e:12});
  s+=lab(CH.B,'B',{fs:13,fw:800,c:C.blue,r:13});
  /* la liaison axiale du bore : c'est le binaphtol */
  s+=seg(CH.B,CH.AXB,{c:C.blue,w:2.6});
  s+=lab(CH.AXB,'O–BINOL',{fs:10.5,fw:700,c:C.blue,r:30});
  /* substituants du carbonyle */
  const ph = ts1 ? CH.AX : CH.EQ, me = ts1 ? CH.EQ : CH.AX;
  s+=bond(CH.Cc,me,{s:6,e:14}); s+=lab(me,'CH₃',{fs:11.5,r:15});
  s+=bond(CH.Cc,ph,{s:6,e:12}); s+=lab(ph,'Ph',{fs:12.5,fw:800,c:ts1?C.red:C.green,r:13});
  if(ts1){
    s+=stericZone(171,80,74,30,{});
    s+=txt([171,46],'ils se gênent',{fs:11.5,fw:800,c:C.red});
    s+=txt([180,236],'le phényle axial pointe droit vers le binaphtol',{fs:11,c:C.ink2});
    s+=txt([180,256],'(interaction 1,3-diaxiale avec le bore)',{fs:11,c:C.ink2});
    s+=`<rect x="24" y="270" width="312" height="30" rx="12" fill="${C.red}" opacity=".13"/>`;
    s+=txt([180,285],'état de transition DÉFAVORISÉ → minoritaire',{fs:12,fw:800,c:C.red});
  } else {
    s+=txt([180,236],'le phényle équatorial s\'étale vers l\'extérieur,',{fs:11,c:C.ink2});
    s+=txt([180,256],'loin du bore et loin des brome du binaphtol',{fs:11,c:C.ink2});
    s+=`<rect x="24" y="270" width="312" height="30" rx="12" fill="${C.green}" opacity=".13"/>`;
    s+=txt([180,285],'état de transition FAVORISÉ → majoritaire',{fs:12,fw:800,c:C.green});
  }
  s+=txt([120,212],'chaise à 6 centres',{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'état de transition '+(ts1?'TS1':'TS2')});
}

/* --- ex.4 : la réaction globale ------------------------------------------- */
function figAllyl(){
  const W=360,H=256; let s='';
  s+=txt([180,20],'Exercice 4 — allylboration d\'une cétone',{fs:13,fw:800});
  const c=[108,80];
  s+=dbond(c,[108,46],{e:10}); s+=lab([108,44],'O',{fs:13});
  s+=bond(c,[78,98],{e:12}); s+=lab([70,100],'Ph',{fs:12,r:13});
  s+=bond(c,[138,98],{e:14}); s+=lab([146,100],'CH₃',{fs:11.5,r:16});
  s+=txt([232,82],'+ allyl–B(OiPr)₂',{fs:12.5,fw:700,anchor:'start'});
  s+=flecheV(120,128,180,['(aS)-3,3′-Br₂-BINOL','15 mol%','PhCH₃:PhCF₃ 1:3, −35 °C']);
  s+=txt([180,206],'83 %, e.e. = 94 %',{fs:12.5,fw:800,c:C.green});
  s+=txt([180,228],'un alcool TERTIAIRE : quatre groupes différents',{fs:11,c:C.ink2});
  s+=txt([180,246],'OH, CH₃, Ph, CH₂–CH=CH₂',{fs:11,fw:700});
  return svg(W,H,s,{alt:'allylboration d\'une cétone'});
}
