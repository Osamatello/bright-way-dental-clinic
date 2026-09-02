import "./home-vance.css";

import type { AppLocale } from "@/i18n/routing";

import { AboutPreview } from "./about-preview";
import { AppointmentCta } from "./appointment-cta";
import { DoctorPreview } from "./doctor-preview";
import { HomeHero } from "./home-hero";
import { LocationContact } from "./location-contact";
import { TechnologyComfort } from "./technology-comfort";
import { TestimonialsSection } from "./testimonials-section";
import { TreatmentsPreview } from "./treatments-preview";

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
      <TechnologyComfort locale={locale} />
      <TestimonialsSection locale={locale} />
      <AppointmentCta locale={locale} />
      <LocationContact locale={locale} />
    </>
  );
}
