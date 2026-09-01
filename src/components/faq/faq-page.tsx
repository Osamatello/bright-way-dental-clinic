import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { ButtonLink } from "../ui/button-link";
import { FaqAccordion } from "../ui/faq-accordion";

type FaqPageProps = {
  locale: AppLocale;
};

export async function FaqPage({ locale }: FaqPageProps) {
  const t = await getTranslations("FaqPage");

  const categories = [
    {
      id: "firstVisit",
      eyebrow: t("categories.firstVisit.eyebrow"),
      title: t("categories.firstVisit.title"),
      description: t("categories.firstVisit.description"),
      items: [
        {
          id: "fv-whatHappens",
          question: t("categories.firstVisit.items.whatHappens.question"),
          answer: t("categories.firstVisit.items.whatHappens.answer"),
        },
        {
          id: "fv-duration",
          question: t("categories.firstVisit.items.duration.question"),
          answer: t("categories.firstVisit.items.duration.answer"),
        },
        {
          id: "fv-whatToBring",
          question: t("categories.firstVisit.items.whatToBring.question"),
          answer: t("categories.firstVisit.items.whatToBring.answer"),
        },
      ],
    },
    {
      id: "appointments",
      eyebrow: t("categories.appointments.eyebrow"),
      title: t("categories.appointments.title"),
      description: t("categories.appointments.description"),
      items: [
        {
          id: "app-howToBook",
          question: t("categories.appointments.items.howToBook.question"),
          answer: t("categories.appointments.items.howToBook.answer"),
        },
        {
          id: "app-rescheduling",
          question: t("categories.appointments.items.rescheduling.question"),
          answer: t("categories.appointments.items.rescheduling.answer"),
        },
        {
          id: "app-confirmation",
          question: t("categories.appointments.items.confirmation.question"),
          answer: t("categories.appointments.items.confirmation.answer"),
        },
      ],
    },
    {
      id: "comfort",
      eyebrow: t("categories.comfort.eyebrow"),
      title: t("categories.comfort.title"),
      description: t("categories.comfort.description"),
      items: [
        {
          id: "com-anxious",
          question: t("categories.comfort.items.anxiousPatients.question"),
          answer: t("categories.comfort.items.anxiousPatients.answer"),
        },
        {
          id: "com-pain",
          question: t("categories.comfort.items.painManagement.question"),
          answer: t("categories.comfort.items.painManagement.answer"),
        },
        {
          id: "com-setting",
          question: t("categories.comfort.items.calmingSetting.question"),
          answer: t("categories.comfort.items.calmingSetting.answer"),
        },
      ],
    },
    {
      id: "treatments",
      eyebrow: t("categories.treatments.eyebrow"),
      title: t("categories.treatments.title"),
      description: t("categories.treatments.description"),
      items: [
        {
          id: "trt-custom",
          question: t("categories.treatments.items.customPlans.question"),
          answer: t("categories.treatments.items.customPlans.answer"),
        },
        {
          id: "trt-multiple",
          question: t("categories.treatments.items.multipleVisits.question"),
          answer: t("categories.treatments.items.multipleVisits.answer"),
        },
        {
          id: "trt-second",
          question: t("categories.treatments.items.secondOpinions.question"),
          answer: t("categories.treatments.items.secondOpinions.answer"),
        },
      ],
    },
    {
      id: "emergency",
      eyebrow: t("categories.emergency.eyebrow"),
      title: t("categories.emergency.title"),
      description: t("categories.emergency.description"),
      items: [
        {
          id: "emg-definition",
          question: t("categories.emergency.items.emergencyDefinition.question"),
          answer: t("categories.emergency.items.emergencyDefinition.answer"),
        },
        {
          id: "emg-first",
          question: t("categories.emergency.items.whatToDoFirst.question"),
          answer: t("categories.emergency.items.whatToDoFirst.answer"),
        },
        {
          id: "emg-contact",
          question: t("categories.emergency.items.urgentContact.question"),
          answer: t("categories.emergency.items.urgentContact.answer"),
        },
      ],
    },
    {
      id: "fees",
      eyebrow: t("categories.fees.eyebrow"),
      title: t("categories.fees.title"),
      description: t("categories.fees.description"),
      items: [
        {
          id: "fee-estimates",
          question: t("categories.fees.items.costEstimates.question"),
          answer: t("categories.fees.items.costEstimates.answer"),
        },
        {
          id: "fee-insurance",
          question: t("categories.fees.items.insuranceAccepted.question"),
          answer: t("categories.fees.items.insuranceAccepted.answer"),
        },
        {
          id: "fee-methods",
          question: t("categories.fees.items.paymentMethods.question"),
          answer: t("categories.fees.items.paymentMethods.answer"),
        },
      ],
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

      {/* Categorized FAQ Sections */}
      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="site-container space-y-24 sm:space-y-32">
          {categories.map((cat) => (
            <div
              className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
              id={cat.id}
              key={cat.id}
            >
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {cat.eyebrow}
                </p>
                <h2 className="display-heading mt-6 max-w-md text-3xl leading-[1.12] text-navy sm:text-4xl">
                  {cat.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate">
                  {cat.description}
                </p>
              </div>

              <div>
                <FaqAccordion items={cat.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="border border-navy/15 bg-cream p-8 sm:p-14 lg:p-20">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("contactCta.eyebrow")}
                </p>
                <h2 className="display-heading mt-6 max-w-lg text-3xl leading-[1.1] text-navy sm:text-4xl lg:text-5xl">
                  {t("contactCta.title")}
                </h2>
              </div>
              <div className="lg:border-s lg:border-navy/15 lg:ps-16">
                <p className="max-w-xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
                  {t("contactCta.description")}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <ButtonLink href={`/${locale}/contact`}>
                    {t("contactCta.primaryAction")}
                  </ButtonLink>
                  <ButtonLink href={`/${locale}/treatments`} variant="secondary">
                    {t("contactCta.secondaryAction")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
