import {
  appointmentInputSchema,
  fieldErrorsFromZod,
} from "@/lib/booking/schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * POST /api/appointments — receives a booking request from the modal, revalidates
 * it server-side with Zod, and inserts one `pending` row via the anon-key
 * Supabase client. RLS is the real guard; this handler adds authoritative
 * validation, a honeypot, and a best-effort throttle. Excluded from the locale
 * middleware by the `/api` matcher in `src/proxy.ts`.
 */

// Best-effort per-instance throttle. Not a substitute for a real rate limiter,
// but it blunts trivial floods without extra infrastructure.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalidJson" }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  // Honeypot — a hidden field no real user can see. Pretend success, insert nothing.
  if (typeof record.company === "string" && record.company.trim() !== "") {
    return Response.json({ ok: true }, { status: 201 });
  }

  if (isRateLimited(clientIp(request))) {
    return Response.json({ ok: false, error: "rateLimited" }, { status: 429 });
  }

  const parsed = appointmentInputSchema.safeParse(record);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation", fields: fieldErrorsFromZod(parsed.error) },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const row = {
    full_name: input.fullName,
    phone: input.phone,
    email: input.email,
    treatment: input.treatment,
    preferred_date: input.preferredDate === "" ? null : input.preferredDate,
    preferred_time: input.preferredTime,
    message: input.message === "" ? null : input.message,
    locale: input.locale,
    status: "pending" as const,
  };

  try {
    const supabase = createServerSupabaseClient();
    // No `.select()` — the anon role has no SELECT policy, so a read-back would fail.
    const { error } = await supabase.from("appointments").insert(row);
    if (error) {
      console.error("[api/appointments] insert failed:", error.message);
      return Response.json({ ok: false, error: "insertFailed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[api/appointments] unexpected error:", err);
    return Response.json({ ok: false, error: "serverError" }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}

export async function GET() {
  return Response.json({ ok: false, error: "methodNotAllowed" }, { status: 405 });
}
