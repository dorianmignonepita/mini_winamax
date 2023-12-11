# Docker compose service's description and name:

UN SERVICE PERMETTANT D’ENVOYER DES NOTIFICATIONS À UN USER SUR SES MATCHS FAVORIS POUR CHAQUE DÉBUT / FIN DE MATCH / CHANGEMENT DE SCORE UN LOG AVEC LE TYPE DE NOTIFICATION, LA LITE DE USER DESTINATAIRES ET LE TEXTE SUFFISENT
`notifyer`

UN SERVICE QUI GÈRE L’ÉTAT D’UN MATCH AINSI QUE SES CHANGEMENTS VOUS FEREZ ARRIVER CES CHANGEMENTS VIA UN PUB/SUB REDIS
`match_manager_service`

DATABASE MYSQL
`mysqldb`

EXPRESS API
`backend_api`

REDIS PUB/SUB
`redis`



# How To Start

The Notifyer checks the status of all the matches every 30 seconds if a match begins/ends or get a new score, the users who have this match
in their favorite matches will be notified. The LIVE match's events are generated randomly(new-score/no-new-score) every 30 seconds.

The database is setup so we have 4 matches that will start the very moment you start the services.

In order to start the services you just need to use the command:
1. make up

if you can't use "make up" for some reason you can just use the command: "docker compose up" 



# The API URL:

API RENVOYANT À L’UTILISATEUR L’ENSEMBLE DES MATCHS DISPONIBLES À LA PRISE DE PARIS (EN GROS TOUS LES MATCHS NON TERMINÉS)
GET
http://localhost:8080/matches/available


UNE API PERMETTANT À UN USER D’AJOUTER / RETIRER UN MATCH DE SES FAVORIS
POST
body: {
    "matchID": number
}
http://localhost:8080/users/userId:int/favorites


DELETE
http://localhost:8080/users/userId:int/favorites/favoriteId:int

UNE API PERMETTANT DE REJOUER CHAQUE ÉVÉNEMENT QUI A EU LIEU SUR UN MATCH DONNÉ
GET
http://localhost:8080/matches/matchId:int/events
