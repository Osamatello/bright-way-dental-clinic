"use client";

import { useId, useState } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className = "" }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <div className={`border-t fine-rule ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="border-b fine-rule">
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-start transition-colors hover:text-navy sm:py-8"
                id={buttonId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                type="button"
              >
                <span className="display-heading text-xl text-navy sm:text-2xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center border border-navy/20 text-base transition-transform duration-300 rtl:-scale-x-100"
                  style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  aria-hidden={!isOpen}
                  className="max-w-2xl pb-7 text-sm leading-8 text-slate sm:pb-9 sm:text-base sm:leading-9"
                  id={panelId}
                  role="region"
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
