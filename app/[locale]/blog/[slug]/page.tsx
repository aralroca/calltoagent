import React from "react";
import Link from "next/link";
import { getPostData, getSortedPostsData } from "@/lib/blog";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { notFound } from "next/navigation";
import enCommon from "@/locales/en/common.json";
import esCommon from "@/locales/es/common.json";

const dictionaries: any = { en: enCommon, es: esCommon };

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await getSortedPostsData(params.locale as "en" | "es");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale === "es" ? "es" : "en";
  const dict = dictionaries[lang];
  
  const t = (key: string): string => {
    const value = key.split('.').reduce((o, i) => o?.[i], dict);
    return typeof value === 'string' ? value : key;
  };

  const post = await getPostData(lang, slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-32 pb-16 bg-slate-950 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-400/10" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link href={`/${locale}/blog`} className="text-accent hover:text-white transition-colors flex items-center mb-10 text-sm font-semibold uppercase tracking-widest">
            <svg className="mr-2 w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {t("blog.backToBlog")}
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{post.date}</span>
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
            className="prose prose-lg prose-indigo max-w-none text-slate-700
              prose-headings:text-primary prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-10
              prose-p:mb-6 prose-p:leading-relaxed
              prose-li:mb-2 prose-ul:mb-6 prose-ol:mb-6
              prose-strong:text-primary prose-strong:font-bold
              prose-code:text-accent prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:p-6 prose-pre:rounded-xl prose-pre:mb-10
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-500 prose-blockquote:mb-10
              prose-a:text-accent prose-a:no-underline prose-a:font-semibold hover:prose-a:underline
              prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }} 
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}
