FROM oven/bun:1 AS base
WORKDIR /app

# Copy root and app package files
COPY package.json bun.lock ./
COPY apps/api/package.json apps/api/package.json

# Install dependencies (including workspace)
RUN bun install

# Copy source code
COPY apps/api apps/api

# Generate Prisma Client
WORKDIR /app/apps/api
RUN bun x prisma generate

# Expose port
EXPOSE 3000

# Start command
CMD ["bun", "run", "src/index.ts"]
