FROM node:18-alpine

WORKDIR /paymentdev/client

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000