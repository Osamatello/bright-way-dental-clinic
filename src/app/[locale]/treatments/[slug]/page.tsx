import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { TreatmentDetail } from "@/components/treatments/treatment-detail";
import { getTreatment, treatmentSlugs, type TreatmentSlug } from "@/data/treatments";
import { routing, type AppLocale } from "@/i18n/routing";

type TreatmentDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    treatmentSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: TreatmentDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  if (!treatmentSlugs.includes(slug as TreatmentSlug)) notFound();

  const t = await getTranslations({
    locale,
    namespace: "Treatments.items",
  });

  const title = t(`${slug}.title`);
  const description = t(`${slug}.shortDescription`);

  return {
    title,
    description,
  };
}

export default async function TreatmentDetailPage({
  params,
}: TreatmentDetailPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  setRequestLocale(locale);

  return (
    <TreatmentDetail
      locale={locale as AppLocale}
      slug={treatment.slug}
      number={treatment.number}
    />
  );
}
