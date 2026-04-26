import json
import os
from typing import Optional

import strawberry

RESOURCES_PATH = os.environ.get("RESOURCES_PATH", os.path.join(os.path.dirname(__file__), "..", "..", "..", "resources"))


@strawberry.type
class Verse:
    number: int
    text: str
    translation: Optional[str] = None


@strawberry.type
class Surah:
    number: int
    name: str
    name_en: str
    name_translation: str
    revelation_type: str
    verses_count: int


def _load_surahs() -> list[dict]:
    path = os.path.join(RESOURCES_PATH, "text", "metadata.json")
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return data.get("surahs", [])


def _load_arabic(surah_number: int) -> list[dict]:
    path = os.path.join(RESOURCES_PATH, "text", "ar", f"{surah_number}.json")
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return data.get("verses", [])


def _load_translation(surah_number: int, lang: str) -> list[dict]:
    path = os.path.join(RESOURCES_PATH, "text", lang, f"{surah_number}.json")
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    return data.get("verses", [])


@strawberry.type
class Query:
    @strawberry.field
    def surahs(self) -> list[Surah]:
        raw = _load_surahs()
        return [
            Surah(
                number=s["number"],
                name=s.get("name", ""),
                name_en=s.get("name_en", ""),
                name_translation=s.get("name_translation", ""),
                revelation_type=s.get("revelation_type", ""),
                verses_count=s.get("verses", 0),
            )
            for s in raw
        ]

    @strawberry.field
    def surah(self, number: int) -> Optional[Surah]:
        raw = _load_surahs()
        s = next((s for s in raw if s["number"] == number), None)
        if not s:
            return None
        return Surah(
            number=s["number"],
            name=s.get("name", ""),
            name_en=s.get("name_en", ""),
            name_translation=s.get("name_translation", ""),
            revelation_type=s.get("revelation_type", ""),
            verses_count=s.get("verses", 0),
        )

    @strawberry.field
    def verses(self, surah: int, lang: str = "en") -> list[Verse]:
        arabic = _load_arabic(surah)
        translations = _load_translation(surah, lang)
        trans_map = {v["number"]: v.get("translation", v.get("text", "")) for v in translations}
        return [
            Verse(
                number=v["number"],
                text=v["text"],
                translation=trans_map.get(v["number"]),
            )
            for v in arabic
        ]

    @strawberry.field
    def verse(self, surah: int, ayah: int, lang: str = "en") -> Optional[Verse]:
        arabic = _load_arabic(surah)
        translations = _load_translation(surah, lang)
        ar_verse = next((v for v in arabic if v["number"] == ayah), None)
        if not ar_verse:
            return None
        trans = next((v for v in translations if v["number"] == ayah), None)
        return Verse(
            number=ar_verse["number"],
            text=ar_verse["text"],
            translation=trans.get("translation", trans.get("text", "")) if trans else None,
        )


schema = strawberry.Schema(query=Query)
