/* ============================================================
   SAKINAH — quran.js
   Surah list, Quran reader, Audio player
   ============================================================ */

// ============================================================
//  RECITERS CONFIG
// ============================================================
const RECITERS = {
  afs:    { name: 'Mishary Rashid Alafasy',    server: 'https://server8.mp3quran.net/afs/'    },
  husary: { name: 'Mahmoud Al-Husary',         server: 'https://server8.mp3quran.net/mahmoud_ali_al_bana/' },
  maher:  { name: 'Maher Al-Muaiqly',         server: 'https://server8.mp3quran.net/maher/'  },
  thubti: { name: 'Abdul Rahman Al-Sudais',   server: 'https://server7.mp3quran.net/thubti/' },
};

// ============================================================
//  SURAH LIST
// ============================================================
function loadSurahs() {
  if (state.surahs.length) { renderSurahList(state.surahs); return; }
  fetch('https://api.alquran.cloud/v1/surah')
    .then(r => r.json())
    .then(d => {
      state.surahs = d.data;
      const countEl = document.getElementById('surah-count');
      if (countEl) countEl.textContent = `${state.surahs.length} Surahs`;
      renderSurahList(state.surahs);
    })
    .catch(() => showToast('Failed to load Quran. Check connection.'));
}

function renderSurahList(list) {
  const html = list.map((s, i) => `
    <button onclick="openReader(${s.number})"
      class="flex items-center justify-between px-5 py-4 hover:bg-surface-container-lowest transition-colors group w-full text-left
             ${i < list.length - 1 ? 'border-b border-surface-container/50' : ''}">
      <div class="flex items-center gap-4">
        <div class="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center relative shrink-0">
          <span class="absolute w-9 h-9 border border-outline/15 rounded-full rotate-45 group-hover:border-secondary/50 transition-colors"></span>
          <span class="text-xs font-bold text-primary-container z-10">${s.number}</span>
        </div>
        <div>
          <h4 class="font-bold text-primary-container text-base leading-tight">${s.englishName}</h4>
          <p class="text-xs text-on-surface-variant uppercase tracking-wide mt-0.5">
            ${s.englishNameTranslation} &bull; ${s.numberOfAyahs} Ayahs &bull; ${s.revelationType}
          </p>
        </div>
      </div>
      <span class="amiri text-2xl text-primary-container group-hover:text-secondary transition-colors">${s.name}</span>
    </button>`).join('');
  document.getElementById('surah-list').innerHTML = html;
}

function filterSurahs() {
  const q = document.getElementById('quran-search').value.toLowerCase().trim();
  if (!q) {
    renderSurahList(state.surahs);
    document.getElementById('surah-count').textContent = `${state.surahs.length} Surahs`;
    return;
  }
  const filtered = state.surahs.filter(s =>
    s.englishName.toLowerCase().includes(q) ||
    s.englishNameTranslation.toLowerCase().includes(q) ||
    s.name.includes(q) ||
    String(s.number) === q
  );
  renderSurahList(filtered);
  document.getElementById('surah-count').textContent = `${filtered.length} results`;
}

// ============================================================
//  QURAN READER (dark full-screen)
// ============================================================
function openReader(surahNum) {
  state.currentSurah = surahNum;
  navigate('reader');

  const surah = state.surahs.find(s => s.number === surahNum) || {};
  document.getElementById('reader-surah-name').textContent = surah.englishName || 'Loading...';
  document.getElementById('reader-surah-info').textContent = `${surah.numberOfAyahs || '—'} Ayahs`;
  document.getElementById('reader-bismillah').style.display = surahNum === 9 ? 'none' : '';
  document.getElementById('reader-verses').innerHTML =
    '<div class="flex items-center justify-center py-16">' +
    '<div class="spinner" style="border-color:rgba(255,255,255,0.15);border-top-color:#e4c368;"></div></div>';

  Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`).then(r => r.json()),
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/en.sahih`).then(r => r.json()),
  ])
    .then(([arData, enData]) => renderVerses(arData.data.ayahs, enData.data.ayahs))
    .catch(() => showToast('Failed to load surah.'));
}

function renderVerses(arAyahs, enAyahs) {
  const html = arAyahs.map((v, i) => `
    <div class="py-5 border-b border-white/5 last:border-0">
      <div class="flex justify-between items-start mb-3">
        <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-secondary-fixed-dim shrink-0">
          ${v.numberInSurah}
        </div>
        <div class="flex gap-2">
          <button
            onclick="bookmarkAyah(${state.currentSurah}, ${v.numberInSurah}, '${escAttr(v.text)}')"
            class="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-secondary-fixed-dim transition-colors">
            <span class="material-symbols-outlined text-base">bookmark_border</span>
          </button>
          <button
            onclick="openAudio(${state.currentSurah})"
            class="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-secondary-fixed-dim transition-colors">
            <span class="material-symbols-outlined text-base">play_circle</span>
          </button>
        </div>
      </div>
      <p class="amiri text-2xl leading-loose text-right" dir="rtl" style="color:#e2e3e0;line-height:2.5">${v.text}</p>
      <p id="trans-${v.numberInSurah}"
         class="text-sm text-white/50 mt-3 leading-relaxed italic ${state.showTranslation ? '' : 'hidden'}">
        ${enAyahs[i]?.text || ''}
      </p>
    </div>`).join('');
  document.getElementById('reader-verses').innerHTML = html;
}

function toggleTranslation() {
  state.showTranslation = !state.showTranslation;
  document.getElementById('reader-translate-btn').style.opacity = state.showTranslation ? '1' : '0.4';
  document.querySelectorAll('#reader-verses p[id^="trans-"]').forEach(el => {
    el.classList.toggle('hidden', !state.showTranslation);
  });
}

// ============================================================
//  AUDIO PLAYER
// ============================================================
function openAudio(surahNum) {
  if (surahNum !== undefined) state.currentSurah = surahNum;
  navigate('audio');
  loadAudioSurah();
}

function loadAudioSurah() {
  const surah    = state.surahs.find(s => s.number === state.currentSurah);
  const rec      = RECITERS[state.currentReciter] || RECITERS.afs;
  const filename = String(state.currentSurah).padStart(3, '0') + '.mp3';
  const url      = rec.server + filename;
  const audio    = document.getElementById('audio-player');

  document.getElementById('audio-title').textContent      = surah ? surah.englishName : `Surah ${state.currentSurah}`;
  document.getElementById('audio-surah-info').textContent = surah
    ? `${surah.englishNameTranslation} \u2022 ${surah.numberOfAyahs} Ayahs` : '';
  document.getElementById('audio-reciter').textContent    = rec.name;
  document.getElementById('audio-bismillah').textContent  = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

  audio.src = url;
  if (state.isPlaying) audio.play().catch(() => {});
}

function togglePlay() {
  const audio = document.getElementById('audio-player');
  const icon  = document.getElementById('play-icon');
  if (audio.paused) {
    audio.play().catch(() => showToast('Audio unavailable. Check connection.'));
    state.isPlaying = true;
    icon.textContent = 'pause';
  } else {
    audio.pause();
    state.isPlaying  = false;
    icon.textContent = 'play_arrow';
  }
}

function nextSurah() {
  if (state.isShuffle) state.currentSurah = Math.floor(Math.random() * 114) + 1;
  else                  state.currentSurah = Math.min(114, state.currentSurah + 1);
  state.isPlaying = true;
  loadAudioSurah();
  document.getElementById('audio-player').addEventListener('canplay', () => {
    document.getElementById('audio-player').play();
  }, { once: true });
}

function prevSurah() {
  state.currentSurah = Math.max(1, state.currentSurah - 1);
  state.isPlaying    = true;
  loadAudioSurah();
  document.getElementById('audio-player').addEventListener('canplay', () => {
    document.getElementById('audio-player').play();
  }, { once: true });
}

function audioEnded() {
  if (state.isRepeat) { document.getElementById('audio-player').play(); return; }
  nextSurah();
}

function updateAudioProgress() {
  const audio = document.getElementById('audio-player');
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('audio-progress').value        = pct;
  document.getElementById('audio-current').textContent   = formatTime(audio.currentTime);
  document.getElementById('audio-total').textContent     = formatTime(audio.duration);
}

function audioLoaded() {
  document.getElementById('audio-total').textContent =
    formatTime(document.getElementById('audio-player').duration);
}

function seekAudio(val) {
  const audio = document.getElementById('audio-player');
  if (audio.duration) audio.currentTime = (val / 100) * audio.duration;
}

function toggleShuffle() {
  state.isShuffle = !state.isShuffle;
  document.getElementById('audio-shuffle-btn').style.opacity = state.isShuffle ? '1' : '0.4';
}

function toggleRepeat() {
  state.isRepeat = !state.isRepeat;
  document.getElementById('audio-repeat-btn').style.opacity = state.isRepeat ? '1' : '0.4';
}

function changeReciter() {
  state.currentReciter = document.getElementById('reciter-select').value;
  state.isPlaying = true;
  loadAudioSurah();
  document.getElementById('audio-player').addEventListener('canplay', () => {
    document.getElementById('audio-player').play();
  }, { once: true });
}
