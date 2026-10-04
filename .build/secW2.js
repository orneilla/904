
/* ==========================================================================
   EXERCICE 4 — allylboration énantiosélective d'une cétone
   ========================================================================== */
const W2='Exercice 4 — allylboration';

S({
  grp:W2, title:'Ce qu\'on te demande',
  consigne:'Deux questions bien distinctes : le catalyseur, puis l\'état de transition.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figAllyl(); host.appendChild(f);
    host.appendChild(el('div',null,recapHTML([
      {t:'Question 1', c:'var(--blue)', v:'Configuration absolue du catalyseur — de quelle chiralité s\'agit-il ?',
       d:'Il n\'y a <b>aucun carbone asymétrique</b> dans ce binaphtol. La chiralité est ailleurs : il faut la nommer, puis la mesurer.'},
      {t:'Question 2', c:'var(--red)', v:'Quel état de transition est favorisé, et quelle configuration en résulte ?',
       d:'TS1 et TS2 présentent les <b>deux faces</b> de la cétone. Il faut un argument stérique, puis lire le descripteur.'}
    ])));
  },
  une:'Une cétone (donc un alcool <b>tertiaire</b> au bout) + un allylborane rendu chiral par un binaphtol : 94 % d\'excès énantiomérique.',
  probleme:'<p>Fabriquer un alcool tertiaire énantiopur est difficile : les deux substituants de la cétone (ici Ph et CH₃) se ressemblent plus qu\'un H et un groupe. La différence d\'encombrement est faible, donc la sélectivité est dure à obtenir.</p><p>D\'où le catalyseur très encombré, et la température de −35 °C.</p>',
  etapes:[
   {q:'Le squelette du produit.',t:'L\'allyle s\'additionne par son carbone terminal. On obtient <b>Ph–C(CH₃)(OH)–CH₂–CH=CH₂</b>, le 2-phényl-pent-4-én-2-ol. Attention : la double liaison s\'est <b>déplacée</b> — c\'est la marque d\'une allylation par un allylborane (transposition allylique).'},
   {q:'Le nouveau centre.',t:'Le carbone qui portait la cétone porte maintenant <b>OH, CH₃, Ph et CH₂–CH=CH₂</b> : quatre groupes différents, donc un centre de chiralité. C\'est un alcool tertiaire.'},
   {q:'Pourquoi la réaction est énantiosélective.',t:'L\'acétophénone est <b>achirale</b> et plane autour de son carbonyle : ses deux faces sont <b>énantiotopes</b>. Il faut donc apporter la chiralité de l\'extérieur — c\'est le rôle du binaphtol.'},
   {q:'Le mot « catalysée » mérite un commentaire.',t:'Le diol est en quantité <b>sous-stœchiométrique</b> (15 mol%) : c\'est bien de la catalyse. Mais il ne reste pas spectateur : il se fixe sur le bore, fait la réaction, puis repart. On verra ça dans deux pages.'}
  ],
  retenir:[
   'Alcool <b>tertiaire</b> : deux substituants qui se ressemblent → difficile.',
   'La double liaison se déplace : transposition allylique.',
   'Substrat achiral à faces énantiotopes → <b>énantiosélective</b>.',
   'Le diol est catalytique (15 mol%) mais devient partie du réactif.'
  ]
});

S({
  grp:W2, title:'Question 1a — de quelle chiralité s\'agit-il ?',
  consigne:'Cherche un carbone à quatre groupes différents. Il n\'y en a pas. Puis appuie sur « regarder dans l\'axe ».',
  build(host){
    const m=MOLTD2.binolBr2;
    const R0=M3.mul(M3.rot([0,1,0],0.22),M3.rot([1,0,0],Math.PI/2));
    const v=bloc3D(host,m,{h:320, R0:R0, decor:[
      {k:'line',a:[0,0,-5.0],b:[0,0,5.0],c:'--red',dash:true,w:2.2}
    ], boutons:[
      {t:'👁 Regarder DANS l\'axe', go:(vv)=>vv.goto(M3.id(),1400)},
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    const sl=document.createElement('input');
    sl.type='range'; sl.min='-90'; sl.max='90'; sl.value='0'; sl.step='1'; sl.style.width='100%';
    sl.setAttribute('aria-label','forcer la rotation autour de l\'axe');
    const lab2=el('div','statusline');
    const maj=()=>{ const a=+sl.value; v.torsion(a); const c=v.contact();
      if(!c){ lab2.innerHTML=''; return; }
      const serre=c.d<3.0;
      lab2.innerHTML='<b>Rotation forcée de '+(a>0?'+':'')+a+'°.</b> Contact le plus serré : <b style="color:var('
        +(serre?'--red':'--green')+')">'+c.d.toFixed(2)+' Å</b> entre un <b>'+c.a+'</b> et un <b>'+c.b+'</b>. '
        +(serre?(c.prof===0?'Deux atomes de <b>cycle</b> : rien ne peut s\'écarter.'
                 :(c.prof===1?'Directement accrochés aux cycles : ils ne bougent quasiment pas.'
                   :'Un groupe latéral souple est impliqué : le curseur exagère ici.'))
               :'Au-dessus de ~3,0 Å : ça passe.');
    };
    sl.oninput=maj;
    const t=el('div','cv3dhint','↔ essaie de faire tourner les deux naphtalènes l\'un par rapport à l\'autre');
    t.style.marginBottom='4px';
    host.appendChild(t); host.appendChild(sl); host.appendChild(lab2); maj();
    host.appendChild(el('div','statusline','Les <b>brome</b> en position 3 et 3′ sont les vrais verrous : ce sont des atomes de cycle aromatique voisins, rien ne peut s\'écarter. C\'est pour cela qu\'on les a mis là.'));
  },
  une:'Il s\'agit d\'une <b>chiralité axiale</b> (atropisomérie) : aucun atome n\'est asymétrique, c\'est la torsion bloquée entre les deux naphtalènes qui est chirale.',
  probleme:'<p>Première chose à écrire dans la copie : <b>« aucun carbone asymétrique »</b>. Si on cherche un centre, on ne trouve rien et on se bloque. Il faut penser à l\'axe.</p>',
  etapes:[
   {q:'Vérifie qu\'il n\'y a pas de centre.',t:'Tourne le modèle : tous les carbones sont aromatiques (sp², trois voisins) ou portent deux hydrogènes. Aucun ne porte quatre groupes différents.'},
   {q:'Où est la chiralité, alors.',t:'Dans la <b>liaison centrale</b> entre les deux naphtalènes. Les quatre positions ortho sont occupées (deux OH, deux Br), donc les cycles ne peuvent pas devenir coplanaires : ils restent croisés à environ 90°. Deux barres croisées, c\'est une hélice — et une hélice a un sens.'},
   {q:'Le mot juste.',t:'On parle d\'un <b>axe de chiralité</b>, et les deux formes s\'appellent des <b>atropisomères</b> (de <i>a-tropos</i>, « qui ne tourne pas »). Les descripteurs sont a<i>R</i> / a<i>S</i>.'},
   {q:'Pourquoi les brome en 3 et 3′.',t:'Un BINOL simple est déjà bloqué, mais son creux est trop ouvert pour différencier Ph de CH₃. Les brome en 3,3′ <b>referment</b> le creux juste au-dessus du bore : c\'est ce qui crée la sélectivité. Teste au curseur : ce sont eux qui coincent.'},
   {q:'La condition de stabilité.',t:'Robinson donne le seuil : il faut une barrière de rotation supérieure à environ <b>90 kJ·mol⁻¹</b> pour pouvoir séparer les deux formes à température ambiante. Avec quatre substituants ortho dont deux brome, on est très au-dessus.'}
  ],
  retenir:[
   'Aucun carbone asymétrique : c\'est une chiralité <b>axiale</b>.',
   'Deux atropisomères, descripteurs a<i>R</i> / a<i>S</i>.',
   'Les Br en 3,3′ referment le creux : c\'est eux qui font la sélectivité.',
   'Barrière nécessaire : &gt; ~90 kJ·mol⁻¹.'
  ]
});

S({
  grp:W2, title:'Question 1b — et sa configuration : a<i>S</i>',
  consigne:'Change de panneau pour voir les deux sens possibles, puis compare au dessin de l\'énoncé.',
  build(host){
    const f=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const draw=()=>{ f.innerHTML=figAxeNewman(k); [...row.children].forEach((b,i)=>b.classList.toggle('on',i===k)); };
    ['Un sens','L\'autre sens'].forEach((t,i)=>{ const b=el('button','btn'); b.textContent=t;
      b.style.flex='1 1 45%'; b.onclick=()=>{k=i;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f); draw();
    host.appendChild(el('div','statusline','Dans l\'encadré TS1/TS2 de l\'énoncé, le naphtalène dessiné en <b>trait plein</b> est devant et celui en <b>pointillés</b> derrière. Sur le trait plein, le côté O/Br pointe en haut à droite ; sur le pointillé, en bas à droite. En appliquant la procédure, on obtient <b>a<i>S</i></b>.'));
  },
  une:'En regardant dans l\'axe, les deux ligands du naphtalène <b>avant</b> prennent les rangs 1 et 2, ceux du naphtalène <b>arrière</b> les rangs 3 et 4. On lit ensuite 1 → 2 → 3 comme un volant.',
  probleme:'<p>Sur le schéma de réaction, le catalyseur est dessiné <b>à plat</b> : impossible d\'en lire la configuration. Mais l\'encadré TS1/TS2, lui, le dessine <b>en perspective</b> (un trait plein et un trait pointillé qui se croisent). C\'est de là qu\'il faut partir.</p>',
  etapes:[
   {q:'Étape 1 — se placer dans l\'axe.',t:'Deux traits qui se croisent = les deux naphtalènes vus par la tranche, l\'axe pointant vers toi. Le trait <b>plein</b> est le cycle de devant, le trait <b>pointillé</b> celui de derrière.'},
   {q:'Étape 2 — classer les deux ortho du cycle AVANT.',t:'Sur chaque naphtalène, les deux voisins du carbone de jonction sont : le carbone qui porte l\'<b>O</b> (c\'est‑à‑dire (O, C, C)) et le carbone de <b>soudure</b> des deux cycles ((C, C, C)). L\'oxygène l\'emporte : le côté <b>O/Br</b> est prioritaire. Rang <b>1</b>, l\'autre rang <b>2</b>.'},
   {q:'Étape 3 — le cycle ARRIÈRE.',t:'Même raisonnement : rangs <b>3</b> et <b>4</b>. Règle propre aux axes : <b>un ligand proche bat toujours un ligand lointain</b>, quels que soient les numéros atomiques.'},
   {q:'Étape 4 — lire.',t:'Sur le dessin de l\'énoncé : rang 1 en haut à droite, rang 2 en bas à gauche, rang 3 en bas à droite. La séquence 1 → 2 → 3 est <b>antihoraire</b> → configuration <b>a<i>S</i></b>. J\'ai refait ce calcul numériquement, et l\'image miroir donne bien a<i>R</i>.'},
   {q:'Ce qu\'il faut écrire.',t:'« Le catalyseur ne possède pas de centre de chiralité : il présente un <b>axe de chiralité</b> (atropisomérie), de configuration <b>a<i>S</i></b>. »'}
  ],
  retenir:[
   'Proche avant lointain : rangs 1–2 devant, 3–4 derrière.',
   'Sur chaque naphtalène, le côté <b>OH</b> est prioritaire.',
   '1 → 2 → 3 antihoraire → <b>a<i>S</i></b>.',
   'Un dessin plat ne permet jamais de conclure : il faut la perspective.'
  ],
  flag:'<b>À vérifier avec ta prof.</b> La lecture de la configuration repose sur l\'interprétation du dessin en perspective de l\'encadré TS1/TS2 (quel naphtalène est devant). Ma lecture donne <b>a<i>S</i></b>. Si elle annonce a<i>R</i>, c\'est que le dessin se lit dans l\'autre sens — et alors toutes les conclusions de la question 2 s\'inversent aussi.'
});

S({
  grp:W2, title:'Le mécanisme — d\'où sort le « boronate cyclique »',
  consigne:'Comprends ce point et la question 2 devient facile.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figBoronate(); host.appendChild(f);
    host.appendChild(el('div','statusline','C\'est ce que l\'énoncé appelle « une activation de type acide de Lewis <i>via</i> la formation d\'un intermédiaire boronate cyclique ». Le bore devient à la fois <b>plus acide de Lewis</b> (les O du binaphtol sont attracteurs) et <b>chiral</b>.'));
  },
  une:'Le binaphtol <b>chasse les deux isopropanolates</b> du bore et prend leur place. L\'allylborane devient alors chiral — et c\'est lui qui réagit.',
  etapes:[
   {q:'Étape 1 — la transestérification sur le bore.',t:'Les boronates d\'alkyle échangent très facilement leurs groupes alcoxy avec un diol. Le binaphtol, qui est un diol rigide, se fixe en formant un cycle à cinq chaînons et libère deux iPrOH.'},
   {q:'Étape 2 — pourquoi ça accélère la réaction.',t:'Les deux oxygènes aryliques sont bien plus attracteurs que des OiPr. Le bore devient <b>plus pauvre en électrons</b>, donc meilleur acide de Lewis : il se lie mieux à l\'oxygène de la cétone, et l\'addition est plus rapide. C\'est une vraie catalyse, pas seulement une induction.'},
   {q:'Étape 3 — l\'état de transition.',t:'L\'oxygène de la cétone se lie au bore. On forme alors un cycle à <b>six</b> chaînons : B – O – C(cétone) ··· C(terminal de l\'allyle) – CH = CH – retour au B. C\'est une <b>chaise de Zimmerman–Traxler</b>, exactement comme pour une aldolisation.'},
   {q:'Étape 4 — pourquoi la double liaison se déplace.',t:'Parce que c\'est le carbone <b>terminal</b> de l\'allyle qui attaque, pendant que la liaison C–B se rompt. Le réarrangement est concerté et se fait dans le cycle à six : c\'est une transposition allylique obligatoire.'},
   {q:'Étape 5 — le catalyseur repart.',t:'Après l\'addition, le binaphtol est libéré par l\'alcoolate formé et recommence un cycle. D\'où les 15 mol% seulement.'}
  ],
  retenir:[
   'Le diol <b>remplace</b> les OiPr sur le bore.',
   'Bore plus acide de Lewis → réaction plus rapide.',
   'État de transition = <b>chaise à six centres</b> (Zimmerman–Traxler).',
   'Le carbone terminal attaque → la double liaison se déplace.'
  ]
});

S({
  grp:W2, title:'Question 2a — TS1 ou TS2 ?',
  consigne:'Change de panneau et regarde où part le phényle dans chaque cas.',
  build(host){
    const f=el('div','figbox'), row=el('div','btnrow'); let k=0;
    const draw=()=>{ f.innerHTML=figTS(k); [...row.children].forEach((b,i)=>b.classList.toggle('on',i===k)); };
    ['TS1','TS2'].forEach((t,i)=>{ const b=el('button','btn'); b.textContent=t;
      b.style.flex='1 1 45%'; b.onclick=()=>{k=i;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(f); draw();
    const m=MOLTD2.acetophenone;
    host.appendChild(el('div','statusline','Les deux états de transition ne diffèrent que par un point : <b>quelle face de la cétone</b> est présentée à l\'allyle. Ci-dessous l\'acétophénone et ses deux faces.'));
    bloc3D(host,m,{h:280, decor:[
      {k:'disc',p:[0,0,0],n:[0,0,1],r:2.4,c:'--blue',op:.12},
      {k:'arrow',a:[0,0,3.0],b:[0,0,1.0],c:'--green'},
      {k:'arrow',a:[0,0,-3.0],b:[0,0,-1.0],c:'--red'},
      {k:'tag',p:[0,0,3.6],t:'une face',c:'--green',front:true},
      {k:'tag',p:[0,0,-3.6],t:'l\'autre',c:'--red',front:true}
    ], badges:[
      {i:m.prioF[0],t:'1',c:'--red',o:[-20,-16]},
      {i:m.prioF[1],t:'2',c:'--ink',o:[24,14]},
      {i:m.prioF[2],t:'3',c:'--ink',o:[-24,16]}
    ]});
  },
  une:'<b>TS2 est favorisé</b> : il place le phényle en position pseudo-<b>équatoriale</b>, pointant vers l\'extérieur. TS1 l\'enfonce en pseudo-axial, dans le creux du binaphtol.',
  probleme:'<p>Dans une chaise, chaque substituant est soit pseudo-équatorial (étalé vers l\'extérieur), soit pseudo-axial (dressé perpendiculairement). Le gros groupe préfère <b>toujours</b> l\'équatorial — c\'est la même règle que pour le cyclohexane.</p><p>Ici s\'ajoute un second argument : la position pseudo-axiale pointe droit vers les brome en 3,3′.</p>',
  etapes:[
   {q:'Ce qui distingue les deux.',t:'Le squelette est identique : même chaise, même catalyseur. Seule la cétone est <b>retournée</b>. Dans TS1 le phényle est pseudo-axial et le méthyle pseudo-équatorial ; dans TS2 c\'est l\'inverse.'},
   {q:'Argument 1 — la chaise.',t:'Un substituant pseudo-axial subit des interactions <b>1,3-diaxiales</b> avec le reste du cycle. Plus il est gros, plus ça coûte cher. Phényle ≫ méthyle, donc le phényle veut l\'équatorial : <b>TS2</b>.'},
   {q:'Argument 2 — le catalyseur.',t:'La position pseudo-axiale plonge <b>sous</b> le cycle, c\'est-à-dire du côté où le binaphtol présente ses brome en 3,3′. Y mettre un phényle est doublement coûteux. Les deux arguments vont dans le même sens.'},
   {q:'Pourquoi les Br sont indispensables.',t:'Sans eux, le creux est trop ouvert : la différence entre Ph pseudo-axial et pseudo-équatorial reste faible et l\'excès énantiomérique s\'effondre. Les brome <b>amplifient</b> une petite préférence conformationnelle en une grosse préférence énergétique.'},
   {q:'Et la température.',t:'−35 °C : à basse température, une même différence d\'énergie donne un meilleur rapport. e.e. = 94 % correspond à 97:3, soit e.r. ≈ 32,3 — c\'est-à-dire ΔΔG‡ = R·T·ln(32,3) = 8,314 × 238 × 3,48 ≈ <b>6,9 kJ·mol⁻¹</b>. À 25 °C, cette même différence ne donnerait que 94:6, soit 88 % d\'e.e.'}
  ],
  retenir:[
   'TS1 et TS2 = les deux <b>faces</b> de la cétone.',
   'Le gros groupe va en pseudo-<b>équatorial</b> : c\'est TS2.',
   'Le pseudo-axial pointe vers les Br en 3,3′ : double pénalité.',
   '−35 °C amplifie une différence de seulement ~7 kJ·mol⁻¹.'
  ],
  quiz:{q:'Pourquoi cette réaction marche-t-elle beaucoup moins bien sur une cétone portant deux groupes alkyle de taille voisine&nbsp;?',
    a:'Parce que la sélectivité repose entièrement sur la <b>différence de taille</b> entre les deux substituants de la cétone.<br><br>Avec Ph et CH₃, l\'écart est net : le phényle est plat mais large, et il paie cher la position pseudo-axiale. Avec par exemple un éthyle et un méthyle, les deux états de transition coûtent presque la même chose : ΔΔG‡ s\'effondre, et avec lui l\'excès énantiomérique.<br><br>C\'est la limite générale de l\'allylboration de cétones, et c\'est pour ça que les alcools tertiaires énantiopurs restent une cible difficile.'}
});

S({
  grp:W2, title:'Question 2b — la configuration du nouveau centre',
  consigne:'Tourne le produit et vérifie le classement toi-même.',
  build(host){
    const m=MOLTD2.prod4S;
    bloc3D(host,m,{h:300, badges:[{i:m.centre,t:'S',c:'--green',o:[0,-26]}], boutons:[
      {t:'▶ Tourner doucement', go:(vv,btn)=>{ const on=!vv.isSpinning(); vv.spin(on);
        btn.textContent=on?'⏸ Arrêter':'▶ Tourner doucement'; btn.classList.toggle('on',on); }}
    ]});
    const b=el('div','statusline');
    b.innerHTML='<b style="color:var(--green)">(S)-2-phényl-pent-4-én-2-ol</b> — 83 %, e.e. = 94 %. Priorités : <b>OH &gt; Ph &gt; CH₂–CH=CH₂ &gt; CH₃</b>.';
    host.appendChild(b);
  },
  une:'TS2 conduit au <b>(S)</b>-2-phényl-pent-4-én-2-ol.',
  etapes:[
   {q:'Classe les quatre groupes.',
    t:'<b>1 · OH</b> — l\'oxygène.<br><b>2 · Ph</b> — le carbone ipso porte (C, C, C).<br><b>3 · CH₂–CH=CH₂</b> — ce carbone porte (C, H, H).<br><b>4 · CH₃</b> — (H, H, H).'},
   {q:'La comparaison à ne pas rater.',
    t:'Entre le phényle et la chaîne allylique, on compare <b>(C,C,C)</b> et <b>(C,H,H)</b>. Premier rang : C = C. Deuxième rang : <b>C bat H</b>. Le phényle passe devant. On n\'a pas besoin d\'aller plus loin dans le cycle.'},
   {q:'Du TS au descripteur.',
    t:'Dans TS2, le phényle est pseudo-équatorial, le méthyle pseudo-axial, l\'oxygène de la cétone est tenu par le bore et l\'allyle arrive de l\'autre côté. En plaçant ces quatre groupes dans cette géométrie et en appliquant le classement ci-dessus, on obtient <b>(S)</b>. TS1 donnerait (R).'},
   {q:'Vérification.',
    t:'J\'ai construit explicitement les deux dispositions et fait attribuer le descripteur par RDKit : TS2 → <b>(S)</b>, TS1 → (R). Les deux états de transition donnent bien des énantiomères, ce qui est cohérent avec ce qu\'annonce l\'énoncé.'},
   {q:'L\'excès énantiomérique.',
    t:'e.e. = 94 % → 97 % de (S) et 3 % de (R), c\'est-à-dire e.r. ≈ 32:1. Les 3 % viennent du chemin TS1, qui reste accessible : un état de transition défavorisé n\'est jamais interdit, il est seulement plus cher.'}
  ],
  retenir:[
   'Produit : <b>(S)</b>-2-phényl-pent-4-én-2-ol.',
   'Priorités : OH &gt; Ph &gt; CH₂-allyle &gt; CH₃.',
   '(C,C,C) bat (C,H,H) au deuxième rang.',
   'TS2 → (S) ; TS1 → (R), minoritaire à 3 %.'
  ],
  flag:'<b>À confirmer.</b> Cette configuration découle de deux lectures du dessin de l\'énoncé : quel naphtalène est devant (question 1b) et quel substituant est pseudo-axial dans chaque TS. Le <b>raisonnement</b> est solide et c\'est lui qui est noté ; si ta prof annonce (R), c\'est qu\'une de ces deux lectures s\'inverse — et dans ce cas tout s\'inverse de façon cohérente. La référence d\'origine est Lou, Moquist &amp; Schaus, <i>J. Am. Chem. Soc.</i> <b>2006</b>, <i>128</i>, 12660.'
});

S({
  grp:W2, title:'Exercice 4 — la réponse à rédiger',
  consigne:'À recopier dans cet ordre.',
  build(host){
    const d=el('div','dico');
    d.innerHTML='<span class="m">1. Nature de la chiralité</span>Le catalyseur ne possède <b>aucun centre de chiralité</b>. Les quatre positions ortho de la liaison internaphtylique sont occupées (deux OH, deux Br) : les cycles ne peuvent pas devenir coplanaires. Il s\'agit d\'une <b>chiralité axiale</b> (atropisomérie).'
     +'<div style="height:10px"></div><span class="m">2. Configuration du catalyseur</span>On regarde dans l\'axe. Sur chaque naphtalène, le carbone porteur de l\'OH ((O,C,C)) l\'emporte sur le carbone de soudure ((C,C,C)). Les ligands du cycle avant prennent les rangs 1 et 2, ceux du cycle arrière les rangs 3 et 4. La séquence 1 → 2 → 3 est antihoraire : <b>a<i>S</i></b>.'
     +'<div style="height:10px"></div><span class="m">3. Mode d\'activation</span>Le binaphtol déplace les deux OiPr du bore (transestérification) et forme un <b>boronate cyclique chiral</b>. Les oxygènes aryliques rendent le bore plus <b>acide de Lewis</b> : il lie mieux l\'oxygène de la cétone et accélère l\'addition. L\'état de transition est une <b>chaise de Zimmerman–Traxler à six centres</b>, avec transposition allylique.'
     +'<div style="height:10px"></div><span class="m">4. TS favorisé</span><b>TS2</b>, parce qu\'il place le phényle — le plus gros substituant — en position pseudo-<b>équatoriale</b>. Dans TS1, le phényle est pseudo-axial : il subit les interactions 1,3-diaxiales <b>et</b> pointe vers les brome en 3,3′ du binaphtol. Double pénalité.'
     +'<div style="height:10px"></div><span class="m">5. Produit</span><b>(S)-2-phényl-pent-4-én-2-ol</b>, alcool tertiaire. Priorités : OH &gt; Ph &gt; CH₂–CH=CH₂ &gt; CH₃. e.e. = 94 %, soit 97:3, soit ΔΔG‡ ≈ 6,9 kJ·mol⁻¹ à −35 °C.';
    host.appendChild(d);
  },
  une:'Cinq paragraphes : la nature de la chiralité, sa configuration, le mode d\'activation, le TS favorisé, le produit.',
  retenir:[
   'Commencer par « aucun centre de chiralité » : c\'est le réflexe attendu.',
   'Nommer le mode d\'activation : acide de Lewis <i>via</i> boronate cyclique.',
   'Justifier le TS par <b>deux</b> arguments : la chaise et les Br.',
   'Finir par le descripteur et le lien e.e. → ΔΔG‡.'
  ]
});
