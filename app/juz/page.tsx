import { getJuzList } from "@/lib/quran-data";
import Link from "next/link";

export const metadata = {
  title: "Browse by Juz — Quran",
};

export default async function JuzPage() {
  const juzList = await getJuzList();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse by Juz</h1>
        <p className="text-zinc-500">
          The Quran is divided into 30 equal parts (juz) for daily reading
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {juzList.map((juz) => (
          <div
            key={juz.juz}
            className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-bold">
                {juz.juz}
              </span>
              <div>
                <h2 className="font-semibold">Juz {juz.juz}</h2>
                <p className="text-xs text-zinc-500">
                  {juz.surahs.length} surah{juz.surahs.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              {juz.surahs.map((surah) => (
                <Link
                  key={surah.number}
                  href={`/surah/${surah.number}`}
                  className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-primary-light dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>
                    <span className="text-zinc-400 mr-2">{surah.number}.</span>
                    {surah.name_en}
                  </span>
                  <span className="arabic-text text-base" dir="rtl">
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
