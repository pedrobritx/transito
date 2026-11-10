# Changelog

All notable changes to this project will be documented in this file.

## [v0.5.0] - 2025-11-26

### Added
- **Native Swift Engine**: Replaced the Python-based HLS downloader with a native Swift implementation using `ffmpeg` directly.
- **Packaging Script**: Added `scripts/create_dmg.sh` to create a single-file DMG installer.

### Changed
- **Architecture**: Transito is now a standalone macOS application and no longer requires a separate Python environment.
- **Build Process**: Simplified build scripts to remove Python dependency copying.

### Removed
- **Python CLI**: The standalone `transito` CLI tool has been removed in favor of the focused macOS app experience.
- **Legacy Code**: Removed `transito.py`, `transito_engine.py`, and `transito_gui.py`.

## [v0.4.0] - 2025-11-17

### Changed
- Migrated the macOS downloader from a Python/Swift hybrid to a native Swift/SwiftUI architecture.
- Removed Python CLI and legacy application-bundle dependencies.
- Introduced native download progress reporting, custom HTTP headers and macOS UI improvements.
