"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* =====================================================================
   DATA
===================================================================== */

// Replace with your own photography — a different crop/angle from the
// login page keeps the two screens visually related but distinct.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80";

const stats: { value: string; label: string }[] = [
  { value: "3 min", label: "Average Signup" },
  { value: "40+", label: "Partner Agencies" },
  { value: "1,200+", label: "Active Buyers" },
];

// Matches CurrentUser["role"] in site-header.tsx — keep these in sync.
type SignupRole = "customer" | "agent";

const roleOptions: { id: SignupRole; label: string; icon: React.ReactNode }[] = [
  { id: "customer", label: "Buying or Renting", icon: <Home className="h-3.5 w-3.5" /> },
  { id: "agent", label: "Listing Properties", icon: <Building2 className="h-3.5 w-3.5" /> },
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
   FIELD PRIMITIVES — underline inputs matching the login page
===================================================================== */

function TextField({
  id,
  label,
  type = "text",
  icon: Icon,
  autoComplete,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  icon: React.ComponentType<{ className?: string }>;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            peer w-full border-0 border-b border-border bg-transparent
            py-3 pl-6 text-[14px] text-foreground outline-none
            transition-colors duration-300
            placeholder:text-muted-foreground/60
            focus:border-foreground
          "
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 peer-focus:w-full" />
      </div>
    </div>
  );
}

function passwordStrength(value: string) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score; // 0–4
}

const strengthLabel = ["Too short", "Weak", "Fair", "Good", "Strong"];

function PasswordField({
  id,
  label,
  value,
  onChange,
  showStrength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showStrength?: boolean;
}) {
  const [visible, setVisible] = React.useState(false);
  const strength = showStrength ? passwordStrength(value) : 0;

  return (
    <div>
      <label
        htmlFor={id}
        className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <Lock className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          autoComplete={showStrength ? "new-password" : "current-password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="
            peer w-full border-0 border-b border-border bg-transparent
            py-3 pl-6 pr-10 text-[14px] text-foreground outline-none
            transition-colors duration-300
            placeholder:text-muted-foreground/60
            focus:border-foreground
          "
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 peer-focus:w-full" />
      </div>

      {showStrength && value.length > 0 && (
        <div className="mt-2.5 flex items-center gap-2.5">
          <div className="flex flex-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-[3px] flex-1 transition-colors duration-300 ${
                  i < strength ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
            {strengthLabel[strength]}
          </span>
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   ROLE TOGGLE — buyer/renter vs agency, sets the rest of the form
===================================================================== */

function RoleToggle({
  value,
  onChange,
}: {
  value: SignupRole;
  onChange: (value: SignupRole) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="I'm signing up to">
      {roleOptions.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={`
              flex items-center justify-center gap-2 border py-3
              text-[10.5px] font-medium uppercase tracking-[0.1em]
              transition-colors duration-300
              ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }
            `}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* =====================================================================
   SIGNUP PAGE
===================================================================== */

export default function SignupPage() {
  const [role, setRole] = React.useState<SignupRole>("customer");
  const [fullName, setFullName] = React.useState("");
  const [agencyName, setAgencyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitting(true);
    try {
      // TODO: wire up to your real sign-up action/thunk. Include `role`
      // (and `agencyName` when role === "agent") in the payload.
      await new Promise((resolve) => setTimeout(resolve, 900));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* HERO — hidden below lg */}
      <div className="relative hidden w-[52%] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="A sunlit facade from one of ListEasy's featured Dhaka residences"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

        <Link href="/" className="absolute left-10 top-10 flex items-baseline gap-2">
          <span className="font-display text-[22px] font-medium tracking-[-0.035em] text-white">
            ListEasy
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
            BD
          </span>
        </Link>

        <div className="absolute inset-x-0 bottom-0 px-10 pb-12">
          <p className="max-w-md font-display text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
            Every great search starts with an account.
          </p>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/70">
            Save listings, message agents directly, and — if you list
            properties — get a dashboard built for how you actually work.
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
            <span className="text-muted-foreground">Already have an account?</span>
            <Link
              href="/login"
              className="group inline-flex items-center gap-1 font-medium uppercase tracking-[0.14em] text-foreground"
            >
              Sign in
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
          <div
            className={`
              w-full max-w-[420px]
              transition-all duration-700 ease-out
              ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
            `}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent-strong">
              Create Account
            </span>
            <h1 className="mt-3 font-display text-[30px] font-medium tracking-[-0.02em] text-foreground">
              Find home, faster.
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Tell us who you are — the rest of the form adjusts to fit.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <RoleToggle value={role} onChange={setRole} />

              <TextField
                id="fullName"
                label="Full name"
                icon={User}
                autoComplete="name"
                placeholder="Ayesha Rahman"
                value={fullName}
                onChange={setFullName}
              />

              {role === "agent" && (
                <TextField
                  id="agencyName"
                  label="Agency name"
                  icon={Building2}
                  autoComplete="organization"
                  placeholder="Rahman & Co. Properties"
                  value={agencyName}
                  onChange={setAgencyName}
                />
              )}

              <TextField
                id="email"
                label="Email address"
                type="email"
                icon={Mail}
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={setEmail}
              />

              <PasswordField
                id="password"
                label="Password"
                value={password}
                onChange={setPassword}
                showStrength
              />

              <label className="flex select-none items-start gap-2.5 pt-1 text-[12px] leading-relaxed text-muted-foreground">
                <span
                  role="checkbox"
                  aria-checked={agreed}
                  tabIndex={0}
                  onClick={() => setAgreed((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setAgreed((v) => !v);
                    }
                  }}
                  className={`
                    mt-0.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center
                    border transition-colors duration-200
                    ${agreed ? "border-foreground bg-foreground" : "border-border bg-transparent"}
                  `}
                >
                  {agreed && (
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
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-foreground underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-foreground underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="submit"
                disabled={submitting || !agreed}
                className="
                  group flex h-12 w-full items-center justify-center gap-2 rounded-none
                  bg-foreground text-[10px] font-semibold uppercase tracking-[0.2em] text-background
                  transition-all duration-500
                  hover:bg-foreground/90
                  disabled:opacity-60
                "
              >
                {submitting ? "Creating Account…" : "Create Account"}
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
              <span>No card required · Verified agencies only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}