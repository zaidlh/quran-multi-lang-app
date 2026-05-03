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
  title: "Sakinah — Islamic Super App",
  description:
    "اقرأ القرآن الكريم مع ترجمات بأكثر من ١٠ لغات، واستمع للتلاوات، واستكشف التفسير. Read the Holy Quran with translations in 10+ languages, audio recitations, tafsir, prayer times, and more.",
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
    description: "اقرأ القرآن الكريم مع ترجمات بأكثر من ١٠ لغات، واستمع للتلاوات، واستكشف التفسير.",
    siteName: "Sakinah",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f3d2e",
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
      <body className="min-h-full">
        <UILanguageProvider>
          <ThemeProvider>
            <ServiceWorkerRegistration />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:inline-start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-container focus:text-white focus:rounded"
            >
              Skip to content
            </a>
            <Header />
            <div className="app-wrapper">
              <main id="main-content" role="main" className="min-h-screen pb-20 lg:pb-0">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </UILanguageProvider>
      </body>
    </html>
  );
}
