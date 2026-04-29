"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useUILanguage } from "./UILanguageProvider";
import { UI_LANGUAGES } from "../lib/ui-labels";

/* ── SVG icon paths ── */
const NAV_ICONS: Record<string, { d: string; viewBox?: string }> = {
  "/":          { d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  "/juz":       { d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  "/bookmarks": { d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
  "/search":    { d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  "/mushaf":    { d: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" },
  "/reading-plans": { d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  "/settings":  { d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
};

function NavIcon({ path, className = "w-4 h-4" }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [langOpen, setLangOpen]   = useState(false);
  const langRef  = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme }    = useTheme();
  const { t, dir, uiLang, setUILang } = useUILanguage();
  const pathname = usePathname();

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close lang dropdown on outside click */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navItems = [
    { href: "/",              label: t.nav.surahs },
    { href: "/juz",           label: t.nav.juz },
    { href: "/mushaf",        label: t.nav.mushaf },
    { href: "/search",        label: t.nav.search },
    { href: "/reading-plans", label: t.nav.plans },
    { href: "/bookmarks",     label: t.nav.bookmarks },
    { href: "/settings",      label: t.nav.settings },
  ];

  const currentLang = UI_LANGUAGES.find((l) => l.code === uiLang);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-2xl border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-base font-bold transition-transform duration-200 group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", boxShadow: "0 2px 10px rgba(13,125,110,0.35)" }}
          >
            ﷽
          </span>
          <span className="text-base font-bold tracking-tight hidden sm:block">
            {uiLang === "ar" ? (
              <>تطبيق <span style={{ color: "var(--primary)" }}>القرآن</span></>
            ) : (
              <>Quran<span style={{ color: "var(--primary)" }}>App</span></>
            )}
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-0.5 bg-surface-elevated rounded-2xl p-1 border border-border">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-primary shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
                style={active ? { background: "var(--surface)", boxShadow: "var(--shadow-sm)" } : {}}
              >
                <NavIcon path={NAV_ICONS[item.href]?.d ?? NAV_ICONS["/"].d} className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-1.5">

          {/* Language picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl text-xs font-semibold border border-border bg-surface hover:bg-surface-elevated hover:border-border-strong transition-all duration-200"
              aria-label="Switch UI language"
              aria-expanded={langOpen}
            >
              <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">{currentLang?.nameNative ?? "العربية"}</span>
              <svg className="w-3 h-3 text-muted" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div
                className={`absolute top-full mt-2 ${dir === "rtl" ? "right-0" : "left-0"} w-52 bg-surface border border-border rounded-2xl shadow-[var(--shadow-lg)] z-50 py-1.5 max-h-72 overflow-y-auto animate-scale-in`}
              >
                <p className="section-label px-3 py-1.5">Interface Language</p>
                {UI_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setUILang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-start ${
                      uiLang === l.code
                        ? "bg-primary-light text-primary font-semibold"
                        : "hover:bg-surface-elevated text-foreground"
                    }`}
                  >
                    {uiLang === l.code && (
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {uiLang !== l.code && <span className="w-3.5" />}
                    <span className="font-medium">{l.nameNative}</span>
                    <span className="text-muted text-xs ms-auto">{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-all duration-200"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-surface hover:bg-surface-elevated transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-surface/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-primary-light text-primary"
                      : "text-muted hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <NavIcon
                    path={NAV_ICONS[item.href]?.d ?? NAV_ICONS["/"].d}
                    className={`w-4 h-4 ${dir === "rtl" ? "rtl-mirror" : ""}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
