FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci

FROM base AS dev
COPY . .
EXPOSE 5173 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]