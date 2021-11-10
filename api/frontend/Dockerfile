FROM node:16-alpine3.12
WORKDIR /frontend/

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
