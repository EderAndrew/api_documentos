FROM node:alpine AS builder
WORKDIR /user/app
# para garantir que os pacotes sejam copiados.
COPY package*.json ./
COPY prisma ./prisma/
# instala todas as dependências
RUN yarn install
COPY . .
RUN yarn run build

FROM node:alpine

COPY --from=builder /user/app/node_modules ./node_modules
COPY --from=builder /user/app/package*.json ./
COPY --from=builder /user/app/dist ./dist
COPY --from=builder /user/app/prisma ./prisma

EXPOSE 4000
# inicia uma nova migration e executa o servidor
CMD ["yarn", "run", "start:migrate:prod"]
