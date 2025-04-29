# Étape de construction
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Installer les dépendances système pour Prisma
RUN apk add --no-cache git python3 make g++ openssl

# 2. Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY prisma/schema.prisma ./prisma/

# 3. Installer les dépendances
RUN npm install --include=dev

# 4. Générer le client Prisma
RUN npx prisma generate

# 5. Copier le reste du code
COPY . .

# 6. Builder l'application
RUN npm run build

# Étape de production
FROM node:18-alpine

WORKDIR /app

# 1. Dépendances runtime pour Prisma
RUN apk add --no-cache openssl

# 2. Copier les artefacts de construction
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# 3. Régénérer le client Prisma pour l'environnement de production
RUN npx prisma generate

# 4. Configuration Render.com
ENV NODE_ENV=production
ENV PORT=10000
ENV DATABASE_URL=${DATABASE_URL}

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

EXPOSE 10000

CMD ["node", "dist/main.js"]