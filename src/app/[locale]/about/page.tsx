import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AboutPage as AboutContent } from "@/components/about/about-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { routing, type AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "About.metadata" });
  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as AppLocale,
    path: "about",
  });
}

export default async function AboutPageRoute({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "About.metadata" });

  return (
    <>
      <div className="bg-cream">
        <div className="site-container">
          <Breadcrumbs locale={appLocale} items={[{ label: t("title") }]} />
        </div>
      </div>
      <AboutContent locale={appLocale} />
    </>
  );
}
