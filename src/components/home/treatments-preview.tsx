import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { SectionIntro } from "../ui/section-intro";

type TreatmentsPreviewProps = {
  locale: AppLocale;
};

const homepageTreatmentSlugs = [
  "general-dentistry",
  "cosmetic-dentistry",
  "dental-implants",
] as const;

export async function TreatmentsPreview({ locale }: TreatmentsPreviewProps) {
  const t = await getTranslations("Home.treatments");
  const itemsT = await getTranslations("Treatments.items");

  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-32" id="treatments">
      <div className="site-container">
        <SectionIntro
          body={t("description")}
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="mt-14 border-t fine-rule">
          {homepageTreatmentSlugs.map((slug, index) => {
            const key = ["general", "cosmetic", "implants"][index];
            return (
              <article
                className="group grid gap-5 border-b fine-rule py-7 sm:grid-cols-[5rem_1fr_1fr_auto] sm:items-center sm:gap-8 sm:py-9"
                key={slug}
              >
                <p className="text-xs font-medium text-slate">
                  {t(`items.${key}.number`)}
                </p>
                <h3 className="display-heading text-3xl text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl rtl:group-hover:-translate-x-1">
                  {itemsT(`${slug}.title`)}
                </h3>
                <p className="max-w-md text-sm leading-7 text-slate">
                  {itemsT(`${slug}.shortDescription`)}
                </p>
                <a
                  aria-label={`${t("learnMore")}: ${itemsT(`${slug}.title`)}`}
                  className="grid size-11 place-items-center border border-navy/20 text-lg transition-colors duration-300 group-hover:bg-navy group-hover:text-white"
                  href={`/${locale}/treatments/${slug}`}
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
