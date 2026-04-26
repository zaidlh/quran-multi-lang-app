"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

interface LastRead {
  surah: number;
  surahName: string;
  ayah: number;
  timestamp: number;
}

let cachedString: string | null = null;
let cachedValue: LastRead | null = null;

function getLastReadSnapshot(): LastRead | null {
  try {
    const stored = localStorage.getItem("quran-last-read");
    if (stored !== cachedString) {
      cachedString = stored;
      cachedValue = stored ? JSON.parse(stored) : null;
    }
    return cachedValue;
  } catch {
    return null;
  }
}

function getServerSnapshot(): LastRead | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function LastReadBanner() {
  const lastRead = useSyncExternalStore(subscribe, getLastReadSnapshot, getServerSnapshot);

  if (!lastRead) return null;

  return (
    <Link
      href={`/surah/${lastRead.surah}?lang=en#verse-${lastRead.ayah}`}
      className="block mb-6 p-4 rounded-lg bg-primary-light dark:bg-zinc-900 border border-primary/20 hover:border-primary transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Continue Reading</p>
          <p className="text-xs text-zinc-500 truncate">
            {lastRead.surahName} — Verse {lastRead.ayah}
          </p>
        </div>
        <svg className="w-5 h-5 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export function saveLastRead(surah: number, surahName: string, ayah: number) {
  if (typeof window === "undefined") return;
  const data: LastRead = { surah, surahName, ayah, timestamp: Date.now() };
  localStorage.setItem("quran-last-read", JSON.stringify(data));
}
