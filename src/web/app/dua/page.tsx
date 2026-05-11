import { getDuaCategories } from "../lib/dua-data";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";

export default function DuaPage() {
  const categories = getDuaCategories();

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold mb-2">الدعاء</h1>
        <p className="text-outline mb-6">Supplications and prayers</p>

        <div className="space-y-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/dua?category=${cat.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">{cat.name}</span>
                <span className="text-sm text-outline">{cat.count} duas</span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}