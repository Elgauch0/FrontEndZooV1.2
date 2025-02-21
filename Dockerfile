FROM nginx:alpine

# Copier les fichiers de build dans le répertoire de nginx
COPY dist/ /usr/share/nginx/html/

# Configurer nginx pour écouter sur le port 3000 (par exemple)
RUN sed -i 's/listen\s*80;/listen 3000;/g' /etc/nginx/conf.d/default.conf

# Exposer le port 3000
EXPOSE 3000