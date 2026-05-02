/* ============================================================
   SAKINAH — app.js
   Core state, navigation, geolocation, utilities
   ============================================================ */

// ============================================================
//  APP STATE
// ============================================================
const state = {
  currentScreen: 'home',
  prayers: {},
  surahs: [],
  currentSurah: 1,
  currentReciter: 'afs',
  isPlaying: false,
  isShuffle: false,
  isRepeat: false,
  tasbihCount: 0,
  tasbihTarget: 33,
  tasbihIndex: 0,
  dhikrList: [
    { ar: 'سُبْحَانَ اللَّهِ',                        en: 'Subhanallah',                  target: 33  },
    { ar: 'الْحَمْدُ لِلَّهِ',                        en: 'Alhamdulillah',                target: 33  },
    { ar: 'اللَّهُ أَكْبَرُ',                         en: 'Allahu Akbar',                 target: 34  },
    { ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ',              en: 'La ilaha illallah',             target: 100 },
    { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',          en: 'Subhanallahi wa bihamdihi',     target: 100 },
  ],
  calYear: 0, calMonth: 0,
  calHijriYear: 0, calHijriMonth: 0,
  hadithPage: 1, hadithBook: 'bukhari', hadithData: [],
  searchFilter: 'all',
  bookmarkTab: 'all',
  userLat: null, userLng: null, userCity: '',
  showTranslation: true,
  radioStation: null,
  countdownInterval: null,
};

// ============================================================
//  NAVIGATION
// ============================================================
const FULLSCREEN_SCREENS = ['reader', 'audio'];

function navigate(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) {
    el.classList.add('active');
    if (!FULLSCREEN_SCREENS.includes(screen)) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Sidebar nav highlight
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navBtn = document.getElementById('nav-' + screen);
  if (navBtn) navBtn.classList.add('active');

  // Bottom nav highlight
  document.querySelectorAll('#bottom-nav button').forEach(b => {
    b.className = 'flex flex-col items-center gap-1 px-3 text-stone-400';
    const ico = b.querySelector('.material-symbols-outlined');
    if (ico) ico.style.fontVariationSettings = "'FILL' 0";
  });
  const bnBtn = document.getElementById('bn-' + screen);
  if (bnBtn) {
    bnBtn.className = 'flex flex-col items-center gap-1 px-3 text-primary-container';
    const ico = bnBtn.querySelector('.material-symbols-outlined');
    if (ico) ico.style.fontVariationSettings = "'FILL' 1";
  }

  // Fullscreen UI adjustments
  const isFullscreen = FULLSCREEN_SCREENS.includes(screen);
  const mhdr = document.getElementById('mobile-header');
  const bnav = document.getElementById('bottom-nav');
  const wrap = document.getElementById('app-wrapper');
  if (mhdr) mhdr.style.display = isFullscreen ? 'none' : '';
  if (bnav) bnav.style.display = isFullscreen ? 'none' : '';
  if (wrap) wrap.style.paddingBottom = isFullscreen ? '0' : '';

  state.currentScreen = screen;
  closeSidebar();

  // Screen-specific init
  if (screen === 'prayer')   initPrayer();
  if (screen === 'calendar') initCalendar();
  if (screen === 'fasting')  initFasting();
  if (screen === 'qibla')    initQibla();
  if (screen === 'bookmarks') renderBookmarks();
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('visible');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

// ============================================================
//  GEOLOCATION
// ============================================================
function getLocation(callback) {
  if (state.userLat) { callback(state.userLat, state.userLng); return; }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        state.userLat = pos.coords.latitude;
        state.userLng = pos.coords.longitude;
        callback(state.userLat, state.userLng);
      },
      () => { state.userLat = 51.5074; state.userLng = -0.1278; state.userCity = 'London, UK'; callback(state.userLat, state.userLng); },
      { timeout: 5000 }
    );
  } else {
    state.userLat = 51.5074; state.userLng = -0.1278; state.userCity = 'London, UK';
    callback(state.userLat, state.userLng);
  }
}

function reverseGeocode(lat, lng, callback) {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    .then(r => r.json())
    .then(d => {
      const city    = d.address.city || d.address.town || d.address.village || d.address.county || 'Your Location';
      const country = d.address.country_code ? d.address.country_code.toUpperCase() : '';
      state.userCity = city + (country ? ', ' + country : '');
      callback(state.userCity);
    })
    .catch(() => {
      state.userCity = `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`;
      callback(state.userCity);
    });
}

// ============================================================
//  PRAYER COUNTDOWN (shared between Home & Prayer screens)
// ============================================================
const PRAYER_NAMES = {
  Fajr:    { ar: 'الفجر',  icon: 'brightness_3'  },
  Dhuhr:   { ar: 'الظهر',  icon: 'wb_sunny'       },
  Asr:     { ar: 'العصر',  icon: 'wb_cloudy'      },
  Maghrib: { ar: 'المغرب', icon: 'wb_twilight'    },
  Isha:    { ar: 'العشاء', icon: 'bedtime'        },
};
const PRAYERS_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function startCountdown() {
  if (state.countdownInterval) clearInterval(state.countdownInterval);
  state.countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

function updateCountdown() {
  if (!state.prayers || !Object.keys(state.prayers).length) return;
  const now = new Date();
  let next = null, nextDt = null;

  for (const name of PRAYERS_ORDER) {
    const [h, m] = state.prayers[name].split(':').map(Number);
    const t = new Date(); t.setHours(h, m, 0, 0);
    if (t > now) { next = name; nextDt = t; break; }
  }
  if (!next) {
    const [h, m] = state.prayers[PRAYERS_ORDER[0]].split(':').map(Number);
    nextDt = new Date(); nextDt.setDate(nextDt.getDate() + 1); nextDt.setHours(h, m, 0, 0);
    next = PRAYERS_ORDER[0];
  }

  const diff = nextDt - now;
  const hh = String(Math.floor(diff / 3600000)).padStart(2, '0');
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  const countdown = `${hh}:${mm}:${ss}`;

  const el1 = document.getElementById('home-countdown');
  const el2 = document.getElementById('prayer-countdown-big');
  if (el1) el1.textContent = countdown;
  if (el2) el2.textContent = countdown;

  // Progress bar between previous and next prayer
  const pIdx = PRAYERS_ORDER.indexOf(next);
  const prevName = PRAYERS_ORDER[(pIdx - 1 + 5) % 5];
  const [ph, pm] = state.prayers[prevName].split(':').map(Number);
  const prevDt = new Date(); prevDt.setHours(ph, pm, 0, 0);
  if (prevDt > nextDt) prevDt.setDate(prevDt.getDate() - 1);
  const total = nextDt - prevDt;
  const elapsed = now - prevDt;
  const pct = Math.max(0, Math.min(100, (elapsed / total) * 100));
  const bar = document.getElementById('prayer-progress-bar');
  if (bar) bar.style.width = pct + '%';
}

// ============================================================
//  UTILITY
// ============================================================
function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${m}:${String(ss).padStart(2, '0')}`;
}

function escAttr(s) {
  return (s || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 80);
}

function showToast(msg, duration = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function shareAyah() {
  showToast('Share feature coming soon');
}

// ============================================================
//  BOOKMARKS (localStorage)
// ============================================================
function getBookmarks() {
  try { return JSON.parse(localStorage.getItem('sakinah-bookmarks') || '[]'); }
  catch { return []; }
}
function saveBookmarks(bm) {
  try { localStorage.setItem('sakinah-bookmarks', JSON.stringify(bm)); }
  catch { /* storage unavailable */ }
}

function bookmarkAyah(surahNum, ayahNum, text) {
  const bm = getBookmarks();
  const key = `ayah-${surahNum}:${ayahNum}`;
  if (bm.find(b => b.key === key)) { showToast('Already bookmarked'); return; }
  bm.unshift({ key, type: 'ayah', text, ref: `Surah ${surahNum}:${ayahNum}`, ts: Date.now() });
  saveBookmarks(bm);
  showToast('Bookmark saved ✓');
}
function bookmarkHadith(text) {
  const bm = getBookmarks();
  const key = `hadith-${Date.now()}`;
  bm.unshift({ key, type: 'hadith', text: text.substring(0, 200), ref: 'Hadith', ts: Date.now() });
  saveBookmarks(bm);
  showToast('Bookmark saved ✓');
}
function bookmarkDua(ar) {
  const bm = getBookmarks();
  const key = `dua-${Date.now()}`;
  bm.unshift({ key, type: 'dua', text: ar, ref: 'Daily Adhkar', ts: Date.now() });
  saveBookmarks(bm);
  showToast('Dua bookmarked ✓');
}
function bookmarkTafsir() {
  bookmarkAyah(2, 255, 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ');
}
function removeBookmark(key) {
  const bm = getBookmarks().filter(b => b.key !== key);
  saveBookmarks(bm);
  renderBookmarks();
  showToast('Removed');
}

function setBookmarkTab(tab) {
  state.bookmarkTab = tab;
  ['all', 'ayah', 'hadith', 'dua'].forEach(t => {
    const btn = document.getElementById('bk-' + t);
    if (!btn) return;
    btn.className = t === tab
      ? 'text-xs font-bold text-primary border-b-2 border-primary pb-3 px-2 shrink-0'
      : 'text-xs font-bold text-outline hover:text-on-surface pb-3 px-2 shrink-0 transition-colors';
  });
  renderBookmarks();
}

function renderBookmarks() {
  const bm = getBookmarks();
  const tab = state.bookmarkTab;
  const filtered = tab === 'all' ? bm : bm.filter(b => b.type === tab);
  const isEmpty = filtered.length === 0;
  document.getElementById('bookmarks-empty').classList.toggle('hidden', !isEmpty);
  const ICONS = { ayah: 'menu_book', hadith: 'history_edu', dua: 'volunteer_activism' };
  const html = filtered.map(b => `
    <div class="sakinah-card p-5 relative group">
      <div class="flex justify-between items-start mb-3">
        <span class="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant text-xs font-bold px-2 py-1 rounded-full capitalize">
          <span class="material-symbols-outlined text-sm">${ICONS[b.type] || 'bookmark'}</span> ${b.type}
        </span>
        <button onclick="removeBookmark('${b.key}')" class="text-outline hover:text-error transition-colors">
          <span class="material-symbols-outlined text-xl icon-fill">bookmark</span>
        </button>
      </div>
      <p class="amiri text-xl text-right text-primary-container mb-2 leading-loose ${b.type === 'hadith' ? 'hidden' : ''}" dir="rtl">${b.text}</p>
      <p class="text-sm text-on-surface-variant leading-relaxed ${b.type !== 'hadith' ? 'hidden' : ''}">${b.text}</p>
      <p class="text-xs text-outline-variant mt-3">${b.ref}</p>
    </div>`).join('');
  document.getElementById('bookmarks-list').innerHTML = html;
}

// ============================================================
//  ZAKAT CALCULATOR
// ============================================================
function calcZakat() {
  const cash   = parseFloat(document.getElementById('z-cash').value)   || 0;
  const gold   = parseFloat(document.getElementById('z-gold').value)   || 0;
  const invest = parseFloat(document.getElementById('z-invest').value) || 0;
  const debt   = parseFloat(document.getElementById('z-debt').value)   || 0;
  const total  = Math.max(0, cash + gold + invest - debt);
  const nisab  = 5500; // approx $5 500 (85 g gold × ~$65/g)
  const zakat  = total >= nisab ? total * 0.025 : 0;

  document.getElementById('zakat-total').textContent =
    zakat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const statusEl = document.getElementById('zakat-nisab-status');
  if (total >= nisab) {
    statusEl.textContent = `✓ Your wealth ($${total.toFixed(2)}) exceeds the nisab — Zakat is obligatory.`;
    statusEl.style.color = '#3b6756';
  } else {
    statusEl.textContent = `Your wealth ($${total.toFixed(2)}) is below the nisab of ~$${nisab.toLocaleString()} — Zakat is not yet obligatory.`;
    statusEl.style.color = '#745b04';
  }
}

// ============================================================
//  TAFSIR ACCORDION
// ============================================================
function toggleTafsirSection(btn) {
  const card   = btn.closest('.sakinah-card');
  const target = card.querySelector('.px-5.pb-5');
  const icon   = card.querySelector('.material-symbols-outlined:last-child');
  if (!target) return;
  const isHidden = target.classList.contains('hidden');
  target.classList.toggle('hidden', !isHidden);
  if (icon) icon.textContent = isHidden ? 'expand_less' : 'expand_more';
}
