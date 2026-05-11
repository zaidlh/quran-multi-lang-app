// Dua types
export interface Dua {
  id: string;
  title: string;
  category: DuaCategory;
  arabic: string;
  translation: string;
  transliteration?: string;
  reference?: string;
  audio?: string;
}

export type DuaCategory = 
  | "forgiveness"
  | "rizq"
  | "anxiety"
  | "protection"
  | "gratitude"
  | "illness"
  | "travel"
  | "family"
  | "rain"
  | "general";

// Curated duas from the Quran and authentic sources
export const DUA_DATA: Dua[] = [
  // Forgiveness
  {
    id: "forgiveness-1",
    title: "Astaghfirullah - Seeking Forgiveness",
    category: "forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ",
    translation: "I seek forgiveness from Allah, my Lord, from every sin, and I turn to Him in repentance.",
    transliteration: "Astaghfirullah Rabbi min kulli dambin wa atubu ilayhi.",
    reference: "Surah An-Nisa 4:110",
  },
  {
    id: "forgiveness-2",
    title: "Sayyid al-Istighfar",
    category: "forgiveness",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
    translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your servant, following Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me and I acknowledge my sin. So forgive me, for surely none forgives sins but You.",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana abduka wa ana ala ahdika wa wa'dika ma astata'tu a'udhu bika min sharri ma san'at'u. Abuu laka bi ni'matika alayya wa abuu bi dhanbi faghfir li fa innahu la yaghfiru adh-dhunuba illa anta.",
    reference: "Sahih al-Bukhari 6323",
  },
  // Rizq (Provisions)
  {
    id: "rizq-1",
    title: "Dua for Provision",
    category: "rizq",
    arabic: "اللَّهُمَّ ارْزُقْنِي وَارْزُقْ عَالِيتِي",
    translation: "O Allah, provide for me and for my family.",
    transliteration: "Allahumma arzuqni wa arzuq 'aliyyati.",
    reference: "Sunan Ibn Majah 1845",
  },
  {
    id: "rizq-2",
    title: "Rabbish Rahli Rizqan",
    category: "rizq",
    arabic: "رَّبِّ ارْزُقْنِي وَارْزُقْنِي مِنْ لَدُنْكَ رِزْقًا حَسَنًا",
    translation: "My Lord, provide for me and grant me a good provision from You.",
    transliteration: "Rabbi arzuni wa arzuni min ladunka rizqan hasanan.",
    reference: "Surah Al-Kahf 18:10",
  },
  // Anxiety/Worry
  {
    id: "anxiety-1",
    title: "Dua for Anxiety",
    category: "anxiety",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    translation: "O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from cowardice and miserliness, from being overwhelmed by debt and from being overpowered by men.",
    transliteration: "Allahumma inni a'udhu bika mina al-hammi wal-huzni wa a'udhu bika mina al-'ajzi wal-kasali wa a'udhu bika mina al-jubni wal-bukhli wa a'udhu bika min ghalabati ad-dayni wa qahri ar-rijali.",
    reference: "Sunan Abi Dawud 1555",
  },
  {
    id: "anxiety-2",
    title: "La Hawla wa La Quwwata",
    category: "anxiety",
    arabic: "لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    translation: "There is no power and no strength except with Allah.",
    transliteration: "La hawla wa la quwwata illa billah.",
    reference: "Various",
  },
  // Protection
  {
    id: "protection-1",
    title: "A'udhu bi Kalimatillah",
    category: "protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    transliteration: "A'udhu bi kalimatillah at-tammati min sharri ma khalaq.",
    reference: "Sahih Muslim 4884",
  },
  {
    id: "protection-2",
    title: "Mubarak Morning Protection",
    category: "protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ اللَّاتِي لاَ يُجَاوِزُهُنَّ بَرٌّ وَلاَ فَاجِرٌ",
    translation: "I seek refuge in the perfect words of Allah which neither the righteous nor the sinner can transgress.",
    transliteration: "A'udhu bi kalimatillah at-tammati allati la yujawizuhunna barrun wa la fajir.",
    reference: "Sahih al-Bukhari 6376",
  },
  // Gratitude
  {
    id: "gratitude-1",
    title: "Alhamdu lillah",
    category: "gratitude",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "Praise be to Allah, the Lord of the worlds.",
    transliteration: "Alhamdu lillahi rabbil-'alamin.",
    reference: "Surah Al-Fatiha 1:2",
  },
  {
    id: "gratitude-2",
    title: "Shukr for Health",
    category: "gratitude",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَنْعَمَ عَلَيَّ بِهَذَا النِّعْمَةِ وَكَثِيرٌ مِمَّا لَيْسَ لَهُ",
    translation: "Praise be to Allah who has blessed me with this blessing and many blessings which I cannot count.",
    transliteration: "Alhamdu lilladhi an'ama alayya bihaza ni'mati wa kathirun mimma laysa lahu.",
    reference: "Sahih al-Bukhari",
  },
  // Illness
  {
    id: "illness-1",
    title: "Dua for Illness",
    category: "illness",
    arabic: "اللَّهُمَّ اشْفِني وَاشْفِ كُلَّ مَرِيضٍ",
    translation: "O Allah, cure me and cure every sick person.",
    transliteration: "Allahummashfini wa shfi kulla maridin.",
    reference: "Sahih al-Bukhari 5675",
  },
  {
    id: "illness-2",
    title: "Abu Bakr's Dua for Illness",
    category: "illness",
    arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ شِفَاءً لاَ يُغَادِرُ سَقَمًا",
    translation: "O Allah, Lord of mankind, remove the affliction and grant healing. You are the Healer. There is no healing except Your healing, that leaves no sickness.",
    transliteration: "Allahumma rabban-nas adhhibil-ba's wa-ashfi antash-shafi la shifa'a illa shifa'uka shifa'an la yughadiru saqaman.",
    reference: "Sahih al-Bukhari 5673",
  },
  // Travel
  {
    id: "travel-1",
    title: "Dua when Traveling",
    category: "travel",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبَرَّ وَالْبَحْرَ وَالْجِبَالَ وَالْوَادِيَنَّ وَأَعُوذُ بِكَ مِنْ شَرِّ الدَّوَاهِبِ",
    translation: "O Allah, we ask You for safety in this journey by land and sea, in the mountains and valleys, and I seek refuge in You from the dangers that befall.",
    transliteration: "Allahumma inna nas'aluka fi safarina hathal-barri wal-bahri wal-jibali wal-wadiyana wa a'udhu bika min sharri ad-dawahib.",
    reference: "Sunan Abi Dawud 2600",
  },
  {
    id: "travel-2",
    title: "Dua of Musa for Travel",
    category: "travel",
    arabic: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ",
    translation: "My Lord, indeed I am, for whatever good You have sent down to me, in need.",
    transliteration: "Rabbi inni lima anzalta ilayya min khayrin faqir.",
    reference: "Surah Al-Qasas 28:24",
  },
  // Family
  {
    id: "family-1",
    title: "Dua for Family",
    category: "family",
    arabic: "اللَّهُمَّ بَارِكْ لِي فِي أَهْلِي وَمَالِي",
    translation: "O Allah, bless me in my family and my wealth.",
    transliteration: "Allahumma barik li fi ahli wa mali.",
    reference: "Sunan Ibn Majah 1893",
  },
  {
    id: "family-2",
    title: "Dua for Children",
    category: "family",
    arabic: "اللَّهُمَّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
    translation: "O Allah, grant me from Yourself a good offspring. Indeed, You are the Hearing of supplication.",
    transliteration: "Allahumma hab li min ladunka dhurriyyatan tayyibatan innaka sam'i ad-du'a.",
    reference: "Surah Al-Imran 3:38",
  },
  // Rain
  {
    id: "rain-1",
    title: "Dua for Rain",
    category: "rain",
    arabic: "اللَّهُمَّ اسْقِنَا غَيْثًا مُغِيثًا مَرِيئًا نَافِعًا عَامًّا",
    translation: "O Allah, give us rain that is helpful, refreshing, beneficial, and widespread.",
    transliteration: "Allahummasqina ghaythan mughithan mari'an nafi'an 'ammam.",
    reference: "Sunan Abi Dawud 1169",
  },
  // General
  {
    id: "general-1",
    title: "Rabana Atina",
    category: "general",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhab an-nar.",
    reference: "Surah Al-Baqarah 2:201",
  },
  {
    id: "general-2",
    title: "HasbiyAllah",
    category: "general",
    arabic: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    translation: "Allah is sufficient for me. There is no god but Him. I have put my trust in Him, and He is the Lord of the Great Throne.",
    transliteration: "Hasbiy Allahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'azim.",
    reference: "Surah At-Tawbah 9:129",
  },
];

// Get duas by category
export function getDuasByCategory(category: DuaCategory): Dua[] {
  return DUA_DATA.filter((dua) => dua.category === category);
}

// Get dua by ID
export function getDuaById(id: string): Dua | undefined {
  return DUA_DATA.find((dua) => dua.id === id);
}

// Search duas
export function searchDuas(query: string): Dua[] {
  const q = query.toLowerCase();
  return DUA_DATA.filter(
    (dua) =>
      dua.arabic.includes(q) ||
      dua.translation.toLowerCase().includes(q) ||
      dua.title.toLowerCase().includes(q)
  );
}

// Get all categories
export function getDuaCategories(): { id: DuaCategory; name: string; count: number }[] {
  const categories: { id: DuaCategory; name: string }[] = [
    { id: "forgiveness", name: "Forgiveness" },
    { id: "rizq", name: "Provisions (Rizq)" },
    { id: "anxiety", name: "Anxiety & Worry" },
    { id: "protection", name: "Protection" },
    { id: "gratitude", name: "Gratitude" },
    { id: "illness", name: "Illness" },
    { id: "travel", name: "Travel" },
    { id: "family", name: "Family" },
    { id: "rain", name: "Rain" },
    { id: "general", name: "General" },
  ];
  
  return categories.map((c) => ({
    ...c,
    count: getDuasByCategory(c.id).length,
  }));
}