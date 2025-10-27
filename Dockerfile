# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies including dev dependencies for build
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY drizzle.config.ts ./
COPY init-db.sh ./

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init and postgresql-client for proper signal handling and DB checks
RUN apk add --no-cache dumb-init postgresql-client

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies for migrations
RUN npm ci && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/init-db.sh ./init-db.sh
RUN chmod +x ./init-db.sh

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "-e", "import('./dist/src/app.js').then(m => m.start())"]
