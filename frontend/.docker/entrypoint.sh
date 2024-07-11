#!/bin/bash

rm -rf ./dist

# npm cache clean --force
npm cache verify
npm install --legacy-peer-deps
npm dedupe
npm start
