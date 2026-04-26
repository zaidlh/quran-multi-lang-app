import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const RESOURCES_DIR = join(process.cwd(), "..", "..", "resources");

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase();
  if (!q || q.length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 });
  }

  try {
    const [arRaw, enRaw, metaRaw] = await Promise.all([
      readFile(join(RESOURCES_DIR, "text", "ar", "quran_uthmani.json"), "utf-8"),
      readFile(join(RESOURCES_DIR, "text", "en", "translation.json"), "utf-8"),
      readFile(join(RESOURCES_DIR, "text", "metadata.json"), "utf-8"),
    ]);

    const arData = JSON.parse(arRaw);
    const enData = JSON.parse(enRaw);
    const meta = JSON.parse(metaRaw);

    const results: {
      surah: number;
      surahName: string;
      ayah: number;
      text: string;
      translation: string;
    }[] = [];

    for (const enSurah of enData.surahs) {
      const arSurah = arData.surahs.find((s: { number: number }) => s.number === enSurah.number);
      const surahMeta = meta.surahs.find((s: { number: number }) => s.number === enSurah.number);
      const surahName = surahMeta?.name_en || `Surah ${enSurah.number}`;

      for (const verse of enSurah.verses) {
        const transText = verse.translation || verse.text || "";
        if (transText.toLowerCase().includes(q)) {
          const arVerse = arSurah?.verses.find(
            (v: { number: number }) => v.number === verse.number
          );
          results.push({
            surah: enSurah.number,
            surahName,
            ayah: verse.number,
            text: arVerse?.text || "",
            translation: transText,
          });

          if (results.length >= 50) break;
        }
      }
      if (results.length >= 50) break;
    }

    return NextResponse.json({ results, total: results.length });
  } catch {
    return NextResponse.json({ error: "Search unavailable" }, { status: 500 });
  }
}
