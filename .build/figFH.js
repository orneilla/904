
/* ==========================================================================
   Figures — TADDOL / chalcone, puis Sharpless
   ========================================================================== */

/* époxyde trans dessiné sans ambiguïté : sommet O, substituants gras/pointillé */
function epoxTrans(P,lTxt,rTxt,lWedge,tags,col){
  const C3=[P[0]-26,P[1]], C2=[P[0]+26,P[1]], Oo=[P[0],P[1]-30];
  let s='';
  s+=bond(C3,C2,{}); s+=bond(C3,Oo,{e:9}); s+=bond(C2,Oo,{e:9});
  s+=lab(Oo,'O',{fs:13,fw:700});
  const Lp=add(C3,[-34,26]), Rp=add(C2,[34,26]);
  s+= lWedge? wedge(C3,Lp,{e:16}) : hashb(C3,Lp,{e:16});
  s+= lWedge? hashb(C2,Rp,{e:18,c:col||C.ink}) : wedge(C2,Rp,{e:18,c:col||C.ink});
  s+=lab(Lp,lTxt,{fs:11.5,fw:700,r:17});
  s+=lab(Rp,rTxt,{fs:11.5,fw:700,r:19,c:col});
  if(tags){ s+=txt(add(C3,[-20,-6]),tags[0],{fs:12,fw:800,c:C.red});
            s+=txt(add(C2,[20,-6]),tags[1],{fs:12,fw:800,c:C.red}); }
  return s;
}

/* F0 : l'hydroperoxyde de TADDOL */
function figTaddol(){
  const W=360,H=210; let s='';
  const O1=[104,120],C2=[86,94],O3=[110,70],C4=[140,80],C5=[138,112];
  s+=bond(O1,C2,{s:9,e:3}); s+=bond(C2,O3,{s:3,e:9}); s+=bond(O3,C4,{s:9});
  s+=bond(C4,C5,{}); s+=bond(C5,O1,{e:9});
  s+=lab(O1,'O',{fs:12}); s+=lab(O3,'O',{fs:12});
  s+=bond(C2,[56,84],{e:3}); s+=bond(C2,[72,66],{e:3});
  s+=txt([46,78],'Me',{fs:10.5,anchor:'end'}); s+=txt([64,56],'Me',{fs:10.5});
  /* branche OOH */
  const Q1=[176,62];
  s+=wedge(C4,Q1,{e:3,c:C.ink});
  s+=bond(Q1,[206,46],{e:12}); s+=lab([210,44],'OOH',{fs:11.5,fw:700,c:C.green,r:20});
  s+=bond(Q1,[172,30],{e:11}); s+=lab([172,26],'Ph',{fs:11,r:12});
  s+=bond(Q1,[204,78],{e:11}); s+=lab([206,80],'Ph',{fs:11,r:12});
  /* branche OH */
  const Q2=[168,136];
  s+=hashb(C5,Q2,{e:3,c:C.ink});
  s+=bond(Q2,[200,150],{e:11}); s+=lab([204,152],'OH',{fs:11.5,fw:700,r:14});
  s+=bond(Q2,[162,168],{e:11}); s+=lab([162,172],'Ph',{fs:11,r:12});
  s+=bond(Q2,[196,116],{e:11}); s+=lab([198,114],'Ph',{fs:11,r:12});
  s+=txt([180,H-28],'hydroperoxyde dérivé du TADDOL (1,5 équiv)',{fs:11.5,fw:700});
  s+=txt([180,H-10],'la chiralité est dans le diol, l\'oxygène transféré est en vert',{fs:10.5,c:C.ink2});
  return svg(W,H,s,{alt:'TADDOL-OOH'});
}

/* F1 : mécanisme de Weitz–Scheffer, pas à pas */
const WZ={Ph1:[52,116],Cb:[96,132],Ca:[136,114],Cc:[176,132],Oc:[176,164],Ph2:[220,118]};
function weitzSkel(enolate){
  const {Ph1,Cb,Ca,Cc,Oc,Ph2}=WZ; let t='';
  t+=lab(Ph1,'Ph',{fs:12,fw:700,r:15});
  t+=bond(Ph1,Cb,{s:15});
  if(enolate){
    t+=bond(Cb,Ca,{}); t+=dbondIn(Ca,Cc,-1,{});
    t+=bond(Cc,Oc,{e:9}); t+=lab(Oc,'O',{fs:12}); t+=txt([194,168],'⊖',{fs:11,c:C.ink2});
    t+=lab([206,182],'Li',{fs:11,c:C.purple,fw:700,r:10});
  } else {
    t+=dbondIn(Cb,Ca,-1,{}); t+=bond(Ca,Cc,{});
    t+=dbond(Cc,Oc,{e:9}); t+=lab(Oc,'O',{fs:12});
  }
  t+=bond(Cc,Ph2,{e:15}); t+=lab(Ph2,'Ph',{fs:12,fw:700,r:15});
  t+=txt([84,150],'β',{fs:12,fw:800,c:C.ink2});
  t+=txt([152,100],'α',{fs:12,fw:800,c:C.ink2});
  return t;
}
function figWeitz(k){
  const W=360,H=272; let s=''; const {Cb,Ca,Cc,Oc}=WZ;
  if(k===0){
    s+=`<rect x="46" y="96" width="96" height="34" rx="10" fill="none" stroke="${C.blue}" stroke-width="2"/>`;
    s+=txt([94,113],'TADDOL',{fs:12.5,fw:700,c:C.blue});
    s+=bond([142,113],[176,113],{e:3});
    s+=lab([196,113],'O–O–H',{fs:12.5,fw:700,c:C.green,r:28});
    s+=lab([290,160],'n-BuLi',{fs:12.5,fw:700,r:28});
    s+=curve([262,150],[234,124],-18,{c:C.ink});
    s+=txt([180,206],'1. n-BuLi arrache le proton de l\'hydroperoxyde',{fs:12.5,fw:700});
    s+=txtLines([180,232],['On obtient le nucléophile TADDOL–O–O⊖ Li⁺ :',
      'c\'est lui qui porte l\'information chirale.'],{fs:11,c:C.ink2,lh:15});
  }
  if(k===1){
    s+=weitzSkel(false);
    s+=lab([282,72],'ROO⊖',{fs:12.5,fw:700,c:C.green,r:26});
    s+=curve([252,82],[110,118],46,{c:C.green});
    s+=curve([116,130],[158,130],28,{c:C.ink,w:2.2});
    s+=curve([180,146],[192,164],-14,{c:C.ink,w:2.2});
    s+=`<rect x="12" y="196" width="336" height="30" rx="10" fill="none" stroke="${C.red}" stroke-width="2"/>`;
    s+=txt([180,211],'2. addition 1,4 — ÉTAPE STÉRÉODÉTERMINANTE',{fs:12,fw:800,c:C.red});
    s+=txtLines([180,246],['ROO⊖ choisit une face de Cβ. Les deux faces mènent à',
      'des ET diastéréoisomères : c\'est ici que tout se joue.'],{fs:11,c:C.ink2,lh:15});
  }
  if(k===2){
    s+=weitzSkel(true);
    s+=hashb(Cb,[90,174],{e:13,c:C.green}); s+=lab([86,182],'OOR',{fs:11.5,c:C.green,fw:700,r:19});
    s+=`<path d="M104,96 A26,26 0 1 1 132,92" fill="none" stroke="${C.purple}" stroke-width="2.2" marker-end="url(#mkPurple)"/>`;
    s+=txt([118,68],'rotation libre',{fs:11,c:C.purple,fw:700});
    s+=txt([180,216],'3. rotation autour de Cα–Cβ',{fs:12.5,fw:700});
    s+=txtLines([180,240],['La liaison Cα–Cβ est devenue simple : elle tourne.',
      'La molécule choisit la conformation la moins gênée.'],{fs:11,c:C.ink2,lh:15});
  }
  if(k===3){
    s+=weitzSkel(true);
    s+=hashb(Cb,[86,170],{e:11,c:C.green}); s+=lab([84,176],'O',{fs:12,c:C.green,fw:700});
    s+=arcSeg([84,176],[124,196],-16,{s:10,e:16,c:C.green,w:2.2});
    s+=lab([134,200],'OR',{fs:11.5,c:C.green,fw:700,r:15});
    s+=curve([130,132],[92,162],-24,{c:C.green});
    s+=txt([180,228],'4. fermeture : Cα attaque l\'oxygène le plus proche',{fs:12.5,fw:700});
    s+=txtLines([180,250],['RO⊖ (le TADDOL) part : la liaison O–O est faible.',
      'Le cycle à trois se referme.'],{fs:11,c:C.ink2,lh:15});
  }
  if(k===4){
    s+=epoxTrans([150,116],'Ph','C(O)Ph',true,['R','S'],C.ink);
    s+=txt([180,196],'5. époxyde TRANS, e.r. = 98,5 : 1,5',{fs:12.5,fw:700});
    s+=txtLines([180,224],['(2S,3R) — vérifié par RDKit sur ce dessin.',
      'Trans parce que la rotation a choisi la conformation anti.'],{fs:11,c:C.ink2,lh:15});
  }
  return svg(W,H,s,{alt:'mécanisme de Weitz-Scheffer, étape '+(k+1)});
}

/* ---------------- Sharpless ---------------- */
/* H1 : moyen mnémotechnique */
function figSharpMnemo(det){
  const W=360,H=366,plus=(det==='L'); let s='';
  s+=`<path d="M30,158 L104,92 L336,92 L262,158 Z" fill="var(--panel2)" stroke="${C.line}" stroke-width="1.6"/>`;
  const R=[104,126], C3=[140,144], C2=[176,128], C1=[212,146], OH=[246,134];
  s+=lab(R,'C₇H₁₅',{fs:11.5,fw:700,r:24});
  s+=bond(R,C3,{s:24,e:3}); s+=dbondIn(C3,C2,-1,{}); s+=bond(C2,C1,{s:3}); s+=bond(C1,OH,{e:14});
  s+=lab(OH,'OH',{fs:12,fw:700,r:15});
  s+=txt([332,176],'CH₂OH toujours en bas à droite',{fs:10,c:C.ink2,anchor:'end'});
  if(plus){
    s+=arrow([158,226],[158,152],{c:C.green,w:3});
    s+=lab([158,242],'O',{fs:14,c:C.green,fw:700,r:13});
    s+=txt([180,262],'L-(+)-DET : l\'oxygène arrive par-DESSOUS',{fs:12,fw:700,c:C.green});
  } else {
    s+=arrow([158,36],[158,118],{c:C.green,w:3});
    s+=lab([158,22],'O',{fs:14,c:C.green,fw:700,r:13});
    s+=txt([180,262],'D-(−)-DET : l\'oxygène arrive par-DESSUS',{fs:12,fw:700,c:C.green});
  }
  s+=epoxTrans([142,316],'C₇H₁₅','CH₂OH',!plus,plus?['S','S']:['R','R'],C.ink);
  s+=txt([306,310],plus?'(2S,3S)':'(2R,3R)',{fs:13.5,fw:800,c:C.red});
  s+=txt([306,330],'e.e. 96 %',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'mnémotechnique de Sharpless, '+det});
}

/* H2 : cycle catalytique simplifié */
const CYCLE=[
 {t:'Ti(OiPr)₄ + 2 tartrate', d:'Le titane(IV) échange très vite ses alcoolates. Avec le tartrate, l\'équilibre est déplacé vers le chélate : il se forme Ti(tartrate)₂(OR)₂, un complexe neutre. Le tartrate est <b>dianionique</b> (ses deux OH alcooliques sont déprotonés), le titane reste au degré <b>+IV</b>.'},
 {t:'+ t-BuOOH', d:'Un nouvel échange de ligand : le tert-butylhydroperoxyde remplace un alcoolate. C\'est lui qui porte l\'oxygène à transférer.'},
 {t:'+ alcool allylique', d:'Deuxième échange : l\'alcool allylique se fixe à son tour sur le titane, par son OH. Le complexe est alors « complètement chargé ».'},
 {t:'transfert de O', d:'Substrat et oxydant sont maintenant tenus par le <b>même</b> métal, à distance fixe et dans une orientation imposée par le tartrate. L\'oxygène passe de l\'hydroperoxyde à la double liaison : une seule face est atteignable.'},
 {t:'libération', d:'L\'époxy-alcool et le tert-butanolate partent, remplacés par de nouvelles molécules de substrat et d\'oxydant. Le complexe est prêt pour un nouveau tour : il est bien <b>catalytique</b>.'}
];
function figCycle(k){
  const W=360,H=300,cx=180,cy=152,R=100; let s='';
  s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="7 6"/>`;
  for(let i=0;i<5;i++){
    const a=i*72, p=polar(cx,cy,R,a), on=(i===k);
    s+=`<circle cx="${E(p[0])}" cy="${E(p[1])}" r="${on?19:14}" fill="${on?C.purple:'var(--panel)'}" stroke="${on?C.purple:C.line}" stroke-width="2"/>`;
    s+=txt(p,String(i+1),{fs:on?14:12,fw:800,c:on?'#fff':C.ink2});
    const a2=a+36, q1=polar(cx,cy,R,a+12), q2=polar(cx,cy,R,a+60);
    s+=`<path d="M${E(q1[0])},${E(q1[1])} A${R},${R} 0 0 1 ${E(q2[0])},${E(q2[1])}" fill="none" stroke="${C.purple}" stroke-width="2" opacity=".55" marker-end="url(#mkPurple)"/>`;
  }
  s+=lab([cx,cy-12],'Ti(IV)',{fs:14,fw:700,c:C.purple,r:0,nobg:true});
  s+=txt([cx,cy+8],'+ tartrate',{fs:11.5,c:C.blue,fw:700});
  s+=txt([cx,cy+24],'(ligand chiral)',{fs:10,c:C.blue});
  const words=CYCLE[k].t;
  s+=txt([180,278],(k+1)+'. '+words,{fs:12.5,fw:700});
  s+=txt([180,20],'cycle catalytique — 7,3 mol % de Ti seulement',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'cycle catalytique, étape '+(k+1)});
}

/* H3 : tamis moléculaire */
function figSieves(on){
  const W=360,H=232; let s='';
  s+=lab([92,70],'Ti(IV)',{fs:13,fw:700,c:C.purple,r:26});
  s+=txt([92,112],'+ tartrate',{fs:10.5,c:C.blue,fw:700});
  if(on){
    s+=`<rect x="208" y="46" width="118" height="50" rx="12" fill="none" stroke="${C.green}" stroke-width="2.2"/>`;
    s+=txt([267,66],'tamis 4 Å',{fs:12.5,fw:700,c:C.green});
    s+=txt([267,84],'piège H₂O',{fs:11,c:C.green});
    s+=lab([162,150],'H₂O',{fs:12,fw:700,r:18,c:C.ink2});
    s+=arrow([184,142],[238,104],{c:C.green,w:2.4});
    s+=txt([180,196],'le titane reste actif → vraie catalyse',{fs:12.5,fw:700,c:C.green});
    s+=txt([180,216],'7,3 mol % suffisent pour tout transformer',{fs:10.5,c:C.ink2});
  } else {
    s+=lab([252,70],'H₂O',{fs:12,fw:700,r:18,c:C.red});
    s+=arrow([228,70],[128,70],{c:C.red,w:2.6});
    s+=stericZone(92,70,44,26,{});
    s+=txt([180,150],'l\'eau hydrolyse les liaisons Ti–O',{fs:12,fw:700,c:C.red});
    s+=txt([180,170],'→ oxydes / hydroxydes de titane insolubles',{fs:11,c:C.red});
    s+=txt([180,204],'le catalyseur meurt → il en faut 1 équivalent',{fs:12.5,fw:700,c:C.red});
    s+=txt([180,222],'ce n\'est plus de la catalyse',{fs:10.5,c:C.ink2});
  }
  return svg(W,H,s,{alt:'tamis moléculaire '+(on?'présent':'absent')});
}

/* H4 : tartrate en excès ou titane en excès */
function figRatio(mode){
  const W=360,H=256,bon=(mode==='tart'); let s='';
  s+=`<rect x="20" y="36" width="150" height="122" rx="14" fill="none" stroke="${bon?C.green:C.line}" stroke-width="${bon?2.4:1.6}"/>`;
  s+=txt([95,56],'voie chirale',{fs:12.5,fw:700,c:bon?C.green:C.ink2});
  s+=txt([95,92],'Ti · tartrate',{fs:13,fw:700,c:C.purple});
  s+=txt([95,122],'une seule face',{fs:11,c:C.ink2});
  s+=txt([95,142],'→ e.e. élevé',{fs:11.5,fw:700,c:bon?C.green:C.ink2});
  s+=`<rect x="190" y="36" width="150" height="122" rx="14" fill="none" stroke="${bon?C.line:C.red}" stroke-width="${bon?1.6:2.4}"/>`;
  s+=txt([265,56],'voie racémique',{fs:12.5,fw:700,c:bon?C.ink2:C.red});
  s+=txt([265,92],'Ti libre',{fs:13,fw:700,c:C.purple});
  s+=txt([265,122],'aucune chiralité',{fs:11,c:C.ink2});
  s+=txt([265,142],'→ 50 : 50',{fs:11.5,fw:700,c:bon?C.ink2:C.red});
  s+=txt([180,180],'part du substrat qui emprunte chaque voie',{fs:10.5,c:C.ink2});
  const w1=bon?134:52, w2=bon?18:112;
  s+=`<rect x="20" y="190" width="${w1}" height="20" rx="6" fill="${C.green}"/>`;
  s+=`<rect x="${340-w2}" y="190" width="${w2}" height="20" rx="6" fill="${C.red}"/>`;
  s+=txtLines([180,230],
     bon?['tartrate en léger excès (1,1 à 1,2 pour 1 Ti)','→ tout le titane est ligandé']
        :['titane en excès → une partie reste nue','et travaille sans aucune sélectivité'],
     {fs:11.5,fw:700,c:bon?C.green:C.red,lh:16});
  return svg(W,H,s,{alt:'rapport tartrate / titane'});
}
