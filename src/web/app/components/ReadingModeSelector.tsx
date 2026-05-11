"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuranReaderStore, ReadingMode } from "../lib/quran-reader-store";
import { useUILanguage } from "./UILanguageProvider";

const READING_MODES: { id: ReadingMode; icon: string; labelAr: string; labelEn: string }[] = [
  {
    id: "normal",
    icon: "M4 6h16M4 12h16M4 18h7",
    labelAr: "عادي",
    labelEn: "Normal",
  },
  {
    id: "focus",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    labelAr: "تركز",
    labelEn: "Focus",
  },
  {
    id: "minimal",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    labelAr: "بساطة",
    labelEn: "Minimal",
  },
  {
    id: "night",
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    labelAr: "ليلي",
    labelEn: "Night",
  },
  {
    id: "mushaf",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    labelAr: "مصحف",
    labelEn: "Mushaf",
  },
  {
    id: "translation",
    icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.15 15.61 3 15.61",
    labelAr: "ترجمة",
    labelEn: "Translation",
  },
];

export function ReadingModeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { readingMode, setReadingMode } = useQuranReaderStore();
  const { t, uiLang } = useUILanguage();

  const currentMode = READING_MODES.find((m) => m.id === readingMode);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors"
        aria-label={uiLang === "ar" ? "اختر وضع القراءة" : "Select reading mode"}
        aria-expanded={isOpen}
      >
        <svg
          className="w-5 h-5 text-primary-container"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d={currentMode?.icon}
          />
        </svg>
        <span className="text-sm font-medium text-on-surface hidden sm:inline">
          {uiLang === "ar" ? currentMode?.labelAr : currentMode?.labelEn}
        </span>
        <svg
          className={`w-4 h-4 text-outline transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 lg:left-0 z-50 w-48 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {READING_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setReadingMode(mode.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                      readingMode === mode.id
                        ? "bg-primary-fixed/30 text-primary-container"
                        : "hover:bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        readingMode === mode.id
                          ? "text-primary-container"
                          : "text-outline"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={mode.icon}
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {uiLang === "ar" ? mode.labelAr : mode.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function useReadingModeStyles() {
  const { readingMode, settings } = useQuranReaderStore();

  // Generate appropriate styles based on reading mode
  const containerClass = () => {
    switch (readingMode) {
      case "night":
        return "dark-screen min-h-screen";
      case "minimal":
        return "bg-surface-container-lowest";
      case "focus":
        return "bg-surface-container-lowest";
      default:
        return "bg-surface";
    }
  };

  const textClass = () => {
    switch (readingMode) {
      case "night":
        return "text-white";
      case "focus":
        return "text-on-surface";
      default:
        return "text-on-surface";
    }
  };

  const getFontSize = () => {
    switch (readingMode) {
      case "focus":
        return settings.fontSize * 1.5;
      default:
        return settings.fontSize;
    }
  };

  return {
    containerClass: containerClass(),
    textClass: textClass(),
    fontSize: getFontSize(),
    readingMode,
  };
}