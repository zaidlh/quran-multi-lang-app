import { getSurahs } from "@/lib/quran-data";
import { SurahSearch } from "./components/SurahSearch";
import { LastReadBanner } from "./components/LastReadBanner";
import { VerseOfTheDay } from "./components/VerseOfTheDay";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="screen active px-4 md:px-8 py-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[--on-surface]">
          As-salamu alaykum
        </h2>
        <p className="text-sm text-[--outline] mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">
            calendar_today
          </span>
          <span id="home-date">Loading...</span>
        </p>
      </div>

      {/* Prayer hero card */}
      <div
        className="relative overflow-hidden rounded-2xl text-white mb-5 min-h-[180px] flex flex-col justify-between p-6"
        style={{ background: "linear-gradient(135deg,#0f3d2e 0%,#1a5740 100%)" }}
      >
        <div className="absolute inset-0 girih opacity-20 pointer-events-none" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-secondary-fixed text-xs font-bold uppercase tracking-widest">
              Next Prayer
            </p>
            <h3
              id="home-next-prayer"
              className="text-3xl font-bold mt-1"
            >
              Dhuhr
            </h3>
            <p id="home-next-prayer-ar" className="amiri text-lg opacity-80">
              الظهر
            </p>
          </div>
          <div className="text-right">
            <span className="material-symbols-outlined text-3xl">
              schedule
            </span>
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-baseline gap-2">
            <span
              id="home-countdown"
              className="text-4xl font-bold tracking-tight"
            >
              00:00:00
            </span>
            <span className="text-xs opacity-70">remaining</span>
          </div>
          <p
            id="home-location"
            className="text-sm opacity-70 mt-1"
          >
            Loading location...
          </p>
        </div>
      </div>

      {/* Prayer list */}
      <div className="sakinah-card p-2 mb-6">
        <div id="home-prayers-list">
          {/* Prayer times will be loaded dynamically */}
          <div className="flex items-center justify-center py-8">
            <div className="spinner" />
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[--surfaceContainerLow] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[--primary-fixed] flex items-center justify-center">
            <span className="material-symbols-outlined text-[--primary-container]">
              menu_book
            </span>
          </div>
          <span className="text-xs font-medium text-[--on-surface]">Quran</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[--surfaceContainerLow] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[--secondary-container] flex items-center justify-center">
            <span className="material-symbols-outlined text-[--secondary]">
              schedule
            </span>
          </div>
          <span className="text-xs font-medium text-[--on-surface]">Prayer</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[--surfaceContainerLow] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[--primary-fixed] flex items-center justify-center">
            <span className="material-symbols-outlined text-[--primary-container]">
              history_edu
            </span>
          </div>
          <span className="text-xs font-medium text-[--on-surface]">Hadith</span>
        </button>
        <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[--surfaceContainerLow] transition-colors">
          <div className="w-12 h-12 rounded-full bg-[--secondary-container] flex items-center justify-center">
            <span className="material-symbols-outlined text-[--secondary]">
              auto_awesome
            </span>
          </div>
          <span className="text-xs font-medium text-[--on-surface]">Adhkar</span>
        </button>
      </div>

      {/* Ayah of the Day */}
      <div className="sakinah-card p-6 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[--on-surface-variant] mb-3">
          Ayah of the Day
        </p>
        <p
          id="home-ayah-arabic"
          className="amiri text-2xl text-right text-[--primary-container] leading-loose mb-3"
          dir="rtl"
        >
          فَإِنَّ مَعَ الْعُسْرِ يُسْرًا
        </p>
        <p
          id="home-ayah-english"
          className="text-sm text-[--on-surface-variant] leading-relaxed italic"
        >
          "For indeed, with hardship [will be] ease."
        </p>
        <p
          id="home-ayah-ref"
          className="text-xs text-[--outline] mt-2"
        >
          Ash-Sharh 94:5
        </p>
      </div>

      {/* Surah list preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[--on-surface]">
            Browse Quran
          </h3>
          <a
            href="/surah"
            className="text-sm text-[--primary-container] font-medium"
          >
            View All
          </a>
        </div>
        <SurahSearch surahs={surahs} />
      </div>
    </div>
  );
}
