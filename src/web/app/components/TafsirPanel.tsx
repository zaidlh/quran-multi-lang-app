"use client";

import { useState, useCallback } from "react";

interface TafsirSource {
  id: string;
  name: string;
  language: string;
}

const TAFSIR_SOURCES: TafsirSource[] = [
  { id: "en-tafisr-ibn-kathir", name: "Ibn Kathir (English)", language: "en" },
  { id: "en-tafseer-tafheem", name: "Tafheem ul-Quran", language: "en" },
  { id: "ar-tafsir-ibn-kathir", name: "Ibn Kathir (Arabic)", language: "ar" },
  { id: "ar-tafsir-al-jalalayn", name: "Al-Jalalayn", language: "ar" },
  { id: "ar-tafsir-muyassar", name: "Al-Muyassar", language: "ar" },
  { id: "ar-tafseer-al-qurtubi", name: "Al-Qurtubi", language: "ar" },
];

interface TafsirEntry {
  id: number;
  text: string;
}

interface TafsirPanelProps {
  surahNumber: number;
  ayahNumber: number;
}

export function TafsirPanel({ surahNumber, ayahNumber }: TafsirPanelProps) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState(TAFSIR_SOURCES[0].id);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTafsir = useCallback(
    async (tafsirId: string) => {
      setLoading(true);
      setError("");
      setText("");
      try {
        const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${tafsirId}/${surahNumber}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load tafsir");
        const data: { ayahs: TafsirEntry[] } = await res.json();
        const entry = data.ayahs?.find((a) => a.id === ayahNumber);
        setText(entry?.text || "Tafsir not available for this verse.");
      } catch {
        setError("Could not load tafsir. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [surahNumber, ayahNumber]
  );

  const handleToggle = () => {
    if (!open && !text && !loading) {
      fetchTafsir(source);
    }
    setOpen((prev) => !prev);
  };

  const handleSourceChange = (newSource: string) => {
    setSource(newSource);
    fetchTafsir(newSource);
  };

  const isArabicSource = TAFSIR_SOURCES.find((s) => s.id === source)?.language === "ar";

  return (
    <div className="mt-2">
      <button
        onClick={handleToggle}
        className="text-xs text-primary hover:underline flex items-center gap-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {open ? "Hide Tafsir" : "Tafsir"}
      </button>

      {open && (
        <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm">
          <select
            value={source}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="mb-2 text-xs border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-800 w-full"
          >
            {TAFSIR_SOURCES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {loading && <p className="text-zinc-500 text-xs">Loading tafsir...</p>}
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {!loading && !error && text && (
            <div
              className={`leading-relaxed ${isArabicSource ? "arabic-text text-base" : ""}`}
              dir={isArabicSource ? "rtl" : "ltr"}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </div>
      )}
    </div>
  );
}
