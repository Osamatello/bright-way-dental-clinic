"use client";

import Link from "next/link";
import type { AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  locale: AppLocale;
  inverse?: boolean;
};

export function LocaleSwitcher({
  locale,
  inverse = false,
}: LocaleSwitcherProps) {
  const nextLocale: AppLocale = locale === "en" ? "ar" : "en";
  const href = `/${nextLocale}`;

  return (
    <Link
      className={`inline-flex min-h-11 min-w-11 items-center justify-center border px-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
        inverse
          ? "border-white/30 text-white hover:bg-white hover:text-navy"
          : "border-navy/20 text-navy hover:bg-navy hover:text-white"
      }`}
      href={href}
      hrefLang={nextLocale}
      lang={nextLocale}
    >
      {nextLocale === "ar" ? "ع" : "EN"}
    </Link>
  );
}
