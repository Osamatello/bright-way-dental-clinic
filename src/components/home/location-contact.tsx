import type { AppLocale } from "@/i18n/routing";

type LocationContactProps = { locale: AppLocale };

const icons = {
  form: <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3h10l3 3v15H7z"/><path d="M17 3v4h4M10 12h7M10 16h7"/></svg>,
  id: <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c1-2 5-2 6 0M13 10h5M13 14h5"/></svg>,
  clock: <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
};

const copy = {
  en: {
    eyebrow: "Find us",
    title: "Visit Us",
    mapTitle: "Map showing Dubai Healthcare City",
    mapAction: "Open in Google Maps",
    patientTitle: "New Patient Information",
    patient: ["Book your preferred time before visiting", "Bring a valid ID to your appointment", "Arrive 5 minutes early for your first visit"],
  },
  ar: {
    eyebrow: "موقعنا",
    title: "تفضل بزيارتنا",
    mapTitle: "خريطة لمدينة دبي الطبية",
    mapAction: "فتح في خرائط Google",
    patientTitle: "معلومات المريض الجديد",
    patient: ["احجز الوقت المناسب قبل الزيارة", "أحضر بطاقة هوية سارية إلى موعدك", "احضر قبل موعدك الأول بخمس دقائق"],
  },
} as const;

export function LocationContact({ locale }: LocationContactProps) {
  const content = copy[locale];
  const patientIcons = [icons.form, icons.id, icons.clock];
  return (
    <section className="visit-us" id="contact-section">
      <div className="site-container">
        <p className="section-kicker">{content.eyebrow}</p>
        <div className="visit-us__grid">
          <div>
            <h2>{content.title}</h2>
            <div className="visit-us__map">
              <iframe allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Dubai%20Healthcare%20City%2C%20Dubai&output=embed" title={content.mapTitle} />
            </div>
            <a className="visit-us__map-link" href="https://www.google.com/maps/search/?api=1&query=Dubai+Healthcare+City+Dubai" rel="noreferrer" target="_blank">{content.mapAction} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="visit-us__info">
            <h3>{content.patientTitle}</h3>
            <ul>{content.patient.map((item, index) => <li key={item}><span>{patientIcons[index]}</span>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
