"use client";

import * as React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X, Expand, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

/**
 * Milestone 22: refined the gallery into a smaller, more editorial
 * presentation — tighter aspect ratio, restrained gold accenting,
 * a soft magnify-on-hover cue, and a crossfade + zoom-toggle lightbox
 * so the whole thing reads more like a boutique listing than a
 * stock property template.
 */
export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [zoomed, setZoomed] = React.useState(false);
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  const goNext = React.useCallback(() => {
    setZoomed(false);
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = React.useCallback(() => {
    setZoomed(false);
    setActive((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

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
    <div className="mx-auto w-full">
      {/* Main image — deliberately smaller & framed like a matte print */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Open photo ${active + 1} of ${images.length} in fullscreen`}
        className="group relative block aspect-16/7 w-full overflow-hidden rounded-sm border border-border/70 bg-surface-muted shadow-lg ring-1 ring-transparent transition-all duration-500 ease-out hover:shadow-xl hover:ring-accent/30"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={images[active]}
            alt={`${title} — photo ${active + 1}`}
            fill
            sizes="(min-width: 1024px) 60vw, 92vw"
            className="object-center transition-transform duration-700 ease-out group-hover:scale-[1.06] w-full object-cover"
            priority
          />
        </div>

        {/* subtle top gradient so the counter + affordance stay legible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 border border-white/25 bg-black/25 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
          {active + 1} / {images.length}
        </span>

        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] tracking-wide text-white opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
          <Expand className="h-3.5 w-3.5" />
          View fullscreen
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View photo ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "group/thumb relative h-14 w-20 shrink-0 overflow-hidden rounded-xs border transition-all duration-400 ease-out",
                index === active
                  ? "border-accent opacity-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.2)]"
                  : "border-border/50 opacity-55 hover:opacity-90"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover transition-transform duration-400 ease-out group-hover/thumb:scale-110"
              />
              {index === active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
              )}
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
                transition={{ duration: reduceMotion ? 0.01 : 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${title} photos`}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-foreground/97 p-4 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close fullscreen photos"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/90 backdrop-blur-md transition-all duration-300 hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                <p className="absolute left-4 top-4 text-sm text-primary-foreground/70">
                  <span className="font-display italic text-primary-foreground">{active + 1}</span>
                  <span className="mx-1">/</span>
                  {images.length}
                </p>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous photo"
                    className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  className={cn(
                    "relative h-full max-h-[78vh] w-full max-w-4xl overflow-hidden",
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={images[active]}
                        alt={`${title} — photo ${active + 1}`}
                        fill
                        sizes="80vw"
                        className={cn(
                          "object-contain transition-transform duration-500 ease-out",
                          zoomed && "scale-150"
                        )}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {!zoomed && (
                    <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 border border-white/20 bg-black/30 px-3 py-1 text-[11px] tracking-wide text-white/80 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                      <ZoomIn className="h-3 w-3" />
                      Click to zoom
                    </span>
                  )}
                </button>

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next photo"
                    className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                {/* filmstrip inside the lightbox for quick jumps */}
                {images.length > 1 && (
                  <div className="mt-5 flex max-w-full gap-2 overflow-x-auto px-4 pb-1">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => {
                          setZoomed(false);
                          setActive(index);
                        }}
                        aria-label={`Jump to photo ${index + 1}`}
                        className={cn(
                          "relative h-12 w-16 shrink-0 overflow-hidden rounded-xs border transition-all duration-300",
                          index === active
                            ? "border-accent opacity-100"
                            : "border-white/15 opacity-45 hover:opacity-80"
                        )}
                      >
                        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}