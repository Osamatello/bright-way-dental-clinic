import { getTranslations } from "next-intl/server";

import { SectionIntro } from "../ui/section-intro";

type PatientJourneyProps = {
  locale: "en" | "ar";
};

const journeyKeys = ["consultation", "planning", "care", "followUp"] as const;

export async function PatientJourney({}: PatientJourneyProps) {
  const t = await getTranslations("Home.journey");

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32" id="experience">
      <div className="site-container">
        <SectionIntro
          body={t("description")}
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="mt-14 border-t fine-rule">
          {journeyKeys.map((key) => (
            <article
              className="group grid gap-5 border-b fine-rule py-7 sm:grid-cols-[5rem_1fr_1fr] sm:items-center sm:gap-8 sm:py-9"
              key={key}
            >
              <p className="text-xs font-medium text-slate">
                {t(`items.${key}.number`)}
              </p>
              <h3 className="display-heading text-3xl text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl rtl:group-hover:-translate-x-1">
                {t(`items.${key}.title`)}
              </h3>
              <p className="max-w-md text-sm leading-7 text-slate">
                {t(`items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
