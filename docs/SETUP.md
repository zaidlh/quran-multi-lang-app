# Setup Guide

Step-by-step instructions for setting up the web app, mobile app, and API.

## Prerequisites

- **Node.js** 18+ (for web app)
- **Python** 3.10+ (for API and scripts)
- **npm** or **yarn**
- **Git**

---

## 1. Clone the Repository

```bash
git clone https://github.com/zaidlh/quran-multi-lang-app.git
cd quran-multi-lang-app
```

## 2. Web App (Next.js)

```bash
cd src/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm start
```

**Deploy to Vercel:**
```bash
npx vercel --prod
```

> Note: Set the root directory to `src/web` in Vercel settings.

---

## 3. API Server (FastAPI)

```bash
cd src/api
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API docs.

**Run tests:**
```bash
cd src/api
python -m pytest tests/ -v
```

---

## 4. Mobile App (React Native)

```bash
cd src/mobile
npm install

# Generate SQLite database for offline use
cd ../..
python scripts/generate_sqlite.py --output src/mobile/assets/quran.db

# Android
cd src/mobile
npx react-native run-android

# iOS
cd ios && pod install && cd ..
npx react-native run-ios
```

---

## 5. Data Scripts

### Install script dependencies
```bash
pip install -r scripts/requirements.txt
```

### Fetch/update resources
```bash
python scripts/fetch_resources.py --all
```

### Validate data integrity
```bash
python scripts/validate_data.py
```

### Generate SQLite database
```bash
python scripts/generate_sqlite.py --output quran.db
```

### Regenerate audio manifests
```bash
python scripts/generate_manifests.py
```

---

## 6. Environment Variables

No environment variables are required for basic operation. All data is bundled in the `resources/` directory.

For production API deployment with Redis caching:
```env
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=https://yourdomain.com
```

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| `metadata.json not found` | Run `python scripts/fetch_resources.py --text` |
| `Translation not available` | Some translations are placeholders; run fetch script |
| Web build fails | Ensure Node.js 18+ and run `npm ci` |
| API tests fail | Ensure you're in `src/api` directory and resources exist |
