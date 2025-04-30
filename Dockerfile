# * Stage 1: Build the Angular app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --configuration=production

# * Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist/get-foxy/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf
