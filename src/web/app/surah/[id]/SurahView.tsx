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
import { VerseNotes } from "../../components/VerseNotes";
import { TransliterationToggle } from "../../components/TransliterationToggle";
import { HifzMode } from "../../components/HifzMode";
import { saveLastRead } from "../../components/LastReadBanner";
import { useUILanguage } from "../../components/UILanguageProvider";
import { formatNumber } from "../../lib/ui-labels";

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
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const verseRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t, dir, uiLang } = useUILanguage();

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
          className="px-3 py-2 border border-border rounded-lg bg-surface text-sm"
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

      <HifzMode verses={arabicVerses} surahNumber={surahNumber} />

      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center py-6 arabic-text text-2xl text-primary" dir="rtl">
          {t.surah.bismillah}
        </div>
      )}

      <div className="space-y-2">
        {arabicVerses.map((verse) => {
          const trans = translationVerses.find((tv) => tv.number === verse.number);
          const isExpanded = expandedVerse === verse.number;
          return (
            <div
              key={verse.number}
              id={`verse-${verse.number}`}
              data-ayah={verse.number}
              ref={(el) => setVerseRef(verse.number, el)}
              className={`group rounded-xl p-4 -mx-4 transition-all ${
                highlightedAyah === verse.number ? "bg-primary-light" : "hover:bg-surface-elevated"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => setExpandedVerse(isExpanded ? null : verse.number)}
                  className="verse-number flex-shrink-0 mt-1 cursor-pointer"
                  aria-label={`${t.surah.verse} ${formatNumber(verse.number, uiLang)}`}
                >
                  {formatNumber(verse.number, uiLang)}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="arabic-text text-xl leading-relaxed" dir="rtl">
                    {verse.text}
                  </p>
                  {trans && <p className="text-sm text-muted leading-relaxed mt-2">{trans.text}</p>}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
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

              {!isExpanded && (
                <button
                  onClick={() => setExpandedVerse(verse.number)}
                  className={`mt-2 ${dir === "rtl" ? "pe-11" : "ps-11"} text-xs text-muted hover:text-primary transition-colors`}
                >
                  {t.surah.showDetails} {dir === "rtl" ? "←" : "→"}
                </button>
              )}

              {isExpanded && (
                <div
                  className={`${dir === "rtl" ? "pe-11" : "ps-11"} space-y-3 pt-3 border-t border-border/50 mt-3`}
                >
                  <TajweedText text={verse.text} />
                  <TafsirPanel surahNumber={surahNumber} ayahNumber={verse.number} />
                  <CrossReferences surahNumber={surahNumber} ayahNumber={verse.number} />
                  <RecitationComparison surahNumber={surahNumber} ayahNumber={verse.number} />
                  <TransliterationToggle
                    arabicText={verse.text}
                    verseNumber={verse.number}
                    surahNumber={surahNumber}
                  />
                  <VerseNotes surahNumber={surahNumber} ayahNumber={verse.number} />
                  <button
                    onClick={() => setExpandedVerse(null)}
                    className="text-xs text-muted hover:text-primary transition-colors"
                  >
                    {dir === "rtl" ? "→" : "←"} {t.surah.hideDetails}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
