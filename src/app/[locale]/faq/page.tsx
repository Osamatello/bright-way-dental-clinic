import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { FaqPage as FaqContent } from "@/components/faq/faq-page";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildFaqSchema } from "@/lib/schema";
import { createPageMetadata } from "@/lib/seo";

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

const faqPaths = [
  "categories.firstVisit.items.whatHappens",
  "categories.firstVisit.items.duration",
  "categories.firstVisit.items.whatToBring",
  "categories.appointments.items.howToBook",
  "categories.appointments.items.rescheduling",
  "categories.appointments.items.confirmation",
  "categories.comfort.items.anxiousPatients",
  "categories.comfort.items.painManagement",
  "categories.comfort.items.calmingSetting",
  "categories.treatments.items.customPlans",
  "categories.treatments.items.multipleVisits",
  "categories.treatments.items.secondOpinions",
  "categories.emergency.items.emergencyDefinition",
  "categories.emergency.items.whatToDoFirst",
  "categories.emergency.items.urgentContact",
  "categories.fees.items.costEstimates",
  "categories.fees.items.insuranceAccepted",
  "categories.fees.items.paymentMethods",
] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "FaqPage.metadata" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as AppLocale,
    path: "faq",
  });
}

export default async function FaqPageRoute({ params }: FaqPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "FaqPage" });
  const faqItems = faqPaths.map((path) => ({
    question: t(`${path}.question`),
    answer: t(`${path}.answer`),
  }));
  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <JsonLd data={faqSchema} />
      <div className="bg-cream">
        <div className="site-container">
          <Breadcrumbs
            locale={appLocale}
            items={[{ label: t("hero.eyebrow"), path: "faq" }]}
          />
        </div>
      </div>
      <FaqContent locale={appLocale} />
    </>
  );
}
