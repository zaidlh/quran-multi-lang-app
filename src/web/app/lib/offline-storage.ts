"use client";

import { get, set, del, keys, createStore } from "idb-keyval";

// Custom store for Quran data
const quranDataStore = createStore("quran-data", "main");

// Quran text cache keys
const QURAN_TEXTS_DB = "quran-texts";
const TRANSLATIONS_DB = "translations";
const TAFSIR_DB = "tafsir";
const AUDIO_DB = "audio";

// Audio chunks storage
const audioStore = createStore("quran-audio", "chunks");

// Audio download status tracking
export interface AudioDownloadStatus {
  reciter: string;
  surahNumber: number;
  status: "pending" | "downloading" | "complete" | "error";
  progress: number;
  error?: string;
}

// Quran text caching
export async function cacheQuranText(surahNumber: number, verses: string[]): Promise<void> {
  await set(`surah-${surahNumber}`, verses, quranDataStore);
}

export async function getCachedQuranText(surahNumber: number): Promise<string[] | undefined> {
  return get(`surah-${surahNumber}`, quranDataStore);
}

// Translation caching
export async function cacheTranslation(
  surahNumber: number,
  lang: string,
  verses: string[]
): Promise<void> {
  await set(`${lang}-surah-${surahNumber}`, verses, quranDataStore);
}

export async function getCachedTranslation(
  surahNumber: number,
  lang: string
): Promise<string[] | undefined> {
  return get(`${lang}-surah-${surahNumber}`, quranDataStore);
}

// Tafsir caching
export async function cacheTafsir(
  surahNumber: number,
  ayahNumber: number,
  tafsir: string
): Promise<void> {
  await set(`tafsir-${surahNumber}-${ayahNumber}`, tafsir, quranDataStore);
}

export async function getCachedTafsir(
  surahNumber: number,
  ayahNumber: number
): Promise<string | undefined> {
  return get(`tafsir-${surahNumber}-${ayahNumber}`, quranDataStore);
}

// Audio chunk caching for offline playback
export async function cacheAudioChunk(
  reciter: string,
  surahNumber: number,
  ayahNumber: number,
  audioData: ArrayBuffer
): Promise<void> {
  const key = `${reciter}/${surahNumber}/${ayahNumber}`;
  await set(key, audioData, audioStore);
}

export async function getCachedAudioChunk(
  reciter: string,
  surahNumber: number,
  ayahNumber: number
): Promise<ArrayBuffer | undefined> {
  const key = `${reciter}/${surahNumber}/${ayahNumber}`;
  return get(key, audioStore);
}

// Check if audio is available offline
export async function isAudioOfflineAvailable(
  reciter: string,
  surahNumber: number,
  totalAyahs: number
): Promise<boolean> {
  // Check first and last few verses to verify download
  const checkCount = 3;
  const lastAyah = Math.min(totalAyahs, checkCount);

  for (let i = 1; i <= Math.min(checkCount, totalAyahs); i++) {
    const cached = await getCachedAudioChunk(reciter, surahNumber, i);
    if (!cached) return false;
  }

  for (let i = totalAyahs - checkCount + 1; i <= totalAyahs; i++) {
    if (i > 0) {
      const cached = await getCachedAudioChunk(reciter, surahNumber, i);
      if (!cached) return false;
    }
  }

  return true;
}

// Get all cached surahs
export async function getCachedSurahs(): Promise<number[]> {
  const allKeys = await keys(quranDataStore);
  const surahKeys = allKeys.filter((k) => String(k).startsWith("surah-"));
  return surahKeys.map((k) => Number(String(k).replace("surah-", "")));
}

// Get storage usage
export async function getStorageUsage(): Promise<{
  used: number;
  available: number;
  percentage: number;
}> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      available: estimate.quota || 0,
      percentage: ((estimate.usage || 0) / (estimate.quota || 1)) * 100,
    };
  }
  return { used: 0, available: 0, percentage: 0 };
}

// Clear all cached data
export async function clearAllCache(): Promise<void> {
  // Note: idb-keyval doesn't provide a clear all function
  // In production, you'd use indexedDB.deleteDatabase()
  const dbs = await indexedDB.databases();
  for (const db of dbs) {
    if (db.name) {
      indexedDB.deleteDatabase(db.name);
    }
  }
}

// Clear specific cache
export async function clearSurahCache(surahNumber: number): Promise<void> {
  await del(`surah-${surahNumber}`, quranDataStore);
}

export async function clearTranslationCache(
  surahNumber: number,
  lang: string
): Promise<void> {
  await del(`${lang}-surah-${surahNumber}`, quranDataStore);
}

export async function clearAudioCache(
  reciter: string,
  surahNumber: number
): Promise<void> {
  for (let ayah = 1; ayah <= 286; ayah++) {
    await del(`${reciter}/${surahNumber}/${ayah}`, audioStore);
  }
}

// Prefetch surah data for offline
export async function prefetchSurahData(
  surahNumber: number,
  onProgress?: (progress: number) => void
): Promise<void> {
  // This would fetch from API and cache
  // Simplified implementation - just a placeholder for now
  if (onProgress) {
    onProgress(100);
  }
}