"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
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
            placeholder="Search surahs by name or number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
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
        <div className="flex gap-1 bg-surface-elevated rounded-xl p-1">
          {(["all", "Meccan", "Medinan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? "bg-surface shadow-sm text-primary"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted">{filtered.length} surahs</p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <svg
            className="mx-auto w-12 h-12 text-muted mb-3"
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
          <p className="text-muted font-medium">No surahs found</p>
          <p className="text-sm text-muted mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((surah) => (
            <Link
              key={surah.number}
              href={`/surah/${surah.number}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light text-primary text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                {surah.number}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold truncate">{surah.name_en}</span>
                  <span className="arabic-text text-lg mr-1" dir="rtl">
                    {surah.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted mt-1">
                  <span>{surah.name_translation}</span>
                  <span>·</span>
                  <span>{surah.verses} verses</span>
                  <span>·</span>
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                      surah.revelation_type === "Meccan"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                        : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                    }`}
                  >
                    {surah.revelation_type}
                  </span>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
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
