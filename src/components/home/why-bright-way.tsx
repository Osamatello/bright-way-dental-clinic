import { getTranslations } from "next-intl/server";

type WhyBrightWayProps = {
  locale: "en" | "ar";
};

const valueKeys = [
  { key: "valueOne", titleKey: "valueOne", bodyKey: "valueOneBody" },
  { key: "valueTwo", titleKey: "valueTwo", bodyKey: "valueTwoBody" },
  { key: "valueThree", titleKey: "valueThree", bodyKey: "valueThreeBody" },
] as const;

export async function WhyBrightWay({}: WhyBrightWayProps) {
  const t = await getTranslations("Home.whyBrightWay");

  return (
    <section className="bg-navy py-20 text-white sm:py-28 lg:py-36" id="why">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-white/45">
              {t("eyebrow")}
            </p>
            <h2 className="display-heading mt-8 max-w-xl text-5xl leading-[1.04] text-white sm:text-6xl">
              {t("title")}
            </h2>
          </div>

          <div className="border-t border-white/15 pt-8 lg:pt-10">
            <p className="display-heading max-w-3xl text-3xl leading-[1.14] text-white/72 sm:text-4xl">
              {t("statement")}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/60">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15">
          {valueKeys.map((value) => (
            <article
              className="group grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[1fr_1.2fr] sm:items-center sm:gap-12 sm:py-9"
              key={value.key}
            >
              <h3 className="display-heading text-2xl text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl rtl:group-hover:-translate-x-1">
                {t(value.titleKey)}
              </h3>
              <p className="max-w-md text-sm leading-7 text-white/60">
                {t(value.bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
