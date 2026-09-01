import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

type HomeHeroProps = {
  locale: AppLocale;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations("Home.hero");
  const values = [t("valueOne"), t("valueTwo"), t("valueThree")];

  return (
    <section className="hero-stage" id="top">
      <div aria-hidden="true" className="architectural-grid absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="absolute -start-32 top-20 size-[28rem] rounded-full border border-gold/12" />

      <div className="hero-composition site-container">
        <div className="hero-copy">
          <div className="relative w-full max-w-[38rem]">
            <div className="reveal-up flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-gold sm:text-[0.68rem]">
              <span aria-hidden="true" className="h-px w-9 bg-gold/75" />
              <p>{t("eyebrow")}</p>
            </div>

            <h1 className="reveal-up reveal-delay-1 display-heading mt-5 max-w-[10.5ch] text-[clamp(3.1rem,6vw,6.35rem)] leading-[0.91] text-navy sm:mt-7">
              <span className="block">{t("titleLineOne")}</span>
              <span className="hero-title-accent block italic text-gold">
                {t("titleLineTwo")}
              </span>
            </h1>

            <p className="reveal-up reveal-delay-2 mt-5 max-w-[32rem] border-s border-gold/45 ps-5 text-[0.94rem] leading-7 text-slate sm:mt-7 sm:text-base sm:leading-8">
              {t("description")}
            </p>

            <div className="reveal-up reveal-delay-3 mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <Link
                className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-navy px-6 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_34px_rgba(21,36,53,0.14)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-navy/92 hover:shadow-[0_18px_40px_rgba(21,36,53,0.2)] sm:min-h-14 sm:px-8 sm:text-[0.68rem]"
                href={`/${locale}/contact`}
              >
                <span>{t("primaryAction")}</span>
                <span aria-hidden="true" className="premium-arrow text-gold-light">
                  ↗
                </span>
              </Link>
              <Link
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-navy/16 bg-white/55 px-5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-navy transition-[border-color,background-color] duration-300 hover:border-gold/60 hover:bg-white/90 sm:min-h-14 sm:px-7 sm:text-[0.68rem]"
                href={`/${locale}/treatments`}
              >
                <span>{t("secondaryAction")}</span>
                <span aria-hidden="true" className="premium-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <figure className="hero-media">
          <Image
            alt={t("imageAlt")}
            className="hero-media-image object-cover"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 62vw"
            src="/images/bright-way-clinic-hero.webp"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy/38 via-transparent to-white/10"
          />
          <div className="absolute start-5 top-7 rounded-full border border-white/45 bg-ivory/92 px-5 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-navy shadow-[0_12px_35px_rgba(21,36,53,0.1)] backdrop-blur sm:start-8 sm:top-9">
            Bright Way <span className="mx-2 text-gold">·</span> Dental Clinic
          </div>
          <figcaption className="absolute bottom-5 end-5 max-w-[16rem] border-s border-gold-light/75 bg-navy/90 px-5 py-4 text-[0.64rem] leading-5 tracking-[0.06em] text-white/90 backdrop-blur-md sm:bottom-8 sm:end-8 sm:px-6 sm:py-5">
            {t("imageCaption")}
          </figcaption>
        </figure>

        <div className="hero-values">
          {values.map((value, index) => (
            <div
              className="flex min-h-16 items-center gap-2 border-e border-navy/12 px-2 last:border-e-0 sm:min-h-20 sm:gap-3 sm:px-4"
              key={value}
            >
              <span
                aria-hidden="true"
                className="hidden text-[0.58rem] font-semibold tracking-[0.1em] text-gold sm:block"
              >
                0{index + 1}
              </span>
              <p className="text-[0.62rem] font-medium leading-4 text-navy/72 sm:text-[0.7rem] sm:leading-5">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
