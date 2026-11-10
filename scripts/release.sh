#!/usr/bin/env bash
# Build and package the native macOS app for GitHub releases.
set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

./scripts/build_swift_app.sh
./scripts/create_dmg.sh
