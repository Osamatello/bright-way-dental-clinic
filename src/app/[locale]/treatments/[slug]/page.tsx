import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { TreatmentDetail } from "@/components/treatments/treatment-detail";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getTreatment, treatmentSlugs, type TreatmentSlug } from "@/data/treatments";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildTreatmentSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

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

  const t = await getTranslations({ locale, namespace: "Treatments.items" });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.shortDescription`);

  return createPageMetadata({
    title,
    description,
    locale: locale as AppLocale,
    path: `treatments/${slug}`,
  });
}

export default async function TreatmentDetailPage({
  params,
}: TreatmentDetailPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const [itemsT, overviewT] = await Promise.all([
    getTranslations({ locale, namespace: "Treatments.items" }),
    getTranslations({ locale, namespace: "Treatments.overview" }),
  ]);

  const title = itemsT(`${treatment.slug}.title`);
  const description = itemsT(`${treatment.slug}.shortDescription`);
  const treatmentSchema = buildTreatmentSchema(
    appLocale,
    treatment.slug,
    title,
    description
  );

  return (
    <>
      <JsonLd data={treatmentSchema} />
      <div className="bg-cream">
        <div className="site-container">
          <Breadcrumbs
            locale={appLocale}
            items={[
              { label: overviewT("eyebrow"), path: "treatments" },
              { label: title, path: `treatments/${treatment.slug}` },
            ]}
          />
        </div>
      </div>
      <TreatmentDetail
        locale={appLocale}
        slug={treatment.slug}
        number={treatment.number}
      />
    </>
  );
}
