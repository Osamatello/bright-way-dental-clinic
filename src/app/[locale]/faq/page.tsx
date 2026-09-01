import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { FaqPage as FaqContent } from "@/components/faq/faq-page";
import { routing, type AppLocale } from "@/i18n/routing";

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "FaqPage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FaqPageRoute({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <FaqContent locale={locale as AppLocale} />;
}
