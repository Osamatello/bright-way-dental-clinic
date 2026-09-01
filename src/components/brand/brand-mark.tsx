import Link from "next/link";

import type { AppLocale } from "@/i18n/routing";

type BrandMarkProps = {
  locale: AppLocale;
  clinicLabel: string;
  inverse?: boolean;
};

export function BrandMark({
  locale,
  clinicLabel,
  inverse = false,
}: BrandMarkProps) {
  return (
    <Link
      className="group inline-flex items-center gap-3"
      href={`/${locale}`}
      aria-label="Bright Way Dental Clinic"
    >
      <span
        aria-hidden="true"
        className={`grid size-10 place-items-center border text-[0.64rem] font-semibold tracking-[0.18em] transition-colors duration-300 group-hover:bg-navy group-hover:text-white ${
          inverse
            ? "border-white/35 text-white group-hover:bg-white group-hover:text-navy"
            : "border-navy/25 text-navy"
        }`}
      >
        BW
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.92rem] font-semibold uppercase tracking-[0.17em] ${
            inverse ? "text-white" : "text-navy"
          }`}
        >
          Bright Way
        </span>
        <span
          className={`mt-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] ${
            inverse ? "text-white/60" : "text-slate"
          }`}
        >
          {clinicLabel}
        </span>
      </span>
    </Link>
  );
}
