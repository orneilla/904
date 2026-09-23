
/* ==========================================================================
   GROUPE 4 — Représenter
   ========================================================================== */
const G4='4 — Représenter';

S({
  grp:G4, title:'Fischer : ce qu\'on a le droit de faire',
  consigne:'Touche les quatre manipulations : deux sont permises, deux ne le sont pas.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), st=el('div','statusline'); let k=0;
    const D=['Permis. La molécule est simplement retournée bout pour bout : c\'est la même.',
             'INTERDIT. Les traits horizontaux (vers l\'avant) deviendraient verticaux (vers l\'arrière) : on change de configuration.',
             'INTERDIT. C\'est un miroir : on obtient l\'énantiomère, pas la même molécule.',
             'Permis. Faire tourner trois ligands autour du quatrième ne change pas la configuration.'];
    const draw=()=>{ fig.innerHTML=figFischerOK(k); st.innerHTML=D[k];
      [...row.children].forEach((b,j)=>b.classList.toggle('on',j===k)); };
    ['180° dans le plan','90° dans le plan','Retourner','Permuter 3 ligands'].forEach((t,j)=>{
      const b=el('button','btn'); b.textContent=t; b.style.flex='1 1 44%'; b.style.fontSize='13.5px';
      b.onclick=()=>{k=j;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig); host.appendChild(st); draw();
  },
  une:'Une projection de Fischer n\'est pas un dessin comme un autre : c\'est un code, avec des manipulations autorisées et d\'autres interdites.',
  probleme:'<p>La projection de Fischer est la façon la plus rapide de comparer des molécules à plusieurs centres — c\'est pour cela qu\'elle survit depuis 1891. Mais elle encode la 3ᵉ dimension dans une convention implicite, et si on la manipule comme un dessin ordinaire, on change de molécule sans s\'en rendre compte.</p>',
  etapes:[
   {q:'La convention, d\'abord.',
    t:'La chaîne carbonée est <b>verticale</b>, l\'atome le plus oxydé en haut. Les liaisons <b>verticales</b> partent vers l\'arrière, les liaisons <b>horizontales</b> viennent vers toi. Chaque croisement représente un carbone.'},
   {q:'Permis : tourner de 180° dans le plan.',
    t:'La molécule est simplement retournée bout pour bout. Les horizontales restent horizontales, les verticales restent verticales : la convention est respectée.'},
   {q:'Interdit : tourner de 90°.',
    t:'Les traits horizontaux deviendraient verticaux et inversement — donc ce qui pointait vers toi pointerait vers l\'arrière. Tu aurais changé de configuration sans t\'en apercevoir.'},
   {q:'Interdit : retourner le dessin (hors du plan).',
    t:'C\'est une opération miroir : tu obtiens l\'énantiomère. C\'est l\'erreur la plus coûteuse, parce que le dessin obtenu <i>paraît</i> identique.'},
   {q:'Permis : permuter circulairement trois ligands.',
    t:'Faire tourner trois ligands en laissant le quatrième en place ne change pas la configuration. Deux permutations simples successives reviennent au même, et c\'est bien pratique pour mettre une molécule sous la forme que tu veux comparer.'},
   {q:'Une limite à connaître.',
    t:'Une projection de Fischer à plusieurs centres correspond à une conformation <b>éclipsée</b>, donc très défavorable — elle n\'existe quasiment pas dans la réalité. Ce n\'est pas grave : Fischer sert à décrire la <i>configuration</i>, pas la forme réelle.'}
  ],
  retenir:[
   'Vertical = vers l\'arrière, horizontal = vers toi.',
   'Permis : rotation de 180° dans le plan, permutation circulaire de trois ligands.',
   'Interdit : rotation de 90°, retournement hors du plan.',
   'Si le dessin a un plan de symétrie HORIZONTAL, le composé est méso, donc achiral.'
  ],
  quiz:{q:'Tu échanges deux ligands sur un centre d\'une projection de Fischer. Qu\'obtiens-tu&nbsp;?',
        a:'L\'<b>épimère</b> à ce centre — c\'est-à-dire un diastéréoisomère si la molécule a d\'autres centres, ou l\'énantiomère si c\'est le seul. Une permutation <i>simple</i> (deux ligands) inverse toujours la configuration ; une permutation <i>circulaire</i> (trois ligands) la conserve. Cela se retient facilement : deux permutations simples successives équivalent à une permutation circulaire.'}
});

S({
  grp:G4, title:'Méso, et le cas très particulier de la pseudo-asymétrie',
  consigne:'Regarde le plan de symétrie vert : il traverse la molécule horizontalement.',
  build(host){
    const f1=el('div','figbox'), f2=el('div','figbox');
    f1.innerHTML=figPaire('diast'); f2.innerHTML=figPseudo();
    host.appendChild(f1);
    host.appendChild(el('div','statusline','Deux centres stéréogènes, et pourtant la molécule de droite est <b>achirale</b> : ses deux moitiés sont images l\'une de l\'autre.'));
    host.appendChild(f2);
  },
  une:'Un composé méso contient des centres stéréogènes mais reste achiral, parce que ses deux moitiés s\'annulent. Et quand il y en a un nombre impair, le centre du milieu devient un objet à part.',
  probleme:'<p>Le méso est le premier vrai obstacle de la stéréochimie : il contredit la règle naïve « centre stéréogène = molécule chirale ». Et son cousin, le centre <b>pseudo-asymétrique</b>, contredit ensuite la règle « R et S s\'écrivent en majuscules ».</p><p>Les deux sont pourtant parfaitement logiques.</p>',
  etapes:[
   {q:'Quand un composé est-il méso ?',
    t:'Quand il est <b>constitutionnellement symétrique</b> (ses deux moitiés sont identiques) et qu\'il possède au moins une paire de centres de configurations opposées. Les deux moitiés sont alors images l\'une de l\'autre : la molécule contient son propre miroir.'},
   {q:'Comment le repérer sur un Fischer.',
    t:'Un plan de symétrie <b>horizontal</b> suffit. C\'est immédiat à l\'œil, et c\'est précisément pour cela que Fischer reste utile.'},
   {q:'Ce que cela change pour le décompte.',
    t:'Les formes (R,S) et (S,R) deviennent la <b>même</b> molécule. L\'acide tartrique n\'a donc que trois stéréoisomères : (+), (−) et méso — et non quatre.'},
   {q:'Maintenant, trois centres au lieu de deux.',
    t:'Prends l\'acide 2,3,4-trihydroxyglutarique. Les centres 2 et 4 sont fixés en miroir l\'un de l\'autre (la molécule est méso). Mais le centre du <b>milieu</b> peut encore être orienté de deux façons — et les deux donnent des molécules achirales.'},
   {q:'Pourquoi ce centre est spécial.',
    t:'Ses deux formes ne sont pas énantiomères (les deux sont achirales) : ce sont des <b>diastéréoisomères</b>. Un centre dont l\'inversion transforme un composé achiral en un autre composé achiral est dit <b>pseudo-asymétrique</b>.'},
   {q:'D\'où les minuscules.',
    t:'Comme le reflet dans un miroir ne change pas ces molécules, leur descripteur ne doit pas changer non plus. Il s\'écrit donc <b>en minuscules : r et s</b> — conformément à la règle vue en section 1 (minuscules = configuration relative, invariante par réflexion).'}
  ],
  retenir:[
   'Méso = constitutionnellement symétrique + centres opposés = achiral malgré ses centres.',
   'Sur un Fischer : plan de symétrie horizontal.',
   'Un centre pseudo-asymétrique relie deux composés achirals : il se note en minuscules r/s.',
   'Les minuscules ne sont pas un caprice : elles signalent un descripteur invariant par réflexion.'
  ],
  quiz:{q:'Le méso-tartrique a-t-il un pouvoir rotatoire&nbsp;?',
        a:'<b>Non, exactement zéro</b> — et pas « par compensation approximative » : la molécule est <b>achirale</b>. Elle possède un plan de symétrie (au moins dans certaines conformations, et toutes ses conformations chirales s\'interconvertissent librement). Ne pas confondre avec un <b>racémique</b>, qui a lui aussi une rotation nulle mais pour une raison toute différente : c\'est un mélange 50/50 de deux molécules chirales. On peut séparer un racémique ; on ne peut rien séparer dans un méso.'}
});

S({
  grp:G4, title:'Le zig-zag, syn / anti, et les descripteurs « mous »',
  consigne:'Bascule entre syn et anti : ce qui change, c\'est le côté du zig-zag.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='syn';
    const draw=()=>{ fig.innerHTML=figZigzag(cur);
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur)); };
    [['syn','syn'],['anti','anti']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b); });
    host.appendChild(row); host.appendChild(fig);
    host.appendChild(el('div','statusline','Ces descripteurs sont pratiques mais fragiles. Robinson les appelle des descripteurs <b>« mous »</b> : ils dépendent du dessin, donc du choix de la chaîne principale.'));
    draw();
  },
  une:'Le zig-zag est devenu la représentation standard des chaînes ouvertes, mais les mots qu\'on y accroche — syn, anti, thréo, érythro — sont moins fiables qu\'ils n\'en ont l\'air.',
  probleme:'<p>Dans la littérature de synthèse, on lit en permanence « aldol syn », « produit anti », « diol thréo ». Ces mots sont commodes. Le problème, c\'est qu\'ils dépendent de la manière dont on a dessiné la molécule — et Robinson cite explicitement des cas où ils ont été employés à tort.</p>',
  etapes:[
   {q:'La convention de Masamune.',
    t:'La chaîne principale est dessinée à plat, en <b>zig-zag régulier</b>. Les substituants pointent au-dessus ou en dessous du plan du zig-zag. Avantage : cela ressemble souvent à une conformation réelle de la molécule.'},
   {q:'syn et anti.',
    t:'Deux substituants sont <b>syn</b> s\'ils sont du même côté du zig-zag, <b>anti</b> s\'ils sont de part et d\'autre. Si un carbone porte deux substituants, c\'est le plus prioritaire (CIP) qui décide.'},
   {q:'Première fragilité : le choix de la chaîne.',
    t:'Sur une molécule ramifiée, « la chaîne principale » n\'est pas toujours évidente, et les règles IUPAC ne sont pas toujours respectées. Change de chaîne, et syn devient anti.'},
   {q:'Deuxième fragilité : aucun lien avec cis/trans.',
    t:'Il n\'existe <b>aucune</b> correspondance régulière entre syn/anti pour une molécule ouverte et cis/trans pour le cycle correspondant. Robinson donne l\'exemple d\'une lactone : la même relation devient <i>cis</i> ou <i>trans</i> selon qu\'on la lit en version cyclique ou ouverte.'},
   {q:'Troisième fragilité : thréo et érythro.',
    t:'Ils viennent des sucres thréose et érythrose, et n\'ont de sens clair que lorsque les deux centres portent deux paires de ligands <b>identiques</b>. Dès que les ligands sont seulement « similaires », l\'ambiguïté s\'installe.'},
   {q:'Ce qu\'il faut faire.',
    t:'Pour les cas sérieux, utiliser les descripteurs <b>l</b> et <b>u</b> : <i>l</i> (like) si les deux centres sont tous les deux R ou tous les deux S, <i>u</i> (unlike) sinon. C\'est sans ambiguïté — mais cela suppose d\'avoir attribué R et S. Et dans tous les cas, joindre un <b>dessin</b>.'}
  ],
  retenir:[
   'Zig-zag à plat = convention de Masamune ; syn = même côté, anti = côtés opposés.',
   'syn/anti dépend du choix de la chaîne principale : ce sont des descripteurs « mous ».',
   'Aucune correspondance fiable entre syn/anti (ouvert) et cis/trans (cyclique).',
   'l (les deux R ou les deux S) et u (un de chaque) sont rigoureux — mais demandent R/S.'
  ],
  quiz:{q:'Un article décrit un « aldol anti » sans donner de structure. Peux-tu en déduire la configuration relative&nbsp;?',
        a:'Pas avec certitude. Tu sais que les deux substituants sont de part et d\'autre du zig-zag de la chaîne principale — mais il faudrait connaître <b>quelle chaîne</b> les auteurs ont considérée comme principale, et quel substituant ils ont retenu sur chaque carbone. Dans le cas standard d\'une aldolisation (un méthyle et un hydroxyle sur des carbones voisins) l\'usage est stable et tu peux te fier au mot. Dès que la molécule se complique, il faut le dessin. C\'est exactement la mise en garde de Robinson.'}
});
