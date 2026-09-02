import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

type DoctorPreviewProps = { locale: AppLocale };

export async function DoctorPreview({ locale }: DoctorPreviewProps) {
  const [doctor, about] = await Promise.all([
    getTranslations("Home.doctor"),
    getTranslations("Home.about"),
  ]);

  const valueBodies = locale === "ar"
    ? [
        "نستمع أولاً ونشرح كل خطوة بوضوح.",
        "حوار علاجي يراعي الاحتياجات الفردية.",
        "بيئة هادئة تساعد على الشعور بالثقة.",
      ]
    : [
        "We listen first and explain every next step clearly.",
        "Treatment conversations shaped around individual needs.",
        "A calm environment designed to support confidence.",
      ];
  const values = [about("detailOne"), about("detailTwo"), about("detailThree")];

  return (
    <section className="doctor-compact" id="doctor">
      <div className="site-container doctor-compact__grid">
        <div className="doctor-compact__profile">
          <div className="doctor-compact__identity">
            <div className="doctor-compact__portrait">
              <Image
                alt={doctor("portraitLabel")}
                className="object-cover object-center"
                fill
                sizes="96px"
                src="/images/bright-way-doctor-official.jpeg"
              />
            </div>
            <div>
              <p className="doctor-compact__name">{doctor("portraitLabel")}</p>
              <p className="doctor-compact__role">{doctor("eyebrow")}</p>
            </div>
          </div>

          <div className="doctor-compact__values">
            {values.map((value, index) => (
              <div className="doctor-compact__value" key={value}>
                <span aria-hidden="true" className="doctor-compact__icon">
                  {index === 0 ? "◇" : index === 1 ? "◎" : "✦"}
                </span>
                <div>
                  <h3>{value}</h3>
                  <p>{valueBodies[index]}</p>
                </div>
              </div>
            ))}
          </div>

          <Link className="doctor-compact__link" href={`/${locale}/doctor`}>
            {doctor("action")} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="doctor-compact__room">
          <Image
            alt={locale === "ar" ? "غرفة علاج أسنان حديثة ومضيئة" : "Bright modern dental treatment room"}
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            src="/images/bright-way-treatment-room.webp"
          />
        </figure>
      </div>
    </section>
  );
}
