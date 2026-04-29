"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

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

function formatTimeAgo(timestamp: number): string {
  const diff = new Date().getTime() - timestamp;
  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (days > 0) return `${days}d ago`;
  if (hrs  > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "just now";
}

export function LastReadBanner() {
  const lastRead = useSyncExternalStore(subscribe, getLastReadSnapshot, getServerSnapshot);
  const { t, dir, uiLang } = useUILanguage();

  if (!lastRead) return null;

  const timeAgo = formatTimeAgo(lastRead.timestamp);

  return (
    <Link
      href={`/surah/${lastRead.surah}?lang=en#verse-${lastRead.ayah}`}
      className="group flex items-center gap-4 mb-5 p-4 rounded-2xl border border-border bg-surface hover:border-primary/40 hover:shadow-md transition-all duration-300 animate-fade-in-up"
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105"
        style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-primary mb-0.5 section-label tracking-wide">
          {t.lastRead.continue}
        </p>
        <p className="text-sm font-semibold text-foreground truncate">
          {lastRead.surahName}
          <span className="text-muted font-normal">
            {" — "}{t.lastRead.ayah} {formatNumber(lastRead.ayah, uiLang)}
          </span>
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="hidden sm:block text-xs text-muted">{timeAgo}</span>
        <div
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200"
          style={{ background: "var(--primary-light)", color: "var(--primary)" }}
        >
          {dir === "ar" ? "استمر" : "Resume"}
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${dir === "rtl" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function saveLastRead(surah: number, surahName: string, ayah: number) {
  if (typeof window === "undefined") return;
  const data: LastRead = { surah, surahName, ayah, timestamp: Date.now() };
  localStorage.setItem("quran-last-read", JSON.stringify(data));
}
