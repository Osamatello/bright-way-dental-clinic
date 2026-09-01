"use client";

import { useId, useState } from "react";

type FormTranslations = {
  fullNameLabel: string;
  fullNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  treatmentLabel: string;
  treatmentPlaceholder: string;
  treatments: Record<string, string>;
  preferredDateLabel: string;
  preferredTimeLabel: string;
  preferredTimeOptions: {
    any: string;
    morning: string;
    afternoon: string;
    evening: string;
  };
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  submittingButton: string;
  disclaimer: string;
  successTitle: string;
  successMessage: string;
  resetButton: string;
};

type AppointmentFormProps = {
  t: FormTranslations;
};

export function AppointmentForm({ t }: AppointmentFormProps) {
  const baseId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    treatment: "",
    preferredDate: "",
    preferredTime: "any",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean client-side submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      treatment: "",
      preferredDate: "",
      preferredTime: "any",
      message: "",
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div
        aria-live="polite"
        className="border border-navy/20 bg-ivory p-8 sm:p-12"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
            ✓
          </span>
          <h3 className="display-heading text-2xl text-navy sm:text-3xl">
            {t.successTitle}
          </h3>
        </div>
        <p className="mt-4 max-w-md text-sm leading-8 text-slate sm:text-base">
          {t.successMessage}
        </p>
        <div className="mt-8 border-t fine-rule pt-6">
          <button
            className="inline-flex min-h-11 items-center justify-center border border-navy/25 bg-transparent px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            onClick={handleReset}
            type="button"
          >
            {t.resetButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="border border-navy/15 bg-ivory p-6 sm:p-10 lg:p-12"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
            htmlFor={`${baseId}-name`}
          >
            {t.fullNameLabel} <span className="text-navy/50">*</span>
          </label>
          <input
            autoComplete="name"
            className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            id={`${baseId}-name`}
            name="name"
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder={t.fullNamePlaceholder}
            required
            type="text"
            value={formData.fullName}
          />
        </div>

        {/* Phone & Email Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
              htmlFor={`${baseId}-phone`}
            >
              {t.phoneLabel} <span className="text-navy/50">*</span>
            </label>
            <input
              autoComplete="tel"
              className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              dir="ltr"
              id={`${baseId}-phone`}
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder={t.phonePlaceholder}
              required
              type="tel"
              value={formData.phone}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
              htmlFor={`${baseId}-email`}
            >
              {t.emailLabel} <span className="text-navy/50">*</span>
            </label>
            <input
              autoComplete="email"
              className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              dir="ltr"
              id={`${baseId}-email`}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={t.emailPlaceholder}
              required
              type="email"
              value={formData.email}
            />
          </div>
        </div>

        {/* Treatment Dropdown */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
            htmlFor={`${baseId}-treatment`}
          >
            {t.treatmentLabel} <span className="text-navy/50">*</span>
          </label>
          <select
            className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            id={`${baseId}-treatment`}
            name="treatment"
            onChange={(e) =>
              setFormData({ ...formData, treatment: e.target.value })
            }
            required
            value={formData.treatment}
          >
            <option disabled value="">
              {t.treatmentPlaceholder}
            </option>
            {Object.entries(t.treatments).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date & Preferred Time Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
              htmlFor={`${baseId}-date`}
            >
              {t.preferredDateLabel}
            </label>
            <input
              className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              id={`${baseId}-date`}
              min={new Date().toISOString().split("T")[0]}
              name="preferredDate"
              onChange={(e) =>
                setFormData({ ...formData, preferredDate: e.target.value })
              }
              type="date"
              value={formData.preferredDate}
            />
          </div>

          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
              htmlFor={`${baseId}-time`}
            >
              {t.preferredTimeLabel}
            </label>
            <select
              className="mt-2.5 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              id={`${baseId}-time`}
              name="preferredTime"
              onChange={(e) =>
                setFormData({ ...formData, preferredTime: e.target.value })
              }
              value={formData.preferredTime}
            >
              <option value="any">{t.preferredTimeOptions.any}</option>
              <option value="morning">{t.preferredTimeOptions.morning}</option>
              <option value="afternoon">{t.preferredTimeOptions.afternoon}</option>
              <option value="evening">{t.preferredTimeOptions.evening}</option>
            </select>
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-navy"
            htmlFor={`${baseId}-message`}
          >
            {t.messageLabel}
          </label>
          <textarea
            className="mt-2.5 min-h-28 w-full border border-navy/20 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/60 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
            id={`${baseId}-message`}
            name="message"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t.messagePlaceholder}
            rows={4}
            value={formData.message}
          />
        </div>

        {/* Disclaimer note */}
        <p className="text-xs leading-5 text-slate/75">{t.disclaimer}</p>

        {/* Submit button */}
        <button
          className="inline-flex min-h-12 w-full items-center justify-center border border-navy bg-navy px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-transparent hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? t.submittingButton : t.submitButton}
        </button>
      </div>
    </form>
  );
}
