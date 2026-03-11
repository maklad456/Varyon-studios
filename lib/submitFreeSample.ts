"use client";

import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_t645r5h";
const TEMPLATE_INTERNAL =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_FREE_SAMPLE_INTERNAL ||
  "template_19fur3d";
const TEMPLATE_CLIENT =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_FREE_SAMPLE_CLIENT ||
  "template_9j7s9h5";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "EbiCFriLNvLNCFYAm";

export type FreeSampleFormState = {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  brandLink: string;
  consent?: boolean;
  honeypot?: string;
};

const REQUIRED_FIELDS: (keyof FreeSampleFormState)[] = [
  "fullName",
  "email",
  "brandLink",
];

function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed.includes("@")) return false;
  const parts = trimmed.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
  const domain = parts[1];
  if (!domain.includes(".")) return false;
  const tld = domain.split(".").pop();
  if (!tld || tld.length < 2) return false;
  return true;
}

/** Accepts .com, https?://, or other safe link formats (common TLDs or domain-like). */
function isValidLink(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || trimmed.length < 4) return false;
  if (trimmed.includes(".com")) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  if (/\.(io|co|org|net|me|app|link|studio|edu|gov)\b/i.test(trimmed)) return true;
  if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(\/|$)/i.test(trimmed)) return true;
  return false;
}

function isValidFullName(name: string): boolean {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  return words.every((word) => word.length >= 3);
}

export function validateFreeSampleForm(form: FreeSampleFormState): string | null {
  if (form.honeypot && form.honeypot.trim() !== "") {
    return "spam";
  }
  for (const key of REQUIRED_FIELDS) {
    const val = form[key];
    const str = String(val || "").trim();
    if (!str) return `Please fill in ${key}.`;
  }

  if (!isValidFullName(form.fullName)) {
    return "Full name must have at least 2 names, each with at least 3 letters.";
  }
  if (!isValidEmail(form.email)) {
    return "Please enter a valid email address (e.g. name@domain.com).";
  }
  if (!form.phoneNumber?.trim()) {
    return "Please enter your phone number.";
  }
  if (!isValidLink(form.brandLink)) {
    return "Brand website / page must be a valid URL (e.g. example.com or https://example.com).";
  }

  return null;
}

export async function submitFreeSample(
  formState: FreeSampleFormState
): Promise<{ ok: boolean; error?: string }> {
  const validationError = validateFreeSampleForm(formState);
  if (validationError) {
    if (validationError === "spam") {
      return { ok: false, error: "Submission blocked." };
    }
    return { ok: false, error: validationError };
  }

  if (!SERVICE_ID || !TEMPLATE_INTERNAL || !TEMPLATE_CLIENT || !PUBLIC_KEY) {
    return { ok: false, error: "Email configuration is missing." };
  }

  const phone =
    [formState.phoneCountryCode?.trim(), formState.phoneNumber?.trim()]
      .filter(Boolean)
      .join(" ") || "";
  const internalParams = {
    fullName: formState.fullName.trim(),
    email: formState.email.trim(),
    phone,
    brandLink: formState.brandLink.trim(),
    timestamp: new Date().toISOString(),
    to_email: "info@varyonstudios.com",
  };
  const clientParams = {
    fullName: formState.fullName.trim(),
    email: formState.email.trim(),
    phone,
    brandLink: formState.brandLink.trim(),
    to_email: formState.email.trim(),
  };

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_INTERNAL,
      internalParams,
      PUBLIC_KEY
    );
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_CLIENT,
      clientParams,
      PUBLIC_KEY
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email.";
    return { ok: false, error: msg };
  }

  return { ok: true };
}
