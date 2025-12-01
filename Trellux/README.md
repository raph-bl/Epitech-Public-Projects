# Trellux 📑
Trellux est une web app inspirée de Trello développée dans le cadre d'un projet Epitech.
L'application permet de gérer des tâches de manière visuelle en comportant plusieures cartes et vues personnalisables pour organiser au mieux son espace de travail.

# Stack utilisée🖥️
## Node.js
Node.js est une plateforme d’exécution (runtime) JavaScript côté serveur, conçue pour créer des applications rapides et modulables. Elle repose sur un modèle asynchrone et orienté événements, ce qui permet de gérer efficacement un grand nombre de connexions simultanées.
Node.js est accompagné de son package manager NPM permettant d'installer des dépendances directement dans le workspace.

### React Framework ⚛
React est un framework web moderne et modulable qui permet de combiner JavaScript et HTML. Sa principale force réside dans son système de composants, qui permet de diviser l’interface en éléments graphiques réutilisables et indépendants.

### Tailwind CSS ✏️
Tailwind CSS est un framework moderne et flexible qui facilite la création d’interfaces web. Il repose sur un système de classes utilitaires permettant de styliser directement les éléments HTML, ce qui rend le développement plus rapide, cohérent et facilement personnalisable.

### Express.js 🖧
Express.js est un framework web minimaliste et flexible pour Node.js. Il simplifie la création d’applications web et d’API en offrant une structure légère, une gestion efficace des routes et un grand nombre de middlewares pour étendre facilement ses fonctionnalités.

### Dotenv
Dotenv est une bibliothèque qui permet de charger facilement des variables d’environnement depuis un fichier .env dans une application. Elle est couramment utilisée pour gérer de manière sécurisée les informations sensibles, comme les clés API ou les identifiants de base de données, sans les exposer directement dans le code source.

# Installation & usage


### 1. Node.js et npm

Node.js est un environnement qui permet d'exécuter du JavaScript. npm (Node Package Manager) est l'outil qui permet d'installer les dépendances du projet.

**Comment vérifier si vous avez déjà Node.js :**
Ouvrez un terminal (ou invite de commande) et tapez :
```bash
node --version
npm --version
```

Si vous voyez des numéros de version (exemple : v18.0.0), c'est bon ! Sinon, suivez les étapes ci-dessous.

**Comment installer Node.js :**
- Rendez-vous sur [nodejs.org](https://nodejs.org/)
- Téléchargez la version LTS (Long Term Support) - la plus stable
- Lancez l'installeur et suivez les instructions
- Redémarrez votre terminal après l'installation

### 2. Git (optionnel)

Git permet de télécharger et gérer le code source.

**Vérifier si Git est installé :**
```bash
git --version
```

**Installer Git :**
- Téléchargez depuis [git-scm.com](https://git-scm.com/)
- Suivez les instructions d'installation

## Installation du projet

### Étape 1 : Télécharger le projet

**Option A : Avec Git (recommandé)**
```bash
git clone <url-du-repository>
cd B-WEB-101-MPL-1-1-etodo-8
```

**Option B : Sans Git**
- Téléchargez le projet en ZIP
- Extrayez le dossier
- Ouvrez un terminal dans ce dossier

### Étape 2 : Installer les dépendances

Les dépendances sont toutes les bibliothèques externes dont le projet a besoin (React, etc.).

Dans votre terminal, à la racine du projet, exécutez :
```bash
npm install
```

Cette commande va :
- Lire le fichier `package.json` qui liste toutes les dépendances
- Télécharger et installer automatiquement toutes les bibliothèques nécessaires
- Créer un dossier `node_modules` contenant toutes ces bibliothèques

Cela peut prendre quelques minutes. Soyez patient !

### Étape 3 : Lancer l'application

Une fois l'installation terminée, lancez l'application en mode développement :
```bash
npm start
```

Cette commande va :
- Compiler le code React
- Lancer un serveur de développement local
- Ouvrir automatiquement votre navigateur sur [http://localhost:3000](http://localhost:3000)

L'application se rechargera automatiquement à chaque modification du code !

## Commandes disponibles

### `npm start`
Lance l'application en mode développement sur [http://localhost:3000](http://localhost:3000).
La page se recharge automatiquement quand vous modifiez le code.

### `npm test`
Lance les tests de l'application en mode interactif.
Utile pour vérifier que tout fonctionne correctement.

### `npm run build`
Crée une version optimisée de l'application pour la production dans le dossier `build`.
Cette version est minifiée et prête à être déployée sur un serveur.

## Structure du projet

```
etodo/
├── public/           # Fichiers statiques (images, index.html)
├── src/              # Code source de l'application
│   ├── components/   # Composants React réutilisables
│   ├── App.js        # Composant principal
│   └── index.js      # Point d'entrée de l'application
├── package.json      # Liste des dépendances et scripts
└── README.md         # Ce fichier
```

## Technologies utilisées

- **React** : Bibliothèque JavaScript pour créer l'interface utilisateur
- **React Router** : Gestion de la navigation entre les pages
- **Tailwind CSS** : Framework CSS pour le style
- **Framer Motion** : Animations fluides
- **Supabase** : Backend et base de données

## Problèmes courants

### Le port 3000 est déjà utilisé
Si vous voyez cette erreur, un autre programme utilise déjà le port 3000.
- Fermez les autres applications qui utilisent ce port
- Ou acceptez d'utiliser un autre port quand npm vous le propose

### Erreurs lors de npm install
- Vérifiez votre connexion Internet
- Essayez de supprimer le dossier `node_modules` et le fichier `package-lock.json`, puis relancez `npm install`
- Vérifiez que vous avez la bonne version de Node.js (v14 ou supérieure recommandée)

### L'application ne se lance pas
- Vérifiez que `npm install` s'est bien terminé sans erreur
- Regardez les messages d'erreur dans le terminal
- Essayez de redémarrer votre terminal

## Besoin d'aide ?

- Documentation React : [reactjs.org](https://reactjs.org/)
- Documentation Create React App : [create-react-app.dev](https://create-react-app.dev/)
- Tutoriels React en français : [fr.react.dev](https://fr.react.dev/)

## Contribution

N'hésitez pas à contribuer au projet en créant des issues ou des pull requests !
