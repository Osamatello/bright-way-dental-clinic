import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { ButtonLink } from "../ui/button-link";
import { Breadcrumbs } from "../ui/breadcrumbs";

type DoctorPageProps = {
  locale: AppLocale;
};

export async function DoctorPage({ locale }: DoctorPageProps) {
  const [t, navT] = await Promise.all([
    getTranslations("Doctor"),
    getTranslations("Navigation"),
  ]);

  const approachSteps = [
    {
      number: t("approach.step1Number"),
      title: t("approach.step1Title"),
      body: t("approach.step1Body"),
    },
    {
      number: t("approach.step2Number"),
      title: t("approach.step2Title"),
      body: t("approach.step2Body"),
    },
    {
      number: t("approach.step3Number"),
      title: t("approach.step3Title"),
      body: t("approach.step3Body"),
    },
  ];

  const focusAreas = [
    {
      title: t("focusAreas.area1Title"),
      description: t("focusAreas.area1Description"),
      link: `/${locale}/treatments/general-dentistry`,
    },
    {
      title: t("focusAreas.area2Title"),
      description: t("focusAreas.area2Description"),
      link: `/${locale}/treatments/cosmetic-dentistry`,
    },
    {
      title: t("focusAreas.area3Title"),
      description: t("focusAreas.area3Description"),
      link: `/${locale}/treatments/dental-implants`,
    },
    {
      title: t("focusAreas.area4Title"),
      description: t("focusAreas.area4Description"),
      link: `/${locale}/treatments`,
    },
  ];

  const credentialItems = [
    {
      category: t("credentials.item1Category"),
      placeholder: t("credentials.item1Placeholder"),
    },
    {
      category: t("credentials.item2Category"),
      placeholder: t("credentials.item2Placeholder"),
    },
    {
      category: t("credentials.item3Category"),
      placeholder: t("credentials.item3Placeholder"),
    },
  ];

  return (
    <>
      {/* Doctor Hero */}
      <section className="bg-cream pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
        <div className="site-container">
          <Breadcrumbs
            className="mb-8"
            items={[{ label: navT("doctor") }]}
            locale={locale}
          />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
                {t("hero.eyebrow")}
              </p>
              <h1 className="display-heading mt-8 max-w-2xl text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.98] text-navy">
                {t("hero.title")}
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/${locale}/contact`}>
                  {t("appointment.primaryAction")}
                </ButtonLink>
                <ButtonLink href={`/${locale}/treatments`} variant="secondary">
                  {t("appointment.secondaryAction")}
                </ButtonLink>
              </div>
            </div>

            {/* Architectural Portrait Placeholder Frame */}
            <div
              aria-label={t("hero.portraitLabel")}
              className="relative min-h-[28rem] overflow-hidden bg-sand sm:min-h-[36rem]"
              role="img"
            >
              <div className="absolute inset-6 border border-navy/15 sm:inset-9" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="display-heading text-[7rem] leading-none text-navy/12 sm:text-[10rem]">
                  BW
                </span>
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 border-t border-navy/20 pt-4 sm:inset-x-9 sm:bottom-9">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-navy/60">
                  {t("hero.portraitLabel")}
                </p>
                <p className="max-w-56 text-end text-xs leading-5 text-navy/60">
                  {t("hero.portraitPlaceholder")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Ethos / Philosophy */}
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
              <blockquote className="display-heading max-w-3xl text-2xl leading-[1.2] text-navy/80 sm:text-3xl lg:text-4xl">
                {t("philosophy.quote")}
              </blockquote>

              <div className="mt-10 space-y-6 text-base leading-8 text-slate sm:text-lg sm:leading-9">
                <p>{t("philosophy.body1")}</p>
                <p>{t("philosophy.body2")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach to Patient Care */}
      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="border-b fine-rule pb-12">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("approach.eyebrow")}
            </p>
            <h2 className="display-heading mt-6 max-w-2xl text-4xl leading-[1.08] text-navy sm:text-5xl">
              {t("approach.title")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate">
              {t("approach.description")}
            </p>
          </div>

          <div className="grid gap-8 pt-12 md:grid-cols-3 lg:gap-12">
            {approachSteps.map((step) => (
              <div
                className="flex flex-col justify-between border border-navy/10 bg-ivory/40 p-8"
                key={step.number}
              >
                <div>
                  <span className="font-sans text-xs font-semibold text-slate">
                    {step.number}
                  </span>
                  <h3 className="display-heading mt-6 text-2xl text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Clinical Focus */}
      <section className="bg-cream py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                {t("focusAreas.eyebrow")}
              </p>
              <h2 className="display-heading mt-8 max-w-md text-4xl leading-[1.08] text-navy sm:text-5xl">
                {t("focusAreas.title")}
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-slate sm:text-base">
                {t("focusAreas.description")}
              </p>
            </div>

            <div className="border-t fine-rule">
              {focusAreas.map((area) => (
                <Link
                  className="group grid gap-3 border-b fine-rule py-7 transition-colors hover:bg-navy/5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:py-8 sm:px-4"
                  href={area.link}
                  key={area.title}
                >
                  <div>
                    <h3 className="display-heading text-2xl text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl rtl:group-hover:-translate-x-1">
                      {area.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-slate">
                      {area.description}
                    </p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center border border-navy/20 text-sm transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Accreditations Framework */}
      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="border-t fine-rule pt-8 lg:pt-10">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("credentials.eyebrow")}
                </p>
                <h2 className="display-heading mt-8 max-w-md text-3xl leading-[1.12] text-navy sm:text-4xl">
                  {t("credentials.title")}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-slate">
                  {t("credentials.description")}
                </p>

                {/* Professional Framework Notice Box */}
                <div className="mt-8 border border-navy/15 bg-cream/70 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-navy">
                    {t("credentials.noticeTitle")}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate">
                    {t("credentials.noticeBody")}
                  </p>
                </div>
              </div>

              <div>
                <div className="border-t fine-rule">
                  {credentialItems.map((item, index) => (
                    <div
                      className="grid gap-3 border-b fine-rule py-6 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:py-7"
                      key={index}
                    >
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate">
                        {item.category}
                      </span>
                      <p className="text-sm leading-7 text-navy/70 italic">
                        {item.placeholder}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  href={`/${locale}/treatments`}
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
