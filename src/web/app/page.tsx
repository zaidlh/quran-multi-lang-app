import { getSurahs } from "@/lib/quran-data";
import { SurahSearch } from "./components/SurahSearch";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <HeroSection surahs={surahs} />

      <div className="mt-6">
        <SurahSearch surahs={surahs} />
      </div>
    </div>
  );
}
