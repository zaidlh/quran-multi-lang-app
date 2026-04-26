import { getSurahs } from "@/lib/quran-data";
import { SurahSearch } from "./components/SurahSearch";
import { LastReadBanner } from "./components/LastReadBanner";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 arabic-text">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </h1>
        <p className="text-zinc-500">
          Read the Holy Quran with translations in 10+ languages
        </p>
      </div>

      <LastReadBanner />

      <SurahSearch surahs={surahs} />
    </div>
  );
}
