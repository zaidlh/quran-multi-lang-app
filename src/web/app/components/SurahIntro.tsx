interface SurahIntroProps {
  surahNumber: number;
  name: string;
  nameEn: string;
  nameTranslation: string;
  verses: number;
  revelationType: string;
}

const SURAH_INTROS: Record<number, string> = {
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
};

export function SurahIntro({
  surahNumber,
  name,
  nameEn,
  nameTranslation,
  verses,
  revelationType,
}: SurahIntroProps) {
  const intro = SURAH_INTROS[surahNumber];

  return (
    <div className="relative mb-6 p-5 rounded-2xl bg-surface border border-border overflow-hidden">
      <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/5" />
      <div className="relative flex items-center gap-4 mb-3">
        <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light text-primary text-2xl font-bold">
          {surahNumber}
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
            <span>{verses} verses</span>
            <span>·</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                revelationType === "Meccan"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                  : "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
              }`}
            >
              {revelationType}
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
