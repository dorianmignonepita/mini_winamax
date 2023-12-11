#!/bin/bash

cd match_manager && npm test
echo "Match Manager tests Done" && cd ..
cd my-express-api && npm test
echo "My Express API tests Done"  && cd ..
cd notifyer && npm test
echo "Notifyer tests passed" && cd ..