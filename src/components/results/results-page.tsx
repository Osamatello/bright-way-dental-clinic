import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { ButtonLink } from "../ui/button-link";

type ResultsPageProps = {
  locale: AppLocale;
};

export async function ResultsPage({ locale }: ResultsPageProps) {
  const t = await getTranslations("Results");

  const integrityPrinciples = [
    {
      title: t("integrity.principle1Title"),
      body: t("integrity.principle1Body"),
    },
    {
      title: t("integrity.principle2Title"),
      body: t("integrity.principle2Body"),
    },
    {
      title: t("integrity.principle3Title"),
      body: t("integrity.principle3Body"),
    },
  ];

  const cases = [
    {
      id: "case1",
      category: t("galleryFramework.case1.category"),
      title: t("galleryFramework.case1.title"),
      treatment: t("galleryFramework.case1.treatment"),
      beforeLabel: t("galleryFramework.case1.beforeLabel"),
      afterLabel: t("galleryFramework.case1.afterLabel"),
      placeholderText: t("galleryFramework.case1.placeholderText"),
      description: t("galleryFramework.case1.description"),
      note: t("galleryFramework.case1.note"),
    },
    {
      id: "case2",
      category: t("galleryFramework.case2.category"),
      title: t("galleryFramework.case2.title"),
      treatment: t("galleryFramework.case2.treatment"),
      beforeLabel: t("galleryFramework.case2.beforeLabel"),
      afterLabel: t("galleryFramework.case2.afterLabel"),
      placeholderText: t("galleryFramework.case2.placeholderText"),
      description: t("galleryFramework.case2.description"),
      note: t("galleryFramework.case2.note"),
    },
    {
      id: "case3",
      category: t("galleryFramework.case3.category"),
      title: t("galleryFramework.case3.title"),
      treatment: t("galleryFramework.case3.treatment"),
      beforeLabel: t("galleryFramework.case3.beforeLabel"),
      afterLabel: t("galleryFramework.case3.afterLabel"),
      placeholderText: t("galleryFramework.case3.placeholderText"),
      description: t("galleryFramework.case3.description"),
      note: t("galleryFramework.case3.note"),
    },
  ];

  return (
    <>
      {/* Editorial Hero */}
      <section className="bg-cream pt-16 pb-14 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="site-container">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
            {t("hero.eyebrow")}
          </p>
          <h1 className="display-heading mt-8 max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.96] text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Standards & Integrity Section */}
      <section className="bg-ivory py-20 sm:py-28 lg:py-32">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("integrity.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-md text-4xl leading-[1.08] text-navy sm:text-5xl">
                {t("integrity.title")}
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-slate">
                {t("integrity.description")}
              </p>
            </div>

            <div className="border-t fine-rule pt-8 lg:pt-10">
              <div className="grid gap-6">
                {integrityPrinciples.map((principle, index) => (
                  <div
                    className="border border-navy/10 bg-white/70 p-6 sm:p-8"
                    key={index}
                  >
                    <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate">
                      0{index + 1}
                    </span>
                    <h3 className="display-heading mt-4 text-2xl text-navy">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate">
                      {principle.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Framework & Case Placeholders */}
      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-6 border-b fine-rule pb-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("galleryFramework.eyebrow")}
              </p>
              <h2 className="display-heading mt-4 text-3xl text-navy sm:text-4xl lg:text-5xl">
                {t("galleryFramework.title")}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 border border-navy/15 bg-cream/70 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate">
              <span className="size-2 rounded-full bg-sand" />
              <span>{t("galleryFramework.statusBadge")}</span>
            </div>
          </div>

          {/* Structured Case Cards */}
          <div className="mt-14 space-y-16 lg:space-y-20">
            {cases.map((caseItem, index) => (
              <article
                className="border border-navy/15 bg-ivory p-6 sm:p-10 lg:p-14"
                key={caseItem.id}
              >
                {/* Header info */}
                <div className="flex flex-col justify-between gap-4 border-b fine-rule pb-8 sm:flex-row sm:items-center">
                  <div>
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate">
                      Case 0{index + 1} · {caseItem.category}
                    </span>
                    <h3 className="display-heading mt-2 text-2xl text-navy sm:text-3xl lg:text-4xl">
                      {caseItem.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-slate sm:text-end">
                    {caseItem.treatment}
                  </span>
                </div>

                {/* Before / After Placeholder Frames */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {/* Before Frame */}
                  <div
                    aria-label={caseItem.beforeLabel}
                    className="relative min-h-[16rem] overflow-hidden border border-navy/15 bg-sand/60 p-6 sm:min-h-[20rem]"
                    role="img"
                  >
                    <div className="flex items-center justify-between border-b border-navy/15 pb-3">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-navy/70">
                        {caseItem.beforeLabel}
                      </span>
                      <span className="text-[0.62rem] text-slate">BW · 01</span>
                    </div>
                    <div className="grid h-[calc(100%-2rem)] place-items-center py-8 text-center">
                      <p className="max-w-xs text-xs leading-6 text-navy/55 italic">
                        {caseItem.placeholderText}
                      </p>
                    </div>
                  </div>

                  {/* After Frame */}
                  <div
                    aria-label={caseItem.afterLabel}
                    className="relative min-h-[16rem] overflow-hidden border border-navy/15 bg-sand/60 p-6 sm:min-h-[20rem]"
                    role="img"
                  >
                    <div className="flex items-center justify-between border-b border-navy/15 pb-3">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-navy/70">
                        {caseItem.afterLabel}
                      </span>
                      <span className="text-[0.62rem] text-slate">BW · 02</span>
                    </div>
                    <div className="grid h-[calc(100%-2rem)] place-items-center py-8 text-center">
                      <p className="max-w-xs text-xs leading-6 text-navy/55 italic">
                        {caseItem.placeholderText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Case Narrative & Doctor Note */}
                <div className="mt-8 grid gap-4 border-t fine-rule pt-6 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
                  <p className="text-sm leading-7 text-slate">
                    {caseItem.description}
                  </p>
                  <p className="text-xs leading-6 text-slate/80 italic lg:border-s lg:border-navy/15 lg:ps-6">
                    {caseItem.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation & Next Steps */}
      <section className="bg-cream py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("consultation.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-xl text-4xl leading-[1.06] text-navy sm:text-5xl lg:text-6xl">
                {t("consultation.title")}
              </h2>
            </div>
            <div className="lg:border-s lg:border-navy/15 lg:ps-16">
              <p className="max-w-xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
                {t("consultation.description")}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={`/${locale}/contact`}>
                  {t("consultation.primaryAction")}
                </ButtonLink>
                <ButtonLink href={`/${locale}/treatments`} variant="secondary">
                  {t("consultation.secondaryAction")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
