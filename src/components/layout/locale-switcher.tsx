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
 * Compact two-state language control: `EN | AR`. The active locale is a solid,
 * non-interactive segment; the other is a link to the equivalent page in that
 * locale. Routing is unchanged — same `/${locale}` root the previous switcher used.
 */
export function LocaleSwitcher({ locale, inverse = false }: LocaleSwitcherProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-3.5 transition-colors duration-200";

  return (
    <div
      aria-label={locale === "ar" ? "اللغة" : "Language"}
      className={`inline-flex min-h-11 items-center overflow-hidden rounded-full border text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
        inverse ? "border-white/30" : "border-navy/20"
      }`}
      role="group"
    >
      {LOCALES.map(({ code, label }, index) => {
        const divider =
          index === 1 ? (inverse ? "border-s border-white/25" : "border-s border-navy/15") : "";

        if (code === locale) {
          return (
            <span
              aria-current="true"
              className={`${base} ${divider} ${inverse ? "bg-white text-navy" : "bg-navy text-white"}`}
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
              inverse ? "text-white/80 hover:text-white" : "text-navy/70 hover:text-navy"
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
