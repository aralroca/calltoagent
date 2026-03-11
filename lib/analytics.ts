export function trackEvent(
  action: string,
  params?: Record<string, string>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}
