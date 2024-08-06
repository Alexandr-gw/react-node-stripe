FROM node:18

WORKDIR /paymentdev/server

COPY package*.json ./

RUN npm install --production

RUN npm install

RUN npm start

EXPOSE 8081
