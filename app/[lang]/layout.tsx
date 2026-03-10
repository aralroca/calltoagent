import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

const locales = ["en", "es"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "CallToAgent — AI Voice Agents for Customer Service | MCP-Connected",
  description:
    "Replace your customer service phone line with an AI voice agent that books appointments, queries databases, and resolves issues 24/7. MCP-native. Sub-300ms latency. Every industry.",
  keywords: [
    "AI voice agent",
    "AI customer service",
    "MCP voice agent",
    "replace call center AI",
    "AI appointment booking",
    "voice AI infrastructure",
  ],
  openGraph: {
    title: "CallToAgent — Your AI answers every call",
    description:
      "AI voice agents connected to your business tools via MCP. Book appointments, query databases, resolve issues — 24/7.",
    url: "https://calltoagent.com",
    siteName: "CallToAgent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CallToAgent — AI Voice Agents for Customer Service",
    description: "AI voice agents connected to your business tools via MCP.",
  },
  alternates: {
    canonical: "https://calltoagent.com",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
};

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
