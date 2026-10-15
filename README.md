# 🌿 Green Comptoir — Landing Page VIP "Founding Members"

> **Le premier fast-food healthy arrive enfin à Marrakech.**  
> Landing page événementielle conçue pour recruter les **20 Membres Fondateurs ("Founding Members")** avant l'ouverture officielle.

---

## 📸 Aperçu du Projet

Green Comptoir réinvente la restauration rapide à Marrakech :
- 🥔 **100% Zéro Friture** : Tout est cuit au four !
- 🥑 **Burgers & Kumpirs signatures** : Chauds, généreux et sur-mesure.
- 🥤 **Smoothies naturels** : Sans sucres ajoutés.

Cette landing page haute conversion a été développée sur-mesure avec une direction artistique soignée, sans framework lourd, garantissant des performances maximales et un chargement instantané.

---

## ✨ Fonctionnalités Clés

- 🚨 **Bandeau d'Urgence Épuré (Sticky Top Bar)** : Fixe en haut de page, signalant l'exclusivité de l'événement et le nombre restreint de places.
- 🎯 **Hero Split-Screen 50/50** : 
  - Typographie Poppins & Inter moderne avec mise en valeur colorée des propositions de valeur.
  - Visuel macro haute définition sans éléments visuels superflus.
- ⏳ **Timeline VIP Interactive (Scroll-Linked)** :
  - Barre de progression dynamique qui se remplit au fur et à mesure du défilement.
  - Activation fluide des jalons (Invitation VIP, Expérience Ambassadeur, Statut à Vie).
  - Optimisée à 60/120 fps via `requestAnimationFrame` et zéro Layout Thrashing.
- 💚 **Section "Notre Histoire" avec Animation Dynamique** :
  - Image fondatrices avec effet d'inclinaison (*tilt*) au scroll se redressant à 0° lors de l'arrivée dans la zone de lecture.
  - Citation des fondatrices en bandeau horizontal pleine largeur.
- 📝 **Formulaire de Candidature Sécurisé** :
  - Validation interactive instantanée.
  - Logo officiel vectoriel WhatsApp intégré.
  - Écran de confirmation de succès après soumission.
- 🎨 **Motif d'Arrière-Plan Signature (Pattern)** :
  - Tapisserie filigrane subtile habillant délicatement l'ensemble des sections sans impacter la lisibilité.
- 📱 **100% Responsive Design** : Adapté au pixel près pour mobile, tablette et desktop.

---

## 🗂️ Structure du Projet

```plaintext
green-comptoir/
├── index.html           # Structure HTML5 sémantique & SEO optimisée
├── style.css            # Styles CSS3 modernes (variables, grid, flexbox, animations)
├── script.js            # Interactions JavaScript pures (rAF, IntersectionObserver)
├── hero_kumpir_food.jpg # Photographie haute définition du Hero
├── founders_photo.jpg   # Photographie des fondatrices (Section Histoire)
├── images/
│   └── Pattern.png      # Motif géométrique de fond
└── README.md            # Documentation du projet
```

---

## 🚀 Lancement Local

Aucune installation complexe ni `node_modules` requis !

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/<votre-utilisateur>/green-comptoir.git
   cd green-comptoir
   ```

2. **Ouvrir le projet** :
   - Double-cliquez simplement sur `index.html` pour l'ouvrir dans n'importe quel navigateur moderne.
   - Ou lancez un serveur local rapide (ex: extension VS Code *Live Server* ou via Python) :
     ```bash
     python -m http.server 8080
     ```
     Puis rendez-vous sur `http://localhost:8080`.

---

## 🌐 Déploiement sur GitHub Pages (1 minute)

Cette landing page est 100% statique et prête pour un déploiement gratuit et instantané sur **GitHub Pages** :

1. Poussez vos modifications sur votre dépôt GitHub :
   ```bash
   git push -u origin master
   ```
2. Sur votre dépôt GitHub, rendez-vous dans l'onglet **Settings** (Paramètres).
3. Dans le menu de gauche, cliquez sur **Pages**.
4. Sous la section **Build and deployment** > **Branch** :
   - Sélectionnez la branche `master` (ou `main`).
   - Choisissez le dossier `/ (root)`.
   - Cliquez sur **Save**.
5. Votre site sera en ligne en quelques secondes à l'adresse :
   ```plaintext
   https://<votre-utilisateur>.github.io/green-comptoir/
   ```

---

## 🎨 Palette de Couleurs & Design System

| Nom | Couleur | Code HEX | Utilisation |
| :--- | :---: | :--- | :--- |
| **Vert Émeraude** | 🟩 | `#1a6b47` | Identité saine, badges, accents |
| **Vert Forêt** | 🌲 | `#0d3b24` | Fond sombre du Footer & Section CTA |
| **Orange Soleil** | 🟧 | `#f97316` | Boutons CTA d'action, urgence, énergie |
| **Crème Doux** | 🥛 | `#faf7f2` | Fond principal chaleureux et propre |
| **Gris Sombre** | ⬛ | `#111827` | Typographie principale pour un confort de lecture optimal |

---

## 📄 Licence & Droits

&copy; 2025 **Green Comptoir Marrakech**. Tous droits réservés.  
*Every bite tells a story.* 🌿
