import "./home-hero.css";

import { getTranslations } from "next-intl/server";

import { EditorialMedia } from "@/components/primitives/editorial-media";
import { PremiumLink } from "@/components/primitives/premium-link";
import { SectionEyebrow } from "@/components/primitives/section-eyebrow";
import type { AppLocale } from "@/i18n/routing";

type HomeHeroProps = {
  locale: AppLocale;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations("Home.hero");
  const values = [t("valueOne"), t("valueTwo"), t("valueThree")];

  return (
    <section className="hero" id="top">
      <div aria-hidden="true" className="hero__grid architectural-grid" />

      <div className="hero__inner site-container">
        <div className="hero__copy">
          <SectionEyebrow
            className="hero__eyebrow hero__reveal hero__reveal--1"
            withRule
          >
            {t("eyebrow")}
          </SectionEyebrow>

          <h1 className="hero__headline display-heading hero__reveal hero__reveal--2">
            <span className="hero__headline-line">{t("titleLineOne")}</span>
            <span className="hero__headline-line hero__headline-accent">
              {t("titleLineTwo")}
            </span>
          </h1>

          <p className="hero__lede hero__reveal hero__reveal--3">
            {t("description")}
          </p>

          <div className="hero__actions hero__reveal hero__reveal--4">
            <PremiumLink href={`/${locale}/contact`} showArrow variant="primary">
              {t("primaryAction")}
            </PremiumLink>
            <PremiumLink
              href={`/${locale}/treatments`}
              showArrow
              variant="secondary"
            >
              {t("secondaryAction")}
            </PremiumLink>
          </div>

          <ul className="hero__values">
            {values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>

        <EditorialMedia
          alt={t("imageAlt")}
          className="hero__media"
          objectPosition="50% 42%"
          preload
          reveal
          sizes="(max-width: 64rem) 100vw, 52vw"
          src="/images/bright-way-clinic-hero.webp"
        />
      </div>
    </section>
  );
}
