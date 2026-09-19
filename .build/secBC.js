
/* ==========================================================================
   GROUPE B — Les trois stratégies
   ========================================================================== */
const GB='B — Les trois stratégies';

S({
  grp:GB, title:'Les trois stratégies, côte à côte',
  consigne:'Appuie sur « auxiliaire », « réactif » puis « catalyseur » et compare les lignes du tableau.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'), info=el('div',''); let cur='aux';
    const draw=()=>{
      fig.innerHTML=figStrategie(cur); const d=STRAT[cur];
      info.innerHTML=`<table class="dat"><tbody>
        <tr><td>Quantité d'agent chiral</td><td>${d.agent}</td></tr>
        <tr><td>Nombre d'étapes</td><td>${d.etapes}</td></tr>
        <tr><td>Relation entre les 2 produits</td><td>${d.relation}</td></tr>
        <tr><td>Séparables&nbsp;?</td><td>${d.sep}</td></tr>
        <tr><td>Type de contrôle</td><td>${d.ctrl}</td></tr></tbody></table>
        <div class="statusline" style="margin-top:12px"><span style="color:var(--ok)">➕</span> ${d.plus}<br>
        <span style="color:var(--red)">➖</span> ${d.moins}</div>`;
      [...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));
    };
    ['aux','reac','cata'].forEach(k=>{
      const b=el('button','btn'); b.textContent=STRAT[k].nom.split(' ')[0]; b.dataset.k=k;
      b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); host.appendChild(info); draw();
  },
  une:'Les trois stratégies font la même chose — casser la symétrie — mais elles placent la source de chiralité à trois endroits différents : sur le substrat, dans le réactif, ou dans le catalyseur.',
  probleme:'<p>On a vu en section A qu\'il faut apporter de la chiralité. Il n\'existe que trois endroits où la mettre. Ce choix décide de tout le reste : le nombre d\'étapes, la quantité de produit chiral consommée, et surtout si on pourra rattraper une mauvaise sélectivité par une purification.</p>',
  etapes:[
   {q:'Stratégie 1 : la mettre sur le substrat.',
    t:'On accroche un <b>auxiliaire chiral</b> A* sur S. Le substrat devient lui‑même chiral, donc ses deux faces deviennent diastéréotopes. La réaction est alors <b>diastéréosélective</b>, et elle peut se faire avec un réactif parfaitement banal. Puis on décroche A*.'},
   {q:'Stratégie 2 : la mettre dans le réactif.',
    t:'Le substrat reste prochiral, mais le réactif est chiral et énantiopur. Comme il participe à l\'état de transition, celui‑ci devient diastéréoisomère. Une seule étape — mais il faut un équivalent entier de réactif chiral.'},
   {q:'Stratégie 3 : la mettre dans le catalyseur.',
    t:'Même idée, sauf que l\'espèce chirale est <b>régénérée</b> à chaque cycle. Quelques pour cent suffisent pour transformer tout le substrat. C\'est la plus élégante et la plus verte.'},
   {q:'Qu\'est-ce qui change concrètement au labo ?',
    t:'La nature du mélange à purifier. Avec un auxiliaire on obtient des <b>diastéréoisomères</b> : ils se séparent. Avec un réactif ou un catalyseur on obtient des <b>énantiomères</b> : ils ne se séparent pas en milieu achiral. La sélectivité mesurée est alors la sélectivité finale.'}
  ],
  retenir:[
   'Auxiliaire = 3 étapes, stœchiométrique, mais rattrapable par purification.',
   'Réactif = 1 étape, stœchiométrique, non rattrapable.',
   'Catalyseur = 1 étape, quelques mol %, non rattrapable — et la plus difficile à mettre au point.',
   'Dans les trois cas, le mécanisme profond est le même : rendre les deux états de transition diastéréoisomères.'
  ],
  plus:{titre:'Pourquoi la catalyse est « le plus élégant »',
    body:'<p>Procter le formule ainsi : une petite quantité de catalyseur chiral non racémique conduit à des quantités <b>stœchiométriques</b> de produit énantioenrichi. C\'est une multiplication : un catalyseur peut retourner des milliers de fois.</p><p>C\'est aussi la stratégie qu\'utilise la nature — les enzymes sont exactement cela : des catalyseurs chiraux énantiopurs. Et c\'est un des 12 principes de la chimie verte (principe n° 9 : « catalysis »).</p><p>Le prix à payer : un catalyseur est très spécifique d\'un substrat. Trouver le bon ligand pour une nouvelle réaction peut prendre des années, alors qu\'un auxiliaire d\'Evans marche à peu près partout.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, §2, fig. 2.5–2.7, p. 7–8.'},
  quiz:{q:'Pourquoi la voie auxiliaire tolère-t-elle une sélectivité moyenne alors que la voie catalytique ne le tolère pas&nbsp;?',
        a:'Parce que P–A* est un mélange de <b>diastéréoisomères</b> : polarités différentes, R<sub>f</sub> différents, donc un d.r. de 90 : 10 peut devenir 100 : 0 après colonne. En catalyse on obtient des <b>énantiomères</b> : mêmes propriétés physiques en milieu achiral, donc l\'e.e. mesuré est l\'e.e. final. Il n\'y a pas de rattrapage.'}
});

S({
  grp:GB, title:'Pourquoi P–A* donne des diastéréoisomères',
  consigne:'Bascule entre les deux boutons et compte les centres stéréogènes du produit.',
  build(host){
    const row=el('div','btnrow'), fig=el('div','figbox'); let cur='aux';
    const draw=()=>{fig.innerHTML=figRelation(cur);[...row.children].forEach(b=>b.classList.toggle('on',b.dataset.k===cur));};
    [['aux','Avec auxiliaire'],['ec','Réactif ou catalyseur']].forEach(([k,t])=>{
      const b=el('button','btn'); b.textContent=t; b.dataset.k=k; b.onclick=()=>{cur=k;draw();}; row.appendChild(b);
    });
    host.appendChild(row); host.appendChild(fig); draw();
  },
  une:'Avec un auxiliaire, le produit brut porte deux centres stéréogènes au lieu d\'un — et c\'est ce deuxième centre, celui qu\'on va jeter, qui rend le mélange séparable.',
  probleme:'<p>C\'est le point le plus souvent mal compris du chapitre, parce que le mot « diastéréoisomère » arrive sans qu\'on dise <i>d\'où</i> viennent les deux centres. Comptons‑les.</p>',
  etapes:[
   {q:'Combien de centres dans P–A* ?',
    t:'Deux. L\'auxiliaire en apporte un, de configuration <b>fixée et connue</b> (c\'est le (S) du valinol). La réaction en crée un second, celui qu\'on cherche à contrôler.'},
   {q:'Pourquoi ce sont des diastéréoisomères et pas des énantiomères ?',
    t:'Deux molécules qui ont <b>un centre identique</b> et un centre différent ne peuvent pas être images l\'une de l\'autre dans un miroir — un miroir inverserait les <i>deux</i> centres à la fois. Ce sont donc des diastéréoisomères.'},
   {q:'Pourquoi cela change tout au labo ?',
    t:'Des diastéréoisomères sont des composés <b>chimiquement différents</b> : points de fusion, solubilités, R<sub>f</sub> différents. Une colonne de silice les sépare. Une recristallisation aussi.'},
   {q:'Et après le clivage ?',
    t:'Le clivage supprime le centre de l\'auxiliaire. Il ne reste que celui créé pendant la réaction : les deux produits deviennent alors <b>énantiomères</b>. C\'est précisément pour cela qu\'on purifie <i>avant</i> de cliver, jamais après.'}
  ],
  retenir:[
   'Un centre créé + un centre apporté = diastéréoisomères = séparables.',
   'Un seul centre créé = énantiomères = inséparables.',
   'Ordre des opérations : réaction → purification → clivage. Jamais l\'inverse.'
  ],
  quiz:{q:'Après clivage de l\'auxiliaire, que deviennent les deux diastéréoisomères P–A*&nbsp;?',
        a:'Les deux <b>énantiomères</b> de P*. Le clivage enlève le centre stéréogène de l\'auxiliaire ; il ne reste que celui créé pendant la réaction. D\'où la règle : on purifie avant de cliver.'}
});

S({
  grp:GB, title:'Ce qu\'on demande à un bon auxiliaire',
  consigne:'Touche une ligne pour savoir pourquoi ce critère compte.',
  build(host){
    const box=el('div'), why=el('div','statusline'); let cur=0;
    const draw=()=>{
      box.innerHTML=`<table class="dat"><tbody>`
       + CAHIER.map((c,i)=>`<tr data-i="${i}" class="${i===cur?'sel':''}"><td>${c[0]}</td></tr>`).join('')
       + `</tbody></table>`;
      box.querySelectorAll('tr[data-i]').forEach(tr=>tr.onclick=()=>{cur=+tr.dataset.i;draw();});
      why.innerHTML='<b>'+CAHIER[cur][0]+'.</b> '+CAHIER[cur][1];
    };
    host.appendChild(box); host.appendChild(why); draw();
  },
  une:'Un auxiliaire n\'est pas seulement une molécule chirale : c\'est un outil qu\'on doit pouvoir accrocher, purifier, décrocher et récupérer.',
  probleme:'<p>Tes notes listent les avantages et inconvénients de la stratégie. Mais pourquoi <i>ces</i> molécules‑là — l\'oxazolidinone d\'Evans, le sulfinamide d\'Ellman — et pas d\'autres&nbsp;? Parce qu\'elles cochent toutes les cases d\'un cahier des charges assez exigeant. Procter en donne la liste.</p>',
  etapes:[
   {q:'Deux critères sur la chiralité elle-même.',
    t:'Il faut qu\'il soit <b>énantiopur</b> (sinon on fabrique les deux produits en parallèle) et <b>bon marché en quantité</b> (on en consomme un équivalent entier).'},
   {q:'Deux critères sur la réaction.',
    t:'L\'accrochage doit être facile, et la sélectivité doit être à la fois <b>forte et prévisible</b>. « Prévisible » est aussi important que « forte » : il faut pouvoir décider à l\'avance quel énantiomère on veut.'},
   {q:'Trois critères sur la fin de la séquence.',
    t:'Le diastéréoisomère majoritaire doit être facile à purifier, le clivage doit se faire <b>sans toucher au centre créé</b>, et l\'auxiliaire doit être récupérable.'},
   {q:'Pourquoi si peu de molécules conviennent ?',
    t:'Parce qu\'il faut les sept à la fois. Procter note qu\'il existe « relativement peu » d\'auxiliaires qui répondent à toutes ces exigences — ce qui explique qu\'on retrouve toujours les mêmes dans les cours et dans la littérature.'}
  ],
  retenir:[
   'L\'oxazolidinone d\'Evans vient du valinol ou de la noréphédrine : deux 1,2-aminoalcools issus du pool chiral, donc énantiopurs et bon marché.',
   'Elle s\'accroche par une simple acylation, et se décroche de cinq façons différentes selon le produit voulu.',
   'C\'est ce cahier des charges, et pas seulement la sélectivité, qui en a fait un standard.'
  ],
  plus:{titre:'« Pool chiral » : d\'où viennent ces molécules',
    body:'<p>Le <b>pool chiral</b>, c\'est l\'ensemble des molécules énantiopures que la nature produit en masse : acides aminés, sucres, acides hydroxylés (acide tartrique, acide lactique), terpènes.</p><p>Les deux auxiliaires d\'Evans en sont directement issus : l\'oxazolidinone à isopropyle vient de la <b>L-valine</b> (réduite en valinol), celle à méthyle/phényle vient de la <b>noréphédrine</b>. Le tartrate de la réaction de Sharpless vient de l\'acide tartrique, sous-produit de la vinification.</p><p>C\'est aussi ce qui explique l\'inconvénient noté dans tes notes : « il faut avoir accès aux deux énantiomères ». La nature ne fournit souvent qu\'un seul énantiomère d\'un acide aminé. Pour l\'autre configuration, on change d\'auxiliaire — d\'où l\'astuce des <b>pseudo‑énantiomères</b> valinol / noréphédrine.</p>',
    src:'<b>Procter, <i>Asymmetric Synthesis</i></b>, tableau 2.1 « Requirements for chiral auxiliaries », p. 9.'},
  quiz:{q:'Pourquoi l\'exigence « clivage sans perte de pureté » est-elle placée en dernier mais absolument critique&nbsp;?',
        a:'Parce qu\'elle intervient à la <b>dernière</b> étape, quand tout le travail est déjà fait. Si le clivage épimérise le centre créé — par exemple en le déprotonant, puisqu\'il est en α d\'un carbonyle — on perd d\'un coup toute la sélectivité gagnée. C\'est pour cela qu\'on utilise des conditions douces et rapides, et qu\'on évite les bases fortes prolongées.'}
});
