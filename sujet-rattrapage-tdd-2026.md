# Rattrapage TDD — Registre de sédiments

Un relevé incomplet décrit une coupe verticale d’un ancien canal de drainage. Le fichier `input.txt` est le registre brut : chaque ligne y décrit le contour orthogonal d’un élément fixe.

Le but n’est pas de reproduire une interface graphique. Il s’agit de produire les deux indicateurs décrits ci-dessous, ainsi que le code et les tests qui permettent de leur faire confiance.

Vous pouvez choisir **le langage et le framework de tests** de votre choix.

## Lire le registre

Une ligne est une suite de points séparés par ` -> ` :

```text
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
```

Les coordonnées représentent une grille : `x` augmente vers la droite et `y` vers le bas. Entre deux points consécutifs d’une même ligne, le segment est toujours horizontal ou vertical ; toutes les cases du segment, extrémités comprises, sont occupées par de la roche.

Dans l’extrait ci-dessus, le premier tracé contient donc les cases de `(498,4)` à `(498,6)`, puis celles de `(498,6)` à `(496,6)`.

Une arrivée de matière se trouve toujours en `(500,0)`. Une case non occupée par la roche ou par un dépôt est disponible.

## Comportement observé

Les dépôts apparaissent un par un : le suivant n’apparaît que lorsque le précédent est immobilisé. Depuis une position `(x,y)`, un dépôt examine les trois destinations dans cet ordre strict :

1. `(x, y + 1)` ;
2. `(x - 1, y + 1)` ;
3. `(x + 1, y + 1)`.

Il prend la première case disponible de cette liste. Lorsque les trois cases sont indisponibles, il reste sur sa position, qui devient alors occupée. Une roche et un dépôt immobilisé sont équivalents pour cette observation.

Pour l’extrait précédent, où `#` désigne la roche, `.` une case vide et `+` l’arrivée, la zone utile ressemble à ceci :

```text
  4     5  5
  9     0  0
  4     0  3
0 ......+...
1 ..........
2 ..........
3 ..........
4 ....#...##
5 ....#...#.
6 ..###...#.
7 ........#.
8 ........#.
9 #########.
```

Les premiers dépôts finissent notamment aux positions qui donnent la configuration suivante après cinq immobilisations :

```text
......+...
..........
..........
..........
....#...##
....#...#.
..###...#.
......o.#.
....oooo#.
#########.
```

`o` représente ici un dépôt immobilisé.

## Deux lectures du même relevé

Le programme fournit deux résultats, calculés indépendamment à partir du même fichier.

### Lecture A — limite ouverte

Sous la dernière ligne contenant de la roche, le relevé n’apporte plus aucune information : un dépôt qui atteint une ligne strictement plus basse que la roche la plus basse n’est plus comptabilisé. Le premier indicateur est le nombre de dépôts déjà immobilisés à cet instant.

Avec l’extrait donné plus haut, ce compteur vaut **24**. Après cela, les dépôts suivants quittent la zone connue.

### Lecture B — sol supposé

Pour cette lecture, la zone inconnue est remplacée par un sol horizontal sans limite, placé à :

```text
y = (plus grande coordonnée y de la roche) + 2
```

Ce sol est occupé sur toute la largeur utile. Les dépôts continuent jusqu’à ce que l’arrivée `(500,0)` elle-même devienne occupée. Le second indicateur est le nombre total de dépôts immobilisés, y compris le dernier.

Avec le même extrait, ce compteur vaut **93**. Le sol se situe alors à `y = 11`.

## Attendus de rendu

- Un dépôt contenant le code source, un `README` concis et les instructions pour lancer les tests et le programme.
- Le programme lit `input.txt` et affiche clairement les deux indicateurs.
- Une suite de tests automatisés exécutable par l’enseignant.
- Le `README` précise les choix faits pour le parsing, les erreurs éventuelles et le format de sortie.
- Déposez le lien de votre dépôt Git (GitHub, GitLab, etc.) et un fichier `students.txt` à sa racine contenant les noms des membres du groupe.

## Évaluation TDD

La qualité de la démarche de test compte davantage que la rapidité à obtenir les deux nombres. La suite doit notamment rendre visibles :

- le décodage des tracés et le remplissage de segments horizontaux et verticaux ;
- les trois directions, **dans leur ordre de priorité** ;
- l’immobilisation d’un dépôt et l’apparition du suivant ;
- la sortie par le bas de la zone connue ;
- le sol de la seconde lecture et l’obstruction de l’arrivée ;
- l’extrait fourni (`24` puis `93`) et des cas limites pertinents.

Travaillez par petites étapes vérifiables. L’historique Git doit permettre de comprendre vos cycles de tests, d’implémentation et de refactorisation ; des refactorisations séparées de l’ajout de comportement seront appréciées.
