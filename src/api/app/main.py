"""
Quran Multi-Language API — FastAPI wrapper for aggregated Quran data.

Endpoints:
    GET /                     → API info
    GET /surahs               → List all 114 surahs
    GET /surahs/{number}      → Surah metadata
    GET /ayahs/{surah}/{ayah} → Single ayah with Arabic + translation
    GET /surah/{number}/text  → Full Arabic text of a surah
    GET /surah/{number}/translation?lang=en → Translation for a surah
    GET /search?q=...&lang=en → Search translations
    GET /reciters             → List available reciters
    GET /audio/{reciter}/{surah} → Audio URLs for a surah
    GET /names                → 99 Names of Allah
"""

import json
from functools import lru_cache
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Quran Multi-Language API",
    description="REST API serving Quran text, translations, audio manifests, and supplementary Islamic data.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

RESOURCES_DIR = Path(__file__).resolve().parent.parent.parent.parent / "resources"


@lru_cache(maxsize=32)
def _load_json(path: str) -> dict | list:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def load_metadata() -> dict:
    return _load_json(str(RESOURCES_DIR / "text" / "metadata.json"))


def load_arabic() -> dict:
    return _load_json(str(RESOURCES_DIR / "text" / "ar" / "quran_uthmani.json"))


def load_translation(lang: str) -> dict:
    path = RESOURCES_DIR / "text" / lang / "translation.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail=f"Translation not available for: {lang}")
    return _load_json(str(path))


class SurahInfo(BaseModel):
    number: int
    name: str
    name_en: str
    name_translation: str
    verses: int
    revelation_type: str
    revelation_order: int


class AyahResponse(BaseModel):
    surah: int
    ayah: int
    arabic: str
    translation: Optional[str] = None
    language: str = "en"


class SearchResult(BaseModel):
    surah: int
    surah_name: str
    ayah: int
    arabic: str
    translation: str


@app.get("/")
async def root():
    return {
        "name": "Quran Multi-Language API",
        "version": "1.0.0",
        "total_surahs": 114,
        "total_ayahs": 6236,
        "endpoints": [
            "/surahs",
            "/surahs/{number}",
            "/ayahs/{surah}/{ayah}",
            "/surah/{number}/text",
            "/surah/{number}/translation",
            "/search",
            "/reciters",
            "/audio/{reciter}/{surah}",
            "/names",
        ],
    }


@app.get("/surahs", response_model=list[SurahInfo])
async def list_surahs():
    meta = load_metadata()
    return meta["surahs"]


@app.get("/surahs/{number}", response_model=SurahInfo)
async def get_surah(number: int):
    if number < 1 or number > 114:
        raise HTTPException(status_code=404, detail="Surah number must be 1-114")
    meta = load_metadata()
    surah = next((s for s in meta["surahs"] if s["number"] == number), None)
    if not surah:
        raise HTTPException(status_code=404, detail="Surah not found")
    return surah


@app.get("/ayahs/{surah}/{ayah}", response_model=AyahResponse)
async def get_ayah(surah: int, ayah: int, lang: str = Query("en")):
    ar_data = load_arabic()
    ar_surah = next((s for s in ar_data["surahs"] if s["number"] == surah), None)
    if not ar_surah:
        raise HTTPException(status_code=404, detail="Surah not found")

    ar_verse = next((v for v in ar_surah["verses"] if v["number"] == ayah), None)
    if not ar_verse:
        raise HTTPException(status_code=404, detail="Ayah not found")

    translation_text = None
    try:
        trans_data = load_translation(lang)
        trans_surah = next((s for s in trans_data["surahs"] if s["number"] == surah), None)
        if trans_surah:
            trans_verse = next((v for v in trans_surah["verses"] if v["number"] == ayah), None)
            if trans_verse:
                translation_text = trans_verse.get("translation") or trans_verse.get("text")
    except HTTPException:
        pass

    return AyahResponse(
        surah=surah,
        ayah=ayah,
        arabic=ar_verse["text"],
        translation=translation_text,
        language=lang,
    )


@app.get("/surah/{number}/text")
async def get_surah_text(number: int):
    ar_data = load_arabic()
    surah = next((s for s in ar_data["surahs"] if s["number"] == number), None)
    if not surah:
        raise HTTPException(status_code=404, detail="Surah not found")
    return {"surah": number, "verses": surah["verses"]}


@app.get("/surah/{number}/translation")
async def get_surah_translation(number: int, lang: str = Query("en")):
    trans_data = load_translation(lang)
    surah = next((s for s in trans_data["surahs"] if s["number"] == number), None)
    if not surah:
        raise HTTPException(status_code=404, detail="Surah not found in translation")
    return {"surah": number, "language": lang, "verses": surah["verses"]}


@app.get("/search")
async def search(q: str = Query(..., min_length=2), lang: str = Query("en"), limit: int = Query(50, le=100)):
    trans_data = load_translation(lang)
    ar_data = load_arabic()
    meta = load_metadata()
    query = q.lower()
    results: list[dict] = []

    for trans_surah in trans_data.get("surahs", []):
        ar_surah = next((s for s in ar_data["surahs"] if s["number"] == trans_surah["number"]), None)
        surah_meta = next((s for s in meta["surahs"] if s["number"] == trans_surah["number"]), None)

        for verse in trans_surah.get("verses", []):
            text = verse.get("translation") or verse.get("text", "")
            if query in text.lower():
                ar_verse = next(
                    (v for v in (ar_surah or {}).get("verses", []) if v["number"] == verse["number"]),
                    None,
                )
                results.append({
                    "surah": trans_surah["number"],
                    "surah_name": surah_meta["name_en"] if surah_meta else "",
                    "ayah": verse["number"],
                    "arabic": ar_verse["text"] if ar_verse else "",
                    "translation": text,
                })
                if len(results) >= limit:
                    break
        if len(results) >= limit:
            break

    return {"results": results, "total": len(results), "query": q}


@app.get("/reciters")
async def list_reciters():
    manifest_dir = RESOURCES_DIR / "audio" / "manifests"
    reciters = []
    for mf in sorted(manifest_dir.glob("*.json")):
        data = json.loads(mf.read_text(encoding="utf-8"))
        reciters.append(data["reciter"])
    return {"reciters": reciters}


@app.get("/audio/{reciter_id}/{surah}")
async def get_audio(reciter_id: str, surah: int):
    manifest_path = RESOURCES_DIR / "audio" / "manifests" / f"{reciter_id}.json"
    if not manifest_path.exists():
        raise HTTPException(status_code=404, detail="Reciter not found")

    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    surah_data = next((s for s in data["surahs"] if s["number"] == surah), None)
    if not surah_data:
        raise HTTPException(status_code=404, detail="Surah not found")

    return {
        "reciter": data["reciter"],
        "surah": surah,
        "full_surah_url": surah_data["full_surah_url"],
        "ayah_count": surah_data["total_ayahs"],
        "ayah_urls": surah_data["ayah_urls"],
    }


@app.get("/names")
async def names_of_allah():
    path = RESOURCES_DIR / "supplementary" / "99_names_of_allah.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Data not found")
    return _load_json(str(path))
