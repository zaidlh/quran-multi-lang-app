"use client";

import { useState, useCallback } from "react";

interface PageData {
  pageNumber: number;
  verses: { surah: number; surahName: string; ayah: number; text: string }[];
}

interface MushafViewProps {
  pages: PageData[];
}

export function MushafView({ pages }: MushafViewProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goTo = useCallback(
    (page: number) => {
      if (page >= 0 && page < pages.length) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pages.length]
  );

  const page = pages[currentPage];
  if (!page) return null;

  const surahsOnPage = [...new Set(page.verses.map((v) => `${v.surahName} (${v.surah})`))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          ← Previous
        </button>
        <div className="text-center">
          <span className="text-sm font-medium">Page {page.pageNumber}</span>
          <span className="text-xs text-zinc-400 ml-2">of {pages.length}</span>
        </div>
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
          className="px-4 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="text-center text-xs text-zinc-500 mb-4">{surahsOnPage.join(" · ")}</div>

      <div className="bg-amber-50/50 dark:bg-zinc-900 border border-amber-200/50 dark:border-zinc-800 rounded-xl p-6 sm:p-10 min-h-[60vh]">
        <div className="space-y-4" dir="rtl">
          {page.verses.map((v) => (
            <span key={`${v.surah}-${v.ayah}`} className="arabic-text text-xl leading-[2.5]">
              {v.text}{" "}
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-primary/30 text-primary text-xs mx-1">
                {v.ayah}
              </span>{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <label className="text-sm text-zinc-500">Go to page:</label>
        <input
          type="number"
          min={1}
          max={pages.length}
          value={currentPage + 1}
          onChange={(e) => goTo(Number(e.target.value) - 1)}
          className="w-20 px-2 py-1 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-center"
        />
      </div>
    </div>
  );
}
