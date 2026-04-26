# Quran Mobile App — React Native Starter

A starter scaffold for building a mobile Quran application with React Native.

## Features (Planned)
- Offline SQLite database for all Quran text and translations
- Audio streaming with download for offline listening
- Bookmarking and last-read position persistence
- Dark/light theme support
- RTL layout for Arabic text

## Setup

```bash
# Install dependencies
npm install

# Generate the SQLite database
cd ../../
python scripts/generate_sqlite.py --output src/mobile/assets/quran.db

# Run on Android
npx react-native run-android

# Run on iOS
cd ios && pod install && cd ..
npx react-native run-ios
```

## Architecture

The mobile app uses:
- **React Navigation** for screen navigation
- **expo-sqlite** for offline database access
- **react-native-track-player** for audio playback
- **AsyncStorage** for bookmarks and preferences

## Data Flow

1. `quran.db` (SQLite) is bundled with the app for offline access
2. Audio is streamed from CDN (EveryAyah.com / QuranicAudio.com)
3. Downloaded audio is cached locally for offline playback
4. Bookmarks are stored in AsyncStorage
