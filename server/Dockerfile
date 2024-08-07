FROM node:18

WORKDIR /paymentdev/server

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 8080
