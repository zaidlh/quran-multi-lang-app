"use client";

import { useState, useEffect } from "react";
import { gregorianToHijri, getIslamicEvents, isRamadan, getRamadanInfo } from "../lib/prayer-tools";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";

export default function CalendarPage() {
  const [hijri, setHijri] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [ramadanInfo, setRamadanInfo] = useState<any>(null);

  useEffect(() => {
    setHijri(gregorianToHijri(new Date()));
    setEvents(getIslamicEvents());
    setRamadanInfo(getRamadanInfo());
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6 space-y-6">
        <h1 className="text-2xl font-bold mb-2">التقويم الهجري</h1>
        
        {/* Current Hijri Date */}
        <div className="p-6 bg-primary-container rounded-xl text-white text-center">
          <p className="text-sm opacity-80">Current Hijri Date</p>
          <p className="text-3xl font-bold">{hijri?.day}</p>
          <p className="text-xl">{hijri?.monthName}</p>
          <p className="text-lg">{hijri?.year} AH</p>
        </div>

        {/* Ramadan Banner */}
        {ramadanInfo?.isRamadan ? (
          <div className="p-4 bg-green-600/20 rounded-xl text-center">
            <p className="text-xl">🕌 Ramadan Mubarak!</p>
            <p className="text-sm">{ramadanInfo.daysRemaining} days remaining</p>
          </div>
        ) : (
          <div className="p-4 bg-surface-container rounded-xl text-center">
            <p className="text-sm text-outline">Upcoming: Ramadan</p>
          </div>
        )}

        {/* Islamic Events */}
        <div className="p-4 bg-surface-container rounded-xl">
          <p className="font-semibold mb-4">Islamic Events</p>
          <div className="space-y-3">
            {events.slice(0, 8).map((event, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-outline-variant/20 last:border-0">
                <span>{event.title}</span>
                <span className="text-sm text-outline">{event.date}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}