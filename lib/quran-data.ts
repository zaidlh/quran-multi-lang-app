import { readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data", "text");

export interface SurahMeta {
  number: number;
  name: string;
  name_en: string;
  name_translation: string;
  verses: number;
  revelation_type: string;
  revelation_order: number;
  juz: number[];
  ruku_count: number;
  page_start: number;
}

export interface Verse {
  number: number;
  text: string;
  translation?: string;
}

export interface SurahData {
  number: number;
  name: string;
  transliteration: string;
  total_verses: number;
  verses: Verse[];
}

export interface Metadata {
  version: string;
  total_surahs: number;
  total_ayahs: number;
  surahs: SurahMeta[];
}

// Parsed files are cached per server instance so each surah request doesn't re-read ~3 MB of JSON.
const cache = new Map<string, Promise<unknown>>();

function readJson<T>(path: string): Promise<T> {
  let hit = cache.get(path) as Promise<T> | undefined;
  if (!hit) {
    hit = readFile(path, "utf-8").then((content) => JSON.parse(content) as T);
    hit.catch(() => cache.delete(path));
    cache.set(path, hit);
  }
  return hit;
}

export async function getMetadata(): Promise<Metadata> {
  return readJson<Metadata>(join(DATA_DIR, "metadata.json"));
}

export async function getSurahs(): Promise<SurahMeta[]> {
  const metadata = await getMetadata();
  return metadata.surahs;
}

export async function getAllArabic(): Promise<{ surahs: SurahData[] }> {
  return readJson(join(DATA_DIR, "ar", "quran_uthmani.json"));
}

export function isAvailableLanguage(lang: string): boolean {
  return AVAILABLE_LANGUAGES.some((l) => l.code === lang);
}

export async function getAllTranslations(lang: string): Promise<{ surahs: SurahData[] } | null> {
  // Whitelist: `lang` comes from the URL and must never reach the file path unchecked.
  if (!isAvailableLanguage(lang)) return null;
  try {
    return await readJson(join(DATA_DIR, lang, "translation.json"));
  } catch {
    return null;
  }
}

export async function getArabicSurah(surahNumber: number): Promise<SurahData | null> {
  try {
    const data = await getAllArabic();
    return data.surahs.find((s) => s.number === surahNumber) ?? null;
  } catch {
    return null;
  }
}

export async function getTranslation(surahNumber: number, lang: string): Promise<SurahData | null> {
  const data = await getAllTranslations(lang);
  return data?.surahs.find((s) => s.number === surahNumber) ?? null;
}

export const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "tr", name: "Turkish" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "ur", name: "Urdu" },
  { code: "bn", name: "Bengali" },
] as const;

export interface JuzInfo {
  juz: number;
  surahs: SurahMeta[];
}

export async function getJuzList(): Promise<JuzInfo[]> {
  const surahs = await getSurahs();
  const juzMap = new Map<number, SurahMeta[]>();

  for (const surah of surahs) {
    for (const j of surah.juz) {
      if (!juzMap.has(j)) {
        juzMap.set(j, []);
      }
      const existing = juzMap.get(j)!;
      if (!existing.some((s) => s.number === surah.number)) {
        existing.push(surah);
      }
    }
  }

  const result: JuzInfo[] = [];
  for (let j = 1; j <= 30; j++) {
    result.push({ juz: j, surahs: juzMap.get(j) || [] });
  }
  return result;
}
