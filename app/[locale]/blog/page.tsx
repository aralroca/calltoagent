import Link from "next/link";
import type { Metadata } from "next";
import { getSortedPostsData, PostData } from "@/lib/blog";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import enCommon from "@/locales/en/common.json";
import esCommon from "@/locales/es/common.json";

const dictionaries: any = { en: enCommon, es: esCommon };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Blog | CallToAgent" : "Blog | CallToAgent",
    description: isEs
      ? "Artículos sobre agentes de voz con IA, MCP, y automatización de atención al cliente."
      : "Articles about AI voice agents, MCP, and customer service automation.",
    alternates: {
      canonical: `https://calltoagent.com/${locale}/blog`,
      languages: {
        en: "https://calltoagent.com/en/blog",
        es: "https://calltoagent.com/es/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";
  const dict = dictionaries[lang];
  
  const t = (key: string): string => {
    const value = key.split('.').reduce((o, i) => o?.[i], dict);
    return typeof value === 'string' ? value : key;
  };
  
  const posts = await getSortedPostsData(lang);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-slate-950 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            <span className="text-gradient">{t("blog.title")}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>
      </section>

      {/* Post List */}
      <div className="container mx-auto px-6 py-20">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: PostData) => (
              <article key={post.slug} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
                <Link href={`/${locale}/blog/${post.slug}`} className="h-full flex flex-col">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-slate-100 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-cyan-400/20" />
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 grow flex flex-col">
                    <div className="text-sm text-gray-500 mb-3">
                      {post.date} · {post.readingTime} {t("blog.minRead")}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto text-accent font-semibold flex items-center">
                      {t("blog.readMore")} 
                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            {t("blog.noPosts")}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
