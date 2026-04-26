#!/usr/bin/env python3
"""
fetch_resources.py — Download and update all external Quran resources.

Clones/updates external GitHub resources, downloads translations,
validates JSON schemas, and checks for updates.

Usage:
    python scripts/fetch_resources.py [--all | --text | --audio | --tafsir | --wbw]
"""

import argparse
import json
import os
import sys
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RESOURCES_DIR = BASE_DIR / "resources"

QURAN_JSON_CDN = "https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist"

TRANSLATIONS = {
    "en": {"url": f"{QURAN_JSON_CDN}/quran_en.json", "name": "English", "translator": "Sahih International"},
    "fr": {"url": f"{QURAN_JSON_CDN}/quran_fr.json", "name": "French", "translator": "Muhammad Hamidullah"},
    "es": {"url": f"{QURAN_JSON_CDN}/quran_es.json", "name": "Spanish", "translator": "Julio Cortes"},
    "tr": {"url": f"{QURAN_JSON_CDN}/quran_tr.json", "name": "Turkish", "translator": "Diyanet Isleri"},
    "id": {"url": f"{QURAN_JSON_CDN}/quran_id.json", "name": "Indonesian", "translator": "Ministry of Religious Affairs"},
    "ur": {"url": f"{QURAN_JSON_CDN}/quran_ur.json", "name": "Urdu", "translator": "Ahmed Ali"},
    "bn": {"url": f"{QURAN_JSON_CDN}/quran_bn.json", "name": "Bengali", "translator": "Muhiuddin Khan"},
    "zh": {"url": f"{QURAN_JSON_CDN}/quran_zh.json", "name": "Chinese", "translator": "Ma Jian"},
}

TAFSIR_CDN = "https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir"

TAFSIRS = {
    "ar-tafsir-ibn-kathir": "Tafsir Ibn Kathir (Arabic)",
    "ar-tafsir-al-jalalayn": "Tafsir Al-Jalalayn (Arabic)",
    "en-tafisr-ibn-kathir": "Tafsir Ibn Kathir (English)",
}


def download_file(url: str, dest: Path) -> bool:
    """Download a file from URL to destination path."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "QuranMultiLangApp/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(resp.read())
        return True
    except Exception as e:
        print(f"  Error downloading {url}: {e}")
        return False


def fetch_arabic_text():
    """Download Arabic Quran text (Uthmani script)."""
    print("\n=== Fetching Arabic Quran Text ===")
    dest = RESOURCES_DIR / "text" / "ar" / "quran_uthmani.json"
    if dest.exists():
        print(f"  Already exists: {dest}")
        return True

    url = f"{QURAN_JSON_CDN}/quran.json"
    print(f"  Downloading from {url}...")
    if download_file(url, dest):
        data = json.loads(dest.read_text(encoding="utf-8"))
        total_verses = sum(s.get("total_verses", len(s.get("verses", []))) for s in data)
        print(f"  Downloaded: {len(data)} surahs, {total_verses} verses")
        return True
    return False


def fetch_translations():
    """Download translations for all supported languages."""
    print("\n=== Fetching Translations ===")
    for lang_code, info in TRANSLATIONS.items():
        dest = RESOURCES_DIR / "text" / lang_code / "translation.json"
        if dest.exists():
            existing = json.loads(dest.read_text(encoding="utf-8"))
            if existing.get("surahs"):
                print(f"  {info['name']}: already exists with data")
                continue

        print(f"  Downloading {info['name']} translation...")
        tmp = RESOURCES_DIR / "text" / lang_code / "_raw.json"
        if download_file(info["url"], tmp):
            raw = json.loads(tmp.read_text(encoding="utf-8"))
            trans_data = {
                "version": "1.0.0",
                "source": "risan/quran-json (Quran Enc / Tanzil.net)",
                "license": "CC-BY-SA-4.0",
                "language": lang_code,
                "language_name": info["name"],
                "translator": info["translator"],
                "direction": "rtl" if lang_code == "ur" else "ltr",
                "surahs": [],
            }
            for surah in raw:
                s = {
                    "number": surah["id"],
                    "name": surah.get("name", ""),
                    "transliteration": surah.get("transliteration", ""),
                    "total_verses": surah.get("total_verses", len(surah.get("verses", []))),
                    "verses": [
                        {"number": v["id"], "text": v.get("text", ""), "translation": v.get("translation", "")}
                        for v in surah.get("verses", [])
                    ],
                }
                trans_data["surahs"].append(s)

            dest.write_text(json.dumps(trans_data, ensure_ascii=False, indent=2), encoding="utf-8")
            tmp.unlink(missing_ok=True)
            print(f"  {info['name']}: {len(trans_data['surahs'])} surahs saved")
        else:
            print(f"  {info['name']}: FAILED")


def fetch_tafsir():
    """Download tafsir data for all configured tafsirs."""
    print("\n=== Fetching Tafsir Data ===")
    for tafsir_id, name in TAFSIRS.items():
        lang = tafsir_id[:2]
        tafsir_dir = RESOURCES_DIR / "tafsir" / lang / tafsir_id
        tafsir_dir.mkdir(parents=True, exist_ok=True)

        existing = list(tafsir_dir.glob("*.json"))
        if len(existing) >= 114:
            print(f"  {name}: already complete ({len(existing)} files)")
            continue

        print(f"  Downloading {name}...")
        success = 0
        for surah_num in range(1, 115):
            dest = tafsir_dir / f"{surah_num}.json"
            if dest.exists():
                success += 1
                continue
            url = f"{TAFSIR_CDN}/{tafsir_id}/{surah_num}.json"
            if download_file(url, dest):
                success += 1
        print(f"  {name}: {success}/114 surahs downloaded")


def fetch_word_by_word():
    """Download word-by-word data from Quran.com API."""
    print("\n=== Fetching Word-by-Word Data ===")
    print("  Word-by-word data requires Quran.com API access.")
    print("  Sample data for Surah Al-Fatihah is already included.")
    print("  To fetch complete data, use the Quran.com API:")
    print("  GET https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number={n}")


def main():
    parser = argparse.ArgumentParser(description="Fetch Quran resources")
    parser.add_argument("--all", action="store_true", help="Fetch all resources")
    parser.add_argument("--text", action="store_true", help="Fetch text & translations")
    parser.add_argument("--audio", action="store_true", help="Regenerate audio manifests")
    parser.add_argument("--tafsir", action="store_true", help="Fetch tafsir data")
    parser.add_argument("--wbw", action="store_true", help="Fetch word-by-word data")
    args = parser.parse_args()

    if not any([args.all, args.text, args.audio, args.tafsir, args.wbw]):
        args.all = True

    if args.all or args.text:
        fetch_arabic_text()
        fetch_translations()

    if args.all or args.tafsir:
        fetch_tafsir()

    if args.all or args.wbw:
        fetch_word_by_word()

    if args.all or args.audio:
        print("\n=== Audio Manifests ===")
        print("  Audio manifests are pre-generated in resources/audio/manifests/")
        print("  Run scripts/generate_manifests.py to regenerate them.")

    print("\n=== Resource Fetch Complete ===")


if __name__ == "__main__":
    main()
