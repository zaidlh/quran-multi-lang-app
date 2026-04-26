"use client";

import { useRouter } from "next/navigation";
import { AudioPlayer } from "../../components/AudioPlayer";
import { BookmarkButton } from "../../components/BookmarkButton";

interface Verse {
  number: number;
  text: string;
}

interface SurahViewProps {
  surahNumber: number;
  arabicVerses: Verse[];
  translationVerses: Verse[];
  currentLang: string;
  languages: { code: string; name: string }[];
}

export function SurahView({
  surahNumber,
  arabicVerses,
  translationVerses,
  currentLang,
  languages,
}: SurahViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <select
          value={currentLang}
          onChange={(e) =>
            router.push(`/surah/${surahNumber}?lang=${e.target.value}`)
          }
          className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-sm"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>

        <BookmarkButton surahNumber={surahNumber} />
      </div>

      <AudioPlayer surahNumber={surahNumber} />

      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center py-4 arabic-text text-2xl text-primary" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      )}

      <div className="space-y-6">
        {arabicVerses.map((verse) => {
          const trans = translationVerses.find(
            (t) => t.number === verse.number
          );
          return (
            <div
              key={verse.number}
              className="border-b border-zinc-100 dark:border-zinc-800 pb-6"
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="verse-number flex-shrink-0 mt-2">
                  {verse.number}
                </span>
                <div className="flex-1">
                  <p
                    className="arabic-text text-xl leading-loose"
                    dir="rtl"
                  >
                    {verse.text}
                  </p>
                </div>
                <BookmarkButton
                  surahNumber={surahNumber}
                  ayahNumber={verse.number}
                />
              </div>
              {trans && (
                <p className="text-zinc-600 dark:text-zinc-400 ml-10 text-sm leading-relaxed">
                  {trans.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
