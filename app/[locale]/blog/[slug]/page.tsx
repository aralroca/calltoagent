import Link from "next/link";
import type { Metadata } from "next";
import { getPostData, getSortedPostsData, getTranslatedSlug, PostData } from "@/lib/blog";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";
import BlogCta from "@/components/BlogCta";
import { notFound } from "next/navigation";
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await getSortedPostsData(params.locale as "en" | "es");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale === "es" ? "es" : "en";
  const post = await getPostData(lang, slug);
  if (!post) return {};

  const otherLang = lang === "en" ? "es" : "en";
  const translatedSlug = getTranslatedSlug(lang, slug);
  const languages: Record<string, string> = {
    [lang]: `https://calltoagent.com/${lang}/blog/${slug}`,
  };
  if (translatedSlug) {
    languages[otherLang] = `https://calltoagent.com/${otherLang}/blog/${translatedSlug}`;
  }

  return {
    title: `${post.title} | CallToAgent Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `https://calltoagent.com/${locale}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/og-image.jpg"],
    },
    alternates: {
      canonical: `https://calltoagent.com/${locale}/blog/${slug}`,
      languages,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "es" ? "es" : "en";
  const post = await getPostData(lang, slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getSortedPostsData(lang);
  const relatedPosts = allPosts
    .filter((p: PostData) => p.slug !== slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <BlogPostJsonLd post={post} locale={locale} slug={slug} />

      {/* Article Header */}
      <section className="pt-32 pb-16 bg-slate-950 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-400/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-10">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {lang === "es" ? "Inicio" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-accent truncate max-w-xs">{post.title}</span>
          </nav>

          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.date}</span>
            {post.readingTime && (
              <span className="text-gray-400 text-sm">
                {post.readingTime} min {lang === "es" ? "de lectura" : "read"}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center space-x-3 text-white font-medium">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-lg font-bold">
              {post.author.charAt(0)}
            </div>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-6 -mt-10 mb-24 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-gray-100 min-h-[500px]">
          <div
            className="prose prose-lg max-w-none text-slate-700
              prose-headings:text-primary prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10
              prose-p:mb-6 prose-p:leading-relaxed
              prose-li:mb-2 prose-ul:mb-6 prose-ol:mb-6
              prose-strong:text-primary prose-strong:font-bold
              prose-code:text-accent prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:p-6 prose-pre:rounded-xl prose-pre:mb-10
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-500 prose-blockquote:mb-10
              prose-a:text-accent prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
              prose-img:rounded-2xl
              prose-table:border-collapse prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-td:p-3 prose-td:border-t prose-td:border-slate-200"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />
        </div>

        {/* CTA */}
        <div className="mt-12">
          <BlogCta locale={locale} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto max-w-4xl px-6 mb-24">
          <h2 className="text-2xl font-extrabold text-primary mb-8">
            {lang === "es" ? "Artículos relacionados" : "Related articles"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((p: PostData) => (
              <Link
                key={p.slug}
                href={`/${locale}/blog/${p.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="aspect-video bg-linear-to-br from-indigo-500/20 to-cyan-400/20" />
                <div className="p-5">
                  <span className="text-xs text-gray-400">{p.date} · {p.readingTime} min</span>
                  <h3 className="text-lg font-bold text-primary mt-2 group-hover:text-accent transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
