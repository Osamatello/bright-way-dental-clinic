import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type AppointmentCtaProps = { locale: AppLocale };

export async function AppointmentCta({ locale }: AppointmentCtaProps) {
  const t = await getTranslations("Home.appointment");
  return (
    <section className="appointment-compact" id="appointment">
      <div className="site-container appointment-compact__grid">
        <div>
          <p className="appointment-compact__eyebrow">{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
        </div>
        <div className="appointment-compact__action">
          <p>{t("description")}</p>
          <div>
            <ButtonLink href={`/${locale}#contact-section`} variant="light">{t("primaryAction")}</ButtonLink>
            <ButtonLink className="border-white/55 text-white hover:border-white hover:bg-white hover:text-navy" href={`/${locale}#contact-section`} variant="secondary">{t("secondaryAction")}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
