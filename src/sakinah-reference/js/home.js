/* ============================================================
   SAKINAH — home.js
   Home dashboard, Prayer times screen, Qibla finder
   ============================================================ */

// ============================================================
//  HOME DASHBOARD
// ============================================================
function initHome() {
  // Hijri date
  fetchHijriDate(d => {
    const el = document.getElementById('home-date');
    if (el) el.textContent =
      `${d.hijri.day} ${d.hijri.month.en} ${d.hijri.year} AH  •  ${d.gregorian.day} ${d.gregorian.month.en} ${d.gregorian.year}`;
    const sEl = document.getElementById('sidebar-hijri');
    if (sEl) sEl.textContent = `${d.hijri.day} ${d.hijri.month.en} ${d.hijri.year} AH`;
  });

  // Random Ayah of the Day
  const randomAyah = Math.floor(Math.random() * 6236) + 1;
  fetch(`https://api.alquran.cloud/v1/ayah/${randomAyah}/editions/ar.alafasy,en.sahih`)
    .then(r => r.json())
    .then(d => {
      if (d.code === 200) {
        const ar = d.data[0], en = d.data[1];
        document.getElementById('home-ayah-arabic').textContent  = ar.text;
        document.getElementById('home-ayah-english').textContent = `"${en.text}"`;
        document.getElementById('home-ayah-ref').textContent     =
          `${ar.surah.englishName} ${ar.surah.number}:${ar.numberInSurah}`;
      }
    })
    .catch(() => {
      document.getElementById('home-ayah-arabic').textContent  = 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا';
      document.getElementById('home-ayah-english').textContent = '"For indeed, with hardship [will be] ease."';
      document.getElementById('home-ayah-ref').textContent     = 'Ash-Sharh 94:5';
    });

  // Prayer times → home list + countdown
  getLocation((lat, lng) => {
    reverseGeocode(lat, lng, city => {
      const el = document.getElementById('home-location');
      if (el) el.textContent = city;
    });
    fetchPrayerTimes(lat, lng, data => {
      state.prayers = data;
      renderHomePrayerList(data);
      startCountdown();
    });
  });
}

// ============================================================
//  SHARED: fetch Hijri date
// ============================================================
function fetchHijriDate(callback) {
  const now = new Date();
  const d   = `${String(now.getDate()).padStart(2,'0')}-${String(now.getMonth()+1).padStart(2,'0')}-${now.getFullYear()}`;
  fetch(`https://api.aladhan.com/v1/gToH?date=${d}`)
    .then(r => r.json())
    .then(j => callback(j.data))
    .catch(() => callback({
      hijri:     { day: '—', month: { en: '—' }, year: '—' },
      gregorian: { day: '—', month: { en: '—' }, year: '—' },
    }));
}

// ============================================================
//  SHARED: fetch prayer times
// ============================================================
function fetchPrayerTimes(lat, lng, callback) {
  const ts = Math.floor(Date.now() / 1000);
  fetch(`https://api.aladhan.com/v1/timings/${ts}?latitude=${lat}&longitude=${lng}&method=3`)
    .then(r => r.json())
    .then(j => { if (j.code === 200) callback(j.data.timings); })
    .catch(() => callback({
      Fajr: '05:30', Dhuhr: '12:45', Asr: '16:00',
      Maghrib: '19:00', Isha: '20:30', Sunrise: '06:45',
    }));
}

// ============================================================
//  HOME: render compact prayer list
// ============================================================
function renderHomePrayerList(timings) {
  const now = new Date();
  const prayerTimes = PRAYERS_ORDER.map(name => {
    const [h, m] = timings[name].split(':').map(Number);
    const t = new Date(); t.setHours(h, m, 0, 0);
    return { name, time: timings[name], dt: t, info: PRAYER_NAMES[name] };
  });

  let next = prayerTimes.find(p => p.dt > now) || prayerTimes[0];

  // Update hero card
  document.getElementById('home-next-prayer').textContent    = next.name;
  document.getElementById('home-next-prayer-ar').textContent = next.info.ar;
  document.getElementById('home-prayer-icon').textContent    = next.info.icon;

  const html = prayerTimes.map(p => {
    const isPassed = p.dt <= now;
    const isNext   = p.name === next.name;
    return `
      <div class="flex items-center justify-between py-2.5 px-3 rounded-xl
        ${isNext ? 'bg-primary-fixed/30 -mx-1' : isPassed ? 'opacity-50' : ''}">
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-base ${isNext ? 'text-primary-container' : 'text-outline'}">${p.info.icon}</span>
          <span class="text-sm font-medium ${isNext ? 'text-primary-container font-semibold' : 'text-on-surface'}">${p.name}</span>
          <span class="amiri text-sm text-outline">${p.info.ar}</span>
        </div>
        <div class="flex items-center gap-2">
          ${isPassed ? '<span class="material-symbols-outlined text-secondary text-sm icon-fill">check</span>' : ''}
          <span class="text-sm font-mono ${isNext ? 'text-primary-container font-bold' : 'text-on-surface-variant'}">${p.time}</span>
        </div>
      </div>`;
  }).join('');
  document.getElementById('home-prayers-list').innerHTML = html;
}

// ============================================================
//  PRAYER TIMES SCREEN
// ============================================================
function initPrayer() {
  getLocation((lat, lng) => {
    reverseGeocode(lat, lng, city => {
      const el = document.getElementById('prayer-location');
      if (el) el.textContent = city;
    });
    fetchPrayerTimes(lat, lng, data => {
      state.prayers = data;
      renderPrayerCards(data);
      startCountdown();
    });
  });
}

function renderPrayerCards(timings) {
  const now        = new Date();
  const prayerTimes = PRAYERS_ORDER.map(name => {
    const [h, m] = timings[name].split(':').map(Number);
    const t = new Date(); t.setHours(h, m, 0, 0);
    return { name, time: timings[name], dt: t, info: PRAYER_NAMES[name] };
  });
  const nextName = (prayerTimes.find(p => p.dt > now) || prayerTimes[0]).name;

  document.getElementById('prayer-next-name').textContent = nextName;
  document.getElementById('prayer-next-ar').textContent   = PRAYER_NAMES[nextName]?.ar || '';

  const html = prayerTimes.map(p => {
    const isPassed = p.dt <= now;
    const isNext   = p.name === nextName;
    return `
      <div class="sakinah-card p-4 flex items-center justify-between
        ${isNext ? 'border-l-4 border-secondary md:col-span-2 shadow-ambient-2' : ''}
        ${isPassed ? ' opacity-50' : ''}">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full ${isNext ? 'bg-secondary text-on-secondary' : 'bg-surface-container text-on-surface-variant'} flex items-center justify-center">
            <span class="material-symbols-outlined">${p.info.icon}</span>
          </div>
          <div>
            <h3 class="font-bold text-lg ${isNext ? 'text-primary' : 'text-on-surface'}">${p.name}</h3>
            <p class="amiri text-base ${isNext ? 'text-secondary' : 'text-on-surface-variant'}">${p.info.ar}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-xl ${isNext ? 'text-primary' : 'text-on-surface'} ${isPassed ? 'line-through' : ''}">${p.time}</p>
          ${isNext ? `<div class="flex items-center gap-1 text-secondary mt-1 text-xs font-bold justify-end">
            <span class="material-symbols-outlined text-sm">notifications_active</span> Next
          </div>` : ''}
        </div>
      </div>`;
  }).join('');
  document.getElementById('prayer-cards').innerHTML = html;
}

// ============================================================
//  QIBLA FINDER
// ============================================================
function initQibla() {
  getLocation((lat, lng) => {
    const qiblaAngle = calcQibla(lat, lng);
    document.getElementById('qibla-angle-display').querySelector('p').textContent = Math.round(qiblaAngle) + '°';
    document.getElementById('qibla-coords').textContent     = `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
    document.getElementById('qibla-status').textContent     = 'Qibla Direction Found';
    document.getElementById('qibla-instruction').textContent =
      `From your location, Makkah is ${Math.round(qiblaAngle)}° from North.`;
    document.getElementById('compass-needle').style.transform = `rotate(${qiblaAngle}deg)`;

    const dist = haversine(lat, lng, 21.3891, 39.8579);
    document.getElementById('qibla-dist').textContent = `${Math.round(dist)} km to Makkah`;

    // Device orientation for live compass
    if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
        .then(r => { if (r === 'granted') startCompass(qiblaAngle); });
    } else if (window.DeviceOrientationEvent) {
      startCompass(qiblaAngle);
    }
  });
}

function calcQibla(lat, lng) {
  const MAKKAH_LAT = 21.3891, MAKKAH_LNG = 39.8579;
  const latR = lat * Math.PI / 180, lngR = lng * Math.PI / 180;
  const mlatR = MAKKAH_LAT * Math.PI / 180, mlngR = MAKKAH_LNG * Math.PI / 180;
  const dLng = mlngR - lngR;
  const y = Math.sin(dLng) * Math.cos(mlatR);
  const x = Math.cos(latR) * Math.sin(mlatR) - Math.sin(latR) * Math.cos(mlatR) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

function startCompass(qiblaAngle) {
  window.addEventListener('deviceorientationabsolute', e => {
    if (e.alpha !== null) {
      const needleAngle = qiblaAngle - (360 - e.alpha);
      document.getElementById('compass-needle').style.transform = `rotate(${needleAngle}deg)`;
    }
  }, true);
}

function haversine(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a    = Math.sin(dLat/2)**2 +
               Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ============================================================
//  FASTING TRACKER
// ============================================================
function initFasting() {
  const day = 14, totalDays = 30;
  const pct = day / totalDays;
  document.getElementById('fasting-day-num').textContent  = day;
  document.getElementById('fasting-remaining').textContent = `${totalDays - day} Days Remaining`;
  document.getElementById('fasting-subtitle').textContent  =
    `Day ${day} of ${totalDays} • Halfway there, Alhamdulillah`;
  document.getElementById('fasting-circle').setAttribute(
    'stroke-dashoffset', String(282.7 * (1 - pct))
  );

  getLocation((lat, lng) => {
    fetchPrayerTimes(lat, lng, data => {
      document.getElementById('fasting-suhoor').textContent = data.Fajr || '--:--';
      const iftarTime = data.Maghrib || '--:--';
      document.getElementById('fasting-iftar').textContent  = iftarTime;
      if (iftarTime !== '--:--') {
        const [h, m] = iftarTime.split(':').map(Number);
        const iftar  = new Date(); iftar.setHours(h, m, 0, 0);
        const diff   = iftar - new Date();
        if (diff > 0) {
          const hh = Math.floor(diff / 3600000);
          const mm = Math.floor((diff % 3600000) / 60000);
          document.getElementById('fasting-iftar-countdown').textContent = `In ${hh}h ${mm}m`;
        } else {
          document.getElementById('fasting-iftar-countdown').textContent = 'Passed';
        }
      }
    });
  });
}
