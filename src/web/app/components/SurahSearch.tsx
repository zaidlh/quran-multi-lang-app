"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

interface Surah {
  number: number;
  name: string;
  name_en: string;
  name_translation: string;
  verses: number;
  revelation_type: string;
}

export function SurahSearch({ surahs }: { surahs: Surah[] }) {
  const [query,  setQuery]  = useState("");
  const [filter, setFilter] = useState<"all" | "Meccan" | "Medinan">("all");
  const { t, dir, uiLang } = useUILanguage();

  const filtered = useMemo(() => {
    return surahs.filter((s) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !query ||
        s.name_en.toLowerCase().includes(q) ||
        s.name_translation.toLowerCase().includes(q) ||
        s.name.includes(query) ||
        String(s.number) === query;
      const matchesFilter = filter === "all" || s.revelation_type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [surahs, query, filter]);

  const filterLabels: Record<"all" | "Meccan" | "Medinan", string> = {
    all:     t.search.filterAll,
    Meccan:  t.search.filterMeccan,
    Medinan: t.search.filterMedinan,
  };

  return (
    <div id="surah-list" className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search input */}
        <div className="relative flex-1">
          <svg
            className={`pointer-events-none absolute ${dir === "rtl" ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-4 h-4 text-muted`}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`input ${dir === "rtl" ? "pr-10 pl-9" : "pl-10 pr-9"} h-11 text-sm`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className={`absolute ${dir === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-surface-elevated hover:bg-border text-muted transition-colors`}
              aria-label={t.search.clear}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex gap-1 bg-surface-elevated rounded-xl p-1 border border-border self-start sm:self-auto">
          {(["all", "Meccan", "Medinan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-surface shadow text-primary border border-border"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Result count ── */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted font-medium">
          {formatNumber(filtered.length, uiLang)}{" "}
          <span className="text-muted">{t.search.results}</span>
        </p>
        {query && (
          <button onClick={() => setQuery("")} className="text-xs text-primary hover:underline font-medium">
            {t.search.clear}
          </button>
        )}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-foreground font-semibold mb-1">{t.search.noResults}</p>
          <p className="text-muted text-sm">Try a different name, translation, or number</p>
        </div>
      ) : (
        /* ── Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((surah, idx) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              className="group card card-interactive flex items-center gap-4 p-4 animate-fade-in-up"
              style={{ animationDelay: `${Math.min(idx * 20, 300)}ms` }}
            >
              {/* Number badge */}
              <span
                className="flex items-center justify-center w-11 h-11 rounded-xl text-sm font-extrabold flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                style={{
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                }}
              >
                <span className="group-hover:hidden">{formatNumber(surah.number, uiLang)}</span>
                <svg className="w-4 h-4 hidden group-hover:block" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={dir === "rtl" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="font-bold text-sm truncate">{surah.name_en}</span>
                  <span className="arabic-text shrink-0" dir="rtl" style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-muted">{surah.name_translation}</span>
                  <span className="text-muted/40 text-xs">·</span>
                  <span className="text-xs text-muted">
                    {formatNumber(surah.verses, uiLang)} {t.surah.verses}
                  </span>
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${
                      surah.revelation_type === "Meccan"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    }`}
                  >
                    {surah.revelation_type === "Meccan" ? t.search.filterMeccan : t.search.filterMedinan}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
