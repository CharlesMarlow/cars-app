#!/usr/bin/env bash

cd apiserver || exit
node server.js &
echo 'Server components are up and running'
echo 'Please wait for server'
sleep 5s
cd ../server
node index.js & 

echo 'Starting web app'

cd ../ || exit
echo 'Installing client dependencies'
npm install
npm start
echo 'App is up and running';