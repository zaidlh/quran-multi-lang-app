"use client";

import { useMemo, useSyncExternalStore } from "react";
import { HIJRI_MONTHS, ISLAMIC_EVENTS, getHijriDate } from "../lib/prayer-tools";

const subscribe = () => () => {};

export default function CalendarPage() {
  // Dates depend on the visitor's clock/timezone, so render them only after hydration.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const today = useMemo(() => {
    if (!mounted) return null;
    const now = new Date();
    return {
      hijri: getHijriDate(now),
      gregorian: now.toLocaleDateString("ar-SA-u-ca-gregory", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  }, [mounted]);

  const hijri = today?.hijri;

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <div className="max-w-2xl mx-auto px-4 pb-24 pt-6 space-y-6">
        <h1 className="text-2xl font-bold">التقويم الهجري</h1>

        <div className="p-6 bg-primary-container rounded-xl text-white text-center min-h-[9rem]">
          {hijri && today && (
            <>
              <p className="text-sm opacity-80">{today.gregorian}</p>
              <p className="text-4xl font-bold mt-2">{hijri.day.toLocaleString("ar-SA")}</p>
              <p className="text-xl">{hijri.monthName}</p>
              <p className="text-lg">{hijri.year.toLocaleString("ar-SA", { useGrouping: false })} هـ</p>
            </>
          )}
        </div>

        {hijri?.month === 9 && (
          <div className="p-4 bg-green-600/20 rounded-xl text-center">
            <p className="text-xl">رمضان مبارك 🌙</p>
            <p className="text-sm mt-1">اليوم {hijri.day.toLocaleString("ar-SA")} من رمضان</p>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-3">المناسبات الإسلامية</h2>
          <ul className="space-y-2">
            {ISLAMIC_EVENTS.map((ev) => (
              <li key={`${ev.month}-${ev.day}`} className="p-4 bg-surface-container rounded-xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{ev.title}</span>
                  <span className="text-sm text-outline whitespace-nowrap">
                    {ev.day.toLocaleString("ar-SA")} {HIJRI_MONTHS[ev.month - 1]}
                  </span>
                </div>
                {ev.description && <p className="text-sm text-outline mt-1">{ev.description}</p>}
              </li>
            ))}
          </ul>
          <p className="text-xs text-outline mt-3">
            التاريخ الهجري حسب تقويم أم القرى، وقد يختلف يوماً واحداً عن الرؤية الشرعية في بلدك.
          </p>
        </div>
      </div>
    </div>
  );
}
