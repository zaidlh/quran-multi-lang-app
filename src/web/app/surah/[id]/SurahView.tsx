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
    if (el) verseRefs.current.set(num, el);
    else verseRefs.current.delete(num);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const ayahNum = Number(entry.target.getAttribute("data-ayah"));
            if (ayahNum) saveLastRead(surahNumber, surahName, ayahNum);
          }
        }
      },
      { threshold: 0.5 }
    );
    const refs = verseRefs.current;
    for (const el of refs.values()) observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [surahNumber, surahName, arabicVerses]);

  const handleAyahChange = useCallback((ayahNumber: number | null) => {
    setHighlightedAyah(ayahNumber);
    if (ayahNumber !== null) {
      const el = verseRefs.current.get(ayahNumber);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="space-y-6">

      {/* ── Toolbar: language selector + bookmark ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative">
          <svg
            className={`pointer-events-none absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-muted`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <select
  value={currentLang}
  onChange={(e) => router.push(`/surah/${surahNumber}?lang=${e.target.value}`)}
  className={`h-10 ${dir === "rtl" ? "pr-9 pl-3" : "pl-9 pr-3"} border border-border rounded-xl bg-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-glow)] focus:border-primary transition-all appearance-none cursor-pointer`}
>
  {languages.map((l) => (
    <option key={l.code} value={l.code}>{l.name}</option>
  ))}
        </select>

        </div>
        <BookmarkButton surahNumber={surahNumber} />
      </div>

      {/* ── Audio Player ── */}
      <AudioPlayer
        surahNumber={surahNumber}
        totalAyahs={arabicVerses.length}
        onAyahChange={handleAyahChange}
      />

      {/* ── Hifz Mode ── */}
      <HifzMode verses={arabicVerses} surahNumber={surahNumber} />

      {/* ── Bismillah ── */}
      {surahNumber !== 1 && surahNumber !== 9 && (
        <div
          className="text-center py-6 arabic-text text-2xl font-bold"
          dir="rtl"
          style={{ color: "var(--primary)" }}
        >
          {t.surah.bismillah}
        </div>
      )}

      {/* ── Verses ── */}
      <div className="space-y-1">
        {arabicVerses.map((verse) => {
          const trans     = translationVerses.find((tv) => tv.number === verse.number);
          const isHighlit = highlightedAyah === verse.number;
          const isExp     = expandedVerse === verse.number;

          return (
            <div
              key={verse.number}
              id={`verse-${verse.number}`}
              data-ayah={verse.number}
              ref={(el) => setVerseRef(verse.number, el)}
              className={`group relative rounded-2xl px-4 py-5 -mx-1 transition-all duration-300 ${
                isHighlit
                  ? "bg-primary-light border border-primary/20 shadow-sm"
                  : "hover:bg-surface-elevated border border-transparent hover:border-border"
              }`}
            >
              <div className="flex items-start gap-3">

                {/* Verse number */}
                <button
                  onClick={() => setExpandedVerse(isExp ? null : verse.number)}
                  className="verse-number mt-1 flex-shrink-0"
                  aria-label={`${t.surah.verse} ${formatNumber(verse.number, uiLang)}`}
                  title={isExp ? t.surah.hideDetails : t.surah.showDetails}
                >
                  {formatNumber(verse.number, uiLang)}
                </button>

                {/* Arabic + translation */}
                <div className="flex-1 min-w-0 space-y-2">
                  <p
                    className="arabic-text leading-loose select-text"
                    dir="rtl"
                    style={{ fontSize: "1.6rem" }}
                  >
                    {verse.text}
                  </p>
                  {trans && (
                    <p className="text-sm text-muted leading-relaxed border-t border-border/60 pt-2">
                      {trans.text}
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
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

              {/* Show details toggle */}
              {!isExp && (
                <button
                  onClick={() => setExpandedVerse(verse.number)}
                  className={`mt-3 ${dir === "rtl" ? "pe-12" : "ps-12"} text-xs font-medium text-muted hover:text-primary transition-colors flex items-center gap-1`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {t.surah.showDetails}
                </button>
              )}

              {/* Expanded details */}
              {isExp && (
                <div
                  className={`${dir === "rtl" ? "pe-12" : "ps-12"} mt-4 space-y-4 pt-4 border-t border-border/60 animate-fade-in`}
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
                    className="text-xs font-medium text-muted hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    {t.surah.hideDetails}
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
