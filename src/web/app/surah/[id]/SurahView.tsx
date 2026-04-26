"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { BookmarkButton } from "../../components/BookmarkButton";
import { TafsirPanel } from "../../components/TafsirPanel";
import { ShareButton } from "../../components/ShareButton";
import { TajweedText } from "../../components/TajweedText";
import { CrossReferences } from "../../components/CrossReferences";
import { RecitationComparison } from "../../components/RecitationComparison";
import { saveLastRead } from "../../components/LastReadBanner";

interface Verse {
  number: number;
  text: string;
}

interface SurahViewProps {
  surahNumber: number;
  surahName: string;
  arabicVerses: Verse[];
  translationVerses: Verse[];
  currentLang: string;
  languages: { code: string; name: string }[];
}

export function SurahView({
  surahNumber,
  surahName,
  arabicVerses,
  translationVerses,
  currentLang,
  languages,
}: SurahViewProps) {
  const router = useRouter();
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setVerseRef = useCallback((num: number, el: HTMLDivElement | null) => {
    if (el) {
      verseRefs.current.set(num, el);
    } else {
      verseRefs.current.delete(num);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const ayahNum = Number(entry.target.getAttribute("data-ayah"));
            if (ayahNum) {
              saveLastRead(surahNumber, surahName, ayahNum);
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    const refs = verseRefs.current;
    for (const el of refs.values()) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [surahNumber, surahName, arabicVerses]);

  const handleAyahChange = useCallback((ayahNumber: number | null) => {
    setHighlightedAyah(ayahNumber);
    if (ayahNumber !== null) {
      const el = verseRefs.current.get(ayahNumber);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <select
          value={currentLang}
          onChange={(e) => router.push(`/surah/${surahNumber}?lang=${e.target.value}`)}
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

      <AudioPlayer
        surahNumber={surahNumber}
        totalAyahs={arabicVerses.length}
        onAyahChange={handleAyahChange}
      />

      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center py-4 arabic-text text-2xl text-primary" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      )}

      <div className="space-y-6">
        {arabicVerses.map((verse) => {
          const trans = translationVerses.find((t) => t.number === verse.number);
          return (
            <div
              key={verse.number}
              id={`verse-${verse.number}`}
              data-ayah={verse.number}
              ref={(el) => setVerseRef(verse.number, el)}
              className={`border-b border-zinc-100 dark:border-zinc-800 pb-6 transition-colors duration-300 ${
                highlightedAyah === verse.number ? "verse-highlight p-4 -m-4" : ""
              }`}
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="verse-number flex-shrink-0 mt-2">{verse.number}</span>
                <div className="flex-1">
                  <p className="arabic-text text-xl leading-loose" dir="rtl">
                    {verse.text}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <ShareButton
                    surahNumber={surahNumber}
                    ayahNumber={verse.number}
                    surahName={surahName}
                    arabicText={verse.text}
                    translationText={trans?.text || ""}
                  />
                  <BookmarkButton surahNumber={surahNumber} ayahNumber={verse.number} />
                </div>
              </div>
              {trans && (
                <p className="text-zinc-600 dark:text-zinc-400 ml-10 text-sm leading-relaxed">
                  {trans.text}
                </p>
              )}
              <div className="ml-10 space-y-1">
                <TajweedText text={verse.text} />
                <TafsirPanel surahNumber={surahNumber} ayahNumber={verse.number} />
                <CrossReferences surahNumber={surahNumber} ayahNumber={verse.number} />
                <RecitationComparison surahNumber={surahNumber} ayahNumber={verse.number} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
