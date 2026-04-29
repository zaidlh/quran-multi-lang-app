# APK Build Folder

This folder contains Android APK files for the Quran Multi-Language Mobile App.

## Quick Build

Run the automated build script:
```bash
./apk/build-apk.sh
```

This will build the APK and copy it to this folder.

## Current Status

❌ **APK Build Failed** - Java Version Compatibility Issue

The APK could not be built in this environment due to a Java version mismatch:
- Environment has Java 25.0.2
- React Native 0.73.x requires Java 21 or earlier

## How to Build APK

### Option 1: Build Locally (Recommended)

1. **Prerequisites:**
   - Java 21 (not Java 25)
   - Android SDK with platform-tools and build-tools 34.0.0
   - Node.js 18+

2. **Build Steps:**
   ```bash
   cd src/mobile
   npm install
   cd ../..
   python scripts/generate_sqlite.py --output src/mobile/assets/quran.db
   cd src/mobile
   npx react-native run-android --release
   ```

3. **Find APK:**
   - Location: `src/mobile/android/app/build/outputs/apk/release/app-release.apk`
   - Copy to this `apk/` folder after successful build

### Option 2: Use EAS Cloud Build

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Build APK:
   ```bash
   cd src/mobile
   eas build --platform android --profile production
   ```

### Option 3: GitHub Actions

Set up automated APK building with GitHub Actions workflow.

## Expected APK Details

- **Name:** quran-mobile-release.apk
- **Size:** ~50-80 MB (includes SQLite database)
- **Features:**
  - Offline Quran text in 9 languages
  - Audio streaming capability
  - SQLite database with 22.4 MB of Quran data
  - React Native 0.73.x
  - Android API 21+ support

## Troubleshooting

If you encounter Java version issues:
1. Install Java 21: `apt install openjdk-21-jdk`
2. Set JAVA_HOME: `export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64`
3. Verify: `java -version` should show Java 21.x.x