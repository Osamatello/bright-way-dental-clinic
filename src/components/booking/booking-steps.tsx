"use client";

import { useTranslations } from "next-intl";

import {
  PREFERRED_TIME_KEYS,
  TREATMENT_KEYS,
  type BookingFormData,
  type BookingStep,
} from "@/lib/booking/schema";

type FieldErrors = Partial<Record<keyof BookingFormData, string>>;

function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

/* ---------------- Step 1 — treatment / reason ---------------- */

export function StepTreatment({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("Booking");
  return (
    <label className="booking-field">
      <span className="booking-field__label">{t("steps.treatment.label")}</span>
      <select
        aria-invalid={error ? "true" : undefined}
        className="booking-select"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option disabled value="">
          {t("steps.treatment.placeholder")}
        </option>
        {TREATMENT_KEYS.map((key) => (
          <option key={key} value={key}>
            {t(`steps.treatment.options.${key}`)}
          </option>
        ))}
      </select>
      {error ? <span className="booking-error">{t(`errors.${error}`)}</span> : null}
    </label>
  );
}

/* ---------------- Step 2 — preferred date ---------------- */

export function StepDate({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("Booking");
  return (
    <label className="booking-field">
      <span className="booking-field__label">
        {t("steps.date.label")}{" "}
        <span className="booking-field__optional">{t("steps.date.optional")}</span>
      </span>
      <input
        aria-invalid={error ? "true" : undefined}
        className="booking-input"
        dir="ltr"
        min={todayISO()}
        onChange={(event) => onChange(event.target.value)}
        type="date"
        value={value}
      />
      {error ? (
        <span className="booking-error">{t(`errors.${error}`)}</span>
      ) : (
        <span className="booking-hint">{t("steps.date.hint")}</span>
      )}
    </label>
  );
}

/* ---------------- Step 3 — preferred time ---------------- */

export function StepTime({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("Booking");
  return (
    <fieldset className="booking-choice">
      <legend className="booking-field__label">{t("steps.time.label")}</legend>
      {PREFERRED_TIME_KEYS.map((key) => (
        <label className="booking-choice__option" key={key}>
          <input
            checked={value === key}
            name="preferredTime"
            onChange={() => onChange(key)}
            type="radio"
            value={key}
          />
          <span>{t(`steps.time.options.${key}`)}</span>
        </label>
      ))}
    </fieldset>
  );
}

/* ---------------- Step 4 — patient details ---------------- */

export function StepDetails({
  data,
  errors,
  honeypot,
  onChange,
  onHoneypotChange,
}: {
  data: BookingFormData;
  errors: FieldErrors;
  honeypot: string;
  onChange: (field: keyof BookingFormData, value: string) => void;
  onHoneypotChange: (value: string) => void;
}) {
  const t = useTranslations("Booking");
  return (
    <div>
      <label className="booking-field">
        <span className="booking-field__label">{t("steps.details.fullNameLabel")}</span>
        <input
          aria-invalid={errors.fullName ? "true" : undefined}
          autoComplete="name"
          className="booking-input"
          onChange={(event) => onChange("fullName", event.target.value)}
          placeholder={t("steps.details.fullNamePlaceholder")}
          type="text"
          value={data.fullName}
        />
        {errors.fullName ? (
          <span className="booking-error">{t(`errors.${errors.fullName}`)}</span>
        ) : null}
      </label>

      <label className="booking-field">
        <span className="booking-field__label">{t("steps.details.phoneLabel")}</span>
        <input
          aria-invalid={errors.phone ? "true" : undefined}
          autoComplete="tel"
          className="booking-input"
          dir="ltr"
          inputMode="tel"
          onChange={(event) => onChange("phone", event.target.value)}
          placeholder={t("steps.details.phonePlaceholder")}
          type="tel"
          value={data.phone}
        />
        {errors.phone ? (
          <span className="booking-error">{t(`errors.${errors.phone}`)}</span>
        ) : null}
      </label>

      <label className="booking-field">
        <span className="booking-field__label">{t("steps.details.emailLabel")}</span>
        <input
          aria-invalid={errors.email ? "true" : undefined}
          autoComplete="email"
          className="booking-input"
          dir="ltr"
          inputMode="email"
          onChange={(event) => onChange("email", event.target.value)}
          placeholder={t("steps.details.emailPlaceholder")}
          type="email"
          value={data.email}
        />
        {errors.email ? (
          <span className="booking-error">{t(`errors.${errors.email}`)}</span>
        ) : null}
      </label>

      <label className="booking-field">
        <span className="booking-field__label">
          {t("steps.details.messageLabel")}{" "}
          <span className="booking-field__optional">{t("steps.details.optional")}</span>
        </span>
        <textarea
          className="booking-textarea"
          onChange={(event) => onChange("message", event.target.value)}
          placeholder={t("steps.details.messagePlaceholder")}
          rows={4}
          value={data.message}
        />
        {errors.message ? (
          <span className="booking-error">{t(`errors.${errors.message}`)}</span>
        ) : null}
      </label>

      {/* Honeypot — hidden from users, ignored by the server unless filled. */}
      <div aria-hidden="true" className="booking-hp">
        <label>
          Company
          <input
            autoComplete="off"
            onChange={(event) => onHoneypotChange(event.target.value)}
            tabIndex={-1}
            type="text"
            value={honeypot}
          />
        </label>
      </div>
    </div>
  );
}

/* ---------------- Step 5 — review ---------------- */

export function StepReview({
  data,
  locale,
  onEdit,
}: {
  data: BookingFormData;
  locale: string;
  onEdit: (step: BookingStep) => void;
}) {
  const t = useTranslations("Booking");

  const treatmentLabel = data.treatment
    ? t(`steps.treatment.options.${data.treatment}`)
    : "—";

  const timeLabel = t(`steps.time.options.${data.preferredTime || "any"}`);
  let whenLabel = t("steps.review.noDate", { time: timeLabel });
  if (data.preferredDate) {
    const formatted = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", {
      dateStyle: "full",
    }).format(new Date(`${data.preferredDate}T00:00:00`));
    whenLabel = `${formatted} · ${timeLabel}`;
  }

  const rows: Array<{ label: string; value: string; step: BookingStep }> = [
    {
      label: t("steps.review.headingTreatment"),
      value: treatmentLabel,
      step: "treatment",
    },
    { label: t("steps.review.headingWhen"), value: whenLabel, step: "date" },
    {
      label: t("steps.review.headingContact"),
      value: [data.fullName, data.phone, data.email].filter(Boolean).join("\n"),
      step: "details",
    },
    {
      label: t("steps.review.headingNotes"),
      value: data.message || "—",
      step: "details",
    },
  ];

  return (
    <div>
      <div className="booking-summary">
        {rows.map((row) => (
          <div className="booking-summary__row" key={row.label}>
            <div>
              <span className="booking-summary__label">{row.label}</span>
              <span className="booking-summary__value">{row.value}</span>
            </div>
            <button
              className="booking-summary__edit"
              onClick={() => onEdit(row.step)}
              type="button"
            >
              {t("steps.review.edit")}
            </button>
          </div>
        ))}
      </div>
      <p className="booking-disclaimer">{t("steps.review.disclaimer")}</p>
    </div>
  );
}

/* ---------------- Step 6 — success ---------------- */

export function StepSuccess() {
  const t = useTranslations("Booking");
  return (
    <div className="booking-success">
      <span aria-hidden="true" className="booking-success__badge">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <p className="booking-success__message">{t("steps.success.message")}</p>
      <p className="booking-success__note">{t("steps.success.note")}</p>
    </div>
  );
}
