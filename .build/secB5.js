
/* ==========================================================================
   GROUPE 5 — Mesurer
   ========================================================================== */
const G5='5 — Mesurer';

S({
  grp:G5, title:'La lumière polarisée, et un piège qu\'on lit partout',
  consigne:'Bascule entre les deux types de polarisation et regarde la forme décrite par le vecteur.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='pp';
    const draw=()=>{ fig.innerHTML=figPolar(cur);
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['pp','Polarisée dans un plan'],['cp','Polarisée circulairement']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.style.flex='1 1 44%';
      b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','warnbox','⚠️ <b>Beaucoup de manuels écrivent que la lumière polarisée plane est chirale.</b> C\'est faux, et ce n\'est pas un détail : son plan de polarisation est un plan de symétrie, donc elle est <b>achirale</b>. Ce qui est chiral, c\'est le polarimètre.'));
    draw();
  },
  une:'Une onde polarisée dans un plan est achirale ; une onde polarisée circulairement décrit une hélice, donc elle est chirale. C\'est la seconde qui « voit » la chiralité.',
  probleme:'<p>On apprend que le pouvoir rotatoire « prouve la chiralité ». Mais par quel mécanisme&nbsp;? Si la lumière polarisée plane était achirale, comment pourrait‑elle distinguer deux énantiomères&nbsp;? Et si elle était chirale, pourquoi parlerait‑on d\'un <i>plan</i> de polarisation&nbsp;?</p><p>La réponse de Robinson est nette et vaut la peine d\'être comprise une fois pour toutes.</p>',
  etapes:[
   {q:'Polarisée dans un plan : achirale.',
    t:'Le vecteur électrique garde une orientation fixe et oscille en amplitude. Le plan qu\'il occupe est un <b>plan de symétrie</b> de l\'onde. Un objet qui possède un plan de symétrie est achiral. Donc cette lumière est achirale.'},
   {q:'Polarisée circulairement : chirale.',
    t:'Le vecteur garde une norme constante et <b>tourne</b> en avançant. Il décrit une hélice, droite ou gauche. Une hélice n\'a pas de plan de symétrie : cette lumière est chirale, et elle existe en deux versions énantiomères.'},
   {q:'Comment les deux se relient.',
    t:'Une onde polarisée plane est la <b>somme</b> d\'une onde circulaire gauche et d\'une onde circulaire droite, de même amplitude. C\'est exactement comme un racémique : deux moitiés chirales qui s\'annulent.'},
   {q:'Ce qui se passe dans l\'échantillon.',
    t:'Un milieu chiral n\'a pas le même indice de réfraction pour les deux composantes circulaires (n<sub>g</sub> ≠ n<sub>d</sub>). L\'une prend du retard sur l\'autre, et leur somme ressort avec un plan de polarisation <b>tourné</b>.'},
   {q:'Alors qui détecte la chiralité ?',
    t:'Le <b>polarimètre</b>. C\'est lui l\'objet chiral : le chemin hélicoïdal décrit par la lumière en traversant l\'échantillon n\'est lisible que parce que l\'appareil possède un polariseur <i>et</i> un analyseur orientés. Robinson insiste : c\'est précisément parce que la lumière polarisée plane est achirale qu\'on peut l\'utiliser ainsi.'},
   {q:'Et le dichroïsme circulaire ?',
    t:'C\'est l\'autre méthode : on mesure directement la <b>différence d\'absorption</b> entre lumière circulaire gauche et droite. Là, l\'objet chiral est bien la lumière elle‑même. Le CD est très utilisé pour les polymères chiraux — protéines, acides nucléiques.'}
  ],
  retenir:[
   'Polarisée plane = achirale (elle a un plan de symétrie).',
   'Polarisée circulairement = chirale (le vecteur décrit une hélice).',
   'Plane = somme des deux circulaires ; un milieu chiral les ralentit différemment.',
   'En polarimétrie, l\'objet chiral qui fait la mesure est l\'appareil, pas la lumière.'
  ],
  quiz:{q:'Pourquoi le dichroïsme circulaire donne-t-il des informations qu\'un simple pouvoir rotatoire ne donne pas&nbsp;?',
        a:'Parce qu\'il se mesure <b>dans une bande d\'absorption</b> et dépend donc du chromophore concerné. On peut ainsi sonder une partie précise de la molécule — un carbonyle, une hélice α de protéine — au lieu d\'obtenir un chiffre global. C\'est ce qui permet des règles empiriques d\'attribution de configuration absolue, comme la règle de l\'octant pour les cétones que Robinson décrit. Elle n\'est pas infaillible, mais elle marche souvent.'}
});

S({
  grp:G5, title:'[α], pureté optique et excès énantiomérique',
  consigne:'Regarde d\'abord le schéma, puis lis ce que le chiffre permet — et ne permet pas — de conclure.',
  build(host){
    const fig=el('div','figbox'), ctl=el('div','card');
    ctl.innerHTML=`<div class="slab"><span>Rotation mesurée α</span><b><span id="va">+12,0</span> °</b></div>
      <input type="range" id="sa" min="-30" max="30" step="0.5" value="12">
      <div class="slab"><span>[α] de l'énantiopur</span><b><span id="vr">+30,0</span></b></div>
      <input type="range" id="sr" min="5" max="60" step="0.5" value="30">
      <div class="statusline" id="oo" style="margin-top:10px"></div>`;
    host.appendChild(fig); host.appendChild(ctl);
    const $=(i)=>ctl.querySelector('#'+i);
    const upd=()=>{
      const a=parseFloat($('sa').value), ref=parseFloat($('sr').value);
      fig.innerHTML=figPolarimetre(a);
      /* on prend l = 1 dm et c = 1 g/100 mL pour que [α] = α */
      const op=Math.max(-100,Math.min(100, a/ref*100));
      $('va').textContent=(a>0?'+':'')+a.toFixed(1).replace('.',',');
      $('vr').textContent='+'+ref.toFixed(1).replace('.',',');
      $('oo').innerHTML=`avec ℓ = 1 dm et c = 1 g/100 mL, [α] = α = <b>${(a>0?'+':'')+a.toFixed(1).replace('.',',')}</b><br>`
        +`pureté optique = ${a.toFixed(1).replace('.',',')} / ${ref.toFixed(1).replace('.',',')} × 100 = <b>${op.toFixed(1).replace('.',',')} %</b><br>`
        +`<span style="color:var(--ink2)">on suppose e.e. ≈ pureté optique — c'est une approximation (voir ci-dessous)</span>`;
    };
    $('sa').oninput=upd; $('sr').oninput=upd; upd();
  },
  une:'Le pouvoir rotatoire spécifique sert à estimer la composition d\'un mélange d\'énantiomères. Mais ce n\'est qu\'une estimation, et une rotation nulle ne prouve rien.',
  probleme:'<p>« [α]<sub>D</sub> = −14,1° » : on voit cette notation partout, souvent mal écrite, et on en tire des conclusions parfois trop rapides. Que mesure‑t‑on exactement, et que peut‑on en déduire&nbsp;?</p>',
  etapes:[
   {q:'Ce qu\'on mesure directement.',
    t:'L\'angle α dont il faut tourner l\'analyseur. Il dépend de <b>tout</b> : la longueur de la cuve ℓ, la concentration c, la longueur d\'onde λ, la température, le solvant, et bien sûr la substance.'},
   {q:'La grandeur normalisée.',
    t:'[α] = α / (ℓ × c), avec ℓ en dm et c en g/100 mL. Ses dimensions sont deg·cm²·g⁻¹ et non des degrés — c\'est pour cela qu\'on écrit <b>[α] = −14,1</b> et jamais −14,1°. Une petite rigueur qui montre qu\'on a compris.'},
   {q:'Pourquoi on précise toujours c et le solvant.',
    t:'Parce que [α] ne serait indépendant de c que pour une solution idéale, et les concentrations utilisées sont bien trop élevées pour cela. D\'où la notation « [α]<sub>D</sub> = +13,8 (H₂O, c = 1) ».'},
   {q:'Pureté optique.',
    t:'p.o. = [α]<sub>échantillon</sub> / [α]<sub>énantiopur</sub> × 100. Cela suppose évidemment de connaître [α] du produit énantiopur — ce qui n\'est pas toujours le cas.'},
   {q:'Pureté optique ≈ e.e., mais seulement ≈.',
    t:'L\'e.e. est défini par les <b>fractions molaires</b>, pas par une rotation. On assimile les deux par commodité, et c\'est généralement légitime. Mais en présence de fortes interactions soluté‑soluté, l\'écart peut devenir grand : c\'est l\'<b>effet Horeau</b>.'},
   {q:'Ce qu\'une rotation nulle ne prouve PAS.',
    t:'Trois cas où un composé chiral et non racémique ne montre aucune rotation : l\'échantillon est trop petit, la rotation est intrinsèquement faible (chiralité isotopique), ou elle est <b>accidentellement nulle</b> à la longueur d\'onde utilisée. Une rotation détectée prouve la chiralité ; l\'absence de rotation ne prouve rien.'}
  ],
  retenir:[
   '[α] = α / (ℓ·c), sans unité de degré. On donne toujours λ, T, solvant et c.',
   'Pureté optique = rapport des [α]. e.e. = différence des fractions molaires.',
   'p.o. ≈ e.e. est une approximation (effet Horeau).',
   'Rotation détectée ⇒ chiral et non racémique. Rotation nulle ⇒ aucune conclusion.'
  ],
  plus:{titre:'Deux remarques de vocabulaire, et les méthodes modernes',
    body:'<p><b>« Optiquement actif » ne veut pas dire « énantiopur ».</b> Un échantillon peut être optiquement actif simplement parce qu\'il contient un mélange déséquilibré d\'énantiomères. Robinson est catégorique là‑dessus : ce n\'est pas un synonyme acceptable de <i>homochiral</i>.</p><p><b>« Pureté énantiomérique » est à éviter</b> : le terme a été employé dans plusieurs sens différents. Préférer <i>excès énantiomérique</i> ou, mieux encore, le <i>rapport énantiomérique</i>.</p><p>En pratique, aujourd\'hui, on ne mesure presque plus un e.e. par polarimétrie. On utilise :</p><ul class="keys"><li>la <b>HPLC ou GC sur phase chirale</b> — deux pics, deux aires, c\'est direct et c\'est la référence ;</li><li>la <b>RMN avec un agent de solvatation ou un réactif chiral</b>, qui rend les deux énantiomères diastéréotopes et donc visibles séparément.</li></ul><p>Le pouvoir rotatoire garde deux usages : vérifier rapidement qu\'un lot n\'est pas racémique, et comparer avec la littérature ancienne.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.3, p. 39–41.'},
  quiz:{q:'Tu mesures α = 0,00° sur ton produit. Ton collègue en conclut qu\'il est racémique. A-t-il raison&nbsp;?',
        a:'Pas forcément. Trois autres explications sont possibles : (1) la quantité est trop faible ou la solution trop diluée pour dépasser la sensibilité de l\'appareil ; (2) le composé a intrinsèquement une rotation très faible ; (3) la rotation est <b>accidentellement nulle à cette longueur d\'onde précise</b> — la dispersion rotatoire optique passe par zéro quelque part, et on peut tomber dessus. Le test concluant est une <b>HPLC chirale</b>, qui compte les molécules au lieu de mesurer un angle.'}
});
