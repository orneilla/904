
/* ==========================================================================
   GROUPE D — L'auxiliaire d'Ellman
   ========================================================================== */
const GD='D — Auxiliaire d\'Ellman';

S({
  grp:GD, title:'Fabriquer la sulfinylimine : à quoi sert MgSO₄',
  consigne:'Bascule entre « sans desséchant » et « avec MgSO₄ » et regarde l\'épaisseur des deux flèches.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), f2=el('div','figbox'); let cur='sans';
    const draw=()=>{fig.innerHTML=figEllmanEq(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['sans','Sans desséchant'],['avec','Avec MgSO₄']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','statusline','Et voilà l\'auxiliaire lui‑même : un soufre entouré de <b>quatre choses différentes</b>, dont un doublet libre.'));
    f2.innerHTML=figSoufre(); host.appendChild(f2);
    draw();
  },
  une:'La condensation aldéhyde + amine est un équilibre qui produit de l\'eau ; MgSO₄ ne fait rien d\'autre que retirer cette eau, ce qui pousse l\'équilibre vers l\'imine.',
  probleme:'<p>L\'auxiliaire d\'Evans s\'accroche par une acylation, irréversible et propre. Celui d\'Ellman s\'accroche par une <b>condensation</b> — et une condensation, c\'est un équilibre. Si on ne fait rien, on s\'arrête à mi‑chemin.</p><p>Deuxième nouveauté : ici, le centre stéréogène de l\'auxiliaire n\'est pas un carbone. C\'est le <b>soufre</b>.</p>',
  etapes:[
   {q:'Quelle est la réaction ?',
    t:'Le doublet de l\'azote du sulfinamide attaque le carbone du carbonyle de l\'aldéhyde. On obtient un intermédiaire tétraédrique (une carbinolamine), qui perd ensuite une molécule d\'eau pour donner la double liaison C=N.'},
   {q:'Pourquoi c\'est un problème ?',
    t:'Toutes ces étapes sont <b>réversibles</b>. L\'eau produite peut revenir hydrolyser l\'imine. À l\'équilibre, on a un mélange — et on perd du rendement.'},
   {q:'Que fait MgSO₄ ?',
    t:'Absolument rien de chimique sur les partenaires : c\'est un <b>desséchant</b>. Il capte l\'eau sous forme de sel hydraté. En retirant un produit du milieu, on déplace l\'équilibre vers la droite (principe de Le Chatelier).'},
   {q:'Pourquoi CH₂Cl₂ ?',
    t:'Parce que c\'est un solvant <b>non coordinant</b> et non protique. Cela compte énormément pour l\'étape suivante — c\'est tout l\'objet de la section sur le solvant.'},
   {q:'Où est la chiralité ?',
    t:'Sur le <b>soufre</b>. Il porte quatre choses différentes : le tert‑butyle, l\'oxygène, l\'azote… et son <b>doublet libre</b>, qui compte comme un quatrième substituant et occupe un vrai volume. Le soufre est donc stéréogène, de configuration (R) ici.'},
   {q:'Et la géométrie de l\'imine ?',
    t:'Une seule est observée : <b>E</b>. Le gros tert‑butyle et le reste de la chaîne se placent le plus loin possible l\'un de l\'autre. Comme pour l\'énolate d\'Evans, une géométrie unique est un préalable à toute sélectivité.'}
  ],
  retenir:[
   'Condensation = équilibre ; MgSO₄ = desséchant qui le déplace. Aucun rôle catalytique.',
   'Un soufre sulfinyle est stéréogène : tBu, O, N et le doublet libre sont quatre substituants différents.',
   'CH₂Cl₂ n\'est pas un choix anodin : il est non coordinant.',
   'Imine exclusivement E.'
  ],
  plus:{titre:'Pourquoi un doublet libre « compte »',
    body:'<p>Un doublet non liant occupe une orbitale dirigée dans l\'espace, exactement comme une liaison. Pour les règles CIP on lui attribue conventionnellement le numéro atomique <b>0</b> : c\'est donc toujours le substituant de plus basse priorité.</p><p>C\'est ce qui rend stéréogènes les sulfoxydes, les sulfinamides, les amines (en principe), les phosphines. La différence pratique : une amine tertiaire s\'inverse des milliards de fois par seconde à température ambiante, donc on ne peut pas l\'isoler ; un <b>sulfoxyde</b>, lui, a une barrière d\'inversion d\'environ 150–180 kJ·mol⁻¹, donc il est parfaitement stable et séparable.</p><p>C\'est pour cela que le sulfinamide d\'Ellman fonctionne comme auxiliaire alors qu\'une amine chirale à azote stéréogène serait inutilisable.</p>'},
  quiz:{q:'Si on remplaçait MgSO₄ par un tamis moléculaire 4 Å, cela marcherait-il&nbsp;?',
        a:'Oui — le tamis moléculaire joue exactement le même rôle : piéger l\'eau. C\'est d\'ailleurs ce qu\'on retrouvera dans l\'époxydation de Sharpless, où le tamis 4 Å sert lui aussi à garder le milieu anhydre. Deux réactions très différentes, un même besoin : retirer l\'eau du jeu.'}
});

S({
  grp:GD, title:'L\'état de transition chélaté, et le rôle du solvant',
  consigne:'Bascule entre CH₂Cl₂ et THF : regarde ce qui arrive au cycle violet.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), st=el('div','statusline'); let cur='dcm';
    const draw=()=>{
      fig.innerHTML=figEllmanTS(cur);
      st.innerHTML = cur==='dcm'
        ? '<b>CH₂Cl₂ (non coordinant).</b> Rien ne concurrence l\'oxygène du sulfinyle : le magnésium le prend, le cycle à six chaînons se referme, et le groupe R est livré par une seule face. d.r. de 93:7 à 96:4.'
        : '<b>THF (coordinant).</b> Le solvant est un éther : ses doublets se fixent sur le magnésium. L\'oxygène du sulfinyle n\'a plus de place, le cycle ne se forme pas, et l\'addition se fait par un état de transition ouvert — sélectivité effondrée, parfois inversée.';
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    [['dcm','CH₂Cl₂'],['thf','THF']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); host.appendChild(st); draw();
  },
  une:'Comme chez Evans, c\'est un métal qui referme un cycle temporaire et fige la molécule. Ici c\'est le magnésium — et un solvant coordinant suffit à tout casser.',
  probleme:'<p>Le réactif de Grignard doit additionner sur le C=N. Là encore il y a deux faces. Mais cette fois il n\'y a pas de gros groupe posé devant l\'une d\'elles : le tert‑butyle est sur le soufre, à deux liaisons de distance, et la liaison S–N peut tourner.</p><p>Il faut donc un mécanisme qui relie la configuration du <b>soufre</b> à la face attaquée du <b>carbone</b>. C\'est le rôle du cycle.</p>',
  etapes:[
   {q:'Qui tient quoi ?',
    t:'Le magnésium tient deux choses à la fois : le groupe R qu\'il va transférer, et l\'<b>oxygène du sulfinyle</b>. Ces deux liaisons referment un cycle à <b>six chaînons</b> : S, N, C, R, Mg, O.'},
   {q:'Pourquoi ce nom de Zimmerman–Traxler ?',
    t:'C\'est le nom du modèle général d\'état de transition cyclique à six chaînons où un métal relie le nucléophile et l\'électrophile. On le rencontre surtout en aldolisation ; ici c\'est le même principe appliqué à une imine.'},
   {q:'Comment le soufre impose-t-il la face ?',
    t:'Une fois le cycle formé, plus rien ne tourne. Le tert‑butyle, très volumineux, se place dans la position la <b>moins encombrée</b> du cycle. Cela fixe l\'orientation de l\'oxygène, donc celle du magnésium, donc le côté par lequel R arrive sur le carbone.'},
   {q:'Pourquoi CH₂Cl₂ et pas THF ?',
    t:'Le magnésium est un acide de Lewis : il accepte des doublets. Le THF est un éther, donc un bon donneur : il vient occuper les sites de coordination du magnésium et <b>prend la place</b> de l\'oxygène du sulfinyle. Le cycle ne peut plus se former. CH₂Cl₂, lui, n\'a rien à donner.'},
   {q:'Que se passe-t-il alors ?',
    t:'L\'addition se fait par un état de transition <b>ouvert</b>, où la face attaquée n\'est plus contrôlée par le chélate mais par de simples préférences stériques. La sélectivité s\'effondre — et elle peut même s\'inverser, puisque c\'est un autre modèle qui gouverne.'}
  ],
  retenir:[
   'Cycle à 6 : S–N=C···R–Mg···O–S. Le métal referme, comme le lithium chez Evans.',
   'tBu en position la moins gênée → oriente tout le reste → une seule face de C=N.',
   'CH₂Cl₂ non coordinant = chélate intact. THF coordinant = chélate détruit.',
   'Un « détail » de solvant peut décider de toute la stéréochimie : c\'est fréquent en synthèse asymétrique.'
  ],
  plus:{titre:'Le même réflexe, appliqué trois fois dans ce chapitre',
    body:'<p>Tu peux vérifier que le raisonnement est identique dans les trois modèles chélatés du chapitre :</p><ul class="keys"><li><b>Evans</b> : Li tient l\'énolate et le carbamate → l\'oxazolidinone ne tourne plus → l\'iPr bloque une face.</li><li><b>Ellman</b> : Mg tient R et le sulfinyle → la liaison S–N ne tourne plus → le tBu oriente la face.</li><li><b>Hoppe</b> (section suivante) : Li est tenu par la spartéine <i>et</i> par le carbonyle du carbamate → le carbanion ne s\'épimérise plus.</li></ul><p>À chaque fois, pose‑toi les mêmes deux questions : <b>qui tient quoi</b>, et <b>qu\'est-ce qui ne peut plus tourner</b>. C\'est la façon la plus économique de retenir ces modèles — beaucoup plus que d\'apprendre les dessins par cœur.</p>'},
  quiz:{q:'On fait la même addition dans le diéthyléther. À ton avis, plutôt CH₂Cl₂ ou plutôt THF&nbsp;?',
        a:'Plutôt THF : Et₂O est lui aussi un éther, donc un donneur de doublets, même s\'il est moins bon que le THF (plus encombré, moins basique). On s\'attend donc à une sélectivité intermédiaire, dégradée par rapport à CH₂Cl₂. Le critère à retenir n\'est pas « polaire / apolaire » mais <b>coordinant / non coordinant</b>.'},
  flag:'⚠️ Tes notes indiquent « addition on the Si face ». Je n\'ai pas pu le <b>redémontrer</b> de façon indépendante à partir d\'un état de transition dessiné à plat : déterminer une face demande la géométrie 3D du cycle (conformation chaise, positions pseudo-axiale / pseudo-équatoriale du tBu), qui n\'est pas lisible sur le schéma. Le raisonnement « le tBu se met du côté le moins gêné, ce qui oriente tout le reste » est en revanche solide. Voir A_VERIFIER.md.'
});

S({
  grp:GD, title:'Décrocher l\'auxiliaire : HCl / MeOH',
  consigne:'Compare les deux structures : qu\'est-ce qui a changé, qu\'est-ce qui n\'a pas bougé ?',
  build(host){
    const fig=el('div','figbox'); fig.innerHTML=figEllmanCleav(); host.appendChild(fig);
    host.appendChild(el('div','statusline','Le clivage se fait sur la liaison <b>S–N</b>, pas sur une liaison du carbone. Le centre stéréogène qu\'on vient de créer n\'est donc jamais mis en jeu.'));
  },
  une:'Un simple acide dans le méthanol suffit : la liaison soufre–azote est fragile en milieu acide, et le carbone n\'est pas concerné.',
  probleme:'<p>Chez Evans, le clivage demandait de choisir soigneusement son nucléophile pour ne pas ouvrir le cycle. Ici c\'est beaucoup plus simple — et il faut comprendre pourquoi, parce que c\'est un des arguments qui ont rendu cet auxiliaire populaire.</p>',
  etapes:[
   {q:'Que fait l\'acide ?',
    t:'Il protone l\'azote du sulfinamide. Une fois protoné, l\'azote devient un bon nucléofuge : la liaison S–N se rompt facilement.'},
   {q:'Que fait le méthanol ?',
    t:'Il attrape le fragment soufré, qui part sous forme de <b>tert-butanesulfinate de méthyle</b>. L\'amine, elle, reste dans le milieu sous forme de <b>chlorhydrate</b> — un solide, facile à isoler.'},
   {q:'Le centre stéréogène du carbone risque-t-il quelque chose ?',
    t:'Non. On ne touche qu\'à la liaison S–N ; aucune liaison du carbone stéréogène n\'est rompue. La configuration est intégralement conservée.'},
   {q:'Et le soufre ?',
    t:'Il part avec sa configuration, mais on ne le récupère pas sous forme de sulfinamide réutilisable directement. C\'est le vrai coût de cette méthode : l\'auxiliaire n\'est pas récupéré tel quel, contrairement à l\'oxazolidinone d\'Evans.'},
   {q:'Bilan de la séquence.',
    t:'Aldéhyde achiral → imine → addition diastéréosélective → amine <b>chirale, énantioenrichie</b>. Trois étapes, deux d\'entre elles triviales. C\'est une des meilleures façons de fabriquer des amines α‑chirales, très demandées en chimie médicinale.'}
  ],
  retenir:[
   'Clivage = HCl dans MeOH, conditions douces et rapides.',
   'On coupe S–N, jamais une liaison du carbone stéréogène.',
   'L\'amine sort sous forme de chlorhydrate cristallin, ce qui facilite la purification.',
   'Inconvénient honnête : l\'auxiliaire n\'est pas récupéré intact.'
  ],
  quiz:{q:'Pourquoi cette méthode est-elle si utilisée en chimie médicinale&nbsp;?',
        a:'Parce que les <b>amines α-chirales</b> sont partout dans les médicaments, et qu\'elles sont difficiles à obtenir énantiopures autrement. La séquence d\'Ellman part d\'un aldéhyde (bon marché, immense diversité commerciale) et d\'un Grignard (idem), avec un auxiliaire disponible dans les deux configurations. On peut donc balayer rapidement une bibliothèque d\'amines chirales — exactement ce qu\'on cherche en début de projet.'}
});
