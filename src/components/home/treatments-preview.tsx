import Image from "next/image";

import { BookingTrigger } from "@/components/booking/booking-trigger";
import type { TreatmentKey } from "@/lib/booking/schema";
import type { AppLocale } from "@/i18n/routing";

type TreatmentsPreviewProps = { locale: AppLocale };

const SLUG_TO_TREATMENT: Record<string, TreatmentKey> = {
  "general-dentistry": "general",
  "cosmetic-dentistry": "cosmetic",
  "dental-implants": "implants",
  orthodontics: "orthodontics",
  "teeth-whitening": "whitening",
  "root-canal-treatment": "rootCanal",
  "pediatric-dentistry": "pediatric",
  "emergency-dentistry": "emergency",
};

const TREATMENT_IMAGES = {
  checkup: {
    alt: { en: "Dentist discussing a treatment plan during a consultation", ar: "طبيب أسنان يناقش خطة العلاج خلال استشارة" },
    src: "/images/bright-way-about-consultation.webp",
  },
  hygiene: {
    alt: { en: "Digital dental equipment prepared for preventive care", ar: "معدات أسنان رقمية مجهزة للعناية الوقائية" },
    src: "/images/bright-way-technology-v2.webp",
  },
  whitening: {
    alt: { en: "Bright modern dental treatment room", ar: "غرفة علاج أسنان حديثة ومضيئة" },
    src: "/images/bright-way-hero-white.webp",
  },
  emergency: {
    alt: { en: "Modern dental treatment room prepared for care", ar: "غرفة علاج أسنان حديثة مجهزة للرعاية" },
    src: "/images/bright-way-treatment-room.webp",
  },
} as const;

const serviceCopy = {
  en: {
    title: "Treatment Menu",
    description: "Select a service and request your preferred appointment.",
    select: "Select & Book",
    demo: "Demo availability",
    services: [
      ["Comprehensive Check-up", "Prevention · 45 min", "Tomorrow at 10:00 AM", "general-dentistry", "checkup"],
      ["Professional Hygiene", "Prevention · 60 min", "Today at 3:00 PM", "general-dentistry", "hygiene"],
      ["Cosmetic Whitening", "Aesthetic · 90 min", "Thursday at 2:00 PM", "teeth-whitening", "whitening"],
      ["Emergency Care", "Urgent · 30 min", "Today at 4:30 PM", "emergency-dentistry", "emergency"],
    ],
  },
  ar: {
    title: "قائمة العلاجات",
    description: "اختر الخدمة واطلب الموعد المناسب لك.",
    select: "اختر واحجز",
    demo: "مواعيد تجريبية",
    services: [
      ["فحص شامل للأسنان", "وقاية · 45 دقيقة", "غداً، 10:00 صباحاً", "general-dentistry", "checkup"],
      ["تنظيف احترافي", "وقاية · 60 دقيقة", "اليوم، 3:00 مساءً", "general-dentistry", "hygiene"],
      ["تبييض تجميلي", "تجميلي · 90 دقيقة", "الخميس، 2:00 مساءً", "teeth-whitening", "whitening"],
      ["رعاية طارئة", "عاجل · 30 دقيقة", "اليوم، 4:30 مساءً", "emergency-dentistry", "emergency"],
    ],
  },
} as const;

export function TreatmentsPreview({ locale }: TreatmentsPreviewProps) {
  const content = serviceCopy[locale];

  return (
    <section className="treatment-menu" id="treatments">
      <div className="site-container">
        <header className="treatment-menu__header">
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </header>

        <div className="treatment-menu__grid">
          {content.services.map(([title, detail, availability, slug, imageKey]) => (
            <article className="treatment-menu__card" key={title}>
              <div className="treatment-menu__media">
                <Image
                  alt={TREATMENT_IMAGES[imageKey].alt[locale]}
                  className="object-cover"
                  fill
                  sizes="(max-width: 639px) 116px, (max-width: 1023px) 22vw, 15vw"
                  src={TREATMENT_IMAGES[imageKey].src}
                />
              </div>
              <div className="treatment-menu__body">
                <div className="treatment-menu__topline">
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                  <span title={content.demo}>◷ {availability}</span>
                </div>
                <BookingTrigger treatment={SLUG_TO_TREATMENT[slug]} variant="card-link">
                  {content.select}
                </BookingTrigger>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
