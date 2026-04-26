import { getArabicSurah, getTranslation, getSurahs, AVAILABLE_LANGUAGES } from "@/lib/quran-data";
import { SurahView } from "./SurahView";
import { JsonLd } from "../../components/JsonLd";
import { SurahIntro } from "../../components/SurahIntro";
import Link from "next/link";

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((s) => ({ id: String(s.number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surahs = await getSurahs();
  const surah = surahs.find((s) => s.number === Number(id));
  return {
    title: surah ? `${surah.name_en} (${surah.name}) — Quran` : "Surah — Quran",
    description: surah
      ? `Read Surah ${surah.name_en} (${surah.name}) with translation. ${surah.verses} verses, ${surah.revelation_type}. ${surah.name_translation}.`
      : undefined,
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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Surah not found</h1>
          <p className="text-muted mb-6">The surah you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-surface-elevated transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </Link>
        </div>
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Chapter",
          name: `Surah ${surahMeta.name_en}`,
          alternativeHeadline: surahMeta.name,
          description: `${surahMeta.name_translation} — ${surahMeta.verses} verses, ${surahMeta.revelation_type}`,
          position: surahMeta.number,
          isPartOf: {
            "@type": "Book",
            name: "The Holy Quran",
          },
        }}
      />
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All Surahs
        </Link>
        <div className="flex items-center gap-2">
          {surahNumber > 1 && (
            <Link
              href={`/surah/${surahNumber - 1}?lang=${lang}`}
              className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-surface-elevated transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </Link>
          )}
          <span className="text-xs text-muted tabular-nums">{surahNumber} / 114</span>
          {surahNumber < 114 && (
            <Link
              href={`/surah/${surahNumber + 1}?lang=${lang}`}
              className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-surface-elevated transition-colors"
            >
              Next
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <SurahIntro
        surahNumber={surahMeta.number}
        name={surahMeta.name}
        nameEn={surahMeta.name_en}
        nameTranslation={surahMeta.name_translation}
        verses={surahMeta.verses}
        revelationType={surahMeta.revelation_type}
      />

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
