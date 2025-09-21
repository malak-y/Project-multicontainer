# Stage 1: Build React app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .
RUN npm run build
FROM nginx:alpine

RUN apk --no-cache add curl

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
