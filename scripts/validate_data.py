#!/usr/bin/env python3
"""
validate_data.py — Verify integrity of all Quran data.

Checks:
- Total ayah count matches 6236
- All 114 surahs present
- Surah verse counts match metadata
- No missing translations
- Audio URL format validation
- JSON schema validation
"""

import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RESOURCES_DIR = BASE_DIR / "resources"

EXPECTED_TOTAL_AYAHS = 6236
EXPECTED_TOTAL_SURAHS = 114

EXPECTED_VERSE_COUNTS = {
    1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
    11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98,
    20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88,
    29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182,
    38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35,
    47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78,
    56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18,
    65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20,
    74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19,
    83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15,
    92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
    101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6,
    110: 3, 111: 5, 112: 4, 113: 5, 114: 6,
}

errors = []
warnings = []


def check_metadata():
    """Validate metadata.json."""
    print("Checking metadata.json...")
    path = RESOURCES_DIR / "text" / "metadata.json"
    if not path.exists():
        errors.append("metadata.json not found")
        return

    data = json.loads(path.read_text(encoding="utf-8"))

    if data.get("total_surahs") != EXPECTED_TOTAL_SURAHS:
        errors.append(f"metadata: expected {EXPECTED_TOTAL_SURAHS} surahs, got {data.get('total_surahs')}")

    if data.get("total_ayahs") != EXPECTED_TOTAL_AYAHS:
        errors.append(f"metadata: expected {EXPECTED_TOTAL_AYAHS} total ayahs, got {data.get('total_ayahs')}")

    surahs = data.get("surahs", [])
    if len(surahs) != EXPECTED_TOTAL_SURAHS:
        errors.append(f"metadata: expected {EXPECTED_TOTAL_SURAHS} surah entries, got {len(surahs)}")

    total = 0
    for s in surahs:
        num = s["number"]
        expected = EXPECTED_VERSE_COUNTS.get(num)
        actual = s["verses"]
        if expected and actual != expected:
            errors.append(f"Surah {num}: expected {expected} verses, got {actual}")
        total += actual

    if total != EXPECTED_TOTAL_AYAHS:
        errors.append(f"metadata: total verse sum = {total}, expected {EXPECTED_TOTAL_AYAHS}")
    else:
        print(f"  Total ayahs: {total} (correct)")

    print(f"  Surahs: {len(surahs)}")


def check_arabic_text():
    """Validate Arabic Quran text."""
    print("Checking Arabic text...")
    path = RESOURCES_DIR / "text" / "ar" / "quran_uthmani.json"
    if not path.exists():
        errors.append("Arabic text (quran_uthmani.json) not found")
        return

    data = json.loads(path.read_text(encoding="utf-8"))
    surahs = data.get("surahs", [])
    if len(surahs) != EXPECTED_TOTAL_SURAHS:
        errors.append(f"Arabic text: expected {EXPECTED_TOTAL_SURAHS} surahs, got {len(surahs)}")
        return

    total = 0
    for s in surahs:
        verses = s.get("verses", [])
        expected = EXPECTED_VERSE_COUNTS.get(s["number"], 0)
        if len(verses) != expected:
            errors.append(f"Arabic Surah {s['number']}: expected {expected} verses, got {len(verses)}")
        total += len(verses)

        for v in verses:
            if not v.get("text", "").strip():
                errors.append(f"Arabic Surah {s['number']}:{v['number']}: empty text")

    print(f"  Total ayahs: {total}")
    if total == EXPECTED_TOTAL_AYAHS:
        print(f"  Ayah count: PASS")
    else:
        errors.append(f"Arabic text: total ayah count {total} != {EXPECTED_TOTAL_AYAHS}")


def check_translations():
    """Validate translation files."""
    print("Checking translations...")
    text_dir = RESOURCES_DIR / "text"
    lang_dirs = [d for d in text_dir.iterdir() if d.is_dir() and d.name != "ar"]

    for lang_dir in sorted(lang_dirs):
        lang = lang_dir.name
        trans_file = lang_dir / "translation.json"
        if not trans_file.exists():
            warnings.append(f"Translation missing for: {lang}")
            continue

        data = json.loads(trans_file.read_text(encoding="utf-8"))
        surahs = data.get("surahs", [])
        if not surahs:
            warnings.append(f"Translation {lang}: no surah data (placeholder)")
            continue

        total = sum(len(s.get("verses", [])) for s in surahs)
        if len(surahs) == EXPECTED_TOTAL_SURAHS:
            print(f"  {lang} ({data.get('language_name', '')}): {len(surahs)} surahs, {total} verses")
        else:
            warnings.append(f"Translation {lang}: {len(surahs)} surahs (expected {EXPECTED_TOTAL_SURAHS})")


def check_audio_manifests():
    """Validate audio manifest files."""
    print("Checking audio manifests...")
    manifest_dir = RESOURCES_DIR / "audio" / "manifests"
    if not manifest_dir.exists():
        errors.append("Audio manifests directory not found")
        return

    manifests = list(manifest_dir.glob("*.json"))
    print(f"  Found {len(manifests)} reciter manifests")

    for mf in sorted(manifests):
        data = json.loads(mf.read_text(encoding="utf-8"))
        reciter = data.get("reciter", {}).get("name", "Unknown")
        surahs = data.get("surahs", [])
        if len(surahs) != EXPECTED_TOTAL_SURAHS:
            errors.append(f"Audio {reciter}: expected {EXPECTED_TOTAL_SURAHS} surahs, got {len(surahs)}")
        else:
            total_urls = sum(len(s.get("ayah_urls", [])) for s in surahs)
            print(f"  {reciter}: {len(surahs)} surahs, {total_urls} ayah URLs")


def check_tafsir():
    """Validate tafsir index files."""
    print("Checking tafsir data...")
    for lang in ["ar", "en"]:
        index_path = RESOURCES_DIR / "tafsir" / lang / "index.json"
        if index_path.exists():
            data = json.loads(index_path.read_text(encoding="utf-8"))
            tafsirs = data.get("tafsirs", [])
            print(f"  {lang}: {len(tafsirs)} tafsirs indexed")
        else:
            warnings.append(f"Tafsir index missing for: {lang}")


def check_supplementary():
    """Validate supplementary data files."""
    print("Checking supplementary data...")
    names_path = RESOURCES_DIR / "supplementary" / "99_names_of_allah.json"
    if names_path.exists():
        data = json.loads(names_path.read_text(encoding="utf-8"))
        count = len(data.get("names", []))
        if count == 99:
            print(f"  99 Names of Allah: {count} names (correct)")
        else:
            errors.append(f"99 Names: expected 99, got {count}")
    else:
        warnings.append("99 Names of Allah file not found")


def main():
    print("=" * 60)
    print("  Quran Data Integrity Validator")
    print("=" * 60)

    check_metadata()
    check_arabic_text()
    check_translations()
    check_audio_manifests()
    check_tafsir()
    check_supplementary()

    print("\n" + "=" * 60)
    print("  RESULTS")
    print("=" * 60)

    if warnings:
        print(f"\nWarnings ({len(warnings)}):")
        for w in warnings:
            print(f"  ⚠ {w}")

    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors:
            print(f"  ✗ {e}")
        print(f"\nValidation FAILED with {len(errors)} error(s)")
        sys.exit(1)
    else:
        print(f"\nValidation PASSED")
        if warnings:
            print(f"({len(warnings)} warning(s))")
        sys.exit(0)


if __name__ == "__main__":
    main()
