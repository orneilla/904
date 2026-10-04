
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

/* ==========================================================================
   L'INTERMÉDIAIRE DESSINÉ COMME DANS LE COURS — 2D, à recopier à la main
   --------------------------------------------------------------------------
   Géométrie relevée au pixel sur deux sources :
     • Cours_904.pdf p. 9, « Proposed stereochemical model » : le ligand box
       bleu, le Cu, le cétoester chélaté, la flèche « attack on si face » ;
     • TD_904.pdf, exercice 3, encadré « modèle stéréochimique proposé » :
       le nitronate coordiné en équatorial et l'ester en axial.
   Mêmes orientations, mêmes liaisons grasses / pointillées, même ordre.
   ========================================================================== */

/* --- une oxazoline du ligand box -----------------------------------------
   Pentagone régulier, orienté comme dans le cours :
     O1 en haut (90°), C2 vers l'intérieur (18°), N3 en bas intérieur (−54°),
     C4 en bas extérieur (−126°)  ← c'est lui qui porte le t-Bu,
     C5 en haut extérieur (162°).
   cote = +1 cycle de gauche, −1 cycle de droite (image miroir sur la page).
   Le substituant du « créneau haut » (150°) est toujours en GRAS,
   celui du « créneau bas » (235°) toujours en POINTILLÉ.
   Gauche : t-Bu en haut (gras), H en bas (pointillé)   → C4 est (S)
   Droite : H en haut (gras), t-Bu en bas (pointillé)   → C4 est (S) aussi
   (c'est exactement ce que la prof dessine : le ligand est C₂-symétrique). */
const OXR = 30;
function oxaBox(cen, cote, hautH){
  const P=(a,r)=>[cen[0]+cote*(r||OXR)*Math.cos(a*Math.PI/180),
                  cen[1]-(r||OXR)*Math.sin(a*Math.PI/180)];
  const O1=P(90), C2=P(18), N3=P(-54), C4=P(-126), C5=P(162);
  const sub=(a,d)=>[C4[0]+cote*d*Math.cos(a*Math.PI/180), C4[1]-d*Math.sin(a*Math.PI/180)];
  const B={c:C.blue};
  let s='';
  s+=bond(O1,C2,{s:9,e:1,c:C.blue});
  s+=dbond(C2,N3,{s:1,e:9,c:C.blue});
  s+=bond(N3,C4,{s:9,c:C.blue});
  s+=bond(C4,C5,B);
  s+=bond(C5,O1,{e:9,c:C.blue});
  const hB=sub(150,42), hL=sub(150,58), bB=sub(235,36), bL=sub(235,50);
  s+=wedge(C4,hB,{c:C.blue,e:hautH?7:12});
  s+=hashb(C4,bB,{c:C.blue,e:hautH?12:7});
  s+=lab(hL, hautH?'H':'t-Bu', {fs:12,fw:700,c:C.blue,r:hautH?9:16});
  s+=lab(bL, hautH?'t-Bu':'H', {fs:12,fw:700,c:C.blue,r:hautH?16:9});
  s+=lab(O1,'O',{fs:13,c:C.blue});
  s+=lab(N3,'N',{fs:13,c:C.blue});
  /* le descripteur écrit sur le carbone, comme dans le cours */
  s+=txt([C4[0]+cote*14, C4[1]+14],'S',{fs:11,fw:800,c:C.blue,style:'font-style:italic'});
  return {s:s, C2:C2, N3:N3, C4:C4};
}

/* --- le ligand box complet + le cuivre ------------------------------------ */
function boxCu(){
  const Qb=[180,74], Lc=[118.2,93.9], Rc=[241.8,93.9], Cu=[180,154];
  const G=oxaBox(Lc,1,false), D=oxaBox(Rc,-1,true);
  let s=G.s+D.s;
  /* le pont C(Me)₂ */
  s+=bond(G.C2,Qb,{s:1,c:C.blue}); s+=bond(D.C2,Qb,{s:1,c:C.blue});
  s+=seg(Qb,[162,51],{c:C.blue,w:2.2}); s+=lab([154,42],'Me',{fs:12,fw:700,c:C.blue,r:13});
  s+=seg(Qb,[198,51],{c:C.blue,w:2.2}); s+=lab([206,42],'Me',{fs:12,fw:700,c:C.blue,r:13});
  /* les deux liaisons de coordination N → Cu */
  s+=bond(G.N3,Cu,{s:10,e:17,c:C.purple,w:2.2});
  s+=bond(D.N3,Cu,{s:10,e:17,c:C.purple,w:2.2});
  s+=lab(Cu,'Cu',{fs:15,fw:800,c:C.purple,r:16});
  return {s:s, Cu:Cu, NG:G.N3, ND:D.N3};
}

/* le crochet [ ]²⁺ ‡ du cours, à droite */
function crochetTS(y0,y1,dague){
  let s=`<path d="M324,${y0} L336,${y0} L336,${y1}" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  s+=txt([340,y0-4],'2+',{fs:10,fw:700,anchor:'start'});
  if(dague) s+=txt([341,y0-18],'‡',{fs:14,fw:800,anchor:'start'});
  return s;
}

/* k = 0 : l'intermédiaire nu et annoté — k = 1 : l'attaque et le produit */
function figInterm3(k){
  const W=360, H=(k===0?462:500); let s='';
  s+=txt([180,17], k===0 ? 'L’intermédiaire — comme dans le cours'
                         : 'Où ça attaque — comme dans le cours',{fs:13,fw:800});
  /* --- repères du bas ---------------------------------------------------- */
  const Cu=[180,154], Oket=[128,198], Onit=[234,196], Oax=[181,224],
        Cket=[112,260], Cest=[170,284], Nnit=[268,232], O2=[312,246], Cnit=[248,278];
  /* le plan équatorial, en transparence, AVANT tout le reste */
  if(k===0){
    s+=`<path d="M135.8,118.2 L224.2,118.2 L${Onit[0]},${Onit[1]} L${Oket[0]},${Oket[1]} Z"`
      +` fill="${C.purple}" opacity=".10" stroke="${C.purple}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  }
  /* --- le ligand box + Cu ------------------------------------------------- */
  const B=boxCu(); s+=B.s;
  /* --- le cétoester chélaté (noir) ---------------------------------------- */
  s+=bond(Cu,Oket,{s:17,e:10,c:C.purple,w:2.2});
  s+=dbond(Oket,Cket,{s:10,e:2});
  s+=lab(Oket,'O',{fs:13});
  s+=bond(Cket,Cest,{s:2,e:2});
  s+=wedge(Cket,[76,290],{s:2,e:14});
  s+=lab([70,296],'CH₃',{fs:11.5,r:17});
  s+=dbond(Cest,Oax,{s:2,e:10});
  s+=seg(Cu,[Oax[0],Oax[1]-10],{c:C.red,dash:'5 4',w:2});
  s+=lab(Oax,'O',{fs:13,c:C.red});
  s+=bond(Cest,[172,300],{s:2,e:0});
  s+=lab([172,314],'OEt',{fs:12,r:16});
  /* --- le nitronate (vert) ------------------------------------------------ */
  s+=bond(Cu,Onit,{s:17,e:10,c:C.purple,w:2.2});
  s+=bond(Onit,Nnit,{s:10,e:11,c:C.green});
  s+=lab(Onit,'O',{fs:13,c:C.green});
  s+=dbond(Nnit,O2,{s:11,e:10,c:C.green});
  s+=lab(O2,'O',{fs:13,c:C.green});
  s+=bond(Nnit,Cnit,{s:11,e:16,c:C.green});
  s+=lab(Nnit,'N',{fs:13,c:C.green});
  s+=txt([283,218],'⊕',{fs:11,fw:700,c:C.green});
  s+=lab(Cnit,'CH₂',{fs:11.5,fw:700,c:C.green,r:16});
  s+=txt([268,292],'⊖',{fs:12,fw:700,c:C.green});
  s+=crochetTS(46,252,k===1);
  if(k===0){
    s+=txt([196,214],'axiale',{fs:10,fw:700,c:C.red,anchor:'start'});
    s+=txt([180,127],'plan équatorial',{fs:9,fw:700,c:C.purple,op:'.9'});
    s+=`<rect x="14" y="348" width="332" height="100" rx="12" fill="${C.purple}" opacity=".10"/>`;
    s+=txtLines([180,366],
      ['Quatre places ÉQUATORIALES : les 2 N du box,',
       'l’O de la cétone, l’O du nitronate.',
       'Une place AXIALE : l’O de l’ester (en rouge).',
       'Pyramide à base carrée → cétone et nitronate',
       'sont VOISINS, prêts à réagir.'],{fs:11,lh:17,fw:600});
  } else {
    /* la flèche courbe : du CARBONE du nitronate vers le CARBONE de la cétone */
    s+=curve([238,296],[114,270],-132,{c:C.red,w:2.5});
    s+=txt([180,378],'la liaison C–C qui se forme',{fs:10.5,fw:700,c:C.red});
    s+=`<rect x="14" y="392" width="332" height="86" rx="12" fill="${C.green}" opacity=".12"/>`;
    s+=txtLines([180,410],
      ['Les deux t-Bu du ligand (S,S) bouchent la face Re :',
       'le nitronate attaque la face Si de la cétone.',
       'A = 2-hydroxy-2-méthyl-3-nitropropanoate d’éthyle,',
       'de configuration (S) — 95 %, e.e. = 92 %.'],{fs:11,lh:17,fw:600});
  }
  return svg(W,H,s,{alt:'intermédiaire au cuivre, exercice 3'});
}

/* --- exercice 4 : le boronate cyclique, comme dans l'encadré de l'énoncé ---
   Le binaphtyle est vu PAR LA TRANCHE : deux bâtons croisés, le plein devant,
   le pointillé derrière ; Ar à un bout, Br à l'autre — exactement le dessin
   TS1/TS2 de l'énoncé. Le bore porte les deux O du binaphtol, et la chaise à
   six centres part de lui vers la droite.
   k = 0 : TS1 (Ph pseudo-axial, défavorisé) — k = 1 : TS2 (Ph pseudo-éq.). */
function figInterm4(k){
  const W=360, H=444; let s=''; const ts2=(k===1);
  s+=txt([180,18], ts2 ? 'TS2 — le favorisé (à recopier)' : 'TS1 — le défavorisé',
          {fs:13,fw:800,c:ts2?C.green:C.red});
  /* --- le binaphtol vu par la tranche : deux bâtons croisés -------------- */
  s+=seg([44,70],[112,164],{c:C.grey,w:2.6,dash:'3 5'});        /* ARRIÈRE */
  s+=lab([36,60],'Ar',{fs:12,fw:700,c:C.grey,r:13});
  s+=lab([120,176],'Br',{fs:12,fw:700,c:C.grey,r:13});
  s+=seg([44,158],[154,72],{c:C.ink,w:4.6});                     /* AVANT   */
  s+=lab([34,168],'Ar',{fs:12,fw:700,r:13});
  s+=lab([166,56],'Br',{fs:12,fw:700,r:13});
  s+=txt([86,226],'binaphtol vu par la tranche',{fs:9.5,c:C.ink2});
  /* --- les deux oxygènes vers le bore ------------------------------------ */
  const Bo=[186,160], Oh=[179,107], Ob=[136,142];
  s+=wedge([144,80],Oh,{e:11});                       /* O du cycle AVANT   */
  s+=hashb([100,150],Ob,{e:11,c:C.grey});             /* O du cycle ARRIÈRE */
  s+=bond(Oh,Bo,{s:11,e:12}); s+=bond(Ob,Bo,{s:11,e:12});
  s+=lab(Oh,'O',{fs:13}); s+=lab(Ob,'O',{fs:13,c:C.grey});
  s+=lab(Bo,'B',{fs:14,fw:800,c:C.blue,r:12});
  s+=txt([199,149],'⊖',{fs:11,fw:700,c:C.blue});
  /* --- la chaise à six centres : B–O–C(cétone)···Cγ–Cβ=Cα–B -------------- */
  const g=(dx,dy)=>[Bo[0]+dx*0.7, Bo[1]+dy*0.7];
  const Ok=g(84.6,27.6), Cc=g(127,22.7), Cg=g(84.6,73), Cb=g(0,45.4), Ca=g(-42.4,50.3),
        AX=g(127,-21.5), EQ=g(179.3,46.5);
  s+=bond(Bo,Ok,{s:12,e:10,c:C.blue}); s+=lab(Ok,'O',{fs:13});
  s+=dbond(Ok,Cc,{s:10,e:3});
  s+=bond(Cc,Cg,{s:3,e:3,dash:'5 4',w:2.6,c:C.red});
  s+=dbondIn(Cg,Cb,1,{s:3,e:3});
  s+=bond(Cb,Ca,{s:3,e:3});
  s+=bond(Ca,Bo,{s:3,e:12});
  s+=txt([268,240],'C–C qui se forme',{fs:9.5,fw:700,c:C.red});
  /* --- les deux substituants de la cétone -------------------------------- */
  const pPh = ts2 ? EQ : AX, pMe = ts2 ? AX : EQ;
  s+=bond(Cc,pMe,{s:3,e:15}); s+=lab(pMe,'CH₃',{fs:11,r:15});
  s+=bond(Cc,pPh,{s:3,e:12});
  s+=lab(pPh,'Ph',{fs:12.5,fw:800,c:ts2?C.green:C.red,r:13});
  s+=txt([AX[0],AX[1]-22],'pseudo-ax.',{fs:8.5,fw:ts2?500:800,c:ts2?C.ink2:C.red});
  s+=txt([EQ[0]-6,EQ[1]+20],'pseudo-éq.',{fs:8.5,fw:ts2?800:500,c:ts2?C.green:C.ink2});
  if(!ts2){
    s+=stericZone(268,112,38,21,{});
    s+=txt([230,66],'gêne avec le Br',{fs:10.5,fw:800,c:C.red});
  }
  s+=txt([180,272],'chaise de Zimmerman–Traxler à 6 centres',{fs:10.5,c:C.ink2});
  s+=`<rect x="14" y="286" width="332" height="${ts2?96:66}" rx="12"`
    +` fill="${ts2?C.green:C.red}" opacity=".12"/>`;
  if(ts2){
    s+=txtLines([180,304],
      ['Le phényle, le plus gros, est en pseudo-ÉQUATORIAL :',
       'il s’étale vers l’extérieur, loin du bore et loin',
       'des brome en 3,3′. C’est le TS FAVORISÉ.',
       '→ (S)-2-phényl-pent-4-én-2-ol, 83 %, e.e. = 94 %.'],{fs:11,lh:17,fw:600});
    s+=txt([180,404],'Transposition allylique : c’est le carbone TERMINAL',{fs:10.5,fw:700});
    s+=txt([180,422],'de l’allyle qui attaque, pas celui lié au bore.',{fs:10.5,fw:700});
  } else {
    s+=txtLines([180,304],
      ['Le phényle est en pseudo-AXIAL : interactions',
       '1,3-diaxiales avec le bore ET gêne avec le brome',
       'en 3,3′ du binaphtol. Double pénalité → minoritaire.'],{fs:11,lh:17,fw:600});
    s+=txt([180,380],'Les deux TS présentent les deux FACES de la cétone :',{fs:10.5,fw:700});
    s+=txt([180,398],'ils conduisent donc à deux ÉNANTIOMÈRES.',{fs:10.5,fw:700});
  }
  return svg(W,H,s,{alt:'boronate cyclique, exercice 4, '+(ts2?'TS2':'TS1')});
}
