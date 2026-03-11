interface Window {
  gtag: (
    command: "event" | "config" | "js",
    targetOrAction: string | Date,
    params?: Record<string, string>
  ) => void;
  dataLayer: Record<string, unknown>[];
}
