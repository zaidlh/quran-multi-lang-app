# سكينة — Sakinah

موقع لقراءة القرآن الكريم بأكثر من ١٠ لغات، مع التلاوة الصوتية والتفسير والمصحف وخطط القراءة ومواقيت الصلاة والتقويم الهجري.
Read the Quran in 10+ languages with audio, tafsir, mushaf view, reading plans, prayer times and a Hijri calendar.

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:3000
```

| الأمر | الوظيفة |
| --- | --- |
| `npm run build` / `npm start` | بناء وتشغيل نسخة الإنتاج |
| `npm run lint` | فحص ESLint |
| `npm run typecheck` | فحص TypeScript |
| `npm test` | اختبارات الوحدات (Vitest) |

## النشر على Vercel

1. ارفع محتويات هذا المجلد إلى مستودع GitHub (الجذر هو تطبيق Next.js نفسه).
2. في Vercel: **Add New → Project** ثم اختر المستودع. اترك **Root Directory** فارغاً (`./`)، فالإعدادات تُكتشف تلقائياً.
3. (اختياري) عند ربط دومين خاص، أضف متغير البيئة `NEXT_PUBLIC_SITE_URL=https://your-domain.com` ليُستخدم في خريطة الموقع وrobots ومعاينات المشاركة.

## هيكل المشروع

```
app/            صفحات الموقع ومكوناته (App Router)
lib/            قراءة بيانات القرآن من ملفات JSON
data/text/      نص القرآن (العثماني) و٩ ترجمات وبيانات السور
public/         الأيقونات وملف manifest وservice worker
__tests__/      اختبارات المكونات
```

التلاوات الصوتية والتفاسير تُجلب من مصادرها الخارجية عند الطلب ولا تُخزَّن في المشروع.
مصادر البيانات وتراخيصها مذكورة في صفحة `/about` داخل الموقع.

## الترخيص

الكود بترخيص MIT (انظر `LICENSE`). نص القرآن والترجمات بترخيص CC-BY-SA-4.0 من أصحابها، كما هو مبيّن في صفحة «عن الموقع».
