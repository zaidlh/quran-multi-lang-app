"use client";

import { getDuaCategories } from "../lib/dua-data";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";
import { useUILanguage } from "../components/UILanguageProvider";

export default function DuaPage() {
  const categories = getDuaCategories();
  const { uiLang } = useUILanguage();

  // Page title by language
  const titles: Record<string, { title: string; subtitle: string }> = {
    ar: { title: "الدعاء", subtitle: "Supplications and prayers" },
    en: { title: "Dua", subtitle: "Supplications and prayers" },
    fr: { title: "Dua", subtitle: "Supplications et prières" },
    es: { title: "Dua", subtitle: "Suplicas y oraciones" },
    tr: { title: "Dua", subtitle: "Dualar ve niyazlar" },
    id: { title: "Doa", subtitle: "Doa dan permohonan" },
    ur: { title: "دعا", subtitle: "دعوائیں اور فرمانیں" },
    bn: { title: "দোয়া", subtitle: "প্রার্থনা ও সুপারিশ" },
    ru: { title: "Дуа", subtitle: "Мольбы и молитвы" },
    zh: { title: "祈祷", subtitle: "祈祷和诉求" },
  };

  // Category names by language
  const categoryNames: Record<string, Record<string, string>> = {
    en: { forgiveness: "Forgiveness", rizq: "Provisions", anxiety: "Anxiety", protection: "Protection", gratitude: "Gratitude", illness: "Illness", travel: "Travel", family: "Family", rain: "Rain", general: "General" },
    ar: { forgiveness: "المغفرة", rizq: "الرزق", anxiety: "القلق", protection: "الحماية", gratitude: "الشكر", illness: "المرض", travel: "السفر", family: "العائلة", rain: "المطر", general: "عام" },
    // Add other languages as needed
  };

  const pageContent = titles[uiLang] || titles.en;
  
  const getCategoryName = (id: string) => {
    return categoryNames[uiLang]?.[id] || categoryNames.en[id] || id;
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold mb-2">{pageContent.title}</h1>
        <p className="text-outline mb-6">{pageContent.subtitle}</p>

        <div className="space-y-3">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/dua?category=${cat.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">{getCategoryName(cat.id)}</span>
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