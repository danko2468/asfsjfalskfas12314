FROM node:18-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --omit=dev

COPY dist dist

CMD ["npm", "start"]
