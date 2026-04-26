import { getSurahs } from "@/lib/quran-data";
import { SurahSearch } from "./components/SurahSearch";
import { LastReadBanner } from "./components/LastReadBanner";
import { VerseOfTheDay } from "./components/VerseOfTheDay";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            10+ Languages Available
          </div>
          <h1 className="mb-4">
            <span className="arabic-text text-primary block mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <span className="text-3xl font-bold sm:text-4xl">
              Read the Holy <span className="text-primary">Quran</span>
            </span>
          </h1>
          <div className="mx-auto mt-8 flex items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">114</strong> Surahs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span>
                <strong className="text-foreground">6,236</strong> Verses
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>
                <strong className="text-foreground">30</strong> Juz
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <LastReadBanner />
        <VerseOfTheDay totalSurahs={surahs} />
        <SurahSearch surahs={surahs} />
      </div>
    </>
  );
}
