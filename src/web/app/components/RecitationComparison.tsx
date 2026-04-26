"use client";

import { useState, useRef, useCallback } from "react";

interface RecitationComparisonProps {
  surahNumber: number;
  ayahNumber: number;
}

const RECITERS = [
  {
    id: "alafasy",
    name: "Mishary Alafasy",
    baseUrl: "https://everyayah.com/data/Alafasy_128kbps",
  },
  {
    id: "abdul_basit",
    name: "Abdul Basit",
    baseUrl: "https://everyayah.com/data/Abdul_Basit_Murattal_192kbps",
  },
  {
    id: "ghamdi",
    name: "Saad Al-Ghamdi",
    baseUrl: "https://everyayah.com/data/Ghamadi_40kbps",
  },
  {
    id: "muaiqly",
    name: "Maher Al-Muaiqly",
    baseUrl: "https://everyayah.com/data/MauroHaloMuaiqly128kbps",
  },
];

function getAudioUrl(baseUrl: string, surah: number, ayah: number): string {
  const s = String(surah).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  return `${baseUrl}/${s}${a}.mp3`;
}

export function RecitationComparison({ surahNumber, ayahNumber }: RecitationComparisonProps) {
  const [open, setOpen] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(
    (reciterId: string, baseUrl: string) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (playingId === reciterId) {
        setPlayingId(null);
        return;
      }

      const audio = new Audio(getAudioUrl(baseUrl, surahNumber, ayahNumber));
      audio.addEventListener("ended", () => setPlayingId(null));
      audio.play().catch(() => setPlayingId(null));
      audioRef.current = audio;
      setPlayingId(reciterId);
    },
    [playingId, surahNumber, ayahNumber]
  );

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
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
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
          />
        </svg>
        Compare reciters
      </button>
    );
  }

  return (
    <div className="mt-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">Compare Reciters</span>
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
            }
            setPlayingId(null);
            setOpen(false);
          }}
          className="text-xs text-zinc-400 hover:text-primary"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {RECITERS.map((reciter) => (
          <button
            key={reciter.id}
            onClick={() => play(reciter.id, reciter.baseUrl)}
            className={`text-xs p-2 rounded border transition-colors ${
              playingId === reciter.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-zinc-200 dark:border-zinc-700 hover:border-primary"
            }`}
          >
            {playingId === reciter.id ? "⏸ " : "▶ "}
            {reciter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
