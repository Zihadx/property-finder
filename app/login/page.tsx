"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =====================================================================
   DATA — swap freely without touching layout/markup below
===================================================================== */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80";

const stats: { value: string; label: string }[] = [
  { value: "1,200+", label: "Verified Listings" },
  { value: "40+", label: "Partner Agencies" },
  { value: "18", label: "Neighborhoods" },
];

const socialProviders: { id: string; label: string; icon: React.ReactNode }[] = [
  {
    id: "google",
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.35 11.1h-9.17v2.98h5.27c-.23 1.4-1.64 4.1-5.27 4.1-3.17 0-5.76-2.62-5.76-5.86s2.59-5.86 5.76-5.86c1.8 0 3.01.77 3.7 1.43l2.52-2.43C16.98 3.79 14.87 2.9 12.18 2.9c-5.02 0-9.09 4.07-9.09 9.09s4.07 9.09 9.09 9.09c5.25 0 8.73-3.69 8.73-8.89 0-.6-.07-1.05-.16-1.5z"
        />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.36 1.43c0 1.14-.42 2.2-1.16 3.02-.83.9-2.05 1.6-3.14 1.51-.13-1.1.44-2.26 1.16-3 .84-.9 2.24-1.58 3.14-1.53zm3.6 16.87c-.36.83-.79 1.6-1.31 2.32-.72 1-1.47 1.98-2.65 2-1.16.02-1.53-.68-2.85-.68-1.31 0-1.73.66-2.83.7-1.14.04-2.01-1.08-2.74-2.07-1.49-2.04-2.63-5.77-1.1-8.29.76-1.25 2.12-2.05 3.6-2.07 1.1-.02 2.14.72 2.83.72.68 0 1.94-.89 3.27-.76.56.02 2.13.22 3.14 1.68-.08.05-1.87 1.06-1.85 3.17.02 2.52 2.29 3.36 2.32 3.37z"
        />
      </svg>
    ),
  },
];

/* =====================================================================
   PASSWORD FIELD — thin underline input, focus state echoes the
   animated-underline links already used across the header
===================================================================== */

function PasswordField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={visible ? "text" : "password"}
        autoComplete="current-password"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          peer w-full border-0 border-b border-border bg-transparent
          py-3 pr-10 text-[14px] text-foreground outline-none
          transition-colors duration-300
          placeholder:text-muted-foreground/60
          focus:border-foreground
        "
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
      <span
        className="
          pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-foreground
          transition-all duration-500 peer-focus:w-full
        "
      />
    </div>
  );
}

/* =====================================================================
   LOGIN PAGE
===================================================================== */

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // TODO: wire up to your real sign-in action/thunk.
      await new Promise((resolve) => setTimeout(resolve, 900));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* HERO — hidden below lg, so the form is the whole story on mobile */}
      <div className="relative hidden w-[52%] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="A light-filled living room in one of ListEasy's featured Dhaka residences"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

        {/* Brand mark, over the image */}
        <Link href="/" className="absolute left-10 top-10 flex items-baseline gap-2">
          <span className="font-display text-[22px] font-medium tracking-[-0.035em] text-white">
            ListEasy
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
            BD
          </span>
        </Link>

        {/* Editorial copy block */}
        <div className="absolute inset-x-0 bottom-0 px-10 pb-12">
          <p className="max-w-md font-display text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
            Where Dhaka&rsquo;s finest addresses find their owners.
          </p>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/70">
            Sign in to pick up where you left off — saved homes, open inquiries, and
            a dashboard built for how you actually search.
          </p>

          <div className="mt-10 flex items-center gap-8 border-t border-white/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[20px] font-medium text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-[9.5px] uppercase tracking-[0.16em] text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link href="/" className="flex items-baseline gap-2 lg:hidden">
            <span className="font-display text-[19px] font-medium tracking-[-0.035em] text-foreground">
              ListEasy
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-accent-strong">
              BD
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-1.5 text-[10.5px]">
            <span className="text-muted-foreground">New to ListEasy?</span>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-1 font-medium uppercase tracking-[0.14em] text-foreground"
            >
              Create account
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Centered form column */}
        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
          <div
            className={`
              w-full max-w-[400px]
              transition-all duration-700 ease-out
              ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
            `}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent-strong">
              Sign In
            </span>
            <h1 className="mt-3 font-display text-[30px] font-medium tracking-[-0.02em] text-foreground">
              Welcome back.
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Enter your details to access your saved properties and inquiries.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                >
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      peer w-full border-0 border-b border-border bg-transparent
                      py-3 pl-6 text-[14px] text-foreground outline-none
                      transition-colors duration-300
                      placeholder:text-muted-foreground/60
                      focus:border-foreground
                    "
                    placeholder="you@example.com"
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 peer-focus:w-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="mt-2">
                  <PasswordField id="password" value={password} onChange={setPassword} />
                </div>
              </div>

              <label className="flex select-none items-center gap-2.5 pt-1 text-[12px] text-muted-foreground">
                <span
                  role="checkbox"
                  aria-checked={remember}
                  tabIndex={0}
                  onClick={() => setRemember((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setRemember((v) => !v);
                    }
                  }}
                  className={`
                    flex h-[15px] w-[15px] shrink-0 items-center justify-center
                    border transition-colors duration-200
                    ${remember ? "border-foreground bg-foreground" : "border-border bg-transparent"}
                  `}
                >
                  {remember && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-background" aria-hidden="true">
                      <path
                        d="M2 6.2 4.6 9 10 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                Keep me signed in on this device
              </label>

              <Button
                type="submit"
                disabled={submitting}
                className="
                  group flex h-12 w-full items-center justify-center gap-2 rounded-none
                  bg-foreground text-[10px] font-semibold uppercase tracking-[0.2em] text-background
                  transition-all duration-500
                  hover:bg-foreground/90
                  disabled:opacity-60
                "
              >
                {submitting ? "Signing In…" : "Sign In"}
                {!submitting && (
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground/70">
                Or continue with
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  className="
                    flex h-11 items-center justify-center gap-2
                    border border-border text-[11px] font-medium text-foreground
                    transition-colors duration-300
                    hover:bg-surface-muted
                  "
                >
                  {provider.icon}
                  {provider.label}
                </button>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-2 text-[10px] text-muted-foreground/80">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span>Bank-grade encryption · Verified agencies only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}