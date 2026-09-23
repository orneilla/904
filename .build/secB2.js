
/* ==========================================================================
   GROUPE 2 — Où se cache la chiralité
   ========================================================================== */
const G2='2 — Où se cache la chiralité';

S({
  grp:G2, title:'Les quatre unités stéréogènes',
  consigne:'Touche chacun des quatre boutons : à chaque fois, demande-toi ce qui se passe si on échange deux ligands.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), st=el('div','statusline'); let cur='centre';
    const draw=()=>{
      fig.innerHTML=figUnites(cur);
      st.innerHTML='<b>Exemples :</b> '+UNITES[cur].ex+'<br>'+UNITES[cur].why;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    [['centre','Centre'],['axe','Axe'],['plan','Plan'],['dbl','Double liaison']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.style.flex='1 1 42%';
      b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); host.appendChild(st); draw();
  },
  une:'Une unité stéréogène, c\'est un endroit de la molécule où échanger deux ligands fabrique un stéréoisomère. Ce n\'est pas forcément un atome.',
  probleme:'<p>On apprend souvent « carbone asymétrique = quatre substituants différents », et on s\'arrête là. C\'est une définition trop étroite : elle rate les allènes, les biphényles encombrés, le BINAP — et le BINAP est sans doute le ligand chiral le plus utilisé au monde.</p><p>Robinson propose une définition qui couvre tous les cas.</p>',
  etapes:[
   {q:'La définition générale.',
    t:'Une molécule possède une <b>unité stéréogène</b> si l\'échange d\'une paire de ligands appropriée engendre un stéréoisomère. Remarque qu\'on ne parle ni d\'atome, ni de chiralité : la définition est plus large que les deux.'},
   {q:'Le centre stéréogène.',
    t:'Le cas courant : un atome tétraédrique portant quatre ligands différents. Ce n\'est pas réservé au carbone — N⁺, P, Si, S en font autant, à condition qu\'ils ne s\'inversent pas trop vite (section suivante).'},
   {q:'L\'axe chiral.',
    t:'Dans un allène, les deux bouts du système C=C=C sont dans des <b>plans perpendiculaires</b>. Si chaque bout porte deux substituants différents, l\'ensemble forme une hélice : la molécule est chirale sans contenir le moindre atome « asymétrique ». Même chose pour un biphényle dont la rotation est bloquée.'},
   {q:'Le plan chiral.',
    t:'Rare. Un cycle aromatique dissymétriquement substitué, maintenu par un pont qui l\'empêche de tourner. Robinson précise qu\'on peut toujours le ramener à une unité hélicoïdale pour le nommer.'},
   {q:'La double liaison.',
    t:'Elle est stéréogène (échanger deux ligands donne Z au lieu de E) mais <b>pas chirale</b> : Z et E ne sont pas images miroir, ce sont des diastéréoisomères. C\'est un bon rappel que « stéréogène » ne veut pas dire « chiral ».'},
   {q:'Le piège à connaître.',
    t:'Une double liaison dans un petit cycle n\'est PAS stéréogène : il est physiquement impossible d\'échanger les ligands. Même chose pour les têtes de pont d\'un bicyclique contraint. Compter les stéréoisomères exige donc de vérifier que l\'échange est réellement possible.'}
  ],
  retenir:[
   'Stéréogène = échanger deux ligands donne un stéréoisomère.',
   'Quatre types : centre, axe, plan, double liaison.',
   'Stéréogène ≠ chiral : une double liaison est stéréogène mais donne des diastéréoisomères.',
   'Vérifie toujours que l\'échange est géométriquement possible (petits cycles, ponts).'
  ],
  plus:{titre:'Pourquoi un allène est chiral, concrètement',
    body:'<p>Le carbone central d\'un allène est sp : il forme deux systèmes π <b>perpendiculaires</b> entre eux. Chaque carbone terminal est sp², donc plan, et son plan contient les deux substituants qu\'il porte.</p><p>Résultat : les deux paires de substituants sont dans deux plans à 90°. Il n\'y a plus de plan de symétrie dès que chaque bout porte deux ligands différents — et la molécule devient chirale.</p><p>Robinson détaille le décompte : l\'allène nu (propa-1,2-diène) a deux plans de symétrie ; il en reste un si un seul bout est dissymétrique ; il n\'en reste aucun si les deux bouts le sont. C\'est exactement la condition.</p><p>Avantage pratique : la barrière de rotation autour d\'une double liaison est énorme, donc un allène chiral ne se racémise jamais spontanément, quelle que soit la taille des substituants. Ce n\'est pas le cas des biphényles, où c\'est l\'encombrement qui fait tout le travail.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.4 et §4.5, fig. 4.6 et 4.12, p. 41–44.'},
  quiz:{q:'Le BINAP est un ligand de phosphine très utilisé en catalyse asymétrique. Il n\'a aucun carbone à quatre substituants différents. Pourquoi est-il chiral&nbsp;?',
        a:'C\'est un <b>atropisomère</b> : deux unités naphtyle reliées par une liaison simple que l\'encombrement empêche de tourner. La molécule possède donc un <b>axe chiral</b>, comme un biphényle très substitué. La barrière de rotation est assez élevée pour que les deux formes soient isolables et stables, et on les nomme avec les descripteurs (R) et (S) — pour l\'axe, pas pour un atome.'}
});

S({
  grp:G2, title:'Pourquoi certains atomes gardent leur configuration, et d\'autres non',
  consigne:'Touche une barre : plus elle est longue, plus l\'inversion est difficile.',
  build(host){
    const fig=el('div','figbox'), st=el('div','statusline'); let sel=1;
    const draw=()=>{ fig.innerHTML=figBarrieres(sel);
      st.innerHTML='<b>'+BARR[sel].t+' — environ '+(BARR[sel].v||'0')+' kJ·mol⁻¹.</b> '+BARR[sel].d; };
    const row=el('div','btnrow');
    BARR.forEach((b,i)=>{ const btn=el('button','btn'); btn.textContent=b.t.split(' ')[0];
      btn.style.flex='1 1 30%'; btn.style.fontSize='13px'; btn.onclick=()=>{sel=i;draw();}; row.appendChild(btn); });
    host.appendChild(fig); host.appendChild(row); host.appendChild(st); draw();
  },
  une:'Un atome pyramidal peut se retourner comme un parapluie. Tout dépend de la hauteur de la barrière — et c\'est elle qui décide si l\'on peut isoler les deux formes.',
  probleme:'<p>Une amine tertiaire NRR\'R" possède trois substituants différents plus un doublet : en principe, un centre stéréogène. Pourtant on n\'a jamais isolé les deux énantiomères d\'une amine simple. En revanche le sulfinamide d\'Ellman, lui, est vendu énantiopur en flacon.</p><p>La différence n\'est pas de nature : elle est de <b>vitesse</b>.</p>',
  etapes:[
   {q:'Le mécanisme de l\'inversion.',
    t:'L\'atome pyramidal passe par un état de transition où il est <b>plan</b>, puis se retourne de l\'autre côté. Aucune liaison n\'est cassée : c\'est juste un pliage. D\'où des barrières souvent basses.'},
   {q:'Ce qui abaisse la barrière.',
    t:'Tout ce qui stabilise l\'azote plan. La <b>conjugaison</b> avec un accepteur π en est le meilleur exemple : dans un amide, le doublet de l\'azote part dans le carbonyle, l\'azote est déjà plan, et la barrière tombe à zéro.'},
   {q:'Ce qui l\'augmente — d\'abord la tension de cycle.',
    t:'Dans une aziridine, l\'angle du cycle vaut 60°, très loin des 120° de l\'azote plan. Atteindre l\'état de transition coûte donc très cher : la barrière monte à 72 kJ·mol⁻¹.'},
   {q:'Ce qui l\'augmente aussi — les substituants électronégatifs.',
    t:'Un chlore ou un oxygène sur l\'azote abaisse l\'énergie du doublet non liant, ce qui rend plus coûteux de le faire passer dans l\'orbitale 2p de l\'azote plan. Une oxaziridine atteint 136 kJ·mol⁻¹ : ses deux formes sont isolables.'},
   {q:'Et pourquoi le soufre gagne toujours.',
    t:'Les éléments des périodes suivantes ont des orbitales non liantes à plus fort caractère <b>s</b>, donc plus difficiles à déformer. Un sulfoxyde ou un sulfinamide dépasse largement 150 kJ·mol⁻¹ : c\'est parfaitement stable à température ambiante.'},
   {q:'La conclusion pratique.',
    t:'Au-dessus d\'environ <b>90 kJ·mol⁻¹</b>, les deux formes sont séparables à température ambiante. C\'est exactement pour cela que l\'auxiliaire d\'Ellman est un <b>sulfinamide</b> et pas une amine chirale : le soufre tient sa configuration, l\'azote non.'}
  ],
  retenir:[
   'L\'inversion pyramidale passe par un état de transition plan ; aucune liaison n\'est cassée.',
   'Conjugaison → barrière basse. Tension de cycle et substituants électronégatifs → barrière haute.',
   'Deuxième période et au-delà (S, P) : barrières bien plus hautes que l\'azote.',
   'Seuil de séparabilité à 25 °C : environ 90 kJ·mol⁻¹ — le même que pour les conformères.'
  ],
  plus:{titre:'Le cas des sels d\'ammonium',
    body:'<p>Un ion ammonium quaternaire NR₄⁺ n\'a plus de doublet : il ne peut plus s\'inverser du tout. Les premiers exemples historiques de centres stéréogènes non carbonés étaient justement des sels d\'ammonium.</p><p>Mais attention au cas intermédiaire : un ion <b>trialkylammonium</b> HNRR\'R"⁺ se racémise facilement en solution, parce qu\'il suffit qu\'il perde son proton un instant. L\'amine libre s\'inverse, puis se reprotone de l\'autre côté. Robinson note que cela ne s\'arrête qu\'en milieu fortement acide, où la déprotonation devient trop lente.</p><p>Bonne habitude à prendre : quand on te dit qu\'un centre est « configurationnellement stable », demande‑toi toujours <i>par quel chemin</i> il pourrait s\'épimériser. Ici ce n\'est pas l\'inversion directe, c\'est le passage par la base libre.</p>',
    src:'<b>Robinson, <i>Organic Stereochemistry</i></b>, §4.5, fig. 4.9–4.11, p. 43–44.'},
  quiz:{q:'Pourquoi une phosphine chirale comme celles utilisées en catalyse ne se racémise-t-elle pas dans le ballon&nbsp;?',
        a:'Parce que la barrière d\'inversion du phosphore est très élevée — Robinson cite des valeurs supérieures à 160 kJ·mol⁻¹ pour certaines phosphines. À température ambiante, cela correspond à des demi‑vies astronomiques. C\'est ce qui rend possible toute la catalyse asymétrique au phosphore : le ligand garde sa main pendant les milliers de tours du cycle catalytique.'}
});

S({
  grp:G2, title:'Compter les stéréoisomères sans se tromper',
  consigne:'Lis le tableau de haut en bas : la règle 2ⁿ, puis les trois raisons de trouver moins.',
  build(host){
    const box=el('div');
    box.innerHTML=`<table class="dat"><thead><tr><th>Cas</th><th class="num">attendu</th><th class="num">réel</th></tr></thead><tbody>
      <tr><td>2 centres <b>différents</b> (thréose)</td><td class="num">4</td><td class="num">4</td></tr>
      <tr><td>2 centres <b>identiques</b> (ac. tartrique)</td><td class="num">4</td><td class="num">3</td></tr>
      <tr><td>C=C dans un <b>petit cycle</b></td><td class="num">2</td><td class="num">1</td></tr>
      <tr><td>têtes de pont d'un <b>bicyclique tendu</b></td><td class="num">4</td><td class="num">2</td></tr>
      </tbody></table>`;
    host.appendChild(box);
    host.appendChild(el('div','statusline','La formule 2ⁿ est un <b>maximum</b>, pas un résultat. À chaque fois qu\'on trouve moins, c\'est qu\'une symétrie ou une contrainte géométrique a fusionné deux possibilités.'));
  },
  une:'2ⁿ est un plafond, pas une réponse. Il faut ensuite retirer les formes méso et les échanges physiquement impossibles.',
  probleme:'<p>La règle « n centres stéréogènes → 2ⁿ stéréoisomères » tombe en défaut dès l\'acide tartrique, qui n\'en a que trois au lieu de quatre. Plutôt que d\'apprendre des exceptions, mieux vaut comprendre d\'où vient chaque perte.</p>',
  etapes:[
   {q:'D\'abord, factoriser.',
    t:'Robinson appelle <b>factorisation</b> le fait de repérer les unités stéréogènes <i>indépendantes</i>. Une molécule peut contenir un centre, un axe et une double liaison : chacun compte.'},
   {q:'Première perte : la symétrie constitutionnelle (méso).',
    t:'Si deux centres portent exactement les mêmes substituants, la combinaison (R,S) devient <b>identique</b> à (S,R) : c\'est une seule molécule, achirale. On passe de 4 à 3. C\'est le cas de l\'acide tartrique.'},
   {q:'Deuxième perte : l\'échange impossible.',
    t:'Une double liaison dans un cycle à cinq chaînons ne peut pas donner Z et E : le cycle l\'interdit. Elle n\'est donc pas stéréogène, malgré les apparences.'},
   {q:'Troisième perte : les contraintes de pontage.',
    t:'Dans un bicyclique tendu, les têtes de pont ne peuvent pas être inversées indépendamment — la molécule doit être <i>cis</i>-pontée. Deux centres, mais une seule paire d\'énantiomères.'},
   {q:'La méthode fiable.',
    t:'Dessiner toutes les combinaisons (en Fischer, c\'est rapide), puis <b>éliminer les doublons</b> en cherchant un plan ou un centre de symétrie. Ce qui reste est le nombre réel.'}
  ],
  retenir:[
   '2ⁿ est un maximum.',
   'Symétrie constitutionnelle → une forme méso remplace deux formes chirales.',
   'Vérifier que chaque échange de ligands est géométriquement possible.',
   'La méthode sûre : énumérer les dessins, puis chercher les symétries.'
  ],
  quiz:{q:'Le 2,3,4-trihydroxyglutarique a trois centres. Combien de stéréoisomères&nbsp;?',
        a:'Pas 8, mais <b>4</b> : deux formes chirales (une paire d\'énantiomères) et <b>deux formes méso achirales</b>, qui diffèrent uniquement par le centre du milieu. Ce centre-là porte un nom spécial — il est <i>pseudo-asymétrique</i> — et tu le retrouveras en section 4. C\'est l\'exemple que Robinson utilise pour introduire les descripteurs r et s en minuscules.'}
});
