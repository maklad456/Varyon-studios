"use client";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <div className="rounded-[14px] border border-[var(--mm-border)] bg-white p-4 shadow-soft">
      <p className="mb-2 inline-flex rounded-full bg-[var(--mm-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]">
        {label}
      </p>
      <p className="text-3xl font-bold text-[var(--mm-brand)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--mm-ink)]/70">{helper}</p>
    </div>
  );
}

