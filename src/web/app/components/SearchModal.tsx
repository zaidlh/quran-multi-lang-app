"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuranReaderStore } from "../lib/quran-reader-store";
import { useUILanguage } from "./UILanguageProvider";

// Search result type
interface SearchResult {
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
  type: "arabic" | "translation" | "semantic";
  matchHighlight?: string;
}

// Simulated search data - in production, use actual search API
const MOCK_RESULTS: SearchResult[] = [];

export function SearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"arabic" | "translation" | "semantic">("translation");
  const [filters, setFilters] = useState<{
    surah?: number;
    revelationType?: "meccan" | "medinan";
    reciter?: string;
  }>({});
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, uiLang } = useUILanguage();
  
  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      // In production, filter quran data with proper API
      // For now, we'll return empty and let user know it's being built
      const apiResults: SearchResult[] = [];
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setResults(apiResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, performSearch]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Search panel */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-surface-container rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Search input */}
        <div className="p-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-outline flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={uiLang === "ar" ? "ابحث في القرآن..." : "Search the Quran..."}
              className="flex-1 bg-transparent text-lg focus:outline-none"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs bg-surface-container-low rounded border border-outline-variant/30">
              <span>esc</span>
            </kbd>
          </div>
        </div>

        {/* Search type selector */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/10">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            className="text-sm px-3 py-1.5 bg-surface-container rounded-lg"
          >
            <option value="translation">{uiLang === "ar" ? "ترجمة" : "Translation"}</option>
            <option value="arabic">{uiLang === "ar" ? "عربي" : "Arabic"}</option>
            <option value="semantic">{uiLang === "ar" ? "دلالي" : "Semantic"}</option>
          </select>

          <div className="flex-1" />

          <span className="text-xs text-outline">
            {uiLang === "ar" ? "Ctrl+K للبحث" : "Ctrl+K to search"}
          </span>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="spinner" />
            </div>
          ) : query && results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="w-12 h-12 text-outline mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-on-surface-variant">
                {uiLang === "ar"
                  ? `لم يُعثر على نتائج لـ "${query}"`
                  : `No results found for "${query}"`}
              </p>
              <p className="text-xs text-outline mt-1">
                {uiLang === "ar"
                  ? "Try searching in English or Arabic"
                  : "جرب البحث بالإنجليزية أو العربية"}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-outline-variant/10">
              {results.slice(0, 10).map((result, index) => (
                <button
                  key={`${result.surahNumber}-${result.ayahNumber}`}
                  onClick={() => {
                    router.push(`/surah/${result.surahNumber}#verse-${result.ayahNumber}`);
                    setIsOpen(false);
                  }}
                  className="w-full text-right p-4 hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-surface-container rounded-full text-sm font-medium">
                      {result.surahNumber}:{result.ayahNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="arabic-text text-lg mb-1" dir="rtl">
                        {result.arabicText}
                      </p>
                      <p className="text-sm text-on-surface-variant line-clamp-2">
                        {result.translationText}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="w-12 h-12 text-outline mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-on-surface-variant">
                {uiLang === "ar"
                  ? "اكتب للبحث في القرآن"
                  : "Type to search the Quran"}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  uiLang === "ar"
                    ? ["صبر", "رحمة", "إيمان", "جنة"]
                    : ["patience", "mercy", "faith", "paradise"],
                ][0].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="px-3 py-1.5 text-xs bg-surface-container rounded-full hover:bg-primary-fixed/20 transition-colors text-on-surface-variant"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/20 bg-surface-container">
          <div className="flex items-center gap-3 text-xs text-outline">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded">↵</kbd>
              {uiLang === "ar" ? "اختيار" : "Select"}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded">↑↓</kbd>
              {uiLang === "ar" ? "تصفح" : "Navigate"}
            </span>
          </div>
          <span className="text-xs text-outline">
            {uiLang === "ar" ? " powered by AI" : ""}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Export as a hook for opening the search
export function useSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, openSearch: () => setIsOpen(true), closeSearch: () => setIsOpen(false) };
}