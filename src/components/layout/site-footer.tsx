import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { BrandMark } from "../brand/brand-mark";

type SiteFooterProps = {
  locale: AppLocale;
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const [footer, nav, brand] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
    getTranslations("Brand"),
  ]);

  return (
    <footer className="bg-navy text-white">
      <div className="site-container py-14 sm:py-20">
        <div className="mb-14 grid gap-8 border-b border-white/15 pb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="display-heading max-w-3xl text-4xl leading-[1.05] text-white sm:text-6xl">
            {footer("description")}
          </h2>
          <Link className="group inline-flex min-h-14 items-center justify-center gap-5 rounded-full bg-white px-8 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-navy transition-transform hover:-translate-y-0.5" href={`/${locale}/contact`}>
            {nav("book")} <span aria-hidden="true" className="text-gold transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">↗</span>
          </Link>
        </div>

        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <BrandMark
              inverse
              locale={locale}
              clinicLabel={brand("clinic")}
            />
            <div aria-hidden="true" className="mt-8 h-px w-20 bg-gold-light/70" />
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-white/45">
              {footer("explore")}
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/treatments`}>
                {nav("treatments")}
              </Link>
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/about`}>
                {nav("about")}
              </Link>
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/doctor`}>
                {nav("doctor")}
              </Link>
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/results`}>{nav("results")}</Link>
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/faq`}>{nav("faq")}</Link>
              <Link className="w-fit transition-colors hover:text-gold-light" href={`/${locale}/contact`}>{nav("contact")}</Link>
            </div>
          </div>

          <div id="contact">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-white/45">
              {footer("contact")}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              {footer("placeholder")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {footer("rights")}</p>
          <Link className="w-fit hover:text-white" href={`/${locale}/privacy`}>
            {footer("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
