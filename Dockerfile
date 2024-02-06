FROM node:21-alpine3.18 as build

WORKDIR /app

# Copier les fichiers de votre application Angular dans le conteneur
RUN echo "Copie des fichiers de l'application Angular dans le conteneur..."
COPY . .

# Installation d'Angular CLI et construction de l'application
RUN echo "Installation des dépendances et construction de l'application Angular..."
RUN npm install -g @angular/cli && \
    npm install && \
    ng build --configuration=production



FROM nginx:alpine

# Copie des fichiers construits dans nginx
RUN echo "Copie des fichiers construits dans nginx..."
COPY --from=build /app/dist /share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancement du conteneur
CMD ["nginx", "-g", "daemon off;"]
