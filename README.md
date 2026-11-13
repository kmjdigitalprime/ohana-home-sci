# OHANA HOME SCI — aperçu privé

Site catalogue Next.js pour la vente de terrains au Cameroun. Cette version inclut l’accueil premium responsive, le catalogue et ses filtres, les fiches, la page Réalisations, la page du promoteur, le parcours diaspora, les demandes enregistrées côté serveur et un espace de gestion protégé.

Les neuf terrains restent des données de préparation avec le statut éditorial `draft`. Aucune superficie, coordonnée GPS, information foncière, réalisation ou citation n’est inventée. L’aperçu Hostinger doit rester protégé par mot de passe et hors index jusqu’à validation des contenus.

## Démarrage local

```bash
npm install
npm run dev
```

Copier `.env.example` vers `.env.local`, puis renseigner au minimum `PREVIEW_ACCESS_PASSWORD` et `ADMIN_DEMO_TOKEN` avec des valeurs longues et différentes. Activer `COOKIE_SECURE=true` sur un hébergement HTTPS.

## Vérifications

```bash
npm run typecheck
npm run lint
npm run build -- --webpack
```

Les rendus de référence ont été contrôlés à 360 px, 768 px et 1440 px. Une mesure Lighthouse devra encore être réalisée depuis l’hébergement cible pour documenter le LCP et le CLS en conditions de laboratoire.

## Médias

- Logo officiel : `public/ohana-home-logo.png`
- Images optimisées : `public/ohana-terrain-*.webp` et médias existants dans `public`
- Nouveaux originaux conservés : `public/originaux/`

`next/image` est utilisé avec des dimensions réservées. L’optimisation dynamique est désactivée dans `next.config.ts` afin d’éviter une dépendance à `/_next/image` sur l’hébergement Hostinger ; les variantes WebP sont donc générées avant le déploiement.

## Cartographie et confidentialité

Chaque terrain prévoit latitude, longitude, lien Google Maps, niveau de précision, statut de vérification et autorisation de publication. Tant que ces champs ne sont pas validés, aucune carte, aucun marqueur et aucun lien d’itinéraire n’est rendu. Lorsqu’une position sera autorisée, la carte externe restera chargée uniquement après action de l’utilisateur.

## Données et services à connecter avant production

- formulaire éditorial OHANA HOME rempli et approuvé ;
- nom, fonction, biographie, vision et mot validés du promoteur ;
- réalisations documentées avec autorisation de diffusion ;
- disponibilité, superficie, médias, dossier public et coordonnées de chaque terrain ;
- URLs officielles Instagram, LinkedIn, YouTube, TikTok et X ;
- PostgreSQL/Supabase, stockage média, authentification par rôles et notification interne ;
- mentions légales, confidentialité, adresse et horaires confirmés.

En développement, les demandes sont enregistrées dans `data/ohana.json` avec écriture atomique, validation, prévention des doublons et protection anti-spam. Ce stockage local doit être remplacé par une base persistante avant une mise en production multi-instance.
