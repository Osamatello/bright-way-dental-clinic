import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { ButtonLink } from "../ui/button-link";
import { Breadcrumbs } from "../ui/breadcrumbs";

type AboutPageProps = {
  locale: AppLocale;
};

export async function AboutPage({ locale }: AboutPageProps) {
  const [t, navT] = await Promise.all([
    getTranslations("About"),
    getTranslations("Navigation"),
  ]);

  const philosophyPoints = [
    {
      number: t("philosophy.point1Number"),
      title: t("philosophy.point1Title"),
      body: t("philosophy.point1Body"),
    },
    {
      number: t("philosophy.point2Number"),
      title: t("philosophy.point2Title"),
      body: t("philosophy.point2Body"),
    },
    {
      number: t("philosophy.point3Number"),
      title: t("philosophy.point3Title"),
      body: t("philosophy.point3Body"),
    },
  ];

  const experiencePillars = [
    {
      title: t("experience.pillar1Title"),
      body: t("experience.pillar1Body"),
    },
    {
      title: t("experience.pillar2Title"),
      body: t("experience.pillar2Body"),
    },
    {
      title: t("experience.pillar3Title"),
      body: t("experience.pillar3Body"),
    },
  ];

  return (
    <>
      {/* Editorial Hero */}
      <section className="bg-cream pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="site-container">
          <Breadcrumbs
            className="mb-8"
            items={[{ label: navT("about") }]}
            locale={locale}
          />
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
            {t("hero.eyebrow")}
          </p>
          <h1 className="display-heading mt-8 max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.96] text-navy">
            {t("hero.title")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {t("hero.description")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/${locale}/contact`}>
              {t("hero.primaryAction")}
            </ButtonLink>
            <ButtonLink href={`/${locale}/doctor`} variant="secondary">
              {t("hero.secondaryAction")}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("philosophy.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-md text-4xl leading-[1.08] text-navy sm:text-5xl">
                {t("philosophy.title")}
              </h2>
            </div>

            <div className="border-t fine-rule pt-8 lg:pt-10">
              <p className="display-heading max-w-3xl text-3xl leading-[1.14] text-navy/75 sm:text-4xl">
                {t("philosophy.statement")}
              </p>

              <div className="mt-12 border-t fine-rule">
                {philosophyPoints.map((point) => (
                  <div
                    className="grid gap-4 border-b fine-rule py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-10"
                    key={point.number}
                  >
                    <span className="font-sans text-xs font-semibold text-slate">
                      {point.number}
                    </span>
                    <div>
                      <h3 className="display-heading text-2xl text-navy sm:text-3xl">
                        {point.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-8 text-slate sm:text-base">
                        {point.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience Narrative */}
      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("experience.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-xl text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-[3.5rem]">
                {t("experience.title")}
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-9 text-navy/80 sm:text-xl sm:leading-10">
                {t("experience.lead")}
              </p>
            </div>

            <div className="border-t fine-rule pt-8 lg:pt-10">
              <div className="space-y-6 text-base leading-8 text-slate sm:text-lg sm:leading-9">
                <p>{t("experience.body1")}</p>
                <p>{t("experience.body2")}</p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {experiencePillars.map((pillar, index) => (
                  <div
                    className="border border-navy/10 bg-ivory/60 p-6 transition-colors hover:border-navy/20"
                    key={index}
                  >
                    <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-navy">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-slate">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-linking Teasers: Doctor & Treatments */}
      <section className="bg-cream py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Doctor Teaser */}
            <article className="flex flex-col justify-between border border-navy/15 bg-ivory p-8 sm:p-12">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("doctorTeaser.eyebrow")}
                </p>
                <h3 className="display-heading mt-6 text-3xl text-navy sm:text-4xl">
                  {t("doctorTeaser.title")}
                </h3>
                <p className="mt-5 text-sm leading-8 text-slate sm:text-base">
                  {t("doctorTeaser.description")}
                </p>
              </div>
              <div className="mt-8 pt-6">
                <ButtonLink href={`/${locale}/doctor`} variant="secondary">
                  {t("doctorTeaser.action")}
                </ButtonLink>
              </div>
            </article>

            {/* Treatments Teaser */}
            <article className="flex flex-col justify-between border border-navy/15 bg-ivory p-8 sm:p-12">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("treatmentsTeaser.eyebrow")}
                </p>
                <h3 className="display-heading mt-6 text-3xl text-navy sm:text-4xl">
                  {t("treatmentsTeaser.title")}
                </h3>
                <p className="mt-5 text-sm leading-8 text-slate sm:text-base">
                  {t("treatmentsTeaser.description")}
                </p>
              </div>
              <div className="mt-8 pt-6">
                <ButtonLink href={`/${locale}/treatments`} variant="secondary">
                  {t("treatmentsTeaser.action")}
                </ButtonLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="bg-navy py-20 text-white sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-white/50">
                {t("appointment.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-xl text-4xl leading-[1.06] text-white sm:text-5xl lg:text-6xl">
                {t("appointment.title")}
              </h2>
            </div>
            <div className="lg:border-s lg:border-white/15 lg:ps-16">
              <p className="max-w-xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
                {t("appointment.description")}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={`/${locale}/contact`} variant="light">
                  {t("appointment.primaryAction")}
                </ButtonLink>
                <ButtonLink
                  className="border-white/30 text-white hover:border-white hover:bg-white hover:text-navy"
                  href={`/${locale}/contact#clinic-details`}
                  variant="secondary"
                >
                  {t("appointment.secondaryAction")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
