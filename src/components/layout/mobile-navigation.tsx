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
        className="grid size-10 place-items-center rounded-full border border-navy/15 bg-white/65 shadow-[0_8px_24px_rgba(21,36,53,0.05)] transition-colors hover:border-gold/70"
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
        className={`fixed inset-x-0 bottom-0 top-[73px] z-40 overflow-y-auto bg-ivory/98 backdrop-blur-xl transition-[opacity,visibility,transform] duration-300 ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="site-container flex min-h-full flex-col py-8" aria-label={menuLabel}>
          <div className="mb-7 flex items-center gap-3 text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            Bright Way
          </div>
          <div className="flex flex-col border-t border-navy/12">
            {items.map((item, index) => (
              <Link
                className="display-heading group flex items-center justify-between border-b border-navy/12 py-4 text-[1.75rem] text-navy"
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                <span className="grid size-8 place-items-center rounded-full border border-navy/15 font-sans text-[0.58rem] text-slate transition-colors group-hover:border-gold/60 group-hover:text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-navy/10 pt-6">
            <LocaleSwitcher locale={locale} />
            <Link
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-lg bg-gold px-5 text-[0.76rem] font-semibold tracking-[0.04em] text-white shadow-[0_12px_30px_rgba(11,114,116,0.16)]"
              href={`/${locale}#appointment`}
              onClick={() => setIsOpen(false)}
            >
              {bookLabel} <span aria-hidden="true" className="text-gold">↗</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
