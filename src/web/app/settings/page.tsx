"use client";

import { useUILanguage } from "../components/UILanguageProvider";
import { UI_LANGUAGES, UILanguage } from "../lib/ui-labels";
import { useTheme } from "../components/ThemeProvider";
import { useState, useSyncExternalStore } from "react";

function getStoredSettings() {
  try {
    const stored = localStorage.getItem("quran-app-settings");
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

const LANG_FLAGS: Partial<Record<UILanguage, string>> = {
  ar: "🇸🇦", en: "🇬🇧", fr: "🇫🇷", es: "🇪🇸", tr: "🇹🇷",
  id: "🇮🇩", ur: "🇵🇰", bn: "🇧🇩", ru: "🇷🇺", zh: "🇨🇳",
};

function SettingSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card p-5 sm:p-6 animate-fade-in-up">
      <h2 className="flex items-center gap-2 font-bold text-base mb-5">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const { uiLang, setUILang, t } = useUILanguage();
  const { theme, toggleTheme }   = useTheme();

  const storedSettings = useSyncExternalStore(
    (cb) => { window.addEventListener("storage", cb); return () => window.removeEventListener("storage", cb); },
    getStoredSettings, () => null
  );

  const [fontSize,   setFontSize]   = useState<"small" | "medium" | "large">(() => storedSettings?.fontSize   || "medium");
  const [audioSpeed, setAudioSpeed] = useState<number>(() => storedSettings?.audioSpeed || 1);
  const [saved,      setSaved]      = useState(false);

  const saveSettings = () => {
    localStorage.setItem("quran-app-settings", JSON.stringify({ theme, fontSize, audioSpeed, uiLang }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const resetSettings = () => {
    if (!window.confirm("Reset all settings to defaults?")) return;
    setUILang("ar");
    setFontSize("medium");
    setAudioSpeed(1);
    localStorage.removeItem("quran-app-settings");
    localStorage.removeItem("quran-ui-lang");
  };

  const fontSizeMap = { small: "1.4rem", medium: "1.75rem", large: "2.2rem" };
  const fontLabels  = { small: "Small", medium: "Medium", large: "Large" };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">

      {/* ── Page header ── */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold tracking-tight">{t.settings.title}</h1>
        <p className="text-muted text-sm mt-1">Customize your reading experience</p>
      </div>

      <div className="space-y-4">

        {/* ── Interface Language ── */}
        <SettingSection
          title={t.settings.uiLang}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {UI_LANGUAGES.map((l) => {
              const active = uiLang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => setUILang(l.code)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-start transition-all duration-200 ${
                    active
                      ? "border-primary/40 shadow-sm"
                      : "border-border hover:border-primary/25 hover:bg-surface-elevated"
                  }`}
                  style={active ? { background: "var(--primary-light)" } : {}}
                >
                  <span className="text-xl leading-none">{LANG_FLAGS[l.code] ?? "🌐"}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${active ? "text-primary" : ""}`}>{l.nameNative}</p>
                    <p className="text-xs text-muted truncate">{l.name}</p>
                  </div>
                  {active && (
                    <svg className="w-3.5 h-3.5 ms-auto flex-shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </SettingSection>

        {/* ── Theme ── */}
        <SettingSection
          title={t.settings.theme}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            {(["light", "dark"] as const).map((mode) => {
              const active = theme === mode;
              return (
                <button
                  key={mode}
                  onClick={() => { if (theme !== mode) toggleTheme(); }}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    active
                      ? "border-primary/40 shadow-sm"
                      : "border-border hover:border-primary/25"
                  }`}
                  style={active ? { background: "var(--primary-light)" } : { background: "var(--surface-elevated)" }}
                >
                  <span className="text-2xl">
                    {mode === "light" ? "☀️" : "🌙"}
                  </span>
                  <div className="text-start">
                    <p className={`text-sm font-bold capitalize ${active ? "text-primary" : ""}`}>
                      {mode === "light" ? (uiLang === "ar" ? "فاتح" : "Light") : (uiLang === "ar" ? "داكن" : "Dark")}
                    </p>
                    <p className="text-xs text-muted">{mode === "light" ? "Day reading" : "Night reading"}</p>
                  </div>
                  {active && (
                    <svg className="w-3.5 h-3.5 ms-auto text-primary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </SettingSection>

        {/* ── Arabic Font Size ── */}
        <SettingSection
          title={t.settings.fontSize}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        >
          <div className="flex gap-2 mb-5">
            {(["small", "medium", "large"] as const).map((size) => {
              const active = fontSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200 ${
                    active
                      ? "border-primary/40 shadow-sm"
                      : "border-border hover:border-primary/25 hover:bg-surface-elevated"
                  }`}
                  style={active ? { background: "var(--primary-light)" } : {}}
                >
                  <span
                    className={`font-extrabold transition-all ${active ? "text-primary" : "text-muted"}`}
                    style={{ fontSize: size === "small" ? "14px" : size === "medium" ? "18px" : "22px" }}
                  >
                    A
                  </span>
                  <span className={`text-[10px] font-semibold ${active ? "text-primary" : "text-muted"}`}>
                    {fontLabels[size]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live preview */}
          <div className="rounded-xl border border-border bg-surface-elevated p-4 text-center">
            <p className="section-label mb-2 text-center">Preview</p>
            <p className="arabic-text font-bold" dir="rtl" style={{ fontSize: fontSizeMap[fontSize], color: "var(--primary)" }}>
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </SettingSection>

        {/* ── Audio Speed ── */}
        <SettingSection
          title={t.settings.audioSpeed}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6a7 7 0 010 12M9 8v8l7-4-7-4z" />
            </svg>
          }
        >
          <div className="space-y-3">
            <input
              type="range"
              min={0.5} max={2} step={0.25}
              value={audioSpeed}
              onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "var(--primary)" }}
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted">0.5×</span>
              <span
                className="font-extrabold text-sm px-3 py-1 rounded-lg"
                style={{ background: "var(--primary-light)", color: "var(--primary)" }}
              >
                {audioSpeed}×
              </span>
              <span className="text-muted">2×</span>
            </div>
            <div className="flex gap-1.5 justify-center flex-wrap">
              {[0.75, 1, 1.25, 1.5, 1.75].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    audioSpeed === speed
                      ? "text-primary"
                      : "border border-border text-muted hover:border-primary/30 hover:text-foreground"
                  }`}
                  style={audioSpeed === speed ? { background: "var(--primary-light)" } : {}}
                >
                  {speed}×
                </button>
              ))}
            </div>
          </div>
        </SettingSection>

        {/* ── Translation Language note ── */}
        <SettingSection
          title={t.settings.quranLang}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        >
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-elevated border border-border">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-muted leading-relaxed">
              {uiLang === "ar"
                ? "يمكنك تغيير لغة الترجمة مباشرةً من أي صفحة سورة عبر القائمة المنسدلة."
                : "You can change the translation language directly from any surah page using the language dropdown."}
            </p>
          </div>
        </SettingSection>

        {/* ── Save / Reset ── */}
        <div className="flex items-center gap-3 pt-2 animate-fade-in-up delay-400">
          <button
            onClick={saveSettings}
            className="flex-1 btn btn-primary py-3 rounded-xl text-sm"
          >
            {saved ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t.settings.saved}
              </>
            ) : t.settings.save}
          </button>
          <button
            onClick={resetSettings}
            className="btn btn-ghost py-3 rounded-xl text-sm"
          >
            {t.settings.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
