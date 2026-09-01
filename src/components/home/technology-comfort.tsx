import Image from "next/image";
import { getTranslations } from "next-intl/server";

type TechnologyComfortProps = {
  locale: "en" | "ar";
};

const pointKeys = [
  { key: "pointOne", titleKey: "pointOne", bodyKey: "pointOneBody" },
  { key: "pointTwo", titleKey: "pointTwo", bodyKey: "pointTwoBody" },
  { key: "pointThree", titleKey: "pointThree", bodyKey: "pointThreeBody" },
] as const;

export async function TechnologyComfort({}: TechnologyComfortProps) {
  const t = await getTranslations("Home.technology");

  return (
    <section className="bg-cream py-20 sm:py-28 lg:py-36" id="technology">
      <div className="site-container grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <figure className="relative min-h-[28rem] overflow-hidden border border-navy/10 sm:min-h-[36rem] lg:order-2">
          <Image
            alt={t("imageAlt")}
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 48vw"
            src="/images/technology-comfort.jpg"
          />
          <figcaption className="absolute inset-x-4 bottom-4 border border-white/25 bg-navy/88 px-5 py-4 text-xs tracking-[0.08em] text-white backdrop-blur-sm sm:max-w-64">
            {t("imageCaption")}
          </figcaption>
        </figure>

        <div className="lg:order-1">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-slate">
            {t("eyebrow")}
          </p>
          <h2 className="display-heading mt-8 max-w-2xl text-4xl leading-[1.08] text-navy sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-slate">
            {t("description")}
          </p>

          <div className="mt-12 border-t fine-rule">
            {pointKeys.map((point) => (
              <div
                className="border-b fine-rule py-6 sm:flex sm:gap-8 sm:py-7"
                key={point.key}
              >
                <h3 className="display-heading mb-2 text-xl text-navy sm:mb-0 sm:w-52 sm:shrink-0 sm:text-2xl">
                  {t(point.titleKey)}
                </h3>
                <p className="max-w-md text-sm leading-7 text-slate">
                  {t(point.bodyKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
