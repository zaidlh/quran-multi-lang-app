# Quran Desktop App (Electron)

Desktop wrapper for the Quran Multi-Language web app using Electron.

## Setup

```bash
cd src/desktop
npm install
```

## Development

Start the Next.js web app first, then run the desktop app:

```bash
# Terminal 1: Start web app
cd src/web && npm run dev

# Terminal 2: Start desktop app
cd src/desktop && npm start
```

## Build

```bash
npm run build
```

This creates distributable packages in `dist/` for Windows (NSIS), macOS (DMG), and Linux (AppImage).
