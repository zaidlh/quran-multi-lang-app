import { NextRequest, NextResponse } from "next/server";
import {
  getAllArabic,
  getAllTranslations,
  getSurahs,
  isAvailableLanguage,
} from "@/lib/quran-data";

const MAX_RESULTS = 50;
const ARABIC_LETTERS = /[\u0600-\u06FF]/;

/** Strip tashkeel/Quranic marks and unify alef/yaa/taa-marbuta forms so plain-typed Arabic matches Uthmani text. */
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0629/g, "\u0647");
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("q")?.trim();
  if (!raw || raw.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 });
  }

  try {
    const isArabic = ARABIC_LETTERS.test(raw);
    const requestedLang = request.nextUrl.searchParams.get("lang") || "en";
    const translationLang = isAvailableLanguage(requestedLang) ? requestedLang : "en";
    const [arData, translationData, surahs] = await Promise.all([
      getAllArabic(),
      getAllTranslations(translationLang),
      getSurahs(),
    ]);

    const results: {
      surah: number;
      surahName: string;
      surahNameAr: string;
      ayah: number;
      text: string;
      translation: string;
    }[] = [];

    const q = isArabic ? normalizeArabic(raw) : raw.toLowerCase();
    const surahByNumber = new Map(surahs.map((surah) => [surah.number, surah]));
    const translationBySurah = new Map(
      translationData?.surahs.map((surah) => [surah.number, surah]) ?? []
    );

    outer: for (const arSurah of arData.surahs) {
      const meta = surahByNumber.get(arSurah.number);
      const translationSurah = translationBySurah.get(arSurah.number);
      const translationByAyah = new Map(
        translationSurah?.verses.map((verse) => [verse.number, verse]) ?? []
      );

      for (const verse of arSurah.verses) {
        const translatedVerse = translationByAyah.get(verse.number);
        const translation = translatedVerse?.translation || translatedVerse?.text || "";
        const matches = isArabic
          ? normalizeArabic(verse.text).includes(q)
          : translation.toLowerCase().includes(q);

        if (matches) {
          results.push({
            surah: arSurah.number,
            surahName: meta?.name_en ?? `Surah ${arSurah.number}`,
            surahNameAr: meta?.name ?? "",
            ayah: verse.number,
            text: verse.text,
            translation,
          });
          if (results.length >= MAX_RESULTS) break outer;
        }
      }
    }

    return NextResponse.json({ results, total: results.length });
  } catch {
    return NextResponse.json({ error: "Search unavailable" }, { status: 500 });
  }
}
