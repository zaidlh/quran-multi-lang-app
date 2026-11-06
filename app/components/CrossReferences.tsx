"use client";

import { useState } from "react";
import Link from "next/link";

interface CrossReferencesProps {
  surahNumber: number;
  ayahNumber: number;
}

interface CrossRef {
  surah: number;
  ayah: number;
  topic: string;
}

const CROSS_REFERENCES: Record<string, CrossRef[]> = {
  "2:255": [
    { surah: 3, ayah: 2, topic: "Allah — the Living, the Sustainer" },
    { surah: 20, ayah: 111, topic: "Faces humbled before the Living" },
    { surah: 40, ayah: 65, topic: "He is the Living, no deity except Him" },
  ],
  "2:286": [
    { surah: 7, ayah: 42, topic: "No soul burdened beyond capacity" },
    { surah: 23, ayah: 62, topic: "We do not burden a soul beyond capacity" },
    { surah: 65, ayah: 7, topic: "Allah does not charge beyond capability" },
  ],
  "2:152": [
    { surah: 29, ayah: 45, topic: "Remembrance of Allah is greatest" },
    { surah: 33, ayah: 41, topic: "Remember Allah with much remembrance" },
    { surah: 13, ayah: 28, topic: "Hearts find rest in remembrance of Allah" },
  ],
  "2:186": [
    { surah: 40, ayah: 60, topic: "Call upon Me; I will respond" },
    { surah: 50, ayah: 16, topic: "Closer than the jugular vein" },
    { surah: 57, ayah: 4, topic: "He is with you wherever you are" },
  ],
  "94:5": [
    { surah: 94, ayah: 6, topic: "With hardship comes ease (repeated)" },
    { surah: 65, ayah: 7, topic: "After hardship Allah will bring ease" },
    { surah: 2, ayah: 185, topic: "Allah intends ease for you" },
  ],
  "112:1": [
    { surah: 2, ayah: 163, topic: "Your God is one God" },
    { surah: 21, ayah: 22, topic: "If there were gods besides Allah..." },
    { surah: 59, ayah: 22, topic: "He is Allah, other than whom there is no deity" },
  ],
  "1:1": [
    { surah: 27, ayah: 30, topic: "In the name of Allah, the Merciful" },
    { surah: 55, ayah: 1, topic: "The Most Merciful" },
    { surah: 11, ayah: 41, topic: "In the name of Allah is its course" },
  ],
  "24:35": [
    { surah: 39, ayah: 69, topic: "The earth will shine with the light of its Lord" },
    { surah: 57, ayah: 12, topic: "Their light proceeding before them" },
    { surah: 66, ayah: 8, topic: "Their light running before them" },
  ],
};

export function CrossReferences({ surahNumber, ayahNumber }: CrossReferencesProps) {
  const [open, setOpen] = useState(false);
  const key = `${surahNumber}:${ayahNumber}`;
  const refs = CROSS_REFERENCES[key];

  if (!refs) return null;

  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-4.51a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
        {refs.length} cross-references
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {refs.map((ref) => (
            <Link
              key={`${ref.surah}:${ref.ayah}`}
              href={`/surah/${ref.surah}#verse-${ref.ayah}`}
              className="block text-xs p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-colors"
            >
              <span className="text-primary font-medium">
                {ref.surah}:{ref.ayah}
              </span>{" "}
              — {ref.topic}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
