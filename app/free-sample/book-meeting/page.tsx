"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useMemo, Suspense } from "react";

const CALENDLY_BASE_PATH =
  "https://calendly.com/varyonstudios/45-minute-meeting-clone";
/* Site button color #10b981 (vs-accent) – no hash for Calendly */
const CALENDLY_QUERY =
  "hide_event_type_details=1&hide_gdpr_banner=1&primary_color=10b981";
const CALENDLY_BASE = `${CALENDLY_BASE_PATH}?${CALENDLY_QUERY}`;
const HOURS_UNTIL_FIRST_SLOT = 72;

function buildCalendlyUrl(
  submittedAtMs: number,
  prefill: { name: string; email: string }
): string {
  const start = new Date(submittedAtMs);
  const firstAvailable = new Date(
    start.getTime() + HOURS_UNTIL_FIRST_SLOT * 60 * 60 * 1000
  );
  const year = firstAvailable.getFullYear();
  const month = String(firstAvailable.getMonth() + 1).padStart(2, "0");
  const day = String(firstAvailable.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  const base = `${CALENDLY_BASE_PATH}/${dateStr}?${CALENDLY_QUERY}`;
  return appendPrefill(base, prefill);
}

function appendPrefill(
  url: string,
  prefill: { name: string; email: string }
): string {
  if (!prefill.name.trim() && !prefill.email.trim()) return url;
  const separator = url.includes("?") ? "&" : "?";
  const params = new URLSearchParams();
  if (prefill.name.trim()) params.set("name", prefill.name.trim());
  if (prefill.email.trim()) params.set("email", prefill.email.trim());
  return params.toString() ? `${url}${separator}${params.toString()}` : url;
}

function BookMeetingContent() {
  const searchParams = useSearchParams();
  const submittedAtParam = searchParams.get("submitted_at");
  const nameParam = searchParams.get("name") ?? "";
  const emailParam = searchParams.get("email") ?? "";

  const calendlyUrl = useMemo(() => {
    const prefill = { name: nameParam, email: emailParam };
    const submittedAtMs = submittedAtParam
      ? parseInt(submittedAtParam, 10)
      : Date.now();
    if (Number.isNaN(submittedAtMs)) {
      return appendPrefill(CALENDLY_BASE, prefill);
    }
    return buildCalendlyUrl(submittedAtMs, prefill);
  }, [submittedAtParam, nameParam, emailParam]);

  return (
    <main className="min-h-screen bg-vs-bgLight">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <section className="bg-vs-bgDark text-white pt-28 pb-6 md:pt-24 md:pb-8">
        <div className="site-container pt-8 md:pt-4 md:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-vs-accent">
            Step Two
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight">
            Schedule Your Sample Delivery Call
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:mx-auto">
            In this meeting, we’ll review your free custom sample and show
            exactly how your brand can use AI media to increase output and lower
            creative cost.
          </p>
        </div>
      </section>

      <section className="site-container py-12 md:py-16">
        <div
          className="calendly-inline-widget min-h-[700px] w-full"
          data-url={calendlyUrl}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </section>
    </main>
  );
}

export default function BookMeetingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-vs-bgLight pt-28">
          <div className="site-container py-12">
            <p className="text-vs-text-body">Loading…</p>
          </div>
        </main>
      }
    >
      <BookMeetingContent />
    </Suspense>
  );
}
