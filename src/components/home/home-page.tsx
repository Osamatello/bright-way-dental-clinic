import "./home-vance.css";

import type { AppLocale } from "@/i18n/routing";

import { AboutPreview } from "./about-preview";
import { AppointmentCta } from "./appointment-cta";
import { DoctorPreview } from "./doctor-preview";
import { FaqSection } from "./faq-section";
import { HomeHero } from "./home-hero";
import { LocationContact } from "./location-contact";
import { PatientJourney } from "./patient-journey";
import { TechnologyComfort } from "./technology-comfort";
import { TreatmentsPreview } from "./treatments-preview";
import { WhyBrightWay } from "./why-bright-way";

type HomePageProps = {
  locale: AppLocale;
};

export function HomePage({ locale }: HomePageProps) {
  return (
    <>
      <HomeHero locale={locale} />
      <TreatmentsPreview locale={locale} />
      <AboutPreview locale={locale} />
      <DoctorPreview locale={locale} />
      <PatientJourney locale={locale} />
      <TechnologyComfort locale={locale} />
      <WhyBrightWay locale={locale} />
      <FaqSection locale={locale} />
      <AppointmentCta locale={locale} />
      <LocationContact locale={locale} />
    </>
  );
}
