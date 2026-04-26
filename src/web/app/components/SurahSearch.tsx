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
        <input
          type="text"
          placeholder="Search surahs by name or number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2">
          {(["all", "Meccan", "Medinan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-500">{filtered.length} surahs</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="flex items-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary hover:bg-primary-light dark:hover:bg-zinc-900 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">
              {surah.number}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold truncate">{surah.name_en}</span>
                <span className="arabic-text text-lg mr-1" dir="rtl">
                  {surah.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                <span>{surah.name_translation}</span>
                <span>·</span>
                <span>{surah.verses} verses</span>
                <span>·</span>
                <span>{surah.revelation_type}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
