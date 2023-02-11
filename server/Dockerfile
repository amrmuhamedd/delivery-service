FROM node:14.14.0-alpine As development
WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

