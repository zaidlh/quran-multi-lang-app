"use client";

import { useState } from "react";
import Link from "next/link";
import { useUILanguage } from "../components/UILanguageProvider";

interface SearchResult {
  surah: number;
  surahName: string;
  surahNameAr: string;
  ayah: number;
  text: string;
  translation: string;
}

export default function SearchPage() {
  const { uiLang, dir } = useUILanguage();
  const ar = uiLang === "ar";
  const L = ar
    ? {
        title: "البحث في القرآن",
        placeholder: "ابحث في الآيات بالعربية أو بالإنجليزية…",
        button: "بحث",
        none: "لا توجد نتائج. جرّب كلمة أخرى.",
        error: "تعذّر إجراء البحث الآن. حاول مرة أخرى.",
      }
    : {
        title: "Search the Quran",
        placeholder: "Search verses in Arabic or English…",
        button: "Search",
        none: "No results found. Try a different search term.",
        error: "Search is unavailable right now. Please try again.",
      };
  const [query, setQuery] = useState("");
  const [failed, setFailed] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setFailed(false);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results ?? []);
      } else {
        setResults([]);
        setFailed(true);
      }
    } catch {
      setResults([]);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8" dir={dir}>
      <h1 className="text-2xl font-bold mb-6">{L.title}</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder={L.placeholder}
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
          {loading ? "…" : L.button}
        </button>
      </div>

      {searched && results.length === 0 && !loading && (
        <p className="text-zinc-500 text-center py-8">{failed ? L.error : L.none}</p>
      )}

      <div className="space-y-4">
        {results.map((r, i) => (
          <Link
            key={i}
            href={`/surah/${r.surah}#verse-${r.ayah}`}
            className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-2 mb-2 text-sm text-zinc-500">
              <span className="font-medium text-foreground">{ar && r.surahNameAr ? r.surahNameAr : r.surahName}</span>
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
