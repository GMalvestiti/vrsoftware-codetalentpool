FROM node:22-alpine

RUN apk add --no-cache bash

RUN npm i -g npm@10.8.2

RUN npm i -g @nestjs/cli

ENV NODE_ENV=development

USER node

WORKDIR /home/node/app

RUN chmod -R u+rwx .

COPY . .