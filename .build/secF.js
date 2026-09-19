
/* ==========================================================================
   GROUPE F — Réactif chiral : époxydation de la chalcone au TADDOL
   ========================================================================== */
const GF='F — Réactif chiral : TADDOL';

S({
  grp:GF, title:'Weitz–Scheffer : époxyder une énone en deux temps',
  consigne:'Appuie sur « étape suivante » ; l\'étape 2 est encadrée en rouge, c\'est celle qui décide.',
  build(host){
    const f0=el('div','figbox'), fig=el('div','figbox'), row=el('div','btnrow'); let k=0;
    f0.innerHTML=figTaddol(); host.appendChild(f0);
    const prev=el('button','btn'), next=el('button','btn'), reset=el('button','btn');
    prev.textContent='‹ Étape'; next.textContent='Étape suivante ›'; reset.textContent='⟲'; reset.style.flex='0 0 56px';
    const draw=()=>{fig.innerHTML=figWeitz(k); prev.disabled=(k===0); next.disabled=(k===4);
      prev.style.opacity=k===0?.4:1; next.style.opacity=k===4?.4:1;};
    prev.onclick=()=>{if(k>0){k--;draw();}}; next.onclick=()=>{if(k<4){k++;draw();}}; reset.onclick=()=>{k=0;draw();};
    row.appendChild(prev); row.appendChild(next); row.appendChild(reset);
    host.appendChild(fig); host.appendChild(row); draw();
  },
  une:'On n\'époxyde pas une énone comme un alcène ordinaire : le nucléophile s\'additionne d\'abord en 1,4, puis referme le cycle à trois. Deux étapes, et seule la première décide de la stéréochimie.',
  probleme:'<p>Une double liaison ordinaire s\'époxyde avec un peracide, qui lui livre un oxygène <b>électrophile</b>. Mais la double liaison d\'une énone est <b>appauvrie</b> en électrons : elle est conjuguée à un carbonyle qui tire les électrons. Un peracide y réagit très mal.</p><p>Il faut donc inverser la logique : attaquer avec un oxygène <b>nucléophile</b>. C\'est la réaction de Weitz–Scheffer.</p>',
  etapes:[
   {q:'Étape 1 — fabriquer le nucléophile.',
    t:'n-BuLi arrache le proton de l\'hydroperoxyde dérivé du TADDOL. On obtient ROO⊖ Li⁺. C\'est un oxygène <b>nucléophile</b>, et c\'est lui qui porte toute l\'information chirale.'},
   {q:'Étape 2 — addition 1,4. C\'EST L\'ÉTAPE DÉTERMINANTE.',
    t:'ROO⊖ s\'additionne sur le carbone <b>β</b> (celui qui porte le phényle), pas sur le carbonyle : c\'est une addition conjuguée. En choisissant une des deux faces de Cβ, il fixe définitivement une configuration. Les deux états de transition possibles sont diastéréoisomères : ΔΔG‡ ≠ 0.'},
   {q:'Étape 3 — la rotation.',
    t:'Cα–Cβ est maintenant une liaison <b>simple</b> : elle tourne librement. La molécule adopte la conformation la moins gênée — celle où le phényle et le benzoyle sont le plus loin possible l\'un de l\'autre.'},
   {q:'Étape 4 — la fermeture.',
    t:'L\'énolate (le carbone α, chargé) attaque l\'oxygène le plus proche de la liaison O–O. L\'autre oxygène part avec le TADDOL, sous forme de RO⊖ : c\'est un excellent nucléofuge, parce que la liaison O–O est faible. Le cycle à trois se referme.'},
   {q:'Pourquoi trans ?',
    t:'Parce que la fermeture se fait <b>après</b> la rotation : la conformation choisie est celle où les deux gros groupes sont anti. L\'époxyde en garde la trace. C\'est très différent d\'une époxydation par peracide, qui est <b>stéréospécifique</b> (la géométrie de l\'alcène est conservée) ; ici on passe par un intermédiaire qui tourne, donc on est <b>stéréosélectif</b>.'}
  ],
  retenir:[
   'Alcène riche → oxygène électrophile (peracide). Énone pauvre → oxygène nucléophile (Weitz–Scheffer).',
   'Mécanisme en deux temps : addition 1,4 puis fermeture intramoléculaire.',
   'Seule l\'addition 1,4 est stéréodéterminante.',
   'La rotation intermédiaire explique le résultat trans — et pourquoi la réaction n\'est pas stéréospécifique.'
  ],
  plus:{titre:'Stéréospécifique ou stéréosélectif ? Les deux mots ne veulent pas dire la même chose',
    body:'<p>Une réaction est <b>stéréospécifique</b> quand deux stéréoisomères du substrat donnent deux stéréoisomères différents du produit : le résultat est imposé par le mécanisme. L\'époxydation par un peracide en est l\'exemple type — <i>cis</i>-alcène → <i>cis</i>-époxyde, toujours.</p><p>Une réaction est <b>stéréosélective</b> quand, à partir d\'un substrat donné, un stéréoisomère se forme majoritairement, sans que ce soit une obligation mécanistique.</p><p>Ici, comme la liaison Cα–Cβ tourne avant la fermeture, l\'information géométrique de l\'alcène de départ est perdue en route. La réaction ne peut donc pas être stéréospécifique. Elle est seulement (très) stéréosélective.</p><p>Robinson consacre plusieurs pages à cette distinction, souvent confondue.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §6 « Stereospecific and stereoselective reactions », p. 66 et suivantes.'},
  quiz:{q:'Pourquoi n\'utilise-t-on pas simplement un peracide chiral sur cette chalcone&nbsp;?',
        a:'Parce qu\'un peracide livre un oxygène <b>électrophile</b>, et que la double liaison de la chalcone est appauvrie par la conjugaison avec le carbonyle. La réaction serait très lente, voire inexistante. Le choix du type de réactif (nucléophile ou électrophile) est dicté par la <b>densité électronique de l\'alcène</b>, pas par la stéréochimie souhaitée. La stéréochimie ne se décide qu\'ensuite.'}
});

S({
  grp:GF, title:'L\'effet de la température, chiffres à l\'appui',
  consigne:'Fais glisser le curseur entre −78 °C et 0 °C et regarde l\'e.e. et le temps bouger ensemble.',
  build(host){
    const ctl=el('div','card'), tab=el('div');
    ctl.innerHTML=`<div class="slab"><span>Température</span><b><span id="vT">−78</span> °C</b></div>
      <input type="range" id="sT" min="-78" max="0" step="1" value="-78">
      <div class="bars">
        <div class="barrow"><span class="k">e.r.</span><span class="bartrack"><span class="barfill" id="g1"></span><span class="barfill b2" id="g2"></span></span><span class="v" id="ger">—</span></div>
        <div class="barrow"><span class="k">e.e.</span><span class="bartrack"><span class="barfill" id="g3"></span></span><span class="v" id="gee">—</span></div>
      </div>
      <div class="statusline" id="gout" style="margin-top:10px"></div>`;
    tab.innerHTML=`<table class="dat"><thead><tr><th>T</th><th class="num">temps</th><th class="num">rdt</th><th class="num">e.r.</th></tr></thead><tbody>
      <tr><td>0 °C</td><td class="num">4 h</td><td class="num">94 %</td><td class="num">90 : 10</td></tr>
      <tr><td>−30 °C</td><td class="num">24 h</td><td class="num">92 %</td><td class="num">95 : 5</td></tr>
      <tr><td>−78 °C</td><td class="num">120 h</td><td class="num">80 %</td><td class="num">98,5 : 1,5</td></tr>
      </tbody></table>`;
    host.appendChild(tab); host.appendChild(ctl);
    const $=(i)=>ctl.querySelector('#'+i);
    const upd=()=>{
      const tc=parseFloat($('sT').value), T=tc+273.15;
      const lner = 1336.1/T - 2.636;              /* ajustement d'Eyring sur les 3 points */
      const er=Math.exp(lner), maj=er/(er+1)*100, ee=(er-1)/(er+1)*100;
      const ddG = 8.314*T*lner/1000;
      const t = Math.exp(2201/T - 6.346);
      $('vT').textContent=(tc<0?'−':'')+Math.abs(tc);
      $('g1').style.width=maj.toFixed(1)+'%'; $('g2').style.width=(100-maj).toFixed(1)+'%';
      $('g3').style.width=Math.max(0,ee).toFixed(1)+'%';
      $('ger').textContent=maj.toFixed(1).replace('.',',')+' : '+(100-maj).toFixed(1).replace('.',',');
      $('gee').textContent=ee.toFixed(1).replace('.',',')+' %';
      $('gout').innerHTML=`ΔΔG‡ = R·T·ln(e.r.) = 8,314 × ${T.toFixed(2).replace('.',',')} × ${lner.toFixed(3).replace('.',',')}`
        +` = <b>${ddG.toFixed(2).replace('.',',')} kJ·mol⁻¹</b><br>`
        +`durée estimée : <b>${t<48? t.toFixed(0)+' h' : (t/24).toFixed(1).replace('.',',')+' jours'}</b>`
        +` <span style="color:var(--ink2)">(interpolation sur les 3 points mesurés)</span>`;
    };
    $('sT').oninput=upd; upd();
  },
  une:'Refroidir améliore l\'e.e. mais coûte du temps : de 0 °C à −78 °C on passe de 90:10 à 98,5:1,5, mais de 4 h à 120 h.',
  probleme:'<p>« On ne chauffe pas » est une règle, mais elle ne dit pas <i>combien</i> on gagne, ni ce qu\'on paie. Ces trois lignes de ton cours sont une des rares séries de données du chapitre où l\'on peut tout vérifier soi‑même. Faisons‑le.</p>',
  etapes:[
   {q:'Que gagne-t-on en refroidissant ?',
    t:'De 0 °C à −78 °C : e.r. de 90 : 10 à 98,5 : 1,5, soit un e.e. qui passe de 80 % à 97 %. Le taux de « mauvais » énantiomère est divisé par près de 7.'},
   {q:'Que paie-t-on ?',
    t:'Du <b>temps</b> : 4 h deviennent 120 h, soit cinq jours. Et du rendement : 94 % tombent à 80 %, parce qu\'une réaction longue laisse le temps à des réactions parasites de se produire.'},
   {q:'D\'où vient le gain ?',
    t:'De e.r. = exp(ΔΔG‡/RT). En refroidissant on diminue RT, donc on augmente l\'exposant. À −78 °C, RT ne vaut plus que 1,62 kJ·mol⁻¹ : le moindre écart d\'énergie devient énorme en proportion.'},
   {q:'Surprise : ΔΔG‡ n\'est pas constant.',
    t:'Si tu déplaces le curseur, tu verras ΔΔG‡ passer d\'environ 5,0 à 6,8 kJ·mol⁻¹. Ce n\'est pas une erreur : ΔΔG‡ = ΔΔH‡ − T·ΔΔS‡. Il contient lui‑même un terme en T. Voir « pour aller plus loin ».'},
   {q:'Comment choisit-on en pratique ?',
    t:'On ne cherche pas le meilleur e.e. dans l\'absolu, mais le meilleur compromis pour l\'usage visé. Pour une molécule finale de médicament, 97 % d\'e.e. et cinq jours peuvent valoir la peine. Pour un intermédiaire qu\'on recristallisera, 80 % en 4 h suffisent largement.'}
  ],
  retenir:[
   'Gain en sélectivité ↔ perte en vitesse et en rendement : c\'est toujours un arbitrage.',
   'e.r. = exp(ΔΔG‡/RT) : le levier, c\'est RT au dénominateur.',
   'Ces trois points sont cohérents entre eux — on peut les vérifier par un tracé d\'Eyring.',
   'Baisser la température n\'améliore la sélectivité que si le mécanisme reste le même.'
  ],
  plus:{titre:'Le tracé d\'Eyring sur tes trois points — et ce qu\'il révèle',
    body:'<p>On part de ΔΔG‡ = ΔΔH‡ − T·ΔΔS‡ et de ln(e.r.) = ΔΔG‡/RT. En combinant :</p>'
      +'<p style="text-align:center"><b>ln(e.r.) = ΔΔH‡/(R·T) − ΔΔS‡/R</b></p>'
      +'<p>Donc ln(e.r.) doit être une droite en fonction de 1/T. Avec tes trois points :</p>'
      +'<ul class="keys"><li>0 °C : 1/T = 3,661·10⁻³, ln(e.r.) = 2,197</li><li>−30 °C : 4,113·10⁻³, ln(e.r.) = 2,944</li><li>−78 °C : 5,124·10⁻³, ln(e.r.) = 4,185</li></ul>'
      +'<p>La régression donne ln(e.r.) = 1336/T − 2,636, avec un très bon alignement. On en tire :</p>'
      +'<ul class="keys"><li><b>ΔΔH‡ = +11,1 kJ·mol⁻¹</b> — l\'enthalpie favorise nettement le bon énantiomère (c\'est l\'encombrement du TADDOL).</li>'
      +'<li><b>ΔΔS‡ = +21,9 J·mol⁻¹·K⁻¹</b> — l\'entropie, elle, favorise le mauvais. L\'état de transition minoritaire est plus « désordonné », donc moins pénalisé à haute température.</li></ul>'
      +'<p>C\'est un cas classique de <b>compensation enthalpie/entropie</b>. Et cela donne la vraie raison de « on ne chauffe pas » : en chauffant, on donne du poids au terme −T·ΔΔS‡, qui joue contre nous. La température à laquelle les deux se compenseraient exactement (ΔΔG‡ = 0) serait ΔΔH‡/ΔΔS‡ ≈ 507 K, soit 234 °C — heureusement très loin.</p>'
      +'<p><i>Les trois points sont ceux de tes notes ; la régression et son interprétation sont un ajout, à vérifier avec ton enseignant si tu veux t\'en servir.</i>'},
  quiz:{q:'On veut un e.e. d\'au moins 90 %. Quelle température choisir, et combien de temps faudra-t-il&nbsp;?',
        a:'Un e.e. de 90 % correspond à un e.r. de 95 : 5, donc ln(e.r.) = 2,944. Avec ln(e.r.) = 1336/T − 2,636, on trouve T = 1336/5,580 = 239 K, soit environ <b>−34 °C</b>. La durée estimée est alors d\'environ <b>25 h</b>. C\'est presque exactement la deuxième ligne de ton tableau — ce qui montre que l\'ajustement est bon.'}
});
