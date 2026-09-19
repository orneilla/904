
/* ==========================================================================
   GROUPE G — Le contrôle cinétique
   ========================================================================== */
const GG='G — Contrôle cinétique';

S({
  grp:GG, title:'Le diagramme d\'énergie (version corrigée)',
  consigne:'Fais glisser les deux curseurs et regarde l\'e.e. réagir — puis appuie sur « réactif achiral ».',
  build(host){
    const fig=el('div','figbox'), ctl=el('div','card');
    ctl.innerHTML=`
      <div class="slab"><span>ΔΔG‡</span><b><span id="vd">8,0</span> kJ·mol⁻¹</b></div>
      <input type="range" id="sd" min="0" max="12" step="0.1" value="8">
      <div class="slab"><span>Température</span><b><span id="vt">−78</span> °C</b></div>
      <input type="range" id="st" min="-100" max="50" step="1" value="-78">
      <div class="btnrow" style="margin-top:10px">
        <button class="btn" id="bach">Réactif achiral (ΔΔG‡ = 0)</button>
        <button class="btn" id="bexp">Conditions TADDOL (−78 °C)</button>
      </div>
      <div class="bars">
        <div class="barrow"><span class="k">e.r.</span><span class="bartrack"><span class="barfill" id="f1"></span><span class="barfill b2" id="f2"></span></span><span class="v" id="ver">—</span></div>
        <div class="barrow"><span class="k">e.e.</span><span class="bartrack"><span class="barfill" id="f3"></span></span><span class="v" id="vee">—</span></div>
      </div>`;
    const conv=el('div','note',
      '<b>Convention de signe utilisée ici :</b> ΔΔG‡ = ΔG‡(minoritaire) − ΔG‡(majoritaire) ≥ 0. '
      +'Avec cette convention, e.r. = k<sub>maj</sub>/k<sub>min</sub> = exp(+ΔΔG‡/RT). '
      +'Tes notes écrivent [P<sub>S</sub>]/[P<sub>R</sub>] = exp(−ΔΔG‡/RT) : c\'est la même équation, avec ΔΔG‡ = ΔG‡<sub>S</sub> − ΔG‡<sub>R</sub> <i>signé</i> (il peut être négatif). R = 8,314 J·mol⁻¹·K⁻¹, T en kelvins.');
    host.appendChild(fig); host.appendChild(ctl); host.appendChild(conv);
    const $=(id)=>ctl.querySelector('#'+id);
    const upd=()=>{
      const dd=parseFloat($('sd').value), tc=parseFloat($('st').value), T=tc+273.15;
      const er=erFromDdG(dd,T), maj=er/(er+1)*100, ee=(er-1)/(er+1)*100;
      $('vd').textContent=dd.toFixed(1).replace('.',',');
      $('vt').textContent=(tc<0?'−':'')+Math.abs(tc);
      $('f1').style.width=maj.toFixed(1)+'%'; $('f2').style.width=(100-maj).toFixed(1)+'%';
      $('f3').style.width=Math.max(0,ee).toFixed(1)+'%';
      $('ver').textContent=maj.toFixed(1).replace('.',',')+' : '+(100-maj).toFixed(1).replace('.',',');
      $('vee').textContent=ee.toFixed(1).replace('.',',')+' %';
      fig.innerHTML=figEnergie(dd,T);
    };
    $('sd').oninput=upd; $('st').oninput=upd;
    $('bach').onclick=()=>{$('sd').value=0;upd();};
    $('bexp').onclick=()=>{$('sd').value=6.5;$('st').value=-78;upd();};
    upd();
  },
  une:'Les deux produits ont la même énergie, donc la thermodynamique ne peut rien départager : tout se joue sur la différence de hauteur des deux états de transition.',
  probleme:'<p>On a dit en section A qu\'un réactif chiral « casse la symétrie ». Mais concrètement, <i>où</i>&nbsp;? Ce diagramme répond à la question, et il faut le lire dans le bon ordre : d\'abord les produits, ensuite les états de transition.</p>',
  etapes:[
   {q:'D\'abord : regarde les deux puits de produits.',
    t:'Ils sont <b>exactement à la même hauteur</b>. Ce sont deux énantiomères : ils ont rigoureusement la même énergie interne. Ce n\'est pas une approximation, c\'est une identité.'},
   {q:'Conséquence immédiate.',
    t:'La thermodynamique est muette. Si la réaction était réversible et arrivait à l\'équilibre, on obtiendrait 50 : 50 quelle que soit la source de chiralité. Une réaction énantiosélective doit donc être <b>irréversible</b>, et sous contrôle <b>cinétique</b>.'},
   {q:'Ensuite : regarde les deux sommets.',
    t:'Eux ne sont pas à la même hauteur. Pourquoi&nbsp;? Parce qu\'ils contiennent à la fois le substrat et la source de chiralité : ce sont donc des <b>diastéréoisomères</b>, pas des énantiomères. Rien ne les oblige à être égaux.'},
   {q:'Comment l\'écart se transforme-t-il en sélectivité ?',
    t:'Par une exponentielle : e.r. = exp(ΔΔG‡/RT). Comme RT vaut environ 1,6 kJ·mol⁻¹ à −78 °C, quelques kJ·mol⁻¹ suffisent. 6,5 kJ·mol⁻¹ donnent déjà 98,5 : 1,5.'},
   {q:'Pourquoi ne chauffe-t-on pas ?',
    t:'Parce que T est au <b>dénominateur</b> de l\'exponentielle. Chauffer augmente RT, donc rapproche l\'exponentielle de 1, donc rapproche le mélange du racémique. D\'où la phrase de tes notes : « quand on fait des réactions énantiosélectives, on ne chauffe pas ».'},
   {q:'Et le bouton « réactif achiral » ?',
    t:'Il met ΔΔG‡ à zéro : les deux sommets fusionnent, l\'exponentielle vaut 1, et on retombe sur le 50 : 50 de la section A. La boucle est bouclée.'}
  ],
  retenir:[
   'Produits énantiomères ⇒ même énergie ⇒ contrôle cinétique obligatoire.',
   'États de transition diastéréoisomères ⇒ ΔΔG‡ ≠ 0 ⇒ sélectivité possible.',
   'e.r. = exp(ΔΔG‡/RT) : quelques kJ·mol⁻¹ suffisent.',
   'Baisser T augmente la sélectivité mais ralentit tout : d\'où les 120 h à −78 °C.'
  ],
  plus:{titre:'Quelques ordres de grandeur à garder en tête',
    body:'<p>À −78 °C (195 K), RT = 1,62 kJ·mol⁻¹. À 25 °C (298 K), RT = 2,48 kJ·mol⁻¹.</p><p>Ce que « coûte » un e.e. donné, à −78 °C :</p><ul class="keys"><li>e.r. 90 : 10 (e.e. 80 %) → ΔΔG‡ = 3,6 kJ·mol⁻¹</li><li>e.r. 95 : 5 (e.e. 90 %) → ΔΔG‡ = 4,8 kJ·mol⁻¹</li><li>e.r. 99 : 1 (e.e. 98 %) → ΔΔG‡ = 7,5 kJ·mol⁻¹</li></ul><p>Autrement dit : toute la différence entre une réaction médiocre et une réaction excellente tient dans <b>4 kJ·mol⁻¹</b>, soit environ un dixième d\'une liaison hydrogène. C\'est pour cela que la mise au point d\'un catalyseur énantiosélectif est si difficile — et si impressionnante quand elle réussit.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, fig. 2.2 et 2.3, p. 6 (noter que les deux puits de produits y sont bien au même niveau).'},
  quiz:{q:'Avec ΔΔG‡ = 6 kJ·mol⁻¹, l\'e.e. est-il meilleur à −78 °C ou à +25 °C&nbsp;? Vérifie avec les curseurs.',
        a:'À −78 °C (195,15 K) : e.r. = exp(6000 / (8,314 × 195,15)) = 40,9 → e.e. ≈ 95,2 %. À +25 °C (298,15 K) : e.r. = exp(6000 / (8,314 × 298,15)) = 11,2 → e.e. ≈ 83,6 %. Le <b>même</b> ΔΔG‡ donne un bien meilleur e.e. à froid, parce que RT est au dénominateur.'},
  flag:'⚠️ Dans tes notes, le puits de P<sub>S</sub> et celui de P<sub>R</sub> ne sont pas à la même hauteur. Deux énantiomères ont rigoureusement la même énergie : le diagramme est corrigé ici. Procter dessine d\'ailleurs bien les deux puits au même niveau (fig. 2.2 et 2.3).'
});
