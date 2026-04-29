#!/bin/bash

# Build APK using Docker with correct Java version

set -e

echo "🐳 Building APK with Docker (Java 21)..."

# Build Docker image
docker build -f Dockerfile.apk -t quran-apk-builder .

# Run container to build APK
docker run --rm -v $(pwd)/apk:/app/apk quran-apk-builder

# Check if APK was created
if [ -f "apk/quran-mobile-release.apk" ]; then
    echo "✅ APK built successfully!"
    echo "📱 File: apk/quran-mobile-release.apk"
    echo "📏 Size: $(du -h apk/quran-mobile-release.apk | cut -f1)"
    echo "🔍 SHA256: $(sha256sum apk/quran-mobile-release.apk | cut -d' ' -f1)"
else
    echo "❌ APK build failed"
    exit 1
fi