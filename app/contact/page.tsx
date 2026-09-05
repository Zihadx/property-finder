"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Clock3,
  Check,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@listeasybd.com",
    href: "mailto:hello@listeasybd.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1XXX XXX XXX",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
];

const interests = [
  "Buying",
  "Renting",
  "Investing",
  "Selling",
  "Just exploring",
];

const ContactPage = () => {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* ───────────────── Header ───────────────── */}
      <SiteHeader />

      <main className="relative overflow-hidden bg-[#f6f5f1] text-stone-950">
        {/* ───────────────── Atmospheric Light ───────────────── */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-700/[0.045] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[12%] top-0 h-72 w-72 rounded-full bg-white/80 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[10%] right-[15%] h-64 w-64 rounded-full bg-cyan-700/[0.025] blur-[100px]"
        />

        {/* ───────────────── Hero ───────────────── */}

        <section className="relative">
          <div className="mx-auto container px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:pt-28">
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              className="max-w-6xl"
            >
              {/* Eyebrow */}

              <div className="mb-8 flex items-center gap-4">
                

                <span className="h-px w-10 bg-stone-300" />

                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-700">
                  Contact ListEasy
                </span>
              </div>

              {/* Heading */}

              <h1 className="font-display text-[clamp(3.75rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.06em] text-stone-950">
                Let&apos;s find
                <br />
                <span className="text-stone-500">your place.</span>
              </h1>

              {/* Intro */}

              <div className="mt-12 flex max-w-3xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-[15px] font-normal leading-7 text-stone-700 md:text-base">
                  Whether you&apos;re looking for a home, an investment, or a
                  property worth waiting for, tell us what matters to you.
                  We&apos;ll help you take the next step.
                </p>

                <div className="hidden items-center gap-3 md:flex">
                  <span className="h-px w-12 bg-stone-300" />

                  <ArrowUpRight className="size-4 text-cyan-700" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────────────── Main Contact ───────────────── */}

        <section className="relative border-t border-stone-300/90">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.78fr_1.22fr]">
            {/* ═════════════════ Left / Contact Information ═════════════════ */}

            <motion.div
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
              className="border-b border-stone-300/90 px-6 py-16 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-24"
            >
              {/* Label */}

              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-700">
                Start a conversation
              </p>

              {/* Heading */}

              <h2 className="mt-5 max-w-md font-display text-[2.5rem] font-medium leading-[1.04] tracking-[-0.045em] text-stone-950 sm:text-[2.75rem] md:text-[3.2rem]">
                A better search starts with a better conversation.
              </h2>

              {/* Description */}

              <p className="mt-7 max-w-md text-[15px] leading-7 text-stone-700">
                Share a little about what you&apos;re looking for. You
                don&apos;t need to have everything figured out yet.
              </p>

              {/* Contact Details */}

              <div className="mt-12 space-y-8">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-start gap-4"
                    >
                      {/* Icon */}

                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white/20 transition-all duration-500 group-hover:border-cyan-700 group-hover:bg-white group-hover:shadow-[0_0_0_6px_rgba(32,149,174,0.04)]">
                        <Icon className="size-4 text-stone-600 transition-colors duration-300 group-hover:text-cyan-700" />
                      </div>

                      {/* Text */}

                      <div className="pt-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                          {item.label}
                        </p>

                        <p className="mt-1.5 text-[15px] font-medium text-stone-950 transition-colors duration-300 group-hover:text-cyan-700">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Opening Hours */}

              <div className="mt-14 border-t border-stone-300/90 pt-7">
                <div className="flex items-center gap-3">
                  <Clock3 className="size-4 text-stone-500" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600">
                    Sun — Thu · 10:00 — 18:00
                  </span>
                </div>

                <p className="mt-3 pl-7 text-[12px] leading-5 text-stone-500">
                  We usually respond within one business day.
                </p>
              </div>

              {/* Small Trust Note */}

              <div className="mt-12 flex items-start gap-3">
                <div className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-cyan-700">
                  <Check className="size-3 text-white" />
                </div>

                <p className="max-w-xs text-[11px] font-medium leading-5 text-stone-600">
                  Your enquiry stays private. No unnecessary calls, no
                  pressure.
                </p>
              </div>
            </motion.div>

            {/* ═════════════════ Right / Form ═════════════════ */}

            <motion.div
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
              className="px-6 py-16 sm:px-8 lg:px-16 lg:py-24"
            >
              {/* Form Header */}

              <div className="mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-stone-500">
                  Private enquiry
                </p>

                <h2 className="mt-4 font-display text-[2.25rem] font-medium leading-tight tracking-[-0.04em] text-stone-950 sm:text-4xl">
                  Tell us what you&apos;re looking for.
                </h2>

                <p className="mt-4 max-w-lg text-[14px] leading-6 text-stone-600">
                  A few details help us understand your search and connect you
                  with the right properties.
                </p>
              </div>

              {/* Form */}

              <form className="space-y-9">
                {/* Name + Email */}

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    placeholder="Full name"
                    required
                  />

                  <Field
                    label="Email address"
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </div>

                {/* Phone */}

                <Field
                  label="Phone number"
                  placeholder="+880 1XXX XXX XXX"
                  type="tel"
                />

                {/* Interest */}

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600">
                    I&apos;m interested in
                  </label>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {interests.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className="rounded-full border border-stone-300 bg-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-700 transition-all duration-300 hover:border-cyan-700 hover:bg-white hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700/30"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location + Budget */}

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Preferred location"
                    placeholder="e.g. Gulshan"
                  />

                  <Field
                    label="Budget"
                    placeholder="Your preferred range"
                  />
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600"
                  >
                    Tell us more
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What would make the right property feel right?"
                    className="mt-4 w-full resize-none border-0 border-b border-stone-300 bg-transparent px-0 py-3 text-[15px] font-medium leading-7 text-stone-950 outline-none transition-colors placeholder:text-stone-500 focus:border-cyan-700"
                  />
                </div>

                {/* Bottom */}

                <div className="flex flex-col gap-6 border-t border-stone-300/90 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-[11px] font-normal leading-5 text-stone-500">
                    Your information is kept private and used only to respond
                    to your enquiry.
                  </p>

                  <button
                    type="submit"
                    className="group inline-flex h-13 min-h-13 items-center justify-center gap-4 bg-stone-950 px-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700/40"
                  >
                    <span>Send enquiry</span>

                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ───────────────── Closing Statement ───────────────── */}

        <section className="border-t border-stone-300/90">
          <div className="mx-auto container px-6 py-20 sm:px-8 md:py-28">
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.3,
              }}
              variants={reveal}
              className="flex flex-col justify-between gap-10 md:flex-row md:items-end"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-700">
                  The ListEasy approach
                </p>

                <p className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-stone-950 sm:text-5xl md:text-6xl">
                  Less searching.
                  <br />
                  <span className="text-stone-500">More certainty.</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.23em] text-stone-500">
                  Your next address
                </span>

                <span className="h-px w-10 bg-stone-300" />

                <ArrowUpRight className="size-4 text-cyan-700" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

/* ───────────────── Field ───────────────── */

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600">
        {label}

        {required && (
          <span className="ml-1 text-cyan-700">*</span>
        )}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-3 h-12 w-full border-0 border-b border-stone-300 bg-transparent px-0 text-[15px] font-medium text-stone-950 outline-none transition-colors placeholder:text-stone-500 focus:border-cyan-700"
      />
    </div>
  );
}

export default ContactPage;