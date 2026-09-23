
/* ==========================================================================
   GROUPE 1 — Classer : de quoi parle-t-on ?
   ========================================================================== */
const G1='1 — Classer';

S({
  grp:G1, title:'L\'arbre de décision : trois questions, quatre réponses',
  consigne:'Choisis une paire de molécules et regarde le chemin s\'allumer dans l\'arbre.',
  build(host){
    const row=el('div','btnrow'), f1=el('div','figbox'), f2=el('div','figbox'), st=el('div','statusline');
    let cur='homo';
    const draw=()=>{
      f1.innerHTML=figPaire(cur); f2.innerHTML=figArbre(cur);
      st.innerHTML='<b>'+PAIRES[cur].verdict+'.</b> '+PAIRES[cur].why;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    [['homo','Même molécule'],['enant','Tartriques (+)/(−)'],['diast','(+) et méso'],['const','Butènes']]
      .forEach(([k,t])=>{ const b=el('button','btn'); b.textContent=t; b.dataset.k=k;
        b.style.flex='1 1 42%'; b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f1); host.appendChild(f2); host.appendChild(st); draw();
  },
  une:'Toute la classification de la stéréochimie tient dans trois questions posées dans cet ordre. Si tu retiens cet arbre, tu n\'as plus jamais besoin d\'apprendre les définitions par cœur.',
  probleme:'<p>« Énantiomère », « diastéréoisomère », « isomère de constitution » : ces mots sont souvent appris comme des définitions isolées, et confondus dès qu\'un cas un peu inhabituel se présente — le <i>méso</i>, par exemple.</p><p>Robinson propose de les définir autrement : non pas par ce qu\'ils <i>sont</i>, mais par un <b>test</b> à appliquer à deux molécules de même formule brute.</p>',
  etapes:[
   {q:'Question 1 — sont-elles superposables ?',
    t:'Autrement dit : peut‑on faire tourner et déplacer l\'une pour qu\'elle recouvre exactement l\'autre&nbsp;? Si oui, ce n\'est pas de l\'isomérie du tout : c\'est <b>la même molécule</b>, dessinée autrement. Robinson les appelle « homomères », un mot rare justement parce que le cas est trivial.'},
   {q:'Question 2 — sont-elles images l\'une de l\'autre dans un miroir ?',
    t:'Si elles ne sont pas superposables mais qu\'un miroir transforme l\'une en l\'autre, ce sont des <b>énantiomères</b>. Elles ont exactement les mêmes distances entre atomes ; seule la « main » change.'},
   {q:'Question 3 — ont-elles la même constitution ?',
    t:'Non superposables, pas images miroir : il reste deux cas. Si les atomes sont reliés dans le même ordre, ce sont des <b>diastéréoisomères</b>. Sinon, ce sont des <b>isomères de constitution</b> et on a quitté la stéréochimie.'},
   {q:'Pourquoi l\'ordre des questions compte.',
    t:'Parce que les deux premières relations sont <b>mutuellement exclusives</b> : deux molécules ne peuvent pas être à la fois énantiomères et diastéréoisomères. Si tu poses les questions dans le désordre, tu peux « attraper » la mauvaise réponse.'},
   {q:'Le piège classique : les trois acides tartriques.',
    t:'Le (+) est l\'<b>énantiomère</b> du (−), et en même temps un <b>diastéréoisomère</b> du méso. Il n\'y a aucune contradiction : ce sont trois molécules, donc trois relations deux à deux. Les <i>relations</i> s\'excluent, pas les <i>mots</i> appliqués à une molécule.'}
  ],
  retenir:[
   'Superposables ? → la même molécule.',
   'Sinon, images miroir ? → énantiomères.',
   'Sinon, même constitution ? → diastéréoisomères. Sinon → isomères de constitution.',
   'Une molécule peut être « l\'énantiomère de A » et « un diastéréoisomère de B » : ce sont deux relations différentes.'
  ],
  plus:{titre:'L\'analogie familiale de Robinson',
    body:'<p>Robinson utilise une image très parlante : une personne peut être <i>parent</i> de quelqu\'un, <i>enfant</i> de quelqu\'un d\'autre, <i>cousin</i> d\'un troisième. Mais elle ne peut pas être à la fois parent <b>et</b> enfant <b>et</b> cousin de <b>la même</b> personne.</p><p>De la même façon : les <b>relations</b> « énantiomérique » et « diastéréomérique » s\'excluent entre deux molécules données ; les <b>noms</b> « énantiomère » et « diastéréoisomère » ne s\'excluent pas pour une molécule donnée, parce qu\'ils dépendent de l\'interlocuteur.</p><p>Autre remarque de Robinson qui vaut la peine : on peut démontrer <b>expérimentalement</b> que deux composés sont énantiomères, sans aucune théorie de la structure chimique. En revanche, distinguer un diastéréoisomère d\'un isomère de constitution suppose déjà qu\'on ait défini les liaisons simples, doubles, etc. Historiquement, les acides maléique et fumarique portaient deux noms différents — on les croyait de constitutions différentes — jusqu\'à ce que van\'t Hoff propose en 1874 qu\'ils étaient stéréoisomères.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b> (Oxford Chemistry Primers 88), §4.1, fig. 4.3 et 4.4, p. 37–38.'},
  quiz:{q:'Le cis-1,2-diméthylcyclohexane et le trans-1,2-diméthylcyclohexane : quelle relation&nbsp;?',
        a:'Applique l\'arbre. <b>Superposables ?</b> Non. <b>Images miroir ?</b> Non — un miroir inverserait les deux centres à la fois, on obtiendrait l\'autre <i>trans</i>, pas le <i>cis</i>. <b>Même constitution ?</b> Oui, les deux méthyles sont bien en 1 et 2 dans les deux cas. Donc : <b>diastéréoisomères</b>. Et d\'ailleurs ils ont des points d\'ébullition différents, ce qui est la signature pratique des diastéréoisomères.'}
});

S({
  grp:G1, title:'Constitution, configuration, conformation',
  consigne:'Lis le tableau ligne par ligne : ce qui change, et ce qu\'il faut casser pour passer de l\'un à l\'autre.',
  build(host){
    const box=el('div');
    box.innerHTML=`<table class="dat"><thead><tr><th></th><th>Ce qui change</th><th>Pour passer de l'un à l'autre</th></tr></thead><tbody>
      <tr><td><b>Constitution</b></td><td>l'ordre des liaisons</td><td>casser et refaire des liaisons</td></tr>
      <tr><td><b>Configuration</b></td><td>la disposition dans l'espace, à constitution fixée</td><td>casser au moins une liaison</td></tr>
      <tr><td><b>Conformation</b></td><td>la forme, par rotation autour de liaisons simples</td><td>rien à casser — il suffit de tourner</td></tr>
      </tbody></table>`;
    host.appendChild(box);
    host.appendChild(el('div','statusline','Test rapide : si tu peux passer de A à B <b>en faisant tourner</b> des liaisons simples, ce sont deux conformations de la même molécule — pas deux isomères.'));
  },
  une:'Trois mots qui se ressemblent et qu\'on confond tout le temps. Le critère qui les sépare : qu\'est-ce qu\'il faut casser pour passer de l\'un à l\'autre ?',
  probleme:'<p>Cette confusion coûte cher, parce qu\'elle brouille tout le reste. Exemple typique : « le cyclohexane a deux conformations chaise, donc deux isomères » — non. Ou : « les deux rotamères de l\'éthane sont des stéréoisomères » — non plus.</p>',
  etapes:[
   {q:'Constitution : qui est lié à qui.',
    t:'C\'est la liste des liaisons. Le but-1-ène et le but-2-ène ont la même formule brute mais pas la même constitution. Pour passer de l\'un à l\'autre il faut <b>casser et refaire</b> des liaisons : c\'est une réaction chimique.'},
   {q:'Configuration : la disposition dans l\'espace, à constitution fixée.',
    t:'C\'est ce que décrivent R/S, Z/E, cis/trans. Pour changer une configuration il faut <b>casser au moins une liaison</b> — c\'est pour cela qu\'un centre stéréogène « tient » à température ambiante.'},
   {q:'Conformation : ce qui bouge tout seul.',
    t:'Rotation autour des liaisons simples. Aucune liaison n\'est cassée, les barrières sont petites (quelques dizaines de kJ·mol⁻¹), donc les conformères s\'interconvertissent en permanence. Ils ne sont pas des isomères séparables.'},
   {q:'Et la zone grise ?',
    t:'Elle existe, et c\'est le sujet de la section suivante. Quand la barrière de rotation devient grande — un biphényle très encombré, par exemple — des « conformères » deviennent séparables et méritent alors d\'être appelés stéréoisomères. La frontière n\'est pas dans la nature : elle est dans <b>l\'échelle de temps</b> de la mesure.'}
  ],
  retenir:[
   'Constitution = l\'ordre des liaisons.',
   'Configuration = la géométrie à constitution fixée ; il faut casser une liaison pour la changer.',
   'Conformation = ce qu\'on obtient en tournant, sans rien casser.',
   'La frontière configuration / conformation dépend de la hauteur de la barrière, donc de l\'échelle de temps.'
  ],
  quiz:{q:'La glucose en solution existe sous forme α et β (anomères). Configuration ou conformation&nbsp;?',
        a:'<b>Configuration</b> : passer de l\'anomère α à l\'anomère β demande d\'ouvrir puis de refermer le cycle, donc de casser une liaison C–O. Ce sont bien deux diastéréoisomères, séparables en principe. Ce qui trompe, c\'est qu\'en solution aqueuse l\'ouverture du cycle est assez rapide pour qu\'ils s\'interconvertissent spontanément (mutarotation) — un bel exemple de la zone grise de la section suivante.'}
});

S({
  grp:G1, title:'Molécule ou composé ? Tout dépend de l\'échelle de temps',
  consigne:'Fais glisser la température et regarde où tombe le trait rouge par rapport aux fenêtres colorées.',
  build(host){
    const fig=el('div','figbox'), ctl=el('div','card'), tab=el('div');
    tab.innerHTML=`<table class="dat"><thead><tr><th>Expérience sur le chlorocyclohexane</th><th>Résultat</th></tr></thead><tbody>
      <tr><td>RMN ¹H à 25 °C</td><td>une seule espèce</td></tr>
      <tr><td>RMN ¹H à −95 °C</td><td>deux espèces</td></tr>
      <tr><td>cristallisation à −150 °C</td><td>deux composés séparés</td></tr>
      </tbody></table>`;
    ctl.innerHTML=`<div class="slab"><span>Température</span><b><span id="vT">25</span> °C</b></div>
      <input type="range" id="sT" min="-170" max="60" step="1" value="25">
      <div class="slab"><span>Barrière ΔG‡</span><b><span id="vG">43</span> kJ·mol⁻¹</b></div>
      <input type="range" id="sG" min="20" max="120" step="1" value="43">
      <div class="statusline" id="out" style="margin-top:10px"></div>`;
    host.appendChild(tab); host.appendChild(fig); host.appendChild(ctl);
    const $=(i)=>ctl.querySelector('#'+i);
    const upd=()=>{
      const tc=parseFloat($('sT').value), dG=parseFloat($('sG').value), T=tc+273.15;
      fig.innerHTML=figTemps(dG,T);
      $('vT').textContent=(tc<0?'−':'')+Math.abs(tc); $('vG').textContent=dG;
      const t=demiVie(dG,T);
      $('out').innerHTML='demi-vie d\'interconversion : <b>'+formatTemps(t)+'</b>';
    };
    $('sT').oninput=upd; $('sG').oninput=upd; upd();
  },
  une:'Une molécule est un objet ; un composé est ce qu\'on peut mettre dans un flacon. Entre les deux il y a le temps qu\'il faut pour faire la mesure.',
  probleme:'<p>Le chlorocyclohexane pose une question embarrassante : combien d\'espèces contient‑il&nbsp;? À 25 °C la RMN en voit une. À −95 °C elle en voit deux. À −150 °C on arrive à les <b>cristalliser séparément</b>. La molécule n\'a pas changé. Qu\'est‑ce qui a changé&nbsp;?</p>',
  etapes:[
   {q:'Ce qui interconvertit les deux formes.',
    t:'L\'inversion de cycle : le chlore passe d\'axial à équatorial. C\'est un simple changement de <b>conformation</b>, avec une barrière d\'environ 43 kJ·mol⁻¹.'},
   {q:'Pourquoi la RMN n\'en voit qu\'une à 25 °C.',
    t:'À 25 °C l\'inversion se produit environ cent mille fois par seconde. La RMN, qui « regarde » pendant des millisecondes, ne voit qu\'une <b>moyenne</b>. Robinson insiste : ce ne sont pas les molécules qui sont moyennes, c\'est la mesure.'},
   {q:'Pourquoi elle en voit deux à −95 °C.',
    t:'La demi‑vie passe à quelques secondes : c\'est maintenant plus lent que la mesure. Chaque forme a le temps de donner son propre signal.'},
   {q:'Et pourquoi on peut les séparer à −150 °C.',
    t:'La demi‑vie se compte alors en heures ou en jours. On a largement le temps de cristalliser l\'une puis l\'autre. Pour un chimiste, ce sont devenus <b>deux composés</b>.'},
   {q:'La règle pratique.',
    t:'On considère en général que deux formes sont séparables à température ambiante si la barrière dépasse environ <b>90 kJ·mol⁻¹</b>. En dessous, on parle de conformères ; au‑dessus, de stéréoisomères. Cette frontière n\'a rien d\'absolu : elle dépend de la technique.'}
  ],
  retenir:[
   'Chaque technique a sa fenêtre temporelle : diffraction ≈ 10⁻¹⁵ s, IR ≈ 10⁻¹³ s, RMN ≈ 10⁻³ à 1 s, séparation ≥ 1 min.',
   'On ne « voit » deux espèces que si l\'interconversion est plus LENTE que la mesure.',
   'Seuil pratique de séparabilité à 25 °C : ΔG‡ ≈ 90 kJ·mol⁻¹.',
   'Refroidir ne change pas la molécule : cela ralentit l\'interconversion.'
  ],
  plus:{titre:'Le calcul, si tu veux le refaire',
    body:'<p>La constante de vitesse d\'un processus unimoléculaire suit l\'équation d\'Eyring :</p>'
     +'<p style="text-align:center"><b>k = (k<sub>B</sub>·T / h) · exp(−ΔG‡ / RT)</b></p>'
     +'<p>avec k<sub>B</sub> = 1,381·10⁻²³ J·K⁻¹ et h = 6,626·10⁻³⁴ J·s. La demi‑vie vaut t½ = ln2 / k.</p>'
     +'<p>Le facteur k<sub>B</sub>T/h vaut environ 6·10¹² s⁻¹ à 25 °C : c\'est la « fréquence de tentative ». Tout le reste est dans l\'exponentielle.</p>'
     +'<p>Fais le test avec le curseur : à 25 °C, une barrière de 43 kJ·mol⁻¹ donne une demi‑vie de quelques microsecondes ; 90 kJ·mol⁻¹ donne quelques minutes ; 120 kJ·mol⁻¹ donne des années. Trois chiffres qui valent la peine d\'être mémorisés.</p>'
     +'<p><i>Les trois lignes du tableau sont celles de Robinson ; la valeur de barrière utilisée (43 kJ·mol⁻¹) est un ordre de grandeur courant pour l\'inversion du chlorocyclohexane, et le curseur permet de voir ce que change ce choix.</i></p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.2 et §4.6, p. 38–39 et 46.'},
  quiz:{q:'Le N,N-diméthylformamide donne deux signaux méthyle en RMN à 25 °C. Que peut-on en déduire&nbsp;?',
        a:'Que la rotation autour de la liaison C–N est <b>plus lente</b> que l\'échelle de temps de la RMN — donc que cette liaison a un caractère de double liaison partielle (l\'azote donne son doublet dans le carbonyle). La barrière est d\'environ 80 kJ·mol⁻¹. En chauffant, les deux signaux coalescent : c\'est l\'expérience classique qui sert justement à mesurer cette barrière.'}
});

S({
  grp:G1, title:'Ce que les différences veulent dire',
  consigne:'Lis le tableau de gauche à droite : chaque type d\'isomérie correspond à un type de différence.',
  build(host){
    const box=el('div');
    const L=[
     ['de constitution','topologique','qui est lié à qui','—',''],
     ['diastéréomérie','géométrique','les distances entre atomes changent','configuration RELATIVE','minuscules : cis, trans, syn, anti, l, u'],
     ['énantiomérie','topographique','mêmes distances, « main » opposée','configuration ABSOLUE','MAJUSCULES : R, S, M, P']];
    box.innerHTML = L.map(r=>
      `<div class="card" style="margin-bottom:10px">
        <div style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink2);font-weight:800">Isomérie ${r[0]}</div>
        <div style="font-size:17px;font-weight:700;margin:6px 0 2px">différence <span style="color:var(--blue)">${r[1]}</span></div>
        <div style="font-size:15px;color:var(--ink2);margin-bottom:8px">${r[2]}</div>
        <div style="font-size:15px"><b>${r[3]}</b>${r[4]?'<br><span style="color:var(--ink2);font-size:14px">'+r[4]+'</span>':''}</div>
      </div>`).join('');
    host.appendChild(box);
    host.appendChild(el('div','statusline','L\'exception à la règle des majuscules : <b>Z et E</b>, qui décrivent une configuration relative mais s\'écrivent en majuscules — parce qu\'ils ont été adoptés avant que la règle soit fixée.'));
  },
  une:'Les diastéréoisomères diffèrent par des distances ; les énantiomères diffèrent par une main. C\'est pour cela que les premiers ont des propriétés différentes et pas les seconds.',
  probleme:'<p>Pourquoi les deux énantiomères de l\'acide tartrique ont‑ils exactement le même point de fusion, alors que le méso fond 30 °C plus bas&nbsp;? La réponse n\'est pas une règle à retenir : elle découle de la <b>nature</b> de la différence.</p>',
  etapes:[
   {q:'Deux diastéréoisomères diffèrent GÉOMÉTRIQUEMENT.',
    t:'Les distances entre atomes ne sont pas les mêmes. Dans l\'acide maléique les deux CO₂H sont voisins (ils font même une liaison hydrogène intramoléculaire), dans l\'acide fumarique ils sont opposés. Tout ce qui dépend de la forme — point de fusion, solubilité, pK<sub>a</sub> — est donc différent.'},
   {q:'Deux énantiomères diffèrent TOPOGRAPHIQUEMENT.',
    t:'Toutes les distances entre atomes équivalents sont <b>identiques</b> : on dit qu\'ils sont isométriques. Seule la « main » change. Aucune propriété scalaire ne peut les distinguer.'},
   {q:'Conséquence directe.',
    t:'Il faut un <b>partenaire chiral</b> pour révéler la différence : un autre énantiomère, une enzyme, une phase stationnaire chirale, ou de la lumière polarisée circulairement. En milieu achiral, ils sont indiscernables.'},
   {q:'D\'où la logique des descripteurs.',
    t:'Une différence géométrique se décrit par une configuration <b>relative</b> (cis/trans, syn/anti, l/u) ; une différence topographique par une configuration <b>absolue</b> (R/S, M/P). Robinson signale même une convention typographique : minuscules pour le relatif, majuscules pour l\'absolu.'},
   {q:'Pourquoi ça compte pour la synthèse asymétrique.',
    t:'C\'est exactement l\'argument central du chapitre CH0904 : deux produits énantiomères ont la même énergie (différence topographique seulement), donc la thermodynamique est muette. Deux états de transition diastéréoisomères diffèrent géométriquement, donc en énergie. Toute la stratégie consiste à passer du deuxième cas au premier.'}
  ],
  retenir:[
   'Diastéréoisomères : différence géométrique → propriétés différentes → séparables.',
   'Énantiomères : différence topographique → propriétés identiques en milieu achiral → inséparables.',
   'Relatif = minuscules (sauf Z et E). Absolu = majuscules.',
   'Pour révéler une différence topographique, il faut un environnement chiral.'
  ],
  quiz:{q:'Pourquoi une HPLC chirale sépare-t-elle des énantiomères alors qu\'une HPLC ordinaire n\'y arrive pas&nbsp;?',
        a:'Parce que la phase stationnaire chirale forme avec chacun des deux énantiomères un <b>complexe diastéréoisomère</b>. Or des diastéréoisomères diffèrent géométriquement, donc ils ont des énergies d\'interaction différentes, donc des temps de rétention différents. Sur une silice ordinaire (achirale), les deux complexes seraient énantiomères entre eux, donc d\'énergie identique : aucune séparation possible. C\'est le même raisonnement que pour les états de transition.'}
});
