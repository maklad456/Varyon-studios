"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useMemo, Suspense, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_BASE_PATH =
  "https://calendly.com/varyonstudios/45-minute-meeting-clone";
/* Site button color #10b981 (vs-accent) – no hash for Calendly */
const CALENDLY_QUERY =
  "hide_event_type_details=1&hide_gdpr_banner=1&primary_color=10b981";
const CALENDLY_BASE = `${CALENDLY_BASE_PATH}?${CALENDLY_QUERY}`;
const HOURS_UNTIL_FIRST_SLOT = 72;

function buildCalendlyUrl(submittedAtMs: number): string {
  const start = new Date(submittedAtMs);
  const firstAvailable = new Date(
    start.getTime() + HOURS_UNTIL_FIRST_SLOT * 60 * 60 * 1000
  );
  const year = firstAvailable.getFullYear();
  const month = String(firstAvailable.getMonth() + 1).padStart(2, "0");
  const day = String(firstAvailable.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return `${CALENDLY_BASE_PATH}/${dateStr}?${CALENDLY_QUERY}`;
}

function BookMeetingContent() {
  const searchParams = useSearchParams();
  const submittedAtParam = searchParams.get("submitted_at");
  const nameParam = searchParams.get("name") ?? "";
  const emailParam = searchParams.get("email") ?? "";

  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetInitializedRef = useRef(false);

  const calendlyUrl = useMemo(() => {
    const submittedAtMs = submittedAtParam
      ? parseInt(submittedAtParam, 10)
      : Date.now();
    if (Number.isNaN(submittedAtMs)) {
      return CALENDLY_BASE;
    }
    return buildCalendlyUrl(submittedAtMs);
  }, [submittedAtParam]);

  useEffect(() => {
    trackEvent("free_sample_book_meeting_view", { page: "free_sample_step_two" });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event === "calendly.event_scheduled") {
        trackEvent("free_sample_meeting_booked", {
          source: "free_sample",
          has_prefill: Boolean(nameParam || emailParam),
        });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [nameParam, emailParam]);

  // Initialize Calendly widget with prefill AFTER script loads
  useEffect(() => {
    if (!widgetRef.current || widgetInitializedRef.current) return;

    const initWidget = () => {
      const win = window as typeof window & {
        Calendly?: {
          initInlineWidget: (options: {
            url: string;
            parentElement: HTMLElement;
            prefill?: { name?: string; email?: string };
          }) => void;
        };
      };

      if (win.Calendly?.initInlineWidget && widgetRef.current) {
        widgetInitializedRef.current = true;
        win.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widgetRef.current,
          prefill: nameParam || emailParam ? {
            ...(nameParam ? { name: nameParam } : {}),
            ...(emailParam ? { email: emailParam } : {}),
          } : undefined,
        });
      }
    };

    // Try immediately, then retry after a short delay if Calendly not loaded yet
    initWidget();
    const timeout = setTimeout(initWidget, 500);

    return () => clearTimeout(timeout);
  }, [calendlyUrl, nameParam, emailParam]);

  return (
    <main className="min-h-screen bg-vs-bgLight">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Trigger widget init when script loads
          if (!widgetRef.current || widgetInitializedRef.current) return;
          
          const win = window as typeof window & {
            Calendly?: {
              initInlineWidget: (options: {
                url: string;
                parentElement: HTMLElement;
                prefill?: { name?: string; email?: string };
              }) => void;
            };
          };
          
          if (win.Calendly && widgetRef.current) {
            widgetInitializedRef.current = true;
            win.Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: widgetRef.current,
              prefill: nameParam || emailParam ? {
                ...(nameParam ? { name: nameParam } : {}),
                ...(emailParam ? { email: emailParam } : {}),
              } : undefined,
            });
          }
        }}
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
          ref={widgetRef}
          className="calendly-inline-widget min-h-[700px] w-full"
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
