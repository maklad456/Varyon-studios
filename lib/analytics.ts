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
 * Maps custom event names to Meta Pixel standard events
 * Standard events: PageView, ViewContent, Search, AddToCart, InitiateCheckout, 
 * AddPaymentInfo, Purchase, Lead, CompleteRegistration, etc.
 */
function mapToMetaPixelEvent(eventName: string): string | null {
  const eventMap: Record<string, string> = {
    // Map your custom events to Meta Pixel standard events if applicable
    // Example: "form_submit" -> "Lead"
    // "purchase_complete" -> "Purchase"
  };

  return eventMap[eventName] || null;
}
