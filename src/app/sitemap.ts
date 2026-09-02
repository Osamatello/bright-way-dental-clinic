import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const allPaths = [""];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const locale of routing.locales) {
      const cleanPath = path ? `/${path}` : "";
      const url = `${baseUrl}/${locale}${cleanPath}`;

      sitemapEntries.push({
        url,
        alternates: {
          languages: {
            en: `${baseUrl}/en${cleanPath}`,
            ar: `${baseUrl}/ar${cleanPath}`,
            "x-default": `${baseUrl}/en${cleanPath}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
