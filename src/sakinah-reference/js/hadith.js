/* ============================================================
   SAKINAH — hadith.js
   Hadith Library — six books + search
   ============================================================ */

const HADITH_ENDPOINTS = {
  bukhari:  { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.json',  name: 'Sahih al-Bukhari'   },
  muslim:   { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json',   name: 'Sahih Muslim'       },
  nasai:    { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-nasai.json',    name: "Sunan an-Nasa'i"   },
  abudawud: { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud.json', name: 'Sunan Abi Dawud'    },
  tirmidhi: { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-tirmidhi.json', name: "Jami' at-Tirmidhi" },
  ibnmajah: { url: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-ibnmajah.json', name: 'Sunan Ibn Majah'   },
};

// ============================================================
//  LOAD BOOK
// ============================================================
function loadHadithBook(book) {
  state.hadithBook = book;
  state.hadithPage = 1;
  state.hadithData = [];

  const info = HADITH_ENDPOINTS[book];
  document.getElementById('hadith-book-title').textContent = info.name;
  document.getElementById('hadith-results').classList.remove('hidden');
  document.getElementById('hadith-list').innerHTML =
    '<div class="flex items-center justify-center py-12"><div class="spinner"></div></div>';

  fetch(info.url)
    .then(r => r.json())
    .then(d => {
      state.hadithData = d.hadiths || [];
      renderHadithList(false);
    })
    .catch(() => {
      document.getElementById('hadith-list').innerHTML =
        '<p class="text-center text-outline py-8 text-sm">Failed to load. Try again.</p>';
    });
}

// ============================================================
//  RENDER PAGE
// ============================================================
function renderHadithList(append) {
  const perPage = 10;
  const slice   = state.hadithData.slice(
    (state.hadithPage - 1) * perPage,
     state.hadithPage      * perPage
  );

  const html = slice.map(h => `
    <div class="sakinah-card p-5 relative overflow-hidden group">
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-bold bg-surface-container-high text-on-surface-variant px-2 py-1 rounded">
          Hadith ${h.hadithnumber || ''}
        </span>
        <button onclick="bookmarkHadith('${escAttr(h.text)}')"
          class="text-outline hover:text-primary-container transition-colors p-1">
          <span class="material-symbols-outlined text-xl">bookmark_border</span>
        </button>
      </div>
      <p class="text-sm text-on-surface-variant leading-relaxed">
        ${(h.text || '').substring(0, 300)}${(h.text || '').length > 300 ? '…' : ''}
      </p>
    </div>`).join('');

  if (append) document.getElementById('hadith-list').innerHTML += html;
  else        document.getElementById('hadith-list').innerHTML  = html;

  const hasMore = state.hadithPage * perPage < state.hadithData.length;
  document.getElementById('hadith-load-more').classList.toggle('hidden', !hasMore);
}

// ============================================================
//  PAGINATION
// ============================================================
function loadMoreHadiths() {
  state.hadithPage++;
  renderHadithList(true);
}

// ============================================================
//  SEARCH WITHIN BOOK
// ============================================================
function filterHadiths() {
  const q = document.getElementById('hadith-search-input').value.toLowerCase().trim();
  if (!q) { renderHadithList(false); return; }
  const full     = state.hadithData;
  const filtered = full.filter(h => h.text && h.text.toLowerCase().includes(q));
  // temporarily override for display, restore on clear
  state.hadithData = filtered;
  state.hadithPage = 1;
  renderHadithList(false);
  // Note: caller should refresh hadithData from full set if needed
}
