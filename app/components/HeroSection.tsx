"use client";

import { useUILanguage } from "./UILanguageProvider";
import { formatNumber } from "../lib/ui-labels";
import { LastReadBanner } from "./LastReadBanner";
import { VerseOfTheDay } from "./VerseOfTheDay";

interface Surah {
  number: number;
  name: string;
  name_en: string;
  verses: number;
}

export function HeroSection({ surahs }: { surahs: Surah[] }) {
  const { t, uiLang } = useUILanguage();

  return (
    <div className="space-y-4">
      {/* Greeting + Stats hero */}
      <div
        className="relative overflow-hidden rounded-2xl text-white min-h-[180px] flex flex-col justify-between p-6"
        style={{ background: "linear-gradient(135deg,#0f3d2e 0%,#1a5740 100%)" }}
      >
        <div className="absolute inset-0 girih opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-secondary-fixed text-xs font-bold uppercase tracking-widest mb-1">
            {t.home.badge}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{t.home.greeting}</h1>
          <p className="arabic-text text-lg opacity-80" dir="rtl">
            {t.home.subtitle}
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed" />
            <span className="text-sm opacity-90">
              {formatNumber(114, uiLang)} {t.home.statsSurahs}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-fixed" />
            <span className="text-sm opacity-90">
              {formatNumber(6236, uiLang)} {t.home.statsVerses}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="text-sm opacity-90">
              {formatNumber(30, uiLang)} {t.home.statsJuz}
            </span>
          </div>
        </div>
      </div>

      <LastReadBanner />
      <VerseOfTheDay totalSurahs={surahs} />
    </div>
  );
}
