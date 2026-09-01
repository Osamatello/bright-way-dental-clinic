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
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory">
      <div className="site-container flex h-[72px] items-center justify-between gap-8">
        <BrandMark locale={locale} clinicLabel={brand("clinic")} />

        <nav
          aria-label={t("menu")}
          className="hidden items-center gap-6 lg:flex xl:gap-8"
        >
          {items.map((item) => (
            <Link
              className="relative py-2 text-[0.69rem] font-semibold uppercase tracking-[0.13em] text-navy/75 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-navy after:transition-transform hover:text-navy hover:after:scale-x-100"
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
            className="inline-flex min-h-11 items-center justify-center bg-navy px-5 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-sand hover:text-navy"
            href={`/${locale}/contact`}
          >
            {t("book")}
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
