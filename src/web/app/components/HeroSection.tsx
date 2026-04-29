"use client";

import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";

export function HeroSection() {
  const { t, uiLang } = useUILanguage();

  const stats = [
    { value: 114,  label: t.home.statsSurahs, color: "var(--primary)" },
    { value: 6236, label: t.home.statsVerses, color: "var(--gold)" },
    { value: 30,   label: t.home.statsJuz,    color: "var(--primary)" },
  ];

  return (
    <section className="relative overflow-hidden">

      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pattern-bg text-foreground"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(13,125,110,0.12) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(180,83,9,0.07) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* ── Decorative orbs ── */}
      <div
        className="pointer-events-none absolute -top-24 -start-24 h-80 w-80 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--primary)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -end-24 h-96 w-96 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: "var(--gold)" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 text-center">

        {/* Badge */}
        <div className="animate-fade-in-up mb-7 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-light px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t.home.badge}
        </div>

        {/* Arabic headline */}
        <p
          className="animate-fade-in-up delay-100 arabic-text block mb-3 font-bold"
          dir="rtl"
          style={{ color: "var(--primary)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
        >
          {t.home.subtitle}
        </p>

        {/* Latin headline */}
        <h1 className="animate-fade-in-up delay-200 font-extrabold tracking-tight text-foreground" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", lineHeight: 1.2 }}>
          {t.home.title}
        </h1>

        {/* Description */}
        <p className="animate-fade-in-up delay-300 mt-5 mx-auto max-w-xl text-base text-muted leading-relaxed">
          {uiLang === "ar"
            ? "اقرأ القرآن الكريم مع ترجمات متعددة اللغات، واستمع للتلاوات، واستكشف التفسير والمزيد."
            : "Read the Holy Quran with multilingual translations, listen to recitations, explore tafsir and much more."}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#surah-list"
            className="btn btn-primary text-sm px-6 py-2.5 rounded-xl"
          >
            {uiLang === "ar" ? "تصفح السور" : "Browse Surahs"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={uiLang === "ar" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </a>
          <a
            href="/search"
            className="btn btn-ghost text-sm px-6 py-2.5 rounded-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {uiLang === "ar" ? "بحث في القرآن" : "Search Quran"}
          </a>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-in-up delay-500 mt-12 inline-flex items-center gap-0 rounded-2xl border border-border bg-surface/70 backdrop-blur-sm shadow-sm overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-6 py-3.5 ${i < stats.length - 1 ? "border-e border-border" : ""}`}
            >
              <span
                className="text-xl font-extrabold tabular-nums"
                style={{ color: stat.color }}
              >
                {formatNumber(stat.value, uiLang)}
              </span>
              <span className="text-xs text-muted font-medium mt-0.5 whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Language pills */}
        <div className="animate-fade-in-up delay-500 mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {["EN", "AR", "FR", "ES", "TR", "ID", "UR", "BN", "DE"].map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 text-[10px] font-bold rounded-full border border-border bg-surface-elevated text-muted tracking-wider"
            >
              {lang}
            </span>
          ))}
          <span className="text-xs text-muted">+ more</span>
        </div>
      </div>
    </section>
  );
}
