FROM node:14.14.0-alpine As development
WORKDIR /dashboard
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm" , "run" , "start" ]