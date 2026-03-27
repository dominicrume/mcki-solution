#!/usr/bin/env bash
# =============================================================================
# MCKI Solutions — Production Deploy Script
# Builds Docker images, pushes to Artifact Registry, deploys to Cloud Run
# Region: europe-west2 (UK South) — GDPR compliant
#
# Usage:
#   ./deploy.sh                  # deploy both frontend + backend
#   ./deploy.sh --backend-only   # deploy FastAPI only
#   ./deploy.sh --frontend-only  # deploy Next.js only
#   ./deploy.sh --dry-run        # print commands without executing
# =============================================================================

set -euo pipefail  # exit on error, unset vars, pipe failures

# ── Colour helpers ────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${BLUE}[INFO]${RESET}  $*"; }
success() { echo -e "${GREEN}[OK]${RESET}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; exit 1; }
banner()  { echo -e "\n${BOLD}${BLUE}══════════════════════════════════════${RESET}"; \
            echo -e "${BOLD}${BLUE}  $*${RESET}"; \
            echo -e "${BOLD}${BLUE}══════════════════════════════════════${RESET}\n"; }

# ── Configuration — edit these for your project ───────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-}"                  # or hardcode: "your-project-id"
REGION="europe-west2"                             # UK South — GDPR compliant
REPO_NAME="mcki"                                  # Artifact Registry repo name
REGISTRY="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}"

BACKEND_SERVICE="mcki-ai-navigator"
FRONTEND_SERVICE="mcki-frontend"

BACKEND_IMAGE="${REGISTRY}/ai-navigator"
FRONTEND_IMAGE="${REGISTRY}/frontend"

# Cloud Run runtime settings
BACKEND_MEMORY="512Mi"
BACKEND_CPU="1"
BACKEND_MIN_INSTANCES="0"
BACKEND_MAX_INSTANCES="10"

FRONTEND_MEMORY="1Gi"
FRONTEND_CPU="1"
FRONTEND_MIN_INSTANCES="0"
FRONTEND_MAX_INSTANCES="5"

# ── Argument parsing ──────────────────────────────────────────────────────────
DEPLOY_BACKEND=true
DEPLOY_FRONTEND=true
DRY_RUN=false

for arg in "$@"; do
  case $arg in
    --backend-only)  DEPLOY_FRONTEND=false ;;
    --frontend-only) DEPLOY_BACKEND=false ;;
    --dry-run)       DRY_RUN=true; warn "DRY RUN — commands will be printed, not executed." ;;
    *) error "Unknown argument: $arg. Use --backend-only | --frontend-only | --dry-run" ;;
  esac
done

# Wrap commands for dry-run mode
run() {
  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}  \$${RESET} $*"
  else
    eval "$@"
  fi
}

# ── Pre-flight checks ─────────────────────────────────────────────────────────
banner "MCKI Solutions — Cloud Run Deploy"
info "Region:  ${REGION}"
info "Project: ${PROJECT_ID:-<not set>}"
info "Registry: ${REGISTRY}"
echo ""

# 1. GCP_PROJECT_ID must be set
if [ -z "${PROJECT_ID}" ]; then
  error "GCP_PROJECT_ID environment variable is not set.\n\n  Export it first:\n    export GCP_PROJECT_ID=your-project-id\n  Then re-run this script."
fi

# 2. gcloud must be installed
if ! command -v gcloud &>/dev/null; then
  error "gcloud CLI not found. Install it from: https://cloud.google.com/sdk/docs/install"
fi

# 3. docker must be installed
if ! command -v docker &>/dev/null; then
  error "Docker not found. Install Docker Desktop from: https://www.docker.com/products/docker-desktop"
fi

# 4. Must be authenticated
ACTIVE_ACCOUNT=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null || true)
if [ -z "${ACTIVE_ACCOUNT}" ]; then
  error "Not logged in to gcloud. Run: gcloud auth login"
fi
success "Authenticated as: ${ACTIVE_ACCOUNT}"

# 5. Set project
run gcloud config set project "${PROJECT_ID}" --quiet

# ── Build timestamp (used as image tag) ───────────────────────────────────────
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "nogit")
IMAGE_TAG="${TIMESTAMP}-${GIT_SHA}"
info "Image tag: ${IMAGE_TAG}"

# ── Ensure Artifact Registry repo exists ─────────────────────────────────────
banner "Artifact Registry"
info "Ensuring repository '${REPO_NAME}' exists in ${REGION}…"

if ! gcloud artifacts repositories describe "${REPO_NAME}" \
     --location="${REGION}" --project="${PROJECT_ID}" &>/dev/null; then
  info "Repository not found — creating it now…"
  run gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --description="MCKI Solutions Docker images" \
    --project="${PROJECT_ID}"
  success "Repository created."
else
  success "Repository already exists."
fi

# Configure Docker to use gcloud credentials for this registry
run gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

# ─────────────────────────────────────────────────────────────────────────────
# BACKEND — FastAPI AI Navigator
# ─────────────────────────────────────────────────────────────────────────────
if [ "$DEPLOY_BACKEND" = true ]; then
  banner "Backend — FastAPI AI Navigator"

  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  BACKEND_DIR="${SCRIPT_DIR}/backend"

  if [ ! -f "${BACKEND_DIR}/Dockerfile" ]; then
    error "backend/Dockerfile not found at: ${BACKEND_DIR}/Dockerfile"
  fi

  # ── Build ──
  info "Building backend image…"
  run docker build \
    --platform linux/amd64 \
    --tag "${BACKEND_IMAGE}:${IMAGE_TAG}" \
    --tag "${BACKEND_IMAGE}:latest" \
    --file "${BACKEND_DIR}/Dockerfile" \
    "${BACKEND_DIR}"
  success "Backend image built: ${BACKEND_IMAGE}:${IMAGE_TAG}"

  # ── Push ──
  info "Pushing backend image to Artifact Registry…"
  run docker push "${BACKEND_IMAGE}:${IMAGE_TAG}"
  run docker push "${BACKEND_IMAGE}:latest"
  success "Backend image pushed."

  # ── Deploy to Cloud Run ──
  info "Deploying backend to Cloud Run (${REGION})…"
  run gcloud run deploy "${BACKEND_SERVICE}" \
    --image "${BACKEND_IMAGE}:${IMAGE_TAG}" \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --memory "${BACKEND_MEMORY}" \
    --cpu "${BACKEND_CPU}" \
    --min-instances "${BACKEND_MIN_INSTANCES}" \
    --max-instances "${BACKEND_MAX_INSTANCES}" \
    --set-secrets "OPENAI_API_KEY=OPENAI_API_KEY:latest" \
    --set-env-vars "ENVIRONMENT=production,ALLOWED_ORIGINS=https://mckisolutions.com" \
    --project "${PROJECT_ID}" \
    --quiet

  # ── Capture backend URL for frontend build ──
  BACKEND_URL=$(gcloud run services describe "${BACKEND_SERVICE}" \
    --region "${REGION}" \
    --project "${PROJECT_ID}" \
    --format "value(status.url)" 2>/dev/null || true)

  if [ -n "${BACKEND_URL}" ]; then
    success "Backend live at: ${BACKEND_URL}"
    export NEXT_PUBLIC_API_URL="${BACKEND_URL}"
  else
    warn "Could not retrieve backend URL automatically. Set NEXT_PUBLIC_API_URL manually before deploying frontend."
  fi
fi

# ─────────────────────────────────────────────────────────────────────────────
# FRONTEND — Next.js
# ─────────────────────────────────────────────────────────────────────────────
if [ "$DEPLOY_FRONTEND" = true ]; then
  banner "Frontend — Next.js"

  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

  if [ ! -f "${SCRIPT_DIR}/Dockerfile" ]; then
    error "Frontend Dockerfile not found at: ${SCRIPT_DIR}/Dockerfile"
  fi

  # Require public env vars for the Next.js build
  SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
  SUPABASE_ANON="${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}"
  API_URL="${NEXT_PUBLIC_API_URL:-}"

  if [ -z "${SUPABASE_URL}" ] || [ -z "${SUPABASE_ANON}" ]; then
    warn "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set."
    warn "The build will proceed but Supabase features will be disabled."
  fi

  if [ -z "${API_URL}" ]; then
    warn "NEXT_PUBLIC_API_URL is not set — AI Navigator will use local fallback logic."
  fi

  # ── Build ──
  info "Building frontend image…"
  run docker build \
    --platform linux/amd64 \
    --tag "${FRONTEND_IMAGE}:${IMAGE_TAG}" \
    --tag "${FRONTEND_IMAGE}:latest" \
    --file "${SCRIPT_DIR}/Dockerfile" \
    --build-arg "NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}" \
    --build-arg "NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON}" \
    --build-arg "NEXT_PUBLIC_API_URL=${API_URL}" \
    "${SCRIPT_DIR}"
  success "Frontend image built: ${FRONTEND_IMAGE}:${IMAGE_TAG}"

  # ── Push ──
  info "Pushing frontend image to Artifact Registry…"
  run docker push "${FRONTEND_IMAGE}:${IMAGE_TAG}"
  run docker push "${FRONTEND_IMAGE}:latest"
  success "Frontend image pushed."

  # ── Deploy to Cloud Run ──
  info "Deploying frontend to Cloud Run (${REGION})…"
  run gcloud run deploy "${FRONTEND_SERVICE}" \
    --image "${FRONTEND_IMAGE}:${IMAGE_TAG}" \
    --region "${REGION}" \
    --platform managed \
    --allow-unauthenticated \
    --memory "${FRONTEND_MEMORY}" \
    --cpu "${FRONTEND_CPU}" \
    --min-instances "${FRONTEND_MIN_INSTANCES}" \
    --max-instances "${FRONTEND_MAX_INSTANCES}" \
    --set-secrets "SUPABASE_SERVICE_ROLE_KEY=SUPABASE_SERVICE_ROLE_KEY:latest" \
    --set-env-vars "NODE_ENV=production,NEXT_PUBLIC_API_URL=${API_URL},NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL},NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON}" \
    --project "${PROJECT_ID}" \
    --quiet

  FRONTEND_URL=$(gcloud run services describe "${FRONTEND_SERVICE}" \
    --region "${REGION}" \
    --project "${PROJECT_ID}" \
    --format "value(status.url)" 2>/dev/null || true)

  if [ -n "${FRONTEND_URL}" ]; then
    success "Frontend live at: ${FRONTEND_URL}"
  fi
fi

# ── Summary ───────────────────────────────────────────────────────────────────
banner "Deploy Complete"
echo -e "  ${BOLD}Image Tag:${RESET}  ${IMAGE_TAG}"
[ "$DEPLOY_BACKEND"  = true ] && echo -e "  ${BOLD}Backend:${RESET}    ${BACKEND_URL:-run: gcloud run services describe ${BACKEND_SERVICE} --region ${REGION}}"
[ "$DEPLOY_FRONTEND" = true ] && echo -e "  ${BOLD}Frontend:${RESET}   ${FRONTEND_URL:-run: gcloud run services describe ${FRONTEND_SERVICE} --region ${REGION}}"
echo ""
echo -e "  Verify health:  ${BOLD}curl \${BACKEND_URL}/health${RESET}"
echo -e "  View logs:      ${BOLD}gcloud run services logs read ${BACKEND_SERVICE} --region ${REGION}${RESET}"
echo ""
