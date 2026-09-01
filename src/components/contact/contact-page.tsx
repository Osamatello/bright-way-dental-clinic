import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { AppointmentForm } from "./appointment-form";

type ContactPageProps = {
  locale: AppLocale;
};

export async function ContactPage({}: ContactPageProps) {
  const t = await getTranslations("Contact");

  const formTranslations = {
    fullNameLabel: t("form.fullNameLabel"),
    fullNamePlaceholder: t("form.fullNamePlaceholder"),
    phoneLabel: t("form.phoneLabel"),
    phonePlaceholder: t("form.phonePlaceholder"),
    emailLabel: t("form.emailLabel"),
    emailPlaceholder: t("form.emailPlaceholder"),
    treatmentLabel: t("form.treatmentLabel"),
    treatmentPlaceholder: t("form.treatmentPlaceholder"),
    treatments: {
      general: t("form.treatments.general"),
      cosmetic: t("form.treatments.cosmetic"),
      implants: t("form.treatments.implants"),
      orthodontics: t("form.treatments.orthodontics"),
      whitening: t("form.treatments.whitening"),
      rootCanal: t("form.treatments.rootCanal"),
      pediatric: t("form.treatments.pediatric"),
      emergency: t("form.treatments.emergency"),
      other: t("form.treatments.other"),
    },
    preferredDateLabel: t("form.preferredDateLabel"),
    preferredTimeLabel: t("form.preferredTimeLabel"),
    preferredTimeOptions: {
      any: t("form.preferredTimeOptions.any"),
      morning: t("form.preferredTimeOptions.morning"),
      afternoon: t("form.preferredTimeOptions.afternoon"),
      evening: t("form.preferredTimeOptions.evening"),
    },
    messageLabel: t("form.messageLabel"),
    messagePlaceholder: t("form.messagePlaceholder"),
    submitButton: t("form.submitButton"),
    submittingButton: t("form.submittingButton"),
    disclaimer: t("form.disclaimer"),
    successTitle: t("form.successTitle"),
    successMessage: t("form.successMessage"),
    resetButton: t("form.resetButton"),
  };

  const contactDetails = [
    {
      label: t("clinicInfo.addressLabel"),
      value: t("clinicInfo.addressPlaceholder"),
    },
    {
      label: t("clinicInfo.hoursLabel"),
      value: t("clinicInfo.hoursPlaceholder"),
    },
    {
      label: t("clinicInfo.phoneLabel"),
      value: t("clinicInfo.phonePlaceholder"),
    },
    {
      label: t("clinicInfo.emailLabel"),
      value: t("clinicInfo.emailPlaceholder"),
    },
    {
      label: t("clinicInfo.whatsappLabel"),
      value: t("clinicInfo.whatsappPlaceholder"),
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

      {/* Form & Clinic Details Section */}
      <section className="bg-ivory py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* Form Column */}
            <div id="request">
              <div className="mb-8">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("form.eyebrow")}
                </p>
                <h2 className="display-heading mt-4 text-3xl text-navy sm:text-4xl">
                  {t("form.title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate">
                  {t("form.description")}
                </p>
              </div>

              <AppointmentForm t={formTranslations} />
            </div>

            {/* Clinic Details Column */}
            <div id="clinic-details">
              <div className="mb-8">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
                  {t("clinicInfo.eyebrow")}
                </p>
                <h2 className="display-heading mt-4 text-3xl text-navy sm:text-4xl">
                  {t("clinicInfo.title")}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate">
                  {t("clinicInfo.description")}
                </p>
              </div>

              <div className="border-t fine-rule">
                <dl className="grid gap-0">
                  {contactDetails.map((detail) => (
                    <div
                      className="grid gap-2 border-b fine-rule py-5 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:py-6"
                      key={detail.label}
                    >
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate">
                        {detail.label}
                      </dt>
                      <dd className="text-sm leading-7 text-navy/70 italic">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Architectural Map Area */}
              <div
                aria-label={t("clinicInfo.directionsLabel")}
                className="mt-12 grid min-h-[16rem] place-items-center border border-navy/15 bg-sand/40 p-8 sm:min-h-[20rem]"
                role="img"
              >
                <div className="text-center">
                  <span
                    aria-hidden="true"
                    className="display-heading text-5xl text-navy/15 sm:text-6xl"
                  >
                    ◉
                  </span>
                  <p className="mt-4 max-w-xs text-xs leading-6 text-slate italic">
                    {t("clinicInfo.mapPlaceholder")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
