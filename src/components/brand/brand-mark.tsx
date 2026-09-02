import Image from "next/image";
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
      className="group inline-flex shrink-0 items-center gap-3.5"
      href={`/${locale}`}
      aria-label="Bright Way Dental Clinic"
    >
      <span
        className="relative size-11 shrink-0 overflow-hidden rounded-[0.8rem] shadow-[0_8px_22px_rgba(11,114,116,0.16)] transition-transform duration-300 group-hover:scale-[1.03] lg:size-12"
      >
        <Image
          alt=""
          className="object-contain"
          fill
          sizes="48px"
          src="/brand/bright-way-mark.svg"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.88rem] font-bold uppercase tracking-[0.13em] sm:text-[0.98rem] ${
            inverse ? "text-white" : "text-navy"
          }`}
        >
          Bright Way
        </span>
        <span
          className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.64rem] ${
            inverse ? "text-white/60" : "text-slate"
          }`}
        >
          {clinicLabel}
        </span>
      </span>
    </Link>
  );
}
