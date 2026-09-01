import type { AppLocale } from "@/i18n/routing";
import type { TreatmentSlug } from "@/data/treatments";
import { getBaseUrl, getCanonicalUrl, siteConfig } from "./seo";

function getOrganizationId() {
  return `${getBaseUrl()}/#organization`;
}

function getWebSiteId() {
  return `${getBaseUrl()}/#website`;
}

/**
 * Builds one stable clinic entity across all locales using only verified data.
 * LocalBusiness/Dentist-specific fields such as address, phone, geo coordinates,
 * opening hours, ratings, and area served remain intentionally omitted until verified.
 */
export function buildClinicSchema(_locale: AppLocale) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": getOrganizationId(),
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    url: baseUrl,
    image: `${baseUrl}/images/bright-way-clinic-hero.webp`,
  };
}

/**
 * Builds one stable bilingual WebSite entity without claiming unsupported search features.
 */
export function buildWebSiteSchema(_locale: AppLocale) {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getWebSiteId(),
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    url: baseUrl,
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": getOrganizationId(),
    },
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Builds BreadcrumbList structured data from the same items used for visible breadcrumbs.
 */
export function buildBreadcrumbSchema(locale: AppLocale, items: BreadcrumbItem[]) {
  if (!items.length) return null;

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
 * Uses Service as the safe baseline for every treatment page.
 * MedicalProcedure classifications remain intentionally disabled until each treatment's
 * clinical categorization has been reviewed with verified clinic content.
 */
export function buildTreatmentSchema(
  locale: AppLocale,
  slug: TreatmentSlug,
  title: string,
  description: string
) {
  const canonical = getCanonicalUrl(locale, `treatments/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: title,
    description,
    url: canonical,
    serviceType: title,
    provider: {
      "@type": "Organization",
      "@id": getOrganizationId(),
      name: siteConfig.name.en,
    },
  };
}

export type FaqItemSchema = {
  question: string;
  answer: string;
};

/**
 * Builds FAQPage schema directly from visible FAQ content.
 * This improves machine-readable parity but does not imply eligibility for a rich result.
 */
export function buildFaqSchema(items: FaqItemSchema[]) {
  const validItems = items.filter(
    (item) => item.question.trim().length > 0 && item.answer.trim().length > 0
  );

  if (!validItems.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type VerifiedDoctorData = {
  name: string;
  jobTitle?: string;
};

/**
 * Builds a doctor Person entity only when verified identity data is supplied.
 * Optional properties are emitted only when explicitly provided.
 */
export function buildDoctorPersonSchema(
  locale: AppLocale,
  verifiedDoctorData?: VerifiedDoctorData
) {
  const name = verifiedDoctorData?.name?.trim();
  if (!name) return null;

  const canonical = getCanonicalUrl(locale, "doctor");
  const jobTitle = verifiedDoctorData?.jobTitle?.trim();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${canonical}#doctor`,
    name,
    url: canonical,
    ...(jobTitle ? { jobTitle } : {}),
    worksFor: {
      "@type": "Organization",
      "@id": getOrganizationId(),
      name: siteConfig.name.en,
    },
  };
}
