# EduEvent

Plateforme web de gestion des événements du Campus Henry Christophe de Limonade (CHCL). EduEvent centralise l'information sur les activités académiques, sportives et culturelles du campus, et permet aux étudiants de consulter, filtrer et s'inscrire aux événements depuis un espace personnel.

## Objectifs

- Regrouper en un seul endroit tous les événements organisés sur le campus (sport, culture, ateliers, conférences)
- Simplifier la recherche d'un événement grâce à des filtres par catégorie et par date
- Offrir un espace étudiant permettant de créer un compte, suivre ses inscriptions et gérer son profil
- Proposer une expérience simple, responsive et sans dépendance à un serveur ou une base de données

## Technologies utilisées

- **HTML5** — structure sémantique des 5 pages du site
- **CSS3** — mise en page (Flexbox/Grid), thème via variables CSS, responsive design, animations
- **JavaScript** — sans framework ni librairie, uniquement du DOM natif
- **JSON** — source de données statique pour les événements (`data/evenements.json`)
- **localStorage** — persistance côté navigateur pour la session étudiant et les inscriptions
- **Ionicons** (CDN) — icônes utilisées dans l'en-tête et le pied de page

## Arborescence du projet

```
EduEvent/
├── index.html              # Page d'accueil
├── evenements.html          # Liste des événements (recherche, filtres, pagination)
├── detail.html               # Détail d'un événement + formulaire d'inscription
├── profil.html                # Espace étudiant (connexion / inscription / dashboard)
├── a-propos.html               # À propos, équipe, FAQ, contact
├── css/
│   ├── style.css                # Styles principaux
│   ├── responsive.css            # Adaptations mobile (< 760px)
│   └── animation.css              # Animations (fade-in au chargement)
├── js/
│   ├── main.js                     # Menu mobile, compteur, page d'accueil
│   ├── evenements.js                # Recherche, filtres, vue grille/liste, pagination
│   ├── detail.js                      # Affichage du détail + validation d'inscription
│   └── profil.js                       # Authentification, dashboard, gestion localStorage
├── data/
│   └── evenements.json                  # Données des événements
└── images/
│     └── ...                                # Logos, photos et visuels des événements
│  
 ──README.md                                   #documentation du projet

## Fonctionnalités principales

- **Page d'accueil** : présentation du projet, événements à la une, compteur de statistiques animé, formulaire de newsletter
- **Liste des événements** : recherche en temps réel, filtres par catégorie et par date, bascule vue grille/liste, chargement progressif ("Voir plus")
- **Détail d'un événement** : informations complètes, formulaire d'inscription, témoignages, partage sur les réseaux sociaux
- **Espace étudiant** : connexion/inscription, gestion de profil (photo, faculté, programme, niveau), suivi et annulation des inscriptions aux événements, persistance via `localStorage`
- **À propos** : présentation de l'équipe, FAQ en accordéon, formulaire de contact avec validation JavaScript, carte de localisation

## Comment lancer le projet

Ce projet est entièrement statique (aucun serveur backend requis), mais l'utilisation de `fetch()` pour charger `evenements.json` nécessite de le servir via un serveur local plutôt que de l'ouvrir directement en `file://`.

1. Cloner ou télécharger le dossier `EduEvent`
2. Lancer un serveur local à la racine du dossier, par exemple :
   ```bash
   # avec Python
   python -m http.server 5500

   # ou avec l'extension "Live Server" de VS Code
   ```
3. Ouvrir `http://localhost:5500/index.html` dans le navigateur

## Membres de l'équipe

- **Nicky Mexilas** — 
- **Youghensley Gaspard**

*Étudiants en Licence 3 Informatique, Campus Henry Christophe de Limonade.*

## Licence

Projet réalisé dans un cadre académique, à usage pédagogique uniquement.
