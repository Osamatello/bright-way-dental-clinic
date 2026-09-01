import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { routing, type AppLocale } from "@/i18n/routing";

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

  return {
    metadataBase: new URL("https://brightwaydental.example"),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3EDE2",
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

  return (
    <html
      className={`${manrope.variable} ${newsreader.variable} ${ibmArabic.variable} ${notoNaskh.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader locale={appLocale} />
          <main>{children}</main>
          <SiteFooter locale={appLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
