"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore } from "react";
import { UILanguage, UI_LANGUAGES, UI_LABELS } from "../lib/ui-labels";

interface UILanguageContextValue {
  uiLang: UILanguage;
  setUILang: (lang: UILanguage) => void;
  dir: "rtl" | "ltr";
  t: (typeof UI_LABELS)[UILanguage];
}

const UILanguageContext = createContext<UILanguageContextValue>({
  uiLang: "ar",
  setUILang: () => {},
  dir: "rtl",
  t: UI_LABELS.ar,
});

export function useUILanguage() {
  return useContext(UILanguageContext);
}

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback];
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot(): UILanguage {
  try {
    const stored = localStorage.getItem("quran-ui-lang") as UILanguage | null;
    if (stored && UI_LABELS[stored]) return stored;
  } catch {}
  return "ar";
}

function getServerSnapshot(): UILanguage {
  return "ar";
}

export function UILanguageProvider({ children }: { children: React.ReactNode }) {
  const storedLang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localLang, setLocalLang] = useState<UILanguage | null>(null);
  const uiLang = localLang ?? storedLang;

  const setUILang = useCallback((lang: UILanguage) => {
    setLocalLang(lang);
    localStorage.setItem("quran-ui-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = UI_LANGUAGES.find((l) => l.code === lang)?.dir || "rtl";
    emitChange();
  }, []);

  const dir = UI_LANGUAGES.find((l) => l.code === uiLang)?.dir || "rtl";

  return (
    <UILanguageContext.Provider value={{ uiLang, setUILang, dir, t: UI_LABELS[uiLang] }}>
      {children}
    </UILanguageContext.Provider>
  );
}
