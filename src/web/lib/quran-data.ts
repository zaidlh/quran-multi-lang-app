import { readFile } from "fs/promises";
import { join } from "path";

const RESOURCES_DIR = join(process.cwd(), "..", "..", "resources");

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

async function readJson<T>(path: string): Promise<T> {
  const content = await readFile(path, "utf-8");
  return JSON.parse(content) as T;
}

export async function getMetadata(): Promise<Metadata> {
  return readJson<Metadata>(join(RESOURCES_DIR, "text", "metadata.json"));
}

export async function getSurahs(): Promise<SurahMeta[]> {
  const metadata = await getMetadata();
  return metadata.surahs;
}

export async function getArabicSurah(surahNumber: number): Promise<SurahData | null> {
  try {
    const data = await readJson<{ surahs: SurahData[] }>(
      join(RESOURCES_DIR, "text", "ar", "quran_uthmani.json")
    );
    return data.surahs.find((s) => s.number === surahNumber) ?? null;
  } catch {
    return null;
  }
}

export async function getTranslation(surahNumber: number, lang: string): Promise<SurahData | null> {
  try {
    const data = await readJson<{ surahs: SurahData[] }>(
      join(RESOURCES_DIR, "text", lang, "translation.json")
    );
    return data.surahs.find((s) => s.number === surahNumber) ?? null;
  } catch {
    return null;
  }
}

export const AVAILABLE_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "tr", name: "Turkish" },
  { code: "id", name: "Indonesian" },
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
