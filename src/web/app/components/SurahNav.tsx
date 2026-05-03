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
    <div className="flex items-center justify-between mb-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-outline hover:text-primary-container transition-colors"
      >
        <svg
          className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t.surah.backToSurahs}
      </Link>
      <div className="flex items-center gap-2">
        {surahNumber > 1 && (
          <Link
            href={`/surah/${surahNumber - 1}?lang=${lang}`}
            className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors"
          >
            <svg
              className={`w-3.5 h-3.5 ${dir === "rtl" ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t.surah.prev}
          </Link>
        )}
        <span className="text-xs text-outline tabular-nums">
          {formatNumber(surahNumber, uiLang)} / {formatNumber(114, uiLang)}
        </span>
        {surahNumber < 114 && (
          <Link
            href={`/surah/${surahNumber + 1}?lang=${lang}`}
            className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors"
          >
            {t.surah.next}
            <svg
              className={`w-3.5 h-3.5 ${dir === "rtl" ? "rotate-180" : ""}`}
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
  );
}

export function SurahNotFound() {
  const { t, dir } = useUILanguage();

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
        <h1 className="text-2xl font-bold mb-2">{t.common.error}</h1>
        <p className="text-outline mb-6">{t.search.noResults}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-sm font-medium"
        >
          <svg
            className={`w-4 h-4 ${dir === "rtl" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t.common.goHome}
        </Link>
      </div>
    </div>
  );
}
