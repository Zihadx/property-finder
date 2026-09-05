"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/currency";

interface EmiCalculatorProps {
  defaultPrice: number;
  salesPhone: string;
}

export function EmiCalculator({
  defaultPrice,
  salesPhone,
}: EmiCalculatorProps) {
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
        return {
          monthlyPayment: 0,
          totalInterest: 0,
          totalPayment: 0,
          loanAmount: principal,
        };
      }

      const monthly =
        monthlyRate === 0
          ? principal / months
          : (principal *
              monthlyRate *
              Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

      const total = monthly * months;

      return {
        monthlyPayment: monthly,
        totalInterest: Math.max(total - principal, 0),
        totalPayment: total,
        loanAmount: principal,
      };
    }, [price, downPaymentPct, interestRate, years]);

  return (
    <div className="grid overflow-hidden border border-border/60 lg:grid-cols-[1fr_1fr]">
      {/* ================================================================ */}
      {/* LEFT — CONTROLS                                                  */}
      {/* ================================================================ */}

      <div className="border-b border-border/60 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
        <div className="mb-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Financing
          </p>

          <h3 className="mt-2 font-display text-2xl tracking-[-0.025em] text-foreground sm:text-3xl">
            Shape the numbers.
          </h3>
        </div>

        <div className="space-y-9">
          <NumberField
            label="Property price"
            value={price}
            onChange={setPrice}
            min={0}
            step={100000}
          />

          <SliderField
            label="Down payment"
            value={downPaymentPct}
            onChange={setDownPaymentPct}
            min={0}
            max={90}
            suffix={`${downPaymentPct}%`}
          />

          <SliderField
            label="Interest rate"
            value={interestRate}
            onChange={setInterestRate}
            min={1}
            max={20}
            step={0.1}
            suffix={`${interestRate.toFixed(1)}%`}
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

        <p className="mt-10 max-w-md text-xs leading-5 text-muted-foreground">
          Adjust the property price, down payment, interest rate and
          tenure to create an indicative financing scenario.
        </p>
      </div>

      {/* ================================================================ */}
      {/* RIGHT — RESULT                                                    */}
      {/* ================================================================ */}

      <div className="flex flex-col justify-between bg-muted/20 p-6 sm:p-8 lg:p-10 xl:p-12">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Estimated monthly payment
            </p>

            <span className="text-xs text-muted-foreground">
              BDT / month
            </span>
          </div>

          <div className="mt-5 border-b border-border/60 pb-8">
            <p className="font-display text-4xl leading-none tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
              {formatBDT(Math.round(monthlyPayment))}
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2">
            <SummaryItem
              label="Loan amount"
              value={formatBDT(Math.round(loanAmount))}
            />

            <SummaryItem
              label="Down payment"
              value={formatBDT(
                Math.round((price * downPaymentPct) / 100)
              )}
              bordered
            />

            <SummaryItem
              label="Total interest"
              value={formatBDT(Math.round(totalInterest))}
              topBorder
            />

            <SummaryItem
              label="Total payment"
              value={formatBDT(Math.round(totalPayment))}
              bordered
              topBorder
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-start justify-between gap-6">
            <p className="max-w-sm text-xs leading-5 text-muted-foreground">
              Estimate only. Actual rates, fees and eligibility vary
              by lender.
            </p>
          </div>

          <Button
            asChild
            className="group h-12 w-full rounded-none bg-foreground px-6 text-background hover:bg-foreground/90"
          >
            <a href={`tel:${salesPhone}`}>
              Speak with an advisor
              <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* Number Field                                                               */
/* ========================================================================== */

function NumberField({
  label,
  value,
  onChange,
  min,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>

        <span className="text-xs text-muted-foreground">
          {formatBDT(value)}
        </span>
      </div>

      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(event) => {
          const next = Number(event.target.value);

          onChange(
            Number.isFinite(next) ? Math.max(next, 0) : 0
          );
        }}
        className="h-12 w-full rounded-none border border-border/70 bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}

/* ========================================================================== */
/* Slider Field                                                               */
/* ========================================================================== */

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
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix: string;
}) {
  return (
    <label className="block">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>

        <span className="font-medium text-sm text-foreground">
          {suffix}
        </span>
      </div>

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="h-1 w-full cursor-pointer appearance-none rounded-none bg-border accent-foreground"
      />

      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        <span>
          {min}
          {label === "Interest rate" ? "%" : ""}
        </span>

        <span>
          {max}
          {label === "Interest rate" ? "%" : ""}
        </span>
      </div>
    </label>
  );
}

/* ========================================================================== */
/* Summary Item                                                               */
/* ========================================================================== */

function SummaryItem({
  label,
  value,
  bordered = false,
  topBorder = false,
}: {
  label: string;
  value: string;
  bordered?: boolean;
  topBorder?: boolean;
}) {
  return (
    <div
      className={[
        "py-6",
        bordered ? "border-l border-border/60 pl-5 sm:pl-6" : "",
        topBorder ? "border-t border-border/60" : "",
      ].join(" ")}
    >
      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-foreground sm:text-base">
        {value}
      </p>
    </div>
  );
}