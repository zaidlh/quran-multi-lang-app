import Link from "next/link";

export const metadata = {
  title: "Reading Plans — Quran",
  description: "Daily Quran reading plans to complete the Quran in 30 days, 60 days, or during Ramadan.",
};

interface Plan {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  days: number;
  icon: string;
  accent: string;
  daily: { surahs: number[]; label: string }[];
}

function generateThirtyDayPlan(): Plan {
  const juzStartSurahs = [
    [1, 2],[2],[2, 3],[3, 4],[4],[4, 5],[5, 6],[6, 7],[7, 8],[8, 9],
    [9, 10, 11],[11, 12],[12, 13, 14],[15, 16],[17, 18],[18, 19, 20],[21, 22],
    [23, 24, 25],[25, 26, 27],[27, 28, 29],[29, 30, 31, 32, 33],[33, 34, 35, 36],
    [36, 37, 38, 39],[39, 40, 41],[41, 42, 43, 44, 45],[46, 47, 48, 49, 50, 51],
    [51, 52, 53, 54, 55, 56, 57],[58, 59, 60, 61, 62, 63, 64, 65, 66],
    [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
    [78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114],
  ];
  return {
    id: "30-day", name: "Complete in 30 Days", nameAr: "ختم في ٣٠ يومًا",
    description: "Read one juz per day to complete the entire Quran in a month. Ideal for Ramadan.",
    days: 30, icon: "🌙", accent: "var(--primary)",
    daily: juzStartSurahs.map((surahs, i) => ({
      surahs: [...new Set(surahs)],
      label: `Juz ${i + 1}`,
    })),
  };
}

function generateSixtyDayPlan(): Plan {
  const daily: { surahs: number[]; label: string }[] = [];
  const total = 114; const days = 60;
  const base = Math.floor(total / days); const extra = total % days;
  let cur = 1;
  for (let i = 0; i < days; i++) {
    const count = base + (i < extra ? 1 : 0);
    const surahs = Array.from({ length: count }, (_, j) => cur + j);
    const end = cur + count - 1;
    daily.push({ surahs, label: count === 1 ? `Surah ${cur}` : `Surahs ${cur}–${end}` });
    cur += count;
  }
  return {
    id: "60-day", name: "Complete in 60 Days", nameAr: "ختم في ٦٠ يومًا",
    description: "A relaxed pace — roughly 2 surahs per day to finish in two months.",
    days: 60, icon: "📖", accent: "var(--gold)",
    daily,
  };
}

function generateWeeklyPlan(): Plan {
  return {
    id: "weekly-essentials", name: "Weekly Essentials", nameAr: "السور الأسبوعية",
    description: "Key surahs recommended for regular recitation based on prophetic tradition.",
    days: 7, icon: "⭐", accent: "#7c3aed",
    daily: [
      { surahs: [1, 2, 3], label: "Al-Fatiha · Al-Baqarah · Aal-e-Imran" },
      { surahs: [36],       label: "Ya-Sin" },
      { surahs: [55, 56],   label: "Ar-Rahman · Al-Waqi'ah" },
      { surahs: [67],       label: "Al-Mulk" },
      { surahs: [18],       label: "Al-Kahf (Friday)" },
      { surahs: [112, 113, 114], label: "Three Quls" },
      { surahs: [2],        label: "Al-Baqarah (last 2 verses)" },
    ],
  };
}

export default function ReadingPlansPage() {
  const plans = [generateThirtyDayPlan(), generateSixtyDayPlan(), generateWeeklyPlan()];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">

      {/* ── Header ── */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold mb-4"
          style={{ borderColor: "rgba(13,125,110,0.25)", background: "var(--primary-light)", color: "var(--primary)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          3 Structured Plans
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Reading Plans</h1>
        <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
          Build a consistent Quran reading habit with a structured schedule tailored to your pace.
        </p>
      </div>

      {/* ── Plan cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className="card group flex flex-col animate-fade-in-up overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Color bar */}
            <div className="h-1.5 w-full" style={{ background: plan.accent }} />

            <div className="flex-1 p-6 flex flex-col">
              {/* Icon + title */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl leading-none">{plan.icon}</span>
                <div>
                  <h2 className="font-extrabold text-lg leading-tight">{plan.name}</h2>
                  <p className="arabic-text text-sm mt-0.5 font-medium" dir="rtl" style={{ color: plan.accent, lineHeight: 1.8 }}>
                    {plan.nameAr}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-4">{plan.description}</p>

              {/* Badge */}
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `color-mix(in srgb, ${plan.accent} 12%, transparent)`, color: plan.accent }}
                >
                  {plan.days} days
                </span>
                <span className="text-xs text-muted">{plan.daily.length} sessions</span>
              </div>

              {/* Schedule details */}
              <details className="flex-1">
                <summary
                  className="cursor-pointer text-sm font-semibold flex items-center gap-1.5 select-none list-none"
                  style={{ color: plan.accent }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  View full schedule
                </summary>
                <div className="mt-3 max-h-56 overflow-y-auto rounded-xl border border-border">
                  {plan.daily.map((day, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 px-3 text-xs border-b border-border/60 last:border-0 hover:bg-surface-elevated transition-colors"
                    >
                      <span className="text-muted font-medium w-12 shrink-0">Day {i + 1}</span>
                      <span className="flex-1 truncate text-foreground mx-2">{day.label}</span>
                      <Link
                        href={`/surah/${day.surahs[0]}`}
                        className="text-xs font-bold shrink-0 transition-colors"
                        style={{ color: plan.accent }}
                      >
                        Start →
                      </Link>
                    </div>
                  ))}
                </div>
              </details>

              {/* Start CTA */}
              <Link
                href={`/surah/${plan.daily[0].surahs[0]}`}
                className="mt-5 btn text-sm rounded-xl py-2.5 font-bold transition-all"
                style={{
                  background: `color-mix(in srgb, ${plan.accent} 12%, transparent)`,
                  color: plan.accent,
                  border: `1.5px solid color-mix(in srgb, ${plan.accent} 25%, transparent)`,
                }}
              >
                Start Plan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tips ── */}
      <div className="mt-12 p-6 rounded-2xl border border-border bg-surface animate-fade-in-up delay-300">
        <h2 className="font-bold text-base mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Tips for consistency
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: "🕌", tip: "Set a specific time each day — after Fajr is highly recommended." },
            { icon: "📱", tip: "Use bookmarks to save your progress and resume from where you left off." },
            { icon: "🎧", tip: "Listen along with audio recitation to improve your Tajweed." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-elevated">
              <span className="text-2xl leading-none">{item.icon}</span>
              <p className="text-xs text-muted leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
