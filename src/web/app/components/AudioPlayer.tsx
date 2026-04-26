"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface AudioPlayerProps {
  surahNumber: number;
  totalAyahs?: number;
  onAyahChange?: (ayahNumber: number | null) => void;
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

type PlayMode = "surah" | "ayah";

export function AudioPlayer({ surahNumber, totalAyahs = 0, onAyahChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState(RECITERS[0].id);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playMode, setPlayMode] = useState<PlayMode>("surah");
  const [currentAyah, setCurrentAyah] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const reciter = RECITERS.find((r) => r.id === currentReciter) ?? RECITERS[0];

  const getAudioUrl = useCallback(
    (mode: PlayMode, ayah: number) => {
      if (mode === "ayah") {
        return `https://everyayah.com/data/${reciter.path}/${String(surahNumber).padStart(3, "0")}${String(ayah).padStart(3, "0")}.mp3`;
      }
      return `https://download.quranicaudio.com/quran/${reciter.path.toLowerCase().replace(/_\d+kbps$/, "")}/${String(surahNumber).padStart(3, "0")}.mp3`;
    },
    [reciter.path, surahNumber]
  );

  const audioUrl = getAudioUrl(playMode, currentAyah);

  const prevAyahRef = useRef({ currentAyah, isPlaying, playMode });
  useEffect(() => {
    const prev = prevAyahRef.current;
    const changed =
      prev.currentAyah !== currentAyah ||
      prev.isPlaying !== isPlaying ||
      prev.playMode !== playMode;
    prevAyahRef.current = { currentAyah, isPlaying, playMode };
    if (!changed) return;
    if (playMode === "ayah" && isPlaying) {
      onAyahChange?.(currentAyah);
    } else if (!isPlaying) {
      onAyahChange?.(null);
    }
  }, [currentAyah, isPlaying, playMode, onAyahChange]);

  const handleReciterChange = useCallback((newReciter: string) => {
    setCurrentReciter(newReciter);
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

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

  const handleEnded = useCallback(() => {
    if (playMode === "ayah" && currentAyah < totalAyahs) {
      setCurrentAyah((prev) => prev + 1);
      setTimeout(() => {
        audioRef.current?.play().catch(() => {});
      }, 300);
    } else {
      setIsPlaying(false);
      onAyahChange?.(null);
    }
  }, [playMode, currentAyah, totalAyahs, onAyahChange]);

  const handleModeToggle = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    onAyahChange?.(null);
    setPlayMode((prev) => (prev === "surah" ? "ayah" : "surah"));
    setCurrentAyah(1);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        preload="none"
      />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex-shrink-0"
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
              className="w-full h-1.5 accent-primary cursor-pointer rounded-full"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>{formatTime(duration ? (progress / 100) * duration : 0)}</span>
              <span>{duration ? formatTime(duration) : "--:--"}</span>
            </div>
          </div>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-2 rounded-lg transition-colors ${
              settingsOpen
                ? "bg-primary-light text-primary"
                : "text-muted hover:bg-surface-elevated"
            }`}
            aria-label="Audio settings"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {settingsOpen && (
        <div className="border-t border-border p-4 bg-surface-elevated/50 space-y-3">
          <div className="flex items-center gap-2">
            <select
              value={currentReciter}
              onChange={(e) => handleReciterChange(e.target.value)}
              className="flex-1 text-sm border border-border rounded-lg px-3 py-2 bg-surface-elevated"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            {totalAyahs > 0 && (
              <button
                onClick={handleModeToggle}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                  playMode === "ayah"
                    ? "bg-primary text-white"
                    : "bg-surface border border-border hover:border-primary text-muted hover:text-primary"
                }`}
              >
                {playMode === "ayah" ? `Ayah ${currentAyah}/${totalAyahs}` : "Verse-by-verse"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
