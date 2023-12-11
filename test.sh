#!/bin/bash
npm install jest
cd match_manager && npm install && npm test
echo "Match Manager tests Done" && rm -rf node_modules && cd ..
cd my-express-api && npm install && npm test
echo "My Express API tests Done"  && rm -rf node_modules && cd ..
cd notifyer && npm install && npm test
echo "Notifyer tests passed" && rm -rf node_modules && cd ..