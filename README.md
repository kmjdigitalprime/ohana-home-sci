# OHANA HOME SCI — aperçu privé

Première version Next.js du site catalogue. Les neuf terrains sont chargés comme données de préparation, tous en `draft`. Les demandes sont réellement enregistrées dans `data/ohana.json` en développement avec écriture atomique et prévention des doublons ; l’envoi d’e-mail et Supabase restent à connecter.

## Démarrage

```bash
npm install
npm run dev
```

Copier `.env.example` vers `.env.local`. Le code de démonstration admin est `ohana-preview` par défaut et doit impérativement être remplacé avec une authentification réelle avant déploiement. Activer `COOKIE_SECURE=true` sur un hébergement HTTPS.

## Vérifications

```bash
npm run typecheck
npm run lint
npm run build
```

## Avant mise en ligne

- fournir le logo officiel, les photos réelles et les contenus légaux ;
- confirmer pour chaque terrain disponibilité, prix, médias, superficie et dossier public ;
- fournir les contenus approuvés du promoteur ;
- connecter PostgreSQL/Supabase, stockage média, authentification par rôles et notification interne ;
- mesurer Lighthouse sur l’hébergement cible et remplacer le visuel généré de démonstration.
