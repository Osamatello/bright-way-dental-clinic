import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type DoctorPreviewProps = {
  locale: AppLocale;
};

export async function DoctorPreview({ locale }: DoctorPreviewProps) {
  const t = await getTranslations("Home.doctor");

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36" id="doctor">
      <div className="site-container grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-20">
        <div
          aria-label={t("portraitLabel")}
          className="relative min-h-[32rem] overflow-hidden bg-sand sm:min-h-[42rem]"
          role="img"
        >
          <div className="absolute inset-7 border border-navy/15 sm:inset-10" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="display-heading text-[9rem] leading-none text-navy/10 sm:text-[13rem]">
              BW
            </span>
          </div>
          <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-6 border-t border-navy/20 pt-5 sm:inset-x-10 sm:bottom-10">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-navy/55">
              {t("portraitLabel")}
            </p>
            <p className="max-w-56 text-end text-xs leading-5 text-navy/55">
              {t("placeholder")}
            </p>
          </div>
        </div>

        <div className="lg:py-10">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
            {t("eyebrow")}
          </p>
          <h2 className="display-heading mt-8 max-w-3xl text-5xl leading-[1.04] sm:text-7xl">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {t("description")}
          </p>
          <ButtonLink
            className="mt-9"
            href={`/${locale}/#appointment`}
            variant="secondary"
          >
            {t("action")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
