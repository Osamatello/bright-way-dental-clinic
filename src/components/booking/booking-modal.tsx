"use client";

import "./booking-modal.css";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

import type { TreatmentKey } from "@/lib/booking/schema";

import { BookingFlow } from "./booking-flow";

type BookingModalProps = {
  open: boolean;
  initialTreatment: TreatmentKey | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Dialog shell: portal to <body>, backdrop, background scroll lock, ESC to
 * close, and a hand-rolled focus trap. All step content lives in <BookingFlow>.
 */
export function BookingModal({ open, initialTreatment, onClose }: BookingModalProps) {
  const labelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const submittingRef = useRef(false);

  // Background scroll lock for the lifetime of the mounted modal
  // (same mechanism as mobile-navigation.tsx).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // ESC + focus trap.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (!submittingRef.current) {
          event.preventDefault();
          onClose();
        }
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const nodes = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);

      if (nodes.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={`booking-overlay${open ? " is-visible" : ""}`}>
      <div
        aria-hidden="true"
        className="booking-overlay__backdrop"
        onClick={() => {
          if (!submittingRef.current) onClose();
        }}
      />
      <div
        aria-labelledby={labelId}
        aria-modal="true"
        className="booking-overlay__panel"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <BookingFlow
          initialTreatment={initialTreatment}
          labelId={labelId}
          onClose={onClose}
          onSubmittingChange={(value) => {
            submittingRef.current = value;
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
