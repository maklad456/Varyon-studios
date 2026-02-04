"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import {
  submitFreeSample,
  type FreeSampleFormState,
} from "@/lib/submitFreeSample";

const SAMPLE_TYPE_OPTIONS = [
  "2 images (recommended): 1 product-only + 1 lifestyle",
  "Product-only images",
  "Lifestyle images",
  "On-model / CGI",
];

const TARGET_MARKET_OPTIONS = [
  "",
  "Egypt",
  "GCC",
  "EU / US",
  "Other / Not sure",
];

const COUNTRY_OPTIONS: { code: string; label: string; flag: string }[] = [
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
  { code: "+971", label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+965", label: "Kuwait", flag: "🇰🇼" },
  { code: "+974", label: "Qatar", flag: "🇶🇦" },
  { code: "+973", label: "Bahrain", flag: "🇧🇭" },
  { code: "+968", label: "Oman", flag: "🇴🇲" },
  { code: "+962", label: "Jordan", flag: "🇯🇴" },
  { code: "+961", label: "Lebanon", flag: "🇱🇧" },
  { code: "+1", label: "United States / Canada", flag: "🇺🇸" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+34", label: "Spain", flag: "🇪🇸" },
  { code: "+31", label: "Netherlands", flag: "🇳🇱" },
  { code: "+41", label: "Switzerland", flag: "🇨🇭" },
  { code: "+43", label: "Austria", flag: "🇦🇹" },
  { code: "+32", label: "Belgium", flag: "🇧🇪" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+90", label: "Turkey", flag: "🇹🇷" },
  { code: "+7", label: "Russia", flag: "🇷🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+82", label: "South Korea", flag: "🇰🇷" },
  { code: "+65", label: "Singapore", flag: "🇸🇬" },
  { code: "+60", label: "Malaysia", flag: "🇲🇾" },
];

const initialForm: FreeSampleFormState = {
  fullName: "",
  email: "",
  phoneCountryCode: "+20",
  phoneNumber: "",
  brandName: "",
  brandLink: "",
  sampleType: SAMPLE_TYPE_OPTIONS[0],
  assetsLink: "",
  inspirationLinks: "",
  targetMarket: "",
  honeypot: "",
};

export default function FreeSamplePage() {
  const router = useRouter();
  const [form, setForm] = useState<FreeSampleFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: keyof FreeSampleFormState,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await submitFreeSample(form);

    setSubmitting(false);

    if (result.ok) {
      const submittedAt = Date.now();
      trackEvent("free_sample_submit", { sampleType: form.sampleType });
      const params = new URLSearchParams({
        submitted_at: String(submittedAt),
        name: form.fullName.trim(),
        email: form.email.trim(),
      });
      router.push(`/free-sample/book-meeting?${params.toString()}`);
      return;
    }
    setError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <main className="flex min-h-screen flex-col overflow-y-auto bg-vs-bgLight">
      {/* Header - matches Library subpage styling; ~20% shorter on desktop, less space above Step One */}
      <section className="flex-shrink-0 bg-vs-bgDark text-white pt-28 pb-6 md:pt-24 md:pb-8">
        <div className="site-container pt-8 md:pt-4 md:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
            Step One
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Request Your Free Sample
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:mx-auto">
            Share your brand details and assets — we&apos;ll deliver your sample
            within 72 hours.
          </p>
        </div>
      </section>

      {/* Form - same height as before (flex-1), form block vertically centered; equal py */}
      <section className="flex min-h-0 flex-1 flex-col justify-center py-8 md:py-10">
        <div className="site-container">
            <div className="mx-auto max-w-2xl md:max-w-4xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot - hidden from users, bots may fill */}
                <div className="h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                  <label htmlFor="honeypot">Leave blank</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={(e) => handleChange("honeypot", e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="text-sm font-medium text-vs-text-body md:text-base md:col-span-1">
                    Full name <span className="text-red-500">*</span>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      required
                      pattern="(\S{3,}\s+)+\S{3,}"
                      title="At least 2 names, each with at least 3 letters"
                    />
                  </label>
                  <label className="text-sm font-medium text-vs-text-body md:text-base md:col-span-1">
                    Email <span className="text-red-500">*</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      required
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      title="Enter a valid email (e.g. name@domain.com)"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="text-sm font-medium text-vs-text-body md:text-base md:col-span-1">
                    Brand name <span className="text-red-500">*</span>
                    <input
                      type="text"
                      name="brandName"
                      value={form.brandName}
                      onChange={(e) => handleChange("brandName", e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      required
                    />
                  </label>
                  <label className="text-sm font-medium text-vs-text-body md:text-base md:col-span-1">
                    Brand link <span className="text-red-500">*</span>
                    <input
                      type="text"
                      name="brandLink"
                      value={form.brandLink}
                      onChange={(e) => handleChange("brandLink", e.target.value)}
                      placeholder="example.com or https://example.com"
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      required
                      title="Enter a valid link (e.g. example.com or https://example.com)"
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-vs-text-body md:text-base">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCountryCode"
                      value={form.phoneCountryCode}
                      onChange={(e) =>
                        handleChange("phoneCountryCode", e.target.value)
                      }
                      className="form-select mt-1 w-[10rem] shrink-0 rounded-2xl border border-black/10 bg-white px-3 py-3 text-base text-vs-text-strong"
                      aria-label="Country code"
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={`${c.code}-${c.label}`} value={c.code}>
                          {c.flag} {c.code} {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      placeholder="Phone number"
                      className="mt-1 flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      autoComplete="tel-national"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block text-sm font-medium text-vs-text-body md:text-base">
                    Sample type <span className="text-red-500">*</span>
                    <select
                      name="sampleType"
                      value={form.sampleType}
                      onChange={(e) => handleChange("sampleType", e.target.value)}
                      className="form-select mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                      required
                    >
                      {SAMPLE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-vs-text-body md:text-base">
                    Target market
                    <select
                      name="targetMarket"
                      value={form.targetMarket}
                      onChange={(e) => handleChange("targetMarket", e.target.value)}
                      className="form-select mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base"
                    >
                      {TARGET_MARKET_OPTIONS.map((opt) => (
                        <option key={opt || "empty"} value={opt}>
                          {opt || "— Select —"}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block text-sm font-medium text-vs-text-body md:text-base">
                    Assets link <span className="text-red-500">*</span>
                    <input
                      type="text"
                      name="assetsLink"
                      value={form.assetsLink}
                      onChange={(e) => handleChange("assetsLink", e.target.value)}
                      placeholder="drive.google.com, dropbox.com, etc."
                      className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base md:h-[5.5rem] md:min-h-[5.5rem]"
                      required
                      title="Enter a valid link (e.g. drive.google.com or https://...)"
                    />
                  </label>
                  <label className="block text-sm font-medium text-vs-text-body md:text-base">
                    Inspiration links
                    <textarea
                      name="inspirationLinks"
                      value={form.inspirationLinks}
                      onChange={(e) => handleChange("inspirationLinks", e.target.value)}
                      rows={3}
                      placeholder="Optional: links to references, mood boards, or examples"
                      className="mt-1 w-full resize-none overflow-y-auto rounded-2xl border border-black/10 bg-white px-4 py-3 text-base md:h-[5.5rem] md:min-h-[5.5rem]"
                    />
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit request"}
                </button>
              </form>
            </div>
        </div>
      </section>
    </main>
  );
}
