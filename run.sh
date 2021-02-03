#!/bin/bash
cd ./frontend
npm i
ng build --prod
mv ./dist/to-do-list ../backend/dist
cd ../backend
touch .env
echo "URL_MONGO=mongodb://localhost:27017/to-do-list" >> .env | echo "BCRYPT_SALT_ROUNDS=12" >> .env | echo "JWT_TOKEN=!#!k5&&/a446gJHF" >> .env
npm install
npm start