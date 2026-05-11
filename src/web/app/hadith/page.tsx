"use client";

import { getHadithCollections } from "../lib/hadith-data";
import { MainNavigation, DesktopNavigation } from "../components/Navigation";
import { useUILanguage } from "../components/UILanguageProvider";

export default function HadithPage() {
  const collections = getHadithCollections();
  const { uiLang } = useUILanguage();

  // Page title by language
  const titles: Record<string, { title: string; subtitle: string }> = {
    ar: { title: "الحديث", subtitle: "Collections of the Prophet's sayings" },
    en: { title: "Hadith", subtitle: "Collections of the Prophet's sayings" },
    fr: { title: "Hadith", subtitle: "Collections de la Sunna" },
    es: { title: "Hadiz", subtitle: "Colecciones de los dichos del Profeta" },
    tr: { title: "Hadis", subtitle: "Peygamberin sözleri" },
    id: { title: "Hadits", subtitle: "Kumpulan perkataan Nabi" },
    ur: { title: "حدیث", subtitle: "نبی کی احادیث کا مجموعہ" },
    bn: { title: "হাদীস", subtitle: "নবীর বাণীর সংকলন" },
    ru: { title: "Хадисы", subtitle: "Слова пророка" },
    zh: { title: "圣训", subtitle: "先知的言论集" },
  };

  // Collection names by language
  const collectionNames: Record<string, Record<string, string>> = {
    en: {
      bukhari: "Sahih al-Bukhari",
      muslim: "Sahih Muslim",
      abu_dawud: "Abu Dawud",
      tirmidhi: "Jami' at-Tirmidhi",
      nasai: "Sunan an-Nasai",
      ibn_majah: "Ibn Majah",
      riyad_salihin: "Riyad as-Salihin",
      "40_nawawi": "40 Nawawi",
    },
    ar: {
      bukhari: "صحيح البخاري",
      muslim: "صحيح مسلم",
      abu_dawud: "سنن أبي داود",
      tirmidhi: "جامع الترمذي",
      nasai: "سنن النسائي",
      ibn_majah: "سنن ابن ماجه",
      riyad_salihin: "رياض الصالحين",
      "40_nawawi": "الأربعون النووية",
    },
    fr: {
      bukhari: "Sahih Bukhari",
      muslim: "Sahih Muslim",
      abu_dawud: "Abu Dawud",
      tirmidhi: "Jami' Tirmidhi",
      nasai: "Nasai",
      ibn_majah: "Ibn Majah",
      riyad_salihin: "Riad Salihin",
      "40_nawawi": "40 Nawawi",
    },
    es: {
      bukhari: "Sahih Bujari",
      muslim: "Sahih Muslim",
      abu_dawud: "Abu Dawud",
      tirmidhi: "Yami' Tirmidhi",
      nasai: "Nasai",
      ibn_majah: "Ibn Mayah",
      riyad_salihin: "Riad Salihin",
      "40_nawawi": "40 Nawawi",
    },
    tr: {
      bukhari: "Sahih Buhari",
      muslim: "Sahih Müslim",
      abu_dawud: "Ebu Davud",
      tirmidhi: "Cami' Tirmizi",
      nasai: "Nasai",
      ibn_mayah: "İbn Mace",
      riyad_salihin: "Riyakı Salihin",
      "40_nawawi": "40 Nevi",
    },
    id: {
      bukhari: "Shahih Bukhari",
      muslim: "Shahih Muslim",
      abu_dawud: "Abu Dawud",
      tirmidhi: "Jami' Tirmidhi",
      nasai: "Sunah Nasa'i",
      ibn_majah: "Ibn Majah",
      riyad_salihin: "Riwayat Shalihin",
      "40_nawawi": "40 Nawawi",
    },
    ur: {
      bukhari: "صحيح بخاری",
      muslim: "صحيح مسلم",
      abu_dawud: "ابو داود",
      tirmidhi: "جامع ترمذی",
      nasai: "نسائی",
      ibn_majah: "ابن ماجہ",
      riyad_salihin: "رياض صالحين",
      "40_nawawi": "40 نووی",
    },
    bn: {
      bukhari: "সহীহ বুখারী",
      muslim: "সহীহ মুসলিম",
      abu_dawud: "আবু দাউদ",
      tirmidhi: "ইয়ামি' তিরমিদি",
      nasai: "নাসাঈ",
      ibn_majah: "ইবনে মাজাহ",
      riyad_salihin: "রিয়াজুস সালেহীন",
      "40_nawawi": "৪০ নওয়াবী",
    },
    ru: {
      bukhari: "Сахих аль-Бухари",
      muslim: "Сахих Муслим",
      abu_dawud: "Абу Дауд",
      tirmidhi: "Джами аль-Тирмизи",
      nasai: "Сунан ан-Насаи",
      ibn_majah: "Ибн Маджа",
      riyad_salihin: "Рияд ас-Салихин",
      "40_nawawi": "40 Навави",
    },
    zh: {
      bukhari: "布哈里圣训集",
      muslim: "穆斯林圣训集",
      abu_dawud: "艾布·达乌德圣训集",
      tirmidhi: "提尔米吉圣训集",
      nasai: "奈萨伊圣训集",
      ibn_majah: "伊本·马哲圣训集",
      riyad_salihin: "正直者花园",
      "40_nawawi": "四十圣训",
    },
  };

  const pageContent = titles[uiLang] || titles.en;

  const getCollectionName = (id: string) => {
    return collectionNames[uiLang]?.[id] || collectionNames.en[id] || id;
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <DesktopNavigation />
      
      <main className="max-w-2xl mx-auto px-4 pb-24 pt-6">
        <h1 className="text-2xl font-bold mb-2">{pageContent.title}</h1>
        <p className="text-outline mb-6">{pageContent.subtitle}</p>

        <div className="space-y-3">
          {collections.map((col) => (
            <a
              key={col.id}
              href={`/hadith?collection=${col.id}`}
              className="block p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{getCollectionName(col.id)}</span>
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