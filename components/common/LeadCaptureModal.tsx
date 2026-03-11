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

const EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";

// EmailJS Configuration from environment variables
// Client Side Template (sent to customer)
const EMAILJS_CUSTOMER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID || "template_o2u23o6";
// Admin Side Template (sent to info@varyonstudios.com)
const EMAILJS_ADMIN_TEMPLATE_ID = "template_0wy5yrf";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_t645r5h";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "EbiCFriLNvLNCFYAm";

// WhatsApp Configuration
const WHATSAPP_NUMBER = "201116001400";

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

/**
 * Generate WhatsApp URL with prefilled message
 */
function getWhatsAppUrl(code: string): string {
  const message = `Hello Varyon Studios, I'd like to use my 10% discount for my first shoot. My code is ${code}.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Reusable helper function to send emails via EmailJS REST API
 */
async function sendEmailJS(templateId: string, templateParams: Record<string, any>): Promise<boolean> {
  try {
    const requestBody = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    };

    console.log(`[EmailJS] Sending email with template: ${templateId}`, {
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      has_template_params: !!templateParams,
    });

    const response = await fetch(EMAILJS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text().catch(() => "");
    
    // EmailJS returns 200 OK with body "OK" (or empty) on success
    // 400 Bad Request with error message on failure
    if (!response.ok) {
      console.error(`[EmailJS] ❌ API error for template ${templateId}:`, {
        status: response.status,
        statusText: response.statusText,
        response: responseText,
        url: EMAILJS_API_URL,
      });
      throw new Error(`EmailJS API error (${response.status}): ${responseText || response.statusText}`);
    }

    // Success - EmailJS returns 200 (response.ok = true)
    // Response body can be "OK" or empty, both indicate success
    console.log(`[EmailJS] ✅ Success for template ${templateId}:`, {
      status: response.status,
      response: responseText.trim() || "(empty response - still success)",
    });

    return true;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`[EmailJS] Exception for template ${templateId}:`, errorMessage);
    throw new Error(errorMessage);
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
      // Set status message for existing codes
      setStatusMessage("Your code is on the way to your inbox.");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // If form is invalid, don't proceed
    if (!isValid) {
      return;
    }
    
    // If code already exists, don't resend emails (email only sends once)
    if (code) {
      return;
    }
    
    setSubmitting(true);
    const generated = generateCode();

    // Build payload with all form fields
    const templateParams = {
      code: generated,
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      intent: form.intent,
      timestamp: new Date().toISOString(),
    };

    // Verify template IDs before sending
    console.log("[EmailJS] Configuration check:", {
      customerTemplate: EMAILJS_CUSTOMER_TEMPLATE_ID,
      adminTemplate: EMAILJS_ADMIN_TEMPLATE_ID,
      serviceId: EMAILJS_SERVICE_ID,
      publicKey: EMAILJS_PUBLIC_KEY ? "SET" : "MISSING",
    });

    // Send both emails using Promise.allSettled
    // Customer email success determines UI success
    // Admin email failure should not block user success
    console.log("[EmailJS] Sending both emails in parallel...");
    const [customerResult, adminResult] = await Promise.allSettled([
      sendEmailJS(EMAILJS_CUSTOMER_TEMPLATE_ID, templateParams),
      sendEmailJS(EMAILJS_ADMIN_TEMPLATE_ID, templateParams),
    ]);

    // Check customer email result (this determines success)
    const customerEmailSent = customerResult.status === "fulfilled" && customerResult.value === true;

    // Log customer email result for debugging
    if (customerResult.status === "rejected") {
      const errorMessage = customerResult.reason instanceof Error 
        ? customerResult.reason.message 
        : String(customerResult.reason);
      console.error("[EmailJS] ❌ Customer email FAILED:", {
        templateId: EMAILJS_CUSTOMER_TEMPLATE_ID,
        error: errorMessage,
      });
    } else if (customerResult.status === "fulfilled") {
      console.log("[EmailJS] ✅ Customer email SUCCESS:", {
        templateId: EMAILJS_CUSTOMER_TEMPLATE_ID,
        result: customerResult.value,
      });
    }

    // Log admin email result for debugging
    if (adminResult.status === "rejected") {
      const errorMessage = adminResult.reason instanceof Error 
        ? adminResult.reason.message 
        : String(adminResult.reason);
      console.error("[EmailJS] ❌ Admin email FAILED:", {
        templateId: EMAILJS_ADMIN_TEMPLATE_ID,
        error: errorMessage,
        fullError: adminResult.reason,
      });
    } else if (adminResult.status === "fulfilled") {
      if (adminResult.value === true) {
        console.log("[EmailJS] ✅ Admin email SUCCESS:", {
          templateId: EMAILJS_ADMIN_TEMPLATE_ID,
          result: adminResult.value,
        });
      } else {
        console.warn("[EmailJS] ⚠️ Admin email returned unexpected value:", {
          templateId: EMAILJS_ADMIN_TEMPLATE_ID,
          result: adminResult.value,
        });
      }
    }

    // Set status message and code
    if (customerEmailSent) {
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

    const adminEmailSent =
      adminResult.status === "fulfilled" && adminResult.value === true;

    if (customerEmailSent && adminEmailSent) {
      // Both succeeded — fire the popup conversion as a custom Meta event so it
      // does NOT pollute the free-sample Lead optimisation signal.
      // In analytics.ts, "lead_popup_submit" has no standard-event mapping, so
      // Meta receives it as trackCustom("PopupCouponLead").
      trackEvent("lead_popup_submit", {
        intent: form.intent,
        meta_custom_event: "PopupCouponLead",
      });
    } else if (customerEmailSent && !adminEmailSent) {
      // Customer got their code but we missed the admin notification — fire a
      // diagnostic event so we can monitor this in GA/Meta without counting it
      // as a successful lead conversion.
      trackEvent("popup_admin_email_failed", { intent: form.intent });
    }
    // If neither email succeeded the user sees the fallback status message
    // and we intentionally do not fire any conversion event.

    setSubmitting(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        {code ? (
          <>
            <button onClick={handleClose} aria-label="Close popup" className="absolute right-8 top-8 text-sm text-vs-text-body">
              ✕
            </button>
            <div className="rounded-2xl border border-dashed border-vs-accent-soft bg-vs-bg-light p-6 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-vs-text-body">Your code</p>
              <p className="mt-3 text-3xl font-bold text-vs-text-strong">{code}</p>
              <p className="mt-2 text-sm text-vs-text-body">Keep a copy of your code to use on your first order.</p>
              {statusMessage && <p className="mt-3 text-xs text-vs-text-body/70">{statusMessage}</p>}
              
              {/* Guidance text */}
              <div className="mt-4 space-y-1 text-xs text-vs-text-body/70">
                <p>We&apos;ve emailed your code. Check Inbox, Spam, and Trash.</p>
                <p>If you can&apos;t find it, contact us on WhatsApp or email info@varyonstudios.com.</p>
              </div>

              {/* WhatsApp CTA Button */}
              <a
                href={getWhatsAppUrl(code)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full rounded-full bg-vs-accent px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-90"
              >
                Use my 10% on WhatsApp
              </a>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
