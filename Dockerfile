FROM oven/bun:1-alpine
WORKDIR /usr/src/app

COPY . .
RUN bun install

WORKDIR /app/packages/bot
ENV PORT=3000
USER bun
ENTRYPOINT [ "bun", "start" ]
