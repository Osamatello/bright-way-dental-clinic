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
      {inverse ? (
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center border border-white/35 text-[0.64rem] font-semibold tracking-[0.18em] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-navy"
        >
          BW
        </span>
      ) : (
        <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/55 transition-transform duration-500 group-hover:scale-[1.03] sm:size-14">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="56px"
            src="/images/bright-way-official-logo.jpeg"
            unoptimized
          />
        </span>
      )}
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
