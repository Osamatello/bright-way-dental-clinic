import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import Link from "next/link";

type TreatmentsPreviewProps = {
  locale: AppLocale;
};

const treatmentKeys = ["general", "cosmetic", "implants"] as const;
const treatmentSlugs = [
  "general-dentistry",
  "cosmetic-dentistry",
  "dental-implants",
] as const;

export async function TreatmentsPreview({ locale }: TreatmentsPreviewProps) {
  const t = await getTranslations("Home.treatments");

  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-32" id="treatments">
      <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="display-heading mt-7 max-w-xl text-5xl leading-[1.02] text-navy sm:text-6xl lg:text-[4.7rem]">
            {t("title")}
          </h2>
          <p className="mt-7 max-w-md text-base leading-8 text-slate">
            {t("description")}
          </p>
          <Link
            className="group mt-9 inline-flex items-center gap-4 border-b border-navy/25 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-navy transition-colors hover:border-gold hover:text-gold"
            href={`/${locale}/treatments`}
          >
            {t("eyebrow")}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">↗</span>
          </Link>
        </div>

        <div className="border-t border-navy/14">
          {treatmentKeys.map((key, index) => {
            return (
              <article
                className="group relative grid min-h-56 overflow-hidden border-b border-navy/14 transition-colors duration-500 hover:bg-cream sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-7"
                key={key}
              >
                <span aria-hidden="true" className="absolute inset-y-0 start-0 w-1 origin-bottom scale-y-0 bg-gold transition-transform duration-500 group-hover:scale-y-100" />
                <p className="pt-7 text-xs font-semibold text-gold sm:ps-5 sm:pt-0">
                  {t(`items.${key}.number`)}
                </p>
                <div className="pb-7 sm:py-9">
                  <h3 className="display-heading text-4xl text-navy transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl rtl:group-hover:-translate-x-2">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
                <Link
                  aria-label={`${t("learnMore")}: ${t(`items.${key}.title`)}`}
                  className="absolute bottom-6 end-0 grid size-12 place-items-center rounded-full border border-navy/20 text-lg text-navy transition-[background-color,color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-navy group-hover:text-white sm:static sm:me-5"
                  href={`/${locale}/treatments/${treatmentSlugs[index]}`}
                >
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
