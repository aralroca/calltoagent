import { PostData } from "@/lib/blog";

interface BlogPostJsonLdProps {
  post: PostData;
  locale: string;
  slug: string;
}

export default function BlogPostJsonLd({ post, locale, slug }: BlogPostJsonLdProps) {
  const url = `https://calltoagent.com/${locale}/blog/${slug}`;

  const isPersonAuthor = post.author === "Aral Roca";

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `https://calltoagent.com${post.image}` : "https://calltoagent.com/og-image.jpg",
    datePublished: post.date,
    dateModified: post.date,
    author: isPersonAuthor
      ? { "@type": "Person", name: post.author, url: "https://calltoagent.com" }
      : { "@type": "Organization", name: "CallToAgent", url: "https://calltoagent.com" },
    publisher: {
      "@type": "Organization",
      name: "CallToAgent",
      logo: {
        "@type": "ImageObject",
        url: "https://calltoagent.com/favicon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: locale === "es" ? "es" : "en",
    articleSection: post.category,
    wordCount: post.wordCount,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: `https://calltoagent.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `https://calltoagent.com/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
