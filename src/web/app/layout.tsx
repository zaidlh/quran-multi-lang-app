import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quran Multi-Language App",
  description:
    "Read the Holy Quran with translations in 10+ languages, listen to recitations, and explore tafsir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
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
      </body>
    </html>
  );
}
