"use client";

import { useState, useEffect } from "react";
import { calculateQibla, formatPrayerTime, calculatePrayerTimes, gregorianToHijri, isRamadan, getRamadanInfo } from "../lib/prayer-tools";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";

export default function PrayerPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [qibla, setQibla] = useState<number | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [hijri, setHijri] = useState<any>(null);
  const [ramadanInfo, setRamadanInfo] = useState<any>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
          
          // Calculate qibla
          const qiblaDirection = calculateQibla(latitude, longitude);
          setQibla(qiblaDirection);
          
          // Calculate prayer times
          const times = calculatePrayerTimes(new Date(), { latitude, longitude, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
          setPrayerTimes(times);
        },
        () => {
          // Default to Mecca if permission denied
          setLocation({ latitude: 21.422487, longitude: 39.826206 });
          setQibla(0);
          const times = calculatePrayerTimes(new Date(), { latitude: 21.422487, longitude: 39.826206, timezone: "UTC" });
          setPrayerTimes(times);
        }
      );
    }
    
    // Get Hijri date
    setHijri(gregorianToHijri(new Date()));
    setRamadanInfo(getRamadanInfo());
  }, []);

  const prayers = [
    { name: "Fajr", key: "fajr" },
    { name: "Sunrise", key: "sunrise" },
    { name: "Dhuhr", key: "dhuhr" },
    { name: "Asr", key: "asr" },
    { name: "Maghrib", key: "maghrib" },
    { name: "Isha", key: "isha" },
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6 space-y-6">
        <h1 className="text-2xl font-bold mb-2">أدوات الصلاة</h1>
        
        {/* Ramadan Status */}
        {ramadanInfo?.isRamadan && (
          <div className="p-4 bg-primary-container/20 rounded-xl">
            <p className="font-semibold text-primary-container">🕌 Ramadan</p>
            <p className="text-sm">Day {31 - ramadanInfo.daysRemaining + 1} of 30 • {ramadanInfo.daysRemaining} days remaining</p>
          </div>
        )}

        {/* Hijri Date */}
        <div className="p-4 bg-surface-container rounded-xl">
          <p className="text-sm text-outline">Today's Hijri Date</p>
          <p className="text-xl font-semibold">{hijri?.day} {hijri?.monthName} {hijri?.year} AH</p>
        </div>

        {/* Qibla Direction */}
        <div className="p-4 bg-surface-container rounded-xl text-center">
          <p className="text-sm text-outline mb-2">Qibla Direction</p>
          {qibla !== null && (
            <div className="flex items-center justify-center gap-4">
              <div 
                className="w-16 h-16 rounded-full border-4 border-primary-container flex items-center justify-center"
                style={{ transform: `rotate(${qibla}deg)` }}
              >
                <span className="text-2xl">⬆️</span>
              </div>
              <span className="text-2xl font-bold">{Math.round(qibla)}°</span>
            </div>
          )}
        </div>

        {/* Prayer Times */}
        <div className="p-4 bg-surface-container rounded-xl">
          <p className="text-sm text-outline mb-4">Prayer Times</p>
          <div className="space-y-2">
            {prayers.map((prayer) => (
              <div key={prayer.key} className="flex justify-between py-2 border-b border-outline-variant/20 last:border-0">
                <span className="font-medium">{prayer.name}</span>
                <span className="text-outline">
                  {prayerTimes && prayerTimes[prayer.key] 
                    ? formatPrayerTime(prayerTimes[prayer.key]) 
                    : "--:--"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}