/**
 * Shared primary call-to-action styling, anchored to the desktop header
 * "Book an appointment" button so every teal CTA stays in one visual family
 * (same teal fill, radius, height, type, arrow, and restrained hover — no
 * black/white hover flips).
 *
 * Consumed by the header/booking triggers (`BookingTrigger`) and by plain
 * navigation links that need to read as a primary CTA (e.g. "Discover Bright Way").
 */

/**
 * Teal button for light surfaces — matches the header booking button exactly.
 * (Weight is left to the global `button { font: inherit }` reset that the header
 * pill already inherits, so `<a>` and `<button>` consumers render identically.)
 */
export const primaryCtaClass =
  "group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-gold px-7 " +
  "text-[0.92rem] tracking-[0.01em] text-white " +
  "shadow-[0_8px_20px_rgba(11,114,116,0.16)] " +
  "transition-[background-color,transform,box-shadow] duration-200 " +
  "hover:-translate-y-0.5 hover:bg-gold/92 hover:shadow-[0_12px_26px_rgba(11,114,116,0.22)]";

/**
 * Same button, inverted for placement on a solid teal surface (the appointment
 * section). White fill, teal label — no colour change on hover, only a subtle
 * lift and shadow, so the text stays readable at all times.
 */
export const primaryCtaInvertClass =
  "group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-white px-7 " +
  "text-[0.92rem] tracking-[0.01em] text-gold " +
  "shadow-[0_8px_20px_rgba(7,44,45,0.18)] " +
  "transition-[transform,box-shadow] duration-200 " +
  "hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(7,44,45,0.26)]";
