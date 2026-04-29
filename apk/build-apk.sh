#!/bin/bash

# APK Build and Copy Script
# This script builds the Android APK and copies it to the apk/ folder

set -e

echo "🔨 Building Quran Mobile APK..."

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -gt 21 ]; then
    echo "❌ Error: Java $JAVA_VERSION detected. React Native requires Java 21 or earlier."
    echo "Please install Java 21: apt install openjdk-21-jdk"
    echo "And set: export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64"
    exit 1
fi

# Navigate to mobile app directory
cd "$(dirname "$0")/../src/mobile"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate SQLite database
echo "🗄️ Generating SQLite database..."
cd ../..
python scripts/generate_sqlite.py --output src/mobile/assets/quran.db

# Build APK
echo "🏗️ Building Android APK..."
cd src/mobile
npx react-native run-android --release

# Copy APK to apk folder
APK_SOURCE="android/app/build/outputs/apk/release/app-release.apk"
APK_DEST="../apk/quran-mobile-release.apk"

if [ -f "$APK_SOURCE" ]; then
    cp "$APK_SOURCE" "$APK_DEST"
    echo "✅ APK built and copied to: $APK_DEST"
    echo "📱 File size: $(du -h "$APK_DEST" | cut -f1)"
else
    echo "❌ APK build failed - file not found at $APK_SOURCE"
    exit 1
fi

echo "🎉 APK ready for distribution!"