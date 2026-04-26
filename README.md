# بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

# Quran Multi-Language App

A comprehensive, production-ready Quran application repository supporting **10+ languages** with text, translations, audio recitations, tafsir, word-by-word analysis, and starter applications for web, mobile, and API.

---

## Supported Languages

| Code | Language   | Translation Source            |
| ---- | ---------- | ----------------------------- |
| `ar` | Arabic     | Uthmani Script (Tanzil)       |
| `en` | English    | Sahih International, Pickthall, Yusuf Ali |
| `fr` | French     | Muhammad Hamidullah           |
| `es` | Spanish    | Julio Cortes                  |
| `de` | German     | Abu Rida Muhammad ibn Ahmad   |
| `tr` | Turkish    | Diyanet Isleri                |
| `id` | Indonesian | Ministry of Religious Affairs |
| `ur` | Urdu       | Jalandhry / Ahmed Ali         |
| `ms` | Malay      | Abdullah Muhammad Basmeih     |
| `bn` | Bengali    | Muhiuddin Khan                |

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
│   ├── audio/
│   │   └── manifests/          # JSON manifests → CDN URLs
│   ├── tafsir/                 # Verse-by-verse exegesis
│   ├── wordbyword/             # Morphology & grammar
│   ├── fonts/                  # Open-licensed Quran fonts
│   ├── images/                 # Image references
│   └── supplementary/          # Prayer times, Qibla, etc.
├── src/
│   ├── web/                    # Next.js 14 starter app
│   ├── mobile/                 # React Native starter
│   └── api/                    # FastAPI wrapper
├── scripts/
│   ├── fetch_resources.py      # Download/update resources
│   ├── validate_data.py        # Data integrity checker
│   ├── generate_sqlite.py      # Build offline SQLite DB
│   └── generate_manifests.py   # Audio manifest generator
├── LICENSE                     # MIT License
├── LEGAL.md                    # Copyright & attribution
└── README.md
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

## Data Sources

All resources in this repository use **permissive open-source licenses** (MIT, Apache 2.0, CC0, CC-BY, GPL). See [RESOURCES.md](docs/RESOURCES.md) for the complete catalog with attribution.

Key sources:
- **Tanzil.net** — Quran text (Uthmani & Simple scripts)
- **risan/quran-json** — Structured JSON translations (CC-BY-SA-4.0)
- **semarketir/quranjson** — 6236 verses, 114 surahs, 30 juz (MIT)
- **spa5k/tafsir_api** — 27+ tafsirs via CDN (MIT)
- **EveryAyah.com** — Ayah-by-ayah audio for 100+ reciters
- **QuranicAudio.com** — Surah-level audio streaming
- **Quran.com API** — Translations, recitations, word-by-word
- **mustafa0x/quran-morphology** — Linguistic morphology data

---

## Features

- **10+ Language Translations** — Arabic, English, French, Spanish, German, Turkish, Indonesian, Urdu, Malay, Bengali
- **4+ Reciters** — Mishary Rashid Alafasy, Abdul Basit, Saad Al-Ghamdi, Maher Al-Muaiqly
- **Tafsir** — Ibn Kathir, Jalalayn, Al-Tabari, and more
- **Word-by-Word** — Arabic roots, transliteration, morphology, grammar tags
- **Complete Metadata** — Surah info, juz divisions, hizb, manzil, ruku, page numbers
- **Offline Support** — SQLite database generation for mobile apps
- **Audio Manifests** — CDN-backed audio without binary bloat in git
- **Starter Apps** — Ready-to-deploy Next.js, React Native, and FastAPI templates

---

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

Individual data resources may have their own licenses. See [LEGAL.md](LEGAL.md) for full attribution.
