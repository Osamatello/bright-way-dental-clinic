import Link from "next/link";
import type { AppLocale } from "@/i18n/routing";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "../seo/json-ld";

export type BreadcrumbEntry = {
  label: string;
  path?: string; // If omitted, treated as the current active page
};

type BreadcrumbsProps = {
  locale: AppLocale;
  items: BreadcrumbEntry[];
  homeLabel?: string;
  className?: string;
};

export function Breadcrumbs({
  locale,
  items,
  homeLabel,
  className = "",
}: BreadcrumbsProps) {
  const defaultHomeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const resolvedHomeLabel = homeLabel || defaultHomeLabel;
  const ariaLabel = locale === "ar" ? "مسار التنقل" : "Breadcrumb";

  const allItems: BreadcrumbEntry[] = [
    { label: resolvedHomeLabel, path: "" },
    ...items,
  ];

  // Prepare data for JSON-LD schema
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    path: item.path ?? "",
  }));
  const breadcrumbSchema = buildBreadcrumbSchema(locale, schemaItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label={ariaLabel} className={`py-4 ${className}`}>
        <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] font-medium tracking-[0.08em] text-slate">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const href = item.path === "" ? `/${locale}` : `/${locale}/${item.path?.replace(/^\/+/, "")}`;

            return (
              <li className="inline-flex items-center gap-2" key={index}>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="select-none text-slate/50 rtl:rotate-180"
                  >
                    /
                  </span>
                )}
                {isLast || !item.path ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-navy"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    className="transition-colors hover:text-navy"
                    href={href}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
