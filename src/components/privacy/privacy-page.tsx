import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

type PrivacyPageProps = {
  locale: AppLocale;
};

export async function PrivacyPage({ locale }: PrivacyPageProps) {
  const t = await getTranslations("Privacy");

  const sections = [
    {
      title: t("sections.intro.title"),
      body: t("sections.intro.body"),
    },
    {
      title: t("sections.collection.title"),
      body: t("sections.collection.body"),
    },
    {
      title: t("sections.usage.title"),
      body: t("sections.usage.body"),
    },
    {
      title: t("sections.cookies.title"),
      body: t("sections.cookies.body"),
    },
    {
      title: t("sections.thirdParty.title"),
      body: t("sections.thirdParty.body"),
    },
    {
      title: t("sections.rights.title"),
      body: t("sections.rights.body"),
    },
    {
      title: t("sections.contact.title"),
      body: t("sections.contact.body"),
    },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="site-container">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
            {t("hero.eyebrow")}
          </p>
          <h1 className="display-heading mt-8 max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate">
            {t("hero.lastUpdated")}
          </p>

          {/* Draft Notice Box */}
          <div className="mt-10 border border-navy/15 bg-ivory p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy">
              Notice
            </p>
            <p className="mt-2 max-w-3xl text-xs leading-6 text-slate sm:text-sm sm:leading-7">
              {t("hero.draftNotice")}
            </p>
          </div>
        </div>
      </section>

      {/* Structured Policy Content */}
      <section className="bg-ivory py-16 sm:py-24 lg:py-28">
        <div className="site-container">
          <div className="max-w-3xl border-t fine-rule">
            {sections.map((section, index) => (
              <article className="border-b fine-rule py-8 sm:py-10" key={index}>
                <h2 className="display-heading text-2xl text-navy sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate sm:text-base sm:leading-8">
                  {section.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              className="text-xs font-semibold uppercase tracking-[0.14em] text-navy underline underline-offset-4 transition-colors hover:text-slate"
              href={`/${locale}/contact`}
            >
              ← {t("sections.contact.title")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
