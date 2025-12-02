"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import * as emailjs from "@emailjs/browser";
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

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  userTemplateId: process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID,
  adminTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

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

async function sendEmail(payload: Record<string, string>, templateId?: string) {
  if (
    !emailConfig.serviceId ||
    !templateId ||
    !emailConfig.publicKey
  ) {
    return false;
  }

  try {
    await emailjs.send(emailConfig.serviceId, templateId, payload, emailConfig.publicKey);
    return true;
  } catch (error) {
    console.error("EmailJS error", error);
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
    if (storedCode) {
      setCode(storedCode);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    const generated = code || generateCode();

    const payload = {
      code: generated,
      ...form,
      timestamp: new Date().toISOString(),
    };

    const userEmailSent = await sendEmail(payload, emailConfig.userTemplateId);
    const adminEmailSent = await sendEmail(payload, emailConfig.adminTemplateId);

    if (userEmailSent && adminEmailSent) {
      setStatusMessage("Your code is on the way to your inbox.");
    } else if (!emailConfig.serviceId) {
      setStatusMessage("Email service not configured yet. Please copy your code and we’ll handle the rest manually.");
    } else {
      setStatusMessage("We couldn’t send the email right now, but your code is below.");
    }

    setCode(generated);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      localStorage.setItem(LOCAL_STORAGE_CODE_KEY, generated);
    }
    trackEvent("lead_popup_submit", { intent: form.intent });
    setSubmitting(false);
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
              Share a few details and we’ll email you a personal code for 10% off your first order — no commitment, no spam.
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
              onClick={handleSubmit}
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
