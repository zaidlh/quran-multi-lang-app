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
  const [query,    setQuery]    = useState("");
  const [results,  setResults]  = useState<SearchResult[]>([]);
  const [loading,  setLoading]  = useState(false);
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

  /* highlight matching text */
  function highlight(text: string, q: string) {
    if (!q.trim()) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase()
        ? <mark key={i} className="bg-primary-light text-primary rounded px-0.5 font-semibold not-italic">{part}</mark>
        : part
    );
  }

  const suggestions = ["mercy", "patience", "paradise", "prayer", "light", "justice"];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

      {/* ── Header ── */}
      <div className="mb-8 text-center animate-fade-in-up">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Search the Quran</h1>
        <p className="text-muted text-sm">Search across English translations of all 6,236 verses</p>
      </div>

      {/* ── Search bar ── */}
      <div className="animate-fade-in-up delay-100 mb-6">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search in English translations…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="input pl-10 h-12 text-sm"
              autoFocus
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setResults([]); setSearched(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-surface-elevated hover:bg-border flex items-center justify-center text-muted transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="btn btn-primary h-12 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </>
            )}
          </button>
        </div>

        {/* Suggestions */}
        {!searched && (
          <div className="flex flex-wrap items-center gap-2 animate-fade-in">
            <span className="text-xs text-muted font-medium">Try:</span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); }}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-border bg-surface hover:bg-primary-light hover:text-primary hover:border-primary/30 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Loading skeletons ── */}
      {loading && (
        <div className="space-y-3 animate-fade-in">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border p-5 space-y-3">
              <div className="skeleton h-3.5 w-32 rounded" />
              <div className="skeleton h-5 w-full rounded" />
              <div className="skeleton h-4 w-3/4 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* ── No results ── */}
      {searched && !loading && results.length === 0 && (
        <div className="py-16 text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="font-semibold text-foreground mb-1">No results found</p>
          <p className="text-sm text-muted">Try different keywords or browse the surahs directly.</p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Browse Surahs →
          </Link>
        </div>
      )}

      {/* ── Results count ── */}
      {searched && !loading && results.length > 0 && (
        <p className="text-xs text-muted font-medium mb-4 animate-fade-in">
          Found <strong className="text-foreground">{results.length}</strong> result{results.length !== 1 ? "s" : ""} for &ldquo;<span className="text-primary">{query}</span>&rdquo;
        </p>
      )}

      {/* ── Results list ── */}
      {!loading && (
        <div className="space-y-3">
          {results.map((r, i) => (
            <Link
              key={i}
              href={`/surah/${r.surah}#verse-${r.ayah}`}
              className="group card card-interactive block p-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Meta */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "var(--primary-light)", color: "var(--primary)" }}
                >
                  {r.surahName}
                </span>
                <span className="text-xs text-muted">
                  {r.surah}:{r.ayah}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-muted ms-auto opacity-0 group-hover:opacity-100 transition-opacity`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Arabic */}
              <p className="arabic-text text-lg mb-2 leading-loose" dir="rtl">
                {r.text}
              </p>

              {/* Translation */}
              <p className="text-sm text-muted leading-relaxed">
                {highlight(r.translation, query)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
