import { getJuzList } from "@/lib/quran-data";
import Link from "next/link";

export const metadata = {
  title: "Browse by Juz — Quran",
  description: "Browse the Holy Quran organized into 30 Juz (parts) for systematic daily reading.",
};

export default async function JuzPage() {
  const juzList = await getJuzList();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">

      {/* ── Page header ── */}
      <div className="mb-10 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary mb-4">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          30 Parts of the Quran
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Browse by Juz</h1>
        <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
          The Quran is divided into 30 equal parts (أجزاء). Reading one juz per day completes the
          entire Quran in a month.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {juzList.map((juz, idx) => (
          <div
            key={juz.juz}
            className="card group animate-fade-in-up p-5"
            style={{ animationDelay: `${Math.min(idx * 25, 500)}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="flex items-center justify-center w-12 h-12 rounded-xl text-white text-base font-extrabold shadow-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}
              >
                {juz.juz}
              </span>
              <div>
                <h2 className="font-bold text-base">Juz {juz.juz}</h2>
                <p className="text-xs text-muted">
                  {juz.surahs.length} surah{juz.surahs.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Progress bar visual */}
              <div className="ms-auto flex flex-col items-end gap-1">
                <span className="text-[10px] text-muted font-semibold">
                  {Math.round((juz.juz / 30) * 100)}%
                </span>
                <div className="w-14 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round((juz.juz / 30) * 100)}%`,
                      background: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Surah list */}
            <div className="space-y-0.5">
              {juz.surahs.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm hover:bg-primary-light hover:text-primary transition-colors group/row"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="text-[11px] font-bold w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--surface-elevated)", color: "var(--muted)" }}
                    >
                      {surah.number}
                    </span>
                    <span className="truncate font-medium">{surah.name_en}</span>
                  </span>
                  <span className="arabic-text text-base flex-shrink-0" dir="rtl" style={{ lineHeight: 1.8 }}>
                    {surah.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
