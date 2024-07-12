#!/bin/bash

# tail -f /dev/null

# npm dedupe

RUN npm i -g npm@10.8.2

npm install --legacy-peer-deps

npm run start:debug