FROM oven/bun:latest

WORKDIR /app

COPY package.json ./

RUN bun install

COPY src/ ./src/
COPY resources/ ./resources/

EXPOSE 4001

CMD ["bun", "run", "src/index.ts"]
