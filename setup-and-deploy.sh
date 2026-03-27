#!/usr/bin/env bash
# ============================================================
#  MCKI Solutions — One-Command Setup + Deploy to Cloud Run
#  No Docker required — uses Cloud Build (gcloud --source)
#  Intel Mac (x86_64) compatible
# ============================================================
set -euo pipefail

BOLD="\033[1m"; GREEN="\033[32m"; YELLOW="\033[33m"; RED="\033[31m"; CYAN="\033[36m"; RESET="\033[0m"
info()    { echo -e "${CYAN}[INFO]${RESET} $*"; }
success() { echo -e "${GREEN}[OK]${RESET}   $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET} $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*"; exit 1; }
step()    { echo -e "\n${BOLD}${CYAN}━━━ $* ━━━${RESET}"; }

REGION="europe-west2"
BACKEND_SERVICE="mcki-ai-navigator"
FRONTEND_SERVICE="mcki-frontend"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Step 1: Install gcloud CLI ─────────────────────────────
step "1 / 5 — Installing Google Cloud CLI"

if command -v gcloud &>/dev/null; then
  success "gcloud already installed: $(gcloud --version | head -1)"
else
  info "Downloading Google Cloud CLI for macOS x86_64…"
  cd /tmp
  curl -fsSL "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-darwin-x86_64.tar.gz" \
    -o gcloud-cli.tar.gz
  tar -xzf gcloud-cli.tar.gz
  info "Installing to ~/google-cloud-sdk (no sudo needed)…"
  ~/google-cloud-sdk/install.sh --quiet --path-update=true 2>/dev/null || \
  /tmp/google-cloud-sdk/install.sh --quiet --path-update=true

  # Add to current PATH for this session
  export PATH="$PATH:/tmp/google-cloud-sdk/bin:$HOME/google-cloud-sdk/bin"
  success "gcloud installed"
fi

# Ensure gcloud is on PATH for this script
export PATH="$PATH:/tmp/google-cloud-sdk/bin:$HOME/google-cloud-sdk/bin"
GCLOUD=$(command -v gcloud) || error "gcloud not found after install. Open a new terminal and re-run."

# ── Step 2: Authenticate ───────────────────────────────────
step "2 / 5 — Google Cloud Authentication"

ACCOUNT=$(gcloud auth list --filter="status=ACTIVE" --format="value(account)" 2>/dev/null | head -1)
if [ -n "$ACCOUNT" ]; then
  success "Already logged in as: $ACCOUNT"
else
  info "Opening browser for Google login…"
  gcloud auth login --launch-browser
fi

# ── Step 3: Set / detect project ──────────────────────────
step "3 / 5 — Google Cloud Project"

PROJECT_ID="${GCP_PROJECT_ID:-$(gcloud config get-value project 2>/dev/null)}"

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  echo ""
  echo -e "${BOLD}Your existing projects:${RESET}"
  gcloud projects list --format="table(projectId,name)" 2>/dev/null | head -20
  echo ""
  read -rp "Enter your GCP Project ID (from the list above): " PROJECT_ID
  [ -z "$PROJECT_ID" ] && error "Project ID is required."
fi

gcloud config set project "$PROJECT_ID" --quiet
success "Using project: ${BOLD}$PROJECT_ID${RESET}"

# ── Step 4: Enable required APIs ──────────────────────────
step "4 / 5 — Enabling Cloud APIs (one-time, ~30 sec)"

info "Enabling Cloud Run, Cloud Build, Artifact Registry…"
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  --project="$PROJECT_ID" --quiet
success "APIs enabled"

# ── Step 5: Deploy ─────────────────────────────────────────
step "5 / 5 — Deploying to Cloud Run (europe-west2)"
cd "$SCRIPT_DIR"

# ── 5a: Deploy Backend ─────────────────────────────────────
info "Deploying FastAPI backend (${BACKEND_SERVICE})…"
info "Cloud Build will compile your Python backend remotely — no Docker needed locally."

gcloud run deploy "$BACKEND_SERVICE" \
  --source "./backend" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --project "$PROJECT_ID" \
  --quiet

BACKEND_URL=$(gcloud run services describe "$BACKEND_SERVICE" \
  --region "$REGION" --format="value(status.url)" --project "$PROJECT_ID")
success "Backend live: ${BOLD}$BACKEND_URL${RESET}"

# ── 5b: Deploy Frontend ────────────────────────────────────
info "Deploying Next.js frontend (${FRONTEND_SERVICE})…"
info "Cloud Build will compile your Next.js app remotely — no Docker needed locally."

gcloud run deploy "$FRONTEND_SERVICE" \
  --source "." \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "NEXT_PUBLIC_API_URL=${BACKEND_URL}" \
  --project "$PROJECT_ID" \
  --quiet

FRONTEND_URL=$(gcloud run services describe "$FRONTEND_SERVICE" \
  --region "$REGION" --format="value(status.url)" --project "$PROJECT_ID")
success "Frontend live: ${BOLD}$FRONTEND_URL${RESET}"

# ── Summary ────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}╔════════════════════════════════════════════════╗${RESET}"
echo -e "${GREEN}${BOLD}║   MCKI Solutions — DEPLOYED SUCCESSFULLY       ║${RESET}"
echo -e "${GREEN}${BOLD}╚════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "  ${BOLD}Frontend:${RESET}  $FRONTEND_URL"
echo -e "  ${BOLD}Backend:${RESET}   $BACKEND_URL"
echo -e "  ${BOLD}Region:${RESET}    $REGION (UK South — GDPR)"
echo ""
echo -e "  ${BOLD}View logs:${RESET}"
echo -e "  gcloud run services logs read $FRONTEND_SERVICE --region $REGION"
echo ""
echo -e "  ${BOLD}Next step — map your custom domain:${RESET}"
echo -e "  gcloud run domain-mappings create \\"
echo -e "    --service $FRONTEND_SERVICE \\"
echo -e "    --domain mckisolutions.co.uk \\"
echo -e "    --region $REGION"
echo ""
