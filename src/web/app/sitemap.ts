import type { MetadataRoute } from "next";

const BASE_URL = "https://quran-multi-lang-app.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const surahs: MetadataRoute.Sitemap = Array.from({ length: 114 }, (_, i) => ({
    url: `${BASE_URL}/surah/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/juz`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...surahs,
  ];
}
