<p align="center">
  <img src="src/web/public/logo.svg" alt="Quran Multi-Language App" width="120" height="120" />
</p>

<h1 align="center">Quran Multi-Language App</h1>

<p align="center">
  <strong>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</strong>
</p>

<p align="center">
  A comprehensive, production-ready Quran application supporting <strong>10+ languages</strong> with text, translations, audio recitations, tafsir, and starter apps for web, mobile, and API.
</p>

<p align="center">
  <a href="https://github.com/zaidlh/quran-multi-lang-app/actions/workflows/ci.yml"><img src="https://github.com/zaidlh/quran-multi-lang-app/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT" /></a>
  <img src="https://img.shields.io/badge/languages-10%2B-blue.svg" alt="Languages: 10+" />
  <img src="https://img.shields.io/badge/reciters-4-orange.svg" alt="Reciters: 4" />
  <img src="https://img.shields.io/badge/ayahs-6%2C236-gold.svg" alt="Ayahs: 6,236" />
  <img src="https://img.shields.io/badge/surahs-114-teal.svg" alt="Surahs: 114" />
  <a href="https://github.com/zaidlh/quran-multi-lang-app/releases"><img src="https://img.shields.io/github/v/release/zaidlh/quran-multi-lang-app?include_prereleases&label=version" alt="Version" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
</p>

---

## Features

- **10+ Language Translations** — Arabic (Uthmani), English, French, Spanish, German, Turkish, Indonesian, Urdu, Malay, Bengali
- **4 Reciters** — Mishary Alafasy, Abdul Basit, Saad Al-Ghamdi, Maher Al-Muaiqly
- **Tafsir** — Ibn Kathir, Jalalayn, Al-Tabari, Al-Qurtubi, As-Sa'di, Al-Muyassar, Tafheem ul-Quran
- **Dark Mode** — Light/dark theme with system preference detection
- **Verse-by-Verse Audio** — Auto-advancing playback with verse highlighting
- **Juz Browsing** — Navigate by the 30 divisions of the Quran
- **Bookmarking** — Surah-level and verse-level bookmarks
- **Last-Read Position** — Automatically saves and restores your reading position
- **Search** — Full-text search across English translations
- **Share Verses** — Share Arabic + translation via Web Share API or clipboard
- **PWA** — Install as a standalone app with offline support
- **RTL Support** — Proper right-to-left rendering for Arabic text
- **Scheherazade New Font** — Authentic Quran typography via Google Fonts
- **Offline Database** — SQLite generation for mobile apps
- **Audio Manifests** — CDN-backed audio without binary bloat in git
- **Starter Apps** — Next.js web, React Native mobile, and FastAPI API

---

## Supported Languages

| Code | Language   | Translation Source                        |
| ---- | ---------- | ----------------------------------------- |
| `ar` | Arabic     | Uthmani Script (Tanzil)                   |
| `en` | English    | Sahih International, Pickthall, Yusuf Ali |
| `fr` | French     | Muhammad Hamidullah                       |
| `es` | Spanish    | Julio Cortes                              |
| `de` | German     | Abu Rida Muhammad ibn Ahmad               |
| `tr` | Turkish    | Diyanet Isleri                            |
| `id` | Indonesian | Ministry of Religious Affairs             |
| `ur` | Urdu       | Jalandhry / Ahmed Ali                     |
| `ms` | Malay      | Abdullah Muhammad Basmeih                 |
| `bn` | Bengali    | Muhiuddin Khan                            |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Next.js Web  │  │ React Native │  │   3rd Party  │  │
│  │   (src/web)   │  │  (src/mobile)│  │    Clients   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │          │
│         └──────────────────┼──────────────────┘          │
│                            │                             │
├────────────────────────────┼─────────────────────────────┤
│                     API Layer                            │
│              ┌─────────────┴─────────────┐               │
│              │   FastAPI (src/api)        │               │
│              │   REST + GraphQL           │               │
│              │   Rate Limiting + Cache    │               │
│              └─────────────┬─────────────┘               │
│                            │                             │
├────────────────────────────┼─────────────────────────────┤
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Text/    │  │  Audio   │  │  Tafsir  │  │  Word   │ │
│  │  Trans.   │  │  Manifst │  │  Data    │  │  by Word│ │
│  │  (JSON)   │  │  (JSON)  │  │  (JSON)  │  │  (JSON) │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                            │                             │
│              ┌─────────────┴─────────────┐               │
│              │   SQLite (offline DB)      │               │
│              └───────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Start

### Web App (Next.js)
```bash
cd src/web
npm install
npm run dev
# Open http://localhost:3000
```

### API Server (FastAPI)
```bash
cd src/api
pip install -r requirements.txt
uvicorn app.main:app --reload
# Open http://localhost:8000/docs
```

### Mobile App (React Native)
```bash
cd src/mobile
npm install
npx react-native run-android  # or run-ios
```

### Generate SQLite Database
```bash
pip install -r scripts/requirements.txt
python scripts/generate_sqlite.py
```

---

## Repository Structure

```
quran-multi-lang-app/
├── .github/
│   ├── workflows/ci.yml        # CI/CD pipeline
│   └── ISSUE_TEMPLATE/         # Bug & feature templates
├── docs/
│   ├── API.md                  # REST API documentation
│   ├── CONTRIBUTING.md         # Contribution guidelines
│   ├── RESOURCES.md            # Catalog of all data sources
│   └── SETUP.md               # Setup instructions
├── resources/
│   ├── text/                   # Quran text & translations
│   │   ├── ar/                 # Arabic (Uthmani)
│   │   ├── en/                 # English translations
│   │   ├── [lang]/             # Other languages
│   │   └── metadata.json       # Surah metadata & indices
│   ├── audio/manifests/        # JSON manifests → CDN URLs
│   ├── tafsir/                 # Verse-by-verse exegesis
│   ├── wordbyword/             # Morphology & grammar
│   ├── fonts/                  # Open-licensed Quran fonts
│   └── supplementary/          # Prayer times, Qibla, etc.
├── src/
│   ├── web/                    # Next.js 16 web app
│   ├── mobile/                 # React Native starter
│   └── api/                    # FastAPI wrapper
├── scripts/                    # Data processing utilities
├── LICENSE                     # MIT License
├── LEGAL.md                    # Copyright & attribution
├── SECURITY.md                 # Security policy
├── CODE_OF_CONDUCT.md          # Community guidelines
├── CHANGELOG.md                # Release history
└── README.md
```

---

## Data Sources

All resources use **permissive open-source licenses** (MIT, Apache 2.0, CC0, CC-BY, GPL). See [RESOURCES.md](docs/RESOURCES.md) for the complete catalog.

| Source | Data | License |
| ------ | ---- | ------- |
| [Tanzil.net](https://tanzil.net) | Quran text (Uthmani & Simple) | CC-BY-3.0 |
| [risan/quran-json](https://github.com/risan/quran-json) | Structured JSON translations | CC-BY-SA-4.0 |
| [semarketir/quranjson](https://github.com/semarketir/quranjson) | 6,236 verses, 114 surahs | MIT |
| [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api) | 27+ tafsirs via CDN | MIT |
| [EveryAyah.com](https://everyayah.com) | Ayah-by-ayah audio | Free |
| [QuranicAudio.com](https://quranicaudio.com) | Surah-level audio | Free |
| [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology) | Linguistic data | MIT |

---

## Contributing

We welcome contributions of all kinds! See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Security

To report a vulnerability, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

Individual data resources may have their own licenses. See [LEGAL.md](LEGAL.md) for full attribution.

---

<p align="center">
  Made with ❤️ for the Ummah
</p>
