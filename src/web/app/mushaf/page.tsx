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
        allVerses.push({ surah: surah.number, surahName: surah.name_en, ayah: v.number, text: v.text });
      }
    }
  }
  const versesPerPage = 15;
  const pages: PageData[] = [];
  for (let i = 0; i < allVerses.length; i += versesPerPage) {
    pages.push({ pageNumber: pages.length + 1, verses: allVerses.slice(i, i + versesPerPage) });
  }
  return pages;
}

export default async function MushafPage() {
  const pages = await buildPages();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="text-center mb-10 animate-fade-in-up">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold mb-4"
          style={{ borderColor: "rgba(13,125,110,0.25)", background: "var(--primary-light)", color: "var(--primary)" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm0 8a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" />
          </svg>
          Traditional Layout · {pages.length} pages
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Mushaf View</h1>
        <p className="text-muted text-sm max-w-sm mx-auto">
          Read the Quran in a continuous, page-by-page mushaf layout with traditional Arabic text.
        </p>
      </div>
      <MushafView pages={pages} />
    </div>
  );
}
