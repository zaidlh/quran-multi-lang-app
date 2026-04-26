#!/usr/bin/env python3
"""
generate_sqlite.py — Compile all text resources into a single SQLite database.

Generates an offline-ready SQLite database containing:
- Arabic Quran text (Uthmani)
- All available translations
- Surah metadata
- Word-by-word data (if available)

Usage:
    python scripts/generate_sqlite.py [--output quran.db]
"""

import argparse
import json
import sqlite3
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
RESOURCES_DIR = BASE_DIR / "resources"


def create_tables(conn: sqlite3.Connection):
    """Create all database tables."""
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS surahs (
            number INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            name_en TEXT NOT NULL,
            name_translation TEXT,
            total_verses INTEGER NOT NULL,
            revelation_type TEXT,
            revelation_order INTEGER,
            ruku_count INTEGER,
            page_start INTEGER
        );

        CREATE TABLE IF NOT EXISTS juz (
            number INTEGER PRIMARY KEY,
            surah_start INTEGER NOT NULL,
            ayah_start INTEGER NOT NULL,
            surah_end INTEGER NOT NULL,
            ayah_end INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS verses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            surah_number INTEGER NOT NULL,
            ayah_number INTEGER NOT NULL,
            text_uthmani TEXT NOT NULL,
            UNIQUE(surah_number, ayah_number),
            FOREIGN KEY (surah_number) REFERENCES surahs(number)
        );

        CREATE TABLE IF NOT EXISTS translations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            surah_number INTEGER NOT NULL,
            ayah_number INTEGER NOT NULL,
            language TEXT NOT NULL,
            translator TEXT,
            text TEXT NOT NULL,
            UNIQUE(surah_number, ayah_number, language),
            FOREIGN KEY (surah_number) REFERENCES surahs(number)
        );

        CREATE TABLE IF NOT EXISTS word_by_word (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            surah_number INTEGER NOT NULL,
            ayah_number INTEGER NOT NULL,
            position INTEGER NOT NULL,
            arabic TEXT NOT NULL,
            transliteration TEXT,
            translation TEXT,
            root TEXT,
            lemma TEXT,
            grammar_tag TEXT,
            UNIQUE(surah_number, ayah_number, position)
        );

        CREATE TABLE IF NOT EXISTS names_of_allah (
            number INTEGER PRIMARY KEY,
            arabic TEXT NOT NULL,
            transliteration TEXT NOT NULL,
            meaning TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_verses_surah ON verses(surah_number);
        CREATE INDEX IF NOT EXISTS idx_translations_surah_lang ON translations(surah_number, language);
        CREATE INDEX IF NOT EXISTS idx_wbw_surah ON word_by_word(surah_number, ayah_number);
    """)


def load_metadata(conn: sqlite3.Connection):
    """Load surah metadata."""
    path = RESOURCES_DIR / "text" / "metadata.json"
    if not path.exists():
        print("  Warning: metadata.json not found")
        return

    data = json.loads(path.read_text(encoding="utf-8"))
    for s in data["surahs"]:
        conn.execute(
            "INSERT OR REPLACE INTO surahs VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (s["number"], s["name"], s["name_en"], s.get("name_translation"),
             s["verses"], s.get("revelation_type"), s.get("revelation_order"),
             s.get("ruku_count"), s.get("page_start")),
        )
    print(f"  Loaded {len(data['surahs'])} surahs")


def load_arabic_text(conn: sqlite3.Connection):
    """Load Arabic Quran text."""
    path = RESOURCES_DIR / "text" / "ar" / "quran_uthmani.json"
    if not path.exists():
        print("  Warning: Arabic text not found")
        return

    data = json.loads(path.read_text(encoding="utf-8"))
    count = 0
    for surah in data.get("surahs", []):
        for verse in surah.get("verses", []):
            conn.execute(
                "INSERT OR REPLACE INTO verses (surah_number, ayah_number, text_uthmani) VALUES (?, ?, ?)",
                (surah["number"], verse["number"], verse["text"]),
            )
            count += 1
    print(f"  Loaded {count} Arabic verses")


def load_translations(conn: sqlite3.Connection):
    """Load all available translations."""
    text_dir = RESOURCES_DIR / "text"
    for lang_dir in sorted(text_dir.iterdir()):
        if not lang_dir.is_dir() or lang_dir.name == "ar":
            continue

        trans_file = lang_dir / "translation.json"
        if not trans_file.exists():
            continue

        data = json.loads(trans_file.read_text(encoding="utf-8"))
        if not data.get("surahs"):
            continue

        translator = data.get("translator", "")
        lang = data.get("language", lang_dir.name)
        count = 0

        for surah in data["surahs"]:
            for verse in surah.get("verses", []):
                text = verse.get("translation", verse.get("text", ""))
                if text:
                    conn.execute(
                        "INSERT OR REPLACE INTO translations VALUES (NULL, ?, ?, ?, ?, ?)",
                        (surah["number"], verse["number"], lang, translator, text),
                    )
                    count += 1

        print(f"  Loaded {count} {data.get('language_name', lang)} verses")


def load_word_by_word(conn: sqlite3.Connection):
    """Load word-by-word data."""
    wbw_dir = RESOURCES_DIR / "wordbyword"
    files = sorted(wbw_dir.glob("surah_*.json"))
    total = 0

    for f in files:
        data = json.loads(f.read_text(encoding="utf-8"))
        for ayah in data.get("ayahs", []):
            for word in ayah.get("words", []):
                conn.execute(
                    "INSERT OR REPLACE INTO word_by_word VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (data["surah"], ayah["number"], word["position"],
                     word["arabic"], word.get("transliteration"),
                     word.get("translation"), word.get("root"),
                     word.get("lemma"), word.get("tag")),
                )
                total += 1

    if total:
        print(f"  Loaded {total} word-by-word entries")


def load_names_of_allah(conn: sqlite3.Connection):
    """Load 99 Names of Allah."""
    path = RESOURCES_DIR / "supplementary" / "99_names_of_allah.json"
    if not path.exists():
        return

    data = json.loads(path.read_text(encoding="utf-8"))
    for name in data.get("names", []):
        conn.execute(
            "INSERT OR REPLACE INTO names_of_allah VALUES (?, ?, ?, ?)",
            (name["number"], name["arabic"], name["transliteration"], name["meaning"]),
        )
    print(f"  Loaded {len(data['names'])} Names of Allah")


def main():
    parser = argparse.ArgumentParser(description="Generate SQLite database from Quran resources")
    parser.add_argument("--output", "-o", default="quran.db", help="Output database path")
    args = parser.parse_args()

    output_path = Path(args.output)
    if output_path.exists():
        output_path.unlink()

    print(f"Generating SQLite database: {output_path}")

    conn = sqlite3.connect(str(output_path))
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")

    try:
        create_tables(conn)
        load_metadata(conn)
        load_arabic_text(conn)
        load_translations(conn)
        load_word_by_word(conn)
        load_names_of_allah(conn)
        conn.commit()

        # Print stats
        cursor = conn.execute("SELECT COUNT(*) FROM verses")
        verse_count = cursor.fetchone()[0]
        cursor = conn.execute("SELECT COUNT(DISTINCT language) FROM translations")
        lang_count = cursor.fetchone()[0]
        cursor = conn.execute("SELECT COUNT(*) FROM translations")
        trans_count = cursor.fetchone()[0]

        size_mb = output_path.stat().st_size / (1024 * 1024)

        print(f"\nDatabase generated successfully!")
        print(f"  Arabic verses: {verse_count}")
        print(f"  Languages: {lang_count}")
        print(f"  Translation entries: {trans_count}")
        print(f"  File size: {size_mb:.1f} MB")

    finally:
        conn.close()


if __name__ == "__main__":
    main()
