# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Run stage ----
FROM nginx:alpine

# If your build output folder is different, change this line
# Common outputs:
# Vite/React: dist
# Astro: dist
# Gatsby: public
# Next static export: out
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]