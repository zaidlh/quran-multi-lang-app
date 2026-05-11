"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

interface AudioPlayerProps {
  surahNumber: number;
  totalAyahs?: number;
  onAyahChange?: (ayahNumber: number | null) => void;
}

const RECITERS = [
  {
    id: "mishary_rashid_alafasy",
    name: "Mishary Alafasy",
    ayahPath: "Alafasy_128kbps",
    surahPath: "mishaari_raashid_al_3afaasee",
  },
  {
    id: "abdul_basit_murattal",
    name: "Abdul Basit",
    ayahPath: "Abdul_Basit_Murattal_192kbps",
    surahPath: "abdul_basit_murattal",
  },
  {
    id: "saad_al_ghamdi",
    name: "Saad Al-Ghamdi",
    ayahPath: "Ghamadi_40kbps",
    surahPath: "sa3d_al-ghaamidi/complete",
  },
  {
    id: "maher_al_muaiqly",
    name: "Maher Al-Muaiqly",
    ayahPath: "MaherAlMuaiqly128kbps",
    surahPath: "maher_256",
  },
];

type PlayMode = "surah" | "ayah";

interface AudioSettings {
  repeatEnabled: boolean;
  repeatCount: number;
  playbackSpeed: number;
  gapBetweenAyahs: number;
  loopStart: number | null;
  loopEnd: number | null;
}

export function AudioPlayer({ surahNumber, totalAyahs = 0, onAyahChange }: AudioPlayerProps) {
  const { t, uiLang } = useUILanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState(RECITERS[0].id);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playMode, setPlayMode] = useState<PlayMode>("surah");
  const [currentAyah, setCurrentAyah] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reciterModalOpen, setReciterModalOpen] = useState(false);
  
  // Advanced settings
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    repeatEnabled: false,
    repeatCount: 1,
    playbackSpeed: 1,
    gapBetweenAyahs: 0,
    loopStart: null,
    loopEnd: null,
  });
  
  // Repeat current ayah counter
  const repeatCountRef = useRef(0);

  const reciter = RECITERS.find((r) => r.id === currentReciter) ?? RECITERS[0];

  const getAudioUrl = useCallback(
    (mode: PlayMode, ayah: number) => {
      if (mode === "ayah") {
        return `https://everyayah.com/data/${reciter.ayahPath}/${String(surahNumber).padStart(3, "0")}${String(ayah).padStart(3, "0")}.mp3`;
      }
      return `https://download.quranicaudio.com/quran/${reciter.surahPath}/${String(surahNumber).padStart(3, "0")}.mp3`;
    },
    [reciter.ayahPath, reciter.surahPath, surahNumber]
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
    <div className="dark-screen rounded-2xl overflow-hidden">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.playbackRate = audioSettings.playbackSpeed;
            setDuration(audioRef.current.duration);
          }
        }}
        preload="none"
      />

      <div className="p-5 space-y-4">
        {/* Reciter name + controls */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-1">{t.audio.reciter}</p>
          <p className="text-white font-semibold">{reciter.name}</p>
        </div>

        {/* Play/Pause + progress */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary-fixed text-primary-container shadow-lg flex-shrink-0 hover:scale-105 transition-transform"
            aria-label={isPlaying ? t.audio.pause : t.audio.play}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="6,3 20,12 6,21" />
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
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/50">
              <span>{formatTime(duration ? (progress / 100) * duration : 0)}</span>
              <span>{duration ? formatTime(duration) : "--:--"}</span>
            </div>
          </div>

          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-2 rounded-lg transition-colors ${
              settingsOpen ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
            }`}
            aria-label={t.audio.settings}
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
        <div className="border-t border-white/10 p-4 space-y-4">
          {/* Reciter selection */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">{t.audio.reciter}</p>
            <button
              onClick={() => setReciterModalOpen(true)}
              className="w-full flex items-center justify-between text-sm border border-white/10 rounded-lg px-4 py-3 bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              <span>{reciter.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Playback mode */}
          {totalAyahs > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleModeToggle}
                className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                  playMode === "ayah"
                    ? "bg-secondary-fixed text-primary-container"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white"
                }`}
              >
                {playMode === "ayah"
                  ? `${t.surah.verse} ${formatNumber(currentAyah, uiLang)}/${formatNumber(totalAyahs, uiLang)}`
                  : t.audio.ayahMode}
              </button>
            </div>
          )}
          
          {/* Advanced controls */}
          <div className="grid grid-cols-2 gap-3">
            {/* Playback speed */}
            <div>
              <p className="text-xs text-white/50 mb-1">{t.audio.speed}</p>
              <select
                value={audioSettings.playbackSpeed}
                onChange={(e) => setAudioSettings(prev => ({ ...prev, playbackSpeed: Number(e.target.value) }))}
                className="w-full text-sm border border-white/10 rounded-lg px-3 py-2 bg-white/5 text-white"
              >
                <option value={0.5} className="text-black">0.5x</option>
                <option value={0.75} className="text-black">0.75x</option>
                <option value={1} className="text-black">1x</option>
                <option value={1.25} className="text-black">1.25x</option>
                <option value={1.5} className="text-black">1.5x</option>
                <option value={2} className="text-black">2x</option>
              </select>
            </div>
            
            {/* Repeat count */}
            <div>
              <p className="text-xs text-white/50 mb-1">{t.audio.repeat}</p>
              <select
                value={audioSettings.repeatCount}
                onChange={(e) => setAudioSettings(prev => ({ ...prev, repeatCount: Number(e.target.value) }))}
                className="w-full text-sm border border-white/10 rounded-lg px-3 py-2 bg-white/5 text-white"
              >
                <option value={1} className="text-black">1x</option>
                <option value={2} className="text-black">2x</option>
                <option value={3} className="text-black">3x</option>
                <option value={5} className="text-black">5x</option>
                <option value={10} className="text-black">10x</option>
              </select>
            </div>
          </div>
          
          {/* Gap between ayat */}
          <div>
            <p className="text-xs text-white/50 mb-1">{"Gap between verses"}</p>
            <input
              type="range"
              min={0}
              max={3000}
              step={500}
              value={audioSettings.gapBetweenAyahs}
              onChange={(e) => setAudioSettings(prev => ({ ...prev, gapBetweenAyahs: Number(e.target.value) }))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/50 mt-1">
              <span>0s</span>
              <span>{audioSettings.gapBetweenAyahs / 1000}s</span>
              <span>3s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
