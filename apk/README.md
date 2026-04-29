# APK Build Folder

This folder contains Android APK files for the Quran Multi-Language Mobile App.

## Current Status

⚠️ **APK Build Requires Java 21** - Environment has Java 25

The APK cannot be built in this environment due to Java version incompatibility:
- **Required:** Java 21 (for React Native 0.73.x)
- **Current:** Java 25.0.2 (incompatible)

## How to Build APK

### Option 1: Build Locally (Recommended)

**Prerequisites:**
- Java 21 JDK (download from [Adoptium](https://adoptium.net/))
- Android SDK with platform-tools and build-tools 34.0.0
- Node.js 18+

**Steps:**
```bash
# Set Java 21 as default
export JAVA_HOME=/path/to/java21
export PATH=$JAVA_HOME/bin:$PATH

# Verify Java version
java -version  # Should show Java 21

# Build APK
./apk/build-apk.sh
```

### Option 2: Use Docker (Alternative)

```bash
# Build with Docker (requires Docker)
./build-apk-docker.sh
```

### Option 3: Manual Build

```bash
cd src/mobile
npm install
cd ../..
python scripts/generate_sqlite.py --output src/mobile/assets/quran.db
cd src/mobile
npx react-native run-android --release
```

## APK Details

- **Expected Name:** `quran-mobile-release.apk`
- **Expected Size:** ~50-80 MB
- **Features:**
  - Offline Quran text in 9 languages
  - Audio streaming capability
  - SQLite database with 22.4 MB of Quran data
  - React Native 0.73.x
  - Android API 21+ support

## Troubleshooting

**Java Version Issues:**
```bash
# Install Java 21
# Ubuntu/Debian:
sudo apt install openjdk-21-jdk

# Set environment variables:
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

**Android SDK Issues:**
```bash
# Install Android SDK components
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

## Current Files

- `quran-mobile-release.apk` - Placeholder file (replace with real APK)
- `build-apk.sh` - Local build script
- `README.md` - This documentation

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