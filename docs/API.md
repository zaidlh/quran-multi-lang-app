# API Documentation

REST API documentation for the Quran Multi-Language API (FastAPI).

**Base URL:** `http://localhost:8000`

**Interactive Docs:** `http://localhost:8000/docs` (Swagger UI)

---

## Endpoints

### GET `/`
API information and available endpoints.

**Response:**
```json
{
  "name": "Quran Multi-Language API",
  "version": "1.0.0",
  "total_surahs": 114,
  "total_ayahs": 6236,
  "endpoints": ["/surahs", "/surahs/{number}", ...]
}
```

---

### GET `/surahs`
List all 114 surahs with metadata.

**Response:**
```json
[
  {
    "number": 1,
    "name": "الفاتحة",
    "name_en": "Al-Fatihah",
    "name_translation": "The Opening",
    "verses": 7,
    "revelation_type": "Meccan",
    "revelation_order": 5
  },
  ...
]
```

---

### GET `/surahs/{number}`
Get metadata for a specific surah.

**Parameters:**
- `number` (path, int): Surah number (1-114)

**Response:** Same structure as single item from `/surahs`

**Errors:** `404` if surah number is out of range

---

### GET `/ayahs/{surah}/{ayah}`
Get a specific ayah with Arabic text and translation.

**Parameters:**
- `surah` (path, int): Surah number (1-114)
- `ayah` (path, int): Ayah number
- `lang` (query, string, default: "en"): Translation language code

**Response:**
```json
{
  "surah": 1,
  "ayah": 1,
  "arabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  "translation": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
  "language": "en"
}
```

---

### GET `/surah/{number}/text`
Get the full Arabic text of a surah.

**Parameters:**
- `number` (path, int): Surah number

**Response:**
```json
{
  "surah": 1,
  "verses": [
    {"number": 1, "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"},
    ...
  ]
}
```

---

### GET `/surah/{number}/translation`
Get the translation of a surah.

**Parameters:**
- `number` (path, int): Surah number
- `lang` (query, string, default: "en"): Language code

**Available languages:** `en`, `fr`, `es`, `tr`, `id`, `ur`, `bn`

---

### GET `/search`
Search in translations.

**Parameters:**
- `q` (query, string, required): Search query (min 2 characters)
- `lang` (query, string, default: "en"): Language to search in
- `limit` (query, int, default: 50, max: 100): Max results

**Response:**
```json
{
  "results": [
    {
      "surah": 2,
      "surah_name": "Al-Baqarah",
      "ayah": 143,
      "arabic": "...",
      "translation": "And thus we have made you a just community..."
    }
  ],
  "total": 1,
  "query": "just community"
}
```

---

### GET `/reciters`
List available Quran reciters.

**Response:**
```json
{
  "reciters": [
    {
      "id": "mishary_rashid_alafasy",
      "name": "Mishary Rashid Alafasy",
      "name_ar": "مشاري بن راشد العفاسي",
      "style": "Murattal",
      "bitrate": "128kbps",
      "format": "mp3"
    },
    ...
  ]
}
```

---

### GET `/audio/{reciter_id}/{surah}`
Get audio URLs for a specific reciter and surah.

**Parameters:**
- `reciter_id` (path, string): Reciter ID from `/reciters`
- `surah` (path, int): Surah number

**Response:**
```json
{
  "reciter": { "id": "mishary_rashid_alafasy", "name": "Mishary Rashid Alafasy", ... },
  "surah": 1,
  "full_surah_url": "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3",
  "ayah_count": 7,
  "ayah_urls": [
    "https://everyayah.com/data/Alafasy_128kbps/001001.mp3",
    ...
  ]
}
```

---

### GET `/names`
Get the 99 Names of Allah.

**Response:**
```json
{
  "version": "1.0.0",
  "total": 99,
  "names": [
    {
      "number": 1,
      "arabic": "الرَّحْمَنُ",
      "transliteration": "Ar-Rahman",
      "meaning": "The Most Gracious"
    },
    ...
  ]
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "detail": "Error message here"
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request (e.g., query too short) |
| 404 | Resource not found |
| 500 | Internal server error |

## CORS

The API allows all origins (`*`) for development. Restrict in production.
