import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomePage as HomePageContent } from "@/components/home/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import { routing, type AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";
import { buildFaqSchema } from "@/lib/schema";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [t, metaT] = await Promise.all([
    getTranslations({ locale, namespace: "Home.hero" }),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  const appLocale = locale as AppLocale;
  const title = metaT("title");
  const description = t("description");

  return createPageMetadata({
    title,
    description,
    locale: appLocale,
    path: "",
  });
}

const homeFaqKeys = [
  "firstVisit",
  "booking",
  "nervous",
  "insurance",
  "treatmentTime",
  "emergency",
] as const;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;

  const t = await getTranslations({ locale, namespace: "Home.faq" });
  const faqItems = homeFaqKeys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));
  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomePageContent locale={appLocale} />
    </>
  );
}
