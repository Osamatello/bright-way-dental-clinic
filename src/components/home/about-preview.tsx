import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { ButtonLink } from "../ui/button-link";

type AboutPreviewProps = { locale: AppLocale };

const icons = [
  <svg aria-hidden="true" key="conversation" viewBox="0 0 24 24"><path d="M4 5.5h16v10H9l-5 3v-13Z"/><path d="M8 9h8M8 12h5"/></svg>,
  <svg aria-hidden="true" key="care" viewBox="0 0 24 24"><path d="M12 20s-7-4.2-7-9.5A3.5 3.5 0 0 1 12 9a3.5 3.5 0 0 1 7 1.5C19 15.8 12 20 12 20Z"/></svg>,
  <svg aria-hidden="true" key="calm" viewBox="0 0 24 24"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><circle cx="12" cy="12" r="3"/></svg>,
];

export async function AboutPreview({ locale }: AboutPreviewProps) {
  const t = await getTranslations("Home.about");
  const details = [t("detailOne"), t("detailTwo"), t("detailThree")];

  return (
    <section className="about-story" id="about">
      <div className="site-container about-story__grid">
        <figure className="about-story__media">
          <Image
            alt={locale === "ar" ? "محادثة هادئة حول العناية بالأسنان" : "A calm dental care consultation"}
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 48vw"
            src="/images/bright-way-about-consultation.webp"
          />
          <span className="about-story__image-note">
            {locale === "ar" ? "صورة توضيحية تجريبية" : "Demo presentation image"}
          </span>
        </figure>

        <div className="about-story__content">
          <p className="section-kicker">{t("eyebrow")}</p>
          <h2>{t("title")}</h2>
          <p className="about-story__statement">{t("statement")}</p>
          <p className="about-story__description">{t("descriptionOne")}</p>

          <ul className="about-story__values">
            {details.map((detail, index) => (
              <li key={detail}>
                <span className="about-story__icon">{icons[index]}</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <ButtonLink href={`/${locale}#doctor`} variant="secondary">
            {t("action")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
