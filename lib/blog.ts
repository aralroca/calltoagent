import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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
}

export async function getSortedPostsData(lang: "en" | "es") {
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

      return {
        slug,
        language: lang,
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

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    language: lang,
    ...(matterResult.data as { title: string; date: string; excerpt: string; author: string; image?: string; category?: string }),
  };
}
