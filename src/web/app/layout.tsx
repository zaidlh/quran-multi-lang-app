import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Scheherazade_New } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { UILanguageProvider } from "./components/UILanguageProvider";
import { ServiceWorkerRegistration } from "./components/ServiceWorkerRegistration";
import { MobileHeader } from "./components/MobileHeader";

const inter = Inter({
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
  title: "Sakinah — Islamic Super App",
  description: " Quran, Prayer Times, Qibla Finder, Hadith, Adhkar & more.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Sakinah — Islamic Super App",
    description: "Quran, Prayer Times, Qibla Finder, Hadith, Adhkar & more.",
    siteName: "Sakinah",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00261a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${scheherazade.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full bg-[--background] text-[--on-surface] font-sans">
        <UILanguageProvider>
          <ThemeProvider>
            <ServiceWorkerRegistration />
            {/* Sidebar - hidden on mobile, visible on desktop */}
            <aside id="sidebar" className="sidebar hidden lg:block">
              {/* Brand */}
              <div className="flex items-center gap-3 px-5 py-5 border-b border-stone-100">
                <div className="w-8 h-8 rounded-full bg-[--primary-container] flex items-center justify-center">
                  <span className="text-white text-sm amiri font-bold">ن</span>
                </div>
                <span
                  className="text-xl font-bold text-[--primary-container]"
                  style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
                >
                  Sakinah
                </span>
              </div>

              {/* User greeting */}
              <div className="px-4 py-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[--primary-fixed] flex items-center justify-center text-[--primary-container] font-bold text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[--on-surface]">
                      Abdullah
                    </div>
                    <div
                      className="text-xs text-[--outline]"
                      id="sidebar-hijri"
                    >
                      Loading date...
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-3 space-y-0.5">
                <a
                  href="/"
                  className="nav-item active w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">home</span>{" "}
                  Home
                </a>
                <a
                  href="/surah"
                  className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">menu_book</span>{" "}
                  Quran
                </a>
                <a
                  href="/settings"
                  className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">schedule</span>{" "}
                  Prayer Times
                </a>
                <a
                  href="#"
                  className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">explore</span>{" "}
                  Qibla Finder
                </a>
                <a
                  href="#"
                  className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">history_edu</span>{" "}
                  Hadith Library
                </a>
                <a
                  href="#"
                  className="nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm"
                >
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>{" "}
                  Adhkar & Tasbih
                </a>
              </nav>

              <div className="px-4 py-4 border-t border-stone-100">
                <div className="text-xs text-[--outline] text-center">
                  بسم الله الرحمن الرحيم
                </div>
              </div>
            </aside>

            {/* Main wrapper */}
            <div id="app-wrapper" className="lg:ml-[260px]">
              {/* Mobile header - only shown on mobile */}
              <MobileHeader />

              {/* Main content */}
              <main id="main-content" className="flex-1" role="main">
                {children}
              </main>

              {/* Mobile bottom nav - only shown on mobile */}
              <nav id="bottom-nav" className="bottom-nav lg:hidden">
                <a
                  href="/"
                  className="flex flex-col items-center gap-1 px-3 text-[--primary-container]"
                >
                  <span className="material-symbols-outlined text-2xl icon-fill">
                    home
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    Home
                  </span>
                </a>
                <a
                  href="/surah"
                  className="flex flex-col items-center gap-1 px-3 text-stone-400"
                >
                  <span className="material-symbols-outlined text-2xl">
                    menu_book
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    Quran
                  </span>
                </a>
                <a
                  href="/settings"
                  className="flex flex-col items-center gap-1 px-3 text-stone-400"
                >
                  <span className="material-symbols-outlined text-2xl">
                    schedule
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    Prayer
                  </span>
                </a>
                <a
                  href="#"
                  className="flex flex-col items-center gap-1 px-3 text-stone-400"
                >
                  <span className="material-symbols-outlined text-2xl">
                    explore
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    Qibla
                  </span>
                </a>
                <a
                  href="/search"
                  className="flex flex-col items-center gap-1 px-3 text-stone-400"
                >
                  <span className="material-symbols-outlined text-2xl">
                    search
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    Search
                  </span>
                </a>
              </nav>
            </div>
          </ThemeProvider>
        </UILanguageProvider>
      </body>
    </html>
  );
}
