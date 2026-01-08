export type AnalyticsEventParams = Record<string, unknown>;

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  // Use gtag if available (GA4), otherwise fallback to dataLayer
  const win = window as typeof window & { 
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

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
}
