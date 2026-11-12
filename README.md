# OHANA HOME SCI â€” aperÃ§u privÃ©

PremiÃ¨re version Next.js du site catalogue. Les neuf terrains sont chargÃ©s comme donnÃ©es de prÃ©paration, tous en `draft`. Les demandes sont rÃ©ellement enregistrÃ©es dans `data/ohana.json` en dÃ©veloppement avec Ã©criture atomique et prÃ©vention des doublons ; lâ€™envoi dâ€™e-mail et Supabase restent Ã  connecter.

## DÃ©marrage

```bash
npm install
npm run dev
```

Copier `.env.example` vers `.env.local`. Le code de dÃ©monstration admin est `ohana-preview` par dÃ©faut et doit impÃ©rativement Ãªtre remplacÃ© avec une authentification rÃ©elle avant dÃ©ploiement. Activer `COOKIE_SECURE=true` sur un hÃ©bergement HTTPS.

## VÃ©rifications

```bash
npm run typecheck
npm run lint
npm run build
```

## Avant mise en ligne

- fournir le logo officiel, les photos rÃ©elles et les contenus lÃ©gaux ;
- confirmer pour chaque terrain disponibilitÃ©, prix, mÃ©dias, superficie et dossier public ;
- fournir les contenus approuvÃ©s du promoteur ;
- connecter PostgreSQL/Supabase, stockage mÃ©dia, authentification par rÃ´les et notification interne ;
- mesurer Lighthouse sur lâ€™hÃ©bergement cible et remplacer le visuel gÃ©nÃ©rÃ© de dÃ©monstration.

