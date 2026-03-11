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
 * Maps internal event names to Meta Pixel standard events.
 *
 * Only the two primary funnel conversion points are mapped to standard events:
 *   - free_sample_submit       → SubmitApplication  (form filled & sent)
 *   - free_sample_meeting_booked → Schedule          (Calendly booking confirmed)
 *
 * Everything else goes to Meta as trackCustom so it does not pollute
 * the conversion signals used for ad optimisation.
 *
 * Notable intentional omissions:
 *   - free_sample_form_view / free_sample_book_meeting_view / lead_popup_view
 *     → page-view signals; tracked in GA only, not Meta standard events
 *   - free_sample_click → engagement signal; trackCustom on Meta
 *   - lead_popup_submit → coupon popup; trackCustom "PopupCouponLead" (see LeadCaptureModal)
 */
function mapToMetaPixelEvent(eventName: string): string | null {
  const eventMap: Record<string, string> = {
    free_sample_submit: "SubmitApplication",
    free_sample_meeting_booked: "Schedule",
  };

  return eventMap[eventName] ?? null;
}
