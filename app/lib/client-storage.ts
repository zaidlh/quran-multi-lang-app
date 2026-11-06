"use client";

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("quran-storage-change", { detail: { key } }));
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}

export function removeStored(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("quran-storage-change", { detail: { key } }));
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
}

export function subscribeToStorage(key: string, callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) callback();
  };
  const onCustomChange = (event: Event) => {
    const changedKey = (event as CustomEvent<{ key?: string }>).detail?.key;
    if (changedKey === key) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("quran-storage-change", onCustomChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("quran-storage-change", onCustomChange);
  };
}
