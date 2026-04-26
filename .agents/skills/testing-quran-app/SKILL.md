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

## Architecture Notes

- Translation system: `app/lib/ui-labels.ts` — contains `UI_LABELS` record with all translations, `UI_LANGUAGES` array, `formatNumber()` function
- Context provider: `app/components/UILanguageProvider.tsx` — uses `useSyncExternalStore` for React 19 strict mode compliance with localStorage
- All components use `const { t, dir, uiLang } = useUILanguage()` hook to access translations
- CSS uses logical properties (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`) instead of directional equivalents

## Devin Secrets Needed
No secrets required for testing. The app uses public Quran APIs and runs without authentication.
