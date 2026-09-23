/* ==========================================================================
   1. Petite bibliothèque de dessin SVG (aucune dépendance externe)
   ========================================================================== */
const C = {
  ink:'var(--ink)', ink2:'var(--ink2)',
  blue:'var(--blue)', green:'var(--green)', purple:'var(--purple)',
  red:'var(--red)', grey:'var(--grey)', line:'var(--line)'
};
const MK = {ink:'mkInk', blue:'mkBlue', green:'mkGreen', purple:'mkPurple', red:'mkRed', grey:'mkGrey'};
function mkName(c){
  if(c===C.blue) return MK.blue; if(c===C.green) return MK.green;
  if(c===C.purple) return MK.purple; if(c===C.red) return MK.red;
  if(c===C.grey) return MK.grey; return MK.ink;
}
/* définitions (marqueurs de flèche + hachures) injectées dans chaque <svg> */
const DEFS = `<defs>
 ${['Ink','Blue','Green','Purple','Red','Grey'].map((n,i)=>{
   const col=[C.ink,C.blue,C.green,C.purple,C.red,C.grey][i];
   return `<marker id="mk${n}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="5.2" markerHeight="5.2" orient="auto-start-reverse">
     <path d="M0,1 L9.5,5 L0,9 L2.6,5 Z" fill="${col}"/></marker>
   <marker id="hk${n}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
     <path d="M0,1.2 L9.5,5" stroke="${col}" stroke-width="1.4" fill="none" stroke-linecap="round"/></marker>`;
 }).join('')}
 <pattern id="hatchRed" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
   <line x1="0" y1="0" x2="0" y2="7" stroke="${C.red}" stroke-width="2" opacity=".5"/>
 </pattern>
</defs>`;

const E = (n)=>Math.round(n*100)/100;
const Rgas=8.314;                       /* J·mol⁻¹·K⁻¹ */
function erFromDdG(ddG_kJ,T_K){ return Math.exp((ddG_kJ*1000)/(Rgas*T_K)); }

/* --- liaisons ------------------------------------------------------------ */
function seg(a,b,o){ o=o||{};
  return `<line x1="${E(a[0])}" y1="${E(a[1])}" x2="${E(b[0])}" y2="${E(b[1])}"`
       + ` stroke="${o.c||C.ink}" stroke-width="${o.w||2.1}" stroke-linecap="round"`
       + (o.dash?` stroke-dasharray="${o.dash}"`:'')
       + (o.op?` opacity="${o.op}"`:'') + `/>`;
}
function unit(a,b){ const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy)||1; return [dx/L,dy/L,L]; }
function norm(a,b,d){ const [ux,uy]=unit(a,b); return [-uy*d, ux*d]; }
/* raccourcit une liaison aux deux bouts (pour laisser la place aux étiquettes) */
function trim(a,b,s,e){ const [ux,uy]=unit(a,b); return [[a[0]+ux*(s||0),a[1]+uy*(s||0)],[b[0]-ux*(e||0),b[1]-uy*(e||0)]]; }
function bond(a,b,o){ o=o||{}; const [p,q]=trim(a,b,o.s,o.e); return seg(p,q,o); }
function dbond(a,b,o){ o=o||{}; const [p,q]=trim(a,b,o.s,o.e); const n=norm(p,q,o.gap||3.1);
  return seg([p[0]+n[0],p[1]+n[1]],[q[0]+n[0],q[1]+n[1]],o)+seg([p[0]-n[0],p[1]-n[1]],[q[0]-n[0],q[1]-n[1]],o); }
/* double liaison "intérieure" : deuxième trait raccourci, décalé d'un seul côté */
function dbondIn(a,b,side,o){ o=o||{}; const [p,q]=trim(a,b,o.s,o.e); const n=norm(p,q,(o.gap||3.4)*(side||1));
  const [ux,uy]=unit(p,q);
  return seg(p,q,o)+seg([p[0]+n[0]+ux*3,p[1]+n[1]+uy*3],[q[0]+n[0]-ux*3,q[1]+n[1]-uy*3],o); }
function wedge(a,b,o){ o=o||{}; const [p,q]=trim(a,b,o.s,o.e); const n=norm(p,q,o.wide||4.6);
  return `<polygon points="${E(p[0])},${E(p[1])} ${E(q[0]+n[0])},${E(q[1]+n[1])} ${E(q[0]-n[0])},${E(q[1]-n[1])}" fill="${o.c||C.ink}"/>`; }
function hashb(a,b,o){ o=o||{}; const [p,q]=trim(a,b,o.s,o.e); const [ux,uy,L]=unit(p,q);
  const n=6, out=[];
  for(let i=1;i<=n;i++){ const t=i/n, w=1.1+ (o.wide||4.6)*t;
    const cx=p[0]+ux*L*t, cy=p[1]+uy*L*t, nx=-uy*w, ny=ux*w;
    out.push(seg([cx+nx,cy+ny],[cx-nx,cy-ny],{c:o.c||C.ink,w:1.9}));
  } return out.join(''); }

/* --- étiquettes d'atome -------------------------------------------------- */
function lab(p,t,o){ o=o||{};
  const fs=o.fs||15, r=o.r||(fs*0.72);
  const bgc = o.nobg?'none':(o.bg||'var(--panel)');
  return `<circle cx="${E(p[0])}" cy="${E(p[1])}" r="${E(r)}" fill="${bgc}"/>`
   + `<text x="${E(p[0])}" y="${E(p[1])}" text-anchor="middle" dominant-baseline="central"`
   + ` font-size="${fs}" font-weight="${o.fw||600}" fill="${o.c||C.ink}"`
   + ` font-family="system-ui,-apple-system,sans-serif">${t}</text>`;
}
function txt(p,t,o){ o=o||{};
  return `<text x="${E(p[0])}" y="${E(p[1])}" text-anchor="${o.anchor||'middle'}" dominant-baseline="${o.base||'central'}"`
   + ` font-size="${o.fs||13}" font-weight="${o.fw||500}" fill="${o.c||C.ink}" ${o.op?`opacity="${o.op}"`:''}`
   + ` font-family="system-ui,-apple-system,sans-serif"${o.style?` style="${o.style}"`:''}>${t}</text>`;
}
function txtLines(p,lines,o){ o=o||{}; const lh=o.lh||14;
  return lines.map((t,i)=>txt([p[0],p[1]+i*lh],t,o)).join(''); }
/* --- flèches ------------------------------------------------------------- */
function arrow(a,b,o){ o=o||{}; const c=o.c||C.ink;
  return `<line x1="${E(a[0])}" y1="${E(a[1])}" x2="${E(b[0])}" y2="${E(b[1])}" stroke="${c}"`
   + ` stroke-width="${o.w||2.4}" stroke-linecap="round" ${o.dash?`stroke-dasharray="${o.dash}"`:''}`
   + ` marker-end="url(#${mkName(c)})"/>`;
}
/* flèche courbe : bow = flèche (bombement) perpendiculaire */
function curve(a,b,bow,o){ o=o||{}; const c=o.c||C.ink;
  const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2; const n=norm(a,b,bow);
  const cx=mx+n[0], cy=my+n[1];
  const head = o.half ? `url(#${mkName(c).replace('mk','hk')})` : `url(#${mkName(c)})`;
  return `<path d="M${E(a[0])},${E(a[1])} Q${E(cx)},${E(cy)} ${E(b[0])},${E(b[1])}" fill="none"`
   + ` stroke="${c}" stroke-width="${o.w||2.1}" stroke-linecap="round" marker-end="${head}"/>`;
}
/* liaison de coordination courbe (pointillés, sans tête) */
function arcSeg(a,b,bow,o){ o=o||{};
  const [p,q]=trim(a,b,o.s,o.e);
  const mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2, n=norm(p,q,bow);
  return `<path d="M${E(p[0])},${E(p[1])} Q${E(mx+n[0])},${E(my+n[1])} ${E(q[0])},${E(q[1])}" fill="none"`
   + ` stroke="${o.c||C.ink}" stroke-width="${o.w||2.2}" stroke-dasharray="${o.dash||'4 3'}"/>`;
}
/* flèche de réaction horizontale avec légende */
function rxnArrow(x1,x2,y,top,bot,o){ o=o||{};
  let s = arrow([x1,y],[x2,y],{c:o.c||C.ink,w:2.2});
  const mx=(x1+x2)/2;
  (top||[]).forEach((t,i)=> s+=txt([mx,y-13-i*13],t,{fs:o.fs||11.5,c:o.tc||C.ink}));
  (bot||[]).forEach((t,i)=> s+=txt([mx,y+13+i*13],t,{fs:o.fs||11.5,c:o.bc||C.ink2}));
  return s;
}
function polar(cx,cy,r,adeg){const a=(adeg-90)*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function sectorPath(cx,cy,r0,r1,a0,a1){
  const p1=polar(cx,cy,r1,a0),p2=polar(cx,cy,r1,a1),p3=polar(cx,cy,r0,a1),p4=polar(cx,cy,r0,a0);
  const big=(a1-a0)>180?1:0;
  return `M${E(p1[0])},${E(p1[1])} A${r1},${r1} 0 ${big} 1 ${E(p2[0])},${E(p2[1])} L${E(p3[0])},${E(p3[1])} A${r0},${r0} 0 ${big} 0 ${E(p4[0])},${E(p4[1])} Z`;
}

/* --- zones --------------------------------------------------------------- */
function stericZone(cx,cy,rx,ry,o){ o=o||{};
  return `<ellipse cx="${E(cx)}" cy="${E(cy)}" rx="${E(rx)}" ry="${E(ry)}" fill="var(--redzone)"`
   + ` stroke="${C.red}" stroke-width="1.4" stroke-dasharray="4 3"${o.rot?` transform="rotate(${o.rot} ${E(cx)} ${E(cy)})"`:''}/>`;
}
function blockedFace(pathD){ return `<path d="${pathD}" fill="var(--greyface)" stroke="${C.grey}" stroke-width="1.2" stroke-dasharray="5 4"/>`; }

function svg(w,h,body,o){ o=o||{};
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.alt||'schéma'}" xmlns="http://www.w3.org/2000/svg">`
   + DEFS + body + `</svg>`;
}

/* ==========================================================================
   2. Briques chimiques réutilisables
   ========================================================================== */
const add=(p,d)=>[p[0]+d[0],p[1]+d[1]];

/* Carbone stéréogène « cartoon » : 2 liaisons dans le plan (haut-gauche et
   haut-droite) + 1 liaison gras/pointillé vers le bas ; H implicite.
   Cette disposition est non dégénérée, contrairement à la « croix ». */
function stereoC(p,o){
  o=o||{};
  const L=add(p,[-34,-16]), R=add(p,[34,-16]), D=add(p,[0,34]);
  let s='';
  s+=bond(p,L,{e:o.l?13:0}); s+=bond(p,R,{e:o.r?13:0});
  s+= o.hash ? hashb(p,D,{e:12,c:o.dC||C.ink}) : wedge(p,D,{e:12,c:o.dC||C.ink});
  if(o.l) s+=lab(L,o.l,{fs:12.5,c:o.lC,r:o.lr||16});
  if(o.r) s+=lab(R,o.r,{fs:12.5,c:o.rC,r:o.rr||16});
  s+=lab(D,o.d,{fs:12.5,c:o.dC||C.ink,fw:700,r:o.dr||19});
  if(o.tag) s+=txt(add(p,[0,62]),o.tag,{fs:13,fw:700,c:o.tagC||C.ink});
  return s;
}
/* Cycle oxazolidin-2-one. P = position de l'oxygène du cycle (O1).
   opt.aux : 'ipr' (valinol) | 'noreph' (noréphédrine)
   opt.wedge : true -> substituants en gras (vers nous) ; false -> pointillés
   opt.co : direction du C2=O : 'up' | 'upright'                                */
const RING = {O1:[0,28], C2:[8,0], N:[37,0], C4:[46,28], C5:[23,46]};
function oxaz(P,opt){
  opt=opt||{}; const g=(k)=>add(P,RING[k]); let s='';
  const O1=g('O1'),C2=g('C2'),N=g('N'),C4=g('C4'),C5=g('C5');
  const B={c:C.blue};
  s+=bond(O1,C2,Object.assign({s:9,e:2},B));
  s+=bond(C2,N,Object.assign({s:2,e:9},B));
  s+=bond(N,C4,Object.assign({s:9,e:2},B));
  s+=bond(C4,C5,B); s+=bond(C5,O1,Object.assign({e:9},B));
  const Od = opt.co==='upright' ? add(C2,[16,-21]) : add(C2,[-10,-24]);
  s+=dbond(C2,Od,Object.assign({e:9},B));
  s+=lab(Od,'O',{fs:13.5,c:C.blue});
  s+=lab(O1,'O',{fs:13.5,c:C.blue});
  s+=lab(N,'N',{fs:13.5,c:C.blue});
  if(opt.aux==='bn'){
    const CH=add(C4,[12,26]), Ph=add(CH,[-4,28]);
    s+= opt.wedge ? wedge(C4,CH,B) : hashb(C4,CH,B);
    s+=bond(CH,Ph,Object.assign({e:11},B));
    s+=lab(Ph,'Ph',{fs:12.5,c:C.blue,r:11});
  } else if(opt.aux==='noreph'){
    const Me=add(C4,[20,20]), Ph=add(C5,[-14,25]);
    s+= opt.wedge ? wedge(C4,Me,Object.assign({e:10},B)) : hashb(C4,Me,Object.assign({e:10},B));
    s+= opt.wedge ? wedge(C5,Ph,Object.assign({e:11},B)) : hashb(C5,Ph,Object.assign({e:11},B));
    s+=lab(Me,'Me',{fs:12.5,c:C.blue,r:11});
    s+=lab(Ph,'Ph',{fs:12.5,c:C.blue,r:11});
  } else {
    const CH=add(C4,[12,26]), m1=add(CH,[-14,22]), m2=add(CH,[22,8]);
    s+= opt.wedge ? wedge(C4,CH,B) : hashb(C4,CH,B);
    s+=bond(CH,m1,B); s+=bond(CH,m2,B);
  }
  if(opt.tag) s+=txt(add(P,[18,74]),opt.tag,{fs:12.5,fw:700,c:C.blue});
  return s;
}
/* points d'ancrage du cycle */
const oxN=(P)=>add(P,RING.N);
const oxC2O=(P)=>add(add(P,RING.C2),[16,-21]);

/* ==========================================================================
   3. Moteur : liste des sections + rendu
   ========================================================================== */
const SECTIONS=[];
const S=(d)=>SECTIONS.push(d);
function el(tag,cls,html){const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;}
