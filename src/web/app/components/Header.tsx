"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useUILanguage } from "./UILanguageProvider";
import { UI_LANGUAGES } from "../lib/ui-labels";

const NAV_ITEMS = [
  {
    href: "/",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6",
    key: "surahs",
    labelEn: "Quran",
    labelAr: "القرآن",
  },
  {
    href: "/adhkar",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H4m5 0v-2a3 3 0 015.356-1.857M17 20V9.125A3 3 0 0120 6.125V5m-5 0H7a3 3 0 00-3 3v2m5 0V6.125A3 3 0 0117 3.125V5m-5 0h5",
    key: "adhkar",
    labelEn: "Adhkar",
    labelAr: "الأذكار",
  },
  {
    href: "/hadith",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    key: "hadith",
    labelEn: "Hadith",
    labelAr: "الحديث",
  },
  {
    href: "/dua",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    key: "dua",
    labelEn: "Dua",
    labelAr: "الدعاء",
  },
  {
    href: "/prayer",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    key: "prayer",
    labelEn: "Prayer",
    labelAr: "الصلاة",
  },
  {
    href: "/calendar",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    key: "calendar",
    labelEn: "Calendar",
    labelAr: "التقويم",
  },
  {
    href: "/learning",
    icon: "M12 14l9-5-5-5-5 5-9 5m0 0l6.293-3.293a1 1 0 011.414 0l6.293 3.293a1 1 0 010 1.414l-6.293 3.293a1 1 0 01-1.414 0l-6.293-3.293a1 1 0 010-1.414z",
    key: "learning",
    labelEn: "Learning",
    labelAr: "التعلم",
  },
  {
    href: "/juz",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    key: "juz",
    labelEn: "Juz",
    labelAr: "الجزء",
  },
  {
    href: "/mushaf",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z",
    key: "mushaf",
    labelEn: "Mushaf",
    labelAr: "المصحف",
  },
  {
    href: "/bookmarks",
    icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    key: "bookmarks",
    labelEn: "Bookmarks",
    labelAr: "المفضلة",
  },
  {
    href: "/search",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    key: "search",
    labelEn: "Search",
    labelAr: "بحث",
  },
  {
    href: "/settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    key: "settings",
    labelEn: "Settings",
    labelAr: "الإعدادات",
  },
];

const BOTTOM_NAV_ITEMS = [
  { href: "/", icon: "home", key: "surahs", labelEn: "Quran", labelAr: "القرآن" },
  { href: "/adhkar", icon: "groups", key: "adhkar", labelEn: "Adhkar", labelAr: "الأذكار" },
  { href: "/hadith", icon: "book", key: "hadith", labelEn: "Hadith", labelAr: "الحديث" },
  { href: "/prayer", icon: "schedule", key: "prayer", labelEn: "Prayer", labelAr: "الصلاة" },
  { href: "/settings", icon: "settings", key: "settings", labelEn: "Settings", labelAr: "الإعدادات" },
];

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { t, uiLang, setUILang } = useUILanguage();
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setSidebarOpen(false);
    }
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const currentLangInfo = UI_LANGUAGES.find((l) => l.code === uiLang);

  return (
    <>
      {/* ── SIDEBAR ── */}
      <aside id="sidebar-nav" className={sidebarOpen ? "open" : ""}>
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-outline-variant/20">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
            <span className="text-white text-sm amiri font-bold">ن</span>
          </div>
          <span
            className="text-xl font-bold text-primary-container"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
          >
            {uiLang === "ar" ? "سكينة" : "Sakinah"}
          </span>
        </div>

        {/* Language switcher */}
        <div className="px-4 py-3 border-b border-outline-variant/20" ref={langRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-surface-container-low transition-colors"
          >
            <svg
              className="w-5 h-5 text-outline"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="flex-1 text-start font-medium text-on-surface">
              {currentLangInfo?.nameNative || "العربية"}
            </span>
            <svg
              className={`w-4 h-4 text-outline transition-transform ${langOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langOpen && (
            <div className="mt-1 max-h-48 overflow-y-auto rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-lg">
              {UI_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setUILang(l.code);
                    setLangOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors text-start ${
                    uiLang === l.code
                      ? "bg-primary-fixed/30 text-primary-container font-semibold"
                      : "hover:bg-surface-container-low"
                  }`}
                >
                  <span>{l.nameNative}</span>
                  <span className="text-outline text-xs">{l.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                isActive(item.href) ? "active" : "text-on-surface-variant"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {uiLang === "ar" ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-outline-variant/20 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5 text-outline"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-outline"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <span className="text-xs text-outline amiri">بسم الله الرحمن الرحيم</span>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── MOBILE HEADER ── */}
      <header className="mobile-header lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
        >
          <svg
            className="w-5 h-5 text-outline"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span
          className="text-lg font-bold text-primary-container"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {uiLang === "ar" ? "سكينة" : "Sakinah"}
        </span>
        <Link
          href="/search"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors"
        >
          <svg
            className="w-5 h-5 text-outline"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
      </header>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="bottom-nav lg:hidden">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 ${
                active ? "text-primary-container" : "text-outline"
              }`}
            >
              <BottomNavIcon name={item.icon} filled={active} />
              <span className="text-[10px] font-medium">
                {uiLang === "ar" ? item.labelAr : item.labelEn}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function BottomNavIcon({ name, filled }: { name: string; filled: boolean }) {
  const icons: Record<string, { outline: string; filled: string }> = {
    home: {
      outline: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6",
      filled: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-6 0h6",
    },
    search: {
      outline: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
      filled: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    bookmark: {
      outline: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
      filled: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    },
    auto_stories: {
      outline: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      filled: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    settings: {
      outline: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      filled: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
    groups: {
      outline: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H4m5 0v-2a3 3 0 015.356-1.857M17 20V9.125A3 3 0 0120 6.125V5m-5 0H7a3 3 0 00-3 3v2m5 0V6.125A3 3 0 0117 3.125V5m-5 0h5",
      filled: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H4m5 0v-2a3 3 0 015.356-1.857M17 20V9.125A3 3 0 0120 6.125V5m-5 0H7a3 3 0 00-3 3v2m5 0V6.125A3 3 0 0117 3.125V5m-5 0h5",
    },
    book: {
      outline: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      filled: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    schedule: {
      outline: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      filled: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  };

  const d = filled ? icons[name]?.filled : icons[name]?.outline;
  return (
    <svg
      className="w-6 h-6"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d || ""} />
    </svg>
  );
}
