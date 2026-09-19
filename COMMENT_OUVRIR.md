# Ouvrir le support sur ton téléphone

Le fichier `chap1_synthese_asymetrique.html` est **autonome** : tout est dedans
(structures, dessins, calculs). Aucune connexion n'est nécessaire une fois qu'il est
téléchargé. Tu peux le lire dans l'avion, dans le métro, en TP.

## Le plus simple

Le fichier est envoyé directement dans la conversation : appuie dessus, il s'ouvre.

## Depuis GitHub (pour le retrouver plus tard)

1. Ouvre le dépôt sur ton téléphone, branche `claude/great-dijkstra-e550ic`.
2. Appuie sur `chap1_synthese_asymetrique.html`.
3. Appuie sur **« Download raw file »** (ou « Raw » puis partager → enregistrer).
4. Ouvre l'app **Fichiers**, va dans **Téléchargements**, appuie sur le fichier.
   Il s'ouvre dans Safari (iPhone) ou Chrome (Android).

## Pour l'avoir toujours sous la main

- **iPhone** : une fois ouvert dans Safari, appuie sur le bouton Partager (carré avec
  une flèche) → **« Sur l'écran d'accueil »**. Tu auras une icône comme une app.
- **Android** : menu ⋮ dans Chrome → **« Ajouter à l'écran d'accueil »**.

## Ce qui est mémorisé

Le support retient sur ton téléphone la dernière section ouverte, le thème
(clair / sombre / automatique) et l'état de la légende. Si tu ouvres le fichier sur un
autre appareil, il repart de la première section — c'est normal, rien n'est envoyé
nulle part.

## Comment il est organisé

- **☰ en haut à gauche** : le sommaire complet, 28 sections en 8 groupes.
- **◐ en haut à droite** : bascule clair / sombre / automatique.
- **« Légende des couleurs »** : à déplier une fois, le code couleur est le même partout.
- **‹ Précédent / Suivant ›** en bas : pour avancer section par section.

Chaque section suit toujours la même structure :

1. **En une phrase** — l'idée, en une ligne.
2. **Le problème** — la question qu'on se pose *avant* de regarder le mécanisme.
3. **La consigne** puis le **visuel interactif** (touche les boutons).
4. **Le raisonnement, pas à pas** — une étape = une question + sa réponse.
5. **À retenir** — les points à emporter.
6. **Pour aller plus loin** — le détail, à ouvrir seulement si tu veux creuser.
7. **Une question** avec la réponse cachée.

Tu peux lire uniquement les points 1, 4 et 5 pour une révision rapide.

## Si tu veux modifier le support

Le fichier HTML est assemblé à partir de morceaux rangés dans `.build/`. Pour le
reconstruire après une modification :

```sh
sh .build/build.sh
```
