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
      <div className="site-container grid h-[66px] grid-cols-[1fr_auto] items-center gap-4 lg:h-[74px] lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        <BrandMark locale={locale} clinicLabel={brand("clinic")} />

        <div className="hidden justify-center lg:flex">
          <nav aria-label={t("menu")} className="flex items-center gap-5 xl:gap-8">
            {items.map((item) => (
              <Link
                className="relative py-3 text-[0.76rem] font-medium tracking-[-0.01em] text-navy/66 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:text-navy hover:after:scale-x-100 focus-visible:text-navy rtl:after:origin-right"
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
            className="group inline-flex min-h-10 items-center justify-center gap-3 rounded-lg bg-navy px-5 text-[0.72rem] font-semibold tracking-[0.04em] text-white shadow-[0_8px_20px_rgba(21,36,53,0.12)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-navy/92 hover:shadow-[0_12px_26px_rgba(21,36,53,0.18)]"
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
