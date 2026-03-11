export type AnalyticsEventParams = Record<string, unknown>;

export function trackEvent(
  eventName: string,
  params: AnalyticsEventParams = {},
  eventID?: string
) {
  if (typeof window === "undefined") {
    return;
  }

  const win = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  const metaEventName = mapToMetaPixelEvent(eventName);

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics] trackEvent", {
      eventName,
      gaEventName: eventName,
      metaEventName: metaEventName ?? `trackCustom:${eventName}`,
      params,
      ...(eventID ? { eventID } : {}),
    });
  }

  // Track to Google Analytics (GA4)
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  } else {
    if (!Array.isArray(win.dataLayer)) {
      win.dataLayer = [];
    }
    win.dataLayer.push({ event: eventName, ...params });
  }

  // Track to Meta Pixel
  if (typeof win.fbq === "function") {
    const metaParams: Record<string, unknown> = { ...params };
    if (eventID) metaParams.eventID = eventID;

    if (metaEventName) {
      win.fbq("track", metaEventName, metaParams, eventID ? { eventID } : undefined);
    } else {
      win.fbq("trackCustom", eventName, metaParams);
    }
  }
}

/**
 * Maps internal event names to Meta Pixel standard events for better ad reporting.
 *
 * NOTE: `lead_popup_submit` is intentionally NOT mapped to "Lead" here.
 * The popup fires a trackCustom "PopupCouponLead" event so that it does not
 * pollute the free-sample Lead signal used for ad optimisation.
 */
function mapToMetaPixelEvent(eventName: string): string | null {
  const eventMap: Record<string, string> = {
    free_sample_form_view: "ViewContent",
    free_sample_submit: "Lead",
    free_sample_book_meeting_view: "ViewContent",
    free_sample_meeting_booked: "Schedule",
    free_sample_click: "ViewContent",
    lead_popup_view: "ViewContent",
    // lead_popup_submit → NOT mapped; fires as trackCustom "PopupCouponLead" in LeadCaptureModal
  };

  return eventMap[eventName] ?? null;
}
