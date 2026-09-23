
/* ==========================================================================
   FIGURES 2D du support « Voir en 3D »
   ========================================================================== */
function figVolant(k){
  const W=360,H=272,cx=180,cy=126,R=64; let s='';
  const horaire = (k===0);
  s+=txt([180,20],horaire?'Sens des aiguilles d\'une montre':'Sens inverse des aiguilles',{fs:13,fw:800});
  /* le volant */
  s+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.ink2}" stroke-width="6" opacity=".35"/>`;
  const pos=[0,120,240].map(a=>polar(cx,cy,R,a));
  const ordre = horaire ? [0,1,2] : [0,2,1];
  const cols=[C.red,C.ink,C.ink];
  ordre.forEach((p,i)=>{ s+=lab(pos[p],String(i+1),{fs:16,fw:800,c:cols[i],r:17,bg:'var(--panel2)'}); });
  /* la colonne de direction : le n°4, vers le fond */
  s+=`<circle cx="${cx}" cy="${cy}" r="17" fill="var(--panel2)" stroke="${C.grey}" stroke-width="2" stroke-dasharray="4 3"/>`;
  s+=txt([cx,cy],'4',{fs:15,fw:800,c:C.grey});
  s+=txt([cx,cy+R+30],'le n° 4 part vers le fond',{fs:11,c:C.grey,fw:600});
  /* la flèche de sens */
  const r2=R+22, dep=polar(cx,cy,r2,horaire?24:336), arr=polar(cx,cy,r2,horaire?96:264);
  s+=`<path d="M${E(dep[0])},${E(dep[1])} A${r2},${r2} 0 0 ${horaire?1:0} ${E(arr[0])},${E(arr[1])}"`
   +` fill="none" stroke="${C.green}" stroke-width="3" stroke-linecap="round" marker-end="url(#mkGreen)"/>`;
  s+=`<rect x="70" y="232" width="220" height="32" rx="16" fill="${horaire?C.green:C.blue}" opacity=".14"/>`;
  s+=txt([180,248],horaire?'configuration R':'configuration S',{fs:16,fw:800,c:horaire?C.green:C.blue});
  return svg(W,H,s,{alt:'volant '+(horaire?'R':'S')});
}

function figEchange(){
  const W=360,H=264; let s='';
  const dessine=(cx,cy,ordre)=>{
    let t='';
    const UL=[cx-34,cy-20], UR=[cx+34,cy-20], AV=[cx,cy+34], AR=[cx-2,cy-40];
    t+=bond([cx,cy],UL,{e:14}); t+=bond([cx,cy],UR,{e:14});
    t+=wedge([cx,cy],AV,{e:14}); t+=hashb([cx,cy],AR,{e:14});
    t+=lab(UL,ordre[0],{fs:14,fw:800,c:C.red,r:13});
    t+=lab(UR,ordre[1],{fs:14,fw:800,r:13});
    t+=lab(AV,ordre[2],{fs:14,fw:800,r:13});
    t+=lab(AR,ordre[3],{fs:14,fw:800,c:C.grey,r:13});
    return t;
  };
  s+=txt([180,20],'Échanger deux groupes inverse la lettre',{fs:13,fw:800});
  s+=dessine(86,112,['1','2','3','4']);
  s+=txt([86,176],'on lit : R',{fs:13,fw:800,c:C.green});
  s+=arrow([150,112],[212,112],{c:C.red,w:2.6});
  s+=txt([181,92],'on échange',{fs:11,fw:700,c:C.red});
  s+=txt([181,132],'2 et 3',{fs:11,fw:700,c:C.red});
  s+=dessine(276,112,['1','3','2','4']);
  s+=txt([276,176],'on lit : S',{fs:13,fw:800,c:C.blue});
  s+=`<rect x="20" y="200" width="320" height="52" rx="12" fill="${C.purple}" opacity=".11"/>`;
  s+=txt([180,218],'1 échange → lettre inversée',{fs:12.5,fw:800,c:C.purple});
  s+=txt([180,238],'2 échanges → lettre inchangée',{fs:12.5,fw:800,c:C.purple});
  return svg(W,H,s,{alt:'effet d\'un échange de deux groupes'});
}

function figMainDroite(){
  const W=360,H=214; let s='';
  s+=txt([180,22],'Le truc de la main droite',{fs:13.5,fw:800});
  s+=`<rect x="18" y="40" width="324" height="60" rx="12" fill="${C.green}" opacity=".11"/>`;
  s+=txtLines([180,60],['Ferme ta main DROITE, pouce levé.','Pointe le pouce vers le FOND (loin de toi).'],{fs:12.5,lh:18,fw:600});
  s+=`<rect x="18" y="110" width="324" height="44" rx="12" fill="${C.green}" opacity=".18"/>`;
  s+=txt([180,132],'tes doigts s\'enroulent dans le sens R',{fs:13,fw:800,c:C.green});
  s+=`<rect x="18" y="164" width="324" height="40" rx="12" fill="${C.blue}" opacity=".13"/>`;
  s+=txt([180,184],'main GAUCHE, même geste → sens S',{fs:12.5,fw:800,c:C.blue});
  return svg(W,H,s,{alt:'règle de la main droite'});
}

function figDeuxProduits(){
  const W=360,H=250; let s='';
  s+=txt([180,20],'Une cétone, deux attaques possibles',{fs:13,fw:800});
  const co=[180,110];
  s+=dbond(co,[180,72],{e:10}); s+=lab([180,70],'O',{fs:13});
  s+=bond(co,[142,132],{e:12}); s+=lab([136,136],'CH₃',{fs:11.5,r:15});
  s+=bond(co,[218,132],{e:12}); s+=lab([228,136],'chaîne',{fs:11,r:20});
  s+=arrow([116,60],[162,96],{c:C.green,w:2.6});
  s+=txt([92,48],'face avant',{fs:11,fw:700,c:C.green});
  s+=arrow([244,60],[198,96],{c:C.red,w:2.6});
  s+=txt([270,48],'face arrière',{fs:11,fw:700,c:C.red});
  s+=`<rect x="18" y="166" width="156" height="66" rx="12" fill="${C.green}" opacity=".12"/>`;
  s+=txtLines([96,188],['produit (S)','alcool « main gauche »'],{fs:11.5,lh:17,fw:700,c:C.green});
  s+=`<rect x="186" y="166" width="156" height="66" rx="12" fill="${C.red}" opacity=".12"/>`;
  s+=txtLines([264,188],['produit (R)','alcool « main droite »'],{fs:11.5,lh:17,fw:700,c:C.red});
  s+=txt([180,246],'deux énantiomères → les faces sont ÉNANTIOTOPES',{fs:11,fw:700});
  return svg(W,H,s,{alt:'attaque des deux faces d\'une cétone'});
}

function figModeles(){
  const W=360,H=250; let s='';
  s+=txt([180,20],'Fabrique-toi un modèle en 2 minutes',{fs:13.5,fw:800});
  const ligne=(y,t1,t2,col)=>`<rect x="18" y="${y}" width="324" height="48" rx="11" fill="${col}" opacity=".11"/>`
   +txt([180,y+17],t1,{fs:12.5,fw:800,c:col})+txt([180,y+34],t2,{fs:11,c:C.ink2});
  s+=ligne(40,'Une gomme + 4 cure-dents','plante 4 cure-dents dans une gomme, le plus écartés possible',C.blue);
  s+=ligne(96,'Pâte à modeler + allumettes','4 couleurs de pâte au bout des allumettes = 4 groupes',C.green);
  s+=ligne(152,'Rien du tout : tes doigts','pouce, index, majeur, annulaire écartés = un tétraèdre',C.purple);
  s+=txt([180,226],'Les chimistes professionnels ont tous une boîte de modèles',{fs:11,c:C.ink2});
  s+=txt([180,242],'sur leur bureau. Ce n\'est pas de la triche.',{fs:11,c:C.ink2});
  return svg(W,H,s,{alt:'fabriquer un modèle moléculaire'});
}
