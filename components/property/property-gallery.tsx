"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

/**
 * Milestone 21: added a fullscreen lightbox with keyboard arrow-key
 * navigation. Previously the main image was just a static display with no
 * way to inspect photos closely — a real gap for a listings site where
 * buyers zoom into photos constantly.
 */
export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  const goNext = React.useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);
  const goPrev = React.useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goNext, goPrev]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Open photo ${active + 1} of ${images.length} in fullscreen`}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface-muted"
      >
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <Expand className="h-3.5 w-3.5" />
          View fullscreen
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View photo ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border-2 transition-colors",
                index === active ? "border-accent" : "border-transparent"
              )}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${title} photos`}
                className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4"
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close fullscreen photos"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-5 w-5" />
                </button>

                <p className="absolute left-4 top-4 text-sm text-primary-foreground/80">
                  {active + 1} / {images.length}
                </p>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous photo"
                    className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                <div className="relative h-full max-h-[85vh] w-full max-w-5xl">
                  <Image
                    src={images[active]}
                    alt={`${title} — photo ${active + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain"
                  />
                </div>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next photo"
                    className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
