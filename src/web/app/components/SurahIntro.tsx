"use client";

import { useUILanguage } from "./UILanguageProvider";
import { formatNumber, type UILanguage } from "../lib/ui-labels";

interface SurahIntroProps {
  surahNumber: number;
  name: string;
  nameEn: string;
  nameTranslation: string;
  verses: number;
  revelationType: string;
}

const SURAH_INTROS: Record<UILanguage, Record<number, string>> = {
  ar: {
    1: "الفاتحة هي أول سورة في القرآن الكريم وتُقرأ في كل ركعة من الصلاة. وهي ملخص شامل للقرآن بأكمله، تتضمن حمد الله والاعتراف بسيادته والدعاء بالهداية.",
    2: "البقرة هي أطول سورة في القرآن، تتناول الأحكام وقصص الأنبياء السابقين وهداية الأمة الإسلامية. تتضمن آية الكرسي (٢:٢٥٥)، من أعظم الآيات، وتُختتم بأدعية عظيمة.",
    3: "آل عمران تتحدث عن عائلة النبي عيسى عليه السلام وغزوة أحد وتؤكد على الثبات في الإيمان.",
    18: "الكهف تحتوي على أربع قصص رئيسية: أصحاب الكهف، صاحب الجنتين، موسى والخضر، وذو القرنين. يُستحب قراءتها كل جمعة.",
    36: "يس تُسمى قلب القرآن. تتحدث عن البعث وقصص الرسل السابقين وآيات الله في الخلق.",
    55: 'الرحمن تتميز بترديد "فبأي آلاء ربكما تكذبان". تصف نعم الله في الدنيا والآخرة.',
    67: "الملك تتحدث عن الغرض من الخلق وآيات قدرة الله. قال النبي ﷺ إنها تشفع لصاحبها حتى يُغفر له.",
    112: "الإخلاص تعدل ثلث القرآن في المعنى. تُثبت وحدانية الله المطلقة في أربع آيات.",
  },
  en: {
    1: "Al-Fatiha (The Opening) is the first surah and is recited in every unit of prayer. It is a comprehensive summary of the Quran, containing praise of Allah, acknowledgment of His sovereignty, and a supplication for guidance.",
    2: "Al-Baqarah (The Cow) is the longest surah, covering laws, stories of past prophets, and guidance for the Muslim community. It includes Ayat al-Kursi (2:255), one of the most revered verses, and concludes with powerful supplications.",
    3: "Aal-e-Imran discusses the family of Prophet Isa, the Battle of Uhud, and emphasizes steadfastness in faith.",
    18: "Al-Kahf (The Cave) contains four major stories: the Sleepers of the Cave, the man with two gardens, Musa and Al-Khidr, and Dhul-Qarnayn. Recommended to recite every Friday.",
    36: "Ya-Sin is called the 'Heart of the Quran.' It discusses resurrection and the signs of Allah in creation.",
    55: "Ar-Rahman is known for its rhythmic refrain 'Which of the favors of your Lord will you deny?' It describes Allah's blessings in this world and the hereafter.",
    67: "Al-Mulk discusses the purpose of creation and the signs of Allah's power. The Prophet ﷺ said it intercedes for its reciter until they are forgiven.",
    112: "Al-Ikhlas is equivalent to one-third of the Quran in meaning. It establishes the absolute oneness of Allah in four concise verses.",
  },
  fr: {
    1: "Al-Fatiha est la première sourate, récitée dans chaque unité de prière. Elle contient la louange d'Allah et une supplication pour la guidance.",
    2: "Al-Baqarah est la plus longue sourate, couvrant les lois, les prophètes et les conseils pour la communauté musulmane.",
    18: "Al-Kahf contient quatre histoires majeures. Sa lecture est recommandée chaque vendredi.",
    36: "Ya-Sin est le 'Cœur du Coran'. Elle traite de la résurrection et des signes d'Allah.",
    55: "Ar-Rahman est connue pour son refrain 'Lequel des bienfaits de votre Seigneur nierez-vous ?'",
    67: "Al-Mulk traite du but de la création et des signes de la puissance d'Allah.",
    112: "Al-Ikhlas équivaut à un tiers du Coran en signification.",
  },
  es: {
    1: "Al-Fatiha es la primera sura, recitada en cada unidad de oración.",
    2: "Al-Baqarah es la sura más larga, que cubre leyes, profetas y guía para la comunidad.",
    18: "Al-Kahf contiene cuatro historias principales. Se recomienda recitarla cada viernes.",
    36: "Ya-Sin es llamada el 'Corazón del Corán'.",
    55: "Ar-Rahman es conocida por su estribillo rítmico.",
    67: "Al-Mulk discute el propósito de la creación.",
    112: "Al-Ikhlas equivale a un tercio del Corán en significado.",
  },
  tr: {
    1: "Fatiha Kur'an'ın ilk suresidir ve her rekatta okunur.",
    2: "Bakara en uzun suredir; yasaları ve geçmiş peygamberlerin kıssalarını kapsar.",
    18: "Kehf dört büyük kıssa içerir. Her cuma okunması tavsiye edilir.",
    36: "Yasin 'Kur'an'ın Kalbi' olarak adlandırılır.",
    55: "Rahman 'Rabbinizin nimetlerinden hangisini yalanlarsınız?' nakaratıyla tanınır.",
    67: "Mülk yaratılışın amacını ve Allah'ın kudretinin işaretlerini tartışır.",
    112: "İhlâs anlam bakımından Kur'an'ın üçte birine denktir.",
  },
  id: {
    1: "Al-Fatihah adalah surah pertama Al-Qur'an dan dibaca di setiap rakaat shalat.",
    2: "Al-Baqarah adalah surah terpanjang, membahas hukum dan kisah para nabi.",
    18: "Al-Kahfi berisi empat kisah utama. Dianjurkan membacanya setiap Jumat.",
    36: "Yasin sering disebut 'Jantung Al-Qur'an'.",
    55: "Ar-Rahman dikenal dengan pengulangan 'Maka nikmat Tuhanmu yang manakah yang kamu dustakan?'",
    67: "Al-Mulk membahas tujuan penciptaan dan tanda-tanda kekuasaan Allah.",
    112: "Al-Ikhlas setara dengan sepertiga Al-Qur'an dalam maknanya.",
  },
  ur: {
    1: "الفاتحہ قرآن کی پہلی سورت ہے اور نماز کی ہر رکعت میں پڑھی جاتی ہے۔",
    2: "البقرہ سب سے لمبی سورت ہے جو احکام اور انبیاء کے قصوں پر مشتمل ہے۔",
    18: "الکہف میں چار بڑے قصے ہیں۔ ہر جمعہ کو پڑھنے کی سفارش کی گئی ہے۔",
    36: "یٰسین کو قرآن کا دل کہا جاتا ہے۔",
    55: "الرحمٰن اپنی ترنم کی وجہ سے مشہور ہے۔",
    67: "الملک تخلیق کے مقصد اور اللہ کی قدرت کی نشانیوں پر بحث کرتی ہے۔",
    112: "الاخلاص معنی کے اعتبار سے قرآن کے ایک تہائی کے برابر ہے۔",
  },
  bn: {
    1: "আল-ফাতিহা কুরআনের প্রথম সূরা এবং প্রতিটি নামাজের রাকাতে পাঠ করা হয়।",
    2: "আল-বাকারা সবচেয়ে দীর্ঘ সূরা, যা আইন ও নবীদের কাহিনী নিয়ে আলোচনা করে।",
    18: "আল-কাহফ চারটি প্রধান কাহিনী ধারণ করে। প্রতি শুক্রবার পাঠ করার পরামর্শ দেওয়া হয়।",
    36: "ইয়াসিনকে 'কুরআনের হৃদয়' বলা হয়।",
    55: "আর-রহমান তার ছন্দময় পুনরাবৃত্তির জন্য পরিচিত।",
    67: "আল-মুলক সৃষ্টির উদ্দেশ্য নিয়ে আলোচনা করে।",
    112: "আল-ইখলাস অর্থের দিক থেকে কুরআনের এক-তৃতীয়াংশের সমান।",
  },
  ru: {
    1: "Аль-Фатиха — первая сура Корана, читаемая в каждом ракаате молитвы.",
    2: "Аль-Бакара — самая длинная сура, охватывающая законы и истории пророков.",
    18: "Аль-Кахф содержит четыре основных сюжета. Рекомендуется читать каждую пятницу.",
    36: "Ясин часто называют «Сердцем Корана».",
    55: "Ар-Рахман известна своим рефреном.",
    67: "Аль-Мульк обсуждает цель творения.",
    112: "Аль-Ихлас по смыслу равна трети Корана.",
  },
  zh: {
    1: "开端章是《古兰经》的第一章，每次礼拜的每一拜中都要诵读。",
    2: "黄牛章是最长的一章，涵盖法律、先知的故事和对穆斯林社区的指导。",
    18: "山洞章包含四个主要故事。建议每周五诵读。",
    36: "雅辛章常被称为《古兰经》的心脏。",
    55: "至仁主章以其反复吟诵而闻名。",
    67: "国权章讨论创造的目的和真主大能的迹象。",
    112: "忠诚章在意义上等同于《古兰经》的三分之一。",
  },
};

function getSurahIntro(n: number, lang: UILanguage): string | undefined {
  return SURAH_INTROS[lang]?.[n] ?? SURAH_INTROS.en[n];
}

export function SurahIntro({ surahNumber, name, nameEn, nameTranslation, verses, revelationType }: SurahIntroProps) {
  const { t, uiLang } = useUILanguage();
  const intro = getSurahIntro(surahNumber, uiLang);

  return (
    <div className="relative mb-6 rounded-2xl overflow-hidden border border-border bg-surface animate-fade-in-up">
      {/* Decorative gradient strip */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, var(--primary), var(--primary-dark))" }} />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Number badge */}
          <div
            className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl text-white text-lg font-extrabold shadow-sm"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))" }}
          >
            {formatNumber(surahNumber, uiLang)}
          </div>

          {/* Names + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h1 className="text-xl font-extrabold leading-tight">{nameEn}</h1>
                <p className="text-sm text-muted">{nameTranslation}</p>
              </div>
              <p className="arabic-text font-bold flex-shrink-0" dir="rtl" style={{ fontSize: "1.6rem", lineHeight: 1.8, color: "var(--primary)" }}>
                {name}
              </p>
            </div>

            {/* Meta pills */}
            <div className="flex items-center flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                style={{ background: "var(--primary-light)", color: "var(--primary)" }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {formatNumber(verses, uiLang)} {t.surah.verses}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                  revelationType === "Meccan"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                }`}
              >
                {revelationType === "Meccan" ? t.search.filterMeccan : t.search.filterMedinan}
              </span>
            </div>
          </div>
        </div>

        {/* Intro text */}
        {intro && (
          <p className="mt-4 pt-4 border-t border-border text-sm text-muted leading-relaxed">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
