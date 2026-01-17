FROM oven/bun:1 AS build
WORKDIR /app

# Copy root and app package files
COPY package.json bun.lock ./
COPY apps/web/package.json apps/web/package.json

# Install dependencies
RUN bun install

# Copy source
COPY apps/web apps/web

# Build
WORKDIR /app/apps/web
RUN bun run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
