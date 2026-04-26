"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="text-2xl">📖</span>
          <span className="text-primary">Quran</span>
          <span className="text-zinc-500 text-sm font-normal">Multi-Lang</span>
        </Link>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-full left-0 right-0 md:top-auto flex-col md:flex-row items-start md:items-center gap-4 bg-white dark:bg-zinc-950 md:bg-transparent p-4 md:p-0 border-b md:border-0 border-zinc-200 dark:border-zinc-800`}
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Surahs
          </Link>
          <Link
            href="/bookmarks"
            className="hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Bookmarks
          </Link>
          <Link
            href="/search"
            className="hover:text-primary transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
        </div>
      </nav>
    </header>
  );
}
