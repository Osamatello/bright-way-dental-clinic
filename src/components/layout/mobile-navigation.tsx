"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { AppLocale } from "@/i18n/routing";

import { LocaleSwitcher } from "./locale-switcher";

type NavigationItem = {
  href: string;
  label: string;
};

type MobileNavigationProps = {
  locale: AppLocale;
  items: NavigationItem[];
  menuLabel: string;
  closeLabel: string;
  bookLabel: string;
};

export function MobileNavigation({
  locale,
  items,
  menuLabel,
  closeLabel,
  bookLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : menuLabel}
        className="grid size-11 place-items-center border border-navy/20"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="sr-only">{isOpen ? closeLabel : menuLabel}</span>
        <span aria-hidden="true" className="flex w-4 flex-col gap-1.5">
          <span
            className={`h-px w-full bg-navy transition-transform ${
              isOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-full bg-navy transition-transform ${
              isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-x-0 bottom-0 top-[73px] z-40 bg-cream transition-[opacity,visibility] duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="site-container flex h-full flex-col py-10" aria-label={menuLabel}>
          <div className="flex flex-col border-t border-navy/15">
            {items.map((item, index) => (
              <Link
                className="display-heading flex items-center justify-between border-b border-navy/15 py-5 text-3xl"
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <span className="font-sans text-xs text-slate">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            <LocaleSwitcher locale={locale} />
            <Link
              className="inline-flex min-h-12 flex-1 items-center justify-center bg-navy px-5 text-xs font-semibold uppercase tracking-[0.13em] text-white"
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
            >
              {bookLabel}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
