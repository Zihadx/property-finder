# ListEasy BD

Premium property catalog & lead-generation frontend for Bangladeshi real-estate agencies.

**Status: Milestones 01–04 in progress** (Foundation, Design System, Mock Data, Landing Page) out of a 30-milestone plan. Each subsequent milestone will ship as its own reviewed increment.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Redux Toolkit · Zod · Motion · Recharts · Lucide · Sonner

## Getting started

```bash
npm install
npm run dev
```

## Architecture

```
app/            routes (App Router)
components/
  ui/           primitives — Button, Badge, Card, Input
  property/     PropertyCard, PropertyPrice (ledger motif)
  marketing/    Hero, FeaturedProperties, PopularAreas, WhyListEasy
  layout/       SiteHeader, SiteFooter
  dashboard/    (reserved for Milestone 16+)
data/           mock Bangladesh property/agent/area data
types/          domain types (Property, Agent, Inquiry, Area)
services/       data-access layer — UI never imports /data directly
redux/          store, slices (favorites, compare, filters), provider
lib/            utils (cn, formatBDT, formatArea)
```

### Swapping mock data for a real backend later

UI components only ever call `services/*.service.ts`. To connect a real
backend, rewrite the function bodies in `property.service.ts`,
`agent.service.ts`, and `area.service.ts` to call your API/DB instead of
reading from `data/*.ts` — no component code needs to change.

## Design system

Tokens live in `app/globals.css` under `@theme inline`. Palette: warm ivory
background, deep ink text, muted brass accent, deep olive secondary —
deliberately not the default blue-real-estate or cream+terracotta look.
The signature visual motif is the "ledger" treatment (`.ledger-value` /
`.ledger-label` classes) used for prices and specs — mono tabular numerals
with small-caps labels, styled like a title-deed line item rather than a
bold SaaS price tag.

**Fonts:** this sandbox has no outbound access to `fonts.googleapis.com`,
so `globals.css` currently references `Fraunces` / `Inter` / `JetBrains
Mono` as CSS font-family names with system fallbacks — they'll render with
fallback fonts until you either (a) load them via `next/font/google` in
`app/layout.tsx` once you're in an environment with normal internet
access, or (b) self-host the font files. Swapping to `next/font/google`
is a five-line change once network access isn't restricted.

**Images:** property/agent/area photos are placeholder URLs
(`picsum.photos`, `i.pravatar.cc`) seeded per-record so they're stable
across reloads. Replace with real photography before going live —
`next.config.ts` already whitelists these two hosts under
`images.remotePatterns`; add your real image host there too.

## Verification run on this build

- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npm run build` — clean, `/` prerenders as static content
