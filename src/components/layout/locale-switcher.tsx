"use client";

import Link from "next/link";

import type { AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  locale: AppLocale;
  inverse?: boolean;
};

const LOCALES: { code: AppLocale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

/**
 * Compact two-state language control: `EN | AR`. The active locale is a solid
 * teal segment (same teal family as the header "Book an appointment" button);
 * the other locale is a light segment linking to the equivalent page. Routing
 * is unchanged — same `/${locale}` root the previous switcher used.
 */
export function LocaleSwitcher({ locale, inverse = false }: LocaleSwitcherProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-3.5 transition-colors duration-200";

  return (
    <div
      aria-label={locale === "ar" ? "اللغة" : "Language"}
      className={`inline-flex min-h-11 items-center overflow-hidden rounded-full border text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
        inverse ? "border-white/25" : "border-navy/15"
      }`}
      role="group"
    >
      {LOCALES.map(({ code, label }, index) => {
        const divider =
          index === 1
            ? inverse
              ? "border-s border-white/20"
              : "border-s border-navy/10"
            : "";

        if (code === locale) {
          return (
            <span
              aria-current="true"
              className={`${base} ${divider} bg-gold text-white`}
              key={code}
              lang={code}
            >
              {label}
            </span>
          );
        }

        return (
          <Link
            className={`${base} ${divider} ${
              inverse
                ? "bg-white/10 text-white/75 hover:bg-white/20 hover:text-white"
                : "bg-white text-navy/60 hover:bg-sand hover:text-navy"
            }`}
            href={`/${code}`}
            hrefLang={code}
            key={code}
            lang={code}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
