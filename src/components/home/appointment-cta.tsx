import { getTranslations } from "next-intl/server";

import { BookingTrigger } from "@/components/booking/booking-trigger";
import type { AppLocale } from "@/i18n/routing";

type AppointmentCtaProps = { locale: AppLocale };

export async function AppointmentCta({}: AppointmentCtaProps) {
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
            <BookingTrigger variant="button-light">{t("primaryAction")}</BookingTrigger>
            <BookingTrigger
              className="border-white/55 text-white hover:border-white hover:bg-white hover:text-navy"
              variant="button-secondary"
            >
              {t("secondaryAction")}
            </BookingTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
