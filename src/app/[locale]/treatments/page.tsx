import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { TreatmentsOverview } from "@/components/treatments/treatments-overview";
import { routing, type AppLocale } from "@/i18n/routing";

type TreatmentsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: TreatmentsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Treatments.overview" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return <TreatmentsOverview locale={locale as AppLocale} />;
}
