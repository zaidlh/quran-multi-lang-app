"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReadingMode = "normal" | "focus" | "minimal" | "night" | "mushaf" | "translation" | "tafsir";

export interface LastRead {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText: string;
  translationText?: string;
  note?: string;
  createdAt: number;
}

export interface ReadingSettings {
  fontSize: number;
  lineSpacing: number;
  ayahSpacing: number;
  showTransliteration: boolean;
  showTajweed: boolean;
  showTranslation: boolean;
  translationLang: string;
  audioReciter: string;
  audioPlaybackSpeed: number;
}

interface QuranReaderState {
  // Reading mode
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;

  // Focused verse
  focusedVerse: number | null;
  setFocusedVerse: (verse: number | null) => void;

  // Last read tracking
  lastRead: LastRead | null;
  setLastRead: (lastRead: LastRead) => void;

  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, data: Partial<Bookmark>) => void;

  // Reading settings
  settings: ReadingSettings;
  updateSettings: (settings: Partial<ReadingSettings>) => void;

  // Audio state
  isPlaying: boolean;
  currentAyah: number;
  totalAyahs: number;
  audioProgress: number;
  isLoadingAudio: boolean;

  setIsPlaying: (playing: boolean) => void;
  setCurrentAyah: (ayah: number) => void;
  setTotalAyahs: (total: number) => void;
  setAudioProgress: (progress: number) => void;
  setIsLoadingAudio: (loading: boolean) => void;

  // Recitation repeat
  repeatCount: number;
  repeatEnabled: boolean;
  setRepeatCount: (count: number) => void;
  setRepeatEnabled: (enabled: boolean) => void;

  // A-B loop
  loopStart: number | null;
  loopEnd: number | null;
  setLoopPoints: (start: number | null, end: number | null) => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFilters: {
    surah?: number;
    juz?: number;
    revelationType?: "meccan" | "medinan";
  };
  setSearchFilters: (filters: Partial<QuranReaderState["searchFilters"]>) => void;

  // UI state
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;

  // Offline sync
  syncStatus: "idle" | "syncing" | "error";
  setSyncStatus: (status: "idle" | "syncing" | "error") => void;
}

const defaultSettings: ReadingSettings = {
  fontSize: 28,
  lineSpacing: 40,
  ayahSpacing: 16,
  showTransliteration: false,
  showTajweed: true,
  showTranslation: true,
  translationLang: "en",
  audioReciter: "ar.alafasy",
  audioPlaybackSpeed: 1,
};

export const useQuranReaderStore = create<QuranReaderState>()(
  persist(
    (set, get) => ({
      // Initial state
      readingMode: "normal",
      focusedVerse: null,
      lastRead: null,
      bookmarks: [],
      settings: defaultSettings,

      // Reading mode
      setReadingMode: (mode) => set({ readingMode: mode }),
      setFocusedVerse: (verse) => set({ focusedVerse: verse }),

      // Last read
      setLastRead: (lastRead) => set({ lastRead }),

      // Bookmarks
      addBookmark: (bookmark) => {
        const id = `bm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newBookmark: Bookmark = {
          ...bookmark,
          id,
          createdAt: Date.now(),
        };
        set((state) => ({
          bookmarks: [...state.bookmarks, newBookmark],
        }));
      },
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },
      updateBookmark: (id, data) => {
        set((state) => ({
          bookmarks: state.bookmarks.map((b) =>
            b.id === id ? { ...b, ...data } : b
          ),
        }));
      },

      // Settings
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // Audio state
      isPlaying: false,
      currentAyah: 1,
      totalAyahs: 0,
      audioProgress: 0,
      isLoadingAudio: false,
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setCurrentAyah: (currentAyah) => set({ currentAyah }),
      setTotalAyahs: (totalAyahs) => set({ totalAyahs }),
      setAudioProgress: (audioProgress) => set({ audioProgress }),
      setIsLoadingAudio: (isLoadingAudio) => set({ isLoadingAudio }),

      // Recitation repeat
      repeatCount: 1,
      repeatEnabled: false,
      setRepeatCount: (repeatCount) => set({ repeatCount }),
      setRepeatEnabled: (repeatEnabled) => set({ repeatEnabled }),

      // A-B loop
      loopStart: null,
      loopEnd: null,
      setLoopPoints: (loopStart, loopEnd) => set({ loopStart, loopEnd }),

      // Search state
      searchQuery: "",
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      searchFilters: {},
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),

      // UI state
      showSidebar: false,
      setShowSidebar: (showSidebar) => set({ showSidebar }),

      // Sync state
      syncStatus: "idle",
      setSyncStatus: (syncStatus) => set({ syncStatus }),
    }),
    {
      name: "quran-reader-storage",
      partialize: (state) => ({
        lastRead: state.lastRead,
        bookmarks: state.bookmarks,
        settings: state.settings,
        readingMode: state.readingMode,
      }),
    }
  )
);