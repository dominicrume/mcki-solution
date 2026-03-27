# =============================================================================
# MCKI Solutions — Next.js Frontend
# Multi-stage Docker build optimised for Google Cloud Run
# Requires: output: "standalone" in next.config.mjs  ✓
# =============================================================================

# ── Stage 1: Install dependencies ────────────────────────────────────────────
FROM node:20-alpine AS deps

# libc6-compat needed for some native Node modules on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only the lockfile + manifest first (maximises layer cache)
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# ── Stage 2: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Re-copy all node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (public only — never put secrets here)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 3: Runtime (minimal image) ─────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Security: non-root user
RUN addgroup --system --gid 1001 mcki \
 && adduser  --system --uid 1001 mcki

# Copy only the standalone build output — no node_modules, no source
COPY --from=builder --chown=mcki:mcki /app/.next/standalone ./
COPY --from=builder --chown=mcki:mcki /app/.next/static    ./.next/static
COPY --from=builder --chown=mcki:mcki /app/public          ./public

USER mcki

# Cloud Run injects $PORT at runtime. Next.js standalone reads it automatically.
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
