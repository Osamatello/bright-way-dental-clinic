import { getTranslations } from "next-intl/server";

import { SectionIntro } from "../ui/section-intro";
import { FaqAccordion } from "../ui/faq-accordion";

type FaqSectionProps = {
  locale: "en" | "ar";
};

const faqKeys = [
  "firstVisit",
  "booking",
  "nervous",
  "insurance",
  "treatmentTime",
  "emergency",
] as const;

export async function FaqSection({}: FaqSectionProps) {
  const t = await getTranslations("Home.faq");

  const items = faqKeys.map((key) => ({
    id: key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-32" id="faq">
      <div className="site-container">
        <SectionIntro
          body={t("description")}
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <FaqAccordion items={items} className="mt-14" />
      </div>
    </section>
  );
}
