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
  ar: "\u{1F1F8}\u{1F1E6}",
  en: "\u{1F1EC}\u{1F1E7}",
  fr: "\u{1F1EB}\u{1F1F7}",
  es: "\u{1F1EA}\u{1F1F8}",
  tr: "\u{1F1F9}\u{1F1F7}",
  id: "\u{1F1EE}\u{1F1E9}",
  ur: "\u{1F1F5}\u{1F1F0}",
  bn: "\u{1F1E7}\u{1F1E9}",
  ru: "\u{1F1F7}\u{1F1FA}",
  zh: "\u{1F1E8}\u{1F1F3}",
};

export default function SettingsPage() {
  const { uiLang, setUILang, t } = useUILanguage();
  const { theme, toggleTheme } = useTheme();
  const storedSettings = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      return () => window.removeEventListener("storage", cb);
    },
    getStoredSettings,
    () => null
  );
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    () => storedSettings?.fontSize || "medium"
  );
  const [audioSpeed, setAudioSpeed] = useState(() => storedSettings?.audioSpeed || 1);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    localStorage.setItem(
      "quran-app-settings",
      JSON.stringify({ theme, fontSize, audioSpeed, uiLang })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetSettings = () => {
    setUILang("ar");
    setFontSize("medium");
    setAudioSpeed(1);
    localStorage.removeItem("quran-app-settings");
    localStorage.removeItem("quran-ui-lang");
  };

  const fontSizeMap = { small: "1.5rem", medium: "1.75rem", large: "2.25rem" };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{t.settings.title}</h1>

      <div className="space-y-6">
        <section className="p-5 rounded-2xl bg-surface border border-border">
          <h2 className="font-semibold mb-3">{t.settings.uiLang}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {UI_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setUILang(l.code)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm ${
                  uiLang === l.code
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-lg">{LANG_FLAGS[l.code] || "\u{1F310}"}</span>
                <div className="text-start">
                  <div className="font-medium">{l.nameNative}</div>
                  <div className="text-xs text-muted">{l.name}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-surface border border-border">
          <h2 className="font-semibold mb-3">{t.settings.quranLang}</h2>
          <p className="text-sm text-muted">
            {uiLang === "ar"
              ? "يمكنك تغيير لغة الترجمة من صفحة السورة"
              : "You can change the translation language from the surah page"}
          </p>
        </section>

        <section className="p-5 rounded-2xl bg-surface border border-border">
          <h2 className="font-semibold mb-3">{t.settings.theme}</h2>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((tMode) => (
              <button
                key={tMode}
                onClick={() => {
                  if (theme !== tMode) toggleTheme();
                }}
                className={`flex-1 p-3 rounded-xl border capitalize text-sm font-medium transition-all ${
                  theme === tMode
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {tMode === "light"
                  ? uiLang === "ar"
                    ? "فاتح"
                    : "Light"
                  : uiLang === "ar"
                    ? "داكن"
                    : "Dark"}
              </button>
            ))}
          </div>
        </section>

        <section className="p-5 rounded-2xl bg-surface border border-border">
          <h2 className="font-semibold mb-3">{t.settings.fontSize}</h2>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${
                  fontSize === size
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {size === "small" ? "A" : size === "medium" ? "A+" : "A++"}
              </button>
            ))}
          </div>
          <p
            className="arabic-text mt-4 p-4 rounded-xl bg-surface-elevated text-center"
            dir="rtl"
            style={{ fontSize: fontSizeMap[fontSize] }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </section>

        <section className="p-5 rounded-2xl bg-surface border border-border">
          <h2 className="font-semibold mb-3">{t.settings.audioSpeed}</h2>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.25}
            value={audioSpeed}
            onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>0.5x</span>
            <span className="font-semibold text-primary">{audioSpeed}x</span>
            <span>2x</span>
          </div>
        </section>

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={saveSettings}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            {saved
              ? `\u2713 ${t.settings.saved}`
              : t.settings.saved === "Saved"
                ? "Save Settings"
                : t.settings.title}
          </button>
          <button
            onClick={resetSettings}
            className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-surface-elevated transition-colors"
          >
            {t.settings.reset}
          </button>
        </div>
      </div>
    </div>
  );
}
