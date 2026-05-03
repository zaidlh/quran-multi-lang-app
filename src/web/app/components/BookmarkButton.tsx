"use client";

import { useState, useMemo, useCallback } from "react";

interface BookmarkButtonProps {
  surahNumber: number;
  ayahNumber?: number;
}

interface Bookmark {
  surah: number;
  ayah?: number;
  timestamp: number;
}

function getBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("quran-bookmarks") || "[]");
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
}

export function BookmarkButton({ surahNumber, ayahNumber }: BookmarkButtonProps) {
  const [version, setVersion] = useState(0);

  const isBookmarked = useMemo(() => {
    void version;
    const bookmarks = getBookmarks();
    return bookmarks.some((b) => b.surah === surahNumber && b.ayah === ayahNumber);
  }, [surahNumber, ayahNumber, version]);

  const toggle = useCallback(() => {
    const bookmarks = getBookmarks();
    if (isBookmarked) {
      const filtered = bookmarks.filter((b) => !(b.surah === surahNumber && b.ayah === ayahNumber));
      saveBookmarks(filtered);
    } else {
      bookmarks.push({
        surah: surahNumber,
        ayah: ayahNumber,
        timestamp: Date.now(),
      });
      saveBookmarks(bookmarks);
    }
    setVersion((v) => v + 1);
  }, [surahNumber, ayahNumber, isBookmarked]);

  return (
    <button
      onClick={toggle}
      className={`p-1.5 rounded-lg hover:scale-110 transition-all ${isBookmarked ? "text-secondary" : "text-outline hover:text-on-surface"}`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <svg
        className="w-5 h-5"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
