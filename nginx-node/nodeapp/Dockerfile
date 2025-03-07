# Etapa de construção
FROM node:20.9.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copia o código fonte
COPY . .

# Etapa final - Utilizando Node.js Alpine para reduzir o tamanho da imagem
FROM node:20.9.0-alpine
WORKDIR /app

# Copia apenas os arquivos necessários da build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/index.js .

EXPOSE 3000
CMD ["node", "index.js"]
