# Étape de construction - Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Installation des dépendances (couche séparée pour meilleur caching)
COPY package*.json ./
RUN npm install --production --silent

# Construction de l'application
COPY . .
RUN npm run build

# Étape d'exécution finale
FROM node:18-alpine

WORKDIR /app

# Copie optimisée depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Variables d'environnement (utiliser Render Dashboard pour les vraies valeurs)
ENV NODE_ENV=production
ENV PORT=10000 

# Health Check spécifique pour Render
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/health || exit 1

EXPOSE 10000

CMD ["node", "dist/main.js"]