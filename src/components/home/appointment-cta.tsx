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
            <BookingTrigger showArrow variant="primary-invert">
              {t("secondaryAction")}
            </BookingTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
