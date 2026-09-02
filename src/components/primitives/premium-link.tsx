import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type PremiumLinkVariant = "primary" | "secondary" | "quiet";
type PremiumLinkSize = "sm" | "md";

type PremiumLinkProps = {
  href: string;
  children: ReactNode;
  variant?: PremiumLinkVariant;
  size?: PremiumLinkSize;
  showArrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/*
 * Server component. All motion is CSS-only (hover / focus-visible), so this
 * never needs a client boundary. Supersedes the hand-rolled hero and header
 * pills; `ButtonLink` stays in place for the pages not touched in this phase.
 */
const BASE =
  "premium-link group/premium inline-flex items-center justify-center font-semibold uppercase tracking-[0.12em] " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-4 focus-visible:outline-[color:var(--focus)]";

const SIZE: Record<PremiumLinkSize, string> = {
  sm: "min-h-[2.75rem] gap-3 rounded-full px-5 text-[0.68rem]",
  md: "min-h-[3rem] gap-4 rounded-full px-7 text-[0.7rem] sm:min-h-[3.5rem] sm:px-8",
};

const VARIANT: Record<PremiumLinkVariant, string> = {
  primary:
    "bg-gold text-white shadow-[0_16px_38px_-16px_rgba(11,114,116,0.5)] " +
    "hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_22px_46px_-18px_rgba(11,114,116,0.55)]",
  secondary:
    "border border-navy/20 bg-white/55 text-navy hover:border-gold/55 hover:bg-white",
  quiet:
    "min-h-[2.75rem] gap-3 text-[0.68rem] text-navy hover:text-gold",
};

export function PremiumLink({
  href,
  children,
  variant = "primary",
  size = "md",
  showArrow = false,
  className = "",
  ...rest
}: PremiumLinkProps) {
  const shape = variant === "quiet" ? VARIANT.quiet : `${SIZE[size]} ${VARIANT[variant]}`;

  return (
    <Link href={href} className={`${BASE} ${shape} ${className}`} {...rest}>
      <span>{children}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          className="premium-link__arrow text-[1.1em] leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/premium:translate-x-0.5 rtl:-scale-x-100"
        >
          &rarr;
        </span>
      ) : null}
    </Link>
  );
}
