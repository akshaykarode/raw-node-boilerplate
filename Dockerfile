FROM node:10.13.0-alpine
ARG NODE_ENV=development

ENV NODE_ENV=$NODE_ENV

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
