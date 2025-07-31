FROM node:22-alpine

ENV REACT_APP_API_URL=http://localhost:5500

WORKDIR /app

# Installer pnpm globalement
RUN npm install -g pnpm

# Copier les fichiers package.json et pnpm-lock.yaml (si vous utilisez pnpm)
COPY package*.json pnpm-lock.yaml* ./

# Installer les dépendances avec pnpm
RUN pnpm install --frozen-lockfile

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN pnpm run build

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["pnpm", "start"]
