# 🍌 Wanklean Reddit

Nettoie l'interface Reddit : retire les sidebars, centre le contenu, force une seule colonne.

## Installation

1. Ouvre Chrome et va sur `chrome://extensions/`
2. Active le **Mode développeur** (toggle en haut à droite)
3. Clique sur **Charger l'extension non empaquetée**
4. Sélectionne le dossier `wanklean-reddit/`

## Utilisation

1. Va sur n'importe quelle page Reddit
2. Clique sur l'icône 🍌 dans la barre d'extensions
3. Active le toggle → l'interface est nettoyée
4. Désactive le toggle → Reddit revient à la normale

## Avant / Après

**Avant** — Reddit avec sidebars, header encombré, 2 colonnes :

![Avant](/images/avant.png)

**Après** — Interface nettoyée, centrée, une seule colonne :

![Après](/images/apres.png)

## Ce que ça fait

- Retire la sidebar gauche et droite
- Retire les éléments d'action du header
- Centre la page sur l'écran (max 1120px)
- Force une seule colonne (plus de grille 2 colonnes)
- Masque les posts sponsorisés

## Fichiers

| Fichier | Rôle |
|---|---|
| `manifest.json` | Configuration de l'extension |
| `content.js` | Logique de nettoyage (injection CSS + suppression DOM) |
| `popup.html` | Interface du popup (toggle on/off) |
| `popup.js` | Gère le toggle et la sauvegarde de l'état |
| `styles.css` | CSS statique (backup) |
| `icon48.png` / `icon128.png` | Icônes |

## Désactiver / Réactiver

Clic sur l'icône 🍌 → toggle off/on. L'état est sauvegardé : si tu fermes le popup et reviens plus tard, il se souvient de ton choix.
