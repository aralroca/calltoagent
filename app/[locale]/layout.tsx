import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "es"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL("https://calltoagent.com"),
    title: "CallToAgent — AI Voice Agents for Customer Service | MCP-Connected",
    description:
      "Replace your customer service phone line with an AI voice agent that books appointments, queries databases, and resolves issues 24/7. MCP-native. Sub-600ms latency. Every industry.",
    authors: [{ name: "CallToAgent Team", url: "https://calltoagent.com" }],
    creator: "CallToAgent",
    publisher: "CallToAgent",
    keywords: [
      "AI voice agent",
      "AI customer service",
      "MCP voice agent",
      "replace call center AI",
      "AI appointment booking",
      "voice AI infrastructure",
      "AI phone agent",
      "automated customer service",
      "SIP trunk AI",
      "ElevenLabs voice agent",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      title: "CallToAgent — Your AI answers every call",
      description:
        "AI voice agents connected to your business tools via MCP. Book appointments, query databases, resolve issues — 24/7.",
      url: `https://calltoagent.com/${locale}`,
      siteName: "CallToAgent",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "CallToAgent — AI Voice Agents for Customer Service",
        },
      ],
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "CallToAgent — AI Voice Agents for Customer Service",
      description: "AI voice agents connected to your business tools via MCP.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://calltoagent.com/${locale}`,
      languages: {
        en: "https://calltoagent.com/en",
        es: "https://calltoagent.com/es",
        "x-default": "https://calltoagent.com/en",
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/favicon.svg",
    },
    manifest: "/manifest.json",
    other: {
      "geo.region": "ES",
      "geo.placename": "Spain",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#6366F1" />
        <GoogleAnalytics />
        <JsonLd locale={locale} />
      </head>
      <body className={inter.className}>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
