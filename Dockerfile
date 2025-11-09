# --- base ---
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=development
# For Prisma binary & OpenSSL in alpine
RUN apk add --no-cache openssl

# --- deps ---
FROM base AS deps
COPY package*.json ./
RUN npm ci

# --- dev (hot reload) ---
FROM base AS dev
COPY --from=deps /app/node_modules node_modules
COPY . .
# Keep dev-only deps; run vite/sveltekit dev in compose
EXPOSE 5173 3000
# Avoid root when you want: adduser -D app && chown -R app:app /app && USER app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# --- build ---
FROM base AS build
ENV NODE_ENV=production
COPY --from=deps /app/node_modules node_modules
COPY . .
# Make sure you’re using @sveltejs/adapter-node
RUN npm run build && npm prune --production

# --- prod runtime ---
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl
COPY --from=build /app/build build
COPY --from=build /app/node_modules node_modules
COPY package*.json ./
# Prisma needs schema at runtime to know datasource (optional but handy)
COPY prisma prisma
EXPOSE 3000
CMD ["node", "build/index.js"]
