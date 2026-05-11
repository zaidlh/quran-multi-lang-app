"use client";

// Prayer times calculation utilities
export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
}

// Calculate prayer times using simplified calculation
export function calculatePrayerTimes(date: Date, location: Location): PrayerTimes {
  const times = getPrayerTimes(date, location.latitude, location.longitude);
  return times;
}

// Simplified prayer times calculation (degrees-based)
function getPrayerTimes(date: Date, lat: number, lng: number): PrayerTimes {
  const dayOfYear = getDayOfYear(date);
  const year = date.getFullYear();
  
  // Calculate solar declination
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);
  
  // Calculate timezone offset
  const timezoneOffset = -date.getTimezoneOffset() / 60;
  
  // Calculate prayer times (simplified)
  const fajr = calculateTime(lat, declination, 18, lng, timezoneOffset, date);
  const sunrise = calculateTime(lat, declination, 0.833, lng, timezoneOffset, date);
  const dhuhr = calculateTime(lat, declination, 0, lng, timezoneOffset, date);
  const asr = calculateTime(lat, declination, calculateAsrShadow(lat, declination), lng, timezoneOffset, date);
  const maghrib = calculateTime(lat, declination, 0.833, lng, timezoneOffset, date);
  const isha = calculateTime(lat, declination, 18, lng, timezoneOffset, date);
  
  return {
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function calculateTime(lat: number, declination: number, angle: number, lng: number, tz: number, date: Date): Date {
  const latRad = lat * Math.PI / 180;
  const declRad = declination * Math.PI / 180;
  const cosHourAngle = (Math.cos((90 - angle) * Math.PI / 180) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad));
  
  if (cosHourAngle > 1 || cosHourAngle < -1) {
    return new Date(date);
  }
  
  const hourAngle = Math.acos(cosHourAngle) * 180 / Math.PI;
  const noon = 12 - lng / 15 - tz;
  const time = noon - hourAngle / 15;
  
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function calculateAsrShadow(lat: number, declination: number): number {
  const latRad = lat * Math.PI / 180;
  const declRad = declination * Math.PI / 180;
  return Math.tan((90 - lat + declination) * Math.PI / 180);
}

// Format prayer time
export function formatPrayerTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Get current prayer
export function getCurrentPrayer(prayerTimes: PrayerTimes): string {
  const now = new Date();
  
  if (now < prayerTimes.fajr) return "night";
  if (now < prayerTimes.sunrise) return "fajr";
  if (now < prayerTimes.dhuhr) return "sunrise";
  if (now < prayerTimes.asr) return "dhuhr";
  if (now < prayerTimes.maghrib) return "asr";
  if (now < prayerTimes.isha) return "maghrib";
  return "isha";
}

// Calculate Qibla direction
export function calculateQibla(latitude: number, longitude: number): number {
  // Kaaba coordinates
  const kaabaLat = 21.422487;
  const kaabaLng = 39.826206;
  
  const latRad = latitude * Math.PI / 180;
  const lngRad = longitude * Math.PI / 180;
  const kaabaLatRad = kaabaLat * Math.PI / 180;
  const kaabaLngRad = kaabaLng * Math.PI / 180;
  
  const dLng = kaabaLngRad - lngRad;
  
  const y = Math.sin(dLng);
  const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(dLng);
  
  let qibla = Math.atan2(y, x) * 180 / Math.PI;
  qibla = (qibla + 360) % 360;
  
  return qibla;
}

// Islamic calendar utilities
export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
}

// Convert Gregorian to Hijri
export function gregorianToHijri(date: Date): HijriDate {
  // Simplified Hijri calculation (approx)
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();
  
  // Islamic year started in 622 CE
  const yearsSinceHijra = gregorianYear - 622;
  const daysSinceHijra = yearsSinceHijra * 354 + Math.floor((yearsSinceHijra / 33) * 8);
  
  const hijriYear = Math.floor((gregorianYear * 365.2422 - 1948439.5) / 354.367);
  const hijriDayOfYear = (gregorianDay + Math.floor((153 * (gregorianMonth - 3) + 2) / 153) - 1 + 365.2422 * (gregorianYear - 1) - 1948439.5) % 354.367;
  
  let hijriMonth = Math.floor(hijriDayOfYear / 29.5) + 1;
  let hijriDay = Math.floor((hijriDayOfYear % 29.5)) + 1;
  
  if (hijriMonth > 12) {
    hijriMonth = 1;
  }
  
  const monthNames = [
    "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];
  
  return {
    year: hijriYear,
    month: hijriMonth,
    day: hijriDay,
    monthName: monthNames[hijriMonth - 1],
  };
}

// Check if current date is in Ramadan
export function isRamadan(date: Date = new Date()): boolean {
  const hijri = gregorianToHijri(date);
  return hijri.month === 9; // Ramadan is 9th month
}

// Get Ramadan info
export function getRamadanInfo(): { isRamadan: boolean; daysRemaining?: number } {
  const now = new Date();
  const hijri = gregorianToHijri(now);
  
  if (hijri.month === 9) {
    const daysInRamadan = 30;
    const dayOfRamadan = hijri.day;
    return {
      isRamadan: true,
      daysRemaining: daysInRamadan - dayOfRamadan + 1,
    };
  }
  
  return { isRamadan: false };
}

// Islamic events calendar
export interface IslamicEvent {
  date: string;
  title: string;
  description: string;
}

export function getIslamicEvents(): IslamicEvent[] {
  return [
    { date: "1 Muharram", title: "Islamic New Year", description: "Beginning of the Islamic calendar year" },
    { date: "9 Muharram", title: "Day of Ashura", description: "Fasting recommended" },
    { date: "12 Rabi al-Awwal", title: "Mawlid al-Nabi", description: "Birth of Prophet Muhammad (peace be upon him)" },
    { date: "27 Rajab", title: "Laylat al-Isra wa al-Miraj", description: "Night Journey and Ascension" },
    { date: "15 Sha'ban", title: "Laylat al-Barat", description: "Night of Forgiveness" },
    { date: "1-30 Ramadan", title: "Ramadan", description: "Month of fasting" },
    { date: "27 Ramadan", title: "Laylat al-Qadr", description: "Night of Power" },
    { date: "1 Shawwal", title: "Eid al-Fitr", description: "Festival of Breaking the Fast" },
    { date: "9 Dhu al-Hijjah", title: "Day of Arafah", description: "Hajj day" },
    { date: "10 Dhu al-Hijjah", title: "Eid al-Adha", description: "Festival of Sacrifice" },
  ];
}