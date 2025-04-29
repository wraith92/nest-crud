# Étape de construction
FROM node:18-alpine AS builder

WORKDIR /app

# Installation explicite de npm (nécessaire sur alpine)
RUN apk add --no-cache npm

# D'abord copier les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (y compris devDependencies pour la construction)
RUN npm install

# Puis copier le reste du code
COPY . .

# Vérification que le script build existe
RUN npm ls --depth=0 && \
    npm run build --if-present || echo "Build script not found"

# Étape d'exécution
FROM node:18-alpine

WORKDIR /app

# Installation de npm pour l'image finale
RUN apk add --no-cache npm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV PORT=10000

EXPOSE 10000

CMD ["node", "dist/main.js"]