export type TreatmentSlug =
  | "general-dentistry"
  | "cosmetic-dentistry"
  | "dental-implants"
  | "orthodontics"
  | "teeth-whitening"
  | "root-canal-treatment"
  | "pediatric-dentistry"
  | "emergency-dentistry";

export type Treatment = {
  slug: TreatmentSlug;
  number: string;
  related: TreatmentSlug[];
};

export const treatments: Treatment[] = [
  {
    slug: "general-dentistry",
    number: "01",
    related: ["cosmetic-dentistry", "root-canal-treatment", "pediatric-dentistry"],
  },
  {
    slug: "cosmetic-dentistry",
    number: "02",
    related: ["teeth-whitening", "general-dentistry", "orthodontics"],
  },
  {
    slug: "dental-implants",
    number: "03",
    related: ["general-dentistry", "cosmetic-dentistry", "root-canal-treatment"],
  },
  {
    slug: "orthodontics",
    number: "04",
    related: ["cosmetic-dentistry", "general-dentistry", "pediatric-dentistry"],
  },
  {
    slug: "teeth-whitening",
    number: "05",
    related: ["cosmetic-dentistry", "general-dentistry", "orthodontics"],
  },
  {
    slug: "root-canal-treatment",
    number: "06",
    related: ["general-dentistry", "dental-implants", "emergency-dentistry"],
  },
  {
    slug: "pediatric-dentistry",
    number: "07",
    related: ["general-dentistry", "orthodontics", "teeth-whitening"],
  },
  {
    slug: "emergency-dentistry",
    number: "08",
    related: ["general-dentistry", "root-canal-treatment", "dental-implants"],
  },
];

export const treatmentSlugs = treatments.map((t) => t.slug);

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug);
}

export function getRelatedTreatments(slug: TreatmentSlug): Treatment[] {
  const treatment = getTreatment(slug);
  if (!treatment) return [];
  return treatment.related
    .map((relSlug) => getTreatment(relSlug))
    .filter((t): t is Treatment => t !== undefined);
}
