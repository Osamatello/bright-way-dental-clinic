"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { TreatmentKey } from "@/lib/booking/schema";

import { BookingModal } from "./booking-modal";

type OpenOptions = { treatment?: TreatmentKey };

type BookingContextValue = {
  /** Open the modal. Pass the triggering element so focus can return to it on close. */
  open: (trigger?: HTMLElement | null, options?: OpenOptions) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within <BookingProvider>.");
  }
  return ctx;
}

/**
 * Single centralized booking modal host. Mounted once in the locale layout so
 * any descendant (`BookingTrigger`, or `useBooking()` directly) opens the same
 * dialog. Keeps the modal mounted briefly after `close()` so the exit
 * transition can play, then restores focus to the original trigger.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [rendered, setRendered] = useState(false);
  const [open, setOpen] = useState(false);
  const [treatment, setTreatment] = useState<TreatmentKey | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const doOpen = useCallback(
    (trigger?: HTMLElement | null, options?: OpenOptions) => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      triggerRef.current =
        trigger ??
        (typeof document !== "undefined"
          ? (document.activeElement as HTMLElement | null)
          : null);
      setTreatment(options?.treatment ?? null);
      setRendered(true);
      window.requestAnimationFrame(() => setOpen(true));
    },
    [],
  );

  const doClose = useCallback(() => {
    setOpen(false);
    closeTimer.current = window.setTimeout(() => {
      setRendered(false);
      closeTimer.current = null;
      const el = triggerRef.current;
      triggerRef.current = null;
      if (el && typeof el.focus === "function" && el.isConnected) {
        el.focus();
      }
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({ open: doOpen, close: doClose }),
    [doOpen, doClose],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      {rendered ? (
        <BookingModal initialTreatment={treatment} onClose={doClose} open={open} />
      ) : null}
    </BookingContext.Provider>
  );
}
