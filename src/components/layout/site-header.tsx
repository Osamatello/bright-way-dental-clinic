import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { BookingTrigger } from "@/components/booking/booking-trigger";
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
    { href: `/${locale}#treatments`, label: t("treatments") },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}#doctor`, label: t("doctor") },
    {
      href: `/${locale}#testimonials`,
      label: locale === "ar" ? "آراء المرضى" : "Testimonials",
    },
    {
      href: `/${locale}#contact-section`,
      label: locale === "ar" ? "موقعنا" : "Find Us",
    },
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
          <BookingTrigger showArrow variant="header-pill">
            {t("book")}
          </BookingTrigger>
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
