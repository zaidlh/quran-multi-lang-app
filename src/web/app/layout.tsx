import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Scheherazade_New } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
import { UILanguageProvider } from "./components/UILanguageProvider";
import { ServiceWorkerRegistration } from "./components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const scheherazade = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تطبيق القرآن الكريم — Quran Multi-Language App",
  description:
    "اقرأ القرآن الكريم مع ترجمات بأكثر من ١٠ لغات، واستمع للتلاوات، واستكشف التفسير. Read the Holy Quran with translations in 10+ languages.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "تطبيق القرآن الكريم — Quran Multi-Language App",
    description: "اقرأ القرآن الكريم مع ترجمات بأكثر من ١٠ لغات، واستمع للتلاوات، واستكشف التفسير.",
    siteName: "Quran Multi-Language App",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d7d6e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${scheherazade.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <UILanguageProvider>
          <ThemeProvider>
            <ServiceWorkerRegistration />

            {/* Skip link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:inline-start-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-semibold focus:text-white"
              style={{ background: "var(--primary)" }}
            >
              Skip to content
            </a>

            <Header />

            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>

            {/* ── Footer ── */}
            <footer
              className="mt-auto border-t"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              role="contentinfo"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                  {/* Brand */}
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-base font-bold"
                      style={{
                        background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                        boxShadow: "0 2px 8px rgba(13,125,110,0.3)",
                      }}
                    >
                      ﷽
                    </span>
                    <div>
                      <p className="font-bold text-sm">QuranApp</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>Open Source — MIT License</p>
                    </div>
                  </div>

                  {/* Nav links */}
                  <nav className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2">
                    {[
                      { href: "/",              label: "Surahs" },
                      { href: "/juz",           label: "Juz" },
                      { href: "/search",        label: "Search" },
                      { href: "/mushaf",        label: "Mushaf" },
                      { href: "/reading-plans", label: "Plans" },
                      { href: "/bookmarks",     label: "Bookmarks" },
                      { href: "/settings",      label: "Settings" },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-xs font-medium transition-colors"
                        style={{ color: "var(--muted)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  {/* GitHub */}
                  <a
                    href="https://github.com/zaidlh/quran-multi-lang-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all hover:shadow-sm"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--muted)",
                      background: "var(--surface-elevated)",
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </a>
                </div>

                {/* Bottom line */}
                <div
                  className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  <p>© {new Date().getFullYear()} Quran Multi-Language App. Open-source &amp; free.</p>
                  <p className="arabic-text" dir="rtl" style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--primary)" }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              </div>
            </footer>

          </ThemeProvider>
        </UILanguageProvider>
      </body>
    </html>
  );
}
