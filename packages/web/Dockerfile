FROM node:18-alpine

WORKDIR /app

COPY public ./public
COPY next.config.js ./next.config.js

COPY .next/standalone .
COPY .next/static ./.next/static

RUN npm install --omit=dev

VOLUME [ "/app/.next" ]

CMD ["node", "server.js"]
