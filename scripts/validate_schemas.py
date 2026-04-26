#!/usr/bin/env python3
"""
validate_schemas.py — Validate JSON files against defined schemas.

Ensures all JSON files follow consistent structure with version numbers.
"""

import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RESOURCES_DIR = BASE_DIR / "resources"

errors = []


def validate_json_file(path: Path) -> bool:
    """Validate a JSON file is parseable and has version field."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, dict) and "version" not in data:
            errors.append(f"{path.relative_to(BASE_DIR)}: missing 'version' field")
            return False
        return True
    except json.JSONDecodeError as e:
        errors.append(f"{path.relative_to(BASE_DIR)}: invalid JSON - {e}")
        return False


def validate_metadata():
    """Validate metadata.json schema."""
    path = RESOURCES_DIR / "text" / "metadata.json"
    if not path.exists():
        errors.append("metadata.json not found")
        return

    data = json.loads(path.read_text(encoding="utf-8"))
    required_fields = ["version", "total_surahs", "total_ayahs", "surahs"]
    for field in required_fields:
        if field not in data:
            errors.append(f"metadata.json: missing required field '{field}'")

    for s in data.get("surahs", []):
        for field in ["number", "name", "name_en", "verses"]:
            if field not in s:
                errors.append(f"metadata.json: surah missing field '{field}'")
                break


def validate_translation_schema():
    """Validate translation file schemas."""
    text_dir = RESOURCES_DIR / "text"
    for lang_dir in text_dir.iterdir():
        if not lang_dir.is_dir():
            continue
        for json_file in lang_dir.glob("*.json"):
            if json_file.name.startswith("_"):
                continue
            validate_json_file(json_file)


def validate_audio_manifest_schema():
    """Validate audio manifest schemas."""
    manifest_dir = RESOURCES_DIR / "audio" / "manifests"
    if not manifest_dir.exists():
        return

    for mf in manifest_dir.glob("*.json"):
        data = json.loads(mf.read_text(encoding="utf-8"))
        if "reciter" not in data:
            errors.append(f"{mf.name}: missing 'reciter' field")
        if "surahs" not in data:
            errors.append(f"{mf.name}: missing 'surahs' field")


def main():
    print("Validating JSON schemas...")

    validate_metadata()
    validate_translation_schema()
    validate_audio_manifest_schema()

    # Validate all JSON files are parseable
    all_json = list(RESOURCES_DIR.rglob("*.json"))
    print(f"  Found {len(all_json)} JSON files")

    valid = 0
    for jf in all_json:
        if jf.name.startswith("_"):
            continue
        if validate_json_file(jf):
            valid += 1

    print(f"  Valid: {valid}/{len(all_json)}")

    if errors:
        print(f"\nSchema validation FAILED ({len(errors)} errors):")
        for e in errors:
            print(f"  ✗ {e}")
        sys.exit(1)
    else:
        print("\nSchema validation PASSED")
        sys.exit(0)


if __name__ == "__main__":
    main()
