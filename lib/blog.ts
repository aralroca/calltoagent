import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  image?: string;
  language: "en" | "es";
  category?: string;
  contentHtml?: string;
  readingTime?: number;
  wordCount?: number;
}

import { translationMap } from "./blog-translations";

export function getTranslatedSlug(lang: "en" | "es", slug: string): string | null {
  return translationMap[lang]?.[slug] ?? null;
}

function computeReadingTime(content: string): { readingTime: number; wordCount: number } {
  const words = content.trim().split(/\s+/).length;
  return { readingTime: Math.max(1, Math.ceil(words / 200)), wordCount: words };
}

export async function getSortedPostsData(lang: "en" | "es"): Promise<PostData[]> {
  const langDir = path.join(blogDirectory, lang);

  if (!fs.existsSync(langDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(langDir);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(langDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const { readingTime, wordCount } = computeReadingTime(matterResult.content);

      return {
        slug,
        language: lang,
        readingTime,
        wordCount,
        ...(matterResult.data as { title: string; date: string; excerpt: string; author: string; image?: string; category?: string }),
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(lang: "en" | "es", slug: string): Promise<PostData | null> {
  const fullPath = path.join(blogDirectory, lang, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const { readingTime, wordCount } = computeReadingTime(matterResult.content);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    language: lang,
    readingTime,
    wordCount,
    ...(matterResult.data as { title: string; date: string; excerpt: string; author: string; image?: string; category?: string }),
  };
}
