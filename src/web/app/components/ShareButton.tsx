"use client";

import { useState, useCallback } from "react";

interface ShareButtonProps {
  surahNumber: number;
  ayahNumber: number;
  surahName?: string;
  arabicText: string;
  translationText: string;
}

export function ShareButton({
  surahNumber,
  ayahNumber,
  surahName,
  arabicText,
  translationText,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${arabicText}\n\n${translationText}\n\n— ${surahName || `Surah ${surahNumber}`} (${surahNumber}:${ayahNumber})`;

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Quran ${surahNumber}:${ayahNumber}`,
          text: shareText,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed silently
    }
  }, [shareText, surahNumber, ayahNumber]);

  return (
    <button
      onClick={handleShare}
      className="p-1 hover:scale-110 transition-transform text-zinc-400 hover:text-primary"
      aria-label="Share verse"
      title="Share verse"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )}
    </button>
  );
}
