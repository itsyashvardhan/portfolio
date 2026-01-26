#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# SPECTRE - macOS Installation Script
# ═══════════════════════════════════════════════════════════════════════════════
set -e

REPO="itsyashvardhan/spectre"
LATEST_RELEASE_URL="https://api.github.com/repos/$REPO/releases/latest"

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Helpers
info() { echo -e "${CYAN}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ASCII Art
echo -e "${CYAN}"
echo "  ███████╗██████╗ ███████╗ ██████╗████████╗██████╗ ███████╗"
echo "  ██╔════╝██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔════╝"
echo "  ███████╗██████╔╝█████╗  ██║        ██║   ██████╔╝█████╗  "
echo "  ╚════██║██╔═══╝ ██╔══╝  ██║        ██║   ██╔══██╗██╔══╝  "
echo "  ███████║██║     ███████╗╚██████╗   ██║   ██║  ██║███████╗"
echo "  ╚══════╝╚═╝     ╚══════╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝"
echo -e "${NC}"
info "Installing SPECTRE for macOS"

# 1. Dependency Check
if ! command -v curl >/dev/null 2>&1; then
    error "curl is required but not installed."
fi

# 2. Detect Architecture
ARCH="$(uname -m)"
info "Detected Architecture: $ARCH"

# 3. Fetch Release Info
info "Fetching release information..."
RELEASE_DATA=$(curl -s "$LATEST_RELEASE_URL")
VERSION=$(echo "$RELEASE_DATA" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$VERSION" ]; then
    error "Could not fetch latest version. Check your connection or GitHub API limits."
fi
success "Found latest version: $VERSION"

# 4. Find macOS DMG asset
DOWNLOAD_URL=$(echo "$RELEASE_DATA" | grep '"browser_download_url":' | grep -E '\.dmg|macos' | head -n 1 | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$DOWNLOAD_URL" ]; then
    warn "No macOS DMG found in the latest release."
    warn "Please download manually from: https://github.com/$REPO/releases"
    exit 1
fi

info "Downloading macOS package..."
DOWNLOAD_PATH="$HOME/Downloads/Spectre_$VERSION.dmg"
curl -L -o "$DOWNLOAD_PATH" "$DOWNLOAD_URL"
success "Downloaded to: $DOWNLOAD_PATH"

# 5. Open the DMG
info "Opening DMG..."
open "$DOWNLOAD_PATH"

echo ""
success "Spectre $VERSION download complete!"
info "Drag Spectre to your Applications folder to complete installation."
info "After installation, run 'spectre' in your terminal."
