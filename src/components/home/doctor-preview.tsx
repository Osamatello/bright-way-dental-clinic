import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type DoctorPreviewProps = {
  locale: AppLocale;
};

export async function DoctorPreview({ locale }: DoctorPreviewProps) {
  const [t, about] = await Promise.all([
    getTranslations("Home.doctor"),
    getTranslations("Home.about"),
  ]);
  const values = [about("detailOne"), about("detailTwo"), about("detailThree")];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-36" id="doctor">
      <div aria-hidden="true" className="absolute end-0 top-0 h-full w-1/3 bg-cream/45" />
      <div className="site-container relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-24">
        <figure className="doctor-portrait-frame relative min-h-[34rem] overflow-hidden bg-sand shadow-[0_30px_80px_rgba(21,36,53,0.12)] sm:min-h-[45rem]">
          <Image
            alt={t("portraitLabel")}
            className="object-cover object-center"
            fill
            sizes="(max-width: 1023px) 100vw, 44vw"
            src="/images/bright-way-doctor-official.jpeg"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/28 via-transparent to-white/5" />
          <figcaption className="absolute bottom-6 start-6 border-s border-gold-light/80 bg-navy/88 px-5 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:bottom-9 sm:start-9">
            {t("portraitLabel")}
          </figcaption>
        </figure>

        <div className="lg:py-10">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="display-heading mt-7 max-w-3xl text-5xl leading-[1.03] sm:text-7xl">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
            {t("description")}
          </p>
          <div className="mt-10 border-t border-navy/14">
            {values.map((value, index) => (
              <div className="flex items-center gap-5 border-b border-navy/14 py-4" key={value}>
                <span className="text-[0.62rem] font-semibold text-gold">0{index + 1}</span>
                <p className="text-sm font-medium text-navy/78">{value}</p>
              </div>
            ))}
          </div>
          <ButtonLink className="mt-9" href={`/${locale}/doctor`} variant="secondary">
            {t("action")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
