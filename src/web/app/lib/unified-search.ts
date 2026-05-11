"use client";

import { searchAdhkar, getAdhkarByCategory } from "./adhkar-data";
import { searchHadith, getHadithCollections } from "./hadith-data";
import { searchDuas, getDuaCategories } from "./dua-data";

// Unified search result types
export interface SearchResult {
  id: string;
  type: "quran" | "adhkar" | "hadith" | "dua" | "tafsir";
  title: string;
  content: string;
  category?: string;
  reference?: string;
  url: string;
}

// Search across all modules
export function searchAll(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  
  if (!query.trim()) return results;
  
  // Search adhkar
  const adhkarResults = searchAdhkar(query);
  adhkarResults.slice(0, 5).forEach((adhkar) => {
    results.push({
      id: adhkar.id,
      type: "adhkar",
      title: `${adhkar.category} - ${adhkar.repeat}x`,
      content: adhkar.translation,
      category: adhkar.category,
      reference: adhkar.reference,
      url: `/adhkar?category=${adhkar.category}`,
    });
  });
  
  // Search hadith
  const hadithResults = searchHadith(query);
  hadithResults.slice(0, 5).forEach((hadith) => {
    results.push({
      id: hadith.id,
      type: "hadith",
      title: `${hadith.collection} #${hadith.hadithNumber}`,
      content: hadith.translation,
      category: hadith.collection,
      reference: hadith.reference,
      url: `/hadith?collection=${hadith.collection}`,
    });
  });
  
  // Search duas
  const duaResults = searchDuas(query);
  duaResults.slice(0, 5).forEach((dua) => {
    results.push({
      id: dua.id,
      type: "dua",
      title: dua.title,
      content: dua.translation,
      category: dua.category,
      reference: dua.reference,
      url: `/dua?category=${dua.category}`,
    });
  });
  
  return results;
}

// Get popular search suggestions
export function getSearchSuggestions(): string[] {
  return [
    "forgiveness",
    "patience",
    "mercy",
    "morning adhkar",
    "evening adhkar",
    "dua for anxiety",
    "protection",
    "provisions",
    "healing",
    "family",
  ];
}

// Navigation structure
export const NAVIGATION = [
  {
    id: "quran",
    name: "Quran",
    nameArabic: "القرآن",
    path: "/",
    icon: "auto_stories",
  },
  {
    id: "adhkar",
    name: "Adhkar",
    nameArabic: "الأذكار",
    path: "/adhkar",
    icon: "groups",
  },
  {
    id: "hadith",
    name: "Hadith",
    nameArabic: "الحديث",
    path: "/hadith",
    icon: "menu_book",
  },
  {
    id: "dua",
    name: "Dua",
    nameArabic: "الدعاء",
    path: "/dua",
    icon: "favorite",
  },
  {
    id: "prayer",
    name: "Prayer",
    nameArabic: "الصلاة",
    path: "/prayer",
    icon: "schedule",
  },
  {
    id: "calendar",
    name: "Calendar",
    nameArabic: "التقويم",
    path: "/calendar",
    icon: "calendar_month",
  },
  {
    id: "learning",
    name: "Learning",
    nameArabic: "التعلم",
    path: "/learning",
    icon: "school",
  },
];

// Section metadata
export const SECTIONS = {
  quran: {
    title: "Quran",
    titleArabic: "القرآن الكريم",
    description: "Read, listen, and memorize the Holy Quran",
    color: "#0f3d2e",
  },
  adhkar: {
    title: "Adhkar",
    titleArabic: "الأذكار",
    description: "Morning, evening, and daily remembrance",
    color: "#745b04",
  },
  hadith: {
    title: "Hadith",
    titleArabic: "الحديث",
    description: "Collections of Prophet's sayings",
    color: "#7c3aed",
  },
  dua: {
    title: "Dua",
    titleArabic: "الدعاء",
    description: "Supplications and prayers",
    color: "#059669",
  },
  prayer: {
    title: "Prayer Tools",
    titleArabic: "أدوات الصلاة",
    description: "Prayer times, Qibla, and more",
    color: "#0891b2",
  },
  calendar: {
    title: "Islamic Calendar",
    titleArabic: "التقويم الهجري",
    description: "Hijri dates and events",
    color: "#dc2626",
  },
  learning: {
    title: "Learning Center",
    titleArabic: "مركز التعلم",
    description: "Islamic education and courses",
    color: "#ea580c",
  },
};