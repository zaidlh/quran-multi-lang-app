import { getSurahs } from "@/lib/quran-data";
import { SurahSearch } from "./components/SurahSearch";
import { LastReadBanner } from "./components/LastReadBanner";
import { VerseOfTheDay } from "./components/VerseOfTheDay";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <LastReadBanner />
        <VerseOfTheDay totalSurahs={surahs} />
        <SurahSearch surahs={surahs} />
      </div>
    </>
  );
}
