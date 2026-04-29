"use client";

import Link from "next/link";
import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

interface SurahNavProps {
  surahNumber: number;
  lang: string;
}

export function SurahNav({ surahNumber, lang }: SurahNavProps) {
  const { t, dir, uiLang } = useUILanguage();

  return (
    <div className="flex items-center justify-between mb-6 animate-fade-in">
      {/* Back to surahs */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors group"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${dir === "rtl" ? "rotate-180 group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"}`}
          fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t.surah.backToSurahs}
      </Link>

      {/* Prev / counter / Next */}
      <div className="flex items-center gap-1.5">
        {surahNumber > 1 && (
          <Link
            href={`/surah/${surahNumber - 1}?lang=${lang}`}
            className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-border bg-surface hover:bg-primary-light hover:text-primary hover:border-primary/30 transition-all text-xs font-semibold"
          >
            <svg
              className={`w-3.5 h-3.5 ${dir === "rtl" ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.surah.prev}
          </Link>
        )}

        <span
          className="h-8 px-3 flex items-center rounded-lg text-xs font-bold tabular-nums"
          style={{ background: "var(--surface-elevated)", color: "var(--muted)" }}
        >
          {formatNumber(surahNumber, uiLang)}
          <span className="mx-1 opacity-40">/</span>
          {formatNumber(114, uiLang)}
        </span>

        {surahNumber < 114 && (
          <Link
            href={`/surah/${surahNumber + 1}?lang=${lang}`}
            className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-border bg-surface hover:bg-primary-light hover:text-primary hover:border-primary/30 transition-all text-xs font-semibold"
          >
            {t.surah.next}
            <svg
              className={`w-3.5 h-3.5 ${dir === "rtl" ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

export function SurahNotFound() {
  const { t, dir } = useUILanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <svg className="w-9 h-9 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold mb-2">{t.common.error}</h1>
        <p className="text-muted mb-6 text-sm max-w-xs mx-auto">{t.search.noResults}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn btn-primary text-sm px-6 py-2.5 rounded-xl"
        >
          <svg
            className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t.common.goHome}
        </Link>
      </div>
    </div>
  );
}
