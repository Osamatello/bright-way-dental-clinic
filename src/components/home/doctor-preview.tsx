import Image from "next/image";

import { BookingTrigger } from "@/components/booking/booking-trigger";
import type { AppLocale } from "@/i18n/routing";

type DoctorPreviewProps = { locale: AppLocale };

const icons = [
  <svg aria-hidden="true" key="shield" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  <svg aria-hidden="true" key="award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="m9 14-1 7 4-2 4 2-1-7"/></svg>,
  <svg aria-hidden="true" key="scan" viewBox="0 0 24 24"><path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4"/><rect x="8" y="8" width="8" height="8" rx="2"/></svg>,
];

const copy = {
  en: {
    demo: "Demo doctor profile",
    name: "Dr. Adam Kareem",
    role: "Lead Dentist · Demonstration Profile",
    action: "Request a consultation",
    roomAlt: "Bright modern dental treatment room",
    values: [
      ["Board Certified", "Swiss & European dental board certification"],
      ["12+ Years Experience", "Specialized in aesthetic and preventive care"],
      ["Tech-First Approach", "Digital scanning, AI diagnostics, painless laser treatments"],
    ],
  },
  ar: {
    demo: "ملف طبيب تجريبي",
    name: "د. آدم كريم",
    role: "طبيب أسنان رئيسي · ملف تجريبي",
    action: "طلب استشارة",
    roomAlt: "غرفة علاج أسنان حديثة ومضيئة",
    values: [
      ["اعتماد مهني", "اعتماد من مجالس طب الأسنان السويسرية والأوروبية"],
      ["خبرة تتجاوز 12 عاماً", "متخصص في طب الأسنان التجميلي والوقائي"],
      ["نهج تقني متقدم", "المسح الرقمي وتشخيصات الذكاء الاصطناعي وعلاجات الليزر المريحة"],
    ],
  },
} as const;

export function DoctorPreview({ locale }: DoctorPreviewProps) {
  const content = copy[locale];

  return (
    <section className="doctor-compact" id="doctor">
      <div className="site-container doctor-compact__grid">
        <div className="doctor-compact__profile">
          <p className="doctor-compact__demo">{content.demo}</p>
          <div className="doctor-compact__identity">
            <div className="doctor-compact__portrait">
              <Image alt="" className="object-cover object-[50%_25%]" fill sizes="112px" src="/images/bright-way-demo-doctor.webp" />
            </div>
            <div>
              <p className="doctor-compact__name">{content.name}</p>
              <p className="doctor-compact__role">{content.role}</p>
            </div>
          </div>

          <div className="doctor-compact__values">
            {content.values.map(([title, body], index) => (
              <div className="doctor-compact__value" key={title}>
                <span className="doctor-compact__icon">{icons[index]}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </div>
            ))}
          </div>

          <p className="doctor-compact__disclaimer">
            {locale === "ar" ? "بيانات تجريبية للعرض فقط." : "Demonstration profile — details are not clinic claims."}
          </p>
          <BookingTrigger className="doctor-compact__link" variant="inline-link">
            {content.action} <span aria-hidden="true">→</span>
          </BookingTrigger>
        </div>

        <figure className="doctor-compact__room">
          <Image alt={content.roomAlt} className="object-cover" fill sizes="(max-width: 1023px) 100vw, 52vw" src="/images/bright-way-treatment-room.webp" />
        </figure>
      </div>
    </section>
  );
}
