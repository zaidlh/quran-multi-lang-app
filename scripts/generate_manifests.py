#!/usr/bin/env python3
"""
generate_manifests.py — Create audio manifest files with CDN fallbacks.

Generates JSON manifests for each reciter mapping surah/ayah numbers
to audio URLs from multiple CDN sources.

Usage:
    python scripts/generate_manifests.py
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RESOURCES_DIR = BASE_DIR / "resources"

RECITERS = [
    {
        "id": "mishary_rashid_alafasy",
        "name": "Mishary Rashid Alafasy",
        "name_ar": "مشاري بن راشد العفاسي",
        "style": "Murattal",
        "bitrate": "128kbps",
        "format": "mp3",
        "everyayah_path": "Alafasy_128kbps",
        "quranicaudio_path": "mishaari_raashid_al_3afaasee",
    },
    {
        "id": "abdul_basit_murattal",
        "name": "Abdul Basit Abdul Samad",
        "name_ar": "عبد الباسط عبد الصمد",
        "style": "Murattal",
        "bitrate": "192kbps",
        "format": "mp3",
        "everyayah_path": "Abdul_Basit_Murattal_192kbps",
        "quranicaudio_path": "abdul_basit_murattal",
    },
    {
        "id": "saad_al_ghamdi",
        "name": "Saad Al-Ghamdi",
        "name_ar": "سعد الغامدي",
        "style": "Murattal",
        "bitrate": "128kbps",
        "format": "mp3",
        "everyayah_path": "Saad_Al_Ghamdi_128kbps",
        "quranicaudio_path": "sa3d_al-ghaamidi",
    },
    {
        "id": "maher_al_muaiqly",
        "name": "Maher Al-Muaiqly",
        "name_ar": "ماهر المعيقلي",
        "style": "Murattal",
        "bitrate": "128kbps",
        "format": "mp3",
        "everyayah_path": "MauroHammad_128kbps",
        "quranicaudio_path": "maher_256kbps",
    },
]


def load_metadata() -> dict:
    """Load surah metadata."""
    path = RESOURCES_DIR / "text" / "metadata.json"
    return json.loads(path.read_text(encoding="utf-8"))


def generate_manifest(reciter: dict, metadata: dict) -> dict:
    """Generate a complete audio manifest for a reciter."""
    everyayah_base = f"https://everyayah.com/data/{reciter['everyayah_path']}"
    quranicaudio_base = f"https://download.quranicaudio.com/quran/{reciter['quranicaudio_path']}"

    manifest = {
        "version": "1.0.0",
        "reciter": {
            "id": reciter["id"],
            "name": reciter["name"],
            "name_ar": reciter["name_ar"],
            "style": reciter["style"],
            "bitrate": reciter["bitrate"],
            "format": reciter["format"],
        },
        "sources": {
            "everyayah": {
                "base_url": everyayah_base,
                "pattern": "{surah:03d}{ayah:03d}.mp3",
                "type": "ayah_by_ayah",
            },
            "quranicaudio": {
                "base_url": quranicaudio_base,
                "pattern": "{surah:03d}.mp3",
                "type": "full_surah",
            },
        },
        "surahs": [],
    }

    for surah in metadata["surahs"]:
        num = surah["number"]
        entry = {
            "number": num,
            "name": surah["name"],
            "name_en": surah["name_en"],
            "total_ayahs": surah["verses"],
            "full_surah_url": f"{quranicaudio_base}/{num:03d}.mp3",
            "ayah_urls": [
                f"{everyayah_base}/{num:03d}{ayah:03d}.mp3"
                for ayah in range(1, surah["verses"] + 1)
            ],
        }
        manifest["surahs"].append(entry)

    return manifest


def main():
    print("Generating audio manifests...")
    metadata = load_metadata()
    manifest_dir = RESOURCES_DIR / "audio" / "manifests"
    manifest_dir.mkdir(parents=True, exist_ok=True)

    for reciter in RECITERS:
        manifest = generate_manifest(reciter, metadata)
        output = manifest_dir / f"{reciter['id']}.json"
        output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

        total_urls = sum(len(s["ayah_urls"]) for s in manifest["surahs"])
        print(f"  {reciter['name']}: {len(manifest['surahs'])} surahs, {total_urls} ayah URLs")

    print(f"\nGenerated {len(RECITERS)} manifests in {manifest_dir}")


if __name__ == "__main__":
    main()
