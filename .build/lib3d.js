
/* ==========================================================================
   Petit moteur 3D (canvas, aucune dépendance).
   Projection orthographique — ce qu'on voit est exactement ce qu'on mesure.
   ========================================================================== */
const COL3D = {C:'--ink', O:'--red', N:'--blue', F:'--green', S:'--purple', H:'--grey', X:'--ink2'};
function cssv(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || '#888'; }

/* --- algèbre 3×3 minimale ------------------------------------------------- */
const M3 = {
  id:()=>[1,0,0, 0,1,0, 0,0,1],
  mul:(a,b)=>{ const r=new Array(9);
    for(let i=0;i<3;i++) for(let j=0;j<3;j++){ let s=0;
      for(let k=0;k<3;k++) s+=a[i*3+k]*b[k*3+j]; r[i*3+j]=s; } return r; },
  app:(m,v)=>[m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]],
  tr:(m)=>[m[0],m[3],m[6], m[1],m[4],m[7], m[2],m[5],m[8]],
  rot:(ax,ang)=>{ const n=Math.hypot(ax[0],ax[1],ax[2])||1, x=ax[0]/n,y=ax[1]/n,z=ax[2]/n;
    const c=Math.cos(ang), s=Math.sin(ang), t=1-c;
    return [t*x*x+c, t*x*y-s*z, t*x*z+s*y,
            t*x*y+s*z, t*y*y+c, t*y*z-s*x,
            t*x*z-s*y, t*y*z+s*x, t*z*z+c]; }
};
/* interpolation entre deux orientations : axe + angle de la rotation relative */
function slerp3(R0,R1,t){
  const M=M3.mul(R1,M3.tr(R0));
  let c=(M[0]+M[4]+M[8]-1)/2; c=Math.max(-1,Math.min(1,c));
  const a=Math.acos(c);
  if(a<1e-6) return R1.slice();
  const s=2*Math.sin(a);
  const ax=[(M[7]-M[5])/s,(M[2]-M[6])/s,(M[3]-M[1])/s];
  return M3.mul(M3.rot(ax,a*t),R0);
}

/* Vue de trois quarts par défaut : légèrement inclinée pour qu'AUCUN groupe
   ne soit caché derrière un autre (en vue strictement de face, la liaison qui
   vient vers toi masque exactement celle qui part vers le fond). */
const TILT = M3.mul(M3.rot([0,1,0],0.46), M3.rot([1,0,0],-0.26));

/* --- le visualiseur ------------------------------------------------------- */
function Viewer3D(host,mol,opt){
  opt=opt||{};
  const cv=document.createElement('canvas');
  cv.className='cv3d'; cv.style.touchAction='none';
  host.appendChild(cv);
  const ctx=cv.getContext('2d');
  let R = opt.R0 ? opt.R0.slice() : TILT.slice();
  let spin = !!opt.spin, anim=null, W=0,H=0,S=1;
  const decor = opt.decor||[];
  const badges = opt.badges||[];

  function resize(){
    const r=host.getBoundingClientRect(), d=Math.min(window.devicePixelRatio||1,2.5);
    W=Math.max(220,Math.round(r.width)); H=opt.h||260;
    cv.width=W*d; cv.height=H*d; cv.style.width=W+'px'; cv.style.height=H+'px';
    ctx.setTransform(d,0,0,d,0,0);
    let m=0; mol.atoms.forEach(a=>{ m=Math.max(m,Math.hypot(a.p[0],a.p[1],a.p[2])); });
    S=(Math.min(W,H)/2-22)/(m||1);   /* -22 px : place pour les boules et les étiquettes */
    draw();
  }
  const proj=(p)=>{ const v=M3.app(R,p); return [W/2+v[0]*S, H/2-v[1]*S, v[2]]; };

  function ellipse(P,n,r,col,op,txt){
    const c=proj(P), nv=M3.app(R,n);
    const len=Math.hypot(nv[0],nv[1]);
    const ang=Math.atan2(-nv[1],nv[0]);
    const rb=r*S, ra=rb*Math.abs(nv[2]);
    ctx.save(); ctx.globalAlpha=op; ctx.fillStyle=col;
    ctx.beginPath(); ctx.ellipse(c[0],c[1],rb,Math.max(ra,0.5),ang+Math.PI/2,0,Math.PI*2);
    ctx.fill(); ctx.globalAlpha=Math.min(1,op*3.2); ctx.strokeStyle=col; ctx.lineWidth=1.6; ctx.stroke();
    ctx.restore();
  }
  function tag3(P,txt,col,fs){
    const c=proj(P); ctx.save();
    ctx.font='800 '+(fs||12)+'px system-ui,sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    const w=ctx.measureText(txt).width+12;
    ctx.globalAlpha=.88; ctx.fillStyle=cssv('--panel');
    ctx.beginPath(); ctx.roundRect(c[0]-w/2,c[1]-10,w,20,10); ctx.fill();
    ctx.globalAlpha=1; ctx.fillStyle=col; ctx.fillText(txt,c[0],c[1]+0.5);
    ctx.restore();
  }
  function line3(a,b,col,dash,w){
    const p=proj(a),q=proj(b);
    ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w||2; ctx.lineCap='round';
    if(dash) ctx.setLineDash([6,5]);
    ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke(); ctx.restore();
  }
  function arrow3(a,b,col){
    const p=proj(a),q=proj(b);
    const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L;
    ctx.save(); ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2.6; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0]-ux*8,q[1]-uy*8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(q[0],q[1]);
    ctx.lineTo(q[0]-ux*11-uy*5.5, q[1]-uy*11+ux*5.5);
    ctx.lineTo(q[0]-ux*11+uy*5.5, q[1]-uy*11-ux*5.5);
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function draw(){
    const ink=cssv('--ink'), panel=cssv('--panel'), line=cssv('--line');
    ctx.clearRect(0,0,W,H);
    /* décor arrière */
    decor.forEach(d=>{ if(d.front) return; paintDecor(d); });
    /* liaisons puis atomes, triés par profondeur */
    const pts=mol.atoms.map(a=>proj(a.p));
    const items=[];
    mol.bonds.forEach(([i,j,o])=>{
      items.push({z:(pts[i][2]+pts[j][2])/2, k:'b', i:i, j:j, o:o});
    });
    mol.atoms.forEach((a,i)=>{ items.push({z:pts[i][2], k:'a', i:i}); });
    items.sort((u,v)=>u.z-v.z);
    items.forEach(it=>{
      if(it.k==='b'){
        const p=pts[it.i], q=pts[it.j];
        const fade=0.55+0.45*Math.max(0,Math.min(1,(it.z+3)/6));
        ctx.save(); ctx.globalAlpha=fade; ctx.strokeStyle=ink; ctx.lineCap='round';
        if(it.o>=2){
          const dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy)||1, nx=-dy/L*3.2, ny=dx/L*3.2;
          ctx.lineWidth=3;
          ctx.beginPath(); ctx.moveTo(p[0]+nx,p[1]+ny); ctx.lineTo(q[0]+nx,q[1]+ny); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(p[0]-nx,p[1]-ny); ctx.lineTo(q[0]-nx,q[1]-ny); ctx.stroke();
        } else { ctx.lineWidth=4.2; ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(q[0],q[1]); ctx.stroke(); }
        ctx.restore();
      } else {
        const a=mol.atoms[it.i], p=pts[it.i];
        const fade=0.6+0.4*Math.max(0,Math.min(1,(it.z+3)/6));
        const col=cssv(a.c||COL3D[a.e]||COL3D.X);
        const r=a.r||(a.e==='H'?5.2:(a.e==='C'?6.4:8));
        ctx.save(); ctx.globalAlpha=fade;
        ctx.fillStyle=col; ctx.beginPath(); ctx.arc(p[0],p[1],r,0,Math.PI*2); ctx.fill();
        ctx.lineWidth=1.6; ctx.strokeStyle=panel; ctx.stroke();
        const txt=(a.l!==undefined)?a.l:(a.e!=='C'?a.e:'');
        if(txt){ ctx.globalAlpha=1; ctx.fillStyle=panel; ctx.font='800 '+(a.r?12:10)+'px system-ui,sans-serif';
          ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(txt,p[0],p[1]+0.5); }
        ctx.restore();
      }
    });
    /* badges de priorité */
    badges.forEach(b=>{
      const p=pts[b.i], col=cssv(b.c||'--blue');
      const off=b.o||[16,-16];
      ctx.save(); ctx.globalAlpha=.95;
      ctx.fillStyle=col; ctx.beginPath(); ctx.arc(p[0]+off[0],p[1]+off[1],11,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=cssv('--panel'); ctx.lineWidth=2; ctx.stroke();
      ctx.fillStyle=cssv('--panel'); ctx.font='800 13px system-ui,sans-serif';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(b.t,p[0]+off[0],p[1]+off[1]+0.5);
      ctx.strokeStyle=col; ctx.globalAlpha=.6; ctx.lineWidth=1.4;
      ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(p[0]+off[0]*.55,p[1]+off[1]*.55); ctx.stroke();
      ctx.restore();
    });
    decor.forEach(d=>{ if(d.front) paintDecor(d); });
  }
  function paintDecor(d){
    const col=cssv(d.c||'--purple');
    if(d.k==='disc') ellipse(d.p,d.n,d.r||1.6,col,d.op||0.2);
    else if(d.k==='line') line3(d.a,d.b,col,d.dash,d.w);
    else if(d.k==='arrow') arrow3(d.a,d.b,col);
    else if(d.k==='tag') tag3(d.p,d.t,col,d.fs);
  }

  /* --- interaction --------------------------------------------------------- */
  let drag=null;
  cv.addEventListener('pointerdown',e=>{ drag={x:e.clientX,y:e.clientY}; cv.setPointerCapture(e.pointerId);
    spin=false; if(opt.onSpin) opt.onSpin(false); });
  cv.addEventListener('pointermove',e=>{ if(!drag) return;
    const dx=(e.clientX-drag.x)*0.011, dy=(e.clientY-drag.y)*0.011;
    drag={x:e.clientX,y:e.clientY};
    R=M3.mul(M3.mul(M3.rot([0,1,0],dx),M3.rot([1,0,0],dy)),R);
    anim=null; draw(); });
  const stop=()=>{ drag=null; };
  cv.addEventListener('pointerup',stop); cv.addEventListener('pointercancel',stop);

  let raf=null;
  function tick(ts){
    raf=null;
    if(anim){
      const t=Math.min(1,(ts-anim.t0)/anim.ms);
      const e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      R=slerp3(anim.a,anim.b,e); draw();
      if(t>=1){ anim=null; if(opt.onArrive) opt.onArrive(); }
    } else if(spin){ R=M3.mul(M3.rot([0,1,0],0.012),R); draw(); }
    if(anim||spin) raf=requestAnimationFrame(tick);
  }
  function kick(){ if(!raf) raf=requestAnimationFrame(tick); }

  const api={
    draw, resize,
    reset(){ anim={a:R.slice(),b:(opt.R0?opt.R0.slice():TILT.slice()),t0:performance.now(),ms:700}; kick(); },
    goto(Rt,ms){ anim={a:R.slice(),b:Rt.slice(),t0:performance.now(),ms:ms||900}; kick(); },
    turn(ax,ang,ms){ api.goto(M3.mul(M3.rot(ax,ang),R),ms); },
    spin(v){ spin=v; if(v) kick(); },
    isSpinning(){ return spin; },
    setBadges(b){ badges.length=0; (b||[]).forEach(x=>badges.push(x)); draw(); },
    setDecor(d){ decor.length=0; (d||[]).forEach(x=>decor.push(x)); draw(); }
  };
  requestAnimationFrame(()=>{ resize(); if(spin) kick(); });
  window.addEventListener('resize',resize);
  return api;
}

/* fabrique un bloc « molécule + boutons » prêt à insérer dans une section */
function bloc3D(host,mol,opt){
  opt=opt||{};
  const wrap=el('div','cv3dwrap');
  const hint=el('div','cv3dhint','👆 fais glisser ton doigt sur la molécule pour la tourner');
  host.appendChild(wrap); host.appendChild(hint);
  const v=Viewer3D(wrap,mol,opt);
  const row=el('div','btnrow');
  (opt.boutons||[]).forEach(b=>{
    const t=el('button','btn'); t.textContent=b.t; t.style.flex=b.f||'1 1 46%';
    t.onclick=()=>b.go(v,t); row.appendChild(t);
  });
  const rb=el('button','btn'); rb.textContent='↺ Remettre comme le dessin'; rb.style.flex='1 1 100%';
  rb.onclick=()=>v.reset(); row.appendChild(rb);
  host.appendChild(row);
  return v;
}
