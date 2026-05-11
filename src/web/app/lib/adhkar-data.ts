// Adhkar types and data
export interface Adhkar {
  id: string;
  category: AdhkarCategory;
  arabic: string;
  translation: string;
  transliteration?: string;
  repeat: number;
  reference?: string;
  audio?: string;
}

export type AdhkarCategory = 
  | "morning"
  | "evening"
  | "sleep"
  | "prayer"
  | "travel"
  | "anxiety"
  | "ramadan"
  | "general"
  | "tasbih";

// Hisnul Muslim categorized adhkar (curated from public sources)
export const ADHKAR_DATA: Adhkar[] = [
  // Morning Adhkar
  {
    id: "morning-1",
    category: "morning",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "We have reached the morning and all sovereignty belongs to Allah. Praise be to Allah. There is no god but Allah alone, without partner. To Him belongs sovereignty and praise, and He is over all things competent.",
    transliteration: "Asbahna wa asbalhal-mulku lillah wal-hamdu lillah la ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli shayin qadir.",
    repeat: 1,
    reference: "Sahih Muslim 2723",
  },
  {
    id: "morning-2",
    category: "morning",
    arabic: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهَدُكَ وَأَشْهَدُ مَلَائِكَتَكَ وَحَمَلَةَ عَرْشِكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنتَ وَحْدَكَ لاَ شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
    translation: "O Allah, I have entered the morning and bear witness to You, to Your angels, to those who carry Your Throne, and to all Your creation that You are Allah, there is no god but You alone, without partner, and that Muhammad is Your servant and Messenger.",
    transliteration: "Allahumma inni asbahtu ashhaduka wa ashhadu malaikataka wa hamalata arshika wa jami'a khalqika anka antallah la ilaha illa anta wahdaka la sharika lak wa anna Muhammadan abdika wa rasuluk.",
    repeat: 4,
    reference: "Sahih al-Bukhari 6312",
  },
  {
    id: "morning-3",
    category: "morning",
    arabic: "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    translation: "Allah is sufficient for me. There is no god but Him. I have put my trust in Him, and He is the Lord of the Great Throne.",
    transliteration: "Hasbiyallah la ilaha illa huwa alayhi tawakkaltu wa huwa rabbul-arshil-azim.",
    repeat: 7,
    reference: "Sahih al-Bukhari 4576",
  },
  // Evening Adhkar
  {
    id: "evening-1",
    category: "evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "We have reached the evening and all sovereignty belongs to Allah. Praise be to Allah. There is no god but Allah alone, without partner. To Him belongs sovereignty and praise, and He is over all things competent.",
    transliteration: "Amsayna wa amsal-mulku lillah wal-hamdu lillah la ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli shayin qadir.",
    repeat: 1,
    reference: "Sahih Muslim 2723",
  },
  {
    id: "evening-2",
    category: "evening",
    arabic: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهَدُكَ وَأَشْهَدُ مَلَائِكَتَكَ وَحَمَلَةَ عَرْشِكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنتَ وَحْدَكَ لاَ شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
    translation: "O Allah, I have entered the evening and bear witness to You, to Your angels, to those who carry Your Throne, and to all Your creation that You are Allah, there is no god but You alone, without partner, and that Muhammad is Your servant and Messenger.",
    transliteration: "Allahumma inni amsaytu ashhaduka wa ashhadu malaikataka wa hamalata arshika wa jami'a khalqika anka antallah la ilaha illa anta wahdaka la sharika lak wa anna Muhammadan abdika wa rasuluk.",
    repeat: 4,
    reference: "Sahih al-Bukhari 6313",
  },
  // Sleep Adhkar
  {
    id: "sleep-1",
    category: "sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَموتُ وَأَحْيَا",
    translation: "In Your name, O Allah, I die and I live.",
    transliteration: "Bismik Allahumma amutu wa ahya.",
    repeat: 1,
    reference: "Sahih al-Bukhari 6324",
  },
  {
    id: "sleep-2",
    category: "sleep",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    translation: "O Allah, protect me from Your punishment on the day You resurrect Your servants.",
    transliteration: "Allahumma qini azabaka yawma tab'ath ibadak.",
    repeat: 3,
    reference: "Sunan Abi Dawud 5042",
  },
  {
    id: "sleep-3",
    category: "sleep",
    arabic: "بِسْمِ اللَّهِ تَرَكْتُ ظَهْرِي لِلشَّيْطَانِ وَبِسْمِ اللَّهِ وَجَّهْتُ وَجْهِي لِلَّهِ",
    translation: "In the name of Allah, I leave my back to Satan, and in the name of Allah, I turn my face to Allah.",
    transliteration: "Bismillah taraktu zahri lishshaytani wa bismillahi wajjahtu wajhi lillah.",
    repeat: 1,
    reference: "Sahih al-Bukhari 6321",
  },
  // Prayer Adhkar
  {
    id: "prayer-1",
    category: "prayer",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلاَ إِلَهَ غَيْرُكَ",
    translation: "Glory be to You, O Allah, and praise. Blessed is Your Name, Exalted is Your Majesty, and there is no god but You.",
    transliteration: "Subhanak Allahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk.",
    repeat: 1,
    reference: "Jami' al-Tirmidhi 3561",
  },
  {
    id: "prayer-2",
    category: "prayer",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    translation: "My Lord, increase me in knowledge.",
    transliteration: "Rabbi zidni ilman.",
    repeat: 100,
    reference: "Sahih al-Bukhari 9980",
  },
  // General Adhkar
  {
    id: "general-1",
    category: "general",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَاللَّهُ أَكْبَرُ",
    translation: "Glory be to Allah, praise be to Allah, and Allah is the Greatest.",
    transliteration: "Subhanallah wal-hamdu lillah wallahu akbar.",
    repeat: 33,
    reference: "Sahih al-Bukhari 6406",
  },
  {
    id: "general-2",
    category: "general",
    arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "There is no god but Allah alone, without partner. To Him belongs sovereignty and praise, and He is over all things competent.",
    transliteration: "La ilaha illallah wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ala kulli shayin qadir.",
    repeat: 100,
    reference: "Sahih al-Bukhari 6406",
  },
  // Tasbih
  {
    id: "tasbih-1",
    category: "tasbih",
    arabic: "سُبْحَانَ اللَّهِ",
    translation: "Glory be to Allah",
    transliteration: "SubhanAllah",
    repeat: 33,
  },
  {
    id: "tasbih-2",
    category: "tasbih",
    arabic: "الْحَمْدُ لِلَّهِ",
    translation: "Praise be to Allah",
    transliteration: "Alhamdu lillah",
    repeat: 33,
  },
  {
    id: "tasbih-3",
    category: "tasbih",
    arabic: "اللَّهُ أَكْبَرُ",
    translation: "Allah is the Greatest",
    transliteration: "Allahu akbar",
    repeat: 34,
  },
  // Travel Adhkar
  {
    id: "travel-1",
    category: "travel",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    translation: "Glory be to He Who has subjugated this to us, and we could not have subjugated it. And indeed, to our Lord we will return.",
    transliteration: "Subhanal-ladhi sakhkhara lan hadha wa ma kunna lahu muqrinin wa inna ila rabbinna lamunqalibun.",
    repeat: 1,
    reference: "Surah Al-Zukhruf 43:13-14",
  },
  // Anxiety/Worry Adhkar
  {
    id: "anxiety-1",
    category: "anxiety",
    arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنزَلْتَهُ فِي كِتَابِكَ أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ أَوْ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ أَنْ تُجِيرَنِي مِنْ شَرِّ مَا خَلَقْتَ",
    translation: "O Allah, I am Your servant, son of Your servant, son of Your female servant. My forelock is in Your hand. Your judgment of me is just, Your decree over me is rightful. I ask You by every name belonging to You which You named Yourself with, or revealed in Your Book, or taught to any of Your creation, or kept secret in Your knowledge of the unseen, to protect me from the evil of what You created.",
    transliteration: "Allahumma inni abduka wa ibnu abdika wa ibnu amatika nasiyati biyadika hadin fiya hukmuka adlun fiya qadauk. As'aluka bi kulli ismin huwa laka sammayta bihi nafsaka aw anzaltahu fi kitabi aw allamtahu ahadan min khalqika aw asta'tharta bihi fi ilm al-ghaybi indaka an yujirani min sharri ma khalaqta.",
    repeat: 1,
    reference: "Sahih Muslim 2712",
  },
];

// Get adhkar by category
export function getAdhkarByCategory(category: AdhkarCategory): Adhkar[] {
  return ADHKAR_DATA.filter((adhkar) => adhkar.category === category);
}

// Get all categories
export function getAdhkarCategories(): { id: AdhkarCategory; name: string; count: number }[] {
  const categories: AdhkarCategory[] = ["morning", "evening", "sleep", "prayer", "travel", "anxiety", "ramadan", "general", "tasbih"];
  
  return categories.map((cat) => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: getAdhkarByCategory(cat).length,
  }));
}

// Search adhkar
export function searchAdhkar(query: string): Adhkar[] {
  const q = query.toLowerCase();
  return ADHKAR_DATA.filter(
    (adhkar) =>
      adhkar.arabic.includes(q) ||
      adhkar.translation.toLowerCase().includes(q) ||
      adhkar.category.includes(q)
  );
}

// Get single adhkar
export function getAdhkarById(id: string): Adhkar | undefined {
  return ADHKAR_DATA.find((adhkar) => adhkar.id === id);
}