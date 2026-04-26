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
    3: "آل عمران تتحدث عن عائلة النبي عيسى عليه السلام وغزوة أحد وتؤكد على الثبات في الإيمان. تدعو إلى وحدة المؤمنين والصبر في الشدائد.",
    4: "النساء تتناول العدالة الاجتماعية وحقوق المرأة وأحكام الميراث وشؤون الأسرة. تؤكد على العدل في معاملة اليتامى والنساء.",
    5: "المائدة تتناول أحكام الطعام وإكمال الدين والعلاقات مع أهل الكتاب. تتضمن قصة المائدة التي نزلت من السماء لحواريي عيسى.",
    18: "الكهف تحتوي على أربع قصص رئيسية: أصحاب الكهف، صاحب الجنتين، موسى والخضر، وذو القرنين. يُستحب قراءتها كل جمعة.",
    36: "يس تُسمى قلب القرآن. تتحدث عن البعث وقصص الرسل السابقين وآيات الله في الخلق. يُستحب قراءتها للمتوفين وللبركة الروحية.",
    55: 'الرحمن تتميز بترديد "فبأي آلاء ربكما تكذبان". تصف نعم الله في الدنيا والآخرة.',
    56: "الواقعة تصف يوم القيامة وتقسم البشر إلى ثلاث فئات. قال النبي ﷺ من قرأها كل ليلة لم تصبه فاقة أبدًا.",
    67: "الملك تتحدث عن الغرض من الخلق وآيات قدرة الله. قال النبي ﷺ إنها تشفع لصاحبها حتى يُغفر له.",
    112: "الإخلاص تعدل ثلث القرآن في المعنى. تُثبت وحدانية الله المطلقة في أربع آيات.",
    113: "الفلق إحدى المعوذتين. يُستعاذ فيها بالله من الشرور الخارجية.",
    114: "الناس هي آخر سورة في القرآن والثانية من المعوذتين. يُستعاذ فيها من الوسواس الخناس.",
  },
  en: {
    1: "Al-Fatiha (The Opening) is the first surah of the Quran and is recited in every unit of prayer. It is a comprehensive summary of the entire Quran, containing praise of Allah, acknowledgment of His sovereignty, and a supplication for guidance.",
    2: "Al-Baqarah (The Cow) is the longest surah, covering laws, stories of past prophets, and guidance for the Muslim community. It includes Ayat al-Kursi (2:255), one of the most revered verses, and concludes with powerful supplications.",
    3: "Aal-e-Imran (The Family of Imran) discusses the family of Prophet Isa (Jesus), the Battle of Uhud, and emphasizes steadfastness in faith. It calls for unity among believers and patience in adversity.",
    4: "An-Nisa (The Women) addresses social justice, women's rights, inheritance laws, and family matters. It emphasizes fair treatment of orphans and women, and establishes legal frameworks for the Muslim community.",
    5: "Al-Ma'idah (The Table Spread) covers dietary laws, the completion of religion, and relations with People of the Book. It includes the story of the table spread from heaven for the disciples of Isa.",
    18: "Al-Kahf (The Cave) contains four major stories: the Sleepers of the Cave, the man with two gardens, Musa and Al-Khidr, and Dhul-Qarnayn. It is recommended to recite every Friday.",
    36: "Ya-Sin is often called the 'Heart of the Quran.' It discusses resurrection, the stories of past messengers, and signs of Allah in creation. It is commonly recited for the deceased and for spiritual blessings.",
    55: "Ar-Rahman (The Most Merciful) is known for its rhythmic refrain 'Which of the favors of your Lord will you deny?' It describes the blessings of Allah in this world and the hereafter.",
    56: "Al-Waqi'ah (The Event) describes the Day of Judgment and divides humanity into three groups. The Prophet \uFDFA said whoever recites it every night will never be afflicted by poverty.",
    67: "Al-Mulk (The Sovereignty) discusses the purpose of creation and the signs of Allah's power. The Prophet \uFDFA said it intercedes for its reciter until they are forgiven.",
    112: "Al-Ikhlas (The Sincerity) is equivalent to one-third of the Quran in meaning. It establishes the absolute oneness of Allah in four concise verses.",
    113: "Al-Falaq (The Daybreak) is one of the two 'protection surahs' (al-Mu'awwidhatayn). It seeks refuge in Allah from external evils.",
    114: "An-Nas (Mankind) is the final surah and the second of the protection surahs. It seeks refuge from the whisperer who retreats — the devil who whispers evil into hearts.",
  },
  fr: {
    1: "Al-Fatiha (L'Ouverture) est la première sourate du Coran, récitée dans chaque unité de prière. C'est un résumé complet du Coran, contenant la louange d'Allah, la reconnaissance de Sa souveraineté et une supplication pour la guidance.",
    2: "Al-Baqarah (La Vache) est la plus longue sourate, couvrant les lois, les histoires des prophètes et les conseils pour la communauté musulmane. Elle inclut Ayat al-Kursi (2:255), l'un des versets les plus vénérés.",
    3: "Aal-e-Imran (La Famille d'Imran) traite de la famille du Prophète Issa (Jésus), de la bataille d'Uhud et souligne la fermeté dans la foi.",
    4: "An-Nisa (Les Femmes) aborde la justice sociale, les droits des femmes, les lois sur l'héritage et les affaires familiales.",
    5: "Al-Ma'idah (La Table Servie) couvre les lois alimentaires, l'achèvement de la religion et les relations avec les Gens du Livre.",
    18: "Al-Kahf (La Caverne) contient quatre histoires majeures : les Dormants de la Caverne, l'homme aux deux jardins, Moussa et Al-Khidr, et Dhul-Qarnayn. Sa lecture est recommandée chaque vendredi.",
    36: "Ya-Sin est souvent appelée le « Cœur du Coran ». Elle traite de la résurrection et des signes d'Allah dans la création.",
    55: "Ar-Rahman (Le Tout Miséricordieux) est connue pour son refrain « Lequel des bienfaits de votre Seigneur nierez-vous ? »",
    56: "Al-Waqi'ah (L'Événement) décrit le Jour du Jugement et divise l'humanité en trois groupes.",
    67: "Al-Mulk (La Royauté) traite du but de la création et des signes de la puissance d'Allah.",
    112: "Al-Ikhlas (Le Monothéisme Pur) équivaut à un tiers du Coran en signification. Elle établit l'unicité absolue d'Allah.",
    113: "Al-Falaq (L'Aube Naissante) est l'une des deux sourates de protection. Elle cherche refuge auprès d'Allah contre les maux extérieurs.",
    114: "An-Nas (Les Hommes) est la dernière sourate et la seconde des sourates de protection.",
  },
  es: {
    1: "Al-Fatiha (La Apertura) es la primera sura del Corán y se recita en cada unidad de oración. Es un resumen completo del Corán, que contiene la alabanza a Allah, el reconocimiento de Su soberanía y una súplica por la guía.",
    2: "Al-Baqarah (La Vaca) es la sura más larga, que cubre leyes, historias de profetas anteriores y guía para la comunidad musulmana. Incluye el Ayat al-Kursi (2:255), uno de los versículos más venerados.",
    3: "Aal-e-Imran (La Familia de Imrán) discute la familia del Profeta Isa (Jesús), la Batalla de Uhud y enfatiza la firmeza en la fe.",
    4: "An-Nisa (Las Mujeres) aborda la justicia social, los derechos de la mujer, las leyes de herencia y los asuntos familiares.",
    5: "Al-Ma'idah (La Mesa Servida) cubre las leyes alimentarias, la culminación de la religión y las relaciones con la Gente del Libro.",
    18: "Al-Kahf (La Caverna) contiene cuatro historias principales: los Durmientes de la Caverna, el hombre de los dos jardines, Musa y Al-Khidr, y Dhul-Qarnayn. Se recomienda recitarla cada viernes.",
    36: "Ya-Sin es llamada frecuentemente el 'Corazón del Corán'. Trata sobre la resurrección y las señales de Allah en la creación.",
    55: "Ar-Rahman (El Misericordioso) es conocida por su estribillo rítmico '¿Cuál de las mercedes de vuestro Señor negaréis?'",
    56: "Al-Waqi'ah (El Acontecimiento) describe el Día del Juicio y divide a la humanidad en tres grupos.",
    67: "Al-Mulk (La Soberanía) discute el propósito de la creación y las señales del poder de Allah.",
    112: "Al-Ikhlas (La Sinceridad) equivale a un tercio del Corán en significado. Establece la unicidad absoluta de Allah.",
    113: "Al-Falaq (El Amanecer) es una de las dos suras de protección. Busca refugio en Allah contra los males externos.",
    114: "An-Nas (La Humanidad) es la última sura y la segunda de las suras de protección.",
  },
  tr: {
    1: "Fatiha (Açılış) Kur'an'ın ilk suresidir ve her rekatta okunur. Kur'an'ın kapsamlı bir özetidir; Allah'a hamd, O'nun egemenliğinin kabulü ve hidayet duası içerir.",
    2: "Bakara (İnek) en uzun suredir; yasaları, geçmiş peygamberlerin kıssalarını ve Müslüman topluma rehberliği kapsar. Ayetü'l-Kürsi (2:255) en saygın ayetlerden biridir.",
    3: "Âl-i İmrân, Hz. İsa'nın ailesi, Uhud Savaşı ve imanda sebat konularını ele alır.",
    4: "Nisâ (Kadınlar), sosyal adalet, kadın hakları, miras hukuku ve aile konularını ele alır.",
    5: "Mâide (Sofra), yiyecek kuralları, dinin tamamlanması ve Ehl-i Kitap ile ilişkileri kapsar.",
    18: "Kehf (Mağara) dört büyük kıssa içerir: Ashab-ı Kehf, iki bahçe sahibi, Musa ve Hızır, Zülkarneyn. Her cuma okunması tavsiye edilir.",
    36: "Yasin, 'Kur'an'ın Kalbi' olarak adlandırılır. Diriliş ve Allah'ın yaratılıştaki işaretlerini anlatır.",
    55: "Rahman, 'Rabbinizin nimetlerinden hangisini yalanlarsınız?' nakaratıyla tanınır.",
    56: "Vâkıa, Kıyamet Günü'nü anlatır ve insanlığı üç gruba ayırır.",
    67: "Mülk, yaratılışın amacını ve Allah'ın kudretinin işaretlerini tartışır.",
    112: "İhlâs, anlam bakımından Kur'an'ın üçte birine denktir. Dört ayette Allah'ın mutlak birliğini ortaya koyar.",
    113: "Felak, iki koruma suresinden biridir. Dış kötülüklerden Allah'a sığınmayı öğretir.",
    114: "Nâs, Kur'an'ın son suresidir ve ikinci koruma suresidir.",
  },
  id: {
    1: "Al-Fatihah (Pembukaan) adalah surah pertama Al-Qur'an dan dibaca di setiap rakaat shalat. Ini adalah ringkasan lengkap Al-Qur'an yang berisi pujian kepada Allah, pengakuan kekuasaan-Nya, dan doa memohon petunjuk.",
    2: "Al-Baqarah (Sapi) adalah surah terpanjang, membahas hukum, kisah para nabi terdahulu, dan petunjuk bagi umat Islam. Termasuk Ayat Kursi (2:255), salah satu ayat yang paling dihormati.",
    3: "Ali Imran membahas keluarga Nabi Isa, Perang Uhud, dan menekankan keteguhan iman.",
    4: "An-Nisa (Wanita) membahas keadilan sosial, hak-hak perempuan, hukum waris, dan urusan keluarga.",
    5: "Al-Ma'idah (Hidangan) membahas hukum makanan, penyempurnaan agama, dan hubungan dengan Ahli Kitab.",
    18: "Al-Kahfi (Gua) berisi empat kisah utama: Ashabul Kahfi, pemilik dua kebun, Musa dan Khidir, dan Dzulqarnain. Dianjurkan membacanya setiap Jumat.",
    36: "Yasin sering disebut 'Jantung Al-Qur'an'. Membahas kebangkitan dan tanda-tanda Allah dalam penciptaan.",
    55: "Ar-Rahman dikenal dengan pengulangan 'Maka nikmat Tuhanmu yang manakah yang kamu dustakan?'",
    56: "Al-Waqi'ah menggambarkan Hari Kiamat dan membagi umat manusia menjadi tiga golongan.",
    67: "Al-Mulk membahas tujuan penciptaan dan tanda-tanda kekuasaan Allah.",
    112: "Al-Ikhlas setara dengan sepertiga Al-Qur'an dalam maknanya. Menetapkan keesaan mutlak Allah.",
    113: "Al-Falaq adalah salah satu dari dua surah perlindungan. Memohon perlindungan Allah dari kejahatan luar.",
    114: "An-Nas adalah surah terakhir dan surah perlindungan kedua.",
  },
  ur: {
    1: "الفاتحہ قرآن کی پہلی سورت ہے اور نماز کی ہر رکعت میں پڑھی جاتی ہے۔ یہ پورے قرآن کا جامع خلاصہ ہے جس میں اللہ کی حمد، اس کی حاکمیت کا اعتراف اور ہدایت کی دعا شامل ہے۔",
    2: "البقرہ سب سے لمبی سورت ہے جو احکام، گزشتہ انبیاء کے قصے اور مسلم امت کی رہنمائی پر مشتمل ہے۔ اس میں آیت الکرسی (2:255) شامل ہے جو سب سے عظیم آیات میں سے ایک ہے۔",
    3: "آل عمران حضرت عیسیٰ کے خاندان، غزوہ احد اور ایمان میں استقامت کے بارے میں بات کرتی ہے۔",
    4: "النساء سماجی انصاف، خواتین کے حقوق، وراثت کے قوانین اور خاندانی معاملات پر بحث کرتی ہے۔",
    5: "المائدہ غذائی احکام، دین کی تکمیل اور اہل کتاب سے تعلقات کا احاطہ کرتی ہے۔",
    18: "الکہف میں چار بڑے قصے ہیں: اصحاب کہف، دو باغوں کا مالک، موسیٰ اور خضر، اور ذوالقرنین۔ ہر جمعہ کو پڑھنے کی سفارش کی گئی ہے۔",
    36: "یٰسین کو قرآن کا دل کہا جاتا ہے۔ یہ قیامت اور تخلیق میں اللہ کی نشانیوں کے بارے میں بات کرتی ہے۔",
    55: "الرحمٰن اپنی ترنم کی وجہ سے مشہور ہے 'پس تم اپنے رب کی کون کون سی نعمت جھٹلاؤ گے؟'",
    56: "الواقعہ قیامت کے دن کو بیان کرتی ہے اور انسانیت کو تین گروہوں میں تقسیم کرتی ہے۔",
    67: "الملک تخلیق کے مقصد اور اللہ کی قدرت کی نشانیوں پر بحث کرتی ہے۔",
    112: "الاخلاص معنی کے اعتبار سے قرآن کے ایک تہائی کے برابر ہے۔ چار آیات میں اللہ کی مطلق وحدانیت ثابت کرتی ہے۔",
    113: "الفلق دو حفاظتی سورتوں میں سے ایک ہے۔ بیرونی برائیوں سے اللہ کی پناہ مانگتی ہے۔",
    114: "الناس قرآن کی آخری سورت اور دوسری حفاظتی سورت ہے۔",
  },
  bn: {
    1: "আল-ফাতিহা (সূচনা) কুরআনের প্রথম সূরা এবং প্রতিটি নামাজের রাকাতে পাঠ করা হয়। এটি সমগ্র কুরআনের একটি ব্যাপক সারসংক্ষেপ, যাতে আল্লাহর প্রশংসা, তাঁর সার্বভৌমত্বের স্বীকৃতি এবং হেদায়েতের দোয়া রয়েছে।",
    2: "আল-বাকারা (গাভী) সবচেয়ে দীর্ঘ সূরা, যা আইন, পূর্ববর্তী নবীদের কাহিনী এবং মুসলিম সম্প্রদায়ের জন্য নির্দেশনা নিয়ে আলোচনা করে। এতে আয়াতুল কুরসি (২:২৫৫) রয়েছে।",
    3: "আলে ইমরান নবী ঈসার পরিবার, উহুদের যুদ্ধ এবং ঈমানে অবিচলতার উপর জোর দেয়।",
    4: "আন-নিসা (নারী) সামাজিক ন্যায়বিচার, নারীর অধিকার, উত্তরাধিকার আইন এবং পারিবারিক বিষয় নিয়ে আলোচনা করে।",
    5: "আল-মায়িদা (খাদ্য পরিবেশিত টেবিল) খাদ্য আইন, ধর্মের পূর্ণতা এবং আহলে কিতাবের সাথে সম্পর্ক নিয়ে আলোচনা করে।",
    18: "আল-কাহফ (গুহা) চারটি প্রধান কাহিনী ধারণ করে: গুহাবাসী, দুই বাগানের মালিক, মুসা ও খিজির, এবং জুলকারনাইন। প্রতি শুক্রবার পাঠ করার পরামর্শ দেওয়া হয়।",
    36: "ইয়াসিনকে 'কুরআনের হৃদয়' বলা হয়। এটি পুনরুত্থান এবং সৃষ্টিতে আল্লাহর নিদর্শন নিয়ে আলোচনা করে।",
    55: "আর-রহমান তার ছন্দময় পুনরাবৃত্তি 'তোমাদের প্রতিপালকের কোন নিয়ামতকে তোমরা অস্বীকার করবে?' এর জন্য পরিচিত।",
    56: "আল-ওয়াকিয়া বিচার দিবসের বর্ণনা দেয় এবং মানবজাতিকে তিন দলে ভাগ করে।",
    67: "আল-মুলক সৃষ্টির উদ্দেশ্য এবং আল্লাহর ক্ষমতার নিদর্শন নিয়ে আলোচনা করে।",
    112: "আল-ইখলাস অর্থের দিক থেকে কুরআনের এক-তৃতীয়াংশের সমান। চারটি আয়াতে আল্লাহর পরম একত্ব প্রতিষ্ঠা করে।",
    113: "আল-ফালাক দুটি সুরক্ষা সূরার একটি। বাহ্যিক অমঙ্গল থেকে আল্লাহর আশ্রয় চায়।",
    114: "আন-নাস কুরআনের শেষ সূরা এবং দ্বিতীয় সুরক্ষা সূরা।",
  },
  ru: {
    1: "Аль-Фатиха (Открывающая) — первая сура Корана, читаемая в каждом ракаате молитвы. Это всеобъемлющее резюме всего Корана, содержащее хвалу Аллаху, признание Его власти и мольбу о руководстве.",
    2: "Аль-Бакара (Корова) — самая длинная сура, охватывающая законы, истории прошлых пророков и наставления для мусульманской общины. Включает Аят аль-Курси (2:255), один из самых почитаемых аятов.",
    3: "Аль Имран обсуждает семью пророка Исы (Иисуса), битву при Ухуде и подчёркивает стойкость в вере.",
    4: "Ан-Ниса (Женщины) рассматривает социальную справедливость, права женщин, законы наследования и семейные дела.",
    5: "Аль-Маида (Трапеза) охватывает законы о пище, завершение религии и отношения с людьми Писания.",
    18: "Аль-Кахф (Пещера) содержит четыре основных сюжета: спящие в пещере, владелец двух садов, Муса и Хидр, Зуль-Карнайн. Рекомендуется читать каждую пятницу.",
    36: "Ясин часто называют «Сердцем Корана». Она обсуждает воскресение и знамения Аллаха в творении.",
    55: "Ар-Рахман известна рефреном «Какое же из благодеяний Господа вашего вы сочтёте ложным?»",
    56: "Аль-Вакиа описывает Судный День и делит человечество на три группы.",
    67: "Аль-Мульк обсуждает цель творения и знамения могущества Аллаха.",
    112: "Аль-Ихлас по смыслу равна трети Корана. В четырёх аятах утверждает абсолютное единство Аллаха.",
    113: "Аль-Фаляк — одна из двух защитных сур. Просит защиты Аллаха от внешнего зла.",
    114: "Ан-Нас — последняя сура Корана и вторая из защитных сур.",
  },
  zh: {
    1: "开端章是《古兰经》的第一章，每次礼拜的每一拜中都要诵读。它是整部《古兰经》的综合概要，包含对真主的赞美、对其主权的承认和祈求引导的祷告。",
    2: "黄牛章是最长的一章，涵盖法律、先知的故事和对穆斯林社区的指导。其中包括宝座经文（2:255），是最受尊崇的经文之一。",
    3: "仪姆兰的家属章讨论了先知尔萨（耶稣）的家族、吴侯德战役，并强调信仰的坚定。",
    4: "妇女章论述社会正义、妇女权利、继承法和家庭事务。",
    5: "筵席章涵盖饮食法规、宗教的完善以及与有经人的关系。",
    18: "山洞章包含四个主要故事：山洞中的青年、拥有两个花园的人、穆萨与赫德尔、以及祖勒盖尔奈英。建议每周五诵读。",
    36: "雅辛章常被称为《古兰经》的心脏。讨论复活和真主在创造中的迹象。",
    55: "至仁主章以其'你们究竟否认你们主的哪一件恩典呢？'的反复吟诵而闻名。",
    56: "大事章描述审判日并将人类分为三组。",
    67: "国权章讨论创造的目的和真主大能的迹象。",
    112: "忠诚章在意义上等同于《古兰经》的三分之一。以四节经文确立真主的绝对独一。",
    113: "曙光章是两个求护章之一。向真主寻求庇护免受外在邪恶。",
    114: "世人章是《古兰经》的最后一章，也是第二个求护章。",
  },
};

function getSurahIntro(surahNumber: number, uiLang: UILanguage): string | undefined {
  return SURAH_INTROS[uiLang]?.[surahNumber] ?? SURAH_INTROS.en[surahNumber];
}

export function SurahIntro({
  surahNumber,
  name,
  nameEn,
  nameTranslation,
  verses,
  revelationType,
}: SurahIntroProps) {
  const { t, uiLang } = useUILanguage();
  const intro = getSurahIntro(surahNumber, uiLang);

  return (
    <div className="relative mb-6 p-5 rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/5" />
      <div className="relative flex items-center gap-4 mb-3">
        <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light text-primary text-2xl font-bold">
          {formatNumber(surahNumber, uiLang)}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">{nameEn}</h2>
            <span className="arabic-text text-lg" dir="rtl">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted mt-0.5">
            <span>{nameTranslation}</span>
            <span>·</span>
            <span>
              {formatNumber(verses, uiLang)} {t.surah.verses}
            </span>
            <span>·</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                revelationType === "Meccan"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                  : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
              }`}
            >
              {revelationType === "Meccan" ? t.search.filterMeccan : t.search.filterMedinan}
            </span>
          </div>
        </div>
      </div>
      {intro && (
        <p className="text-sm text-muted leading-relaxed border-t border-border pt-4">{intro}</p>
      )}
    </div>
  );
}
