FROM node:23-alpine as base

WORKDIR /app

RUN npm install -g npm@11.3.0

RUN npm init -y

FROM base as build

COPY package.json package-lock.json ./

RUN npm i

COPY . ./

RUN npm run generate

RUN npm run build

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

