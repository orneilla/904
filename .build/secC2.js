
S({
  grp:GC, title:'Le chélate : un cycle temporaire autour du lithium',
  consigne:'Regarde le schéma par la tranche : le plan est la barre grise, l\'iPr en dépasse vers le haut.',
  build(host){
    const fig=el('div','figbox'); fig.innerHTML=figProfil('ipr'); host.appendChild(fig);
    host.appendChild(el('div','statusline','<b>Valinol :</b> iPr au‑dessus du plan → face du dessus bloquée → E⊕ arrive par‑dessous → Cα de configuration <b>(R)</b>.'));
  },
  une:'Le lithium referme un cycle à six chaînons qui empêche l\'oxazolidinone de tourner. Une fois la rotation bloquée, l\'isopropyle occupe toujours la même face — et c\'est tout le secret.',
  probleme:'<p>Il reste un trou dans le raisonnement. On a un énolate plan, de géométrie connue, avec un gros groupe quelque part. Mais l\'oxazolidinone est reliée à l\'énolate par une <b>liaison simple</b> N–C : elle peut tourner. Si elle tourne, l\'isopropyle passe d\'une face à l\'autre, et la sélectivité s\'effondre.</p><p>Il faut donc bloquer cette rotation. C\'est le rôle du lithium.</p>',
  etapes:[
   {q:'Qu\'est-ce que le lithium tient exactement ?',
    t:'Deux oxygènes : celui de l\'énolate (chargé négativement) et celui du carbonyle du cycle. Les deux traits pointillés violets sont ces deux liaisons de coordination.'},
   {q:'Pourquoi cela fige la molécule ?',
    t:'Parce que les deux oxygènes, le lithium et les atomes qui les relient forment un <b>cycle à six chaînons</b>. Un cycle ne tourne pas. Procter appelle cela un « <i>temporary ring</i> » : on n\'a pas pu mettre le carbonyle dans un vrai cycle, alors on en fabrique un provisoire avec le métal.'},
   {q:'Quel arrangement cela impose-t-il ?',
    t:'Les deux C=O doivent pointer <b>du même côté</b> pour que le lithium puisse les atteindre tous les deux. C\'est un arrangement contraint : sans le lithium, les deux dipôles se mettraient dos à dos.'},
   {q:'Et ensuite ?',
    t:'L\'oxazolidinone est maintenant coplanaire avec l\'énolate et ne peut plus bouger. Le seul groupe qui sorte du plan est l\'isopropyle porté par C4. Il couvre entièrement une face — la zone rouge.'},
   {q:'Conclusion.',
    t:'L\'électrophile n\'a plus le choix : il attaque Cα par la face restée libre, ici celle du dessous. C\'est là toute l\'induction asymétrique — et c\'est pour cela qu\'on obtient 99 : 1.'}
  ],
  retenir:[
   'Le chélate n\'est pas décoratif : c\'est lui qui interdit la rotation N–C.',
   'Cycle à 6 chaînons : O(énolate)–Li–O(carbamate) + les atomes du squelette.',
   'Une fois figé, un seul substituant sort du plan → une seule face accessible.',
   'Sans chélation (contre-ion qui ne coordonne pas), la sélectivité s\'effondre.'
  ],
  plus:{titre:'Chélaté ou non chélaté ? Attention à ne pas confondre avec l\'aldolisation',
    body:'<p>Pour l\'<b>alkylation</b> (ce chapitre), le modèle est bien le chélate lithié : Procter écrit que « <i>l\'énolate lui-même est maintenu rigidement dans la conformation montrée par chélation du lithium au carbonyle de l\'oxazolidinone</i> ».</p><p>Pour l\'<b>aldolisation d\'Evans</b> (chapitre suivant de ton cours, avec Bu₂BOTf), c\'est différent : le bore est déjà occupé à chélater l\'aldéhyde, et l\'oxazolidinone se met alors en position <b>dipôle‑minimisé</b>, les deux C=O dos à dos. La face attaquée est l\'autre.</p><p>Retiens la logique plutôt que le résultat : le métal ne peut pas tout tenir à la fois. Selon ce qu\'il tient, l\'auxiliaire s\'oriente différemment.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §4, fig. 4.12–4.13 et commentaire p. 47–48.'},
  quiz:{q:'Si on remplaçait le lithium par un contre-ion qui ne chélate pas, que se passerait-il&nbsp;?',
        a:'La liaison N–C(énolate) redeviendrait libre de tourner. L\'oxazolidinone adopterait plusieurs orientations, donc l\'isopropyle ne garderait plus toujours la même face. Les deux faces redeviendraient presque équivalentes et le d.r. chuterait fortement. C\'est un bon test mental : chaque fois qu\'un modèle invoque une face bloquée, demande‑toi <i>qu\'est-ce qui empêche la molécule de tourner&nbsp;?</i>'}
});

S({
  grp:GC, title:'Le mécanisme, étape par étape',
  consigne:'Appuie sur « étape suivante » cinq fois et suis les flèches courbes.',
  build(host){
    const fig=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const prev=el('button','btn'), next=el('button','btn'), reset=el('button','btn');
    prev.textContent='‹ Étape'; next.textContent='Étape suivante ›'; reset.textContent='⟲'; reset.style.flex='0 0 56px';
    const draw=()=>{fig.innerHTML=evansStep(k); prev.disabled=(k===0); next.disabled=(k===4);
      prev.style.opacity=k===0?.4:1; next.style.opacity=k===4?.4:1;};
    prev.onclick=()=>{if(k>0){k--;draw();}}; next.onclick=()=>{if(k<4){k++;draw();}}; reset.onclick=()=>{k=0;draw();};
    row.appendChild(prev); row.appendChild(next); row.appendChild(reset);
    host.appendChild(fig); host.appendChild(row); draw();
  },
  une:'Cinq étapes, et une seule décide de tout : celle où l\'électrophile choisit sa face.',
  probleme:'<p>Maintenant qu\'on a chaque ingrédient séparément, on les remet dans l\'ordre. Regarde surtout <b>où</b> se décide la stéréochimie : ce n\'est ni à la déprotonation, ni au clivage.</p>',
  etapes:[
   {q:'Étape 1 — LDA arrache le proton en α.',
    t:'LDA est une base forte mais un mauvais nucléophile : trop encombrée pour additionner sur un carbonyle, elle ne peut qu\'arracher un proton. Elle vise celui en α, le plus acide et le plus accessible.'},
   {q:'Étape 2 — l\'énolate Z est formé.',
    t:'Exclusivement Z, pour la raison A(1,3) vue plus haut. À ce stade le carbone α est encore sp² : <b>aucune stéréochimie n\'est fixée</b>.'},
   {q:'Étape 3 — le lithium referme le chélate.',
    t:'Le cycle à six chaînons se forme, la rotation N–C est bloquée, l\'isopropyle se retrouve définitivement d\'un côté. Toujours aucun centre stéréogène créé — mais le décor est planté.'},
   {q:'Étape 4 — l\'électrophile attaque. ÉTAPE DÉTERMINANTE.',
    t:'E–X arrive par la face libre et le carbone α devient tétraédrique. C\'est <b>ici</b>, et seulement ici, que la stéréochimie du produit est décidée. Mécanisme : une SN2 classique, où l\'énolate est le nucléophile et E–X l\'électrophile — d\'où l\'inversion sur le carbone de E–X, invisible ici puisqu\'il n\'est pas stéréogène.'},
   {q:'Étape 5 — le produit.',
    t:'On dessine E en pointillés parce qu\'il est arrivé par l\'arrière, l\'isopropyle étant en avant. Le diastéréoisomère majoritaire est là ; le minoritaire vient des 1 % qui ont attaqué l\'autre face.'}
  ],
  retenir:[
   'Étapes 1 à 3 : on prépare le décor, rien n\'est encore joué.',
   'Étape 4 : tout se joue. C\'est la seule étape stéréodéterminante.',
   'Étape 5 : le clivage (section suivante) ne touchera plus à ce centre.',
   'Savoir repérer l\'étape stéréodéterminante est le réflexe le plus utile de tout le chapitre.'
  ],
  quiz:{q:'Pourquoi LDA n\'additionne-t-elle pas sur le carbonyle au lieu de déprotoner&nbsp;?',
        a:'Parce qu\'elle porte deux isopropyles sur son azote. Pour additionner, elle devrait approcher le carbone du carbonyle, qui est entouré de substituants : l\'état de transition est très encombré. Arracher un proton, beaucoup plus exposé, demande beaucoup moins de place. C\'est le cas général : <b>base forte + très encombrée = déprotonation, pas addition</b>.'}
});

S({
  grp:GC, title:'Valinol ou noréphédrine : on choisit son énantiomère',
  consigne:'Appuie sur « valinol » puis sur « noréphédrine » et regarde de quel côté arrive E.',
  build(host){
    const row=el('div','btnrow'), f1=el('div','figbox'), f2=el('div','figbox'), st=el('div','statusline');
    let cur='ipr';
    const draw=()=>{
      const A=AUXDEF[cur];
      f1.innerHTML=figProfil(cur); f2.innerHTML=figProduit(cur);
      st.innerHTML=`<b>${A.nom} :</b> ${A.groupes} ${cur==='ipr'?'au‑dessus':'au‑dessous'} du plan → face ${A.bloq} bloquée → face ${A.face} libre → Cα = <b>${A.alpha}</b> → après clivage, <b>l'énantiomère opposé</b> de l'acide.`;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    [['ipr','Valinol'],['nor','Noréphédrine']].forEach(([k,t])=>{
      const b=el('button','btn blue'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(f1); host.appendChild(f2); host.appendChild(st); draw();
  },
  une:'Les deux auxiliaires ne sont pas énantiomères l\'un de l\'autre, mais leurs groupes encombrants pointent vers des faces opposées : c\'est suffisant pour obtenir les deux énantiomères du produit.',
  probleme:'<p>Tes notes listent comme inconvénient : « il faut avoir accès aux deux énantiomères de l\'auxiliaire ». Or la nature ne fournit en général qu\'un seul énantiomère d\'un acide aminé. Comment fait‑on pour obtenir l\'autre configuration&nbsp;?</p><p>Réponse : on ne prend pas l\'énantiomère de l\'auxiliaire, on prend <b>un autre auxiliaire</b>, choisi pour bloquer l\'autre face.</p>',
  etapes:[
   {q:'Que change-t-on exactement ?',
    t:'On passe de l\'oxazolidinone du <b>valinol</b> (un isopropyle en C4, configuration S) à celle de la <b>noréphédrine</b> (un méthyle en C4 et un phényle en C5, configuration 4R,5S).'},
   {q:'Ces deux molécules sont-elles énantiomères ?',
    t:'Non — elles n\'ont même pas la même formule brute. On dit qu\'elles sont <b>pseudo‑énantiomères</b> : elles se comportent comme des énantiomères vis‑à‑vis de <i>cette</i> réaction, sans l\'être réellement.'},
   {q:'Pourquoi cela marche-t-il quand même ?',
    t:'Parce que ce qui compte n\'est pas la molécule entière, mais la <b>position du groupe encombrant par rapport au plan de l\'énolate</b>. Chez le valinol il pointe vers le haut ; chez la noréphédrine, Me et Ph pointent vers le bas. La face grisée change de côté.'},
   {q:'Que devient le produit ?',
    t:'La flèche verte s\'inverse. Le produit passe du trait hachuré au coin plein : Cα devient (S) au lieu de (R). Après clivage, on récupère l\'<b>énantiomère opposé</b> de l\'acide.'},
   {q:'Attention au mot « énantiomère ».',
    t:'Les deux produits <b>P–A*</b> ne sont pas énantiomères : ce sont des diastéréoisomères, puisque les auxiliaires diffèrent. Ils ne deviennent énantiomères qu\'<b>après</b> le clivage.'}
  ],
  retenir:[
   'Valinol → Cα = (R). Noréphédrine → Cα = (S). Vérifié par RDKit sur les dessins eux‑mêmes.',
   'Pseudo-énantiomères : même effet, molécules différentes.',
   'Les deux auxiliaires viennent du pool chiral et coûtent tous les deux quelques euros le gramme.',
   'Les d.r. sont comparables (98 % contre 96 % de d.e. avec PhCH₂Br) : aucune des deux voies n\'est « la bonne ».'
  ],
  plus:{titre:'Ce que dit Procter, et vérification indépendante',
    body:'<p>Procter traite exactement ces deux auxiliaires (ses composés <b>4.24</b>, dérivé de la valine, et <b>4.28</b>, dérivé de la noréphédrine) et conclut : « <i>la face « inférieure » de l\'énolate 4.26 est gênée par le substituant de l\'oxazolidinone, l\'alkylation doit donc se faire sur la face supérieure. Un raisonnement analogue prédit que l\'autre auxiliaire dirige l\'alkylation sur la face « inférieure ».</i> »</p><p>J\'ai vérifié les deux dessins de façon indépendante : les coordonnées exactes de chaque atome de la figure ont été transcrites en molfile et relues par RDKit. Résultat : valinol → C4 = (S) et Cα = (R) ; noréphédrine → (4R,5S) et Cα = (S). Le détail est dans <code>verification_stereo.md</code>.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §4, fig. 4.13 et tableau 4.2, p. 48.'},
  quiz:{q:'Les produits obtenus avec le valinol et avec la noréphédrine sont-ils énantiomères&nbsp;?',
        a:'Pas tels quels : ce sont des <b>diastéréoisomères</b>, puisque les auxiliaires eux‑mêmes sont différents. Ils ne deviennent énantiomères qu\'<b>après le clivage</b>, quand il ne reste plus que le centre créé pendant l\'alkylation.'},
  flag:'⚠️ Dans tes notes (haut de la page 2), le produit de la voie noréphédrine est redessiné avec un <b>isopropyle</b> — le squelette de la page 1 a été recopié. La stéréochimie de E, elle, est correcte. Corrigé ici.'
});

S({
  grp:GC, title:'Quel électrophile choisir ?',
  consigne:'Touche une ligne du tableau pour comprendre son d.r. et son rendement.',
  build(host){
    const box=el('div'), why=el('div','statusline'); let cur=0;
    const draw=()=>{
      box.innerHTML=`<table class="dat"><thead><tr><th>Électrophile</th><th class="num">d.r.</th><th class="num">Rdt</th></tr></thead><tbody>`
      + ELECTRO.map((x,i)=>`<tr data-i="${i}" class="${i===cur?'sel':''}"><td style="color:var(--green);font-weight:600">${x.e}</td><td class="num">${x.dr}</td><td class="num">${x.rdt}</td></tr>`).join('')
      +`</tbody></table>`;
      box.querySelectorAll('tr[data-i]').forEach(tr=>tr.onclick=()=>{cur=+tr.dataset.i;draw();});
      why.innerHTML=`<b>${ELECTRO[cur].nom}</b> — ${ELECTRO[cur].why}`;
    };
    host.appendChild(box); host.appendChild(why); draw();
  },
  une:'Le rendement mesure la réactivité de l\'électrophile ; le d.r. mesure la capacité de l\'auxiliaire à distinguer ses deux faces. Ce sont deux choses indépendantes.',
  probleme:'<p>Dans ton tableau, le rendement s\'effondre de 92 % à 36 % entre le benzyle et l\'éthyle, alors que le d.r. ne bouge presque pas (99:1 → 94:6). Si on croit que « bonne réaction = bonne sélectivité », ce tableau est incompréhensible. Il faut séparer les deux questions.</p>',
  etapes:[
   {q:'Quel est le mécanisme ?',
    t:'Une <b>SN2</b> : l\'énolate est le nucléophile, E–X l\'électrophile. Ce qui change d\'une ligne à l\'autre, c\'est la facilité avec laquelle la liaison C–X se rompt.'},
   {q:'Pourquoi le benzyle est-il si bon ?',
    t:'Dans l\'état de transition SN2, le carbone attaqué porte une charge partielle. Avec un groupe benzylique, le cycle aromatique voisin la <b>stabilise par conjugaison</b> : l\'état de transition est plus bas, la réaction est plus rapide.'},
   {q:'Et l\'allyle ?',
    t:'Même effet, avec une double liaison au lieu d\'un cycle aromatique. À peine moins efficace.'},
   {q:'Pourquoi l\'iodoéthane est-il mauvais ?',
    t:'Aucune stabilisation possible : c\'est un halogénure primaire ordinaire. La réaction est lente, il faut attendre — et pendant ce temps l\'énolate se dégrade. D\'où 36 % seulement.'},
   {q:'Alors pourquoi le d.r. baisse-t-il un peu aussi ?',
    t:'Parce qu\'un électrophile plus <b>gros</b> ressent davantage la différence entre les deux faces. Le benzyle, volumineux, est repoussé très nettement par l\'isopropyle ; l\'éthyle, plus petit, se faufile un peu plus souvent du mauvais côté. Mais l\'effet reste secondaire : c\'est l\'auxiliaire qui gouverne.'}
  ],
  retenir:[
   'Rendement = réactivité. d.r. = discrimination des faces. Ne pas confondre.',
   'Benzylique et allylique : états de transition SN2 stabilisés → rapides.',
   'Un électrophile encombrant aide légèrement la sélectivité.',
   'Un mauvais électrophile réagit peu, mais il réagit quand même du bon côté.'
  ],
  plus:{titre:'Comparaison avec les valeurs de Procter',
    body:'<p>Procter donne, pour le même auxiliaire dérivé de la valine (R = Me) : EtI → 92 % de d.e. ; PhCH₂Br → 98 % ; MeI → 80 % ; H₂C=CHCH₂Br → 96 %.</p><p>Converti en d.r. : 96 : 4 ; 99 : 1 ; 90 : 10 ; 98 : 2. Tes valeurs de benzyle et d\'allyle coïncident exactement ; celle de l\'éthyle est un peu plus basse dans tes notes (94 : 6 au lieu de 96 : 4) — il s\'agit probablement d\'un autre substrat ou d\'autres conditions.</p><p>Remarque intéressante : c\'est <b>l\'iodométhane</b> qui donne le plus mauvais d.e. (80 %), ce qui confirme l\'argument de taille — le méthyle est le plus petit électrophile possible.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, tableau 4.2, p. 48.'},
  quiz:{q:'Le rendement chute de 92 % à 36 % entre PhCH₂Br et EtI, mais le d.r. ne passe que de 99:1 à 94:6. Que faut-il en conclure&nbsp;?',
        a:'Que rendement et sélectivité sont indépendants. Le rendement dépend de la vitesse de la SN2 (donc de la stabilisation de l\'état de transition) ; le d.r. dépend de la différence d\'énergie entre <i>deux</i> états de transition qui ont tous les deux le même électrophile. Un électrophile lent reste sélectif — il est juste lent.'}
});

S({
  grp:GC, title:'La roue des clivages',
  consigne:'Touche un secteur de la roue pour voir le produit correspondant.',
  build(host){
    const f1=el('div','figbox'), f2=el('div','figbox'), st=el('div','statusline'); let sel='red';
    const draw=()=>{
      f1.innerHTML=figRoue(sel); f2.innerHTML=figCleavProd(sel);
      const c=CLIV.find(x=>x.k===sel);
      st.innerHTML=`<b>${c.reac}</b> → ${c.prod}.<br>${c.why}`;
      f1.querySelectorAll('[data-k]').forEach(p=>p.addEventListener('click',()=>{sel=p.dataset.k;draw();}));
    };
    host.appendChild(f1); host.appendChild(f2); host.appendChild(st); draw();
  },
  une:'L\'imide porte deux carbonyles ; tout le problème du clivage est de n\'attaquer que celui de la chaîne, pour récupérer l\'auxiliaire intact.',
  probleme:'<p>Regarde la molécule : il y a un carbonyle sur la chaîne (exocyclique) et un carbonyle dans le cycle (le carbamate). Un nucléophile qui se trompe de cible ouvre l\'oxazolidinone — on perd l\'auxiliaire et on ne récupère pas le produit voulu.</p><p>La question est donc : comment viser l\'un plutôt que l\'autre&nbsp;?</p>',
  etapes:[
   {q:'Lequel des deux est le plus électrophile ?',
    t:'Celui de la chaîne. Le carbonyle du cycle est un <b>carbamate</b> : il est flanqué d\'un azote <i>et</i> d\'un oxygène, donc doublement enrichi par donation, donc bien moins électrophile.'},
   {q:'Première famille : les hydrures.',
    t:'LiAlH₄ ou LiBH₄ visent naturellement le carbonyle le plus électrophile et réduisent jusqu\'à l\'<b>alcool primaire</b>. LiBH₄ est plus doux et plus sélectif.'},
   {q:'Deuxième famille : les nucléophiles oxygénés.',
    t:'Un alcoolate donne l\'<b>ester</b> par transestérification. Pour l\'<b>acide</b>, on n\'utilise pas HO⊖ mais HOO⊖ (LiOOH), et c\'est le point le plus élégant de la section — voir la question ci‑dessous.'},
   {q:'Troisième famille : passer par un autre intermédiaire.',
    t:'On échange l\'auxiliaire contre un <b>amide de Weinreb</b>, très stable, qui donnera ensuite proprement un aldéhyde (LiAlH₄) ou une cétone (R\'MgX) sans sur‑addition.'},
   {q:'Le centre stéréogène risque-t-il quelque chose ?',
    t:'Non, tant qu\'on reste doux. Il est en α d\'un carbonyle, donc épimérisable par une base forte — d\'où le choix de conditions rapides et peu basiques. Procter précise que dans tous les cas l\'auxiliaire est enlevé « <i>sans perte de pureté stéréochimique</i> ».'}
  ],
  retenir:[
   'Cible = le carbonyle exocyclique ; à éviter = le carbamate du cycle.',
   'Alcool (LiAlH₄/LiBH₄), acide (LiOOH), ester (RO⊖), aldéhyde et cétone (via Weinreb).',
   'Un seul intermédiaire, cinq niveaux d\'oxydation de sortie.',
   'Le centre créé n\'est jamais touché — à condition de ne pas s\'attarder en milieu basique.'
  ],
  plus:{titre:'Pourquoi HOO⊖ et pas HO⊖ : l\'effet α',
    body:'<p>L\'ion hydroperoxyde HOO⊖ est <b>plus nucléophile</b> que HO⊖ tout en étant <b>moins basique</b>. Cette combinaison paraît contradictoire ; elle s\'explique par l\'<b>effet α</b> : l\'oxygène voisin porte un doublet libre qui déstabilise l\'état fondamental de l\'anion et élève son orbitale HO.</p><p>Conséquence pratique : HOO⊖ attaque vite le carbonyle le plus électrophile et repart avant d\'avoir eu le temps de s\'en prendre au carbamate. HO⊖, lui, plus basique et moins nucléophile, finit par ouvrir le cycle.</p><p>Procter le dit autrement : dans les cas très encombrés, on observe parfois une réaction sur le carbonyle de l\'oxazolidinone, et c\'est justement là que l\'eau oxygénée basique règle le problème.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §4, fig. 4.14 et p. 49.'},
  quiz:{q:'Pourquoi utilise-t-on LiOOH plutôt que LiOH tout seul pour obtenir l\'acide&nbsp;?',
        a:'Parce que HOO⊖ est bien plus nucléophile que HO⊖ (effet α) tout en étant <b>moins basique</b>. Il attaque donc vite et sélectivement le carbonyle exocyclique. HO⊖ réagit plus lentement, reste plus longtemps en contact, et finit par ouvrir aussi l\'oxazolidinone — on perd l\'auxiliaire.'},
  flag:'⚠️ Tes notes indiquent « DIBAL » pour obtenir l\'aldéhyde. C\'est possible en principe (un seul équivalent, −78 °C), mais délicat : la sur-réduction en alcool est fréquente. Procter ne propose pas DIBAL : il passe par la réduction en alcool puis une oxydation (Py·SO₃ / DMSO), ou par l\'amide de Weinreb. À confirmer avec ton enseignant.'
});
