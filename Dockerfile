FROM node:18-alpine AS builder
WORKDIR /app

# Copy static files FIRST
COPY public/ public/
COPY src/ src/
COPY package*.json ./
COPY styles.css ./
COPY vite.config.js ./
COPY index.html .
COPY .env .env

RUN npm install
RUN npm run build

FROM nginx:alpine

# Copy ONLY the built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
