# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-26

### Added
- Scheherazade New font for authentic Arabic Quran typography
- Dark mode toggle with localStorage persistence and system preference detection
- Tafsir panel with 6 sources (Ibn Kathir AR/EN, Al-Jalalayn, Al-Muyassar, Al-Qurtubi, Tafheem)
- Last-read position tracking with "Continue Reading" banner
- Juz/Parah browsing page (30 divisions with surah lists)
- PWA support with service worker and installable manifest
- Verse-by-verse audio highlighting with auto-advance
- Share verse button (Web Share API + clipboard fallback)
- Verse-level bookmarking alongside surah-level bookmarks

### Changed
- Dark mode uses class-based strategy for user control
- AudioPlayer supports ayah-by-ayah playback mode
- Header now includes dark mode toggle and Juz navigation link

## [1.0.0] - 2026-04-25

### Added
- Complete Quran text in Arabic (Uthmani script) from Tanzil.net
- 7 complete translations (English, French, Spanish, Turkish, Indonesian, Urdu, Bengali)
- 2 placeholder translations (German, Malay)
- Audio manifests for 4 reciters (Alafasy, Abdul Basit, Al-Ghamdi, Al-Muaiqly)
- Tafsir data index with 8 sources via spa5k/tafsir_api CDN
- Next.js 16 web application with surah list, search, bilingual display, audio player
- FastAPI backend with 10 REST endpoints and Swagger documentation
- React Native mobile starter scaffold
- SQLite database generation script (12.9 MB offline DB)
- Audio manifest generator with CDN fallbacks
- Data validation scripts (ayah count, schema validation)
- CI/CD pipeline (lint, API tests, web build)
- Comprehensive documentation (API.md, RESOURCES.md, SETUP.md, CONTRIBUTING.md)
- MIT license with full attribution in LEGAL.md
- GitHub issue templates for bugs and feature requests

[1.1.0]: https://github.com/zaidlh/quran-multi-lang-app/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/zaidlh/quran-multi-lang-app/releases/tag/v1.0.0
