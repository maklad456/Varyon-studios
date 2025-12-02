export type AnalyticsEventParams = Record<string, unknown>;

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const win = window as typeof window & { dataLayer?: Array<Record<string, unknown>> };
  if (!Array.isArray(win.dataLayer)) {
    win.dataLayer = [];
  }

  win.dataLayer.push({ event: eventName, ...params });
}
