import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { BrandMark } from "../brand/brand-mark";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNavigation } from "./mobile-navigation";

type SiteHeaderProps = {
  locale: AppLocale;
};

export async function SiteHeader({ locale }: SiteHeaderProps) {
  const [t, brand] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("Brand"),
  ]);

  const items = [
    { href: `/${locale}/treatments`, label: t("treatments") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/doctor`, label: t("doctor") },
    { href: `/${locale}/results`, label: t("results") },
    { href: `/${locale}/faq`, label: t("faq") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-white/96 shadow-[0_5px_22px_rgba(21,36,53,0.055)] backdrop-blur-xl">
      <div className="site-container grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 lg:h-[84px] lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <BrandMark locale={locale} clinicLabel={brand("clinic")} />

        <div className="hidden justify-center lg:flex">
          <nav aria-label={t("menu")} className="flex items-center gap-7 xl:gap-10">
            {items.map((item) => (
              <Link
                className="relative py-3 text-[0.94rem] font-semibold tracking-[-0.01em] text-navy/72 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:text-navy hover:after:scale-x-100 focus-visible:text-navy rtl:after:origin-right xl:text-base"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher locale={locale} />
          <Link
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-gold px-7 text-[0.92rem] font-bold tracking-[0.01em] text-white shadow-[0_8px_20px_rgba(11,114,116,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_12px_26px_rgba(11,114,116,0.22)]"
            href={`/${locale}/contact`}
          >
            <span>{t("book")}</span>
            <span aria-hidden="true" className="premium-arrow text-gold-light">↗</span>
          </Link>
        </div>

        <MobileNavigation
          bookLabel={t("book")}
          closeLabel={t("close")}
          items={items}
          locale={locale}
          menuLabel={t("menu")}
        />
      </div>
    </header>
  );
}
