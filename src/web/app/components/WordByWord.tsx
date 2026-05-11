"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUILanguage } from "./UILanguageProvider";

interface WordData {
  word: string;
  transliteration: string;
  meaning: string;
  grammar: {
    type: "noun" | "verb" | "particle" | "preposition" | "pronoun";
    root?: string;
    form?: string;
    person?: string;
    number?: string;
    gender?: string;
    case?: string;
  };
  position: {
    wordIndex: number;
    charStart: number;
    charEnd: number;
  };
}

// Simplified word analysis - in production, use real morphological analysis API
function analyzeWord(word: string, position: number): WordData {
  // Common Quranic roots for demonstration
  const roots: Record<string, { root: string; meaning: string; type: WordData["grammar"]["type"] }> = {
    "هو": { root: "هوه", meaning: "he/it (is)", type: "pronoun" },
    "هي": { root: "هوه", meaning: "she/it (is)", type: "pronoun" },
    "أنا": { root: "أن", meaning: "I", type: "pronoun" },
    "أنت": { root: "أنت", meaning: "you (m)", type: "pronoun" },
    "أنتما": { root: "أنت", meaning: "you (dual)", type: "pronoun" },
    "أنتم": { root: "أنت", meaning: "you (pl)", type: "pronoun" },
    "نحن": { root: "نح", meaning: "we", type: "pronoun" },
    "الله": { root: "ألوه", meaning: "God/Allah", type: "noun" },
    "رب": { root: "ر ب ب", meaning: "Lord/Rabbi", type: "noun" },
    "العالمين": { root: "عالم", meaning: "worlds", type: "noun" },
    "الرحمن": { root: "رحم", meaning: "Most Merciful", type: "noun" },
    "الرحيم": { root: "رحم", meaning: "Merciful", type: "noun" },
    "مالك": { root: "ملك", meaning: "Owner/King", type: "noun" },
    "يوم": { root: "يوم", meaning: "Day", type: "noun" },
    "الدين": { root: "دين", meaning: "religion/reward", type: "noun" },
    "إياك": { root: "أيو", meaning: "you (acc)", type: "pronoun" },
    "نعبد": { root: "عبد", meaning: "we worship", type: "verb" },
    "ونستعين": { root: "عون", meaning: "we seek help", type: "verb" },
    "اهدنا": { root: "هدي", meaning: "guide us", type: "verb" },
    "الصراط": { root: "صرط", meaning: "way/path", type: "noun" },
    "المستقيم": { root: "استقام", meaning: "straight", type: "noun" },
    "الذين": { root: "ذي", meaning: "those who", type: "pronoun" },
    "أنعمت": { root: "نعم", meaning: "you have blessed", type: "verb" },
    "عليهم": { root: "على", meaning: "on them", type: "preposition" },
    "غير": { root: "غير", meaning: "other than", type: "particle" },
    "المغضوب": { root: "غضب", meaning: "one who is wrathful", type: "noun" },
    "الضالين": { root: "ضلل", meaning: "those who go astray", type: "noun" },
  };

  const cleanedWord = word.replace(/[ًًٌٍٍَُِّْإأآاوءؤئةى]/g, "");
  const knownRoot = roots[cleanedWord];

  return {
    word,
    transliteration: knownRoot?.meaning || "...",
    meaning: knownRoot?.meaning || cleanedWord,
    grammar: knownRoot ? {
      type: knownRoot.type,
      root: knownRoot.root,
    } : {
      type: "noun",
      root: cleanedWord.substring(0, 3),
    },
    position: {
      wordIndex: position,
      charStart: 0,
      charEnd: word.length,
    },
  };
}

interface WordByWordProps {
  arabicText: string;
  surahNumber: number;
  ayahNumber: number;
  showFullAnalysis?: boolean;
}

export function WordByWord({
  arabicText,
  surahNumber,
  ayahNumber,
  showFullAnalysis = false,
}: WordByWordProps) {
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showMeanings, setShowMeanings] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { t, uiLang } = useUILanguage();

  // Parse words from ayah text
  const words = arabicText.split(" ").filter(Boolean);

  const wordColors: Record<string, string> = {
    noun: "bg-blue-500/20 text-blue-600",
    verb: "bg-green-500/20 text-green-600",
    particle: "bg-purple-500/20 text-purple-600",
    preposition: "bg-orange-500/20 text-orange-600",
    pronoun: "bg-pink-500/20 text-pink-600",
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="text-sm text-outline hover:text-primary-container transition-colors"
      >
        {uiLang === "ar" ? "عرض كلمات الآية" : "Show word-by-word"}
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setExpanded(false)}
          className="text-xs text-outline hover:text-primary-container"
        >
          {uiLang === "ar" ? "إخفاء" : "Hide"}
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`text-xs px-2 py-1 rounded ${
              showTransliteration
                ? "bg-primary-container text-white"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {uiLang === "ar" ? "تفطير" : "Translit."}
          </button>
          <button
            onClick={() => setShowMeanings(!showMeanings)}
            className={`text-xs px-2 py-1 rounded ${
              showMeanings
                ? "bg-primary-container text-white"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            {uiLang === "ar" ? "معنى" : "Meaning"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {words.map((word, index) => {
          const wordData = analyzeWord(word, index);
          
          return (
            <motion.div
              key={`${index}-${word}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="relative"
            >
              <button
                onClick={() => setSelectedWord(selectedWord?.position.wordIndex === index ? null : wordData)}
                className={`w-full text-right p-2 rounded-lg transition-all ${
                  selectedWord?.position.wordIndex === index
                    ? "bg-primary-fixed/50 ring-2 ring-primary-container"
                    : "hover:bg-surface-container"
                }`}
              >
                {/* Arabic word */}
                <span className="arabic-text text-xl" dir="rtl">
                  {word}
                </span>
                
                {/* Inline transliteration/meaning */}
                {(showTransliteration || showMeanings) && (
                  <div className="flex gap-2 mt-1 text-xs text-on-surface-variant">
                    {showTransliteration && (
                      <span className="italic">{wordData.transliteration}</span>
                    )}
                    {showTransliteration && showMeanings && (
                      <span className="text-outline">•</span>
                    )}
                    {showMeanings && <span>{wordData.meaning}</span>}
                  </div>
                )}
                
                {/* Grammar tag */}
                {showFullAnalysis && (
                  <span className={`absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded ${
                    wordColors[wordData.grammar.type] || "bg-gray-500/20 text-gray-600"
                  }`}>
                    {wordData.grammar.type}
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Word details panel */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-container rounded-xl p-4 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "كلمة" : "Word"}</p>
                <p className="arabic-text text-lg" dir="rtl">{selectedWord.word}</p>
              </div>
              <div>
                <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "جذر" : "Root"}</p>
                <p className="font-mono">{selectedWord.grammar.root}</p>
              </div>
              <div>
                <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "التفطير" : "Transliteration"}</p>
                <p className="italic">{selectedWord.transliteration}</p>
              </div>
              <div>
                <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "المعنى" : "Meaning"}</p>
                <p>{selectedWord.meaning}</p>
              </div>
              <div>
                <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "نوع الكلمة" : "Type"}</p>
                <p className="capitalize">{selectedWord.grammar.type}</p>
              </div>
              {selectedWord.grammar.form && (
                <div>
                  <p className="text-xs text-outline mb-1">{uiLang === "ar" ? "الوزن" : "Form"}</p>
                  <p>{selectedWord.grammar.form}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}