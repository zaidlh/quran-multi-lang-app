"use client";

import { useState, useEffect } from "react";
import { useUILanguage } from "./UILanguageProvider";

interface Reflection {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  content: string;
  tags: string[];
  mood?: "grateful" | "hopeful" | "sad" | "anxious" | "reflective";
  createdAt: number;
}

interface ReflectionCollection {
  id: string;
  name: string;
  reflections: Reflection[];
  isPublic: boolean;
  createdAt: number;
}

const STORAGE_KEY = "quran-reflections";

export function useReflectionStorage() {
  const [collections, setCollections] = useState<ReflectionCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setCollections(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse reflections", e);
        }
      }
    }
    setIsLoading(false);
  }, []);
  
  // Save to localStorage
  const saveCollections = (newCollections: ReflectionCollection[]) => {
    setCollections(newCollections);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCollections));
  };
  
  // Add reflection
  const addReflection = (
    collectionId: string,
    reflection: Omit<Reflection, "id" | "createdAt">
  ) => {
    const newReflection: Reflection = {
      ...reflection,
      id: `ref-${Date.now()}`,
      createdAt: Date.now(),
    };
    
    setCollections((prev) => {
      const updated = prev.map((c) => {
        if (c.id === collectionId) {
          return {
            ...c,
            reflections: [newReflection, ...c.reflections],
          };
        }
        return c;
      });
      saveCollections(updated);
      return updated;
    });
    
    return newReflection;
  };
  
  // Update reflection
  const updateReflection = (
    collectionId: string,
    reflectionId: string,
    updates: Partial<Reflection>
  ) => {
    setCollections((prev) => {
      const updated = prev.map((c) => {
        if (c.id === collectionId) {
          return {
            ...c,
            reflections: c.reflections.map((r) =>
              r.id === reflectionId ? { ...r, ...updates } : r
            ),
          };
        }
        return c;
      });
      saveCollections(updated);
      return updated;
    });
  };
  
  // Delete reflection
  const deleteReflection = (collectionId: string, reflectionId: string) => {
    setCollections((prev) => {
      const updated = prev.map((c) => {
        if (c.id === collectionId) {
          return {
            ...c,
            reflections: c.reflections.filter((r) => r.id !== reflectionId),
          };
        }
        return c;
      });
      saveCollections(updated);
      return updated;
    });
  };
  
  // Create collection
  const createCollection = (name: string, isPublic = false) => {
    const newCollection: ReflectionCollection = {
      id: `col-${Date.now()}`,
      name,
      reflections: [],
      isPublic,
      createdAt: Date.now(),
    };
    
    setCollections((prev) => {
      const updated = [...prev, newCollection];
      saveCollections(updated);
      return updated;
    });
    
    return newCollection;
  };
  
  // Delete collection
  const deleteCollection = (collectionId: string) => {
    setCollections((prev) => {
      const updated = prev.filter((c) => c.id !== collectionId);
      saveCollections(updated);
      return updated;
    });
  };
  
  // Get default collection or create one
  const getDefaultCollection = () => {
    if (collections.length === 0) {
      const defaultCol = createCollection("My Reflections");
      return defaultCol;
    }
    return collections[0];
  };
  
  // Search reflections
  const searchReflections = (query: string) => {
    const q = query.toLowerCase();
    return collections.flatMap((c) =>
      c.reflections.filter(
        (r) =>
          r.content.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      )
    );
  };
  
  // Get reflections by mood
  const getReflectionsByMood = (mood: Reflection["mood"]) => {
    return collections.flatMap((c) =>
      c.reflections.filter((r) => r.mood === mood)
    );
  };
  
  return {
    collections,
    isLoading,
    addReflection,
    updateReflection,
    deleteReflection,
    createCollection,
    deleteCollection,
    getDefaultCollection,
    searchReflections,
    getReflectionsByMood,
  };
}

// Reflection Editor Component
export function ReflectionEditor({
  surahNumber,
  ayahNumber,
  onSave,
  onCancel,
}: {
  surahNumber: number;
  ayahNumber: number;
  onSave?: (content: string, tags: string[], mood?: Reflection["mood"]) => void;
  onCancel?: () => void;
}) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [mood, setMood] = useState<Reflection["mood"] | undefined>();
  const { t, uiLang } = useUILanguage();
  
  const moods: { value: Reflection["mood"]; labelEn: string; labelAr: string; icon: string }[] = [
    { value: "grateful", labelEn: "Grateful", labelAr: "شاكر", icon: "🤲" },
    { value: "hopeful", labelEn: "Hopeful", labelAr: "مؤمن", icon: "🌟" },
    { value: "sad", labelEn: "Sad", labelAr: "حزين", icon: "😢" },
    { value: "anxious", labelEn: "Anxious", labelAr: "قلق", icon: "😰" },
    { value: "reflective", labelEn: "Reflective", labelAr: "متأمل", icon: "🤔" },
  ];
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  
  const handleSave = () => {
    if (content.trim()) {
      onSave?.(content, tags, mood);
      setContent("");
      setTags([]);
      setMood(undefined);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <span className="text-sm text-outline">
          {uiLang === "ar" ? "تفكير على" : "Reflection on"}{" "}
          {surahNumber}:{ayahNumber}
        </span>
      </div>
      
      {/* Mood selector */}
      <div>
        <p className="text-xs text-outline mb-2">
          {uiLang === "ar" ? "كيف تشعر؟" : "How are you feeling?"}
        </p>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(mood === m.value ? undefined : m.value)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                mood === m.value
                  ? "bg-primary-container text-white"
                  : "bg-surface-container hover:bg-surface-container-high"
              }`}
            >
              <span className="mr-1">{m.icon}</span>
              {uiLang === "ar" ? m.labelAr : m.labelEn}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          uiLang === "ar"
            ? "اكتب تفكيرك..."
            : "Write your reflection..."
        }
        className="w-full h-32 px-4 py-3 bg-surface-container rounded-xl border border-outline-variant/20 resize-none focus:outline-none focus:border-primary-container"
      />
      
      {/* Tags */}
      <div>
        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            placeholder={
              uiLang === "ar" ? "أضف وسم..." : "Add tag..."
            }
            className="flex-1 px-3 py-2 bg-surface-container rounded-lg text-sm focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 bg-surface-container-high rounded-lg text-sm hover:bg-primary-fixed/20"
          >
            +
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-primary-fixed/30 text-primary-container rounded-full flex items-center gap-1"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-error">
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-surface-container rounded-lg text-sm"
        >
          {uiLang === "ar" ? "إلغاء" : "Cancel"}
        </button>
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="flex-1 px-4 py-2 bg-primary-container text-white rounded-lg text-sm disabled:opacity-50"
        >
          {uiLang === "ar" ? "حفظ" : "Save"}
        </button>
      </div>
    </div>
  );
}

// Reflection Card Component
export function ReflectionCard({
  reflection,
  onDelete,
  onEdit,
}: {
  reflection: Reflection;
  onDelete?: () => void;
  onEdit?: () => void;
}) {
  const { uiLang } = useUILanguage();
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(uiLang === "ar" ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  const moodIcons: Record<string, string> = {
    grateful: "🤲",
    hopeful: "🌟",
    sad: "😢",
    anxious: "😰",
    reflective: "🤔",
  };
  
  return (
    <div className="bg-surface-container rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {reflection.mood && (
            <span className="text-lg">{moodIcons[reflection.mood]}</span>
          )}
          <span className="text-xs text-outline">
            {reflection.surahNumber}:{reflection.ayahNumber}
          </span>
        </div>
        <div className="flex gap-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1 hover:bg-surface-container-high rounded"
            >
              <svg className="w-4 h-4 text-outline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 hover:bg-error/10 rounded"
            >
              <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <p className="text-sm whitespace-pre-wrap">{reflection.content}</p>
      
      {reflection.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {reflection.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-surface-container-high rounded-full text-outline"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-xs text-outline">{formatDate(reflection.createdAt)}</p>
    </div>
  );
}