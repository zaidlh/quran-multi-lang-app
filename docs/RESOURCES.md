# Resource Catalog

Complete catalog of all data sources used in this project, with license and attribution information.

## Open-Licensed Sources (Included)

| Resource | Source | License | Format | Coverage | Last Updated |
|----------|--------|---------|--------|----------|-------------|
| Arabic Quran Text (Uthmani) | [Tanzil.net](https://tanzil.net) via [risan/quran-json](https://github.com/risan/quran-json) | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| English Translation | Sahih International via [Quran Enc](https://quranenc.com) | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| French Translation | Muhammad Hamidullah via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Spanish Translation | Julio Cortes via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Turkish Translation | Diyanet Isleri via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Indonesian Translation | Ministry of Religious Affairs via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Urdu Translation | Ahmed Ali via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Bengali Translation | Muhiuddin Khan via quran-json | CC-BY-SA-4.0 | JSON | 114 surahs, 6236 ayahs | 2022 |
| Surah Metadata | [semarketir/quranjson](https://github.com/semarketir/quranjson) | MIT | JSON | 114 surahs, 30 juz | 2021 |
| Tafsir (27+ tafsirs) | [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api) | MIT | JSON/CDN | Arabic + English | 2023 |
| Quran Morphology | [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology) | CC-BY-SA | TXT/JSON | Full Quran | 2022 |
| Audio (Alafasy) | [EveryAyah.com](https://everyayah.com) | Free for non-commercial | MP3 URLs | 6236 ayahs | Ongoing |
| Audio (Abdul Basit) | [EveryAyah.com](https://everyayah.com) | Free for non-commercial | MP3 URLs | 6236 ayahs | Ongoing |
| Audio (Saad Al-Ghamdi) | [EveryAyah.com](https://everyayah.com) | Free for non-commercial | MP3 URLs | 6236 ayahs | Ongoing |
| Audio (Maher Al-Muaiqly) | [EveryAyah.com](https://everyayah.com) | Free for non-commercial | MP3 URLs | 6236 ayahs | Ongoing |
| Surah Audio | [QuranicAudio.com](https://quranicaudio.com) | Open Access | MP3 URLs | 114 surahs × 4 reciters | Ongoing |
| 99 Names of Allah | Compiled from Islamic sources | Public Domain | JSON | 99 names | 2024 |
| Prayer Time Methods | [Al-Adhan API](https://aladhan.com) | Free | JSON | 14 methods | Ongoing |

## API References (External)

| API | URL | Auth Required | Rate Limit |
|-----|-----|---------------|------------|
| Quran.com API v4 | https://api.quran.com/api/v4 | No | Fair use |
| Al-Adhan Prayer Times | https://api.aladhan.com/v1 | No | Reasonable |
| UmmahAPI | https://ummahapi.com/api | No | None |
| The Quran Project API | https://quranapi.pages.dev | No | None |

## Font Resources

| Font | Source | License | Notes |
|------|--------|---------|-------|
| KFGQPC Uthmanic Script HAFS | King Fahd Complex | Free for Quran use | Official Madani Mushaf font |
| Scheherazade New | [SIL International](https://software.sil.org/scheherazade/) | SIL OFL 1.1 | Smart Unicode Arabic font |
| Amiri | [aliftype/amiri](https://github.com/aliftype/amiri) | SIL OFL 1.1 | Classical Arabic typeface |

## Restricted Sources (Not Included)

These resources were found but have restrictive licenses and are NOT included in this repository:

| Resource | Reason | Alternative |
|----------|--------|-------------|
| Mushaf page images (copyrighted) | Copyright by publishers | Use EveryAyah.com PNG references (personal/educational use only) |
| Some commercial translations | All Rights Reserved | Use open-licensed translations from Tanzil.net |
| QuranComplex.gov.sa data | Government copyright | Use Tanzil.net equivalents |

## How to Add More Resources

1. Fork the resource repository (if on GitHub)
2. Verify the license is permissive (MIT, Apache 2.0, CC0, CC-BY, GPL)
3. Add the data to the appropriate `resources/` subdirectory
4. Update this file with source, license, and coverage information
5. Update `LEGAL.md` with attribution
6. Run `python scripts/validate_data.py` to verify integrity
