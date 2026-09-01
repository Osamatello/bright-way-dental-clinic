import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ResultsPage as ResultsContent } from "@/components/results/results-page";
import { routing, type AppLocale } from "@/i18n/routing";

type ResultsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ResultsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Results.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ResultsPageRoute({ params }: ResultsPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <ResultsContent locale={locale as AppLocale} />;
}
