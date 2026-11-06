import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Quran text/translations in ./data are read from disk at request time (surah pages
  // and /api/search), so they must be bundled into the serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/surah/[id]": ["./data/text/**/*.json"],
    "/api/search": ["./data/text/**/*.json"],
    "/": ["./data/text/metadata.json"],
    "/juz": ["./data/text/metadata.json"],
    "/mushaf": ["./data/text/metadata.json"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
