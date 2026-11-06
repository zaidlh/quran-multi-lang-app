import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/juz", priority: 0.7, changeFrequency: "monthly" },
    { path: "/mushaf", priority: 0.7, changeFrequency: "monthly" },
    { path: "/search", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reading-plans", priority: 0.5, changeFrequency: "monthly" },
    { path: "/prayer", priority: 0.5, changeFrequency: "monthly" },
    { path: "/calendar", priority: 0.5, changeFrequency: "monthly" },
    { path: "/about", priority: 0.3, changeFrequency: "yearly" },
  ] as const;

  const surahs: MetadataRoute.Sitemap = Array.from({ length: 114 }, (_, i) => ({
    url: `${SITE_URL}/surah/${i + 1}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...surahs,
  ];
}
