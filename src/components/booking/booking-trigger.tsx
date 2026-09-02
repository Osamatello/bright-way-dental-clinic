"use client";

import { useTranslations } from "next-intl";

import { primaryCtaClass, primaryCtaInvertClass } from "@/components/primitives/cta";
import type { TreatmentKey } from "@/lib/booking/schema";

import { useBooking } from "./booking-provider";

type Variant =
  | "header-pill"
  | "drawer-pill"
  | "premium-primary"
  | "primary-invert"
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
 * real <button> whose classes mirror the primary-CTA family (see
 * `@/components/primitives/cta`), and opens the shared booking modal on click.
 */
const VARIANT_CLASS: Record<Variant, string> = {
  "header-pill": primaryCtaClass,
  "primary-invert": primaryCtaInvertClass,
  "drawer-pill":
    "inline-flex min-h-12 flex-1 items-center justify-center gap-3 rounded-lg bg-gold px-5 text-[0.76rem] font-semibold tracking-[0.04em] text-white shadow-[0_12px_30px_rgba(11,114,116,0.16)]",
  "premium-primary":
    "premium-link group/premium inline-flex min-h-[3rem] items-center justify-center gap-4 rounded-full bg-gold px-7 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_38px_-16px_rgba(11,114,116,0.5)] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_22px_46px_-18px_rgba(11,114,116,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--focus)] sm:min-h-[3.5rem] sm:px-8",
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
        <span
          aria-hidden="true"
          className={`premium-arrow ${variant === "primary-invert" ? "text-gold" : "text-gold-light"}`}
        >
          ↗
        </span>
      ) : null}
    </button>
  );
}
