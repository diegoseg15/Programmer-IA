# Stage 1: Crear el build
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run produ

### Stage 2: Levantar el servidor
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
ADD ./config/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
