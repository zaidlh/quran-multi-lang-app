export type UILanguage = "ar" | "en" | "fr" | "es" | "tr" | "id" | "ur" | "bn" | "ru" | "zh";

export const UI_LANGUAGES: {
  code: UILanguage;
  name: string;
  nameNative: string;
  dir: "rtl" | "ltr";
}[] = [
  { code: "ar", name: "Arabic", nameNative: "العربية", dir: "rtl" },
  { code: "en", name: "English", nameNative: "English", dir: "ltr" },
  { code: "fr", name: "French", nameNative: "Français", dir: "ltr" },
  { code: "es", name: "Spanish", nameNative: "Español", dir: "ltr" },
  { code: "tr", name: "Turkish", nameNative: "Türkçe", dir: "ltr" },
  { code: "id", name: "Indonesian", nameNative: "Bahasa Indonesia", dir: "ltr" },
  { code: "ur", name: "Urdu", nameNative: "اردو", dir: "rtl" },
  { code: "bn", name: "Bengali", nameNative: "বাংলা", dir: "ltr" },
  { code: "ru", name: "Russian", nameNative: "Русский", dir: "ltr" },
  { code: "zh", name: "Chinese", nameNative: "中文", dir: "ltr" },
];

export const RTL_LANGS = new Set<UILanguage>(["ar", "ur"]);

interface Labels {
  nav: {
    surahs: string;
    juz: string;
    bookmarks: string;
    search: string;
    mushaf: string;
    plans: string;
    settings: string;
  };
  home: {
    greeting: string;
    title: string;
    subtitle: string;
    statsSurahs: string;
    statsVerses: string;
    statsJuz: string;
    badge: string;
  };
  search: {
    placeholder: string;
    filterAll: string;
    filterMeccan: string;
    filterMedinan: string;
    results: string;
    noResults: string;
    clear: string;
  };
  surah: {
    prev: string;
    next: string;
    backToSurahs: string;
    bismillah: string;
    showDetails: string;
    hideDetails: string;
    verse: string;
    verses: string;
  };
  audio: {
    play: string;
    pause: string;
    reciter: string;
    surahMode: string;
    ayahMode: string;
    speed: string;
    repeat: string;
    settings: string;
  };
  bookmarks: { title: string; empty: string; removeConfirm: string };
  settings: {
    title: string;
    uiLang: string;
    quranLang: string;
    theme: string;
    fontSize: string;
    audioSpeed: string;
    reset: string;
    save: string;
    saved: string;
  };
  common: {
    copy: string;
    share: string;
    bookmark: string;
    remove: string;
    cancel: string;
    confirm: string;
    close: string;
    loading: string;
    error: string;
    retry: string;
    goHome: string;
    somethingWrong: string;
    unexpectedError: string;
  };
  lastRead: { continue: string; surah: string; ayah: string };
  verseOfDay: { title: string };
}

export const UI_LABELS: Record<UILanguage, Labels> = {
  ar: {
    nav: {
      surahs: "السور",
      juz: "الأجزاء",
      bookmarks: "المفضلة",
      search: "بحث",
      mushaf: "المصحف",
      plans: "خطط القراءة",
      settings: "الإعدادات",
    },
    home: {
      greeting: "السلام عليكم",
      title: "اقرأ القرآن الكريم",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "سورة",
      statsVerses: "آية",
      statsJuz: "جزء",
      badge: "+١٠ لغات متاحة",
    },
    search: {
      placeholder: "ابحث عن سورة...",
      filterAll: "الكل",
      filterMeccan: "مكية",
      filterMedinan: "مدنية",
      results: "نتيجة",
      noResults: "لم يتم العثور على سور",
      clear: "مسح",
    },
    surah: {
      prev: "السابقة",
      next: "التالية",
      backToSurahs: "كل السور",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "عرض التفاصيل",
      hideDetails: "إخفاء التفاصيل",
      verse: "آية",
      verses: "آيات",
    },
    audio: {
      play: "تشغيل",
      pause: "إيقاف",
      reciter: "القارئ",
      surahMode: "السورة كاملة",
      ayahMode: "آية بآية",
      speed: "السرعة",
      repeat: "تكرار",
      settings: "إعدادات الصوت",
    },
    bookmarks: {
      title: "المفضلة",
      empty: "لا توجد مفضلات بعد",
      removeConfirm: "هل تريد إزالة هذه المفضلة؟",
    },
    settings: {
      title: "الإعدادات",
      uiLang: "لغة الواجهة",
      quranLang: "لغة الترجمة",
      theme: "المظهر",
      fontSize: "حجم الخط",
      audioSpeed: "سرعة الصوت",
      reset: "إعادة تعيين",
      save: "حفظ الإعدادات",
      saved: "تم الحفظ",
    },
    common: {
      copy: "نسخ",
      share: "مشاركة",
      bookmark: "مفضلة",
      remove: "إزالة",
      cancel: "إلغاء",
      confirm: "تأكيد",
      close: "إغلاق",
      loading: "جاري التحميل...",
      error: "خطأ",
      retry: "إعادة المحاولة",
      goHome: "الرئيسية",
      somethingWrong: "حدث خطأ ما",
      unexpectedError: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    },
    lastRead: { continue: "متابعة القراءة", surah: "سورة", ayah: "آية" },
    verseOfDay: { title: "آية اليوم" },
  },
  en: {
    nav: {
      surahs: "Surahs",
      juz: "Juz",
      bookmarks: "Bookmarks",
      search: "Search",
      mushaf: "Mushaf",
      plans: "Reading Plans",
      settings: "Settings",
    },
    home: {
      greeting: "Assalamu Alaikum",
      title: "Read the Holy Quran",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Surahs",
      statsVerses: "Verses",
      statsJuz: "Juz",
      badge: "10+ Languages Available",
    },
    search: {
      placeholder: "Search for a surah...",
      filterAll: "All",
      filterMeccan: "Meccan",
      filterMedinan: "Medinan",
      results: "results",
      noResults: "No surahs found",
      clear: "Clear",
    },
    surah: {
      prev: "Previous",
      next: "Next",
      backToSurahs: "All Surahs",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Show details",
      hideDetails: "Hide details",
      verse: "Verse",
      verses: "verses",
    },
    audio: {
      play: "Play",
      pause: "Pause",
      reciter: "Reciter",
      surahMode: "Full Surah",
      ayahMode: "Verse by verse",
      speed: "Speed",
      repeat: "Repeat",
      settings: "Audio settings",
    },
    bookmarks: {
      title: "Bookmarks",
      empty: "No bookmarks yet",
      removeConfirm: "Remove this bookmark?",
    },
    settings: {
      title: "Settings",
      uiLang: "Interface Language",
      quranLang: "Translation Language",
      theme: "Theme",
      fontSize: "Font Size",
      audioSpeed: "Audio Speed",
      reset: "Reset",
      save: "Save Settings",
      saved: "Saved",
    },
    common: {
      copy: "Copy",
      share: "Share",
      bookmark: "Bookmark",
      remove: "Remove",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      retry: "Try Again",
      goHome: "Go Home",
      somethingWrong: "Something went wrong",
      unexpectedError: "An unexpected error occurred. Please try again.",
    },
    lastRead: { continue: "Continue Reading", surah: "Surah", ayah: "Ayah" },
    verseOfDay: { title: "Verse of the Day" },
  },
  fr: {
    nav: {
      surahs: "Sourates",
      juz: "Juz",
      bookmarks: "Favoris",
      search: "Recherche",
      mushaf: "Moushaf",
      plans: "Plans de lecture",
      settings: "Paramètres",
    },
    home: {
      greeting: "Assalamu Alaikum",
      title: "Lire le Saint Coran",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Sourates",
      statsVerses: "Versets",
      statsJuz: "Juz",
      badge: "10+ langues disponibles",
    },
    search: {
      placeholder: "Rechercher une sourate...",
      filterAll: "Tout",
      filterMeccan: "Mecquoise",
      filterMedinan: "Médinoise",
      results: "résultats",
      noResults: "Aucune sourate trouvée",
      clear: "Effacer",
    },
    surah: {
      prev: "Précédente",
      next: "Suivante",
      backToSurahs: "Toutes les sourates",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Voir détails",
      hideDetails: "Masquer détails",
      verse: "Verset",
      verses: "versets",
    },
    audio: {
      play: "Lecture",
      pause: "Pause",
      reciter: "Récitateur",
      surahMode: "Sourate complète",
      ayahMode: "Verset par verset",
      speed: "Vitesse",
      repeat: "Répéter",
      settings: "Paramètres audio",
    },
    bookmarks: { title: "Favoris", empty: "Aucun favori", removeConfirm: "Supprimer ce favori ?" },
    settings: {
      title: "Paramètres",
      uiLang: "Langue de l'interface",
      quranLang: "Langue de traduction",
      theme: "Thème",
      fontSize: "Taille de police",
      audioSpeed: "Vitesse audio",
      reset: "Réinitialiser",
      save: "Enregistrer",
      saved: "Enregistré",
    },
    common: {
      copy: "Copier",
      share: "Partager",
      bookmark: "Favori",
      remove: "Supprimer",
      cancel: "Annuler",
      confirm: "Confirmer",
      close: "Fermer",
      loading: "Chargement...",
      error: "Erreur",
      retry: "Réessayer",
      goHome: "Accueil",
      somethingWrong: "Une erreur est survenue",
      unexpectedError: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    },
    lastRead: { continue: "Continuer la lecture", surah: "Sourate", ayah: "Ayah" },
    verseOfDay: { title: "Verset du jour" },
  },
  es: {
    nav: {
      surahs: "Suras",
      juz: "Juz",
      bookmarks: "Marcadores",
      search: "Buscar",
      mushaf: "Mushaf",
      plans: "Planes de lectura",
      settings: "Ajustes",
    },
    home: {
      greeting: "Assalamu Alaikum",
      title: "Lee el Sagrado Corán",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Suras",
      statsVerses: "Versículos",
      statsJuz: "Juz",
      badge: "10+ idiomas disponibles",
    },
    search: {
      placeholder: "Buscar una sura...",
      filterAll: "Todas",
      filterMeccan: "Mecana",
      filterMedinan: "Medinesa",
      results: "resultados",
      noResults: "No se encontraron suras",
      clear: "Borrar",
    },
    surah: {
      prev: "Anterior",
      next: "Siguiente",
      backToSurahs: "Todas las suras",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Ver detalles",
      hideDetails: "Ocultar detalles",
      verse: "Versículo",
      verses: "versículos",
    },
    audio: {
      play: "Reproducir",
      pause: "Pausar",
      reciter: "Recitador",
      surahMode: "Sura completa",
      ayahMode: "Versículo a versículo",
      speed: "Velocidad",
      repeat: "Repetir",
      settings: "Ajustes de audio",
    },
    bookmarks: {
      title: "Marcadores",
      empty: "Sin marcadores",
      removeConfirm: "¿Eliminar este marcador?",
    },
    settings: {
      title: "Ajustes",
      uiLang: "Idioma de interfaz",
      quranLang: "Idioma de traducción",
      theme: "Tema",
      fontSize: "Tamaño de fuente",
      audioSpeed: "Velocidad de audio",
      reset: "Restablecer",
      save: "Guardar",
      saved: "Guardado",
    },
    common: {
      copy: "Copiar",
      share: "Compartir",
      bookmark: "Marcador",
      remove: "Eliminar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      close: "Cerrar",
      loading: "Cargando...",
      error: "Error",
      retry: "Reintentar",
      goHome: "Inicio",
      somethingWrong: "Algo salió mal",
      unexpectedError: "Ocurrió un error inesperado. Inténtalo de nuevo.",
    },
    lastRead: { continue: "Continuar leyendo", surah: "Sura", ayah: "Aleya" },
    verseOfDay: { title: "Versículo del día" },
  },
  tr: {
    nav: {
      surahs: "Sureler",
      juz: "Cüzler",
      bookmarks: "Yer İmleri",
      search: "Ara",
      mushaf: "Mushaf",
      plans: "Okuma Planları",
      settings: "Ayarlar",
    },
    home: {
      greeting: "Selamun Aleyküm",
      title: "Kur'an-ı Kerim'i Oku",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Sure",
      statsVerses: "Ayet",
      statsJuz: "Cüz",
      badge: "10+ dil mevcut",
    },
    search: {
      placeholder: "Sure ara...",
      filterAll: "Tümü",
      filterMeccan: "Mekki",
      filterMedinan: "Medeni",
      results: "sonuç",
      noResults: "Sure bulunamadı",
      clear: "Temizle",
    },
    surah: {
      prev: "Önceki",
      next: "Sonraki",
      backToSurahs: "Tüm Sureler",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Detayları göster",
      hideDetails: "Detayları gizle",
      verse: "Ayet",
      verses: "ayet",
    },
    audio: {
      play: "Oynat",
      pause: "Duraklat",
      reciter: "Kari",
      surahMode: "Tam Sure",
      ayahMode: "Ayet ayet",
      speed: "Hız",
      repeat: "Tekrar",
      settings: "Ses ayarları",
    },
    bookmarks: {
      title: "Yer İmleri",
      empty: "Henüz yer imi yok",
      removeConfirm: "Bu yer imini kaldır?",
    },
    settings: {
      title: "Ayarlar",
      uiLang: "Arayüz Dili",
      quranLang: "Çeviri Dili",
      theme: "Tema",
      fontSize: "Yazı Boyutu",
      audioSpeed: "Ses Hızı",
      reset: "Sıfırla",
      save: "Kaydet",
      saved: "Kaydedildi",
    },
    common: {
      copy: "Kopyala",
      share: "Paylaş",
      bookmark: "Yer İmi",
      remove: "Kaldır",
      cancel: "İptal",
      confirm: "Onayla",
      close: "Kapat",
      loading: "Yükleniyor...",
      error: "Hata",
      retry: "Tekrar Dene",
      goHome: "Ana Sayfa",
      somethingWrong: "Bir hata oluştu",
      unexpectedError: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
    },
    lastRead: { continue: "Okumaya Devam Et", surah: "Sure", ayah: "Ayet" },
    verseOfDay: { title: "Günün Ayeti" },
  },
  id: {
    nav: {
      surahs: "Surah",
      juz: "Juz",
      bookmarks: "Penanda",
      search: "Cari",
      mushaf: "Mushaf",
      plans: "Rencana Baca",
      settings: "Pengaturan",
    },
    home: {
      greeting: "Assalamu Alaikum",
      title: "Baca Al-Quran",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Surah",
      statsVerses: "Ayat",
      statsJuz: "Juz",
      badge: "10+ bahasa tersedia",
    },
    search: {
      placeholder: "Cari surah...",
      filterAll: "Semua",
      filterMeccan: "Makkiyah",
      filterMedinan: "Madaniyah",
      results: "hasil",
      noResults: "Surah tidak ditemukan",
      clear: "Hapus",
    },
    surah: {
      prev: "Sebelumnya",
      next: "Berikutnya",
      backToSurahs: "Semua Surah",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Lihat detail",
      hideDetails: "Sembunyikan detail",
      verse: "Ayat",
      verses: "ayat",
    },
    audio: {
      play: "Putar",
      pause: "Jeda",
      reciter: "Qari",
      surahMode: "Surah Penuh",
      ayahMode: "Ayat per ayat",
      speed: "Kecepatan",
      repeat: "Ulangi",
      settings: "Pengaturan audio",
    },
    bookmarks: {
      title: "Penanda",
      empty: "Belum ada penanda",
      removeConfirm: "Hapus penanda ini?",
    },
    settings: {
      title: "Pengaturan",
      uiLang: "Bahasa Antarmuka",
      quranLang: "Bahasa Terjemahan",
      theme: "Tema",
      fontSize: "Ukuran Font",
      audioSpeed: "Kecepatan Audio",
      reset: "Reset",
      save: "Simpan",
      saved: "Tersimpan",
    },
    common: {
      copy: "Salin",
      share: "Bagikan",
      bookmark: "Penanda",
      remove: "Hapus",
      cancel: "Batal",
      confirm: "Konfirmasi",
      close: "Tutup",
      loading: "Memuat...",
      error: "Kesalahan",
      retry: "Coba Lagi",
      goHome: "Beranda",
      somethingWrong: "Terjadi kesalahan",
      unexpectedError: "Terjadi kesalahan tak terduga. Silakan coba lagi.",
    },
    lastRead: { continue: "Lanjutkan Membaca", surah: "Surah", ayah: "Ayat" },
    verseOfDay: { title: "Ayat Hari Ini" },
  },
  ur: {
    nav: {
      surahs: "سورتیں",
      juz: "پارے",
      bookmarks: "نشانات",
      search: "تلاش",
      mushaf: "مصحف",
      plans: "تلاوت کے منصوبے",
      settings: "ترتیبات",
    },
    home: {
      greeting: "السلام علیکم",
      title: "قرآن پاک پڑھیں",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "سورتیں",
      statsVerses: "آیات",
      statsJuz: "پارے",
      badge: "+١٠ زبانیں دستیاب",
    },
    search: {
      placeholder: "سورت تلاش کریں...",
      filterAll: "سب",
      filterMeccan: "مکی",
      filterMedinan: "مدنی",
      results: "نتائج",
      noResults: "کوئی سورت نہیں ملی",
      clear: "صاف",
    },
    surah: {
      prev: "پچھلی",
      next: "اگلی",
      backToSurahs: "تمام سورتیں",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "تفصیلات دکھائیں",
      hideDetails: "تفصیلات چھپائیں",
      verse: "آیت",
      verses: "آیات",
    },
    audio: {
      play: "چلائیں",
      pause: "روکیں",
      reciter: "قاری",
      surahMode: "مکمل سورت",
      ayahMode: "آیت بہ آیت",
      speed: "رفتار",
      repeat: "دہرائیں",
      settings: "آڈیو ترتیبات",
    },
    bookmarks: { title: "نشانات", empty: "ابھی کوئی نشان نہیں", removeConfirm: "یہ نشان ہٹائیں؟" },
    settings: {
      title: "ترتیبات",
      uiLang: "انٹرفیس زبان",
      quranLang: "ترجمے کی زبان",
      theme: "ظاہری شکل",
      fontSize: "خط کا سائز",
      audioSpeed: "آڈیو رفتار",
      reset: "دوبارہ ترتیب",
      save: "محفوظ کریں",
      saved: "محفوظ",
    },
    common: {
      copy: "نقل",
      share: "شیئر",
      bookmark: "نشان",
      remove: "ہٹائیں",
      cancel: "منسوخ",
      confirm: "تصدیق",
      close: "بند",
      loading: "لوڈ ہو رہا ہے...",
      error: "خرابی",
      retry: "دوبارہ کوشش",
      goHome: "ہوم",
      somethingWrong: "کچھ غلط ہو گیا",
      unexpectedError: "غیر متوقع خرابی۔ دوبارہ کوشش کریں۔",
    },
    lastRead: { continue: "پڑھنا جاری رکھیں", surah: "سورت", ayah: "آیت" },
    verseOfDay: { title: "آج کی آیت" },
  },
  bn: {
    nav: {
      surahs: "সূরাসমূহ",
      juz: "পারা",
      bookmarks: "বুকমার্ক",
      search: "অনুসন্ধান",
      mushaf: "মুসহাফ",
      plans: "পড়ার পরিকল্পনা",
      settings: "সেটিংস",
    },
    home: {
      greeting: "আসসালামু আলাইকুম",
      title: "পবিত্র কুরআন পড়ুন",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "সূরা",
      statsVerses: "আয়াত",
      statsJuz: "পারা",
      badge: "১০+ ভাষায় উপলব্ধ",
    },
    search: {
      placeholder: "সূরা খুঁজুন...",
      filterAll: "সকল",
      filterMeccan: "মক্কী",
      filterMedinan: "মাদানী",
      results: "ফলাফল",
      noResults: "কোনো সূরা পাওয়া যায়নি",
      clear: "মুছুন",
    },
    surah: {
      prev: "পূর্ববর্তী",
      next: "পরবর্তী",
      backToSurahs: "সকল সূরা",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "বিস্তারিত দেখুন",
      hideDetails: "বিস্তারিত লুকান",
      verse: "আয়াত",
      verses: "আয়াত",
    },
    audio: {
      play: "চালান",
      pause: "বিরতি",
      reciter: "ক্বারী",
      surahMode: "সম্পূর্ণ সূরা",
      ayahMode: "আয়াত ধরে ধরে",
      speed: "গতি",
      repeat: "পুনরায়",
      settings: "অডিও সেটিংস",
    },
    bookmarks: {
      title: "বুকমার্ক",
      empty: "কোনো বুকমার্ক নেই",
      removeConfirm: "এই বুকমার্ক মুছবেন?",
    },
    settings: {
      title: "সেটিংস",
      uiLang: "ইন্টারফেস ভাষা",
      quranLang: "অনুবাদের ভাষা",
      theme: "থিম",
      fontSize: "ফন্ট সাইজ",
      audioSpeed: "অডিও গতি",
      reset: "রিসেট",
      save: "সংরক্ষণ করুন",
      saved: "সংরক্ষিত",
    },
    common: {
      copy: "কপি",
      share: "শেয়ার",
      bookmark: "বুকমার্ক",
      remove: "মুছুন",
      cancel: "বাতিল",
      confirm: "নিশ্চিত",
      close: "বন্ধ",
      loading: "লোড হচ্ছে...",
      error: "ত্রুটি",
      retry: "আবার চেষ্টা",
      goHome: "হোম",
      somethingWrong: "কিছু ভুল হয়েছে",
      unexpectedError: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।",
    },
    lastRead: { continue: "পড়া চালিয়ে যান", surah: "সূরা", ayah: "আয়াত" },
    verseOfDay: { title: "আজকের আয়াত" },
  },
  ru: {
    nav: {
      surahs: "Суры",
      juz: "Джузы",
      bookmarks: "Закладки",
      search: "Поиск",
      mushaf: "Мусхаф",
      plans: "Планы чтения",
      settings: "Настройки",
    },
    home: {
      greeting: "Ассаламу Алейкум",
      title: "Читайте Священный Коран",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "Сур",
      statsVerses: "Аятов",
      statsJuz: "Джузов",
      badge: "10+ языков доступно",
    },
    search: {
      placeholder: "Найти суру...",
      filterAll: "Все",
      filterMeccan: "Мекканская",
      filterMedinan: "Мединская",
      results: "результатов",
      noResults: "Суры не найдены",
      clear: "Очистить",
    },
    surah: {
      prev: "Предыдущая",
      next: "Следующая",
      backToSurahs: "Все суры",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "Подробнее",
      hideDetails: "Скрыть детали",
      verse: "Аят",
      verses: "аятов",
    },
    audio: {
      play: "Воспроизвести",
      pause: "Пауза",
      reciter: "Чтец",
      surahMode: "Вся сура",
      ayahMode: "По аятам",
      speed: "Скорость",
      repeat: "Повторить",
      settings: "Настройки аудио",
    },
    bookmarks: { title: "Закладки", empty: "Нет закладок", removeConfirm: "Удалить эту закладку?" },
    settings: {
      title: "Настройки",
      uiLang: "Язык интерфейса",
      quranLang: "Язык перевода",
      theme: "Тема",
      fontSize: "Размер шрифта",
      audioSpeed: "Скорость аудио",
      reset: "Сбросить",
      save: "Сохранить",
      saved: "Сохранено",
    },
    common: {
      copy: "Копировать",
      share: "Поделиться",
      bookmark: "Закладка",
      remove: "Удалить",
      cancel: "Отмена",
      confirm: "Подтвердить",
      close: "Закрыть",
      loading: "Загрузка...",
      error: "Ошибка",
      retry: "Повторить",
      goHome: "На главную",
      somethingWrong: "Что-то пошло не так",
      unexpectedError: "Произошла непредвиденная ошибка. Попробуйте снова.",
    },
    lastRead: { continue: "Продолжить чтение", surah: "Сура", ayah: "Аят" },
    verseOfDay: { title: "Аят дня" },
  },
  zh: {
    nav: {
      surahs: "章节",
      juz: "卷",
      bookmarks: "书签",
      search: "搜索",
      mushaf: "经本",
      plans: "阅读计划",
      settings: "设置",
    },
    home: {
      greeting: "赛俩目",
      title: "阅读古兰经",
      subtitle: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      statsSurahs: "章",
      statsVerses: "节",
      statsJuz: "卷",
      badge: "支持10+种语言",
    },
    search: {
      placeholder: "搜索章节...",
      filterAll: "全部",
      filterMeccan: "麦加",
      filterMedinan: "麦地那",
      results: "结果",
      noResults: "未找到章节",
      clear: "清除",
    },
    surah: {
      prev: "上一章",
      next: "下一章",
      backToSurahs: "所有章节",
      bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      showDetails: "查看详情",
      hideDetails: "隐藏详情",
      verse: "节",
      verses: "节",
    },
    audio: {
      play: "播放",
      pause: "暂停",
      reciter: "诵读者",
      surahMode: "整章",
      ayahMode: "逐节",
      speed: "速度",
      repeat: "重复",
      settings: "音频设置",
    },
    bookmarks: { title: "书签", empty: "暂无书签", removeConfirm: "删除此书签？" },
    settings: {
      title: "设置",
      uiLang: "界面语言",
      quranLang: "翻译语言",
      theme: "主题",
      fontSize: "字体大小",
      audioSpeed: "音频速度",
      reset: "重置",
      save: "保存设置",
      saved: "已保存",
    },
    common: {
      copy: "复制",
      share: "分享",
      bookmark: "书签",
      remove: "删除",
      cancel: "取消",
      confirm: "确认",
      close: "关闭",
      loading: "加载中...",
      error: "错误",
      retry: "重试",
      goHome: "首页",
      somethingWrong: "出了点问题",
      unexpectedError: "发生意外错误，请重试。",
    },
    lastRead: { continue: "继续阅读", surah: "章", ayah: "节" },
    verseOfDay: { title: "每日经文" },
  },
};

export function formatNumber(num: number, lang: UILanguage): string {
  if (lang === "ar") {
    return new Intl.NumberFormat("ar-SA").format(num);
  }
  return new Intl.NumberFormat(lang).format(num);
}
