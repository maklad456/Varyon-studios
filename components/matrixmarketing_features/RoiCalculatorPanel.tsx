"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRoiCalculator } from "./useRoiCalculator";

const inputFields = [
  {
    label: "Monthly Marketing Spend",
    field: "spend",
    placeholder: "25000",
    prefix: "$",
  },
  {
    label: "New Customers (this month)",
    field: "customers",
    placeholder: "120",
  },
  {
    label: "Avg Revenue per Customer ($/mo)",
    field: "revenuePerCustomer",
    placeholder: "580",
    prefix: "$",
  },
  {
    label: "Avg Retention (months)",
    field: "retentionMonths",
    placeholder: "9",
  },
] as const;

const numberFormatter = (value: number) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

const currencyFormatter = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export function RoiCalculatorPanel() {
  const { inputs, setInputs, result, calculate, reset } = useRoiCalculator();
  const [animatedValues, setAnimatedValues] = useState({ cac: 0, ltv: 0, roiMultiple: 0, roiPercent: 0 });
  const animationRef = useRef<number>();
  const startValuesRef = useRef(animatedValues);

  useEffect(() => {
    startValuesRef.current = animatedValues;
  }, [animatedValues]);

  useEffect(() => {
    if (!result) return;

    const start = performance.now();
    const duration = 700;
    const startValues = startValuesRef.current;

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3);
      const next = {
        cac: startValues.cac + (result.cac - startValues.cac) * easing,
        ltv: startValues.ltv + (result.ltv - startValues.ltv) * easing,
        roiMultiple: startValues.roiMultiple + (result.roiMultiple - startValues.roiMultiple) * easing,
        roiPercent: startValues.roiPercent + (result.roiPercent - startValues.roiPercent) * easing,
      };
      setAnimatedValues(next);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [result]);

  const handleInputChange = (field: typeof inputFields[number]["field"], value: string) => {
    const numeric = Number(value);
    setInputs((prev) => ({ ...prev, [field]: Number.isNaN(numeric) ? 0 : numeric }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-[14px] border border-[var(--mm-border)] bg-white p-4 shadow-soft md:p-6"
      >
        <div className="grid gap-4 md:grid-cols-4">
          {inputFields.map((field) => (
            <label key={field.field} className="flex flex-col gap-1 text-sm font-semibold text-[var(--mm-ink)]">
              {field.label}
              <div className="flex items-center rounded-[10px] border border-[#dddddd] bg-white px-3 py-2.5 text-base">
                {field.prefix && <span className="text-gray-500">{field.prefix}</span>}
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs[field.field] ?? ""}
                  onChange={(event) => handleInputChange(field.field, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent text-[var(--mm-ink)] focus:outline-none"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => calculate()}
            className="rounded-full bg-[var(--mm-brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#e45f00]"
          >
            Calculate
          </button>
          <button
            onClick={() => {
              reset();
              setAnimatedValues({ cac: 0, ltv: 0, roiMultiple: 0, roiPercent: 0 });
            }}
            className="rounded-full border border-[var(--mm-border)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]"
          >
            Reset
          </button>
          <p className="text-xs text-[var(--mm-ink)]/70">
            We never store your inputs. This tool runs locally in your browser.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[14px] border border-[var(--mm-border)] bg-[var(--mm-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]/70">CAC</p>
            <p className="text-2xl font-bold text-[var(--mm-ink)]">{currencyFormatter(animatedValues.cac)}</p>
            <p className="text-xs text-[var(--mm-ink)]/70">Customer acquisition cost</p>
          </div>
          <div className="rounded-[14px] border border-[var(--mm-border)] bg-[var(--mm-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]/70">LTV</p>
            <p className="text-2xl font-bold text-[var(--mm-ink)]">{currencyFormatter(animatedValues.ltv)}</p>
            <p className="text-xs text-[var(--mm-ink)]/70">Lifetime value</p>
          </div>
          <div className="rounded-[14px] border border-[var(--mm-border)] bg-[var(--mm-muted)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]/70">ROI</p>
            <p className="text-2xl font-bold text-[var(--mm-ink)]">
              {animatedValues.roiMultiple.toFixed(2)}x ({numberFormatter(animatedValues.roiPercent)}%)
            </p>
            <p className="text-xs text-[var(--mm-ink)]/70">LTV ÷ CAC</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="gauge h-4 rounded-[10px] bg-[#e8e8e8]">
            <motion.div
              className="gauge-fill h-full rounded-[10px] bg-[var(--mm-accent)]"
              animate={{ width: result ? `${result.gaugeWidth}%` : "0%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-[var(--mm-ink)]">
            {result ? result.interpretation : "Run the numbers to see where your unit economics land."}
          </p>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-[14px] border border-[var(--mm-border)] bg-white p-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]/70">
            What to focus on next
          </p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--mm-ink)]">
            {(result?.suggestions ?? [
              "Run the calculator to unlock personalized next steps.",
            ]).map((suggestion) => (
              <li key={suggestion} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--mm-brand)]" />
                {suggestion}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[14px] border border-[var(--mm-border)] bg-white p-6"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--mm-ink)]/70">
            Scenario planner
          </p>
          <div className="mt-4 grid gap-3">
            {(result?.scenarios ?? [
              { title: "Improved retention", subtitle: "Add +2 months", impact: "?" },
            ]).map((scenario) => (
              <div
                key={scenario.title}
                className="rounded-[12px] border border-[var(--mm-border)] bg-[var(--mm-muted)] p-3"
              >
                <p className="text-sm font-semibold text-[var(--mm-ink)]">{scenario.title}</p>
                <p className="text-xs text-[var(--mm-ink)]/70">{scenario.subtitle}</p>
                <p className="mt-2 text-lg font-semibold text-[var(--mm-brand)]">{scenario.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

