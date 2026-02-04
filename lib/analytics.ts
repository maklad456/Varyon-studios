export type AnalyticsEventParams = Record<string, unknown>;

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  // Use gtag if available (GA4), otherwise fallback to dataLayer
  const win = window as typeof window & { 
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  // Track to Google Analytics
  if (typeof win.gtag === "function") {
    // Use gtag directly for GA4
    win.gtag("event", eventName, params);
  } else {
    // Fallback to dataLayer if gtag not loaded yet
    if (!Array.isArray(win.dataLayer)) {
      win.dataLayer = [];
    }
    win.dataLayer.push({ event: eventName, ...params });
  }

  // Track to Meta Pixel
  if (typeof win.fbq === "function") {
    // Map common event names to Meta Pixel standard events
    const metaEventName = mapToMetaPixelEvent(eventName);
    if (metaEventName) {
      win.fbq("track", metaEventName, params);
    } else {
      // For custom events, use trackCustom
      win.fbq("trackCustom", eventName, params);
    }
  }
}

/**
 * Maps our event names to Meta Pixel standard events for better reporting.
 * Standard: PageView, ViewContent, Lead, CompleteRegistration, Schedule, etc.
 * Custom events (form progress, abandonment) stay as trackCustom for diagnostics.
 */
function mapToMetaPixelEvent(eventName: string): string | null {
  const eventMap: Record<string, string> = {
    free_sample_form_view: "ViewContent",
    free_sample_submit: "Lead",
    free_sample_book_meeting_view: "ViewContent",
    free_sample_meeting_booked: "Schedule",
    free_sample_click: "ViewContent",
    lead_popup_view: "ViewContent",
    lead_popup_submit: "Lead",
  };

  return eventMap[eventName] || null;
}
