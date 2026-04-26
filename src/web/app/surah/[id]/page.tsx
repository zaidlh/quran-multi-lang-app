import { getArabicSurah, getTranslation, getSurahs, AVAILABLE_LANGUAGES } from "@/lib/quran-data";
import { SurahView } from "./SurahView";
import { JsonLd } from "../../components/JsonLd";
import { SurahIntro } from "../../components/SurahIntro";
import { SurahNav, SurahNotFound } from "../../components/SurahNav";

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
    return <SurahNotFound />;
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

      <SurahNav surahNumber={surahNumber} lang={lang} />

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
