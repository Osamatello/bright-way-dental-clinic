import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { BookingProvider } from "@/components/booking/booking-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildClinicSchema, buildWebSiteSchema } from "@/lib/schema";
import { getBaseUrl, getCanonicalUrl, getLanguageAlternates, siteConfig } from "@/lib/seo";

import "../globals.css";

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
});

const newsreader = localFont({
  src: "../fonts/newsreader-latin.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-newsreader",
});

const ibmArabic = localFont({
  src: [
    { path: "../fonts/ibm-plex-arabic-400.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-arabic-500.woff2", weight: "500" },
    { path: "../fonts/ibm-plex-arabic-600.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-ibm-arabic",
});

const notoNaskh = localFont({
  src: "../fonts/noto-naskh-arabic.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-naskh-arabic",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const appLocale = locale as AppLocale;
  const baseUrl = getBaseUrl();
  const canonical = getCanonicalUrl(appLocale);
  const alternates = getLanguageAlternates();
  const siteName = siteConfig.name[appLocale] || siteConfig.name.en;
  const ogImage = `${baseUrl}${siteConfig.defaultOgImage}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName,
      locale: appLocale === "ar" ? "ar_AE" : "en_US",
      alternateLocale: appLocale === "ar" ? "en_US" : "ar_AE",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B7274",
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const appLocale = locale as AppLocale;
  const globalSchema = [
    buildClinicSchema(appLocale),
    buildWebSiteSchema(appLocale),
  ];

  return (
    <html
      className={`${manrope.variable} ${newsreader.variable} ${ibmArabic.variable} ${notoNaskh.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body>
        <JsonLd data={globalSchema} />
        <NextIntlClientProvider messages={messages}>
          <BookingProvider>
            <SiteHeader locale={appLocale} />
            <main>{children}</main>
            <SiteFooter locale={appLocale} />
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
