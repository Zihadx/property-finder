import type { PaymentPlanStep } from "@/types/project";

const SEGMENT_COLORS = [
  "bg-foreground",
  "bg-foreground/70",
  "bg-foreground/45",
  "bg-foreground/25",
];

export function PaymentPlan({ steps }: { steps: PaymentPlanStep[] }) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden bg-muted">
        {steps.map((step, index) => (
          <div
            key={step.label}
            className={SEGMENT_COLORS[index % SEGMENT_COLORS.length]}
            style={{ width: `${step.percentage}%` }}
            title={`${step.label}: ${step.percentage}%`}
          />
        ))}
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start gap-3">
            <span
              className={`mt-1 size-2.5 shrink-0 rounded-full ${SEGMENT_COLORS[index % SEGMENT_COLORS.length]}`}
            />
            <div>
              <dt className="text-sm text-muted-foreground">{step.label}</dt>
              <dd className="text-lg font-medium text-foreground">
                {step.percentage}%
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}