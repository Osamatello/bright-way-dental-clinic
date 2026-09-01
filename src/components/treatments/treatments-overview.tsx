import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { treatments } from "@/data/treatments";
import { ButtonLink } from "../ui/button-link";

type TreatmentsOverviewProps = {
  locale: AppLocale;
};

export async function TreatmentsOverview({ locale }: TreatmentsOverviewProps) {
  const t = await getTranslations("Treatments.overview");
  const detailT = await getTranslations("Treatments.items");

  return (
    <>
      <section className="bg-cream pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="site-container">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
            {t("eyebrow")}
          </p>
          <h1 className="display-heading mt-8 max-w-4xl text-[clamp(3rem,6vw,6rem)] leading-[0.94] text-navy">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28 lg:py-32">
        <div className="site-container">
          <div className="border-t fine-rule">
            {treatments.map((treatment) => {
              const slug = treatment.slug;
              return (
                <article
                  className="group grid gap-5 border-b fine-rule py-7 sm:grid-cols-[5rem_1fr_1fr_auto] sm:items-center sm:gap-8 sm:py-9"
                  key={slug}
                >
                  <p className="text-xs font-medium text-slate">
                    {treatment.number}
                  </p>
                  <h2 className="display-heading text-3xl text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl rtl:group-hover:-translate-x-1">
                    {detailT(`${slug}.title`)}
                  </h2>
                  <p className="max-w-md text-sm leading-7 text-slate">
                    {detailT(`${slug}.shortDescription`)}
                  </p>
                  <ButtonLink
                    href={`/${locale}/treatments/${slug}`}
                    variant="secondary"
                  >
                    {t("viewTreatment")}
                  </ButtonLink>
                </article>
              );
            })}
          </div>

          <div className="mt-14">
            <ButtonLink href={`/${locale}`}>
              {t("backToHome")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
