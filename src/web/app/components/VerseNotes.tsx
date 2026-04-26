"use client";

import { useState, useCallback } from "react";

interface VerseNotesProps {
  surahNumber: number;
  ayahNumber: number;
}

function getNoteKey(surah: number, ayah: number): string {
  return `quran-note-${surah}-${ayah}`;
}

function getSavedNote(surah: number, ayah: number): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(getNoteKey(surah, ayah)) || "";
}

export function VerseNotes({ surahNumber, ayahNumber }: VerseNotesProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(() => getSavedNote(surahNumber, ayahNumber));
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    const key = getNoteKey(surahNumber, ayahNumber);
    if (note.trim()) {
      localStorage.setItem(key, note);
    } else {
      localStorage.removeItem(key);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [note, surahNumber, ayahNumber]);

  const hasNote = note.trim().length > 0;

  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs text-zinc-500 hover:text-primary flex items-center gap-1 transition-colors"
      >
        <svg
          className="w-3.5 h-3.5"
          fill={hasNote ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        {hasNote ? "Edit Note" : "Add Note"}
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your reflection or note..."
            className="w-full text-sm p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 resize-y min-h-[60px] focus:outline-none focus:border-primary"
            rows={3}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="text-xs px-3 py-1 bg-primary text-white rounded hover:opacity-90 transition-opacity"
            >
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-xs px-3 py-1 border border-zinc-300 dark:border-zinc-700 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
