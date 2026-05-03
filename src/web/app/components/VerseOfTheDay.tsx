"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

interface VerseOfTheDayProps {
  totalSurahs: { number: number; name_en: string; name: string; verses: number }[];
}

function getDayOfYear(): number {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = now.getTime() - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const NOTABLE_VERSES = [
  { surah: 2, ayah: 255, label: "Ayat al-Kursi" },
  { surah: 1, ayah: 1, label: "Al-Fatiha" },
  { surah: 36, ayah: 1, label: "Ya-Sin" },
  { surah: 55, ayah: 13, label: "Ar-Rahman" },
  { surah: 112, ayah: 1, label: "Al-Ikhlas" },
  { surah: 2, ayah: 286, label: "End of Al-Baqarah" },
  { surah: 3, ayah: 185, label: "Aal-e-Imran" },
  { surah: 24, ayah: 35, label: "Ayat an-Nur" },
  { surah: 59, ayah: 22, label: "Al-Hashr" },
  { surah: 67, ayah: 1, label: "Al-Mulk" },
  { surah: 18, ayah: 10, label: "Al-Kahf" },
  { surah: 93, ayah: 1, label: "Ad-Duha" },
  { surah: 94, ayah: 5, label: "Ash-Sharh" },
  { surah: 2, ayah: 152, label: "Remembrance" },
  { surah: 3, ayah: 139, label: "Do not lose hope" },
  { surah: 13, ayah: 28, label: "Hearts find rest" },
  { surah: 65, ayah: 3, label: "Trust in Allah" },
  { surah: 2, ayah: 186, label: "I am near" },
  { surah: 94, ayah: 6, label: "With hardship comes ease" },
  { surah: 29, ayah: 69, label: "Strive for Us" },
  { surah: 49, ayah: 13, label: "Created you from male and female" },
  { surah: 16, ayah: 90, label: "Justice and kindness" },
  { surah: 3, ayah: 103, label: "Hold firmly together" },
  { surah: 2, ayah: 45, label: "Seek help in patience" },
  { surah: 39, ayah: 53, label: "Do not despair" },
  { surah: 6, ayah: 59, label: "Keys of the unseen" },
  { surah: 57, ayah: 4, label: "He is with you" },
  { surah: 40, ayah: 60, label: "Call upon Me" },
  { surah: 50, ayah: 16, label: "Closer than jugular vein" },
  { surah: 73, ayah: 8, label: "Devote yourself" },
];

export function VerseOfTheDay({ totalSurahs }: VerseOfTheDayProps) {
  const { t, dir, uiLang } = useUILanguage();
  const verse = useMemo(() => {
    const dayIndex = getDayOfYear() % NOTABLE_VERSES.length;
    return NOTABLE_VERSES[dayIndex];
  }, []);

  const surah = totalSurahs.find((s) => s.number === verse.surah);

  return (
    <Link
      href={`/surah/${verse.surah}?lang=en#verse-${verse.ayah}`}
      className="sakinah-card block mb-6 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-secondary-container text-secondary flex items-center justify-center text-lg flex-shrink-0 font-bold">
          ✦
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-secondary font-semibold mb-1 uppercase tracking-wide">
            {t.verseOfDay.title}
          </p>
          <p className="font-semibold text-sm text-on-surface">
            {surah?.name_en ?? `${t.lastRead.surah} ${formatNumber(verse.surah, uiLang)}`} (
            {surah?.name ?? ""}) — {t.surah.verse} {formatNumber(verse.ayah, uiLang)}
          </p>
          <p className="text-xs text-outline mt-1">{verse.label}</p>
        </div>
        <svg
          className={`w-5 h-5 text-outline flex-shrink-0 mt-1 ${dir === "rtl" ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
