const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "Search by area, budget, and property type — no more typing the same message to five different pages.",
  },
  {
    number: "02",
    title: "Discover suitable properties",
    description: "Get back only the listings that actually match, complete with real photos and pricing.",
  },
  {
    number: "03",
    title: "Compare & shortlist",
    description: "Save the ones you like and compare them side by side before deciding what's worth a visit.",
  },
  {
    number: "04",
    title: "Connect with the right agent",
    description: "Every listing carries the agent who actually manages it — call or WhatsApp them directly.",
  },
  {
    number: "05",
    title: "Request a site visit",
    description: "Send one structured request instead of chasing a time over Messenger.",
  },
];

/**
 * Milestone 09: a connected timeline rather than a numbered list — a
 * horizontal rail with a through-line on desktop, a vertical timeline on
 * mobile. Deliberately not another horizontal scroll card rail (that's
 * PropertyCategories' pattern); this section needs to read as a sequence,
 * not a browsable set.
 */
export function HowItWorks() {
  return (
    <section className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="ledger-label mb-3">How it works</p>
          <h2 className="font-display text-2xl text-foreground md:text-3xl">
            From &ldquo;do you have anything in Gulshan?&rdquo; to a scheduled visit
          </h2>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
          <div
            className="pointer-events-none absolute inset-x-0 top-[19px] hidden h-px bg-border-strong lg:block"
            aria-hidden
          />

          {steps.map((step, index) => (
            <li key={step.number} className="relative flex gap-4 lg:flex-col lg:gap-0">
              {index < steps.length - 1 && (
                <span
                  className="absolute bottom-0 left-[19px] top-10 w-px bg-border-strong lg:hidden"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-muted">
                <span className="ledger-value text-sm text-foreground">{step.number}</span>
              </span>
              <div className="min-w-0 lg:mt-5">
                <h3 className="font-display text-base text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
