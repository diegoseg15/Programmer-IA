# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist/tu-nombre-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
