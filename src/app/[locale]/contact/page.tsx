import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ContactPage as ContactContent } from "@/components/contact/contact-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { routing, type AppLocale } from "@/i18n/routing";
import { createPageMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Contact.metadata" });
  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as AppLocale,
    path: "contact",
  });
}

export default async function ContactPageRoute({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "Contact.metadata" });

  return (
    <>
      <div className="bg-cream">
        <div className="site-container">
          <Breadcrumbs locale={appLocale} items={[{ label: t("title") }]} />
        </div>
      </div>
      <ContactContent locale={appLocale} />
    </>
  );
}
