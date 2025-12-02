# Portfolio - Yanick ASSOGBA

Un portfolio moderne et élégant développé avec React.js, présentant mes projets, compétences et expérience professionnelle.

## 🚀 Technologies utilisées

- **React 19** - Bibliothèque JavaScript pour les interfaces utilisateur
- **Vite** - Build tool rapide et moderne
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Bibliothèque d'animations pour React
- **React Icons** - Collection d'icônes populaires

## ✨ Fonctionnalités

- 🌙 Mode sombre élégant
- 🌍 Support multilingue (Français / Anglais)
- 📱 Design responsive (mobile-first)
- 🎨 Animations fluides avec Framer Motion
- ⚡ Performance optimisée
- ♿ Accessibilité (ARIA labels, navigation clavier)
- 🔄 Smooth scrolling entre les sections

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 🎯 Sections du Portfolio

1. **Hero** - Introduction accrocheuse avec CTA
2. **About** - À propos de moi avec statistiques
3. **Skills** - Compétences et technologies avec animations
4. **Projects** - Galerie de projets avec filtres
5. **Experience** - Timeline d'expérience professionnelle
6. **Education** - Parcours académique
7. **Contact** - Formulaire de contact et informations
8. **Footer** - Liens sociaux et navigation

## 🛠️ Structure du projet

```
portofolio_yanick/
├── public/              # Assets statiques
├── src/
│   ├── components/      # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── context/         # Contextes React
│   │   └── LanguageContext.jsx
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── package.json
├── tailwind.config.js   # Configuration Tailwind
└── vite.config.js       # Configuration Vite
```

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être modifiées dans `tailwind.config.js` :

```js
colors: {
  primary: { ... },  // Couleurs principales
  dark: { ... }      // Couleurs du thème sombre
}
```

### Traductions

Les traductions sont gérées dans `src/context/LanguageContext.jsx`. Ajoutez ou modifiez les traductions dans l'objet `translations`.

## 📝 Notes

- Les projets, expériences et formations peuvent être personnalisés directement dans les composants correspondants
- Les liens sociaux peuvent être mis à jour dans les composants `Contact` et `Footer`
- Les images de projets utilisent actuellement des placeholders Unsplash - remplacez-les par vos propres images

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Yanick ASSOGBA**

- Portfolio: [À venir]
- LinkedIn: [Votre LinkedIn]
- GitHub: [Votre GitHub]
- Email: yanick.assogba@example.com

---

Fait avec ❤️ par Yanick ASSOGBA
