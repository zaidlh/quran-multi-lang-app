import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن الموقع ومصادر البيانات",
  description: "مصادر نص القرآن والترجمات والتفسير والتلاوات في موقع سكينة، وتراخيصها.",
};

const sources = [
  {
    title: "نص القرآن الكريم (الرسم العثماني)",
    body: "مشروع تنزيل (Tanzil.net)، عبر risan/quran-json. الترخيص: CC-BY-SA-4.0. يجوز نسخ النص وتوزيعه بشرط ذكر المصدر ووضع رابط إلى tanzil.net.",
    href: "https://tanzil.net",
  },
  {
    title: "الترجمات",
    body: "Quran Enc وTanzil، عبر risan/quran-json. الإنجليزية: Sahih International، الفرنسية: محمد حميد الله، الإسبانية: Julio Cortes، التركية: رئاسة الشؤون الدينية (Diyanet)، الإندونيسية: وزارة الشؤون الدينية، الأردية: Ahmed Ali، البنغالية: محيي الدين خان، الألمانية: Abu Rida Muhammad ibn Ahmad ibn Rassoul، الماليزية: Abdullah Muhammad Basmeih.",
    href: "https://quranenc.com",
  },
  {
    title: "بيانات السور",
    body: "semarketir/quranjson. الترخيص: MIT.",
    href: "https://github.com/semarketir/quranjson",
  },
  {
    title: "التفسير",
    body: "مشروع spa5k/tafsir_api (الترخيص: MIT) ويضم ابن كثير والجلالين والقرطبي والميسر وتفهيم القرآن. يُحمَّل عند الطلب من الإنترنت.",
    href: "https://github.com/spa5k/tafsir_api",
  },
  {
    title: "التلاوات الصوتية",
    body: "EveryAyah.com (آية بآية) وQuranicAudio.com (سورة كاملة). تُبَثّ من مواقعها ولا تُخزَّن على هذا الموقع.",
    href: "https://everyayah.com",
  },
  {
    title: "الخطوط",
    body: "Scheherazade New من SIL International (ترخيص SIL OFL 1.1).",
    href: "https://software.sil.org/scheherazade/",
  },
  {
    title: "مواقيت الصلاة",
    body: "تُحسب على جهازك بمكتبة adhan (ترخيص MIT). التاريخ الهجري حسب تقويم أم القرى.",
    href: "https://github.com/batoulapps/adhan-js",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-2">عن سكينة</h1>
      <p className="text-outline mb-8">
        موقع لقراءة القرآن الكريم بأكثر من ١٠ لغات، مع التلاوة والتفسير والمصحف وخطط القراءة.
      </p>

      <h2 className="text-lg font-semibold mb-4">المصادر والتراخيص</h2>
      <ul className="space-y-3">
        {sources.map((s) => (
          <li key={s.title} className="p-4 bg-surface-container rounded-xl">
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-container hover:underline">
              {s.title}
            </a>
            <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{s.body}</p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-outline mt-8 leading-relaxed">
        الموقع للاستخدام التعليمي والشخصي. يُرجى الرجوع إلى أهل العلم الثقات في المسائل الشرعية، فالترجمات
        اجتهاد بشري ولا تغني عن النص العربي. الحقوق في النص والترجمات محفوظة لأصحابها كما هو مبيّن أعلاه.
      </p>
    </div>
  );
}
