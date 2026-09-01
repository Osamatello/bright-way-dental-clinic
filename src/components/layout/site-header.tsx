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
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-ivory/92 shadow-[0_10px_35px_rgba(21,36,53,0.035)] backdrop-blur-xl">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/70 to-transparent" />
      <div className="site-container grid h-[78px] grid-cols-[1fr_auto] items-center gap-5 lg:h-[96px] lg:grid-cols-[auto_1fr_auto] lg:gap-9">
        <BrandMark locale={locale} clinicLabel={brand("clinic")} />

        <div className="hidden justify-center lg:flex">
          <nav
            aria-label={t("menu")}
            className="flex items-center gap-1 rounded-full border border-navy/8 bg-white/55 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] xl:gap-2"
          >
            {items.map((item) => (
              <Link
                className="relative rounded-full px-3.5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-navy/64 transition-[color,background-color] duration-300 hover:bg-cream hover:text-navy xl:px-4"
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
            className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-navy px-6 text-[0.67rem] font-semibold uppercase tracking-[0.13em] text-white shadow-[0_12px_30px_rgba(21,36,53,0.14)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-navy/92 hover:shadow-[0_16px_34px_rgba(21,36,53,0.2)]"
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
