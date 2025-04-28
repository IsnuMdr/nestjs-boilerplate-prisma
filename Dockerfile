FROM node:lts-slim AS builder

LABEL org.opencontainers.image.source=https://github.com/IsnuMdr/nestjs-prisma-boilerplate
LABEL maintainer="Isnu Mdr <isnu.mdr@gmail.com>"
LABEL description="Nest JS Prisma Boilerplate - A boilerplate for NestJS with Prisma ORM"

WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

CMD [ "node", "dist/src/main"]