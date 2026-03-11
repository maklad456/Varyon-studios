"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const CALENDLY_BASE_PATH =
  "https://calendly.com/varyonstudios/45-minute-meeting-clone";
/* Site button color #10b981 (vs-accent) – no hash for Calendly */
const CALENDLY_QUERY =
  "hide_event_type_details=1&hide_gdpr_banner=1&primary_color=10b981";
const CALENDLY_URL = `${CALENDLY_BASE_PATH}?${CALENDLY_QUERY}`;

function BookMeetingContent() {
  useEffect(() => {
    trackEvent("free_sample_book_meeting_view", { page: "free_sample_step_two" });
  }, []);

  // Guard so the booking conversion fires at most once per page session,
  // even if Calendly posts the message multiple times.
  const bookingFiredRef = useRef(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.event !== "calendly.event_scheduled") return;
      if (bookingFiredRef.current) return;
      bookingFiredRef.current = true;

      const eventID = `fsm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      // Calendly may include booking details in event.data.payload — extract
      // what's available without breaking if the payload shape changes.
      const payload = event.data?.payload ?? {};
      const params: Record<string, unknown> = {
        source: "free_sample",
        ...(payload.event_type?.name ? { event_type: payload.event_type.name } : {}),
        ...(payload.invitee?.name ? { invitee_name: payload.invitee.name } : {}),
        ...(payload.invitee?.email ? { invitee_email: payload.invitee.email } : {}),
        ...(payload.event?.start_time ? { start_time: payload.event.start_time } : {}),
      };

      trackEvent("free_sample_meeting_booked", params, eventID);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
            In this meeting, we&apos;ll review your free custom sample and show
            exactly how your brand can use AI media to increase output and lower
            creative cost.
          </p>
        </div>
      </section>

      <section className="site-container py-12 md:py-16">
        <div
          className="calendly-inline-widget min-h-[700px] w-full"
          data-url={CALENDLY_URL}
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
