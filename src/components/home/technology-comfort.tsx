import Image from "next/image";

type TechnologyComfortProps = { locale: "en" | "ar" };

const icons = [
  <svg aria-hidden="true" key="leaf" viewBox="0 0 24 24"><path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-6 10-15Z"/><path d="M4 20c3-5 7-8 12-11"/></svg>,
  <svg aria-hidden="true" key="scan" viewBox="0 0 24 24"><path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4"/><path d="M7 12h10M12 7v10"/></svg>,
  <svg aria-hidden="true" key="comfort" viewBox="0 0 24 24"><path d="M7 12V8a5 5 0 0 1 10 0v4M5 12h14v7H5z"/><path d="M8 19v2M16 19v2"/></svg>,
];

const copy = {
  en: {
    eyebrow: "Technology & comfort",
    title: "Modern care, designed around your comfort.",
    description: "A calm environment and thoughtful digital tools can make every stage feel clearer and more comfortable.",
    imageAlt: "Modern digital dental equipment in a bright treatment suite",
    imageNote: "Demo presentation image",
    points: [
      ["Calm Environment", "A light, considered space designed to help visits feel more relaxed."],
      ["Digital Precision", "Modern tools support clearer planning and thoughtful care."],
      ["Patient Comfort", "Simple explanations and a gentle pace throughout the visit."],
    ],
  },
  ar: {
    eyebrow: "التقنية والراحة",
    title: "رعاية حديثة مصممة حول راحتك.",
    description: "بيئة هادئة وأدوات رقمية مدروسة تجعل كل مرحلة أوضح وأكثر راحة.",
    imageAlt: "تقنيات أسنان رقمية حديثة داخل غرفة علاج مضيئة",
    imageNote: "صورة توضيحية تجريبية",
    points: [
      ["بيئة هادئة", "مساحة مضيئة ومدروسة تساعد على جعل الزيارة أكثر راحة."],
      ["دقة رقمية", "أدوات حديثة تدعم التخطيط الواضح والرعاية المدروسة."],
      ["راحة المريض", "شرح بسيط وإيقاع مريح خلال مختلف مراحل الزيارة."],
    ],
  },
} as const;

export function TechnologyComfort({ locale }: TechnologyComfortProps) {
  const content = copy[locale];
  return (
    <section className="technology-compact" id="technology">
      <div className="site-container technology-compact__grid">
        <div className="technology-compact__content">
          <p className="section-kicker">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p className="technology-compact__description">{content.description}</p>
          <div className="technology-compact__points">
            {content.points.map(([title, body], index) => (
              <article key={title}>
                <span className="technology-compact__icon">{icons[index]}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
        <figure className="technology-compact__media">
          <Image alt={content.imageAlt} className="object-cover" fill sizes="(max-width: 1023px) 100vw, 48vw" src="/images/bright-way-technology-v2.webp" />
          <span>{content.imageNote}</span>
        </figure>
      </div>
    </section>
  );
}
