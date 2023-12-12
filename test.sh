#!/bin/bash
docker exec mini_winamax-notifyer-1 bash -c 'npm test'
docker exec mini_winamax-match_manager_service-1 bash -c 'npm test'
docker exec mini_winamax-backend_api-1 bash -c 'npm test'