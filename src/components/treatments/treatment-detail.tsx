import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import {
  getRelatedTreatments,
  type TreatmentSlug,
} from "@/data/treatments";

import { ButtonLink } from "../ui/button-link";

type TreatmentDetailProps = {
  locale: AppLocale;
  slug: TreatmentSlug;
  number: string;
};

export async function TreatmentDetail({
  locale,
  slug,
  number,
}: TreatmentDetailProps) {
  const t = await getTranslations("Treatments.detail");
  const itemsT = await getTranslations("Treatments.items");
  const navT = await getTranslations("Navigation");

  const title = itemsT(`${slug}.title`);
  const intro = itemsT(`${slug}.intro`);
  const whatIs = itemsT(`${slug}.whatIs`);
  const whoBenefits = itemsT(`${slug}.whoBenefits`);
  const whatToExpect = itemsT(`${slug}.whatToExpect`);
  const comfort = itemsT(`${slug}.comfort`);

  const processSteps = itemsT.raw(`${slug}.processSteps`) as string[];
  const related = getRelatedTreatments(slug);

  return (
    <>
      <section className="bg-cream pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="site-container">
          <Link
            className="text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-slate transition-colors hover:text-navy"
            href={`/${locale}/treatments`}
          >
            ← {t("backToOverview")}
          </Link>
          <p className="mt-10 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
            {t("eyebrow")} · {number}
          </p>
          <h1 className="display-heading mt-8 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.96] text-navy">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {intro}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/${locale}#appointment`}>
              {t("bookAction")}
            </ButtonLink>
            <ButtonLink
              href={`/${locale}#contact-section`}
              variant="secondary"
            >
              {t("contactAction")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28 lg:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="border-t fine-rule pt-8 lg:pt-10">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("whatIsLabel")}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-navy/80">
              {whatIs}
            </p>
          </div>
          <div className="border-t fine-rule pt-8 lg:pt-10">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("whoBenefitsLabel")}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-navy/80">
              {whoBenefits}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="site-container">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
            {t("whatToExpectLabel")}
          </p>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-navy/80 sm:text-xl sm:leading-10">
            {whatToExpect}
          </p>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28 lg:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("processLabel")}
            </p>
            <h2 className="display-heading mt-8 max-w-md text-4xl leading-[1.08] text-navy sm:text-5xl">
              {title}
            </h2>
          </div>
          <div className="border-t fine-rule">
            {processSteps.map((step, index) => (
              <div
                className="grid gap-3 border-b fine-rule py-7 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-9"
                key={index}
              >
                <p className="text-xs font-medium text-slate">
                  {t("processSteps.stepLabel")} {String(index + 1).padStart(2, "0")}
                </p>
                <p className="max-w-md text-base leading-8 text-navy/80">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white sm:py-28 lg:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-white/45">
            {t("comfortLabel")}
          </p>
          <p className="display-heading max-w-3xl text-3xl leading-[1.14] text-white/72 sm:text-4xl">
            {comfort}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory py-20 sm:py-28 lg:py-32">
          <div className="site-container">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("relatedLabel")}
            </p>
            <div className="mt-10 border-t fine-rule">
              {related.map((relTreatment) => (
                <Link
                  className="group grid gap-5 border-b fine-rule py-7 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-8 sm:py-9"
                  href={`/${locale}/treatments/${relTreatment.slug}`}
                  key={relTreatment.slug}
                >
                  <p className="text-xs font-medium text-slate">
                    {relTreatment.number}
                  </p>
                  <h3 className="display-heading text-2xl text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl rtl:group-hover:-translate-x-1">
                    {itemsT(`${relTreatment.slug}.title`)}
                  </h3>
                  <span className="grid size-11 place-items-center border border-navy/20 text-lg transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                    <span aria-hidden="true">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream py-20 sm:py-28 lg:py-32" id="appointment">
        <div className="site-container grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {navT("book")}
            </p>
          </div>
          <div>
            <h2 className="display-heading max-w-4xl text-4xl leading-[1.04] text-navy sm:text-5xl lg:text-[4rem]">
              {title}
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}#appointment`}>
                {t("bookAction")}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}#contact-section`}
                variant="secondary"
              >
                {t("contactAction")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
