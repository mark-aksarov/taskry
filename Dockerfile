# ============================================
# Stage 1: Install deps (cached)
# ============================================

FROM node:24.14.0-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ============================================
# Stage 2: Build
# ============================================

FROM node:24.14.0-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

# ============================================
# Stage 3: Runner (minimal)
# ============================================

FROM node:24.14.0-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# app only (NO node_modules copy!)
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]