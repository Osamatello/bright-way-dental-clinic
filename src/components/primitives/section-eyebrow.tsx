import type { ElementType, ReactNode } from "react";

type SectionEyebrowTone = "gold" | "slate" | "on-dark";

type SectionEyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  tone?: SectionEyebrowTone;
  withRule?: boolean;
  className?: string;
};

/*
 * Server component. The single place the eyebrow lockup is defined: a short
 * hairline followed by a micro-label. Latin renders uppercase + tracked;
 * Arabic (`html[lang="ar"]`) drops the caps/tracking it cannot use and lifts
 * the size a step so it stays legible in Naskh/Plex Arabic.
 */
const TONE: Record<SectionEyebrowTone, { text: string; rule: string }> = {
  gold: { text: "text-gold", rule: "bg-gold/70" },
  slate: { text: "text-slate", rule: "bg-slate/50" },
  "on-dark": { text: "text-white/55", rule: "bg-white/40" },
};

export function SectionEyebrow({
  children,
  as: Tag = "p",
  tone = "gold",
  withRule = false,
  className = "",
}: SectionEyebrowProps) {
  const toneClasses = TONE[tone];

  return (
    <Tag
      className={
        "flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] " +
        "[html[lang=ar]_&]:gap-2.5 [html[lang=ar]_&]:text-[0.8rem] [html[lang=ar]_&]:font-medium " +
        "[html[lang=ar]_&]:normal-case [html[lang=ar]_&]:tracking-normal " +
        `${toneClasses.text} ${className}`
      }
    >
      {withRule ? (
        <span
          aria-hidden="true"
          className={`h-px w-9 shrink-0 [html[lang=ar]_&]:w-7 ${toneClasses.rule}`}
        />
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
