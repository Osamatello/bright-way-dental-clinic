import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type AppointmentCtaProps = {
  locale: AppLocale;
};

export async function AppointmentCta({ locale }: AppointmentCtaProps) {
  const t = await getTranslations("Home.appointment");

  return (
    <section className="bg-navy py-20 text-white sm:py-28 lg:py-32" id="appointment">
      <div className="site-container grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-white/45">
            {t("eyebrow")}
          </p>
          <p className="max-w-56 text-xs leading-6 text-white/40">
            {t("availability")}
          </p>
        </div>

        <div>
          <h2 className="display-heading max-w-5xl text-5xl leading-[1.02] text-white sm:text-7xl lg:text-[5.6rem]">
            {t("title")}
          </h2>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-base leading-8 text-white/60">
              {t("description")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/contact`} variant="light">
                {t("primaryAction")}
              </ButtonLink>
              <ButtonLink
                className="border-white/30 text-white hover:border-white hover:bg-white hover:text-navy"
                href={`/${locale}/contact#clinic-details`}
                variant="secondary"
              >
                {t("secondaryAction")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
