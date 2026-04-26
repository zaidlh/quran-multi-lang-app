import {
  getArabicSurah,
  getTranslation,
  getSurahs,
  AVAILABLE_LANGUAGES,
} from "@/lib/quran-data";
import { SurahView } from "./SurahView";
import Link from "next/link";

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((s) => ({ id: String(s.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahs = await getSurahs();
  const surah = surahs.find((s) => s.number === Number(id));
  return {
    title: surah
      ? `${surah.name_en} (${surah.name}) — Quran`
      : "Surah — Quran",
  };
}

export default async function SurahPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang: langParam } = await searchParams;
  const surahNumber = Number(id);
  const lang = langParam || "en";

  const [arabic, translation, surahs] = await Promise.all([
    getArabicSurah(surahNumber),
    getTranslation(surahNumber, lang),
    getSurahs(),
  ]);

  const surahMeta = surahs.find((s) => s.number === surahNumber);

  if (!arabic || !surahMeta) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Surah not found</h1>
        <Link href="/" className="text-primary underline">
          Back to Surahs
        </Link>
      </div>
    );
  }

  const translationVerses =
    translation?.verses.map((v) => ({
      number: v.number,
      text: v.translation || v.text,
    })) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-primary hover:underline text-sm">
          &larr; All Surahs
        </Link>
        <div className="flex items-center gap-2">
          {surahNumber > 1 && (
            <Link
              href={`/surah/${surahNumber - 1}?lang=${lang}`}
              className="text-sm px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              &larr; Prev
            </Link>
          )}
          {surahNumber < 114 && (
            <Link
              href={`/surah/${surahNumber + 1}?lang=${lang}`}
              className="text-sm px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Next &rarr;
            </Link>
          )}
        </div>
      </div>

      <div className="text-center mb-8 space-y-2">
        <h1 className="arabic-text text-3xl" dir="rtl">
          {surahMeta.name}
        </h1>
        <h2 className="text-xl font-semibold">{surahMeta.name_en}</h2>
        <p className="text-zinc-500 text-sm">
          {surahMeta.name_translation} · {surahMeta.verses} verses ·{" "}
          {surahMeta.revelation_type}
        </p>
      </div>

      <SurahView
        surahNumber={surahNumber}
        surahName={surahMeta.name_en}
        arabicVerses={arabic.verses}
        translationVerses={translationVerses}
        currentLang={lang}
        languages={AVAILABLE_LANGUAGES.map((l) => ({
          code: l.code,
          name: l.name,
        }))}
      />
    </div>
  );
}
