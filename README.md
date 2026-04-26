<p align="center">
  <img src="src/web/public/logo.svg" alt="Quran Multi-Language App" width="140" height="140" />
</p>

<h1 align="center">Quran Multi-Language App</h1>

<p align="center">
  <strong>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</strong><br />
  <em>In the Name of Allah, the Most Gracious, the Most Merciful</em>
</p>

<p align="center">
  A comprehensive, open-source Quran platform with <strong>10+ languages</strong>, <strong>4 reciters</strong>, <strong>7 tafsir sources</strong>, and full-stack starter apps for web, mobile, desktop, and API.
</p>

<p align="center">
  <a href="https://github.com/zaidlh/quran-multi-lang-app/actions/workflows/ci.yml"><img src="https://github.com/zaidlh/quran-multi-lang-app/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT" /></a>
  <a href="https://github.com/zaidlh/quran-multi-lang-app/releases"><img src="https://img.shields.io/github/v/release/zaidlh/quran-multi-lang-app?include_prereleases&label=version" alt="Version" /></a>
  <a href="https://github.com/zaidlh/quran-multi-lang-app/stargazers"><img src="https://img.shields.io/github/stars/zaidlh/quran-multi-lang-app?style=social" alt="Stars" /></a>
  <a href="https://github.com/zaidlh/quran-multi-lang-app/network/members"><img src="https://img.shields.io/github/forks/zaidlh/quran-multi-lang-app?style=social" alt="Forks" /></a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/languages-10%2B-blue.svg" alt="Languages: 10+" />
  <img src="https://img.shields.io/badge/reciters-4-orange.svg" alt="Reciters: 4" />
  <img src="https://img.shields.io/badge/ayahs-6%2C236-gold.svg" alt="Ayahs: 6,236" />
  <img src="https://img.shields.io/badge/surahs-114-teal.svg" alt="Surahs: 114" />
  <img src="https://img.shields.io/badge/juz-30-purple.svg" alt="Juz: 30" />
  <img src="https://img.shields.io/badge/tafsir_sources-7-crimson.svg" alt="Tafsir: 7" />
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-docker">Docker</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="ROADMAP.md">Roadmap</a>
</p>

---

## ✨ Features

### 📖 Reading Experience
| Feature | Description |
|---------|-------------|
| **Bilingual Display** | Arabic (Uthmani) + translation side by side |
| **Tajweed Color-Coding** | 7 rule types highlighted (Shaddah, Ikhfa, Idgham, Izhar, Iqlab, Tanween, Madd) |
| **Mushaf View** | Traditional page-by-page layout (~15 verses per page) |
| **Transliteration** | Arabic-to-Latin toggle for non-Arabic readers |
| **Surah Introductions** | Context, themes, and background for key surahs |
| **Cross-References** | Related verses linked across surahs |

### 🎧 Audio & Recitation
| Feature | Description |
|---------|-------------|
| **4 World-Class Reciters** | Mishary Alafasy, Abdul Basit, Saad Al-Ghamdi, Maher Al-Muaiqly |
| **Verse-by-Verse Playback** | Auto-advancing with real-time verse highlighting |
| **Recitation Comparison** | Play same verse from multiple reciters side by side |
| **CDN-Backed Audio** | Stream from EveryAyah.com — no MP3s in the repo |

### 📚 Study & Learning
| Feature | Description |
|---------|-------------|
| **7 Tafsir Sources** | Ibn Kathir, Jalalayn, Al-Tabari, Al-Qurtubi, As-Sa'di, Al-Muyassar, Tafheem ul-Quran |
| **Hifz Mode** | 4 difficulty levels with progressive word hiding for memorization |
| **Reading Plans** | 30-day, 60-day, and weekly essentials schedules |
| **Verse of the Day** | 30 curated notable verses, rotating daily |
| **Personal Notes** | Per-verse reflections saved in localStorage |

### 🔍 Navigation & Search
| Feature | Description |
|---------|-------------|
| **Surah Browser** | All 114 surahs with search and Meccan/Medinan filter |
| **Juz Browsing** | Navigate by the 30 divisions of the Quran |
| **Full-Text Search** | Search across all English translations |
| **Bookmarking** | Surah-level and verse-level bookmarks |
| **Last-Read Position** | Automatically saves and restores where you left off |
| **Share Verses** | Copy or share Arabic + translation via Web Share API |

### 🎨 Experience
| Feature | Description |
|---------|-------------|
| **Dark Mode** | Class-based light/dark theme, persisted in localStorage |
| **PWA** | Installable as standalone app with offline support |
| **RTL Support** | Full right-to-left rendering for Arabic text |
| **Quran Typography** | Scheherazade New font via Google Fonts |
| **SEO Optimized** | Open Graph, JSON-LD structured data, sitemap, robots.txt |
| **Accessible** | ARIA labels, keyboard navigation, screen reader support |
| **Error Boundaries** | Graceful fallback UI instead of white screens |
| **Skeleton Loading** | Smooth loading states for better perceived performance |

---

## 🛠 Tech Stack

<table>
  <tr>
    <td align="center" width="96"><strong>Frontend</strong></td>
    <td align="center" width="96"><strong>Backend</strong></td>
    <td align="center" width="96"><strong>Mobile</strong></td>
    <td align="center" width="96"><strong>Desktop</strong></td>
    <td align="center" width="96"><strong>Extension</strong></td>
    <td align="center" width="96"><strong>DevOps</strong></td>
  </tr>
  <tr>
    <td align="center">Next.js 16<br/>React 19<br/>Tailwind CSS</td>
    <td align="center">FastAPI<br/>GraphQL<br/>Redis</td>
    <td align="center">React Native<br/>SQLite</td>
    <td align="center">Electron</td>
    <td align="center">Chrome MV3</td>
    <td align="center">Docker<br/>GitHub Actions<br/>Playwright</td>
  </tr>
</table>

---

## 🌍 Supported Languages

| Code | Language | Translation Source | Status |
|------|----------|-------------------|--------|
| `ar` | العربية (Arabic) | Uthmani Script (Tanzil) | ✅ Complete |
| `en` | English | Sahih International, Pickthall, Yusuf Ali | ✅ Complete |
| `fr` | Français (French) | Muhammad Hamidullah | ✅ Complete |
| `es` | Español (Spanish) | Julio Cortes | ✅ Complete |
| `tr` | Türkçe (Turkish) | Diyanet Isleri | ✅ Complete |
| `id` | Bahasa Indonesia | Ministry of Religious Affairs | ✅ Complete |
| `ur` | اردو (Urdu) | Jalandhry / Ahmed Ali | ✅ Complete |
| `bn` | বাংলা (Bengali) | Muhiuddin Khan | ✅ Complete |
| `de` | Deutsch (German) | Abu Rida Muhammad ibn Ahmad | 🔄 Partial |
| `ms` | Bahasa Melayu | Abdullah Muhammad Basmeih | 🔄 Partial |

> 💡 **Want to add a language?** See our [Crowdin project](crowdin.yml) or submit a PR with a new `resources/text/{lang}/` directory.

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
git clone https://github.com/zaidlh/quran-multi-lang-app.git
cd quran-multi-lang-app
docker compose up --build
```

| Service | URL |
|---------|-----|
| Web App | http://localhost:3000 |
| API + Swagger | http://localhost:8000/docs |
| GraphQL Playground | http://localhost:8000/graphql |
| Redis | localhost:6379 |

### Option 2: Manual Setup

```bash
# Web App (Next.js)
cd src/web && npm install && npm run dev
# → http://localhost:3000

# API Server (FastAPI)
cd src/api && pip install -r requirements.txt && uvicorn app.main:app --reload
# → http://localhost:8000/docs

# Mobile App (React Native)
cd src/mobile && npm install && npx react-native run-android

# Desktop App (Electron)
cd src/desktop && npm install && npm start

# Generate SQLite Database
pip install -r scripts/requirements.txt && python scripts/generate_sqlite.py
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐  ┌────────────┐  │
│  │  Next.js   │  │   React    │  │ Electron │  │   Chrome   │  │
│  │  Web App   │  │   Native   │  │ Desktop  │  │ Extension  │  │
│  │  (src/web) │  │ (src/mob.) │  │(src/desk)│  │ (src/ext.) │  │
│  └─────┬──────┘  └─────┬──────┘  └────┬─────┘  └─────┬──────┘  │
│        └────────────────┼──────────────┼──────────────┘          │
│                         │              │                         │
├─────────────────────────┼──────────────┼─────────────────────────┤
│                    API Layer           │                          │
│           ┌─────────────┴──────────────┴───┐                     │
│           │   FastAPI (src/api)              │                    │
│           │   ├─ REST API (/surahs, /ayahs) │                    │
│           │   ├─ GraphQL (/graphql)         │                    │
│           │   └─ Swagger UI (/docs)         │                    │
│           └─────────────┬──────────────────┘                     │
│                         │                                        │
├─────────────────────────┼────────────────────────────────────────┤
│                    Data Layer                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Text &   │  │  Audio   │  │  Tafsir  │  │  Word-by-Word    │ │
│  │  Transl.  │  │ Manifests│  │  (JSON)  │  │  Morphology      │ │
│  │  (JSON)   │  │  (JSON)  │  │          │  │  (JSON)          │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
│                         │                                        │
│              ┌──────────┴──────────┐                             │
│              │  SQLite (offline)   │                              │
│              └─────────────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📡 API Reference

The FastAPI backend serves both **REST** and **GraphQL** endpoints.

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/surahs` | List all 114 surahs with metadata |
| `GET` | `/surahs/{number}` | Get surah metadata by number |
| `GET` | `/surah/{number}/text` | Full Arabic text of a surah |
| `GET` | `/surah/{number}/translation?lang=en` | Translation for a surah |
| `GET` | `/ayahs/{surah}/{ayah}` | Single ayah with Arabic + translation |
| `GET` | `/search?q=mercy&lang=en` | Full-text search across translations |
| `GET` | `/reciters` | List available reciters |
| `GET` | `/audio/{reciter}/{surah}` | Audio URLs for a surah |
| `GET` | `/names` | 99 Names of Allah |

### GraphQL

```graphql
# Fetch a surah with its verses and translations
{
  surah(number: 1) {
    name
    nameEn
    versesCount
  }
  verses(surah: 1, lang: "en") {
    number
    text
    translation
  }
}
```

> 📖 Full API documentation: [`docs/API.md`](docs/API.md) | Swagger UI at `http://localhost:8000/docs`

---

## 🐳 Docker

The entire stack runs in Docker with a single command:

```bash
docker compose up --build
```

**Services:**

| Container | Image | Port | Purpose |
|-----------|-------|------|---------|
| `web` | Node 20 Alpine | 3000 | Next.js frontend |
| `api` | Python 3.12 Slim | 8000 | FastAPI backend |
| `redis` | Redis 7 Alpine | 6379 | Caching layer |

Both Dockerfiles use **multi-stage builds** for optimized production images.

---

## 📁 Repository Structure

```
quran-multi-lang-app/
├── .github/
│   ├── workflows/ci.yml          # Lint → Test → Build pipeline
│   ├── ISSUE_TEMPLATE/           # Bug report & feature request
│   └── FUNDING.yml               # GitHub Sponsors
├── docs/
│   ├── API.md                    # Complete REST API reference
│   ├── CONTRIBUTING.md           # How to contribute
│   ├── RESOURCES.md              # All data sources & licenses
│   └── SETUP.md                  # Setup guide for all platforms
├── e2e/
│   ├── playwright.config.ts      # Playwright config (4 browsers)
│   └── tests/quran.spec.ts       # 10 E2E test cases
├── resources/
│   ├── text/{ar,en,fr,...}/      # Quran text & translations
│   ├── audio/manifests/          # CDN audio URL manifests
│   ├── tafsir/                   # Verse-by-verse exegesis index
│   ├── wordbyword/               # Morphology & grammar data
│   └── supplementary/            # Prayer times, Qibla, 99 Names
├── scripts/
│   ├── fetch_resources.py        # Download & update resources
│   ├── validate_data.py          # Data integrity checks
│   ├── generate_sqlite.py        # Build offline SQLite DB
│   ├── generate_manifests.py     # Create audio manifests
│   └── load-test/k6-api.js      # K6 load testing (20-50 users)
├── src/
│   ├── web/                      # Next.js 16 + React 19 + Tailwind
│   ├── api/                      # FastAPI + GraphQL + Redis
│   ├── mobile/                   # React Native starter
│   ├── desktop/                  # Electron wrapper
│   └── extension/                # Chrome extension (Manifest V3)
├── Dockerfile.web                # Multi-stage Next.js build
├── Dockerfile.api                # Python FastAPI image
├── docker-compose.yml            # Full stack orchestration
├── ROADMAP.md                    # Feature roadmap (v1.1 → v2.0)
├── CHANGELOG.md                  # Release history
├── CODE_OF_CONDUCT.md            # Community standards
├── SECURITY.md                   # Vulnerability reporting
├── LEGAL.md                      # Copyright & attribution
├── crowdin.yml                   # Localization config
└── LICENSE                       # MIT License
```

---

## 📊 Data Sources

All resources use **permissive open-source licenses**. See [`docs/RESOURCES.md`](docs/RESOURCES.md) for the complete catalog.

| Source | Data | License |
|--------|------|---------|
| [Tanzil.net](https://tanzil.net) | Quran text (Uthmani & Simple) | CC-BY-3.0 |
| [risan/quran-json](https://github.com/risan/quran-json) | Structured JSON translations | CC-BY-SA-4.0 |
| [semarketir/quranjson](https://github.com/semarketir/quranjson) | 6,236 verses, 114 surahs | MIT |
| [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api) | 27+ tafsirs via CDN | MIT |
| [EveryAyah.com](https://everyayah.com) | Ayah-by-ayah audio | Free |
| [QuranicAudio.com](https://quranicaudio.com) | Surah-level audio | Free |
| [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology) | Word-by-word linguistic data | MIT |

---

## 🧪 Testing

```bash
# Lint & type check
cd src/web && npm run lint && npm run build

# API tests
cd src/api && pytest

# E2E tests (requires dev server)
cd e2e && npm install && npx playwright install && npx playwright test

# Load testing
k6 run scripts/load-test/k6-api.js
```

---

## 🤝 Contributing

We welcome contributions from developers, designers, translators, and Islamic scholars!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

> 📖 Read the full guide: [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)
>
> 📋 Check our [Roadmap](ROADMAP.md) for feature ideas
>
> 🌐 Help translate the UI via [Crowdin](crowdin.yml)
>
> 🐛 Report issues using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

---

## 🔒 Security

To report a vulnerability, please see our [Security Policy](SECURITY.md).

---

## 📜 Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features across v1.1 → v2.0, including:

- Word-by-word morphology viewer
- Qira'at (variant readings) support
- Flutter mobile rewrite
- WebSocket cross-device sync
- AI-powered semantic search

---

## 👥 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zaidlh"><img src="https://github.com/zaidlh.png?size=100" width="100px;" alt="Zaid Lhouch"/><br /><sub><b>Zaid Lhouch</b></sub></a><br />💻 📖 🤔 📆</td>
    </tr>
  </tbody>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 📄 License

This project is licensed under the **MIT License** — see [`LICENSE`](LICENSE) for details.

Individual data resources may have their own licenses. See [`LEGAL.md`](LEGAL.md) for full attribution and copyright notices.

---

<p align="center">
  <strong>⭐ If this project benefits you, please consider giving it a star!</strong>
</p>

<p align="center">
  Made with ❤️ for the Ummah
</p>

<p align="center">
  <sub>
    <a href="https://github.com/zaidlh/quran-multi-lang-app/issues">Report Bug</a> •
    <a href="https://github.com/zaidlh/quran-multi-lang-app/issues">Request Feature</a> •
    <a href="docs/CONTRIBUTING.md">Contribute</a> •
    <a href="ROADMAP.md">Roadmap</a>
  </sub>
</p>
