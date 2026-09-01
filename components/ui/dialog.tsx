"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  showHeader = true,
}: DialogProps) {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title || "ListEasy menu"}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{
              duration: reduceMotion ? 0.01 : 0.18,
              ease: "easeOut",
            }}
            className={cn(
              "relative flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-t-[var(--radius-lg)] bg-surface shadow-[var(--shadow-lg)] sm:rounded-[var(--radius-lg)]",
              className
            )}
          >
            {/* Custom branding header */}
            {showHeader && (
              <div className="flex items-center justify-between border-b border-border px-5 py-5">
                <div>
                  <p className="font-display text-xl tracking-[-0.03em]">
                    ListEasy
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
                    Premium Real Estate
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}