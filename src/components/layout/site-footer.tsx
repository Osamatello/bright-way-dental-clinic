import "./site-footer.css";

import Link from "next/link";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";

import { BrandMark } from "../brand/brand-mark";

type SiteFooterProps = { locale: AppLocale };

export async function SiteFooter({ locale }: SiteFooterProps) {
  const [footer, nav, brand] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
    getTranslations("Brand"),
  ]);
  const links = [
    [nav("treatments"), `/${locale}/treatments`],
    [nav("about"), `/${locale}/about`],
    [nav("doctor"), `/${locale}/doctor`],
    [nav("results"), `/${locale}/results`],
    [nav("faq"), `/${locale}/faq`],
    [nav("contact"), `/${locale}/contact`],
  ];

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <BrandMark inverse locale={locale} clinicLabel={brand("clinic")} />
            <p>{footer("description")}</p>
          </div>
          <nav aria-label={footer("explore")} className="site-footer__links">
            {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="site-footer__action">
            <p>{locale === "ar" ? "خطوتك التالية" : "Your next step"}</p>
            <Link href={`/${locale}/contact`}>{nav("book")} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {footer("rights")}</p>
          <p>{locale === "ar" ? "موقع تجريبي — تُستبدل التفاصيل قبل الإطلاق." : "Demo website — details will be replaced before launch."}</p>
          <Link href={`/${locale}/privacy`}>{footer("privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
