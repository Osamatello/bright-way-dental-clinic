import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { TreatmentsOverview } from "@/components/treatments/treatments-overview";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { routing, type AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

type TreatmentsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: TreatmentsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Treatments.overview" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as AppLocale,
    path: "treatments",
  });
}

export default async function TreatmentsPage({ params }: TreatmentsPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Treatments.overview" });

  return (
    <>
      <div className="bg-cream">
        <div className="site-container">
          <Breadcrumbs
            locale={appLocale}
            items={[{ label: t("eyebrow"), path: "treatments" }]}
          />
        </div>
      </div>
      <TreatmentsOverview locale={appLocale} />
    </>
  );
}
