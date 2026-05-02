/* ============================================================
   SAKINAH — features.js
   Adhkar & Tasbih, Islamic Calendar, Live Radio, Global Search
   ============================================================ */

// ============================================================
//  ADHKAR & TASBIH
// ============================================================
function incrementTasbih() {
  state.tasbihCount++;
  document.getElementById('tasbih-count').textContent        = state.tasbihCount;
  document.getElementById('tasbih-session-count').textContent = state.tasbihCount;

  const pct = Math.min(100, (state.tasbihCount / state.tasbihTarget) * 100);
  document.getElementById('tasbih-goal-pct').textContent  = Math.round(pct) + '%';
  document.getElementById('tasbih-goal-bar').style.width  = pct + '%';
  const rem = Math.max(0, state.tasbihTarget - state.tasbihCount);
  document.getElementById('tasbih-goal-text').textContent =
    rem > 0 ? `${rem} remaining` : 'Target reached! 🎉';

  if (navigator.vibrate) navigator.vibrate(30);

  const btn = document.getElementById('tasbih-btn');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => { btn.style.transform = ''; }, 100);

  if (state.tasbihCount >= state.tasbihTarget) setTimeout(nextDhikr, 500);
}

function resetTasbih() {
  state.tasbihCount = 0;
  document.getElementById('tasbih-count').textContent         = '0';
  document.getElementById('tasbih-session-count').textContent  = '0';
  document.getElementById('tasbih-goal-pct').textContent       = '0%';
  document.getElementById('tasbih-goal-bar').style.width       = '0%';
  document.getElementById('tasbih-goal-text').textContent      = `${state.tasbihTarget} remaining`;
}

function nextDhikr() {
  state.tasbihIndex  = (state.tasbihIndex + 1) % state.dhikrList.length;
  const d = state.dhikrList[state.tasbihIndex];
  state.tasbihTarget = d.target;
  document.getElementById('tasbih-arabic').textContent          = d.ar;
  document.getElementById('tasbih-name-en').textContent         = d.en;
  document.getElementById('tasbih-target-display').textContent  = d.target;
  resetTasbih();
}

const ADHKAR_DATA = {
  morning: [
    { ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',        en: 'We have reached the morning and at this very time unto Allah belongs all sovereignty.', times: 1 },
    { ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا', en: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening.', times: 1 },
    { ar: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',                   en: 'How perfect Allah is and I praise Him.', times: 100 },
    { ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', en: 'None has the right to be worshipped but Allah, alone, without partner.', times: 10 },
  ],
  evening: [
    { ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',         en: 'We have reached the evening and at this very time unto Allah belongs all sovereignty.', times: 1 },
    { ar: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا', en: 'O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning.', times: 1 },
    { ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.', times: 3 },
  ],
  'after-prayer': [
    { ar: 'أَسْتَغْفِرُ اللَّهَ',                              en: 'I seek the forgiveness of Allah.', times: 3 },
    { ar: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ', en: 'O Allah, You are As-Salam and from You is all peace.', times: 1 },
    { ar: 'سُبْحَانَ اللَّهِ',                                 en: 'How perfect Allah is.', times: 33 },
    { ar: 'الْحَمْدُ لِلَّهِ',                                 en: 'All praise is for Allah.', times: 33 },
    { ar: 'اللَّهُ أَكْبَرُ',                                  en: 'Allah is the greatest.', times: 34 },
  ],
  general: [
    { ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',            en: 'In the name of Allah, the Most Gracious, the Most Merciful.', times: 1 },
    { ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',             en: 'Allah is sufficient for us, and He is the best disposer of affairs.', times: 1 },
    { ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',        en: 'There is no power nor might except with Allah.', times: 1 },
  ],
};

function loadAdhkar(cat) {
  const titles = { morning: 'Morning Adhkar', evening: 'Evening Adhkar', 'after-prayer': 'After Prayer', general: 'General Duas' };
  document.getElementById('adhkar-cat-title').textContent = titles[cat] || cat;
  document.getElementById('adhkar-list-area').classList.remove('hidden');

  const items = ADHKAR_DATA[cat] || [];
  const html  = items.map(a => `
    <div class="sakinah-card p-5">
      <p class="amiri text-2xl text-right text-primary-container leading-loose mb-3" dir="rtl">${a.ar}</p>
      <p class="text-sm text-on-surface-variant leading-relaxed mb-3">${a.en}</p>
      <div class="flex justify-between items-center pt-3 border-t border-surface-container">
        <span class="text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-1 rounded-full">&times;${a.times}</span>
        <button onclick="bookmarkDua('${escAttr(a.ar)}')" class="text-outline hover:text-primary-container transition-colors">
          <span class="material-symbols-outlined text-xl">bookmark_border</span>
        </button>
      </div>
    </div>`).join('');

  document.getElementById('adhkar-items').innerHTML = html;
  document.getElementById('adhkar-list-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
//  ISLAMIC CALENDAR
// ============================================================
const HIJRI_MONTHS = [
  'Muharram','Safar','Rabi al-Awwal','Rabi al-Thani',
  'Jumada al-Awwal','Jumada al-Thani','Rajab',"Sha'ban",
  'Ramadan','Shawwal',"Dhu al-Qi'da",'Dhu al-Hijja',
];
const GREGORIAN_MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function initCalendar() {
  const now = new Date();
  fetchHijriDate(d => {
    state.calYear      = now.getFullYear();
    state.calMonth     = now.getMonth();
    state.calHijriYear  = parseInt(d.hijri.year);
    state.calHijriMonth = parseInt(d.hijri.month.number) - 1;
    renderCalendar();
  });
}

function renderCalendar() {
  const { calYear: year, calMonth: month } = state;
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const today        = new Date();
  const isCurrentMo  = year === today.getFullYear() && month === today.getMonth();
  const todayDate    = today.getDate();

  document.getElementById('cal-month-name').textContent      = `${HIJRI_MONTHS[state.calHijriMonth]} ${state.calHijriYear}`;
  document.getElementById('cal-gregorian-range').textContent = `${GREGORIAN_MONTHS[month]} ${year}`;

  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday  = isCurrentMo && d === todayDate;
    const isFriday = new Date(year, month, d).getDay() === 5;
    html += `
      <button onclick="selectCalDay(${d})"
        class="aspect-square flex flex-col items-center justify-center rounded-xl p-1 text-xs transition-colors
          ${isToday  ? 'bg-primary text-white shadow-card scale-105 z-10'
          : isFriday ? 'text-secondary hover:bg-surface-container-low'
                     : 'hover:bg-surface-container-low text-on-background'}">
        <span class="font-bold">${d}</span>
        <span class="opacity-50 text-[8px]">${d + 12}</span>
      </button>`;
  }
  document.getElementById('calendar-grid').innerHTML = html;
  renderCalendarEvents();
}

function renderCalendarEvents() {
  const events = [
    { day: 1,  name: 'Islamic New Year',         icon: 'celebration'    },
    { day: 10, name: 'Day of Ashura',             icon: 'star'           },
    { day: 12, name: 'Mawlid al-Nabi',            icon: 'auto_awesome'   },
    { day: 27, name: 'Laylat al-Qadr (expected)', icon: 'bedtime'        },
  ];
  const html = events.map(e => `
    <div class="flex items-center gap-4 p-4 sakinah-card border-l-4 border-secondary">
      <div class="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
        <span class="text-base font-bold text-on-secondary-container">${e.day}</span>
      </div>
      <div>
        <h4 class="font-semibold text-on-surface text-sm">${e.name}</h4>
        <p class="text-xs text-outline mt-0.5">${HIJRI_MONTHS[state.calHijriMonth]} ${e.day}, ${state.calHijriYear} AH</p>
      </div>
    </div>`).join('');
  document.getElementById('calendar-events').innerHTML =
    '<h3 class="font-bold text-lg text-on-background mb-3">Islamic Dates</h3>' + html;
}

function prevMonth() {
  state.calMonth--;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  state.calHijriMonth = (state.calHijriMonth - 1 + 12) % 12;
  renderCalendar();
}
function nextMonth() {
  state.calMonth++;
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  state.calHijriMonth = (state.calHijriMonth + 1) % 12;
  renderCalendar();
}
function setCalView() { /* toggle month/year view — future enhancement */ }
function selectCalDay(d) {
  showToast(`${d} ${GREGORIAN_MONTHS[state.calMonth]} selected`);
}

// ============================================================
//  LIVE RADIO
// ============================================================
const RADIO_STREAMS = {
  makkah:      { name: 'Makkah Al-Mukarramah Live', url: 'https://Qurango.net/radio/makkah'   },
  madina:      { name: 'Madina Al-Munawwara Live',  url: 'https://Qurango.net/radio/madina'   },
  quraneg:     { name: 'Radio Quran Egypt',          url: 'https://Qurango.net/radio/tarateel' },
  afasy:       { name: 'Al-Afasy Radio',             url: 'https://Qurango.net/radio/ghamadi'  },
  quranfrance: { name: 'Quran International',        url: 'https://Qurango.net/radio/quran'    },
};

function playRadio(station) {
  const info = RADIO_STREAMS[station];
  if (!info) return;

  const radio = document.getElementById('radio-player');
  radio.pause();

  // Reset all indicators
  Object.keys(RADIO_STREAMS).forEach(k => {
    const ind = document.getElementById('radio-' + k + '-indicator');
    if (ind) { ind.style.background = '#e8e8e5'; ind.style.animation = ''; }
  });

  // Toggle off if same station
  if (state.radioStation === station) {
    state.radioStation = null;
    document.getElementById('radio-mini-player').classList.add('hidden');
    return;
  }

  state.radioStation = station;
  radio.src = info.url;
  radio.play()
    .then(() => {
      const ind = document.getElementById('radio-' + station + '-indicator');
      if (ind) { ind.style.background = '#ba1a1a'; ind.style.animation = 'pulse-dot 1.5s infinite'; }
      document.getElementById('radio-now-playing').textContent = info.name;
      document.getElementById('radio-mini-player').classList.remove('hidden');
      if (station === 'makkah') {
        const bar = document.getElementById('radio-makkah-bar');
        if (bar) { bar.style.width = '100%'; bar.style.transition = 'width 60s linear'; }
      }
    })
    .catch(() => showToast('Stream unavailable. Check connection.'));
}

function stopRadio() {
  document.getElementById('radio-player').pause();
  document.getElementById('radio-mini-player').classList.add('hidden');
  state.radioStation = null;
  Object.keys(RADIO_STREAMS).forEach(k => {
    const ind = document.getElementById('radio-' + k + '-indicator');
    if (ind) { ind.style.background = '#e8e8e5'; ind.style.animation = ''; }
  });
}

// ============================================================
//  GLOBAL SEARCH
// ============================================================
let searchTimeout;

function runSearch() {
  const q = document.getElementById('search-input').value.trim();
  clearTimeout(searchTimeout);

  if (!q) {
    document.getElementById('search-default').classList.remove('hidden');
    document.getElementById('search-results').classList.add('hidden');
    return;
  }

  document.getElementById('search-default').classList.add('hidden');
  document.getElementById('search-results').classList.remove('hidden');
  document.getElementById('search-results').innerHTML =
    '<div class="flex items-center justify-center py-12"><div class="spinner"></div></div>';

  searchTimeout = setTimeout(() => performSearch(q), 400);
}

function performSearch(q) {
  const lower   = q.toLowerCase();
  const results = { quran: [], surah: [], hadith: [] };

  // Local surah search
  results.surah = state.surahs.filter(s =>
    s.englishName.toLowerCase().includes(lower) ||
    s.englishNameTranslation.toLowerCase().includes(lower) ||
    s.name.includes(q)
  ).slice(0, 4);

  // Local hadith cache search
  results.hadith = state.hadithData.filter(h =>
    h.text && h.text.toLowerCase().includes(lower)
  ).slice(0, 4);

  // Remote Quran search
  fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/en.sahih`)
    .then(r => r.json())
    .then(d => {
      results.quran = (d.data?.matches || []).slice(0, 4);
      renderSearchResults(results, q);
    })
    .catch(() => renderSearchResults(results, q));
}

function renderSearchResults(results, q) {
  const { quran, surah, hadith } = results;
  const filter = state.searchFilter;
  let html = '';

  if ((filter === 'all' || filter === 'quran') && quran.length) {
    html += `
      <section>
        <h2 class="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">menu_book</span> Quran
        </h2>
        <div class="space-y-3">
          ${quran.map(v => `
            <div onclick="openReader(${v.surah?.number || 1})"
              class="sakinah-card p-4 cursor-pointer hover:shadow-ambient-2 transition-all">
              <span class="text-xs font-bold bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">
                ${v.surah?.englishName} ${v.surah?.number}:${v.numberInSurah}
              </span>
              <p class="text-sm text-on-surface-variant mt-2 leading-relaxed">${v.text}</p>
            </div>`).join('')}
        </div>
      </section>`;
  }

  if ((filter === 'all' || filter === 'surah') && surah.length) {
    html += `
      <section>
        <h2 class="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">list</span> Surahs
        </h2>
        <div class="space-y-2">
          ${surah.map(s => `
            <div onclick="openReader(${s.number})"
              class="sakinah-card p-4 flex items-center gap-3 cursor-pointer hover:shadow-ambient-1 transition-all">
              <span class="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-sm font-bold text-primary-container shrink-0">${s.number}</span>
              <div class="flex-1">
                <p class="font-semibold text-on-surface">${s.englishName}</p>
                <p class="text-xs text-outline">${s.numberOfAyahs} Ayahs</p>
              </div>
              <span class="amiri text-xl text-primary-container">${s.name}</span>
            </div>`).join('')}
        </div>
      </section>`;
  }

  if ((filter === 'all' || filter === 'hadith') && hadith.length) {
    html += `
      <section>
        <h2 class="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">history_edu</span> Hadith
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${hadith.map(h => `
            <div class="sakinah-card p-4">
              <span class="text-xs bg-surface-container-high px-2 py-1 rounded font-bold text-on-surface-variant">
                Hadith ${h.hadithnumber || ''}
              </span>
              <p class="text-sm text-on-surface-variant mt-2 leading-relaxed">
                ${(h.text || '').substring(0, 150)}&hellip;
              </p>
            </div>`).join('')}
        </div>
      </section>`;
  }

  if (!html) {
    html = `
      <div class="text-center py-12">
        <span class="material-symbols-outlined text-5xl text-outline/30">search_off</span>
        <p class="text-on-surface-variant mt-3">No results for &ldquo;${q}&rdquo;</p>
      </div>`;
  }

  document.getElementById('search-results').innerHTML = html;
}

function setSearchFilter(filter) {
  state.searchFilter = filter;
  ['all', 'quran', 'hadith', 'surah'].forEach(f => {
    const btn = document.getElementById('filter-' + f);
    if (!btn) return;
    btn.className = f === filter
      ? 'px-4 py-2 rounded-full bg-primary-container text-on-primary text-xs font-bold whitespace-nowrap'
      : 'px-4 py-2 rounded-full bg-transparent border border-outline-variant text-on-surface-variant text-xs font-bold whitespace-nowrap hover:bg-surface-container-high transition-colors';
  });
  const q = document.getElementById('search-input').value.trim();
  if (q) performSearch(q);
}
