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
  { surah: 2,  ayah: 255, label: "Ayat al-Kursi" },
  { surah: 1,  ayah: 1,   label: "Al-Fatiha" },
  { surah: 36, ayah: 1,   label: "Ya-Sin" },
  { surah: 55, ayah: 13,  label: "Ar-Rahman" },
  { surah: 112,ayah: 1,   label: "Al-Ikhlas" },
  { surah: 2,  ayah: 286, label: "End of Al-Baqarah" },
  { surah: 3,  ayah: 185, label: "Aal-e-Imran" },
  { surah: 24, ayah: 35,  label: "Ayat an-Nur" },
  { surah: 59, ayah: 22,  label: "Al-Hashr" },
  { surah: 67, ayah: 1,   label: "Al-Mulk" },
  { surah: 18, ayah: 10,  label: "Al-Kahf" },
  { surah: 93, ayah: 1,   label: "Ad-Duha" },
  { surah: 94, ayah: 5,   label: "Ash-Sharh" },
  { surah: 2,  ayah: 152, label: "Remembrance" },
  { surah: 3,  ayah: 139, label: "Do not lose hope" },
  { surah: 13, ayah: 28,  label: "Hearts find rest" },
  { surah: 65, ayah: 3,   label: "Trust in Allah" },
  { surah: 2,  ayah: 186, label: "I am near" },
  { surah: 94, ayah: 6,   label: "With hardship comes ease" },
  { surah: 29, ayah: 69,  label: "Strive for Us" },
  { surah: 49, ayah: 13,  label: "Created you from male and female" },
  { surah: 16, ayah: 90,  label: "Justice and kindness" },
  { surah: 3,  ayah: 103, label: "Hold firmly together" },
  { surah: 2,  ayah: 45,  label: "Seek help in patience" },
  { surah: 39, ayah: 53,  label: "Do not despair" },
  { surah: 6,  ayah: 59,  label: "Keys of the unseen" },
  { surah: 57, ayah: 4,   label: "He is with you" },
  { surah: 40, ayah: 60,  label: "Call upon Me" },
  { surah: 50, ayah: 16,  label: "Closer than jugular vein" },
  { surah: 73, ayah: 8,   label: "Devote yourself" },
];

export function VerseOfTheDay({ totalSurahs }: VerseOfTheDayProps) {
  const { t, dir, uiLang } = useUILanguage();

  const verse = useMemo(() => {
    const idx = getDayOfYear() % NOTABLE_VERSES.length;
    return NOTABLE_VERSES[idx];
  }, []);

  const surah = totalSurahs.find((s) => s.number === verse.surah);

  return (
    <Link
      href={`/surah/${verse.surah}?lang=en#verse-${verse.ayah}`}
      className="group block mb-5 rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-primary)] animate-fade-in-up"
    >
      <div
        className="relative p-5"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-light) 0%, color-mix(in srgb, var(--primary-light) 30%, var(--surface)) 100%)",
        }}
      >
        {/* Decorative quote mark */}
        <span
          className="absolute top-3 end-5 text-5xl font-serif leading-none select-none opacity-15"
          style={{ color: "var(--primary)" }}
          aria-hidden="true"
        >
          ❝
        </span>

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm animate-float"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}
          >
            ✦
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="section-label mb-1.5" style={{ color: "var(--primary)" }}>
              {t.verseOfDay.title}
            </p>
            <p className="font-bold text-sm text-foreground leading-snug">
              {surah?.name_en ?? `${t.lastRead.surah} ${formatNumber(verse.surah, uiLang)}`}
              {surah?.name && (
                <span className="arabic-text text-base ms-1.5 font-normal" dir="rtl" style={{ lineHeight: 1.6 }}>
                  ({surah.name})
                </span>
              )}
              <span className="text-muted font-normal ms-1">
                — {t.surah.verse} {formatNumber(verse.ayah, uiLang)}
              </span>
            </p>
            <p className="mt-1 text-xs text-muted italic">{verse.label}</p>
          </div>

          {/* Arrow */}
          <svg
            className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${dir === "rtl" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
            style={{ color: "var(--primary)" }}
            fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
