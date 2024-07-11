FROM node:22-alpine

RUN apk --update add --no-cache bash

# RUN set -ex && apk --no-cache add sudo

RUN npm install -g @angular/cli@18.0.7

USER node

WORKDIR /home/node/app

RUN chmod -R u+rwx .

COPY . .
