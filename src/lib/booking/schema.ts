import { z } from "zod";

/**
 * Single source of truth for the booking payload. Shared by the client wizard
 * (per-step `stepSchemas`) and the `/api/appointments` route handler (full
 * `appointmentInputSchema`). Error messages are stable keys resolved against the
 * `Booking.errors.*` catalog on whichever side reports them.
 */

export const TREATMENT_KEYS = [
  "general",
  "cosmetic",
  "implants",
  "orthodontics",
  "whitening",
  "rootCanal",
  "pediatric",
  "emergency",
  "other",
] as const;
export type TreatmentKey = (typeof TREATMENT_KEYS)[number];

export const PREFERRED_TIME_KEYS = ["any", "morning", "afternoon", "evening"] as const;
export type PreferredTimeKey = (typeof PREFERRED_TIME_KEYS)[number];

export const BOOKING_LOCALES = ["en", "ar"] as const;
export type BookingLocale = (typeof BOOKING_LOCALES)[number];

export const BOOKING_STEPS = [
  "treatment",
  "date",
  "time",
  "details",
  "review",
  "success",
] as const;
export type BookingStep = (typeof BOOKING_STEPS)[number];

/** Steps the progress indicator counts (Success is the terminal confirmation). */
export const PROGRESS_STEPS = BOOKING_STEPS.slice(0, 5) as ReadonlyArray<BookingStep>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function inList<T extends string>(list: readonly T[]) {
  return (value: string): value is T => (list as readonly string[]).includes(value);
}

function notInThePast(value: string): boolean {
  if (value === "") return true;
  const picked = new Date(`${value}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked >= today;
}

export const appointmentInputSchema = z.object({
  treatment: z.string({ error: "required" }).refine(inList(TREATMENT_KEYS), "required"),
  preferredTime: z
    .string({ error: "required" })
    .refine(inList(PREFERRED_TIME_KEYS), "required"),
  preferredDate: z
    .string({ error: "dateInvalid" })
    .trim()
    .refine((v) => v === "" || ISO_DATE_RE.test(v), "dateInvalid")
    .refine(notInThePast, "dateInPast"),
  fullName: z
    .string({ error: "nameTooShort" })
    .trim()
    .min(2, "nameTooShort")
    .max(120, "nameTooLong"),
  phone: z
    .string({ error: "phoneInvalid" })
    .trim()
    .min(5, "phoneInvalid")
    .max(40, "phoneInvalid")
    .regex(PHONE_RE, "phoneInvalid")
    .refine((v) => v.replace(/\D/g, "").length >= 5, "phoneInvalid"),
  email: z
    .string({ error: "emailInvalid" })
    .trim()
    .min(3, "emailInvalid")
    .max(200, "emailInvalid")
    .regex(EMAIL_RE, "emailInvalid"),
  message: z.string({ error: "messageTooLong" }).trim().max(2000, "messageTooLong"),
  locale: z.string({ error: "required" }).refine(inList(BOOKING_LOCALES), "required"),
});

export type AppointmentInput = z.infer<typeof appointmentInputSchema>;

/** Per-step validation — a subset of the full schema, keyed by step id. */
export const stepSchemas = {
  treatment: appointmentInputSchema.pick({ treatment: true }),
  date: appointmentInputSchema.pick({ preferredDate: true }),
  time: appointmentInputSchema.pick({ preferredTime: true }),
  details: appointmentInputSchema.pick({
    fullName: true,
    phone: true,
    email: true,
    message: true,
  }),
} as const;

/** All-strings shape held by the client wizard while the user is filling it in. */
export type BookingFormData = {
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
};

export const emptyBookingFormData: BookingFormData = {
  treatment: "",
  preferredDate: "",
  preferredTime: "any",
  fullName: "",
  phone: "",
  email: "",
  message: "",
};

/** First error message per top-level field, as stable catalog keys. */
export function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
