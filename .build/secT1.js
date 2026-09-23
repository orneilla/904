
/* ==========================================================================
   GROUPE 1 — Exercice 1 : topicité des faces
   ========================================================================== */
const T1='Exercice 1 — les faces';

S({
  grp:T1, title:'La méthode, en un seul test',
  consigne:'Retiens ce test : il remplace toute la théorie de la topicité.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figTestFace(); host.appendChild(f);
    host.appendChild(el('div','statusline','Le mot « prochiral » ne s\'applique qu\'au deuxième cas : une face est prochirale quand l\'attaquer crée un centre de chiralité, et que l\'autre face donnerait l\'énantiomère.'));
  },
  une:'Attaque la face avant, puis la face arrière, et compare les deux produits : leur relation <i>est</i> la topicité des faces.',
  probleme:'<p>La définition officielle passe par les opérations de symétrie : une rotation propre échange les faces homotopes, une réflexion seule échange les faces énantiotopes, rien ne les échange si elles sont diastéréotopes.</p><p>C\'est rigoureux, mais très lent à appliquer sur une molécule réelle — et on se trompe dès que la molécule n\'est pas plane.</p>',
  etapes:[
   {q:'Étape 1 — repère le carbone sp².',
    t:'Un alcène ou un carbonyle est <b>plan</b> autour du carbone concerné. Il a donc exactement deux côtés : celui qui te fait face, et celui qui est derrière la feuille.'},
   {q:'Étape 2 — attaque par devant, et dessine le produit.',
    t:'Peu importe le réactif : prends le plus simple possible (un H⁻ sur un carbonyle, un atome d\'oxygène sur un alcène). L\'important est que le carbone devienne tétraédrique.'},
   {q:'Étape 3 — recommence par derrière.',
    t:'Même réactif, autre face. Tu obtiens un second dessin.'},
   {q:'Étape 4 — compare les deux produits.',
    t:'<b>Identiques</b> → faces homotopes. <b>Énantiomères</b> → faces énantiotopes (le substrat est prochiral). <b>Diastéréoisomères</b> → faces diastéréotopes.'},
   {q:'Étape 5 — s\'il faut les nommer.',
    t:'On nomme chaque face <b>Re</b> ou <b>Si</b>, et on le fait <b>carbone par carbone</b>. On classe les trois substituants du carbone sp² par les règles CIP, on regarde depuis la face choisie : sens horaire = <b>Re</b>, sens antihoraire = <b>Si</b>.'},
   {q:'Attention — un alcène a deux carbones, donc deux descripteurs.',
    t:'Une face d\'alcène se nomme donc par un couple, par exemple « la face (1<i>Re</i>, 2<i>Si</i>) ». Les deux lettres ne sont pas forcément identiques : elles dépendent du classement CIP propre à chaque carbone.'}
  ],
  retenir:[
   'Faces homotopes → un seul produit → aucune sélectivité à espérer.',
   'Faces énantiotopes → substrat <b>prochiral</b> → il faut un réactif chiral.',
   'Faces diastéréotopes → les deux chemins diffèrent déjà en énergie.',
   'Re / Si se déterminent <b>par carbone</b>, avec les priorités CIP.'
  ],
  quiz:{q:'Sur un carbonyle R–CO–R\', à quoi correspond la face <i>Re</i>&nbsp;?',
        a:'On classe les trois substituants du carbone du carbonyle : <b>O &gt; R &gt; R\'</b> (en supposant R prioritaire sur R\'). On regarde ensuite la molécule depuis l\'un des deux côtés. Si la séquence O → R → R\' apparaît dans le <b>sens horaire</b>, on regarde la face <i>Re</i> ; sinon c\'est la face <i>Si</i>.<br><br>Le nom vient de <i>rectus</i> et <i>sinister</i>, comme R et S — mais attention, une attaque sur la face <i>Re</i> ne donne pas forcément un produit (R) : le classement change quand le nouveau substituant arrive.'}
});

[0,1,2,3].forEach(k=>{
  const txts=[
   {une:'Les deux faces de cet alcène sont <b>homotopes</b> : une simple rotation de la molécule transforme l\'une en l\'autre.',
    prob:'<p>C\'est le cas le plus simple, et c\'est aussi celui qu\'on rate le plus souvent — parce qu\'on cherche un plan de symétrie alors qu\'il faut chercher un <b>axe</b>.</p>',
    et:[{q:'Fais le test.',t:'Époxyde la face du dessus : tu obtiens le <i>cis</i>-3,4-époxyhexane. Époxyde la face du dessous : tu obtiens… exactement la même molécule. Ce composé est <b>méso</b> (il possède un plan de symétrie interne), donc il n\'a pas d\'énantiomère.'},
        {q:'Pourquoi, en termes de symétrie.',t:'Un alcène <i>cis</i> symétrique possède un axe C₂ qui est <b>dans le plan de la feuille</b>, perpendiculaire à la double liaison. Une rotation de 180° autour de cet axe échange le dessus et le dessous — <b>et</b> échange les deux carbones. C\'est une rotation propre : les faces sont donc homotopes.'},
        {q:'Le contraste à connaître.',t:'Si le même alcène était <b>(E)</b>, l\'axe C₂ serait perpendiculaire au plan de la feuille : il n\'échangerait plus les faces. Les faces seraient alors <b>énantiotopes</b>, et l\'époxydation donnerait un couple d\'énantiomères (3R,4R) / (3S,4S).'},
        {q:'Conclusion.',t:'Aucune notion de prochiralité ici : il n\'y a rien à nommer, parce qu\'il n\'y a qu\'un seul produit possible.'}],
    ret:['(Z)-hex-3-ène : faces <b>homotopes</b>.','Pas de prochiralité, pas de nom de face.','L\'époxyde formé est <b>méso</b>, donc achiral.','Le même alcène en (E) aurait des faces énantiotopes.'],
    quiz:{q:'Et le (E)-hex-3-ène, alors&nbsp;? Ses faces sont-elles homotopes aussi&nbsp;?',
      a:'<b>Non : elles sont énantiotopes.</b> Le (E)-hex-3-ène possède bien un axe C₂, mais il est <b>perpendiculaire</b> au plan de la molécule : une rotation autour de lui laisse le dessus en dessus. Seule une réflexion échange les deux faces.<br><br>Vérification par le test : l\'époxydation par le dessus donne le (3R,4R)-3,4-époxyhexane, par le dessous le (3S,4S). Ce sont deux <b>énantiomères</b> → faces énantiotopes, et l\'alcène est donc prochiral.'}},
   {une:'Cette molécule contient déjà un centre de chiralité : ses deux faces ne peuvent plus être que <b>diastéréotopes</b>.',
    prob:'<p>Dès qu\'une molécule est chirale, aucune opération de symétrie (ni rotation, ni miroir) ne peut échanger les deux faces d\'un sp² qu\'elle porte : la molécule elle-même n\'a plus de symétrie à offrir.</p>',
    et:[{q:'Fais le test.',t:'Époxyde par devant : tu crées deux nouveaux centres, en plus de celui qui existait déjà. Époxyde par derrière : tu crées les deux centres opposés, mais <b>le centre déjà présent n\'a pas bougé</b>. Les deux produits ne sont donc pas images miroir l\'un de l\'autre : ce sont des <b>diastéréoisomères</b>.'},
        {q:'La règle générale qui en découle.',t:'<b>Un substrat déjà chiral a toujours des faces diastéréotopes.</b> C\'est exactement le principe des auxiliaires chiraux : on colle un centre de chiralité sur le substrat pour rendre ses faces diastéréotopes, donc d\'énergies différentes.'},
        {q:'Nommer les faces.',t:'Sur le carbone C3 (celui qui porte le groupe CH(OMe)CH₃), le classement est : le carbone porteur de l\'oxygène (O,C,H) &gt; le carbone C4 de la double liaison (C,C,H) &gt; H. Sur C4 (celui qui porte le phényle) : le phényle (C,C,C) &gt; C3 (C,C,H) &gt; H.'},
        {q:'Le résultat, sur le dessin de l\'énoncé.',t:'Les deux séquences apparaissent dans le <b>sens horaire</b> quand on regarde la feuille : la face qui te fait face est donc la face <b>(3<i>Re</i>, 4<i>Re</i>)</b>, et la face arrière est <b>(3<i>Si</i>, 4<i>Si</i>)</b>.'},
        {q:'Un détail à ne pas oublier.',t:'La configuration du centre existant, telle qu\'elle est dessinée (OMe sur un trait gras vers le haut, méthyle en bas à gauche), est <b>(R)</b>. Vérifié par RDKit sur les coordonnées exactes du dessin.'}],
    ret:['Substrat déjà chiral → faces <b>toujours</b> diastéréotopes.','C\'est le principe même des auxiliaires chiraux.','Ici : face avant = (3<i>Re</i>, 4<i>Re</i>).','Le centre existant est (R).'],
    quiz:{q:'Si on époxydait cette molécule avec un peracide achiral (m-CPBA), obtiendrait-on un mélange 50:50&nbsp;?',
      a:'<b>Non.</b> Les deux états de transition sont <b>diastéréoisomères</b> : ils n\'ont aucune raison d\'avoir la même énergie, même si le réactif est parfaitement achiral. On obtiendra donc un mélange <b>déséquilibré</b> de deux diastéréoisomères.<br><br>Le rapport dépendra de l\'encombrement autour de la double liaison — c\'est ce qu\'on appelle le <b>contrôle par le substrat</b>. C\'est aussi exactement ce qui se passe dans la réaction b) de l\'exercice 3.'}},
   {une:'Cet éther d\'énol est <b>prochiral</b> : ses deux faces sont énantiotopes, et c\'est ce qui rend l\'aldolisation de Mukaiyama asymétrique possible.',
    prob:'<p>La molécule est achirale et plane autour de la double liaison. Le plan de la molécule est un plan de symétrie : il échange le dessus et le dessous. Mais c\'est une opération <b>impropre</b>.</p>',
    et:[{q:'Fais le test.',t:'Fais réagir la face du dessus avec un aldéhyde : tu crées un centre quaternaire en C2 (il porte alors CH₃, le reste du cycle, le nouveau groupe et le carbonyle). Fais réagir la face du dessous : tu obtiens l\'<b>énantiomère</b>. Donc : faces énantiotopes.'},
        {q:'Ce que « prochiral » veut dire ici.',t:'Un substrat est prochiral quand une seule modification suffit à le rendre chiral. C\'est le cas : il suffit d\'attaquer une face. Les deux faces s\'appellent alors des <b>faces prochirales</b> et on doit pouvoir les nommer.'},
        {q:'Nommer la face — carbone C1 (celui qui porte OSiMe₃).',t:'Classement : <b>O</b> du silyloxy (numéro atomique 8) &gt; <b>C2</b> (qui est (C,C,C) car il porte le méthyle, le cycle et le carbone dupliqué de la double liaison) &gt; <b>C6</b> du cycle (C,H,H). Sur le dessin, O est en haut, C2 à droite, C6 en bas à gauche : c\'est le <b>sens horaire</b> → face <b>Re</b>.'},
        {q:'Nommer la face — carbone C2 (celui qui porte CH₃).',t:'Classement : <b>C1</b> (O,C,C — il porte l\'oxygène) &gt; <b>C3</b> du cycle (C,H,H) &gt; <b>CH₃</b> (H,H,H). Sur le dessin, C1 est à gauche, C3 en bas, CH₃ en haut à droite : c\'est le <b>sens antihoraire</b> → face <b>Si</b>.'},
        {q:'Le résultat.',t:'La face qui te fait face est la face <b>(1<i>Re</i>, 2<i>Si</i>)</b>. Rien d\'anormal à ce que les deux lettres diffèrent : elles viennent de deux classements indépendants.'}],
    ret:['Molécule achirale + alcène non symétrique → faces <b>énantiotopes</b>.','Le substrat est donc <b>prochiral</b> : les faces se nomment.','Face avant = (1<i>Re</i>, 2<i>Si</i>).','Sans catalyseur chiral, on obtient un racémique.'],
    quiz:{q:'Pourquoi le triméthylsilyle change-t-il tout&nbsp;? La cétone de départ (la 2-méthylcyclohexanone) a-t-elle aussi des faces énantiotopes&nbsp;?',
      a:'La 2-méthylcyclohexanone possède un centre de chiralité en C2 — elle est donc <b>déjà chirale</b>, et les deux faces de son carbonyle sont <b>diastéréotopes</b>.<br><br>En la transformant en éther d\'énol silylé, on <b>détruit ce centre</b> : le carbone devient sp², et la molécule devient achirale. C\'est seulement à ce moment-là que les faces deviennent énantiotopes, donc exploitables par un catalyseur chiral.<br><br>C\'est un raisonnement typique de la synthèse asymétrique : on efface volontairement un centre pour pouvoir le recréer où l\'on veut.'}},
   {une:'Les deux faces de ce carbonyle sont <b>énantiotopes</b> : une réduction par NaBH₄ donnerait un alcool parfaitement racémique.',
    prob:'<p>La molécule est achirale : le groupe amino est loin, et rien dans la chaîne n\'est stéréogène. Le plan du carbonyle est un plan de symétrie de la molécule (en moyenne conformationnelle).</p>',
    et:[{q:'Fais le test.',t:'Ajoute un hydrure par devant : tu obtiens le 4-aminobutan-2-ol (R). Par derrière : le (S). Deux énantiomères → <b>faces énantiotopes</b>, cétone <b>prochirale</b>.'},
        {q:'Nommer la face.',t:'Classement sur le carbone du carbonyle : <b>O</b> &gt; <b>CH₂CH₂NH₂</b> (premier atome C, avec (C,H,H)) &gt; <b>CH₃</b> (avec (H,H,H)). Attention : on compare les deux carbones <i>à la première sphère</i>, et c\'est déjà tranché — inutile d\'aller chercher l\'azote.'},
        {q:'Le résultat sur le dessin.',t:'O est en haut, la chaîne aminée part en bas à droite, le méthyle en bas à gauche : la séquence est <b>horaire</b>, donc la face qui te fait face est la face <b>Re</b>.'},
        {q:'À quoi ça sert.',t:'C\'est exactement le type de substrat sur lequel on utilise une réduction asymétrique (CBS, ou un catalyseur au ruthénium chiral). Le fait que les faces soient énantiotopes est la <b>condition nécessaire</b> pour qu\'un catalyseur chiral puisse faire quelque chose.'},
        {q:'Un piège fréquent.',t:'Ne confonds pas « face <i>Re</i> » et « produit (R) ». Ici, l\'attaque d\'un hydrure sur la face <i>Re</i> donne l\'alcool… <b>(S)</b>, parce que l\'arrivée du H change le classement : l\'oxygène reste premier, mais le H devient le dernier et la chaîne aminée passe deuxième.'}],
    ret:['Molécule achirale + carbonyle dissymétrique → faces <b>énantiotopes</b>.','Cétone <b>prochirale</b> : face avant = <b>Re</b>.','NaBH₄ seul → racémique exact (50:50).','Face <i>Re</i> ≠ produit (R) : les priorités changent après l\'attaque.'],
    quiz:{q:'Range ces trois molécules de l\'exercice par « potentiel asymétrique » : laquelle ne pourra <b>jamais</b> donner de sélectivité&nbsp;?',
      a:'<b>Le (Z)-hex-3-ène.</b> Ses faces sont homotopes : quelle que soit la face attaquée, le produit est le même composé méso. Aucun catalyseur, si chiral soit-il, ne peut créer une sélectivité là où il n\'y a qu\'un seul produit possible.<br><br>Les trois autres ont un potentiel : les deux molécules à faces énantiotopes (éther d\'énol, cétone) demandent un <b>réactif chiral</b> ; la molécule à faces diastéréotopes donnera une sélectivité <b>même avec un réactif achiral</b>.'}}
  ][k];
  S({
    grp:T1, title:'Molécule '+(k+1)+' — '+EX1[k].nom,
    consigne:'Regarde le dessin, puis déroule le raisonnement.',
    build(host){ const f=el('div','figbox'); f.innerHTML=figFaces(k); host.appendChild(f); },
    une:txts.une, probleme:txts.prob, etapes:txts.et, retenir:txts.ret, quiz:txts.quiz
  });
});

S({
  grp:T1, title:'Récapitulatif de l\'exercice 1',
  consigne:'La réponse complète, en un tableau.',
  build(host){
    const b=el('div');
    b.innerHTML=recapHTML([
      {t:'(Z)-hex-3-ène', c:'var(--green)', v:'faces HOMOTOPES',
       d:'Non prochirale : il n\'y a rien à nommer, les deux faces donnent le même époxyde méso.'},
      {t:'(E)-PhCH=CH–CH(OMe)CH₃ — centre (R)', c:'var(--red)', v:'faces DIASTÉRÉOTOPES',
       d:'Nommables : la face avant est la face (3<i>Re</i>, 4<i>Re</i>), la face arrière (3<i>Si</i>, 4<i>Si</i>).'},
      {t:'éther d\'énol silylé', c:'var(--blue)', v:'faces ÉNANTIOTOPES',
       d:'<b>Prochirale</b> : la face avant est la face (1<i>Re</i>, 2<i>Si</i>).'},
      {t:'4-aminobutan-2-one', c:'var(--blue)', v:'faces ÉNANTIOTOPES',
       d:'<b>Prochirale</b> : la face avant est la face <i>Re</i>.'}
    ]);
    host.appendChild(b);
    host.appendChild(el('div','statusline','« Avant » = le côté de la feuille qui te fait face, dans l\'orientation de l\'énoncé. Si tu redessines la molécule retournée, les descripteurs s\'inversent — d\'où l\'importance de préciser <b>par rapport à quel dessin</b> tu réponds.'));
  },
  une:'Une seule des quatre molécules ne peut donner aucune sélectivité ; deux sont prochirales ; une est déjà chirale.',
  flag:'<b>Attention au vocabulaire de l\'énoncé.</b> « Si les molécules possèdent des faces prochirales, les nommer » : au sens strict, <b>prochirales</b> qualifie des faces <b>énantiotopes</b> (molécules 3 et 4). Les faces diastéréotopes de la molécule 2 se nomment aussi <i>Re</i>/<i>Si</i>, mais on ne dit pas qu\'elles sont prochirales, puisque la molécule est <b>déjà</b> chirale. Je donne quand même leurs noms : c\'est ce qu\'attend la plupart des correcteurs.',
  retenir:[
   '1 face homotope → 1 seul produit.',
   '2 faces énantiotopes → prochiral → il faut apporter la chiralité.',
   '2 faces diastéréotopes → sélectivité possible sans rien ajouter.',
   'Les descripteurs <i>Re</i>/<i>Si</i> dépendent de l\'orientation du dessin : précise-la.'
  ]
});
