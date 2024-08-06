FROM node:18-alpine

WORKDIR /paymentdev/client

COPY package*.json ./

COPY . .

RUN npm install

RUN npm start

EXPOSE 3001