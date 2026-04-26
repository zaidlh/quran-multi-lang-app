import { getSurahs, getArabicSurah } from "@/lib/quran-data";
import { MushafView } from "./MushafView";

export const metadata = {
  title: "Mushaf View — Quran",
  description: "Read the Quran in a traditional mushaf page-by-page layout.",
};

interface PageData {
  pageNumber: number;
  verses: { surah: number; surahName: string; ayah: number; text: string }[];
}

async function buildPages(): Promise<PageData[]> {
  const surahs = await getSurahs();
  const allVerses: { surah: number; surahName: string; ayah: number; text: string }[] = [];

  for (const surah of surahs) {
    const data = await getArabicSurah(surah.number);
    if (data) {
      for (const v of data.verses) {
        allVerses.push({
          surah: surah.number,
          surahName: surah.name_en,
          ayah: v.number,
          text: v.text,
        });
      }
    }
  }

  const versesPerPage = 15;
  const pages: PageData[] = [];
  for (let i = 0; i < allVerses.length; i += versesPerPage) {
    pages.push({
      pageNumber: pages.length + 1,
      verses: allVerses.slice(i, i + versesPerPage),
    });
  }

  return pages;
}

export default async function MushafPage() {
  const pages = await buildPages();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Mushaf View</h1>
        <p className="text-zinc-500">Read in a traditional page-by-page layout</p>
        <p className="text-xs text-zinc-400 mt-1">{pages.length} pages</p>
      </div>

      <MushafView pages={pages} />
    </div>
  );
}
