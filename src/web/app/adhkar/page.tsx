"use client";

import { getAdhkarByCategory, getAdhkarCategories } from "../lib/adhkar-data";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";
import { useUILanguage } from "../components/UILanguageProvider";

export default function AdhkarPage() {
  const categories = getAdhkarCategories();
  const { uiLang, t } = useUILanguage();

  // Category labels by language
  const categoryLabels: Record<string, Record<string, string>> = {
    ar: {
      morning: "أذكار morning",
      evening: "أذكار evening", 
      sleep: "أذكار before sleep",
      prayer: "أذكار الصلاة",
      travel: "أذكار travel",
      anxiety: "أذكار worry",
      general: "أذكار عامة",
      tasbih: "التسبيح",
    },
    en: {
      morning: "Morning Adhkar",
      evening: "Evening Adhkar",
      sleep: "Sleep Adhkar",
      prayer: "Prayer Adhkar",
      travel: "Travel Adhkar",
      anxiety: "Anxiety Adhkar",
      general: "General Adhkar",
      tasbih: "Tasbih",
    },
    fr: {
      morning: "Adhkar du matin",
      evening: "Adhkar du soir",
      sleep: "Adhkar du sommeil",
      prayer: "Adhkar de oração",
      travel: "Adhkar de voyage",
      anxiety: "Adhkar contre l'anxiété",
      general: "Adhkar général",
      tasbih: "Tasbih",
    },
    es: {
      morning: "Adhkar de la mañana",
      evening: "Adhkar de la tarde",
      sleep: "Adhkar del sueño",
      prayer: "Adhkar de oración",
      travel: "Adhkar de viaje",
      anxiety: "Adhkar contra ansiedad",
      general: "Adhkar general",
      tasbih: "Tasbih",
    },
    tr: {
      morning: "Sabah Akşamları",
      evening: "Akşam Adhkar",
      sleep: "Uyku Adhkar",
      prayer: "Namaz Adhkar",
      travel: "Seyahat Adhkar",
      anxiety: "Endişe Adhkar",
      general: "Genel Adhkar",
      tasbih: "Tasbih",
    },
    id: {
      morning: "Adhkar Pagi",
      evening: "Adhkar Sore",
      sleep: "Adhkar Tidur",
      prayer: "Adhkar Sholat",
      travel: "Adhkar Jalan",
      anxiety: "Adhkar Khawatir",
      general: "Adhkar Umum",
      tasbih: "Tasbih",
    },
    ur: {
      morning: "صبح کے اذکار",
      evening: "شام کے اذکار",
      sleep: "نیند سے پہلے",
      prayer: "نماز کے اذکار",
      travel: "سفر کے اذکار",
      anxiety: "پریشانی کے اذکار",
      general: "عام اذکار",
      tasbih: "تسبيح",
    },
    bn: {
      morning: "সকালের আধকার",
      evening: "সন্ধ্যার আধকার",
      sleep: "ঘুমের আধকার",
      prayer: "নামাজের আধকার",
      travel: "ভ্রমণের আধকার",
      anxiety: "উদ্বেগের আধকার",
      general: "সাধারণ আধকার",
      tasbih: "তাসবীহ",
    },
    ru: {
      morning: "Утренние азкар",
      evening: "Вечерние азкар",
      sleep: "Азкар перед сном",
      prayer: "Азкар намаза",
      travel: "Азкар в дороге",
      anxiety: "Азкар от беспокойства",
      general: "Общие азкар",
      tasbih: "Тасбих",
    },
    zh: {
      morning: "晨间祈祷",
      evening: "晚间祈祷",
      sleep: "睡前祈祷",
      prayer: "礼拜祈祷",
      travel: "旅行祈祷",
      anxiety: "焦虑祈祷",
      general: "一般祈祷",
      tasbih: "记主词",
    },
  };

  const getCategoryName = (id: string) => {
    return categoryLabels[uiLang]?.[id] || categoryLabels.en[id] || id;
  };

  // Page title by language
  const titles: Record<string, { title: string; subtitle: string }> = {
    ar: { title: "الأذكار", subtitle: "Remembrance and supplications for every occasion" },
    en: { title: "Adhkar", subtitle: "Remembrance and supplications for every occasion" },
    fr: { title: "Adhkar", subtitle: "Rappels et supplications pour chaque occasion" },
    es: { title: "Adhkar", subtitle: "Recuerdos y súplicas para cada ocasión" },
    tr: { title: "Adhkar", subtitle: "Her durum için zikir ve dualar" },
    id: { title: "Adhkar", subtitle: "Zikir dan doa untuk setiap kesempatan" },
    ur: { title: "اذکار", subtitle: "ہر موقع پر ذکر اور دعائیں" },
    bn: { title: "আধকার", subtitle: "প্রতিটি অনুষ্ঠানের জন্য জিকির" },
    ru: { title: "Азкар", subtitle: "Поминание и мольбы на каждый случай" },
    zh: { title: "祈祷词", subtitle: "各种场合的赞念和祈祷" },
  };

  const pageContent = titles[uiLang] || titles.en;

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
              href={`/adhkar?category=${cat.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{getCategoryName(cat.id)}</span>
                <span className="text-sm text-outline">{cat.count} items</span>
              </div>
            </a>
          ))}
        </div>
      </main>

      <MainNavigation />
    </div>
  );
}