# =============================================================================
# MCKI Solutions — FastAPI AI Career Navigator Backend
# Multi-stage Docker build optimised for Google Cloud Run (europe-west2)
# Python 3.12 — prebuilt pydantic-core wheels, no Rust build required
# =============================================================================

# ── Stage 1: Build wheels ─────────────────────────────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /app

# Install build tools only in this stage (not in final image)
RUN apt-get update \
 && apt-get install -y --no-install-recommends gcc \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Build all wheels into a local directory for clean copy into runner
RUN pip install --no-cache-dir --upgrade pip \
 && pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# ── Stage 2: Runtime (minimal image) ──────────────────────────────────────────
FROM python:3.12-slim AS runner

WORKDIR /app

# Install wheels from builder — no compiler toolchain in final image
COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links=/wheels /wheels/*.whl \
 && rm -rf /wheels

# Copy application code only (never copy .venv, .env, __pycache__)
COPY main.py .

# Security: non-root user
RUN addgroup --system mcki \
 && adduser  --system --ingroup mcki mcki \
 && chown -R mcki:mcki /app
USER mcki

# Cloud Run injects $PORT automatically — never hardcode it
# Default 8080 is Cloud Run's expected port when $PORT is not set
EXPOSE 8080

# Runs 2 worker processes; Cloud Run scales instances horizontally
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080} --workers 2 --log-level info"]
