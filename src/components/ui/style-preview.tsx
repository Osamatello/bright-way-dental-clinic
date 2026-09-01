import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "./button-link";
import { SectionIntro } from "./section-intro";

type StylePreviewProps = {
  locale: AppLocale;
};

const swatches = [
  { key: "cream", hex: "#F3EDE2", color: "bg-cream", inverse: false },
  { key: "ivory", hex: "#FAF7F1", color: "bg-ivory", inverse: false },
  { key: "white", hex: "#FFFFFF", color: "bg-white", inverse: false },
  { key: "navy", hex: "#152435", color: "bg-navy", inverse: true },
  { key: "sand", hex: "#D8CBB9", color: "bg-sand", inverse: false },
  { key: "slate", hex: "#657078", color: "bg-slate", inverse: true },
] as const;

export async function StylePreview({ locale }: StylePreviewProps) {
  const t = await getTranslations("Preview");

  const principles = [
    { title: t("principleOne"), body: t("principleOneBody") },
    { title: t("principleTwo"), body: t("principleTwoBody") },
    { title: t("principleThree"), body: t("principleThreeBody") },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="site-container grid min-h-[calc(100svh-72px)] items-end gap-12 py-12 sm:py-16 lg:grid-cols-[1.45fr_0.55fr] lg:py-20">
          <div className="max-w-5xl">
            <p className="mb-8 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate">
              {t("eyebrow")}
            </p>
            <h1 className="display-heading text-[clamp(3.6rem,8.5vw,8.8rem)] leading-[0.88] text-navy">
              <span className="block">{t("titleLineOne")}</span>
              <span className="block text-navy/48">{t("titleLineTwo")}</span>
            </h1>
            <p className="mt-9 max-w-2xl text-base leading-8 text-slate sm:text-lg sm:leading-9">
              {t("intro")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/${locale}/#appointment`}>
                {t("primaryAction")}
              </ButtonLink>
              <ButtonLink href={`/${locale}/#palette`} variant="secondary">
                {t("secondaryAction")}
              </ButtonLink>
            </div>
          </div>

          <div className="flex lg:justify-end">
            <p className="max-w-xs border-s border-navy/20 ps-5 text-xs leading-6 text-slate">
              {t("note")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28" id="palette">
        <div className="site-container">
          <SectionIntro
            body={t("paletteBody")}
            eyebrow={t("paletteEyebrow")}
            title={t("paletteTitle")}
          />

          <div className="mt-14 grid grid-cols-2 border-s border-t fine-rule sm:grid-cols-3 lg:grid-cols-6">
            {swatches.map((swatch) => (
              <div
                className={`${swatch.color} flex aspect-[0.82] flex-col justify-between border-b border-e fine-rule p-4 sm:p-5 ${
                  swatch.inverse ? "text-white" : "text-navy"
                }`}
                key={swatch.key}
              >
                <span className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] opacity-65">
                  {swatch.hex}
                </span>
                <span className="text-sm font-medium">
                  {t(swatch.key)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="site-container">
          <SectionIntro
            body={t("typeBody")}
            eyebrow={t("typeEyebrow")}
            title={t("typeTitle")}
          />

          <div className="mt-16 grid border-t fine-rule lg:grid-cols-2">
            <div className="border-b fine-rule py-10 lg:border-e lg:pe-12">
              <p className="display-heading max-w-xl text-5xl leading-[1.05] sm:text-6xl">
                {t("displaySample")}
              </p>
              <p className="mt-10 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-slate">
                {t("displayCaption")}
              </p>
            </div>
            <div className="border-b fine-rule py-10 lg:ps-12">
              <p className="max-w-lg text-lg leading-9 text-navy/80 sm:text-xl sm:leading-10">
                {t("bodySample")}
              </p>
              <p className="mt-10 text-[0.64rem] font-semibold uppercase tracking-[0.17em] text-slate">
                {t("bodyCaption")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="site-container">
          <SectionIntro
            body={t("rhythmBody")}
            eyebrow={t("rhythmEyebrow")}
            title={t("rhythmTitle")}
          />

          <div className="mt-14 grid border-s border-t fine-rule md:grid-cols-3">
            {principles.map((principle, index) => (
              <article
                className="min-h-64 border-b border-e fine-rule p-6 sm:p-8"
                key={principle.title}
              >
                <p className="text-xs text-slate">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="display-heading mt-16 text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate">
                  {principle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white sm:py-28" id="appointment">
        <div className="site-container grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            {t("detailLabel")}
          </p>
          <div>
            <h2 className="display-heading max-w-3xl text-5xl leading-[1.05] text-white sm:text-7xl">
              {t("detailTitle")}
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/60">
              {t("detailBody")}
            </p>
            <ButtonLink
              className="mt-9"
              href={`/${locale}/#treatments`}
              variant="light"
            >
              {t("detailLink")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
