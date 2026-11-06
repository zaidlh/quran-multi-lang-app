"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface Bookmark {
  surah: number;
  ayah?: number;
  timestamp: number;
}

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const stored: Bookmark[] = JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
    return stored.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-zinc-500 mb-4">No bookmarks yet.</p>
          <Link href="/" className="text-primary underline">
            Browse Surahs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bm, i) => (
            <div
              key={`${bm.surah}-${bm.ayah ?? "s"}-${bm.timestamp}`}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <Link
                href={`/surah/${bm.surah}${bm.ayah ? `#verse-${bm.ayah}` : ""}`}
                className="hover:text-primary"
              >
                <span className="font-medium">Surah {bm.surah}</span>
                {bm.ayah && <span className="text-zinc-500">, Ayah {bm.ayah}</span>}
                <span className="text-xs text-zinc-400 ml-3">
                  {new Date(bm.timestamp).toLocaleDateString()}
                </span>
              </Link>
              <button
                onClick={() => removeBookmark(i)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
