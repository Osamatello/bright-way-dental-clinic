"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  appointmentInputSchema,
  BOOKING_STEPS,
  emptyBookingFormData,
  fieldErrorsFromZod,
  PROGRESS_STEPS,
  stepSchemas,
  type BookingFormData,
  type BookingStep,
  type TreatmentKey,
} from "@/lib/booking/schema";

import {
  StepDate,
  StepDetails,
  StepReview,
  StepSuccess,
  StepTime,
  StepTreatment,
} from "./booking-steps";

type FieldErrors = Partial<Record<keyof BookingFormData, string>>;

type FlowState = {
  index: number;
  data: BookingFormData;
  errors: FieldErrors;
  status: "idle" | "submitting" | "error";
  submitError: string | null;
};

type FlowAction =
  | { type: "field"; field: keyof BookingFormData; value: string }
  | { type: "errors"; errors: FieldErrors }
  | { type: "goto"; step: BookingStep }
  | { type: "next" }
  | { type: "back" }
  | { type: "submit:start" }
  | { type: "submit:error"; error: string }
  | { type: "submit:success" };

function indexOfStep(step: BookingStep): number {
  return BOOKING_STEPS.indexOf(step);
}

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "errors":
      return { ...state, errors: action.errors };
    case "goto":
      return {
        ...state,
        index: indexOfStep(action.step),
        errors: {},
        submitError: null,
      };
    case "next":
      return {
        ...state,
        index: Math.min(state.index + 1, BOOKING_STEPS.length - 1),
        errors: {},
        submitError: null,
      };
    case "back":
      return {
        ...state,
        index: Math.max(state.index - 1, 0),
        errors: {},
        submitError: null,
      };
    case "submit:start":
      return { ...state, status: "submitting", submitError: null };
    case "submit:error":
      return { ...state, status: "error", submitError: action.error };
    case "submit:success":
      return {
        ...state,
        status: "idle",
        index: indexOfStep("success"),
        errors: {},
        submitError: null,
      };
    default:
      return state;
  }
}

type BookingFlowProps = {
  initialTreatment: TreatmentKey | null;
  labelId: string;
  onClose: () => void;
  onSubmittingChange: (submitting: boolean) => void;
};

export function BookingFlow({
  initialTreatment,
  labelId,
  onClose,
  onSubmittingChange,
}: BookingFlowProps) {
  const t = useTranslations("Booking");
  const locale = useLocale();

  const [state, dispatch] = useReducer(reducer, initialTreatment, (treatment) => ({
    index: 0,
    data: { ...emptyBookingFormData, treatment: treatment ?? "" },
    errors: {},
    status: "idle" as const,
    submitError: null,
  }));

  const [honeypot, setHoneypot] = useState("");
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const step = BOOKING_STEPS[state.index];
  const isReview = step === "review";
  const isSuccess = step === "success";
  const submitting = state.status === "submitting";

  useEffect(() => {
    onSubmittingChange(submitting);
  }, [submitting, onSubmittingChange]);

  // Focus the step heading on every step change — also announces it to screen readers.
  useEffect(() => {
    headingRef.current?.focus();
  }, [state.index]);

  function setField(field: keyof BookingFormData, value: string) {
    dispatch({ type: "field", field, value });
  }

  function validateCurrentStep(): boolean {
    const schema = stepSchemas[step as keyof typeof stepSchemas];
    if (!schema) return true;
    const result = schema.safeParse(state.data);
    if (result.success) return true;
    dispatch({ type: "errors", errors: fieldErrorsFromZod(result.error) as FieldErrors });
    return false;
  }

  async function submit() {
    if (submitting) return;

    const full = appointmentInputSchema.safeParse({ ...state.data, locale });
    if (!full.success) {
      const errors = fieldErrorsFromZod(full.error) as FieldErrors;
      dispatch({ type: "errors", errors });
      const ownership: Array<[BookingStep, Array<keyof BookingFormData>]> = [
        ["treatment", ["treatment"]],
        ["date", ["preferredDate"]],
        ["time", ["preferredTime"]],
        ["details", ["fullName", "phone", "email", "message"]],
      ];
      const target = ownership.find(([, fields]) => fields.some((f) => errors[f]));
      if (target) dispatch({ type: "goto", step: target[0] });
      return;
    }

    dispatch({ type: "submit:start" });
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...full.data, company: honeypot }),
      });

      if (response.status === 201) {
        dispatch({ type: "submit:success" });
        return;
      }

      let payload: { error?: string; fields?: Record<string, string> } = {};
      try {
        payload = (await response.json()) as typeof payload;
      } catch {
        /* body was not JSON */
      }

      if (response.status === 422 && payload.fields) {
        dispatch({ type: "errors", errors: payload.fields as FieldErrors });
        dispatch({ type: "goto", step: "details" });
        return;
      }

      dispatch({
        type: "submit:error",
        error: response.status === 429 ? "rateLimited" : "submitFailed",
      });
    } catch {
      dispatch({ type: "submit:error", error: "networkError" });
    }
  }

  function handleContinue() {
    if (isReview) {
      void submit();
      return;
    }
    if (validateCurrentStep()) dispatch({ type: "next" });
  }

  const progressValue = Math.min(state.index, PROGRESS_STEPS.length - 1) + 1;
  const progressPct = (progressValue / PROGRESS_STEPS.length) * 100;

  return (
    <div className="booking">
      <div className="booking__bar">
        {isSuccess ? (
          <span className="booking__progress" />
        ) : (
          <div
            aria-label={t("progress.aria")}
            aria-valuemax={PROGRESS_STEPS.length}
            aria-valuemin={1}
            aria-valuenow={progressValue}
            className="booking__progress"
            role="progressbar"
          >
            <span className="booking__progress-track">
              <span
                className="booking__progress-fill"
                style={{ inlineSize: `${progressPct}%` }}
              />
            </span>
            <span className="booking__progress-text">
              {t("progress.stepOf", {
                current: progressValue,
                total: PROGRESS_STEPS.length,
              })}
            </span>
          </div>
        )}
        <button
          aria-label={t("close")}
          className="booking__close"
          disabled={submitting}
          onClick={onClose}
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="booking__body">
        <h2
          className="booking__title display-heading"
          id={labelId}
          ref={headingRef}
          tabIndex={-1}
        >
          {t(`steps.${step}.title`)}
        </h2>
        {!isSuccess ? (
          <p className="booking__description">{t(`steps.${step}.description`)}</p>
        ) : null}

        <div className="booking__step" data-step={step} key={step}>
          {step === "treatment" ? (
            <StepTreatment
              error={state.errors.treatment}
              onChange={(v) => setField("treatment", v)}
              value={state.data.treatment}
            />
          ) : null}
          {step === "date" ? (
            <StepDate
              error={state.errors.preferredDate}
              onChange={(v) => setField("preferredDate", v)}
              value={state.data.preferredDate}
            />
          ) : null}
          {step === "time" ? (
            <StepTime
              onChange={(v) => setField("preferredTime", v)}
              value={state.data.preferredTime}
            />
          ) : null}
          {step === "details" ? (
            <StepDetails
              data={state.data}
              errors={state.errors}
              honeypot={honeypot}
              onChange={setField}
              onHoneypotChange={setHoneypot}
            />
          ) : null}
          {step === "review" ? (
            <StepReview
              data={state.data}
              locale={locale}
              onEdit={(s) => dispatch({ type: "goto", step: s })}
            />
          ) : null}
          {step === "success" ? <StepSuccess /> : null}
        </div>

        {state.submitError ? (
          <p className="booking-submit-error" role="alert">
            {t(`errors.${state.submitError}`)}
          </p>
        ) : null}
      </div>

      {isSuccess ? (
        <div className="booking__footer">
          <span />
          <button
            className="booking__btn booking__btn--primary"
            onClick={onClose}
            type="button"
          >
            {t("nav.done")}
          </button>
        </div>
      ) : (
        <div className="booking__footer">
          <button
            className="booking__btn booking__btn--ghost"
            data-hidden={state.index === 0 ? "true" : undefined}
            disabled={state.index === 0 || submitting}
            onClick={() => dispatch({ type: "back" })}
            type="button"
          >
            {t("nav.back")}
          </button>
          <button
            className="booking__btn booking__btn--primary"
            disabled={submitting}
            onClick={handleContinue}
            type="button"
          >
            {isReview
              ? submitting
                ? t("nav.submitting")
                : t("nav.confirm")
              : t("nav.continue")}
          </button>
        </div>
      )}
    </div>
  );
}
