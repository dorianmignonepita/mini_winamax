# Docker compose service's description and name:

# Un service permettant d’envoyer des notifications à un user sur ses matchs favoris pour chaque début / fin de match / changement de score Un log avec le type de notification, la lite de user destinataires et le texte suffisent
notifyer

# Un service qui gère l’état d’un match ainsi que ses changements Vous ferez arriver ces changements via un pub/sub redis
match_manager_service

# Database Mysql
mysqldb

# Express API
backend_api

# Redis Pub/Sub
redis



# How To Start

The Notifyer checks the status of all the matches every 30 seconds if a match begins/ends or get a new score, the users who have this match
in their favorite matches will be notified.

The database is setup so we have 4 matches that will start the very moment you start the services.

in order to start the services you just need to use the command:
1. make up

if you can't use "make up" for some reason you can just use the command: "docker compose up" 



# The API URL:

# API renvoyant à l’utilisateur l’ensemble des matchs disponibles à la prise de paris (en gros tous les matchs non terminés)
GET
http://localhost:8080/matches/available


# Une API permettant à un user d’ajouter / retirer un match de ses favoris
POST
body: {
    "matchID": number
}
http://localhost:8080/users/userId:int/favorites


DELETE
http://localhost:8080/users/userId:int/favorites/favoriteId:int

# Une API permettant de rejouer chaque événement qui a eu lieu sur un match donné
GET
http://localhost:8080/matches/matchId:int/events
