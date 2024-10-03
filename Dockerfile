FROM node:14 as build-stage

WORKDIR /news-aggregator/

COPY public/ /news-aggregator/public
COPY src/ /news-aggregator/src
COPY package*.json ./

RUN npm install

CMD ["npm", "start"]