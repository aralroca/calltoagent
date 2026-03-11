import en from "@/locales/en/common.json";
import es from "@/locales/es/common.json";

const dictionaries: Record<string, typeof en> = { en, es };

export default function JsonLd({ locale }: { locale: string }) {
  const t = dictionaries[locale] ?? dictionaries.en;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CallToAgent",
    url: "https://calltoagent.com",
    logo: "https://calltoagent.com/favicon.svg",
    description: t.footer.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CallToAgent",
    url: "https://calltoagent.com",
    inLanguage: locale === "es" ? "es" : "en",
    alternateName: "Call To Agent",
  };

  const faqItems = t.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
