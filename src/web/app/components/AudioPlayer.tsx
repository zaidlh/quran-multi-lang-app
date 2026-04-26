"use client";

import { useRef, useState, useCallback } from "react";

interface AudioPlayerProps {
  surahNumber: number;
  ayahNumber?: number;
  reciterId?: string;
}

const RECITERS = [
  {
    id: "mishary_rashid_alafasy",
    name: "Mishary Alafasy",
    path: "Alafasy_128kbps",
  },
  {
    id: "abdul_basit_murattal",
    name: "Abdul Basit",
    path: "Abdul_Basit_Murattal_192kbps",
  },
  {
    id: "saad_al_ghamdi",
    name: "Saad Al-Ghamdi",
    path: "Saad_Al_Ghamdi_128kbps",
  },
  {
    id: "maher_al_muaiqly",
    name: "Maher Al-Muaiqly",
    path: "MauroHammad_128kbps",
  },
];

export function AudioPlayer({
  surahNumber,
  ayahNumber,
  reciterId = "mishary_rashid_alafasy",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState(reciterId);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const reciter = RECITERS.find((r) => r.id === currentReciter) ?? RECITERS[0];

  const audioUrl = ayahNumber
    ? `https://everyayah.com/data/${reciter.path}/${String(surahNumber).padStart(3, "0")}${String(ayahNumber).padStart(3, "0")}.mp3`
    : `https://download.quranicaudio.com/quran/${reciter.path.toLowerCase().replace(/_\d+kbps$/, "")}/${String(surahNumber).padStart(3, "0")}.mp3`;

  const handleReciterChange = useCallback(
    (newReciter: string) => {
      setCurrentReciter(newReciter);
      setIsPlaying(false);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    },
    []
  );

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
    setDuration(audio.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const time = (parseFloat(e.target.value) / 100) * audio.duration;
    audio.currentTime = time;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-primary-light dark:bg-zinc-900 rounded-lg p-4 space-y-3">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        preload="none"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90 transition-opacity"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>
              {formatTime(duration ? (progress / 100) * duration : 0)}
            </span>
            <span>{duration ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>
      </div>

      <select
        value={currentReciter}
        onChange={(e) => handleReciterChange(e.target.value)}
        className="w-full text-sm border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-800"
      >
        {RECITERS.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}
