"use client";

import { useState } from "react";
import Link from "next/link";

interface SearchResult {
  surah: number;
  surahName: string;
  ayah: number;
  text: string;
  translation: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search the Quran</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search in English translations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {searched && results.length === 0 && !loading && (
        <p className="text-zinc-500 text-center py-8">
          No results found. Try a different search term.
        </p>
      )}

      <div className="space-y-4">
        {results.map((r, i) => (
          <Link
            key={i}
            href={`/surah/${r.surah}#verse-${r.ayah}`}
            className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-2 mb-2 text-sm text-zinc-500">
              <span className="font-medium text-foreground">{r.surahName}</span>
              <span>·</span>
              <span>
                {r.surah}:{r.ayah}
              </span>
            </div>
            <p className="arabic-text text-lg mb-1" dir="rtl">
              {r.text}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{r.translation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
