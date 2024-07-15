FROM node:18-alpine

# Create app directory

COPY package*.json ./
RUN npm install

WORKDIR /usr/app