
/* ==========================================================================
   GROUPE 5 — Réviser quand on ne visualise pas
   ========================================================================== */
const V5='5 — Réviser autrement';

S({
  grp:V5, title:'Fabrique-toi un modèle, vraiment',
  consigne:'Prends deux minutes maintenant. C\'est le meilleur investissement de toute ta révision.',
  build(host){
    const f=el('div','figbox'); f.innerHTML=figModeles(); host.appendChild(f);
    const f2=el('div','figbox'); f2.innerHTML=figMainDroite(); host.appendChild(f2);
    host.appendChild(el('div','statusline','Les vrais modèles moléculaires (boules et bâtonnets) coûtent une vingtaine d\'euros et sont autorisés dans beaucoup d\'examens de stéréochimie. Demande à ton enseignant : la réponse est souvent oui.'));
  },
  une:'Un objet qu\'on tient dans la main remplace définitivement la rotation mentale. Ce n\'est pas une béquille : c\'est l\'outil normal du métier.',
  probleme:'<p>On a tendance à croire qu\'utiliser un modèle est un aveu de faiblesse. C\'est l\'inverse : Pasteur triait ses cristaux à la pince, Watson et Crick ont construit l\'ADN en fil de fer et en carton découpé.</p><p>Personne ne « voit » les molécules. Tout le monde bricole.</p>',
  etapes:[
   {q:'La version la plus rapide : une gomme et des cure-dents.',
    t:'Plante quatre cure-dents dans une gomme, le plus écartés possible. Écris 1, 2, 3, 4 sur des bouts de papier et pique-les au bout. Tu viens de fabriquer un centre stéréogène que tu peux tourner dans tous les sens.'},
   {q:'La version « sans rien ».',
    t:'Écarte le pouce, l\'index, le majeur et l\'annulaire de ta main droite, le plus possible. Regarde-les : ils pointent à peu près vers les quatre coins d\'un tétraèdre. Avec un peu d\'habitude, c\'est suffisant pour lire un R/S.'},
   {q:'Le geste de la main droite, à automatiser.',
    t:'Poing fermé, pouce levé, pouce vers le fond : tes doigts tournent dans le sens <b>R</b>. C\'est le seul geste à retenir de tout le chapitre, et il marche à tous les coups.'},
   {q:'Comment t\'entraîner efficacement.',
    t:'Reprends <b>la même</b> molécule cinq fois de suite, dessinée dans cinq orientations différentes, et vérifie que tu retrouves la même lettre. C\'est beaucoup plus formateur que de faire cinq molécules différentes une fois chacune : c\'est exactement ce qui construit la rotation mentale.'}
  ],
  retenir:[
   'Un modèle physique n\'est pas de la triche : c\'est l\'outil du métier.',
   'Gomme + 4 cure-dents = un centre stéréogène en 2 minutes.',
   'Poing droit, pouce vers le fond : les doigts tournent en R.',
   'Entraîne-toi sur <b>la même</b> molécule dans plusieurs orientations.'
  ]
});

S({
  grp:V5, title:'La fiche de survie',
  consigne:'Si tu ne retiens qu\'une page de tout ce support, c\'est celle-ci.',
  build(host){
    const mk=(t,c,items)=>{ const d=el('div','dico'); d.style.borderLeftColor='var('+c+')';
      d.innerHTML='<span class="m" style="color:var('+c+')">'+t+'</span>'
        +'<ul style="margin:6px 0 0;padding-left:18px;line-height:1.7">'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
      return d; };
    host.appendChild(mk('Pour trouver R ou S','--blue',[
      'Classe les 4 groupes : le plus lourd d\'abord, H toujours dernier.',
      'Le n° 4 doit partir <b>vers le fond</b>.',
      'Lis 1 → 2 → 3 : aiguilles d\'une montre = <b>R</b>, sinon <b>S</b>.',
      'Si le n° 4 est vers toi : lis, puis <b>inverse</b>.',
      'Un échange de deux groupes inverse la lettre. Deux échanges : rien ne change.']));
    host.appendChild(mk('Pour classer deux faces','--green',[
      'Attaque la face avant → dessine le produit.',
      'Attaque la face arrière → dessine le produit.',
      'Produits identiques → <b>homotopes</b>.',
      'Produits énantiomères → <b>énantiotopes</b> (substrat prochiral).',
      'Ni l\'un ni l\'autre → <b>diastéréotopes</b>.']));
    host.appendChild(mk('Pour dire diastéréo ou énantio','--red',[
      'Rien de stéréogène n\'est créé → <b>ni l\'une ni l\'autre</b>.',
      'Le substrat est déjà chiral → <b>diastéréo</b>sélective.',
      'Substrat achiral + réactif chiral → <b>énantio</b>sélective.',
      'Substrat achiral + réactif achiral → racémique, rien à dire.',
      'Test : « si je change l\'énantiomère du réactif, le produit change-t-il ? »']));
    host.appendChild(mk('Pour un axe de chiralité','--purple',[
      'Chaque cycle doit avoir ses deux positions ortho <b>différentes</b>.',
      'Il faut <b>3 ou 4</b> substituants ortho pour bloquer la rotation.',
      'Seuil : barrière &gt; ~90 kJ·mol⁻¹ à température ambiante.',
      'Pour nommer : on regarde dans l\'axe, l\'avant passe avant l\'arrière.',
      'Un dessin plat ne permet <b>jamais</b> de conclure sur la configuration.']));
  },
  une:'Quatre recettes, aucune visualisation requise.',
  retenir:[
   'Tu n\'as jamais besoin de tourner une molécule dans ta tête.',
   'Classer, compter des échanges, dessiner deux produits : c\'est mécanique.',
   'La rotation mentale s\'acquiert en regardant, pas en forçant.',
   'Si tu bloques : reprends le modèle 3D et tourne-le avec le doigt.'
  ],
  plus:{titre:'ce que disent les autres supports',
    body:'<p><b>Les bases de la stéréochimie</b> reprend tout le vocabulaire en détail (CIP, Fischer, méso, pseudo-asymétrie, topicité) avec les sources.</p>'
      +'<p><b>CH0904 — Chapitre 1</b> traite la synthèse asymétrique proprement dite : Evans, Ellman, Hoppe, TADDOL, Sharpless.</p>'
      +'<p><b>TD de révision — corrigé</b> donne la réponse complète des trois exercices, avec la méthode avant la réponse, et signale les points douteux du sujet.</p>'
      +'<p>Ce support-ci n\'est pas un résumé des autres : c\'est l\'étage du dessous. Si un passage des autres supports te bloque parce que tu n\'arrives pas à « voir », reviens ici et tourne la molécule correspondante.</p>'}
});
