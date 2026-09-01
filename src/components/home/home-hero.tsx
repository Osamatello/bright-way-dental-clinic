import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type HomeHeroProps = {
  locale: AppLocale;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations("Home.hero");

  return (
    <section className="overflow-hidden bg-cream">
      <div className="site-container grid min-h-[calc(100svh-72px)] gap-10 py-8 sm:py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(28rem,0.72fr)] lg:items-stretch lg:gap-14 lg:py-14">
        <div className="flex flex-col justify-between py-4 lg:py-8">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
              {t("eyebrow")}
            </p>
            <h1 className="display-heading mt-10 max-w-4xl text-[clamp(3.7rem,7vw,7.7rem)] leading-[0.91] text-navy">
              <span className="block">{t("titleLineOne")}</span>
              <span className="block text-navy/48">{t("titleLineTwo")}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
              {t("description")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/contact`}>
                {t("primaryAction")}
              </ButtonLink>
              <ButtonLink href={`/${locale}/treatments`} variant="secondary">
                {t("secondaryAction")}
              </ButtonLink>
            </div>
          </div>

          <a
            className="mt-14 hidden w-fit items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-slate transition-colors hover:text-navy lg:inline-flex"
            href="#treatments"
          >
            <span className="grid size-9 place-items-center border border-navy/20" aria-hidden="true">
              ↓
            </span>
            {t("scrollLabel")}
          </a>
        </div>

        <figure className="relative min-h-[34rem] overflow-hidden border border-navy/10 sm:min-h-[43rem] lg:min-h-0">
          <Image
            alt={t("imageAlt")}
            className="object-cover"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 42vw"
            src="/images/bright-way-clinic-hero.webp"
          />
          <figcaption className="absolute inset-x-4 bottom-4 border border-white/25 bg-navy/88 px-5 py-4 text-xs tracking-[0.08em] text-white backdrop-blur-sm sm:inset-x-auto sm:end-4 sm:max-w-64">
            {t("imageCaption")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
