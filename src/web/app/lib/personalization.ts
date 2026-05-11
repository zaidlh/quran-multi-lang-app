"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserPreferences {
  uiLanguage: string;
  translationLang: string;
  reciter: string;
  fontSize: number;
  theme: "light" | "dark" | "auto";
}

export interface ReadingStats {
  totalReadAyahs: number;
  totalSurahsRead: number;
  lastReadDate: string;
  streakCount: number;
  averageSessionMinutes: number;
  favoriteReciters: string[];
  favoriteSurahs: number[];
  favoriteThemes: string[];
  sessionsCount: number;
}

export interface MemorizationProgress {
  surahNumber: number;
  ayahRange: { start: number; end: number };
  masteryLevel: number; // 0-100
  lastReviewDate: string;
  nextReviewDate: string;
  difficulty: "easy" | "medium" | "hard";
  reviewCount: number;
}

export interface WeakArea {
  surahNumber: number;
  ayahNumber: number;
  weaknessScore: number; // 0-100
  lastAttemptDate: string;
  attempts: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  createdAt: number;
  preferences: UserPreferences;
  stats: ReadingStats;
  memorization: MemorizationProgress[];
  weakAreas: WeakArea[];
}

interface PersonalizationState {
  // User profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  
  // Reading behavior tracking
  currentSession: {
    startTime: number;
    surahNumber: number;
    ayahsRead: number[];
  };
  startSession: (surahNumber: number) => void;
  endSession: () => void;
  recordAyahRead: (ayahNumber: number, timeSpent: number) => void;
  
  // Statistics
  stats: ReadingStats;
  incrementStat: (key: keyof ReadingStats, value: any) => void;
  
  // Memorization
  updateMemorization: (surahNumber: number, range: { start: number; end: number }, mastery: number) => void;
  markWeakArea: (surahNumber: number, ayahNumber: number, weakness: number) => void;
  getNextReviewItems: () => MemorizationProgress[];
  
  // Recommendations
  recommendations: {
    dailyAyah?: { surahNumber: number; ayahNumber: number };
    suggestedSurahs: number[];
    relatedThemes: string[];
  };
  generateRecommendations: () => void;
  
  // Goals
  dailyGoal: {
    ayahsToRead: number;
    minutesToRead: number;
    currentProgress: number;
  };
  setDailyGoal: (ayahs: number, minutes: number) => void;
  updateProgress: ( ayahs: number) => void;
}

const defaultProfile: UserProfile = {
  id: "",
  displayName: "Reader",
  createdAt: Date.now(),
  preferences: {
    uiLanguage: "en",
    translationLang: "en",
    reciter: "ar.alafasy",
    fontSize: 28,
    theme: "auto",
  },
  stats: {
    totalReadAyahs: 0,
    totalSurahsRead: 0,
    lastReadDate: "",
    streakCount: 0,
    averageSessionMinutes: 0,
    favoriteReciters: [],
    favoriteSurahs: [],
    favoriteThemes: [],
    sessionsCount: 0,
  },
  memorization: [],
  weakAreas: [],
};

export const usePersonalizationStore = create<PersonalizationState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      
      updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates },
      })),
      
      updatePreferences: (prefs) => set((state) => ({
        profile: {
          ...state.profile,
          preferences: { ...state.profile.preferences, ...prefs },
        },
      })),
      
      currentSession: {
        startTime: 0,
        surahNumber: 0,
        ayahsRead: [],
      },
      
      startSession: (surahNumber) => set({
        currentSession: {
          startTime: Date.now(),
          surahNumber,
          ayahsRead: [],
        },
      }),
      
      endSession: () => {
        const state = get();
        const { currentSession, stats } = state;
        const duration = Date.now() - currentSession.startTime;
        const minutes = Math.round(duration / 60000);
        
        // Update streak if last read was yesterday or today
        const today = new Date().toDateString();
        const lastRead = stats.lastReadDate ? new Date(stats.lastReadDate).toDateString() : null;
        
        let streak = stats.streakCount;
        if (lastRead !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastRead === yesterday.toDateString()) {
            streak++;
          } else if (!lastRead || lastRead !== today) {
            streak = 1;
          }
        }
        
        set({
          currentSession: { startTime: 0, surahNumber: 0, ayahsRead: [] },
          stats: {
            ...stats,
            lastReadDate: today,
            streakCount: streak,
            sessionsCount: stats.sessionsCount + 1,
            averageSessionMinutes: Math.round(
              (stats.averageSessionMinutes * stats.sessionsCount + minutes) /
              (stats.sessionsCount + 1)
            ),
          },
        });
      },
      
      recordAyahRead: (ayahNumber, timeSpent) => set((state) => {
        const isNew = !state.currentSession.ayahsRead.includes(ayahNumber);
        if (!isNew) return state;
        
        const newSession = {
          ...state.currentSession,
          ayahsRead: [...state.currentSession.ayahsRead, ayahNumber],
        };
        
        return {
          currentSession: newSession,
          stats: {
            ...state.stats,
            totalReadAyahs: state.stats.totalReadAyahs + 1,
          },
        };
      }),
      
      stats: defaultProfile.stats,
      
      incrementStat: (key, value) => set((state) => ({
        stats: { ...state.stats, [key]: value },
      })),
      
      updateMemorization: (surahNumber, range, mastery) => set((state) => {
        const existing = state.profile.memorization.find(
          (m) => m.surahNumber === surahNumber
        );
        
        const entry: MemorizationProgress = {
          surahNumber,
          ayahRange: range,
          masteryLevel: mastery,
          lastReviewDate: new Date().toISOString(),
          nextReviewDate: new Date(Date.now() + mastery * 864000).toISOString(), // Adaptive
          difficulty: mastery < 30 ? "hard" : mastery < 70 ? "medium" : "easy",
          reviewCount: existing ? existing.reviewCount + 1 : 1,
        };
        
        if (existing) {
          return {
            profile: {
              ...state.profile,
              memorization: state.profile.memorization.map((m) =>
                m.surahNumber === surahNumber ? entry : m
              ),
            },
          };
        }
        
        return {
          profile: {
            ...state.profile,
            memorization: [...state.profile.memorization, entry],
          },
        };
      }),
      
      markWeakArea: (surahNumber, ayahNumber, weakness) => set((state) => {
        const existing = state.profile.weakAreas.find(
          (w) => w.surahNumber === surahNumber && w.ayahNumber === ayahNumber
        );
        
        const entry: WeakArea = {
          surahNumber,
          ayahNumber,
          weaknessScore: weakness,
          lastAttemptDate: new Date().toISOString(),
          attempts: existing ? existing.attempts + 1 : 1,
        };
        
        if (existing) {
          return {
            profile: {
              ...state.profile,
              weakAreas: state.profile.weakAreas.map((w) =>
                w.surahNumber === surahNumber && w.ayahNumber === ayahNumber
                  ? entry
                  : w
              ),
            },
          };
        }
        
        return {
          profile: {
            ...state.profile,
            weakAreas: [...state.profile.weakAreas, entry],
          },
        };
      }),
      
      getNextReviewItems: () => {
        const state = get();
        const now = new Date().toISOString();
        
        return state.profile.memorization
          .filter((m) => m.nextReviewDate <= now)
          .sort((a, b) => a.masteryLevel - b.masteryLevel)
          .slice(0, 10);
      },
      
      recommendations: {
        suggestedSurahs: [],
        relatedThemes: [],
      },
      
      generateRecommendations: () => {
        const state = get();
        const { stats, weakAreas } = state.profile;
        
        // Recommend based on weak areas
        const weakSurahs = [...new Set(weakAreas.map((w) => w.surahNumber))].slice(0, 3);
        
        // Get suggestions
        const suggestions = [
          ...weakSurahs,
          ...(stats.favoriteSurahs || []).slice(0, 2),
        ].filter(Boolean);
        
        const dailyAyah = {
          surahNumber: 1 + Math.floor(Math.random() * 114),
          ayahNumber: 1,
        };
        
        set({
          recommendations: {
            dailyAyah,
            suggestedSurahs: suggestions,
            relatedThemes: stats.favoriteThemes || [],
          },
        });
      },
      
      dailyGoal: {
        ayahsToRead: 20,
        minutesToRead: 15,
        currentProgress: 0,
      },
      
      setDailyGoal: (ayahs, minutes) => set({
        dailyGoal: { ...get().dailyGoal, ayahsToRead: ayahs, minutesToRead: minutes },
      }),
      
      updateProgress: ( ayahs) => set((state) => ({
        dailyGoal: {
          ...state.dailyGoal,
          currentProgress: state.dailyGoal.currentProgress + ayahs,
        },
      })),
    }),
    {
      name: "quran-personalization-storage",
    }
  )
);

// Hook for accessing personalization
export function useUserProfile() {
  return usePersonalizationStore((state) => state.profile);
}

export function useReadingStats() {
  return usePersonalizationStore((state) => state.stats);
}

export function useDailyGoal() {
  return usePersonalizationStore((state) => state.dailyGoal);
}

export function useRecommendations() {
  return usePersonalizationStore((state) => state.recommendations);
}