"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface Bookmark {
  surah: number;
  ayah?: number;
  timestamp: number;
}

const SURAH_NAMES: Record<number, string> = {
  1: "Al-Fatiha", 2: "Al-Baqarah", 3: "Aal-e-Imran", 4: "An-Nisa", 5: "Al-Ma'idah",
  6: "Al-An'am", 7: "Al-A'raf", 8: "Al-Anfal", 9: "At-Tawbah", 10: "Yunus",
  11: "Hud", 12: "Yusuf", 13: "Ar-Ra'd", 14: "Ibrahim", 15: "Al-Hijr",
  16: "An-Nahl", 17: "Al-Isra", 18: "Al-Kahf", 19: "Maryam", 20: "Ta-Ha",
  21: "Al-Anbiya", 22: "Al-Hajj", 23: "Al-Mu'minun", 24: "An-Nur", 25: "Al-Furqan",
  26: "Ash-Shu'ara", 27: "An-Naml", 28: "Al-Qasas", 29: "Al-Ankabut", 30: "Ar-Rum",
  36: "Ya-Sin", 55: "Ar-Rahman", 56: "Al-Waqi'ah", 67: "Al-Mulk", 112: "Al-Ikhlas",
  113: "Al-Falaq", 114: "An-Nas",
};

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const stored: Bookmark[] = JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    return stored.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

function getSurahName(n: number): string {
  return SURAH_NAMES[n] ?? `Surah ${n}`;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return "just now";
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  const removeBookmark = useCallback((index: number) => {
    setBookmarks((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("quran-bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    if (!window.confirm("Remove all bookmarks?")) return;
    setBookmarks([]);
    localStorage.removeItem("quran-bookmarks");
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bookmarks</h1>
          <p className="text-muted text-sm mt-1">
            {bookmarks.length === 0
              ? "No saved verses yet"
              : `${bookmarks.length} saved item${bookmarks.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        {bookmarks.length > 0 && (
          <button
            onClick={clearAll}
            className="btn btn-ghost text-xs text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear all
          </button>
        )}
      </div>

      {/* ── Empty state ── */}
      {bookmarks.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-surface-elevated border border-border flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-2">No bookmarks yet</h2>
          <p className="text-muted text-sm mb-6 max-w-xs mx-auto">
            While reading a surah, tap the bookmark icon on any verse to save it here.
          </p>
          <Link
            href="/"
            className="btn btn-primary text-sm px-6 py-2.5 rounded-xl inline-flex"
          >
            Browse Surahs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* ── Bookmarks list ── */}
      {bookmarks.length > 0 && (
        <div className="space-y-2">
          {bookmarks.map((bm, i) => {
            const surahName = getSurahName(bm.surah);
            const href = `/surah/${bm.surah}${bm.ayah ? `#verse-${bm.ayah}` : ""}`;
            return (
              <div
                key={`${bm.surah}-${bm.ayah ?? "s"}-${bm.timestamp}`}
                className="group card animate-fade-in-up flex items-center gap-4 p-4"
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                  style={{ background: "var(--primary-light)", color: "var(--primary)" }}
                >
                  {bm.ayah ? (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                </div>

                {/* Link block */}
                <Link href={href} className="flex-1 min-w-0 hover:text-primary transition-colors">
                  <p className="font-semibold text-sm truncate">{surahName}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {bm.ayah ? `Verse ${bm.ayah}` : "Whole Surah"}
                    <span className="mx-1.5 opacity-40">·</span>
                    {timeAgo(bm.timestamp)}
                  </p>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={href}
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-primary-light hover:text-primary transition-colors"
                    title="Open"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => removeBookmark(i)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 text-muted transition-colors"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
