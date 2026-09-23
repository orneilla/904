
/* ==========================================================================
   Rendu, navigation, thème
   ========================================================================== */
const stage=document.getElementById('stage');
const tocEl=document.getElementById('toc');
const navpos=document.getElementById('navpos');
const prevbtn=document.getElementById('prevbtn'), nextbtn=document.getElementById('nextbtn');
let idx=0;
const STORE='__STORE__';
function store(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v);}catch(e){} return null; }

function blk(titre,inner){ return '<div class="blk"><h3>'+titre+'</h3>'+inner+'</div>'; }

function renderSection(i){
  idx=i; stage.innerHTML='';
  const d=SECTIONS[i];
  const sec=el('section','sec');
  sec.appendChild(el('div','kicker',d.grp));
  sec.appendChild(el('h2','sectitle',d.title));
  if(d.une) sec.appendChild(el('div','une','<span class="t">En une phrase</span>'+d.une));
  if(d.probleme) sec.appendChild(el('div','blk','<h3>Le problème</h3>'+d.probleme));
  if(d.consigne) sec.appendChild(el('div','consigne','<span class="ic">👉</span><span>'+d.consigne+'</span>'));
  const card=el('div','card'); d.build(card); sec.appendChild(card);
  if(d.flag) sec.appendChild(el('div','warnbox',d.flag));
  if(d.etapes){
    const ol='<ol class="steps">'+d.etapes.map(s=>'<li>'+(s.q?'<span class="q">'+s.q+'</span>':'')+s.t+'</li>').join('')+'</ol>';
    sec.appendChild(el('div','blk','<h3>Le raisonnement, pas à pas</h3>'+ol));
  }
  if(d.expl) sec.appendChild(el('div','expl',d.expl));
  if(d.retenir){
    sec.appendChild(el('div','blk','<h3>À retenir</h3><ul class="keys">'+d.retenir.map(r=>'<li>'+r+'</li>').join('')+'</ul>'));
  }
  if(d.plus){
    const dt=el('details','plus');
    dt.innerHTML='<summary>Pour aller plus loin — '+d.plus.titre+'</summary><div class="body">'+d.plus.body
      +(d.plus.src?'<div class="src">Source : '+d.plus.src+'</div>':'')+'</div>';
    sec.appendChild(dt);
  }
  if(d.quiz){
    const q=el('div','quiz');
    q.innerHTML='<p class="q">'+d.quiz.q+'</p><button type="button">Voir la réponse</button><div class="a">'+d.quiz.a+'</div>';
    q.querySelector('button').onclick=()=>{ q.classList.toggle('show');
      q.querySelector('button').textContent=q.classList.contains('show')?'Masquer la réponse':'Voir la réponse'; };
    sec.appendChild(q);
  }
  stage.appendChild(sec);
  navpos.textContent=(i+1)+' / '+SECTIONS.length;
  prevbtn.disabled=(i===0); nextbtn.disabled=(i===SECTIONS.length-1);
  document.getElementById('hsub').textContent=d.grp;
  buildToc(); window.scrollTo(0,0); store(STORE+'.sec',String(i));
}
function buildToc(){
  let g=null, h='';
  SECTIONS.forEach((d,i)=>{
    if(d.grp!==g){ g=d.grp; h+='<div class="tocgroup">'+g+'</div>'; }
    h+='<button class="tocitem'+(i===idx?' cur':'')+'" data-i="'+i+'"><span class="n">'+(i+1)+'</span><span>'+d.title+'</span></button>';
  });
  tocEl.innerHTML='<button class="tocitem" id="toclose" style="font-weight:600"><span class="n">✕</span><span>Fermer le sommaire</span></button>'+h;
  tocEl.querySelector('#toclose').onclick=()=>tocEl.classList.remove('open');
  tocEl.querySelectorAll('.tocitem[data-i]').forEach(b=>b.onclick=()=>{tocEl.classList.remove('open');renderSection(+b.dataset.i);});
}
prevbtn.onclick=()=>{ if(idx>0) renderSection(idx-1); };
nextbtn.onclick=()=>{ if(idx<SECTIONS.length-1) renderSection(idx+1); };
document.getElementById('tocbtn').onclick=()=>{ tocEl.classList.toggle('open'); };

const lbar=document.getElementById('legendbar'), ltog=document.getElementById('legendtoggle');
ltog.onclick=()=>{ const o=lbar.classList.toggle('open'); ltog.setAttribute('aria-expanded',o?'true':'false'); store(STORE+'.leg',o?'1':'0'); };
if(store(STORE+'.leg')==='1'){ lbar.classList.add('open'); ltog.setAttribute('aria-expanded','true'); }

const tbtn=document.getElementById('themebtn');
function applyTheme(t){
  if(t==='light'||t==='dark') document.documentElement.setAttribute('data-theme',t);
  else document.documentElement.removeAttribute('data-theme');
  tbtn.textContent = t==='light'?'☀':(t==='dark'?'☾':'◐');
  store(STORE+'.theme',t||'auto');
}
let theme=store(STORE+'.theme')||'auto'; applyTheme(theme);
tbtn.onclick=()=>{ theme = theme==='auto'?'light':(theme==='light'?'dark':'auto'); applyTheme(theme); renderSection(idx); };

const saved=parseInt(store(STORE+'.sec')||'0',10);
renderSection(Number.isFinite(saved)&&saved>=0&&saved<SECTIONS.length?saved:0);
</script>
</body>
</html>
