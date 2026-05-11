"use client";

import { useState } from "react";
import { useUILanguage } from "./UILanguageProvider";

interface Collection {
  id: string;
  name: string;
  description?: string;
  verses: { surahNumber: number; ayahNumber: number }[];
  isSmartCollection: boolean;
  filterCriteria?: CollectionFilter;
  createdAt: number;
  isPublic: boolean;
}

interface CollectionFilter {
  themes?: string[];
  prophets?: string[];
  revelationType?: "meccan" | "medinan";
  surahNumbers?: number[];
  tags?: string[];
}

// Predefined smart collections
const SMART_COLLECTIONS: Collection[] = [
  {
    id: "mercy-verses",
    name: "Verses about Mercy",
    description: "Ayat about Allah's infinite mercy",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { themes: ["mercy"] },
    createdAt: 0,
    isPublic: true,
  },
  {
    id: "patience-verses",
    name: "Verses about Patience",
    description: "Ayat teaching perseverance",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { themes: ["patience"] },
    createdAt: 0,
    isPublic: true,
  },
  {
    id: "prophets-stories",
    name: "Stories of Prophets",
    description: "Narratives about the prophets",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { prophets: ["muhammad", "musa", "ibrahim", "isa", "nuh"] },
    createdAt: 0,
    isPublic: true,
  },
  {
    id: "paradise-jannah",
    name: "Paradise (Jannah)",
    description: "Verses about eternal paradise",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { themes: ["jannah"] },
    createdAt: 0,
    isPublic: true,
  },
  {
    id: "dua-supplications",
    name: "Dua & Supplications",
    description: "Powerful prayers from the Quran",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { themes: ["prayer", "dua"] },
    createdAt: 0,
    isPublic: true,
  },
  {
    id: "guidance",
    name: "Guidance & Light",
    description: "Verses about divine guidance",
    verses: [],
    isSmartCollection: true,
    filterCriteria: { themes: ["guidance", "light"] },
    createdAt: 0,
    isPublic: true,
  },
];

// Verse relationship mappings
const VERSE_RELATIONSHIPS: Record<string, { surah: number; ayah: number }[]> = {
  "mercy-verses": [
    { surah: 1, ayah: 1 },
    { surah: 2, ayah: 163 },
    { surah: 7, ayah: 156 },
    { surah: 39, ayah: 53 },
  ],
  "patience-verses": [
    { surah: 2, ayah: 153 },
    { surah: 3, ayah: 200 },
    { surah: 8, ayah: 46 },
    { surah: 31, ayah: 17 },
  ],
  "prophets-stories": [
    { surah: 2, ayah: 211 },
    { surah: 12, ayah: 3 },
    { surah: 28, ayah: 3 },
    { surah: 37, ayah: 75 },
  ],
  "paradise-jannah": [
    { surah: 2, ayah: 35 },
    { surah: 3, ayah: 133 },
    { surah: 9, ayah: 72 },
    { surah: 56, ayah: 10 },
  ],
  "dua-supplications": [
    { surah: 1, ayah: 1 },
    { surah: 2, ayah: 201 },
    { surah: 7, ayah: 180 },
    { surah: 25, ayah: 65 },
  ],
  "guidance": [
    { surah: 2, ayah: 185 },
    { surah: 7, ayah: 203 },
    { surah: 24, ayah: 35 },
    { surah: 33, ayah: 45 },
  ],
};

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(SMART_COLLECTIONS);
  const [userCollections, setUserCollections] = useState<Collection[]>([]);
  
  // Get all collections
  const getAllCollections = () => [...collections, ...userCollections];
  
  // Create user collection
  const createCollection = (name: string, description?: string, isPublic = false) => {
    const newCollection: Collection = {
      id: `user-${Date.now()}`,
      name,
      description,
      verses: [],
      isSmartCollection: false,
      createdAt: Date.now(),
      isPublic,
    };
    setUserCollections([...userCollections, newCollection]);
    return newCollection;
  };
  
  // Add verse to collection
  const addVerse = (collectionId: string, surahNumber: number, ayahNumber: number) => {
    const updateCollections = (cols: Collection[]) =>
      cols.map((c) => {
        if (c.id === collectionId && !c.isSmartCollection) {
          const exists = c.verses.some(
            (v) => v.surahNumber === surahNumber && v.ayahNumber === ayahNumber
          );
          if (!exists) {
            return {
              ...c,
              verses: [...c.verses, { surahNumber, ayahNumber }],
            };
          }
        }
        return c;
      });
    
    setCollections(updateCollections);
    setUserCollections(updateCollections);
  };
  
  // Remove verse from collection
  const removeVerse = (collectionId: string, surahNumber: number, ayahNumber: number) => {
    const updateCollections = (cols: Collection[]) =>
      cols.map((c) => {
        if (c.id === collectionId) {
          return {
            ...c,
            verses: c.verses.filter(
              (v) => !(v.surahNumber === surahNumber && v.ayahNumber === ayahNumber)
            ),
          };
        }
        return c;
      });
    
    setCollections(updateCollections);
    setUserCollections(updateCollections);
  };
  
  // Delete collection
  const deleteCollection = (collectionId: string) => {
    setUserCollections(userCollections.filter((c) => c.id !== collectionId));
  };
  
  // Get collection verses
  const getCollectionVerses = (collectionId: string) => {
    const collection = getAllCollections().find((c) => c.id === collectionId);
    if (!collection) return [];
    
    // If smart collection, return the predefined verses
    if (collection.isSmartCollection) {
      return VERSE_RELATIONSHIPS[collectionId] || [];
    }
    
    return collection.verses;
  };
  
  return {
    getAllCollections,
    createCollection,
    addVerse,
    removeVerse,
    deleteCollection,
    getCollectionVerses,
  };
}

// Collection Selector Component
export function CollectionSelector({
  onSelect,
  onClose,
}: {
  onSelect: (collectionId: string) => void;
  onClose: () => void;
}) {
  const { getAllCollections, addVerse, createCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { t, uiLang } = useUILanguage();
  
  const allCollections = getAllCollections();
  
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          {uiLang === "ar" ? "المجموعات" : "Collections"}
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-surface-container rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Smart Collections */}
      <div className="space-y-2">
        <p className="text-xs text-outline">
          {uiLang === "ar" ? "مجموعات ذكية" : "Smart Collections"}
        </p>
        {allCollections.filter((c) => c.isSmartCollection).map((collection) => (
          <button
            key={collection.id}
            onClick={() => onSelect(collection.id)}
            className="w-full px-3 py-2 text-start bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors"
          >
            <p className="font-medium">{collection.name}</p>
            {collection.description && (
              <p className="text-xs text-outline">{collection.description}</p>
            )}
          </button>
        ))}
      </div>
      
      {/* Create new collection */}
      {showCreate ? (
        <div className="space-y-2">
          <input
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder={uiLang === "ar" ? "اسم المجموعة..." : "Collection name..."}
            className="w-full px-3 py-2 bg-surface-container rounded-lg"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreate(false)}
              className="flex-1 px-3 py-2 bg-surface-container rounded-lg text-sm"
            >
              {uiLang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              onClick={() => {
                if (newCollectionName.trim()) {
                  createCollection(newCollectionName.trim());
                  setNewCollectionName("");
                  setShowCreate(false);
                }
              }}
              className="flex-1 px-3 py-2 bg-primary-container text-white rounded-lg text-sm"
            >
              {uiLang === "ar" ? "إنشاء" : "Create"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="w-full px-3 py-2 text-sm border border-dashed border-outline-variant rounded-lg text-outline hover:bg-surface-container transition-colors"
        >
          + {uiLang === "ar" ? "مجموعة جديدة" : "New Collection"}
        </button>
      )}
    </div>
  );
}