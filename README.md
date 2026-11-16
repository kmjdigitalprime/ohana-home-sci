# OHANA HOME SCI

Site Next.js de vente de terrains au Cameroun. Les pages publiques s’ouvrent directement, sans mot de passe. L’administration reste protégée côté serveur. Cette branche est une livraison de recette, sans déploiement.

## Lancer la version compilée

Avec Node.js 24 :

```bash
npm ci
npm run build -- --webpack
npm start -- --hostname 127.0.0.1 --port 3000
```

Ouvrir http://127.0.0.1:3000 dans Chrome ou Edge **sur la machine qui exécute ces commandes**. Une archive source ou un fichier TSX ne se lance pas par double-clic.

Aucune variable d’environnement n’est nécessaire pour afficher l’accueil. Les anciennes variables `PREVIEW_ACCESS_PASSWORD` et `PREVIEW_ACCESS_USER` n’activent plus de verrou. `/apercu` redirige vers l’accueil.

Pour la gestion locale, copier `.env.example` vers `.env.local` et définir `ADMIN_DEMO_TOKEN` avec une valeur longue et aléatoire. Ne jamais versionner ce secret. Activer `COOKIE_SECURE=true` sur HTTPS. Le mécanisme existant est un accès partagé de démonstration : les rôles nominatifs, la révocation et le téléversement restent à réaliser avant production.

## Catalogue et médias

Les neuf références de `lib/data.ts` sont des brouillons. `publicLands` sélectionne exclusivement les fiches `published`. Accueil, catalogue, métadonnées des fiches, liens profonds et formulaire de contact respectent cette sélection. Aucune fiche n’a été publiée par cette correction. Le catalogue vide invite à contacter l’agence.

Le logo officiel local est `public/ohana-home-logo.png`. Les photographies et portraits existants ont été conservés. Confirmer leurs autorisations avant publication ; les images générales ne sont pas automatiquement attribuées aux fiches terrain. Les galeries et plans des fiches nécessitent `mediaPublicationAllowed`. Les pièces internes ne doivent jamais être placées dans `public`.

## Formulaire et confidentialité

Les demandes sont enregistrées localement dans `data/ohana.json`. `OHANA_DATA_DIR` permet un répertoire persistant ou isolé pour les tests. Les tests utilisent un répertoire temporaire supprimé ensuite, des coordonnées fictives et aucun service externe.

Les notifications ne sont pas raccordées : le gestionnaire doit consulter les demandes. Le stockage JSON reste limité à une instance ; une base transactionnelle et une protection anti-abus globale sont nécessaires avant une ouverture en production. La validation serveur, le piège anti-robot, les doublons et une limite par contact sont présents. Aucun traceur publicitaire ni événement d’audience n’est collecté dans cette livraison.

## Vérifications

```bash
npm run build -- --webpack
npm run typecheck
npm run lint
npm test
```

Les six tests lancent eux-mêmes le serveur compilé sur le port 3027 et contrôlent les accès publics/privés, le fichier PNG, les deux brouillons Missolé PK30, le formulaire et les doublons. Libérer ce port avant le test.

La recette manuelle à terminer sur l’hébergement cible : logo décodé sur accueil/contact, menu et clavier à 360/768/1440 px, formulaire réussi/erreur réseau, absence de débordements et console sans erreur. Les vérifications de rendu dans le navigateur n’ont pas pu être menées dans l’environnement de correction : Chromium local refuse de démarrer (socket non autorisé) et le navigateur distant ne peut pas joindre le serveur local. Ne pas confondre tests HTTP réussis et validation visuelle complète.

## Avant mise en ligne

- Confirmer prix, disponibilité, superficies, médias et dossier public avant de publier une fiche.
- Valider le nom, la biographie, la vision et le mot du promoteur. Aucun texte personnel n’a été inventé.
- Compléter les mentions légales et la politique de confidentialité.
- Raccorder notifications, stockage persistant et authentification nominative.
- Vérifier l’éventuelle protection propre à l’hébergeur, qui n’a pas été modifiée ici.
- Établir le domaine canonique, l’indexation et le sitemap après validation ; cette recette reste `noindex` et son sitemap est vide.
