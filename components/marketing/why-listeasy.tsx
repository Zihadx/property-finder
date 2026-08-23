import { MessageSquareOff, Search, CalendarCheck, TrendingUp } from "lucide-react";

const points = [
  {
    icon: MessageSquareOff,
    title: "Stop repeating yourself on WhatsApp",
    description:
      "Every listing gets a shareable link with price, specs, photos, and location — send it once instead of retyping it for every customer.",
  },
  {
    icon: Search,
    title: "Customers filter for themselves",
    description:
      "\"Gulshan-এ ১ কোটি বাজেটে কিছু আছে?\" — instead of answering by hand, they filter by area, budget, and type in seconds.",
  },
  {
    icon: CalendarCheck,
    title: "Site visits, structured",
    description: "Requests land in one place instead of scattered across Messenger threads and missed calls.",
  },
  {
    icon: TrendingUp,
    title: "See what's actually working",
    description: "Know which listings get real interest, so you can price and prioritize with evidence, not guesswork.",
  },
];

export function WhyListEasy() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="ledger-label mb-3">Why ListEasy</p>
        <h2 className="font-display text-2xl text-foreground md:text-3xl">
          Built for how Bangladeshi agencies actually work
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="border-t border-border-strong pt-5">
            <point.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-lg text-foreground">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
