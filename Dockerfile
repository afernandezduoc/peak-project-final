# Etapa de compilación
FROM node:20.15.1 AS peak-project

WORKDIR /app

COPY package.json package.json

RUN npm install

# Etapa 2
FROM node:20.15.1 AS builder

WORKDIR /app
COPY --from=peak-project /app/node_modules ./node_modules
COPY . . 

RUN npm run build

#Etapa de producción
FROM node:20.15.1 AS prod
EXPOSE 80

COPY --from=builder /app/dist/peak-project-final/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]