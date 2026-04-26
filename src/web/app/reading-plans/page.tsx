import Link from "next/link";

export const metadata = {
  title: "Reading Plans — Quran",
  description:
    "Daily Quran reading plans to complete the Quran in 30 days, 60 days, or during Ramadan.",
};

interface Plan {
  id: string;
  name: string;
  description: string;
  days: number;
  daily: { surahs: number[]; label: string }[];
}

function generateThirtyDayPlan(): Plan {
  const daily: { surahs: number[]; label: string }[] = [];
  const surahsPerJuz: number[][] = [];

  const juzStartSurahs = [
    [1, 2],
    [2],
    [2, 3],
    [3, 4],
    [4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 9],
    [9, 10, 11],
    [11, 12],
    [12, 13, 14],
    [15, 16],
    [17, 18],
    [18, 19, 20],
    [21, 22],
    [23, 24, 25],
    [25, 26, 27],
    [27, 28, 29],
    [29, 30, 31, 32, 33],
    [33, 34, 35, 36],
    [36, 37, 38, 39],
    [39, 40, 41],
    [41, 42, 43, 44, 45],
    [46, 47, 48, 49, 50, 51],
    [51, 52, 53, 54, 55, 56, 57],
    [58, 59, 60, 61, 62, 63, 64, 65, 66],
    [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
    [
      78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
    ],
  ];

  for (let i = 0; i < 30; i++) {
    const surahs = [...new Set(juzStartSurahs[i] || [])];
    surahsPerJuz.push(surahs);
    daily.push({
      surahs,
      label: `Juz ${i + 1}`,
    });
  }

  return {
    id: "30-day",
    name: "Complete in 30 Days",
    description:
      "Read one juz per day to complete the entire Quran in 30 days. Perfect for Ramadan.",
    days: 30,
    daily,
  };
}

function generateSixtyDayPlan(): Plan {
  const daily: { surahs: number[]; label: string }[] = [];
  const totalSurahs = 114;
  const totalDays = 60;
  const base = Math.floor(totalSurahs / totalDays);
  const extra = totalSurahs % totalDays;
  let current = 1;

  for (let i = 0; i < totalDays; i++) {
    const count = base + (i < extra ? 1 : 0);
    const surahs = Array.from({ length: count }, (_, j) => current + j);
    const start = current;
    const end = current + count - 1;
    daily.push({
      surahs,
      label: count === 1 ? `Surah ${start}` : `Surahs ${start}–${end}`,
    });
    current += count;
  }

  return {
    id: "60-day",
    name: "Complete in 60 Days",
    description: "A relaxed pace — about 2 surahs per day to finish in two months.",
    days: 60,
    daily,
  };
}

function generateWeeklyPlan(): Plan {
  const daily: { surahs: number[]; label: string }[] = [];
  const groups = [
    { surahs: [1, 2, 3], label: "Al-Fatiha to Aal-e-Imran" },
    { surahs: [36], label: "Ya-Sin" },
    { surahs: [55, 56], label: "Ar-Rahman & Al-Waqi'ah" },
    { surahs: [67], label: "Al-Mulk" },
    { surahs: [18], label: "Al-Kahf (Friday)" },
    { surahs: [112, 113, 114], label: "Three Quls" },
    { surahs: [2], label: "Al-Baqarah (last 2 verses)" },
  ];

  for (const g of groups) {
    daily.push(g);
  }

  return {
    id: "weekly-essentials",
    name: "Weekly Essentials",
    description:
      "Key surahs recommended for weekly recitation based on hadith and scholarly guidance.",
    days: 7,
    daily,
  };
}

export default function ReadingPlansPage() {
  const plans = [generateThirtyDayPlan(), generateSixtyDayPlan(), generateWeeklyPlan()];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Reading Plans</h1>
        <p className="text-zinc-500">Choose a plan to build a consistent Quran reading habit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-primary transition-colors"
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-sm text-zinc-500 mb-4">{plan.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                {plan.days} days
              </span>
            </div>
            <details className="text-sm">
              <summary className="cursor-pointer text-primary hover:underline mb-2">
                View schedule
              </summary>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {plan.daily.map((day, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <span className="text-zinc-500">Day {i + 1}</span>
                    <span className="text-xs">{day.label}</span>
                    <Link
                      href={`/surah/${day.surahs[0]}`}
                      className="text-primary text-xs hover:underline"
                    >
                      Start →
                    </Link>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
