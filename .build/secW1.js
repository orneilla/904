
/* ==========================================================================
   EXERCICE 3 — la réaction de Henry asymétrique
   ========================================================================== */
const W1='Exercice 3 — Henry';

S({
  grp:W1, title:'Ce qu\'on te demande, et par où commencer',
  consigne:'Lis la réaction, puis repère LE carbone qui va devenir stéréogène.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figHenry(); host.appendChild(f);
    host.appendChild(el('div','statusline','Le cétoester a <b>deux</b> carbonyles. Seul celui de la <b>cétone</b> est attaqué : l\'ester, lui, ne sert qu\'à tenir le cuivre. C\'est le premier réflexe à avoir.'));
  },
  une:'Un nitroalcane s\'additionne sur une cétone : c\'est une réaction de Henry (ou nitroaldolisation). Le cuivre chiral décide de quel côté.',
  probleme:'<p>L\'énoncé ne demande pas le mécanisme : il demande <b>la structure de A</b>, avec sa configuration, justifiée par le modèle d\'état de transition fourni.</p><p>Il faut donc quatre choses : qui est le nucléophile, comment le cuivre tient le substrat, quelle face est attaquée, et quel descripteur en découle.</p>',
  etapes:[
   {q:'Qui réagit avec qui.',t:'Le <b>nitrométhane</b> (déprotoné) attaque le carbone de la <b>cétone</b> du pyruvate d\'éthyle. On forme une liaison C–C et un alcool tertiaire.'},
   {q:'Le carbone qui devient stéréogène.',t:'C\'est le carbone de la cétone. Après l\'attaque il porte : <b>OH</b>, <b>CH₃</b>, <b>CO₂Et</b> et <b>CH₂NO₂</b>. Quatre groupes différents → centre de chiralité.'},
   {q:'Pourquoi il faut un catalyseur chiral.',t:'Le pyruvate d\'éthyle est <b>achiral</b> et plan autour de sa cétone : ses deux faces sont <b>énantiotopes</b>, donc de même énergie. Sans rien de chiral, on obtiendrait 50:50. Le complexe de cuivre chiral est ce qui départage.'},
   {q:'La consigne générale du TD.',t:'« Assigner l\'ensemble des descripteurs stéréochimiques pertinents » : il faudra donc nommer <b>la face attaquée</b> (<i>Re</i> ou <i>Si</i>) <b>et</b> la configuration du produit (R ou S). Ce sont deux choses différentes.'}
  ],
  retenir:[
   'Nucléophile = le nitrométhane déprotoné.',
   'Électrophile = la <b>cétone</b> du cétoester, pas l\'ester.',
   'Substrat achiral → faces énantiotopes → réaction <b>énantiosélective</b>.',
   'À nommer : la face attaquée ET le descripteur du produit.'
  ]
});

S({
  grp:W1, title:'Étape 1 — ce que fait vraiment la triéthylamine',
  consigne:'20 mol% d\'Et₃N : ce n\'est pas un catalyseur de transfert, c\'est une base.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figNitronate(); host.appendChild(f);
    host.appendChild(el('div','statusline','Le nitrométhane est étonnamment acide (pKa ≈ 10 dans l\'eau) parce que la charge négative est délocalisée sur les deux oxygènes du groupe nitro. Une amine tertiaire suffit donc à l\'arracher.'));
  },
  une:'Et₃N déprotone le nitrométhane et fabrique le <b>nitronate</b>, qui est le vrai nucléophile de la réaction.',
  etapes:[
   {q:'Pourquoi CH₃NO₂ est acide.',t:'Le groupe NO₂ est très attracteur. Une fois le proton parti, le doublet se délocalise sur l\'azote et les deux oxygènes : l\'anion est bien stabilisé. D\'où un pKa d\'environ <b>10</b>, comparable à un phénol.'},
   {q:'La forme du nitronate.',t:'On l\'écrit ⁻CH₂–NO₂, mais la forme la plus utile ici est <b>CH₂=N⁺(O⁻)–O⁻</b> : le carbone porte la charge et c\'est <b>lui</b> le nucléophile. C\'est pour cela que la liaison formée est une liaison C–C.'},
   {q:'Pourquoi 20 mol% seulement.',t:'La base n\'est pas consommée : elle est rendue à la fin, quand le produit est protoné. Une quantité catalytique suffit à entretenir le cycle.'},
   {q:'Ce que dit l\'énoncé.',t:'« Après la déprotonation de MeNO₂ pour former le nitronate, la configuration pyramidale carrée de Cu permet l\'attaque de l\'atome nucléophile du nitronate. » L\'énoncé te donne donc l\'étape 1 : il faut juste la citer.'}
  ],
  retenir:[
   'Et₃N = base, pas catalyseur nucléophile.',
   'CH₃NO₂ a un pKa d\'environ 10 : facile à déprotoner.',
   'Le nitronate attaque par son <b>carbone</b>.',
   'La base est régénérée : 20 mol% suffisent.'
  ],
  quiz:{q:'Pourquoi l\'énoncé précise-t-il « MeNO₂ en excès »&nbsp;?',
    a:'Pour deux raisons.<br><br><b>Déplacer l\'équilibre de déprotonation</b> : Et₃N n\'est pas une base très forte, la proportion de nitronate à l\'équilibre reste faible. Un excès de nitrométhane entretient une concentration de nucléophile suffisante.<br><br><b>Éviter la réaction inverse</b> : la réaction de Henry est <b>réversible</b> (rétro-Henry). Un excès du partenaire le moins cher pousse dans le bon sens — c\'est le principe de Le Chatelier appliqué au laboratoire.'}
});

S({
  grp:W1, title:'Étape 2 — les cinq places autour du cuivre',
  consigne:'Change de panneau : d\'abord les places, ensuite qui occupe quoi.',
  build(host){
    const f=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const draw=()=>{ f.innerHTML=figCuModele(k); [...row.children].forEach((b,i)=>b.classList.toggle('on',i===k)); };
    ['1. Les places','2. Qui s\'assoit où'].forEach((t,i)=>{ const b=el('button','btn'); b.textContent=t;
      b.style.flex='1 1 46%'; b.onclick=()=>{k=i;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f); draw();
    host.appendChild(el('div','statusline','C\'est exactement ce que dit l\'énoncé : « la cétone du cétoester et le nitrométhane sont coordonnés en position <b>équatoriale</b> », « l\'oxygène de l\'ester est coordonné à la position <b>axiale</b> ».'));
  },
  une:'Le cuivre(II) adopte une <b>pyramide à base carrée</b> : quatre places dans un plan, une cinquième perpendiculaire. Tout le modèle tient dans cette phrase.',
  probleme:'<p>On a tendance à voir le catalyseur comme une boîte noire. Ici il fait trois choses très concrètes : il <b>active</b> la cétone (acide de Lewis), il <b>rapproche</b> les deux partenaires, et il <b>bloque une face</b>.</p>',
  etapes:[
   {q:'Les deux places prises d\'avance.',t:'Les deux azotes du ligand <b>box</b> occupent deux places équatoriales. Ils ne bougent plus : c\'est le squelette du catalyseur.'},
   {q:'La troisième place équatoriale : la cétone.',t:'L\'oxygène de la cétone se coordonne au cuivre. Conséquence chimique essentielle : le cuivre <b>aspire</b> de la densité électronique, le carbone de la cétone devient donc <b>plus électrophile</b>. C\'est l\'activation de type acide de Lewis.'},
   {q:'La quatrième place équatoriale : le nitronate.',t:'Le nitronate se coordonne par un de ses oxygènes, <b>juste à côté</b> de la cétone. Les deux partenaires ne se cherchent plus : ils sont tenus côte à côte. C\'est l\'effet de <b>proximité</b>, et c\'est ce qui rend la réaction rapide.'},
   {q:'La place axiale : l\'ester.',t:'L\'oxygène de l\'ester occupe la place perpendiculaire. Il ne sert pas à activer : il sert à <b>verrouiller</b> l\'orientation du cétoester. Sans lui, la molécule pourrait tourner et présenter n\'importe quelle face.'},
   {q:'Et la chiralité, dans tout ça.',t:'Le ligand box est <b>C₂-symétrique</b> : ses deux <i>tert</i>-butyles pointent de part et d\'autre du plan équatorial. Il en résulte un creux chiral : une face du substrat est dégagée, l\'autre est encombrée.'},
   {q:'Le cycle à six centres.',t:'En suivant Cu → O(cétone) → C(cétone) ··· C(nitronate) → N → O → Cu, tu comptes <b>six</b> chaînons. C\'est un état de transition cyclique, comme un Zimmerman–Traxler : rigide, donc sélectif.'}
  ],
  retenir:[
   'Cu(II) = pyramide à base carrée : 4 équatoriales + 1 axiale.',
   'Cétone et nitronate <b>voisins</b> en équatorial : proximité.',
   'Ester en axial : il <b>verrouille</b> l\'orientation.',
   'Les deux <i>t</i>-Bu du box créent le creux chiral.'
  ]
});

S({
  grp:W1, title:'Étape 3 — le creux chiral du ligand (S,S)',
  consigne:'Tourne le ligand : regarde où partent les deux tert-butyles.',
  build(host){
    const m=MOLTD2.box;
    bloc3D(host,m,{h:300, badges:[
      {i:m.centres[0],t:'S',c:'--blue',o:[-22,-18]},{i:m.centres[1],t:'S',c:'--blue',o:[22,-18]}],
      decor:[{k:'disc',p:[0,0,0],n:[0,1,0],r:3.2,c:'--purple',op:.10}],
      boutons:[
      {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    host.appendChild(el('div','statusline','Les deux azotes bleus sont ceux qui se fixent au cuivre. Le disque violet figure le plan équatorial. Tourne la molécule par la tranche : tu verras qu\'un <i>tert</i>-butyle part <b>au-dessus</b> de ce plan et l\'autre <b>en dessous</b>.'));
  },
  une:'Le ligand est <b>C₂-symétrique</b> : un <i>tert</i>-butyle au-dessus du plan, l\'autre en dessous. C\'est ce décalage qui crée les quadrants encombrés.',
  probleme:'<p>On s\'attend à ce qu\'un ligand chiral « bouche une face ». Ce n\'est pas ce qui se passe : le box bouche <b>un quadrant au-dessus et le quadrant opposé en dessous</b>. Le substrat n\'a alors qu\'une seule façon confortable de se poser.</p>',
  etapes:[
   {q:'Pourquoi les deux t-Bu ne sont pas du même côté.',t:'L\'axe C₂ du ligand est <b>dans</b> le plan de coordination, pas perpendiculaire. Une rotation de 180° autour de cet axe échange les deux oxazolines <b>et</b> échange le dessus et le dessous. Les deux <i>t</i>-Bu sont donc obligatoirement de part et d\'autre.'},
   {q:'Le damier des quadrants.',t:'Vu de dessus, deux quadrants diagonalement opposés sont encombrés, les deux autres sont libres. C\'est la même image que l\'icône que l\'énoncé utilise pour le BINAP aux exercices 5 et 6.'},
   {q:'Ce que ça impose au substrat.',t:'Le cétoester doit poser ses substituants dans les quadrants <b>libres</b>. Une fois posé, il ne présente plus qu\'une seule face au nitronate : la sélectivité est jouée.'},
   {q:'Vérification.',t:'Les deux centres du ligand sont marqués <b>S</b> : RDKit les lit bien (S,S) sur les coordonnées du modèle, ce qui correspond au <b>[Cu((S,S)-tert-Bu-box)](OTf)₂</b> de l\'énoncé.'}
  ],
  retenir:[
   'Axe C₂ <b>dans</b> le plan → les deux <i>t</i>-Bu de part et d\'autre.',
   'Deux quadrants encombrés en diagonale, deux libres.',
   'Le substrat n\'a qu\'une façon confortable de se poser.',
   'Ligand vérifié (S,S).'
  ]
});

S({
  grp:W1, title:'Étape 4 — quelle face ? Le cours te le donne',
  consigne:'Tourne le pyruvate pour voir ses deux faces, puis lis les priorités.',
  build(host){
    const m=MOLTD2.pyruvate;
    bloc3D(host,m,{h:290, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.2,c:'--blue',op:.13},
      {k:'arrow',a:[0,0,2.8],b:[0,0,0.9],c:'--green'},
      {k:'arrow',a:[0,0,-2.8],b:[0,0,-0.9],c:'--red'},
      {k:'tag',p:[0,0,3.4],t:'face Re',c:'--green',front:true},
      {k:'tag',p:[0,0,-3.4],t:'face Si',c:'--red',front:true}
    ], badges:[
      {i:m.prioF[0],t:'1',c:'--red',o:[-20,-16]},
      {i:m.prioF[1],t:'2',c:'--ink',o:[-22,16]},
      {i:m.prioF[2],t:'3',c:'--ink',o:[22,16]}
    ], boutons:[
      {t:'↻ Voir par la tranche', go:(vv)=>vv.turn([1,0,0],Math.PI/2,900)}
    ]});
    const b=el('div','rassure');
    b.innerHTML='<p style="margin:0"><b>Ton cours donne la réponse.</b> La structure calculée de [Cu((<i>S</i>)-<i>t</i>-Bu-Box)(pyruvate)]²⁺ porte une flèche annotée <b>« Nu (si face) »</b>. Le nucléophile attaque donc la face <b><i>Si</i></b> de la cétone.</p>';
    host.appendChild(b);
  },
  une:'Avec le ligand (S,S), le nucléophile attaque la face <b><i>Si</i></b> de la cétone — c\'est écrit noir sur blanc dans le cours, sur la structure calculée du complexe cuivre–pyruvate.',
  probleme:'<p>Déduire une face à partir d\'un modèle d\'état de transition dessiné à plat est très difficile. Heureusement, ce n\'est pas demandé : l\'énoncé fournit le modèle, et le cours fournit le résultat du calcul.</p>',
  etapes:[
   {q:'Classer les trois groupes du carbone de la cétone.',
    t:'<b>1 · O</b> (numéro 8, il écrase tout).<br><b>2 · CO₂Et</b> : ce carbone porte (O, O, O) — un oxygène doublement lié compte deux fois, plus celui de l\'OEt.<br><b>3 · CH₃</b> : il porte (H, H, H). Il perd.'},
   {q:'Nommer les deux faces.',
    t:'On regarde la cétone depuis un côté. Si la séquence <b>O → CO₂Et → CH₃</b> tourne dans le sens des aiguilles, on voit la face <b><i>Re</i></b> ; dans l\'autre sens, la face <b><i>Si</i></b>. Sur le modèle ci-dessus, la flèche verte pointe la face <i>Re</i> et la rouge la face <i>Si</i>.'},
   {q:'Ce que dit le cours.',
    t:'La structure calculée (PM3) du complexe [Cu((<i>S</i>)-<i>t</i>-Bu-Box)(pyruvate)]²⁺ porte la mention <b>Nu (si face)</b>. Avec ce ligand, le nucléophile arrive donc par la face <b><i>Si</i></b>.'},
   {q:'Pourquoi cette face-là.',
    t:'Parce que les deux <i>tert</i>-butyles bouchent les quadrants qui donnent accès à la face <i>Re</i>. Le nitronate, tenu en équatorial juste à côté, n\'a qu\'un chemin libre.'},
   {q:'Le piège à éviter.',
    t:'Attaquer la face <i>Si</i> ne donne pas forcément un produit « S ». Les priorités changent quand le nucléophile arrive : il faut refaire le classement sur le produit. Ici, par chance, ça tombe sur S — mais c\'est une coïncidence, pas une règle.'}
  ],
  retenir:[
   'Priorités sur la cétone : <b>O &gt; CO₂Et &gt; CH₃</b>.',
   'Ligand (S,S) → attaque sur la face <b><i>Si</i></b> (source : le cours).',
   'Les <i>t</i>-Bu bouchent l\'accès à la face <i>Re</i>.',
   'Face <i>Si</i> ≠ produit (S) : il faut reclasser.'
  ]
});

S({
  grp:W1, title:'Étape 5 — le produit A et sa configuration',
  consigne:'Tourne le produit : le groupe n° 4 (CH₃) doit partir vers le fond.',
  build(host){
    const m=MOLTD2.produitA;
    bloc3D(host,m,{h:300, badges:[{i:m.centre,t:'S',c:'--green',o:[0,-26]}], boutons:[
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--green)">A = 2-hydroxy-2-méthyl-3-nitropropanoate d\'éthyle, configuration (S)</b> — 95 %, e.e. = 92 %. Vérifié par RDKit à partir de la géométrie d\'attaque sur la face <i>Si</i>.';
    host.appendChild(b);
  },
  une:'A est le <b>(S)</b>-2-hydroxy-2-méthyl-3-nitropropanoate d\'éthyle : un alcool tertiaire portant un ester, un méthyle et un CH₂NO₂.',
  etapes:[
   {q:'Écris d\'abord la structure, sans stéréochimie.',
    t:'Le carbone du nitronate s\'est lié au carbone de la cétone. Le C=O est devenu C–O⁻, puis C–OH après protonation. Résultat : <b>CH₃–C(OH)(CO₂Et)–CH₂NO₂</b>.'},
   {q:'Reclasse les quatre groupes du nouveau centre.',
    t:'<b>1 · OH</b> (l\'oxygène).<br><b>2 · CO₂Et</b> : (O, O, O).<br><b>3 · CH₂NO₂</b> : (N, H, H) — l\'azote perd contre les oxygènes du 2.<br><b>4 · CH₃</b> : (H, H, H).'},
   {q:'La comparaison qui tranche.',
    t:'Entre CO₂Et et CH₂NO₂, on compare rang par rang : <b>(O,O,O)</b> contre <b>(N,H,H)</b>. Dès le premier rang, O (8) bat N (7). C\'est fini, l\'ester passe devant. Beaucoup d\'étudiants mettent le CH₂NO₂ devant parce que « le nitro c\'est plus gros » — c\'est une erreur, CIP ne regarde que les numéros atomiques.'},
   {q:'Du côté attaqué au descripteur.',
    t:'Le nitronate est arrivé par la face <i>Si</i>, donc le CH₂NO₂ se retrouve de ce côté-là et l\'OH de l\'autre. En appliquant le classement ci-dessus à cette géométrie, on obtient <b>(S)</b>. J\'ai construit explicitement les deux attaques possibles et laissé RDKit trancher : face <i>Si</i> → (S), face <i>Re</i> → (R).'},
   {q:'Et l\'excès énantiomérique.',
    t:'e.e. = 92 % signifie 96 % de (S) et 4 % de (R). Le rapport énantiomérique est donc 96:4, soit 24:1 — ce qui correspond à une différence d\'énergie entre les deux états de transition d\'environ <b>7,8 kJ·mol⁻¹</b> à 25 °C. Très peu : moins qu\'une liaison hydrogène.'}
  ],
  retenir:[
   'A = <b>(S)</b>-2-hydroxy-2-méthyl-3-nitropropanoate d\'éthyle.',
   'Priorités : OH &gt; CO₂Et &gt; CH₂NO₂ &gt; CH₃.',
   '(O,O,O) bat (N,H,H) dès le premier rang.',
   'e.e. 92 % → 96:4 → ΔΔG‡ ≈ 7,8 kJ·mol⁻¹.'
  ],
  quiz:{q:'Recalcule : e.e. = 92 % à 25 °C, quelle différence d\'énergie entre les deux états de transition&nbsp;?',
    a:'e.e. = 92 % → <b>96 % / 4 %</b> → rapport énantiomérique <b>e.r. = 24</b>.<br><br>ΔΔG‡ = R·T·ln(e.r.) = 8,314 × 298 × ln(24) = 8,314 × 298 × 3,178 ≈ <b>7 873 J·mol⁻¹ ≈ 7,9 kJ·mol⁻¹</b>.<br><br>C\'est frappant : moins de 8 kJ·mol⁻¹ — l\'ordre de grandeur d\'une liaison hydrogène faible — suffisent à passer de 50:50 à 96:4. C\'est ce qui rend la catalyse asymétrique à la fois puissante et capricieuse : quelques degrés de température suffisent à tout changer.'}
});

S({
  grp:W1, title:'Exercice 3 — la réponse à rédiger',
  consigne:'Voilà ce que tu peux recopier, dans l\'ordre.',
  build(host){
    const d=el('div','dico');
    d.innerHTML='<span class="m">1. Le nucléophile</span>Et₃N déprotone le nitrométhane (pKa ≈ 10) et forme le <b>nitronate</b> ⁻CH₂NO₂, nucléophile par son carbone.'
     +'<div style="height:10px"></div><span class="m">2. L\'activation</span>Le Cu(II) adopte une géométrie de <b>pyramide à base carrée</b>. Les deux azotes du box et les deux partenaires occupent les quatre positions <b>équatoriales</b> ; l\'oxygène de l\'ester occupe la position <b>axiale</b>, ce qui verrouille l\'orientation du cétoester. La coordination de la cétone au cuivre l\'active (acide de Lewis) et la place juste à côté du nitronate.'
     +'<div style="height:10px"></div><span class="m">3. La face attaquée</span>Le ligand (S,S)-<i>t</i>-Bu-box est C₂-symétrique : ses deux <i>tert</i>-butyles encombrent deux quadrants diagonalement opposés. Le nitronate attaque la face <b><i>Si</i></b> de la cétone (modèle calculé du cours).'
     +'<div style="height:10px"></div><span class="m">4. Le produit</span><b>A = (S)-2-hydroxy-2-méthyl-3-nitropropanoate d\'éthyle</b>, CH₃–C(OH)(CO₂Et)–CH₂NO₂. Priorités au nouveau centre : OH &gt; CO₂Et &gt; CH₂NO₂ &gt; CH₃.'
     +'<div style="height:10px"></div><span class="m">5. La sélectivité</span>Substrat achiral à faces énantiotopes + catalyseur chiral → réaction <b>énantiosélective</b>. e.e. = 92 %, soit 96:4, soit ΔΔG‡ ≈ 7,9 kJ·mol⁻¹ à 25 °C.';
    host.appendChild(d);
  },
  une:'Cinq paragraphes : le nucléophile, l\'activation, la face, le produit, la sélectivité.',
  retenir:[
   'Toujours commencer par « qui est le nucléophile ».',
   'Dire ce que le métal fait : activer + rapprocher + bloquer.',
   'Nommer la face <b>et</b> le descripteur : ce sont deux réponses.',
   'Finir par le mot <b>énantiosélective</b>, justifié.'
  ]
});
