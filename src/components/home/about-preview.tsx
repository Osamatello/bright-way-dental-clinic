import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type AboutPreviewProps = {
  locale: AppLocale;
};

export async function AboutPreview({ locale }: AboutPreviewProps) {
  const t = await getTranslations("Home.about");
  const details = [t("detailOne"), t("detailTwo"), t("detailThree")];

  return (
    <section className="bg-cream py-20 sm:py-28 lg:py-36" id="about">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
              {t("eyebrow")}
            </p>
            <h2 className="display-heading mt-8 max-w-xl text-5xl leading-[1.05] sm:text-6xl">
              {t("title")}
            </h2>
          </div>

          <div className="border-t fine-rule pt-8 lg:pt-10">
            <p className="display-heading max-w-3xl text-4xl leading-[1.12] text-navy/72 sm:text-5xl">
              {t("statement")}
            </p>
            <div className="mt-10 grid gap-7 text-sm leading-8 text-slate sm:grid-cols-2 sm:text-base">
              <p>{t("descriptionOne")}</p>
              <p>{t("descriptionTwo")}</p>
            </div>

            <ol className="mt-12 grid border-s border-t fine-rule sm:grid-cols-3">
              {details.map((detail, index) => (
                <li
                  className="flex min-h-36 flex-col justify-between border-b border-e fine-rule p-5"
                  key={detail}
                >
                  <span className="text-[0.62rem] text-slate">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-navy">{detail}</span>
                </li>
              ))}
            </ol>

            <ButtonLink
              className="mt-9"
              href={`/${locale}/about`}
              variant="secondary"
            >
              {t("action")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
