#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# SPECTRE - Linux Installation Script
# ═══════════════════════════════════════════════════════════════════════════════
set -e

REPO="itsyashvardhan/spectre"
DEB_URL="https://github.com/itsyashvardhan/spectre/releases/download/1.0.1/spectre_1.0.1_all.deb"

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
info "Installing SPECTRE for Linux"

# 1. Dependency Check
if ! command -v curl >/dev/null 2>&1; then
    error "curl is required but not installed."
fi

# 2. Detect Distribution
if command -v dpkg >/dev/null 2>&1; then
    DISTRO="debian"
elif command -v rpm >/dev/null 2>&1; then
    DISTRO="redhat"
else
    DISTRO="unknown"
fi
info "Detected Distribution Type: $DISTRO"

# 3. Installation
case "$DISTRO" in
    debian)
        info "Downloading Debian package..."
        TEMP_DEB=$(mktemp).deb
        curl -L -o "$TEMP_DEB" "$DEB_URL"
        
        info "Installing (may require sudo password)..."
        sudo dpkg -i "$TEMP_DEB" || sudo apt-get install -f -y
        rm "$TEMP_DEB"
        
        success "Spectre installed successfully!"
        ;;
    redhat)
        warn "RPM package not available yet."
        warn "Please download manually from: https://github.com/$REPO/releases"
        exit 1
        ;;
    *)
        warn "Unknown distribution. Manual installation required."
        warn "Please download from: https://github.com/$REPO/releases"
        exit 1
        ;;
esac

echo ""
success "Spectre installation complete!"
info "Try running 'spectre' in your terminal."
