"use client";

import { useState } from "react";

interface TransliterationToggleProps {
  arabicText: string;
  verseNumber: number;
  surahNumber: number;
}

const BASIC_TRANSLITERATION: Record<string, string> = {
  ا: "a",
  ب: "b",
  ت: "t",
  ث: "th",
  ج: "j",
  ح: "h",
  خ: "kh",
  د: "d",
  ذ: "dh",
  ر: "r",
  ز: "z",
  س: "s",
  ش: "sh",
  ص: "s",
  ض: "d",
  ط: "t",
  ظ: "z",
  ع: "'",
  غ: "gh",
  ف: "f",
  ق: "q",
  ك: "k",
  ل: "l",
  م: "m",
  ن: "n",
  ه: "h",
  و: "w",
  ي: "y",
  ء: "'",
  ة: "h",
  ى: "a",
  آ: "aa",
  إ: "i",
  أ: "a",
  ؤ: "u",
  ئ: "i",
  "\u064E": "a",
  "\u064F": "u",
  "\u0650": "i",
  "\u064B": "an",
  "\u064C": "un",
  "\u064D": "in",
  "\u0651": "",
  "\u0652": "",
};

function transliterate(arabic: string): string {
  let result = "";
  for (const char of arabic) {
    if (char === " " || char === "\n") {
      result += " ";
    } else if (BASIC_TRANSLITERATION[char] !== undefined) {
      result += BASIC_TRANSLITERATION[char];
    }
  }
  return result.replace(/\s+/g, " ").trim();
}

export function TransliterationToggle({
  arabicText,
  verseNumber,
  surahNumber,
}: TransliterationToggleProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-1">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="text-xs text-zinc-400 hover:text-primary transition-colors"
        aria-label={`${show ? "Hide" : "Show"} transliteration for verse ${surahNumber}:${verseNumber}`}
      >
        {show ? "Hide" : "Abc"} transliteration
      </button>
      {show && (
        <p className="text-sm text-zinc-500 italic mt-1 leading-relaxed" dir="ltr">
          {transliterate(arabicText)}
        </p>
      )}
    </div>
  );
}
