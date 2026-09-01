import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type LocationContactProps = {
  locale: AppLocale;
};

export async function LocationContact({ locale }: LocationContactProps) {
  const t = await getTranslations("Home.location");

  const details = [
    { label: t("addressLabel"), value: t("addressPlaceholder") },
    { label: t("hoursLabel"), value: t("hoursPlaceholder") },
    { label: t("phoneLabel"), value: t("phonePlaceholder") },
    { label: t("emailLabel"), value: t("emailPlaceholder") },
    { label: t("whatsappLabel"), value: t("whatsappPlaceholder") },
  ];

  return (
    <section className="bg-cream py-20 sm:py-28 lg:py-32" id="contact-section">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("eyebrow")}
            </p>
            <h2 className="display-heading mt-8 max-w-xl text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              {t("title")}
            </h2>
            <p className="mt-8 max-w-md text-base leading-8 text-slate">
              {t("description")}
            </p>
          </div>

          <div className="border-t fine-rule pt-8 lg:pt-10">
            <dl className="grid gap-0">
              {details.map((detail) => (
                <div
                  className="grid gap-2 border-b fine-rule py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6"
                  key={detail.label}
                >
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate">
                    {detail.label}
                  </dt>
                  <dd className="text-sm leading-7 text-navy/70">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/contact`}>
                {t("primaryAction")}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}/contact#clinic-details`}
                variant="secondary"
              >
                {t("secondaryAction")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          aria-label={t("directionsLabel")}
          className="mt-14 grid min-h-[20rem] place-items-center border border-navy/15 bg-ivory sm:min-h-[24rem]"
          id="map"
          role="img"
        >
          <div className="px-6 text-center">
            <span
              aria-hidden="true"
              className="display-heading text-[5rem] leading-none text-navy/8 sm:text-[7rem]"
            >
              ◉
            </span>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate">
              {t("mapPlaceholder")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
