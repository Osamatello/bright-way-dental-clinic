import type { AppLocale } from "@/i18n/routing";

type LocationContactProps = { locale: AppLocale };

const icons = {
  transit: <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="15" rx="3"/><path d="M8 21l2-3M16 21l-2-3M8 8h8M8 13h.01M16 13h.01"/></svg>,
  parking: <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M10 17V7h3a3 3 0 0 1 0 6h-3"/></svg>,
  area: <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  form: <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3h10l3 3v15H7z"/><path d="M17 3v4h4M10 12h7M10 16h7"/></svg>,
  id: <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c1-2 5-2 6 0M13 10h5M13 14h5"/></svg>,
  clock: <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
};

const copy = {
  en: {
    eyebrow: "Find us",
    title: "Visit Us",
    demo: "Demo location",
    address: "Dubai Healthcare City, Dubai",
    region: "Presentation address — replace before launch",
    mapTitle: "Demo map showing Dubai Healthcare City",
    mapAction: "Open in Google Maps",
    access: [["Metro access", "Healthcare City station nearby"], ["Parking", "Public parking available in the area"], ["Area", "Dubai Healthcare City"]],
    patientTitle: "New Patient Information",
    patient: ["Book your preferred time before visiting", "Bring a valid ID to your appointment", "Arrive 5 minutes early for your first visit"],
    comfortTitle: "Your Comfort",
    comfort: ["Calm setting", "Clear guidance", "Comfortable waiting"],
    note: "All location and visitor details shown here are demonstration content.",
  },
  ar: {
    eyebrow: "موقعنا",
    title: "تفضل بزيارتنا",
    demo: "موقع تجريبي",
    address: "مدينة دبي الطبية، دبي",
    region: "عنوان للعرض — يُستبدل قبل الإطلاق",
    mapTitle: "خريطة تجريبية لمدينة دبي الطبية",
    mapAction: "فتح في خرائط Google",
    access: [["الوصول بالمترو", "محطة مدينة دبي الطبية قريبة"], ["المواقف", "مواقف عامة متاحة في المنطقة"], ["المنطقة", "مدينة دبي الطبية"]],
    patientTitle: "معلومات المريض الجديد",
    patient: ["احجز الوقت المناسب قبل الزيارة", "أحضر بطاقة هوية سارية إلى موعدك", "احضر قبل موعدك الأول بخمس دقائق"],
    comfortTitle: "راحتك",
    comfort: ["أجواء هادئة", "إرشادات واضحة", "انتظار مريح"],
    note: "جميع تفاصيل الموقع والزيارة المعروضة هنا تجريبية.",
  },
} as const;

export function LocationContact({ locale }: LocationContactProps) {
  const content = copy[locale];
  const accessIcons = [icons.transit, icons.parking, icons.area];
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
              <div className="visit-us__address">
                <span>{content.demo}</span><strong>{content.address}</strong><small>{content.region}</small>
              </div>
            </div>
            <a className="visit-us__map-link" href="https://www.google.com/maps/search/?api=1&query=Dubai+Healthcare+City+Dubai" rel="noreferrer" target="_blank">{content.mapAction} <span aria-hidden="true">↗</span></a>
            <div className="visit-us__access">
              {content.access.map(([title, body], index) => <div key={title}><span>{accessIcons[index]}</span><p><strong>{title}</strong><small>{body}</small></p></div>)}
            </div>
          </div>
          <div className="visit-us__info">
            <h3>{content.patientTitle}</h3>
            <ul>{content.patient.map((item, index) => <li key={item}><span>{patientIcons[index]}</span>{item}</li>)}</ul>
            <h3>{content.comfortTitle}</h3>
            <div className="visit-us__comfort">{content.comfort.map((item, index) => <div key={item}><span>{accessIcons[index]}</span><strong>{item}</strong></div>)}</div>
            <p className="visit-us__note">{content.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
