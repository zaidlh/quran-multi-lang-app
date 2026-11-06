"use client";

import { useState, useCallback, useMemo } from "react";

interface HifzModeProps {
  verses: { number: number; text: string }[];
  surahNumber: number;
}

type HiddenLevel = 0 | 1 | 2 | 3;

export function HifzMode({ verses, surahNumber }: HifzModeProps) {
  const [active, setActive] = useState(false);
  const [level, setLevel] = useState<HiddenLevel>(1);
  const [revealedVerses, setRevealedVerses] = useState<Set<number>>(new Set());

  const toggleReveal = useCallback((verseNum: number) => {
    setRevealedVerses((prev) => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
      } else {
        next.add(verseNum);
      }
      return next;
    });
  }, []);

  const processedVerses = useMemo(() => {
    return verses.map((v) => {
      if (revealedVerses.has(v.number)) {
        return { ...v, displayText: v.text, hidden: false };
      }

      const words = v.text.split(" ");
      let displayWords: string[];

      switch (level) {
        case 0:
          displayWords = words;
          break;
        case 1:
          displayWords = words.map((w, i) => (i % 3 === 0 ? w : "‎●●●"));
          break;
        case 2:
          displayWords = words.map((w, i) => (i === 0 ? w : "‎●●●"));
          break;
        case 3:
          displayWords = words.map(() => "‎●●●");
          break;
        default:
          displayWords = words;
      }

      return { ...v, displayText: displayWords.join(" "), hidden: level > 0 };
    });
  }, [verses, level, revealedVerses]);

  if (!active) {
    return (
      <button
        onClick={() => setActive(true)}
        className="mb-4 flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-primary hover:text-primary transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
          />
        </svg>
        Hifz Mode
      </button>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
        <span className="text-sm font-medium">Hifz Mode</span>
        <div className="flex items-center gap-1">
          {([0, 1, 2, 3] as HiddenLevel[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLevel(l);
                setRevealedVerses(new Set());
              }}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                level === l
                  ? "bg-primary text-white"
                  : "border border-zinc-300 dark:border-zinc-700 hover:border-primary"
              }`}
            >
              {l === 0 ? "Off" : `Level ${l}`}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setActive(false);
            setLevel(1);
            setRevealedVerses(new Set());
          }}
          className="ml-auto text-xs text-zinc-500 hover:text-primary"
        >
          Exit
        </button>
      </div>

      {level > 0 && (
        <p className="text-xs text-zinc-500 mb-3">
          {level === 1 && "Every 3rd word is shown. Tap a verse to reveal it."}
          {level === 2 && "Only the first word of each verse is shown."}
          {level === 3 && "All words are hidden. Recite from memory!"}
        </p>
      )}

      <div className="space-y-4">
        {processedVerses.map((v) => (
          <button
            key={`${surahNumber}-${v.number}`}
            onClick={() => level > 0 && toggleReveal(v.number)}
            className={`block w-full text-right p-3 rounded-lg border transition-colors ${
              v.hidden && !revealedVerses.has(v.number)
                ? "border-primary/20 hover:border-primary/40 cursor-pointer"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <span className="text-xs text-zinc-400 mr-2">{v.number}</span>
            <span className="arabic-text text-lg" dir="rtl">
              {v.displayText}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
