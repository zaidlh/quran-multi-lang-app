"use client";

import { useEffect, useState } from "react";
import {
  PRAYER_METHODS,
  PRAYER_ORDER,
  formatPrayerTime,
  getNextPrayer,
  getPrayerTimes,
  getQiblaDirection,
  type PrayerMethodKey,
} from "../lib/prayer-tools";

type Coords = { latitude: number; longitude: number };

const METHOD_STORAGE_KEY = "sakinah-prayer-method";

export default function PrayerPage() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<PrayerMethodKey>(() => {
    // The method selector only renders after the user taps "locate", so this never affects server HTML.
    if (typeof window === "undefined") return "MuslimWorldLeague";
    try {
      const saved = localStorage.getItem(METHOD_STORAGE_KEY);
      return saved && saved in PRAYER_METHODS ? (saved as PrayerMethodKey) : "MuslimWorldLeague";
    } catch {
      return "MuslimWorldLeague";
    }
  });
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const locate = () => {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم تحديد الموقع.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("تعذّر تحديد موقعك. اسمح للموقع بالوصول إلى الموقع الجغرافي ثم أعد المحاولة.");
        setLoading(false);
      },
      { timeout: 10_000 }
    );
  };

  const changeMethod = (value: PrayerMethodKey) => {
    setMethod(value);
    try {
      localStorage.setItem(METHOD_STORAGE_KEY, value);
    } catch {
      /* storage unavailable */
    }
  };

  const times = coords ? getPrayerTimes(coords.latitude, coords.longitude, method, now) : null;
  const qibla = coords ? getQiblaDirection(coords.latitude, coords.longitude) : null;
  const next = times ? getNextPrayer(times, now) : null;

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <div className="max-w-2xl mx-auto px-4 pb-24 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">مواقيت الصلاة</h1>
          <p className="text-outline text-sm">تُحسب على جهازك حسب موقعك، ولا يُرسل موقعك إلى أي خادم.</p>
        </div>

        {!coords && (
          <div className="p-6 bg-surface-container rounded-xl text-center space-y-4">
            <p>اسمح بتحديد موقعك لعرض مواقيت الصلاة واتجاه القبلة.</p>
            <button
              onClick={locate}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary-container text-white font-medium disabled:opacity-60"
            >
              {loading ? "جارٍ تحديد الموقع…" : "تحديد موقعي"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        )}

        {times && qibla !== null && (
          <>
            <ul className="space-y-2">
              {PRAYER_ORDER.map((p) => (
                <li
                  key={p.key}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    next === p.key
                      ? "bg-primary-container text-white"
                      : "bg-surface-container"
                  }`}
                >
                  <span className="font-medium">{p.label}</span>
                  <span>{formatPrayerTime(times[p.key])}</span>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-surface-container rounded-xl text-center">
              <p className="text-sm text-outline mb-3">اتجاه القبلة</p>
              <div
                className="mx-auto w-24 h-24 rounded-full border-2 border-outline-variant flex items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className="text-4xl text-primary-container leading-none"
                  style={{ transform: `rotate(${qibla}deg)` }}
                >
                  ↑
                </span>
              </div>
              <p className="mt-3 font-medium">{Math.round(qibla)}° من الشمال الحقيقي</p>
              <p className="text-xs text-outline mt-1">
                السهم يتجه نحو القبلة إذا وجّهتَ أعلى الشاشة نحو الشمال.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="method" className="text-sm text-outline">
                طريقة الحساب
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => changeMethod(e.target.value as PrayerMethodKey)}
                className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant"
              >
                {Object.entries(PRAYER_METHODS).map(([key, m]) => (
                  <option key={key} value={key}>
                    {m.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-outline">
                قد تختلف المواقيت بدقائق عن التقويم المعتمد في بلدك، فاعتمد تقويم مسجدك المحلي عند الاختلاف.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
