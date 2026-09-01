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
      className="group inline-flex shrink-0 items-center gap-3"
      href={`/${locale}`}
      aria-label="Bright Way Dental Clinic"
    >
      <span
        className={`relative size-12 shrink-0 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-[1.03] sm:size-14 ${
          inverse ? "ring-1 ring-white/30" : "ring-1 ring-gold/55"
        }`}
      >
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="56px"
          src="/images/bright-way-official-logo.jpeg"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.84rem] font-semibold uppercase tracking-[0.15em] sm:text-[0.92rem] sm:tracking-[0.17em] ${
            inverse ? "text-white" : "text-navy"
          }`}
        >
          Bright Way
        </span>
        <span
          className={`mt-1.5 text-[0.56rem] font-medium uppercase tracking-[0.18em] sm:text-[0.62rem] sm:tracking-[0.2em] ${
            inverse ? "text-white/60" : "text-slate"
          }`}
        >
          {clinicLabel}
        </span>
      </span>
    </Link>
  );
}
