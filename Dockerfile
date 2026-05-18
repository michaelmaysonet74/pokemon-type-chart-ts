FROM node:25-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY src/ ./src/
COPY resources/ ./resources/

EXPOSE 4001

CMD ["npx", "tsx", "src/index.ts"]
