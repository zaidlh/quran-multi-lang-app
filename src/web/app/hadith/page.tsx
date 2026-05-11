import { getHadithCollections } from "../lib/hadith-data";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";

export default function HadithPage() {
  const collections = getHadithCollections();

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold mb-2">الحديث</h1>
        <p className="text-outline mb-6">Collections of the Prophet's sayings</p>

        <div className="space-y-3">
          {collections.map((col) => (
            <a
              key={col.id}
              href={`/hadith?collection=${col.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{col.name}</span>
                <span className="text-sm text-outline">{col.count} hadiths</span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}