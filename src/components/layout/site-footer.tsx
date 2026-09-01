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
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <BrandMark
              inverse
              locale={locale}
              clinicLabel={brand("clinic")}
            />
            <p className="mt-8 max-w-sm text-sm leading-7 text-white/60">
              {footer("description")}
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-white/45">
              {footer("explore")}
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
              <Link className="w-fit hover:text-white" href={`/${locale}/treatments`}>
                {nav("treatments")}
              </Link>
              <Link className="w-fit hover:text-white" href={`/${locale}/#about`}>
                {nav("about")}
              </Link>
              <Link className="w-fit hover:text-white" href={`/${locale}/#doctor`}>
                {nav("doctor")}
              </Link>
              <Link className="w-fit hover:text-white" href={`/${locale}/#faq`}>
                {nav("faq")}
              </Link>
              <Link className="w-fit hover:text-white" href={`/${locale}/#contact-section`}>
                {nav("experience")}
              </Link>
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
          <Link className="w-fit hover:text-white" href={`/${locale}/#privacy`}>
            {footer("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
