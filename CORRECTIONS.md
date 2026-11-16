# Livraison du 16 novembre 2026

Source : kmjdigitalprime/ohana-home-sci, commit bb668def728d2b96114fdbd789300d83a36aa0f7. Branche : fix/public-site-logo-design. L’ancienne archive OHANA_HOME_SCI_V1_Corrigee.zip n’a pas été utilisée comme source.

## Causes

`proxy.ts` imposait PREVIEW_ACCESS_PASSWORD sur presque toutes les routes et sur /ohana-home-logo.png. La requête d’image était donc redirigée vers /apercu, qui rendait du HTML. Sans variable en production, ce même proxy renvoyait 503. L’image PNG locale est valide et a été conservée.

## Modifications

- Proxy limité à /admin et /api/admin, contrôles de session conservés ; ancien accès aperçu redirigé.
- Logo compact, proportions conservées, grand cadre et ombre supprimés ; bandeau privé retiré.
- Accueil existant préservé, carrousel manuel, état utile sans annonces validées.
- Catalogue : sélection des seuls éléments publiés, tri par localité/prix, filtres partageables, résultat vide orienté vers le contact.
- Fiches : exclusion des brouillons, galerie et plans sous autorisation, superficie et total uniquement si renseignés.
- Réalisations : état explicite sans projet publié, distinction des vues de terrain et des références livrées.
- Agence : méthode en étapes. Promoteur : espace éditorial en attente de contenus approuvés, portraits existants conservés.
- Diaspora : fuseau Douala UTC+1 et contacts distingués.
- Contact : formulaire plus court, détails facultatifs repliables, liens directs, blocage des doubles clics ; référence de formulaire conservée avant await pour éviter l’erreur après un enregistrement réussi.
- FAQ, mentions, confidentialité et 404 ajoutées ; liens de pied de page, accès clavier et mouvement réduit.

## Validation et limites

Build, typecheck, lint et six tests (HTTP et bundles publics) sur la version compilée réussis. PNG servi avec le bon type MIME et sa signature binaire. Les deux offres Missolé PK30 sont toujours distinctes et non publiques. Formulaire testé uniquement avec données fictives dans un stockage temporaire. Aucun déploiement ni message à l’agence.

Rendu et décodage du logo dans un navigateur : non vérifiés, lancement Chromium bloqué par l’environnement. Dimensions mobiles et parcours interactif restent à contrôler selon le README. Le catalogue est aussi isolé côté serveur pour empêcher la transmission des brouillons dans les scripts du navigateur ; les pièces internes et coordonnées non autorisées ne sont pas transmises au composant de carte.

Aucune URL hébergée n’a été fournie ; aucun changement Hostinger effectué.
