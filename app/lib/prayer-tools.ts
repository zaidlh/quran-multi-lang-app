import { Coordinates, CalculationMethod, PrayerTimes, Qibla, type CalculationParameters } from "adhan";

export const PRAYER_METHODS = {
  MuslimWorldLeague: { label: "رابطة العالم الإسلامي", params: () => CalculationMethod.MuslimWorldLeague() },
  UmmAlQura: { label: "أم القرى (مكة المكرمة)", params: () => CalculationMethod.UmmAlQura() },
  Egyptian: { label: "الهيئة المصرية العامة للمساحة", params: () => CalculationMethod.Egyptian() },
  Karachi: { label: "جامعة العلوم الإسلامية بكراتشي", params: () => CalculationMethod.Karachi() },
  NorthAmerica: { label: "أمريكا الشمالية (ISNA)", params: () => CalculationMethod.NorthAmerica() },
  Dubai: { label: "دبي", params: () => CalculationMethod.Dubai() },
  Qatar: { label: "قطر", params: () => CalculationMethod.Qatar() },
  Kuwait: { label: "الكويت", params: () => CalculationMethod.Kuwait() },
} satisfies Record<string, { label: string; params: () => CalculationParameters }>;

export type PrayerMethodKey = keyof typeof PRAYER_METHODS;

export const PRAYER_ORDER = [
  { key: "fajr", label: "الفجر" },
  { key: "sunrise", label: "الشروق" },
  { key: "dhuhr", label: "الظهر" },
  { key: "asr", label: "العصر" },
  { key: "maghrib", label: "المغرب" },
  { key: "isha", label: "العشاء" },
] as const;

export type PrayerKey = (typeof PRAYER_ORDER)[number]["key"];

export function getPrayerTimes(
  latitude: number,
  longitude: number,
  method: PrayerMethodKey = "MuslimWorldLeague",
  date: Date = new Date()
): PrayerTimes {
  return new PrayerTimes(new Coordinates(latitude, longitude), date, PRAYER_METHODS[method].params());
}

/** Direction of the Kaaba in degrees clockwise from true north. */
export function getQiblaDirection(latitude: number, longitude: number): number {
  return Qibla(new Coordinates(latitude, longitude));
}

export function formatPrayerTime(date: Date): string {
  return date.toLocaleTimeString("ar-SA", { hour: "numeric", minute: "2-digit", hour12: true });
}

/** The next prayer after `now` today (null after Isha). */
export function getNextPrayer(times: PrayerTimes, now: Date = new Date()): PrayerKey | null {
  for (const p of PRAYER_ORDER) {
    if (times[p.key] > now) return p.key;
  }
  return null;
}

// ── Hijri calendar (Umm al-Qura, from the browser's built-in Intl data) ──

export const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
  "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
] as const;

export interface HijriDate {
  year: number;
  month: number; // 1–12
  day: number;
  monthName: string;
}

export function getHijriDate(date: Date = new Date()): HijriDate {
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const month = get("month");
  return { year: get("year"), month, day: get("day"), monthName: HIJRI_MONTHS[month - 1] };
}

export interface IslamicEvent {
  month: number;
  day: number;
  title: string;
  description: string;
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { month: 1, day: 1, title: "رأس السنة الهجرية", description: "بداية العام الهجري الجديد" },
  { month: 1, day: 10, title: "يوم عاشوراء", description: "يُستحب صيامه مع التاسع أو الحادي عشر" },
  { month: 3, day: 12, title: "المولد النبوي", description: "ذكرى مولد النبي ﷺ حسب المشهور" },
  { month: 7, day: 27, title: "الإسراء والمعراج", description: "ذكرى الإسراء والمعراج حسب المشهور" },
  { month: 8, day: 15, title: "ليلة النصف من شعبان", description: "" },
  { month: 9, day: 1, title: "بداية شهر رمضان", description: "شهر الصيام والقرآن" },
  { month: 9, day: 27, title: "ليلة القدر (يُرجى في العشر الأواخر)", description: "تُطلب في الليالي الوترية من العشر الأواخر" },
  { month: 10, day: 1, title: "عيد الفطر", description: "" },
  { month: 12, day: 9, title: "يوم عرفة", description: "يُستحب صيامه لغير الحاج" },
  { month: 12, day: 10, title: "عيد الأضحى", description: "" },
];
