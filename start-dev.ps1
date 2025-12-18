#!/usr/bin/env pwsh
# ============================================
# Mind Palace - Quick Start Script
# ============================================
# 
# Usage:
#   ./start-dev.ps1       - Start development server
#   ./start-dev.ps1 -Prod - Start production build
#

param([switch]$Prod)

# Add Node.js to PATH
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH

# Navigate to project
Set-Location "$PSScriptRoot"

# Verify Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Cyan
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
Write-Host "✓ npm $npmVersion" -ForegroundColor Green

if ($Prod) {
    Write-Host "`nBuilding for production..." -ForegroundColor Cyan
    npm run build
    
    Write-Host "`nStarting production server..." -ForegroundColor Cyan
    npm start
} else {
    Write-Host "`nStarting development server..." -ForegroundColor Cyan
    npm run dev
}

Write-Host "`n✓ Server ready!" -ForegroundColor Green
Write-Host "  Open http://localhost:3000 in your browser" -ForegroundColor Yellow
