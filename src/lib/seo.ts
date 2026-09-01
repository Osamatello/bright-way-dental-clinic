import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";

const productionUrl = "https://bright-way-dental-clinic.vercel.app";

export function getBaseUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : productionUrl);

  return configuredUrl.replace(/\/+$/, "");
}

export const siteConfig = {
  name: {
    en: "Bright Way Dental Clinic",
    ar: "عيادة برايت واي لطب الأسنان",
  },
  defaultOgImage: "/images/bright-way-clinic-hero.webp",
};

export function getCanonicalUrl(locale: string, path = ""): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const pathSegment = cleanPath ? `/${cleanPath}` : "";
  return `${getBaseUrl()}/${locale}${pathSegment}`;
}

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
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: siteName }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: { index: false, follow: false, nocache: true },
    }),
  };
}
