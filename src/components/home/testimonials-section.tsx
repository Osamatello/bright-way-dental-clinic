import Image from "next/image";

import type { AppLocale } from "@/i18n/routing";

type TestimonialsSectionProps = { locale: AppLocale };

const copy = {
  en: {
    eyebrow: "Patient experiences",
    title: "What Our Patients Say",
    description: "Sample testimonials for the Bright Way website presentation.",
    disclaimer: "Demonstration content — replace with verified patient feedback before launch.",
    items: [
      ["The visit felt calm, organised and genuinely personal from the first conversation.", "Lina A. · Sample patient"],
      ["Everything was explained clearly, and I never felt rushed when asking questions.", "Omar K. · Sample patient"],
      ["A welcoming environment and a thoughtful approach made the experience feel different.", "Maya R. · Sample patient"],
      ["Booking was simple and the communication throughout the visit was reassuring.", "Karim H. · Sample patient"],
    ],
  },
  ar: {
    eyebrow: "تجارب المرضى",
    title: "ماذا يقول مرضانا",
    description: "آراء تجريبية مخصصة لعرض موقع برايت واي.",
    disclaimer: "محتوى تجريبي — يُستبدل بآراء مرضى موثقة قبل الإطلاق.",
    items: [
      ["كانت الزيارة هادئة ومنظمة وشعرت بالاهتمام منذ المحادثة الأولى.", "لينا أ. · مريضة تجريبية"],
      ["تم شرح كل شيء بوضوح، وكان لدي الوقت الكافي لطرح جميع أسئلتي.", "عمر ك. · مريض تجريبي"],
      ["البيئة المريحة والأسلوب المدروس جعلا التجربة مختلفة بالفعل.", "مايا ر. · مريضة تجريبية"],
      ["كان الحجز بسيطاً والتواصل خلال الزيارة مطمئناً وواضحاً.", "كريم هـ. · مريض تجريبي"],
    ],
  },
} as const;

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const content = copy[locale];

  return (
    <section className="testimonials" id="testimonials">
      <div className="site-container testimonials__grid">
        <div className="testimonials__content">
          <p className="testimonials__eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p className="testimonials__description">{content.description}</p>

          <div className="testimonials__cards">
            {content.items.map(([quote, author]) => (
              <figure className="testimonials__card" key={author}>
                <div aria-label="5 out of 5 stars" className="testimonials__stars">★★★★★</div>
                <blockquote>“{quote}”</blockquote>
                <figcaption>{author}</figcaption>
              </figure>
            ))}
          </div>
          <p className="testimonials__disclaimer">{content.disclaimer}</p>
        </div>

        <figure className="testimonials__media">
          <Image
            alt={locale === "ar" ? "صالة انتظار حديثة ومضيئة في عيادة أسنان" : "Bright modern dental clinic waiting lounge"}
            className="object-cover"
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            src="/images/bright-way-waiting-lounge.webp"
          />
        </figure>
      </div>
    </section>
  );
}
