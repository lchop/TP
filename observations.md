# Retour sur ton TP

Bon travail dans l'ensemble. Tu as bien répondu à l'énoncé tout en mettant en place l'architecture demandée et en ajoutant tes templates dans un dossier dédié et ta configuration 'dotenv'.

## Côté serveur
Tout est ok ! Le routage est bon, on peut accéder à toutes les pages via les différentes routes. Les redirections se font avec un temps de retard (l'ajout d'un étudiant s'affiche après un rafraîchissement de page ou après un second ajout). Il doit y avoir un souci dans l'enchaînement des requêtes côté serveur avec la méthode "POST".

Une autre solution aurait été d'ajouter des ID aux étudiants afin de les supprimer via une requête GET vers une route dédiée à la suppression. Je t'invite à aller consulter ma correction sur le dépôt du cours.

## Côté modules locaux
Ton fichier utils.js est vide. Tu aurais pu importer le module tiers 'dayjs' et déclarer ta fonction ```formatDate()``` à l'intérieur au lieu de le faire dans ton fichier server.js.
En l'état, tu respectes la structure demandée par l'énoncé, mais pas la séparation entre les codes métiers.

## Côté template
C'est parfait sur l'utilisation du moteur de template Pug. Toutes tes vues s'affichent correctement et elles prennent bien compte les données.

# Note : 16/20