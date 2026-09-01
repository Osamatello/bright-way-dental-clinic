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
    <section className="relative isolate overflow-hidden bg-cream" id="top">
      <div
        aria-hidden="true"
        className="absolute -start-40 top-20 size-[34rem] rounded-full border border-gold/14"
      />
      <div
        aria-hidden="true"
        className="absolute start-[8%] top-0 h-full w-px bg-navy/[0.035]"
      />

      <div className="site-container grid min-h-[calc(100svh-78px)] gap-10 pb-8 pt-10 sm:pb-12 sm:pt-14 lg:min-h-[calc(100svh-96px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:items-center lg:gap-8 lg:py-10 xl:gap-12">
        <div className="relative z-10 flex flex-col justify-center lg:pe-4">
          <div className="hero-reveal flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.19em] text-gold sm:text-[0.68rem]">
            <span aria-hidden="true" className="h-px w-9 bg-gold/75" />
            <p>{t("eyebrow")}</p>
          </div>

          <h1 className="hero-reveal hero-reveal-delay-1 display-heading mt-7 max-w-[10.5ch] text-[clamp(3.75rem,6vw,6.9rem)] leading-[0.91] text-navy sm:mt-9">
            <span className="block">{t("titleLineOne")}</span>
            <span className="block italic text-gold">{t("titleLineTwo")}</span>
          </h1>

          <p className="hero-reveal hero-reveal-delay-2 mt-7 max-w-[34rem] border-s border-gold/45 ps-5 text-[0.96rem] leading-8 text-slate sm:mt-8 sm:text-[1.04rem] sm:leading-9">
            {t("description")}
          </p>

          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-navy px-8 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-white shadow-[0_16px_40px_rgba(21,36,53,0.14)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-navy/92 hover:shadow-[0_20px_44px_rgba(21,36,53,0.2)]"
              href={`/${locale}/contact`}
            >
              <span>{t("primaryAction")}</span>
              <span
                aria-hidden="true"
                className="text-gold transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                ↗
              </span>
            </Link>
            <Link
              className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-full border border-navy/16 bg-white/40 px-8 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-navy transition-[border-color,background-color] duration-300 hover:border-gold/60 hover:bg-white/75"
              href={`/${locale}/treatments`}
            >
              <span>{t("secondaryAction")}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-navy/12 sm:mt-12">
            {values.map((value, index) => (
              <div
                className="flex min-h-20 items-center gap-3 border-e border-navy/12 px-2 first:ps-0 last:border-e-0 sm:min-h-24 sm:px-5"
                key={value}
              >
                <span
                  aria-hidden="true"
                  className="hidden text-[0.58rem] font-semibold tracking-[0.12em] text-gold sm:block"
                >
                  0{index + 1}
                </span>
                <p className="text-[0.66rem] font-medium leading-5 text-navy/72 sm:text-[0.72rem] sm:leading-6">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-reveal hero-reveal-delay-2 relative min-h-[30rem] sm:min-h-[42rem] lg:h-[min(76vh,52rem)] lg:min-h-[42rem]">
          <div
            aria-hidden="true"
            className="hero-visual-frame absolute -inset-y-3 -start-3 end-3 border border-gold/35 sm:-inset-y-5 sm:-start-5 sm:end-5"
          />
          <figure className="hero-visual-frame hero-image-mask absolute inset-0 overflow-hidden bg-sand shadow-[0_36px_90px_rgba(21,36,53,0.16)]">
            <Image
              alt={t("imageAlt")}
              className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.035]"
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 52vw"
              src="/images/bright-way-clinic-hero.webp"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-white/10"
            />
            <figcaption className="absolute bottom-5 end-5 max-w-[16rem] border-s border-gold-light/70 bg-navy/90 px-5 py-4 text-[0.65rem] leading-5 tracking-[0.07em] text-white/90 backdrop-blur-md sm:bottom-8 sm:end-8 sm:px-6 sm:py-5">
              {t("imageCaption")}
            </figcaption>
          </figure>

          <div className="absolute start-5 top-7 rounded-full border border-white/50 bg-ivory/92 px-5 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-navy shadow-[0_12px_35px_rgba(21,36,53,0.1)] backdrop-blur sm:start-8 sm:top-10">
            Bright Way <span className="mx-2 text-gold">·</span> Dental Clinic
          </div>
          <div aria-hidden="true" className="absolute -bottom-4 start-12 grid size-24 place-items-center rounded-full border border-gold/35 bg-cream shadow-[0_15px_40px_rgba(21,36,53,0.1)] sm:size-28">
            <span className="display-heading text-3xl text-gold">BW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
