# Testing the Quran Multi-Language Web App

## Overview
End-to-end testing of the Next.js web frontend at `src/web/`. The app displays 114 Quran surahs with bilingual verse display, audio player, bookmarking, and full-text search.

## Prerequisites
- Node.js 18+
- npm dependencies installed: `cd src/web && npm ci`

## Dev Server Setup
```bash
cd /home/ubuntu/repos/quran-multi-lang-app/src/web
npm run dev
# Server starts on http://localhost:3000
```

If port 3000 is busy, Next.js may auto-select another port (e.g., 3001). Check the terminal output. To free port 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

## Core Test Flows

### 1. Home Page (Surah List)
- Navigate to `/`
- Verify Bismillah heading, "114 surahs" count
- First card: #1 Al-Fatihah, 7 verses, Meccan
- Last card: #114 An-Nas

### 2. Search & Filter
- Search input filters by surah name (e.g., "Baqarah" → 1 result)
- Filter buttons: All (114), Meccan (86), Medinan (28)
- Filters and search work together

### 3. Surah Detail Page
- Click any surah card → `/surah/{id}`
- Arabic text (RTL) + English translation for each verse
- Bismillah banner shown for all surahs except 1 (Al-Fatihah) and 9 (At-Tawbah)
- Language dropdown with 7 options: EN, FR, ES, TR, ID, UR, BN

### 4. Language Switching
- Change dropdown → URL updates to `/surah/{id}?lang={code}`
- Translation text changes, Arabic remains unchanged
- Test with French (`fr`): look for "Miséricordieux", "Allah", "Louange"

### 5. Audio Player
- Green rounded section below language selector
- Play/Pause button toggles icon and aria-label
- Reciter dropdown: Mishary Alafasy (default), Abdul Basit, Saad Al-Ghamdi, Maher Al-Muaiqly
- **Known limitation:** CDN audio (everyayah.com) may not stream on headless VMs. The play/pause UI toggle still works — verify that instead of actual audio playback.

### 6. Bookmarking
- Bookmark icon (outline SVG) next to language dropdown
- Click → icon fills, aria-label changes to "Remove bookmark"
- `/bookmarks` page lists saved bookmarks with dates
- "Remove" button deletes bookmark → "No bookmarks yet." shown
- Uses localStorage — bookmarks persist across page loads but not across browser profiles

### 7. Verse Search
- `/search` page with text input
- Search in English translations (e.g., "mercy" returns 50+ results)
- Each result shows: surah name, verse reference (e.g., "2:64"), Arabic text, English translation
- Results link to `/surah/{id}#verse-{number}`

### 8. Surah Navigation
- "← Prev" and "Next →" buttons at top of surah page
- Surah 1: only "Next →" shown
- Surah 114: only "← Prev" shown
- All others: both buttons shown
- Navigation preserves the current language parameter

## Testing Tips
- Maximize browser before recording: `wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz`
- Install wmctrl if needed: `sudo apt-get install -y wmctrl`
- Use DOM inspection (devinid attributes) to verify element states when visual checks are ambiguous
- Check aria-labels for button state changes (e.g., "Play" vs "Pause", "Add bookmark" vs "Remove bookmark")
- The app uses Next.js App Router — pages are in `src/web/app/` directory
- RTL Arabic text might render differently in headless environments vs real browsers

## Devin Secrets Needed
None — the app runs entirely locally with bundled resources.
