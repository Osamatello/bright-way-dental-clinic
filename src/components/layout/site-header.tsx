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
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-ivory/95 shadow-[0_1px_0_rgba(21,36,53,0.025)] backdrop-blur-xl">
      <div className="site-container grid h-[76px] grid-cols-[1fr_auto] items-center gap-5 lg:h-[88px] lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        <BrandMark locale={locale} clinicLabel={brand("clinic")} />

        <nav
          aria-label={t("menu")}
          className="hidden items-center justify-center gap-7 lg:flex xl:gap-10"
        >
          {items.map((item) => (
            <Link
              className="relative py-3 text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-navy/68 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:text-navy hover:after:scale-x-100 rtl:after:origin-right"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher locale={locale} />
          <Link
            className="group inline-flex min-h-12 items-center justify-center gap-4 bg-navy px-6 text-[0.67rem] font-semibold uppercase tracking-[0.14em] text-white transition-[background-color,transform] duration-300 hover:-translate-y-px hover:bg-navy/92"
            href={`/${locale}/contact`}
          >
            <span>{t("book")}</span>
            <span aria-hidden="true" className="text-gold transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">↗</span>
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
