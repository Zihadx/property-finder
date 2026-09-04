"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/currency";

export function EmiCalculator({
  defaultPrice,
  salesPhone,
}: {
  defaultPrice: number;
  salesPhone: string;
}) {
  const [price, setPrice] = React.useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = React.useState(20);
  const [interestRate, setInterestRate] = React.useState(9);
  const [years, setYears] = React.useState(20);

  const { monthlyPayment, totalInterest, totalPayment, loanAmount } =
    React.useMemo(() => {
      const downPayment = (price * downPaymentPct) / 100;
      const principal = Math.max(price - downPayment, 0);
      const monthlyRate = interestRate / 12 / 100;
      const months = years * 12;

      if (principal <= 0 || months <= 0) {
        return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0, loanAmount: principal };
      }

      const monthly =
        monthlyRate === 0
          ? principal / months
          : (principal * monthlyRate * (1 + monthlyRate) ** months) /
            ((1 + monthlyRate) ** months - 1);

      const total = monthly * months;

      return {
        monthlyPayment: monthly,
        totalInterest: total - principal,
        totalPayment: total,
        loanAmount: principal,
      };
    }, [price, downPaymentPct, interestRate, years]);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Inputs */}
      <div className="flex flex-col gap-6">
        <NumberField
          label="Property price"
          value={price}
          onChange={setPrice}
          min={0}
          step={100000}
          suffix={formatBDT(price)}
        />

        <SliderField
          label="Down payment"
          value={downPaymentPct}
          onChange={setDownPaymentPct}
          min={0}
          max={90}
          suffix={`${downPaymentPct}% · ${formatBDT((price * downPaymentPct) / 100)}`}
        />

        <SliderField
          label="Interest rate"
          value={interestRate}
          onChange={setInterestRate}
          min={1}
          max={20}
          step={0.1}
          suffix={`${interestRate.toFixed(1)}% p.a.`}
        />

        <SliderField
          label="Loan duration"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          suffix={`${years} years`}
        />
      </div>

      {/* Outputs */}
      <div className="border border-border/70 bg-card p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">Estimated monthly payment</p>
        <p className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {formatBDT(Math.round(monthlyPayment))}
          <span className="ml-2 text-base font-normal text-muted-foreground">/month</span>
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border/60 pt-6">
          <div>
            <dt className="text-xs text-muted-foreground">Loan amount</dt>
            <dd className="mt-1 text-lg font-medium text-foreground">
              {formatBDT(Math.round(loanAmount))}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Total interest</dt>
            <dd className="mt-1 text-lg font-medium text-foreground">
              {formatBDT(Math.round(totalInterest))}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted-foreground">Total payment</dt>
            <dd className="mt-1 text-lg font-medium text-foreground">
              {formatBDT(Math.round(totalPayment))}
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-xs text-muted-foreground">
          Estimate only — actual bank offers vary by lender and eligibility.
        </p>

        <Button asChild className="mt-6 h-12 w-full rounded-none">
          <a href={`tel:${salesPhone}`}>Talk to a property advisor</a>
        </Button>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-11 w-full rounded-none border border-border bg-transparent px-3 text-sm text-foreground focus-visible:border-foreground focus-visible:outline-none"
      />
    </label>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none bg-border accent-foreground"
      />
    </label>
  );
}