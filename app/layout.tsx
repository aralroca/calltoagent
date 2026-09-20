import type { Metadata, Viewport } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { saleConfig } from "@/lib/sale-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://calltoagent.com"),
  title: "calltoagent.com — Premium AI Domain for Sale",
  description:
    "calltoagent.com is available for acquisition. A premium domain for AI agents, voice AI, agent-to-agent communication and developer infrastructure.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "calltoagent.com — Premium AI Domain for Sale",
    description: "A premium domain for the next generation of AI agents.",
    url: "/",
    siteName: saleConfig.domain,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "calltoagent.com — Premium AI Domain for Sale",
    description: "A premium domain for the next generation of AI agents.",
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f3f1eb",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
