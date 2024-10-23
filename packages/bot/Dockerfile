FROM oven/bun:1-alpine AS base
WORKDIR /app

COPY . .
RUN bun install

ENV PORT=3000
USER bun
ENTRYPOINT [ "bun", "start" ]
