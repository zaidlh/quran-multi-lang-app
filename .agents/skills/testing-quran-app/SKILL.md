# Testing the Quran Multi-Language App

## Environment Setup

### Dev Server
```bash
cd src/web && npm ci && npm run dev
```
Runs on `localhost:3000`. If you get a `Can't resolve 'tailwindcss'` error, this is likely due to the monorepo having multiple lockfiles. The root `package-lock.json` and `src/web/package-lock.json` can confuse Turbopack's module resolution. Workaround: test against the Vercel deployment instead.

### Build & Lint
```bash
cd src/web && npm run build
cd src/web && npm run lint
cd src/web && npx vitest run  # 32 unit tests
```

### Vercel Deployment
The app auto-deploys to Vercel on push to `main`. Production URL: https://quran-multi-lang-app.vercel.app. Preview deployments are created for each PR branch.

## Key Features to Test

### RTL/LTR Language Switching
- App defaults to Arabic RTL (`<html lang="ar" dir="rtl">`)
- Language switcher is in the header (globe icon + current language name)
- Clicking a language instantly updates: `document.documentElement.lang`, `document.documentElement.dir`, all UI labels, number formatting
- RTL languages: Arabic (`ar`), Urdu (`ur`)
- LTR languages: English (`en`), French (`fr`), Spanish (`es`), Turkish (`tr`), Indonesian (`id`), Bengali (`bn`), Russian (`ru`), Chinese (`zh`)

### Tafsir (Verse Commentary)
- Navigate to any surah page (e.g., `/surah/1`), expand a verse's details, click "Tafsir" button
- The tafsir panel fetches from `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/{tafsirId}/{surahNumber}.json`
- **Key API detail**: The API response contains `ayahs` array where each entry has an `ayah` field (not `id`) to match verse numbers. If tafsir shows "Tafsir not available for this verse", check that the code uses `a.ayah === ayahNumber` (not `a.id`)
- Available sources: Ibn Kathir (English), Ibn Kathir (Arabic), Tafheem ul-Quran, Al-Jalalayn, Al-Tabari, Al-Qurtubi, As-Sa'di
- Switch between sources using the dropdown — each should load different commentary text

### Audio Player
- Audio player appears on surah pages with play/pause, progress bar, time counter, and reciter selector
- **Two CDN sources**:
  - Surah mode: `https://download.quranicaudio.com/quran/{surahPath}/{paddedSurahNumber}.mp3`
  - Ayah mode: `https://everyayah.com/data/{ayahPath}/{paddedSurah}{paddedAyah}.mp3`
- **4 reciters with verified paths**:
  - Mishary Alafasy: surahPath=`mishaari_raashid_al_3afaasee`, ayahPath=`Alafasy_128kbps`
  - Abdul Basit: surahPath=`abdul_basit_murattal`, ayahPath=`Abdul_Basit_Murattal_192kbps`
  - Saad Al-Ghamdi: surahPath=`sa3d_al-ghaamidi/complete`, ayahPath=`Ghamadi_40kbps`
  - Maher Al-Muaiqly: surahPath=`maher_256`, ayahPath=`MaherAlMuaiqly128kbps`
- **Testing tip**: Audio might not play immediately on first page load — the browser needs to fetch metadata from the CDN. If the time counter stays at 0:00 and duration shows `--:--`, try refreshing the page (F5). After refresh, clicking play should show the time incrementing within a few seconds. This is normal browser behavior with streamed audio, not a bug.
- To verify: click play, wait 3-5 seconds, confirm time counter moves past 0:00 and progress bar advances

### Multi-Language Surah Intros
- Surah intro text is displayed at the top of each surah page in a card
- The intro text should change when the UI language is switched (via header language dropdown)
- Translations are stored in `app/components/SurahIntro.tsx` as `Record<UILanguage, Record<number, string>>`
- **Test procedure**: On `/surah/1`, verify Arabic intro starts with "الفاتحة هي أول سورة", switch to English and verify "Al-Fatiha (The Opening) is the first surah", switch to French and verify "Al-Fatiha (L'Ouverture) est la première sourate"
- If the intro text doesn't change with language, the component might be using a single-language `SURAH_INTROS` object instead of the multi-language version

### localStorage Keys
- `quran-ui-lang`: Stores the selected UI language code (e.g., "ar", "en")
- `quran-app-settings`: Stores settings JSON (theme, fontSize, audioSpeed, uiLang)
- `quran-theme`: Legacy theme key
- `quran-last-read`: Last read surah/verse

### Settings Page (`/settings`)
- Language selector grid with all 10 languages
- Theme toggle (Light/Dark)
- Font size selector (A/A+/A++)
- Audio speed slider (0.5x–2x)
- Save button uses `t.settings.save` key — verify it shows "Save Settings" in English, "حفظ الإعدادات" in Arabic (NOT the page title)
- Reset button clears all settings

### Number Formatting
- Arabic: Arabic-Indic digits via `Intl.NumberFormat("ar-SA")` → ١٢٣
- Urdu: Extended Arabic-Indic via `Intl.NumberFormat("ur")` → ۱۲۳
- All others: locale-specific via `Intl.NumberFormat(lang)`

## Testing Checklist

1. **Fresh state**: Clear `localStorage`, reload — should default to Arabic RTL
2. **Language switch**: Click language dropdown → select English → verify dir=ltr, all labels English, Western numerals
3. **Persistence**: Reload after switching — should stay in selected language (tests `useEffect` sync in `UILanguageProvider`)
4. **Settings page**: Navigate to `/settings` — verify all section labels translated, save button shows correct label
5. **Surah page**: Click a surah card — verify breadcrumb, navigation labels, verse numbers use correct locale numerals
6. **Switch back to Arabic**: Verify RTL layout restores correctly
7. **Tafsir**: On `/surah/1`, expand verse 1 details, click Tafsir — verify actual commentary loads (not "Tafsir not available")
8. **Audio**: Click play on surah page — verify time counter increments for default reciter, then switch to each of the 4 reciters
9. **Surah intro**: Verify intro text changes when switching between Arabic, English, and French
10. **README**: Check GitHub repo Contributors section shows correct name

## Architecture Notes

- Translation system: `app/lib/ui-labels.ts` — contains `UI_LABELS` record with all translations, `UI_LANGUAGES` array, `formatNumber()` function
- Context provider: `app/components/UILanguageProvider.tsx` — uses `useSyncExternalStore` for React 19 strict mode compliance with localStorage
- All components use `const { t, dir, uiLang } = useUILanguage()` hook to access translations
- CSS uses logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`) instead of directional equivalents
- Tafsir panel: `app/components/TafsirPanel.tsx` — fetches from jsdelivr CDN, matches ayah by `a.ayah` field
- Audio player: `app/components/AudioPlayer.tsx` — RECITERS array with `surahPath` and `ayahPath` per reciter
- Surah intros: `app/components/SurahIntro.tsx` — multi-language intro texts keyed by `UILanguage` then surah number

## Devin Secrets Needed
No secrets required for testing. The app uses public Quran APIs and runs without authentication.
