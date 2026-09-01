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
        className="absolute -start-28 top-28 size-80 rounded-full border border-gold/15 sm:size-[30rem]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 end-0 h-px w-1/3 bg-gradient-to-l from-gold/35 to-transparent rtl:bg-gradient-to-r"
      />

      <div className="site-container grid min-h-[calc(100svh-76px)] gap-11 py-10 sm:py-14 lg:min-h-[calc(100svh-88px)] lg:grid-cols-[minmax(0,0.84fr)_minmax(31rem,1.16fr)] lg:items-center lg:gap-14 lg:py-12 xl:gap-20">
        <div className="relative z-10 flex flex-col justify-center lg:py-8">
          <div className="hero-reveal flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold sm:text-[0.66rem]">
            <span aria-hidden="true" className="h-px w-9 bg-gold/75" />
            <p>{t("eyebrow")}</p>
          </div>

          <h1 className="hero-reveal hero-reveal-delay-1 display-heading mt-7 max-w-[12ch] text-[clamp(3.6rem,6.4vw,7rem)] leading-[0.92] text-navy sm:mt-9">
            <span className="block">{t("titleLineOne")}</span>
            <span className="block text-navy/48">{t("titleLineTwo")}</span>
          </h1>

          <p className="hero-reveal hero-reveal-delay-2 mt-7 max-w-xl text-[0.95rem] leading-8 text-slate sm:mt-8 sm:text-[1.05rem] sm:leading-9">
            {t("description")}
          </p>

          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="group inline-flex min-h-13 items-center justify-center gap-5 bg-navy px-7 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_rgba(21,36,53,0.12)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-navy/92 hover:shadow-[0_20px_44px_rgba(21,36,53,0.18)]"
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
              className="group inline-flex min-h-13 items-center justify-center gap-4 border border-navy/16 bg-white/28 px-7 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy transition-[border-color,background-color] duration-300 hover:border-gold/60 hover:bg-white/55"
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

        <div className="hero-reveal hero-reveal-delay-2 relative min-h-[29rem] sm:min-h-[40rem] lg:h-[min(72vh,48rem)] lg:min-h-[39rem]">
          <div
            aria-hidden="true"
            className="hero-visual-frame absolute -inset-y-3 -start-3 end-3 border border-gold/28 sm:-inset-y-5 sm:-start-5 sm:end-5"
          />
          <figure className="hero-visual-frame absolute inset-0 overflow-hidden bg-sand shadow-[0_32px_80px_rgba(21,36,53,0.12)]">
            <Image
              alt={t("imageAlt")}
              className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.025]"
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 52vw"
              src="/images/bright-way-clinic-hero.webp"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/22 via-transparent to-white/8"
            />
            <figcaption className="absolute bottom-4 end-4 max-w-[15rem] border-s border-gold/60 bg-navy/88 px-4 py-3 text-[0.63rem] leading-5 tracking-[0.08em] text-white/88 backdrop-blur-md sm:bottom-7 sm:end-7 sm:px-5 sm:py-4">
              {t("imageCaption")}
            </figcaption>
          </figure>

          <div className="absolute start-4 top-5 border border-white/35 bg-ivory/90 px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-navy shadow-sm backdrop-blur sm:start-7 sm:top-8">
            Bright Way <span className="mx-2 text-gold">·</span> Dental Clinic
          </div>
        </div>
      </div>
    </section>
  );
}
