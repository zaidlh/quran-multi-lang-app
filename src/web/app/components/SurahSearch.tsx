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
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Meccan" | "Medinan">("all");
  const { t, dir, uiLang } = useUILanguage();

  const filtered = useMemo(() => {
    return surahs.filter((s) => {
      const matchesQuery =
        !query ||
        s.name_en.toLowerCase().includes(query.toLowerCase()) ||
        s.name_translation.toLowerCase().includes(query.toLowerCase()) ||
        s.name.includes(query) ||
        String(s.number) === query;

      const matchesFilter = filter === "all" || s.revelation_type === filter;
      return matchesQuery && matchesFilter;
    });
  }, [surahs, query, filter]);

  const filterLabels: Record<"all" | "Meccan" | "Medinan", string> = {
    all: t.search.filterAll,
    Meccan: t.search.filterMeccan,
    Medinan: t.search.filterMedinan,
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className={`absolute ${dir === "rtl" ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-5 h-5 text-outline`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={t.search.placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full ${dir === "rtl" ? "pr-12 pl-12" : "pl-12 pr-12"} py-3 border border-outline-variant rounded-2xl bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container/30 focus:border-primary-container transition-colors text-start`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className={`absolute ${dir === "rtl" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors`}
              aria-label={t.search.clear}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex gap-1 bg-surface-container rounded-2xl p-1">
          {(["all", "Meccan", "Medinan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-surface-container-lowest shadow-sm text-primary-container"
                  : "text-outline hover:text-on-surface"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-outline px-1">
        {formatNumber(filtered.length, uiLang)} {t.search.results}
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <svg
            className="mx-auto w-12 h-12 text-outline mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-outline font-medium">{t.search.noResults}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-all"
            >
              {/* Number badge */}
              <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-sm font-bold text-primary-container group-hover:bg-primary-container group-hover:text-white transition-colors">
                {formatNumber(surah.number, uiLang)}
              </div>

              {/* Middle: names */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-on-surface truncate">{surah.name_en}</span>
                  <span
                    className="arabic-text text-lg text-on-surface-variant flex-shrink-0"
                    dir="rtl"
                  >
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-outline mt-0.5">
                  <span>{surah.name_translation}</span>
                  <span className="text-outline-variant">·</span>
                  <span>
                    {formatNumber(surah.verses, uiLang)} {t.surah.verses}
                  </span>
                  <span className="text-outline-variant">·</span>
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                      surah.revelation_type === "Meccan"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                        : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                    }`}
                  >
                    {surah.revelation_type === "Meccan"
                      ? t.search.filterMeccan
                      : t.search.filterMedinan}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <svg
                className={`w-4 h-4 text-outline opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${dir === "rtl" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
