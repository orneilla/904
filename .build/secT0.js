
/* ==========================================================================
   GROUPE 0 — Avant de commencer
   ========================================================================== */
const T0='0 — Avant de commencer';

S({
  grp:T0, title:'Ce que ce TD teste vraiment',
  consigne:'Lis cette page une fois. Les trois exercices posent en réalité la même question sous trois formes.',
  build(host){
    const b=el('div');
    b.innerHTML=`<table class="dat"><thead><tr><th>Exercice</th><th>La vraie question</th></tr></thead><tbody>
      <tr><td><b>1</b><br><span style="color:var(--ink2);font-size:12px">topicité des faces</span></td>
          <td>« Si j'attaque ce sp² par devant puis par derrière, <b>les deux produits sont-ils différents</b>, et de quelle façon ? »</td></tr>
      <tr><td><b>2</b><br><span style="color:var(--ink2);font-size:12px">éléments de chiralité</span></td>
          <td>« Cette molécule est-elle chirale, et surtout : la molécule <b>reste-t-elle</b> dans sa forme chirale assez longtemps pour qu'on puisse l'isoler ? »</td></tr>
      <tr><td><b>3</b><br><span style="color:var(--ink2);font-size:12px">diastéréo / énantio</span></td>
          <td>« D'où vient l'information chirale : du <b>substrat</b> (diastéréo) ou du <b>réactif</b> (énantio) ? »</td></tr>
      </tbody></table>`;
    host.appendChild(b);
    host.appendChild(el('div','statusline','Dans les trois cas, la bonne méthode consiste à <b>fabriquer mentalement les deux produits</b> et à les comparer. Jamais à chercher des éléments de symétrie en premier.'));
  },
  une:'Ces trois exercices ne demandent pas de connaître des mécanismes : ils demandent de savoir <b>d\'où vient la différence d\'énergie</b> entre deux chemins.',
  probleme:'<p>Quand on révise, on a tendance à réciter des définitions : « énantiotope, c\'est quand un miroir échange les deux… ». En examen, cette approche est lente et fragile.</p><p>Il existe un raccourci qui marche à tous les coups, et qui est en plus le sens physique de la chose : <b>fabrique les deux produits, et regarde ce qui les relie</b>.</p>',
  etapes:[
   {q:'Pourquoi ce raccourci marche.',
    t:'Deux faces (ou deux protons, ou deux groupes) sont dites homotopes, énantiotopes ou diastéréotopes selon la relation entre les <b>produits</b> de leur remplacement. C\'est la définition elle-même, pas une astuce.'},
   {q:'Ce que cela change en pratique.',
    t:'Tu n\'as plus à chercher un axe C₂ ou un plan de symétrie dans une molécule compliquée. Tu dessines deux produits et tu poses les trois questions habituelles : superposables ? images miroir ? même constitution ?'},
   {q:'Et le lien avec la sélectivité.',
    t:'Deux chemins <b>diastéréotopes</b> passent par des états de transition diastéréoisomères : leurs énergies diffèrent <b>toujours</b>, même sans catalyseur chiral. Deux chemins <b>énantiotopes</b> passent par des états de transition énantiomères : mêmes énergies, donc aucune sélectivité — <b>sauf</b> si on ajoute quelque chose de chiral.'},
   {q:'C\'est toute la synthèse asymétrique.',
    t:'Rendre diastéréoisomères deux états de transition qui étaient énantiomères. Que ce soit par un auxiliaire (Evans, Ellman), par un ligand (Sharpless, BINAP) ou par un réactif (TADDOL), le but est le même.'}
  ],
  retenir:[
   'Topicité = relation entre les <b>produits</b>, pas entre les atomes.',
   'Diastéréotopes → énergies différentes « gratuitement ».',
   'Énantiotopes → énergies identiques, il faut apporter la chiralité.',
   'Homotopes → un seul produit possible, la question ne se pose pas.'
  ]
});
