import type { AppLocale } from "@/i18n/routing";
import type { TreatmentSlug } from "@/data/treatments";
import { getBaseUrl, getCanonicalUrl, siteConfig } from "./seo";

/**
 * Builds the truthful Dentist / Organization schema.
 * Missing NAP (phone, address, geo, opening hours, ratings) is intentionally omitted
 * until official verified clinic details are provided.
 */
export function buildClinicSchema(locale: AppLocale) {
  const clinicName = siteConfig.name[locale] || siteConfig.name.en;
  const canonical = getCanonicalUrl(locale);
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${canonical}#clinic`,
    name: clinicName,
    url: canonical,
    image: `${baseUrl}/images/bright-way-clinic-hero.webp`,
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

/**
 * Builds the WebSite entity schema.
 */
export function buildWebSiteSchema(locale: AppLocale) {
  const siteName = siteConfig.name[locale] || siteConfig.name.en;
  const canonical = getCanonicalUrl(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getCanonicalUrl(locale)}#website`,
    name: siteName,
    url: canonical,
    inLanguage: locale === "ar" ? "ar" : "en",
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Builds BreadcrumbList structured data for visible breadcrumb trails.
 */
export function buildBreadcrumbSchema(locale: AppLocale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(locale, item.path),
    })),
  };
}

/**
 * Treatments that genuinely represent an invasive / clinical medical procedure
 * vs general consultative or maintenance dental services.
 */
const medicalProcedureSlugs: TreatmentSlug[] = [
  "root-canal-treatment",
  "dental-implants",
];

/**
 * Builds truthful Treatment Service / MedicalProcedure schema.
 * Reuses visible treatment data without fabricating pricing, outcome statistics, or insurance claims.
 */
export function buildTreatmentSchema(
  locale: AppLocale,
  slug: TreatmentSlug,
  title: string,
  description: string
) {
  const canonical = getCanonicalUrl(locale, `treatments/${slug}`);
  const clinicName = siteConfig.name[locale] || siteConfig.name.en;
  const isProcedure = medicalProcedureSlugs.includes(slug);

  if (isProcedure) {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "@id": `${canonical}#procedure`,
      name: title,
      description,
      url: canonical,
      procedureType: "NonSurgicalProcedure",
      provider: {
        "@type": "Dentist",
        name: clinicName,
        url: getCanonicalUrl(locale),
      },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: title,
    description,
    url: canonical,
    serviceType: "Dental Service",
    provider: {
      "@type": "Dentist",
      name: clinicName,
      url: getCanonicalUrl(locale),
    },
  };
}

export type FaqItemSchema = {
  question: string;
  answer: string;
};

/**
 * Builds FAQPage schema directly from visible FAQ items.
 * Ensures complete parity between visible content and structured data.
 */
export function buildFaqSchema(items: FaqItemSchema[]) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Conditional Doctor / Person Schema builder.
 * If verified doctor name or entity information is not present, returns null.
 * Never creates placeholder or fake Doctor entities.
 */
export function buildDoctorPersonSchema(
  _locale: AppLocale,
  verifiedDoctorData?: { name: string; jobTitle?: string }
) {
  if (!verifiedDoctorData || !verifiedDoctorData.name) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: verifiedDoctorData.name,
    jobTitle: verifiedDoctorData.jobTitle || "Dentist",
  };
}
