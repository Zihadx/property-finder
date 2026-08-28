"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: "right" | "bottom";
}

export function Sheet({ open, onClose, title, children, side = "right" }: SheetProps) {
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

  const panelVariants =
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : side === "bottom"
      ? { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } }
      : { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
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
            aria-label={title}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ type: reduceMotion ? "tween" : "spring", damping: 32, stiffness: 320, duration: reduceMotion ? 0.01 : undefined }}
            className={cn(
              "absolute flex flex-col bg-surface shadow-[var(--shadow-lg)]",
              side === "bottom"
                ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--radius-lg)]"
                : "inset-y-0 right-0 h-full w-full max-w-sm"
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-display text-lg text-foreground">{title}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
