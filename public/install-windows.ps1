# ═══════════════════════════════════════════════════════════════════════════════
# SPECTRE - Windows Installation Script (PowerShell)
# ═══════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

$REPO = "itsyashvardhan/spectre"
$LATEST_RELEASE_URL = "https://api.github.com/repos/$REPO/releases/latest"
$INSTALL_DIR = "$env:LOCALAPPDATA\Spectre"

# Colors using Write-Host
function Write-Info($msg) { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Success($msg) { Write-Host "[SUCCESS] $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red; exit 1 }

# ASCII Art
Write-Host ""
Write-Host "   _____ ____  _________________  ______" -ForegroundColor Cyan
Write-Host "  / ___// __ \/ ____/ ____/_  __/ __  /" -ForegroundColor Cyan
Write-Host "  \__ \/ /_/ / __/ / /     / / / /_/ / " -ForegroundColor Cyan
Write-Host " ___/ / ____/ /___/ /___  / / / _, _/  " -ForegroundColor Cyan
Write-Host "/____/_/   /_____/\____/ /_/ /_/ |_|   " -ForegroundColor Cyan
Write-Host ""
Write-Info "Installing SPECTRE for Windows"

# 1. Fetch Release Info
Write-Info "Fetching release information..."
try {
    $ReleaseData = Invoke-RestMethod -Uri $LATEST_RELEASE_URL -Headers @{ "User-Agent" = "Spectre-Installer" }
    $VERSION = $ReleaseData.tag_name
    
    if (-not $VERSION) {
        Write-Err "Could not fetch latest version."
    }
    Write-Success "Found latest version: $VERSION"
} catch {
    Write-Err "Failed to fetch release info. Check your connection."
}

# 2. Find Windows Asset
Write-Info "Looking for Windows binary..."
$Asset = $ReleaseData.assets | Where-Object { $_.name -like "*win*.zip" -or $_.name -like "*windows*.zip" } | Select-Object -First 1

if (-not $Asset) {
    Write-Err "No Windows binary found in the latest release."
}

$DownloadUrl = $Asset.browser_download_url
$FileName = $Asset.name

# 3. Download
Write-Info "Downloading $FileName..."
$TempZip = "$env:TEMP\$FileName"
Invoke-WebRequest -Uri $DownloadUrl -OutFile $TempZip -UseBasicParsing

# 4. Extract
Write-Info "Extracting to $INSTALL_DIR..."
if (Test-Path $INSTALL_DIR) {
    Remove-Item -Recurse -Force $INSTALL_DIR
}
Expand-Archive -Path $TempZip -DestinationPath $INSTALL_DIR -Force
Remove-Item $TempZip

# 5. Add to PATH
Write-Info "Adding Spectre to PATH..."
$CurrentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
if ($CurrentPath -notlike "*$INSTALL_DIR*") {
    [Environment]::SetEnvironmentVariable("PATH", "$CurrentPath;$INSTALL_DIR", "User")
    Write-Success "Added $INSTALL_DIR to your PATH."
    Write-Warn "Restart your terminal for PATH changes to take effect."
} else {
    Write-Info "Spectre is already in PATH."
}

Write-Host ""
Write-Success "Spectre $VERSION installation complete!"
Write-Info "Try running 'spectre' in a new terminal."
