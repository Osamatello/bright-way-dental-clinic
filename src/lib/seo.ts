import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

/**
 * Authoritative base URL resolution.
 * Uses NEXT_PUBLIC_SITE_URL if configured; otherwise defaults to http://localhost:3000 for local development.
 * Never uses an unverified or invented production domain.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: {
    en: "Bright Way Dental Clinic",
    ar: "عيادة برايت واي لطب الأسنان",
  },
  defaultOgImage: "/images/bright-way-clinic-hero.webp",
};

/**
 * Generates the self-referencing canonical URL for a given locale and page path.
 */
export function getCanonicalUrl(locale: string, path = ""): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const localeSegment = `/${locale}`;
  const pathSegment = cleanPath ? `/${cleanPath}` : "";
  return `${getBaseUrl()}${localeSegment}${pathSegment}`;
}

/**
 * Generates international SEO language alternates.
 * x-default aligns with the root redirect to the default English locale (/en).
 */
export function getLanguageAlternates(path = ""): {
  canonical?: string;
  languages: Record<string, string>;
} {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const pathSegment = cleanPath ? `/${cleanPath}` : "";
  const baseUrl = getBaseUrl();

  return {
    languages: {
      en: `${baseUrl}/en${pathSegment}`,
      ar: `${baseUrl}/ar${pathSegment}`,
      "x-default": `${baseUrl}/en${pathSegment}`,
    },
  };
}

export type PageMetadataParams = {
  title: string;
  description: string;
  locale: AppLocale;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Standardized helper to produce consistent Next.js Metadata objects across all pages.
 */
export function createPageMetadata({
  title,
  description,
  locale,
  path = "",
  ogImage = siteConfig.defaultOgImage,
  noIndex = false,
}: PageMetadataParams): Metadata {
  const canonical = getCanonicalUrl(locale, path);
  const alternates = getLanguageAlternates(path);
  const siteName = siteConfig.name[locale] || siteConfig.name.en;
  const baseUrl = getBaseUrl();
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  const ogLocale = locale === "ar" ? "ar_AE" : "en_US";
  const alternateOgLocale = locale === "ar" ? "en_US" : "ar_AE";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: ogLocale,
      alternateLocale: alternateOgLocale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    }),
  };
}
