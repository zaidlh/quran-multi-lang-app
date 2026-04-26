import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Scheherazade_New } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";
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
  title: "Quran Multi-Language App",
  description:
    "Read the Holy Quran with translations in 10+ languages, listen to recitations, and explore tafsir.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Quran Multi-Language App",
    description:
      "Read the Holy Quran with translations in 10+ languages, listen to recitations, and explore tafsir.",
    siteName: "Quran Multi-Language App",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b6b4a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${scheherazade.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ServiceWorkerRegistration />
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500">
            <p>
              Quran Multi-Language App — Open Source (MIT) —{" "}
              <a
                href="https://github.com/zaidlh/quran-multi-lang-app"
                className="underline hover:text-primary"
              >
                GitHub
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
