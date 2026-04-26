"use client";

import Link from "next/link";
import { useUILanguage } from "./components/UILanguageProvider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useUILanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">{t.common.somethingWrong}</h2>
        <p className="text-muted mb-6">{error.message || t.common.unexpectedError}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
          >
            {t.common.retry}
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-border hover:bg-surface-elevated transition-colors text-sm font-medium"
          >
            {t.common.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
