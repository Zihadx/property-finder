"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFaq } from "@/types/project";

export function ProjectFaqAccordion({ faqs }: { faqs: ProjectFaq[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-border/60 border-y border-border/60">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-sm font-medium text-foreground sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {isOpen && (
              <p className="max-w-2xl pb-5 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}