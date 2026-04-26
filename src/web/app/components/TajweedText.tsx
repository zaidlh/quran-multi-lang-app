"use client";

import { useState, useMemo } from "react";

interface TajweedTextProps {
  text: string;
}

const TAJWEED_RULES: { pattern: RegExp; className: string; label: string }[] = [
  {
    pattern: /[\u0651][\u064E\u064F\u0650]/g,
    className: "text-red-600 dark:text-red-400",
    label: "Shaddah",
  },
  {
    pattern:
      /\u0646[\u0652]?[\u062A\u062B\u062C\u062F\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0641\u0642\u0643\u0644]/g,
    className: "text-green-600 dark:text-green-400",
    label: "Ikhfa",
  },
  {
    pattern: /\u0646[\u0652]?[\u064A\u0646\u0645\u0648]/g,
    className: "text-orange-600 dark:text-orange-400",
    label: "Idgham",
  },
  {
    pattern: /\u0646[\u0652]?[\u0627\u0625\u0623\u0621\u0647\u0639\u062D\u063A\u062E]/g,
    className: "text-blue-600 dark:text-blue-400",
    label: "Izhar",
  },
  {
    pattern: /\u0646[\u0652]?\u0628/g,
    className: "text-pink-600 dark:text-pink-400",
    label: "Iqlab",
  },
  {
    pattern: /[\u064B\u064C\u064D]/g,
    className: "text-purple-600 dark:text-purple-400",
    label: "Tanween",
  },
  {
    pattern: /[\u0627\u0648\u064A][\u0652]/g,
    className: "text-teal-600 dark:text-teal-400",
    label: "Madd",
  },
];

function applyTajweed(text: string): { char: string; className: string }[] {
  const result: { char: string; className: string }[] = [];
  const matched = new Set<number>();

  for (const rule of TAJWEED_RULES) {
    let match;
    const regex = new RegExp(rule.pattern.source, "g");
    while ((match = regex.exec(text)) !== null) {
      for (let i = match.index; i < match.index + match[0].length; i++) {
        if (!matched.has(i)) {
          matched.add(i);
        }
      }
      for (let i = match.index; i < match.index + match[0].length; i++) {
        if (!result[i]) {
          result[i] = { char: text[i], className: rule.className };
        }
      }
    }
  }

  const output: { char: string; className: string }[] = [];
  for (let i = 0; i < text.length; i++) {
    output.push(result[i] || { char: text[i], className: "" });
  }
  return output;
}

const LEGEND = [
  { label: "Shaddah", className: "text-red-600 dark:text-red-400" },
  { label: "Ikhfa", className: "text-green-600 dark:text-green-400" },
  { label: "Idgham", className: "text-orange-600 dark:text-orange-400" },
  { label: "Izhar", className: "text-blue-600 dark:text-blue-400" },
  { label: "Iqlab", className: "text-pink-600 dark:text-pink-400" },
  { label: "Tanween", className: "text-purple-600 dark:text-purple-400" },
  { label: "Madd", className: "text-teal-600 dark:text-teal-400" },
];

export function TajweedText({ text }: TajweedTextProps) {
  const [enabled, setEnabled] = useState(false);

  const coloredChars = useMemo(() => {
    if (!enabled) return null;
    return applyTajweed(text);
  }, [text, enabled]);

  return (
    <div>
      <button
        onClick={() => setEnabled((prev) => !prev)}
        className="text-xs text-zinc-400 hover:text-primary transition-colors mb-1"
      >
        {enabled ? "Hide" : "Show"} Tajweed
      </button>
      {enabled && coloredChars && (
        <div>
          <p className="arabic-text text-xl leading-loose" dir="rtl">
            {coloredChars.map((c, i) =>
              c.className ? (
                <span key={i} className={c.className}>
                  {c.char}
                </span>
              ) : (
                c.char
              )
            )}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {LEGEND.map((item) => (
              <span key={item.label} className={`text-xs ${item.className}`}>
                ● {item.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
