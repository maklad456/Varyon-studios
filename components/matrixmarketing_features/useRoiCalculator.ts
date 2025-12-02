"use client";

import { useCallback, useState } from "react";

export type RoiInputs = {
  spend: number;
  customers: number;
  revenuePerCustomer: number;
  retentionMonths: number;
};

export type ScenarioCard = {
  title: string;
  subtitle: string;
  impact: string;
};

export type RoiResult = {
  cac: number;
  ltv: number;
  roiMultiple: number;
  roiPercent: number;
  gaugeWidth: number;
  gaugeState: "bad" | "ok" | "great";
  interpretation: string;
  suggestions: string[];
  scenarios: ScenarioCard[];
};

const defaultInputs: RoiInputs = {
  spend: 25000,
  customers: 120,
  revenuePerCustomer: 580,
  retentionMonths: 9,
};

const gaugeLookup = (multiple: number) => {
  if (multiple <= 0.5) return { width: 15, state: "bad" as const };
  if (multiple <= 1) return { width: 35, state: "bad" as const };
  if (multiple <= 3) return { width: 65, state: "ok" as const };
  return { width: Math.min(100, 90 + (multiple - 3) * 3), state: "great" as const };
};

const interpret = (multiple: number) => {
  if (multiple < 1) return "Unit economics are fragile. Focus on fixing CAC or onboarding flows immediately.";
  if (multiple < 3) return "Good foundation, but you need to improve retention or margins before scaling ad spend.";
  return "Efficient growth mode unlocked. Double down on the channels creating outsized LTV.";
};

const suggestionPool = [
  "Tighten audience qualification to remove low-intent spend.",
  "Launch retention journeys that educate during months 1-3.",
  "Repackage offers to lift ARPU without sacrificing conversion.",
  "Automate lead triage to shorten sales cycle time.",
  "Feed creative learns back into product marketing weekly.",
];

const buildScenarios = (result: RoiResult): ScenarioCard[] => [
  {
    title: "Retention x1.2",
    subtitle: "Extend average lifecycle by 20%",
    impact: `LTV → ${(result.ltv * 1.2).toFixed(0)}`,
  },
  {
    title: "Spend Efficiency",
    subtitle: "Reduce CAC by 15% via routing + creative",
    impact: `CAC → ${(result.cac * 0.85).toFixed(0)}`,
  },
  {
    title: "Pricing Power",
    subtitle: "+10% ARPU from packaging",
    impact: `ROI → ${(result.roiMultiple * 1.1).toFixed(2)}x`,
  },
];

const compute = (inputs: RoiInputs): RoiResult => {
  const spend = Math.max(inputs.spend, 0);
  const customers = Math.max(inputs.customers, 0);
  const revenue = Math.max(inputs.revenuePerCustomer, 0);
  const retention = Math.max(inputs.retentionMonths, 0);

  const cac = customers <= 0 ? 0 : spend / customers;
  const ltv = revenue * retention;
  const roiMultiple = cac === 0 ? 0 : ltv / cac;
  const roiPercent = cac === 0 ? 0 : ((ltv - cac) / cac) * 100;
  const { width, state } = gaugeLookup(roiMultiple);

  const suggestions = suggestionPool.sort(() => 0.5 - Math.random()).slice(0, 3);

  const result: RoiResult = {
    cac,
    ltv,
    roiMultiple,
    roiPercent,
    gaugeWidth: width,
    gaugeState: state,
    interpretation: interpret(roiMultiple),
    suggestions,
    scenarios: [],
  };

  result.scenarios = buildScenarios(result);
  return result;
};

export function useRoiCalculator(initial: RoiInputs = defaultInputs) {
  const [inputs, setInputs] = useState<RoiInputs>(initial);
  const [result, setResult] = useState<RoiResult | null>(null);

  const calculate = useCallback(
    (override?: Partial<RoiInputs>) => {
      const merged = { ...inputs, ...override };
      const computed = compute(merged);
      setInputs(merged);
      setResult(computed);
      return computed;
    },
    [inputs]
  );

  const reset = useCallback(() => {
    setInputs(initial);
    setResult(null);
  }, [initial]);

  return { inputs, setInputs, result, calculate, reset };
}

