import { NextRequest, NextResponse } from "next/server";
import { getAllArabic, getAllTranslations, getSurahs } from "@/lib/quran-data";

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
    const [arData, enData, surahs] = await Promise.all([
      getAllArabic(),
      isArabic ? Promise.resolve(null) : getAllTranslations("en"),
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
    const enBySurah = new Map(enData?.surahs.map((s) => [s.number, s]) ?? []);

    outer: for (const arSurah of arData.surahs) {
      const meta = surahs.find((s) => s.number === arSurah.number);
      const enSurah = enBySurah.get(arSurah.number);

      for (const verse of arSurah.verses) {
        const enVerse = enSurah?.verses.find((v) => v.number === verse.number);
        const translation = enVerse?.translation || enVerse?.text || "";
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
