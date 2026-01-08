"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const intentOptions = [
  "Media production for socials",
  "Product images for website",
  "Video creation",
  "Campaign creation",
  "Branding services",
];

const LOCAL_STORAGE_KEY = "vs_lead_popup_dismissed";
const LOCAL_STORAGE_CODE_KEY = "vs_lead_popup_code";
const LOCAL_STORAGE_FORM_KEY = "vs_lead_popup_form";

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  intent: string;
};

const initialForm: LeadForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  intent: intentOptions[0],
};

function generateCode() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `VS10-${random}`;
}

async function sendEmailsServer(payload: Record<string, string>) {
  try {
    const res = await fetch("/api/send-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
      console.error("API error response:", res.status, errorData);
      return false;
    }

    const result = await res.json();
    
    if (!result.ok) {
      console.error("API returned error:", result.message || "Unknown error");
      return false;
    }

    return true;
  } catch (err) {
    console.error("API email error", err);
    return false;
  }
}

export function LeadCaptureModal() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") return;
    const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedCode = localStorage.getItem(LOCAL_STORAGE_CODE_KEY);
    const storedForm = localStorage.getItem(LOCAL_STORAGE_FORM_KEY);
    
    if (storedCode) {
      setCode(storedCode);
    }
    
    if (storedForm) {
      try {
        const parsedForm = JSON.parse(storedForm);
        setForm(parsedForm);
      } catch (e) {
        // Invalid stored form, ignore
      }
    }

    if (dismissed) {
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
      trackEvent("lead_popup_view");
    }, 12000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const isValid = useMemo(() => {
    return form.name && form.company && form.email && form.phone;
  }, [form]);

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
  };

  const handleChange = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    // If code exists but form is not valid, we can't send email
    if (code && !isValid) {
      setStatusMessage("Please fill in all fields to send the code to your inbox.");
      return;
    }
    
    // If no code yet and form is invalid, don't proceed
    if (!code && !isValid) {
      return;
    }
    
    setSubmitting(true);
    const generated = code || generateCode();

    const payload = {
      code: generated,
      ...form,
      timestamp: new Date().toISOString(),
    };

    const emailsSent = await sendEmailsServer(payload);

    if (emailsSent) {
      setStatusMessage("Your code is on the way to your inbox.");
    } else {
      setStatusMessage("We couldn&apos;t send the email right now, but your code is below.");
    }

    setCode(generated);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      localStorage.setItem(LOCAL_STORAGE_CODE_KEY, generated);
      localStorage.setItem(LOCAL_STORAGE_FORM_KEY, JSON.stringify(form));
    }
    
    // Only track submit event on initial form submission, not when resending
    if (!code) {
      trackEvent("lead_popup_submit", { intent: form.intent });
    }
    
    setSubmitting(false);
  };

  const handleSendCode = async () => {
    await handleSubmit();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-text-body/70">
              10% launch offer
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-vs-text-strong">Get 10% off your first shoot</h3>
            <p className="mt-3 text-sm text-vs-text-body">
              Share a few details and we&apos;ll email you a personal code for 10% off your first order — no commitment, no spam.
            </p>
          </div>
          <button onClick={handleClose} aria-label="Close popup" className="text-sm text-vs-text-body">
            ✕
          </button>
        </div>

        {code ? (
          <div className="mt-6 rounded-2xl border border-dashed border-vs-accent-soft bg-vs-bg-light p-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-vs-text-body">Your code</p>
            <p className="mt-3 text-3xl font-bold text-vs-text-strong">{code}</p>
            <p className="mt-2 text-sm text-vs-text-body">Keep a copy of your code to use on your first order.</p>
            {statusMessage && <p className="mt-3 text-xs text-vs-text-body/70">{statusMessage}</p>}
            <button
              className="mt-4 rounded-full border border-vs-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent"
              onClick={handleSendCode}
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send code to my inbox"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-vs-text-body">
                Full name
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                  required
                />
              </label>
              <label className="text-sm font-medium text-vs-text-body">
                Brand / Company
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                  required
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-vs-text-body">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                  required
                />
              </label>
              <label className="text-sm font-medium text-vs-text-body">
                Phone / WhatsApp
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                  required
                />
              </label>
            </div>
            <label className="text-sm font-medium text-vs-text-body">
              What are you looking for?
              <select
                value={form.intent}
                onChange={(e) => handleChange("intent", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
              >
                {intentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="w-full rounded-full bg-vs-accent px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Get my 10% code"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
