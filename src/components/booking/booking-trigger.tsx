"use client";

import { useTranslations } from "next-intl";

import type { TreatmentKey } from "@/lib/booking/schema";

import { useBooking } from "./booking-provider";

type Variant =
  | "header-pill"
  | "drawer-pill"
  | "footer-pill"
  | "premium-primary"
  | "button-light"
  | "button-secondary"
  | "inline-link"
  | "card-link";

type BookingTriggerProps = {
  variant: Variant;
  children?: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  treatment?: TreatmentKey;
  /** Runs just before the modal opens — e.g. close the mobile drawer. */
  onBeforeOpen?: () => void;
};

/**
 * Drop-in replacement for the old `<Link href="#appointment">` CTAs. Renders a
 * real <button> whose classes mirror the link primitive it replaces, so the
 * visual system is unchanged, and opens the shared booking modal on click.
 */
const VARIANT_CLASS: Record<Variant, string> = {
  "header-pill":
    "group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-gold px-7 text-[0.92rem] font-bold tracking-[0.01em] text-white shadow-[0_8px_20px_rgba(11,114,116,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_12px_26px_rgba(11,114,116,0.22)]",
  "drawer-pill":
    "inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-lg bg-gold px-5 text-[0.76rem] font-semibold tracking-[0.04em] text-white shadow-[0_12px_30px_rgba(11,114,116,0.16)]",
  "footer-pill":
    "mt-[0.8rem] inline-flex min-h-[2.8rem] items-center gap-[0.7rem] rounded-[0.65rem] bg-white px-[1.15rem] text-[0.78rem] font-[750] text-gold transition-transform duration-200 hover:-translate-y-px",
  "premium-primary":
    "premium-link group/premium inline-flex min-h-[3rem] items-center justify-center gap-4 rounded-full bg-gold px-7 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_38px_-16px_rgba(11,114,116,0.5)] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_22px_46px_-18px_rgba(11,114,116,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--focus)] sm:min-h-[3.5rem] sm:px-8",
  "button-light":
    "inline-flex min-h-12 items-center justify-center border px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 border-white bg-white text-navy hover:bg-transparent hover:text-white",
  "button-secondary":
    "inline-flex min-h-12 items-center justify-center border px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  "inline-link": "cursor-pointer border-0 bg-transparent",
  "card-link":
    "flex min-h-[2.6rem] w-full cursor-pointer items-center justify-center rounded-[0.55rem] border border-warm-border bg-transparent text-[0.8rem] font-bold text-navy transition-[background-color,color,border-color] duration-200 hover:border-gold hover:bg-gold hover:text-white focus-visible:border-gold focus-visible:bg-gold focus-visible:text-white",
};

export function BookingTrigger({
  variant,
  children,
  className = "",
  showArrow = false,
  treatment,
  onBeforeOpen,
}: BookingTriggerProps) {
  const { open } = useBooking();
  const t = useTranslations("Booking");

  return (
    <button
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
      onClick={(event) => {
        const trigger = event.currentTarget;
        onBeforeOpen?.();
        open(trigger, treatment ? { treatment } : undefined);
      }}
      type="button"
    >
      {children ?? t("triggerLabel")}
      {showArrow && variant === "premium-primary" ? (
        <span
          aria-hidden="true"
          className="premium-link__arrow text-[1.1em] leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/premium:translate-x-0.5 rtl:-scale-x-100"
        >
          &rarr;
        </span>
      ) : null}
      {showArrow && variant !== "premium-primary" ? (
        <span aria-hidden="true" className="premium-arrow text-gold-light">
          ↗
        </span>
      ) : null}
    </button>
  );
}
