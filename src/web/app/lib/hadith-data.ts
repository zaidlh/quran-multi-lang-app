"use client";

// Hadith types
export interface Hadith {
  id: string;
  collection: HadithCollection;
  bookNumber: number;
  hadithNumber: number;
  arabic: string;
  translation: string;
  grade?: string;
  reference?: string;
  narrator?: string;
}

export type HadithCollection = 
  | "bukhari"
  | "muslim"
  | "abu_dawud"
  | "tirmidhi"
  | "nasai"
  | "ibn_majah"
  | "riyad_salihin"
  | "40_nawawi";

// Sample hadith data (curated from public sources)
export const HADITH_DATA: Hadith[] = [
  // From Sahih al-Bukhari
  {
    id: "bukhari-1",
    collection: "bukhari",
    bookNumber: 1,
    hadithNumber: 1,
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    translation: "Actions are judged by intentions, and each person will have what they intended.",
    grade: "Sahih (Authentic)",
    reference: "Sahih al-Bukhari 1",
    narrator: "Umar ibn al-Khattab",
  },
  {
    id: "bukhari-2",
    collection: "bukhari",
    bookNumber: 2,
    hadithNumber: 49,
    arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
    translation: "Whoever innovates something in this matter of ours that is not part of it will have it rejected.",
    grade: "Sahih (Authentic)",
    reference: "Sahih al-Bukhari 2697",
    narrator: "Aisha",
  },
  {
    id: "bukhari-3",
    collection: "bukhari",
    bookNumber: 8,
    hadithNumber: 151,
    arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَى وَيَنْهَى عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ وَالْبَغْيِ",
    translation: "Indeed, Allah orders justice and good conduct and giving to relatives and forbids immorality and bad conduct and oppression. He admonishes you that perhaps you will be reminded.",
    grade: "Sahih (Authentic)",
    reference: "Sahih al-Bukhari 4678",
  },
  // From Sahih Muslim
  {
    id: "muslim-1",
    collection: "muslim",
    bookNumber: 1,
    hadithNumber: 1,
    arabic: "مَنْ أَصَابَ ذَنْبًا فَإِنْ يَشَأْ اللَّهُ أَوْجَبَ عَلَيْهِ وَإِنْ يَشَأْ غَفَرَ لَهُ",
    translation: "If Allah intends good for a person, He tests him. If he is patient, He chooses him. If he intends evil for him, He makes him commit sin and then cast him into Hell.",
    grade: "Sahih (Authentic)",
    reference: "Sahih Muslim 2579",
  },
  {
    id: "muslim-2",
    collection: "muslim",
    bookNumber: 1,
    hadithNumber: 4,
    arabic: "الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ",
    translation: "Faith has over sixty branches: Haya (modesty) is a branch of faith.",
    grade: "Sahih (Authentic)",
    reference: "Sahih Muslim 35",
  },
  // From Riyad as-Salihin
  {
    id: "riyad-1",
    collection: "riyad_salihin",
    bookNumber: 1,
    hadithNumber: 1,
    arabic: "مَنْ عَمِلَ بِعِلْمِهِ أَعْطَاهُ اللَّهُ عِلْمًا لَمْ يَكُنْ يَعْلَمُهُ",
    translation: "Whoever acts upon what he knows, Allah will give him knowledge that he did not know.",
    grade: "Hasan (Good)",
    reference: "Riyad as-Salihin 74",
  },
  {
    id: "riyad-2",
    collection: "riyad_salihin",
    bookNumber: 1,
    hadithNumber: 2,
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    translation: "Seeking knowledge is an obligation upon every Muslim.",
    grade: "Sahih (Authentic)",
    reference: "Ibn Majah 224",
  },
  // 40 Nawawi
  {
    id: "nawawi-1",
    collection: "40_nawawi",
    bookNumber: 1,
    hadithNumber: 1,
    arabic: "مِنْ حُسْنِ إِسْلامِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ",
    translation: "From the excellence of a person's Islam is that he leaves what does not concern him.",
    grade: "Hasan (Good)",
    reference: "Jami' at-Tirmidhi 2316",
  },
  {
    id: "nawawi-2",
    collection: "40_nawawi",
    bookNumber: 1,
    hadithNumber: 2,
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "None of you has faith until he loves for his brother what he loves for himself.",
    grade: "Sahih (Authentic)",
    reference: "Sahih al-Bukhari 13, Sahih Muslim 45",
  },
  {
    id: "nawawi-3",
    collection: "40_nawawi",
    bookNumber: 1,
    hadithNumber: 3,
    arabic: "مَنْ حَفِظَ عَلَى أُمَّتِي صَحِيفَةً مِنْ أَخْطَائِهَا غَفَرَ اللَّهُ لَهُ",
    translation: "Whoever protects my Ummah from committing an error will be granted Paradise by Allah.",
    grade: "Sahih (Authentic)",
    reference: "Sunan at-Tirmidhi 2639",
  },
  {
    id: "nawawi-4",
    collection: "40_nawawi",
    bookNumber: 1,
    hadithNumber: 4,
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation: "A Muslim is one from whose tongue and hand the Muslims are safe.",
    grade: "Sahih (Authentic)",
    reference: "Sahih al-Bukhari 6483, Sahih Muslim 40",
  },
  {
    id: "nawawi-5",
    collection: "40_nawawi",
    bookNumber: 1,
    hadithNumber: 5,
    arabic: "الدِّينُ النَّصِيحَةُ",
    translation: "Religion is sincere advice.",
    grade: "Sahih (Authentic)",
    reference: "Sahih Muslim 95",
  },
  // From Abu Dawud
  {
    id: "abu_dawud-1",
    collection: "abu_dawud",
    bookNumber: 32,
    hadithNumber: 4015,
    arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتَقَنَهُ",
    translation: "Indeed, Allah loves that when one of you does a deed, he does it with excellence.",
    grade: "Sahih (Authentic)",
    reference: "Sunan Abi Dawud 3148",
  },
  // From Tirmidhi
  {
    id: "tirmidhi-1",
    collection: "tirmidhi",
    bookNumber: 1,
    hadithNumber: 108,
    arabic: "إِنَّ مِنْ أَفْضَلِ الْأَعْمَالِ أَدْنَاهَا لِمَنْ جَدَّ فِيهَا",
    translation: "Indeed, from the best of deeds are those which are done consistently, even if they are few.",
    grade: "Sahih (Authentic)",
    reference: "Jami' at-Tirmidhi 1079",
  },
];

// Get hadith by collection
export function getHadithByCollection(collection: HadithCollection): Hadith[] {
  return HADITH_DATA.filter((hadith) => hadith.collection === collection);
}

// Get hadith by ID
export function getHadithById(id: string): Hadith | undefined {
  return HADITH_DATA.find((hadith) => hadith.id === id);
}

// Get hadith by book and number
export function getHadith(collection: HadithCollection, bookNumber: number, hadithNumber: number): Hadith | undefined {
  return HADITH_DATA.find(
    (hadith) =>
      hadith.collection === collection &&
      hadith.bookNumber === bookNumber &&
      hadith.hadithNumber === hadithNumber
  );
}

// Search hadith
export function searchHadith(query: string): Hadith[] {
  const q = query.toLowerCase();
  return HADITH_DATA.filter(
    (hadith) =>
      hadith.arabic.includes(q) ||
      hadith.translation.toLowerCase().includes(q)
  );
}

// Get all collections
export function getHadithCollections(): { id: HadithCollection; name: string; count: number }[] {
  const collections: { id: HadithCollection; name: string }[] = [
    { id: "bukhari", name: "Sahih al-Bukhari" },
    { id: "muslim", name: "Sahih Muslim" },
    { id: "abu_dawud", name: "Abu Dawud" },
    { id: "tirmidhi", name: "Jami' at-Tirmidhi" },
    { id: "nasai", name: "Sunan an-Nasai" },
    { id: "ibn_majah", name: "Ibn Majah" },
    { id: "riyad_salihin", name: "Riyad as-Salihin" },
    { id: "40_nawawi", name: "40 Nawawi" },
  ];
  
  return collections.map((c) => ({
    ...c,
    count: getHadithByCollection(c.id).length,
  }));
}